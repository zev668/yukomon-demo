import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

// Consume the exact same catalog as the existing client, including protected species.
const context = { window: {} };
const demoCatalog = new URL('../demo/js/data.js', import.meta.url);
vm.runInNewContext(readFileSync(existsSync(demoCatalog) ? demoCatalog : new URL('../js/data.js', import.meta.url), 'utf8'), context);
export const species = JSON.parse(JSON.stringify(context.window.YK_SPECIES));
export const protectedSpecies = JSON.parse(JSON.stringify(context.window.YK_PROTECTED));
export const byId = Object.fromEntries(species.map(s => [s.no, s]));
export const starsFor = n => [1, 3, 7, 15, 30].filter(step => n >= step).length || 1;

export function cardsFor(catches) {
  const cards = {};
  for (const c of catches.filter(c => c.status === 'confirmed').sort((a, b) => a.createdAt - b.createdAt)) {
    const card = cards[c.speciesId] ||= {
      speciesId: c.speciesId, catchCount: 0, verifiedCount: 0, stars: 1, verifiedUnlocked: false,
      firstCatchId: c.id, bestCatchId: null, bestLengthCm: null, unlockedAt: c.createdAt,
      giant: { status: 'none', catchId: null, lengthCm: null, approvedAt: null }
    };
    card.catchCount++;
    if (c.verified) { card.verifiedCount++; card.verifiedUnlocked = true; }
    card.stars = starsFor(card.verifiedCount);
    if (c.lengthCm && c.lengthCm > (card.bestLengthCm || 0)) {
      card.bestLengthCm = c.lengthCm; card.bestCatchId = c.id;
    }
    if (c.verified && c.lengthCm >= byId[c.speciesId].giantThresholdCm && c.lengthCm > (card.giant.lengthCm || 0)) {
      card.giant = { status: 'approved', catchId: c.id, lengthCm: c.lengthCm, approvedAt: c.createdAt };
    }
  }
  return cards;
}

export function eventsFor(before, card) {
  const events = [];
  if (!before) events.push('new');
  if (before && card.stars > before.stars) events.push('star_up');
  if (before?.bestLengthCm && card.bestLengthCm > before.bestLengthCm) events.push('record');
  if (card.giant.status === 'approved') {
    if (before?.giant.status !== 'approved') events.push('giant');
    else if (card.giant.lengthCm > before.giant.lengthCm) events.push('giant_record');
  }
  return events;
}
