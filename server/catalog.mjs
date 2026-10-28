import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

// The server consumes the same species catalogue as the prototype client.
const context = { window: {} };
const demoCatalog = new URL('../demo/js/data.js', import.meta.url);
vm.runInNewContext(readFileSync(existsSync(demoCatalog) ? demoCatalog : new URL('../js/data.js', import.meta.url), 'utf8'), context);
export const species = JSON.parse(JSON.stringify(context.window.YK_SPECIES)).map(sp => ({ ...sp, rankSizeCapCm: Number(sp.rankSizeCapCm || sp.commonCm * 2), giantThresholdCm: Number(sp.giantThresholdCm || sp.rankSizeCapCm || sp.commonCm * 2) }));
export const protectedSpecies = JSON.parse(JSON.stringify(context.window.YK_PROTECTED));
export const byId = Object.fromEntries(species.map(s => [s.no, s]));

export const SCORE = Object.freeze({ N: 10, R: 20, SR: 40, SSR: 80 });
export const SCORE_VERSION = 'rank-v1';
export const SETS = [
  { id: 'lake', name: '湖库静水', description: '湖泊、水库与开阔静水', habitats: ['lake', 'reservoir'], rewardScore: 50 },
  { id: 'pond', name: '池塘近岸', description: '池塘、沟渠和近岸静水', habitats: ['pond'], rewardScore: 50 },
  { id: 'river', name: '江河流域', description: '江河中下游和大江大湖', habitats: ['river'], rewardScore: 100 },
  { id: 'stream', name: '山溪急流', description: '溪流、浅滩与石缝水域', habitats: ['stream'], rewardScore: 50 },
  { id: 'estuary', name: '河口洄游', description: '河口与咸淡水交界', habitats: ['estuary'], rewardScore: 100 },
  { id: 'cold', name: '冷水冰钓', description: '冷水河流、高原与冰钓', habitats: ['cold'], rewardScore: 100 }
];

export const setIdFor = sp => SETS.find(set => set.habitats.includes(sp?.habitat))?.id || 'lake';
export const setForSpecies = id => SETS.find(set => set.id === setIdFor(byId[id])) || SETS[0];
export const sizeMultiplier = (sp, lengthCm) => {
  const n = Number(lengthCm);
  if (!Number.isFinite(n) || n <= 0) return 0.5;
  if (n <= sp.commonCm) return 0.8;
  if (n < sp.commonCm * 1.5) return 1;
  if (n < sp.rankSizeCapCm) return 1.3;
  return 1.6;
};
export const repeatMultiplier = count => count <= 3 ? 1 : count <= 6 ? 0.7 : 0.3;

export function cardsFor(catches) {
  const cards = {};
  for (const c of catches.filter(c => c.status === 'confirmed' && c.speciesId).sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id))) {
    const card = cards[c.speciesId] ||= { speciesId: c.speciesId, catchCount: 0, firstCatchId: c.id, firstUnlockedAt: c.createdAt, lastCatchAt: c.createdAt, giant: { status: 'none', catchId: null, lengthCm: null, approvedAt: null } };
    card.catchCount += 1;
    card.lastCatchAt = Math.max(card.lastCatchAt, c.createdAt);
    if (c.source === 'camera' && byId[c.speciesId] && c.lengthCm >= byId[c.speciesId].giantThresholdCm && c.lengthCm > (card.giant.lengthCm || 0)) {
      card.giant = { status: 'approved', catchId: c.id, lengthCm: c.lengthCm, approvedAt: c.createdAt };
    }
  }
  return cards;
}

const dateKey = value => {
  const d = new Date(value + 8 * 3600000);
  return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
};

export function rankFor(catches) {
  const ordered = catches.filter(c => c.status === 'confirmed' && c.speciesId && c.source === 'camera' && byId[c.speciesId]?.releasePolicy !== 'forbid').sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id));
  const cards = cardsFor(catches), seen = new Set(), daily = new Map(), events = [];
  let points = 0;
  for (const c of ordered) {
    const sp = byId[c.speciesId], day = `${c.speciesId}:${dateKey(c.createdAt)}`, prior = daily.get(day) || 0;
    daily.set(day, prior + 1);
    const firstBonus = seen.has(c.speciesId) ? 0 : 20, baseScore = SCORE[sp.rarity] || SCORE.N, size = sizeMultiplier(sp, c.lengthCm), repeat = repeatMultiplier(prior + 1), total = Math.floor(baseScore * size * repeat) + firstBonus;
    points += total;
    events.push({ id: `catch-${c.id}`, catchId: c.id, eventType: 'catch', baseScore, sizeMultiplier: size, repeatMultiplier: repeat, bonusScore: firstBonus, totalScore: total, scoreVersion: SCORE_VERSION, status: 'active', createdAt: c.createdAt });
    seen.add(c.speciesId);
    for (const set of SETS) {
      const members = species.filter(item => set.habitats.includes(item.habitat));
      if (!members.length || members.some(item => !seen.has(item.no)) || events.some(event => event.eventType === 'set_complete' && event.setId === set.id)) continue;
      points += set.rewardScore;
      events.push({ id: `set-${set.id}`, setId: set.id, eventType: 'set_complete', bonusScore: set.rewardScore, totalScore: set.rewardScore, scoreVersion: SCORE_VERSION, status: 'active', createdAt: c.createdAt });
    }
  }
  const completed = new Set(events.filter(event => event.eventType === 'set_complete').map(event => event.setId));
  return {
    points,
    events: events.sort((a, b) => b.createdAt - a.createdAt || b.id.localeCompare(a.id)),
    verifiedCatchCount: ordered.length,
    uniqueSpeciesCount: seen.size,
    setCompletedCount: completed.size,
    cards,
    setProgress: Object.fromEntries(SETS.map(set => {
      const members = species.filter(item => set.habitats.includes(item.habitat)), unlockedCount = members.filter(item => seen.has(item.no)).length, completeEvent = events.find(event => event.eventType === 'set_complete' && event.setId === set.id);
      return [set.id, { unlockedCount, totalCount: members.length, rewardScore: set.rewardScore, completedAt: completeEvent?.createdAt || null, rewardClaimedAt: completeEvent?.createdAt || null }];
    }))
  };
}
