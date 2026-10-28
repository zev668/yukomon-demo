// 由 data/species.csv 生成：docs/鱼种图鉴总表.md + data/species.json
// 用法：node tools/gen-species.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8').replace(/^\uFEFF/, '');

function parseCsv(text) {
  const [head, ...rows] = text.trim().split(/\r?\n/);
  const keys = head.split(',');
  return rows.map((line) => {
    const cells = line.split(',');
    return Object.fromEntries(keys.map((k, i) => [k, (cells[i] ?? '').trim()]));
  });
}

const species = parseCsv(read('data/species.csv'));
const protectedList = parseCsv(read('data/protected_species.csv'));

const HABITAT = {
  lake: '静水湖泊', river: '大江大河', stream: '山涧溪流', reservoir: '水库',
  pond: '池塘沟渠', cold: '高山冷水', estuary: '河口咸淡水',
};
const ORIGIN = { native: '本土', introduced: '外来', invasive: '入侵' };
const RELEASE = { ok: '可放流', encourage: '鼓励放流', keep: '不建议放流', forbid: '禁止放生' };
const RARITY_ORDER = ['N', 'R', 'SR', 'SSR'];
const SCORE = { N: 1, R: 2, SR: 4, SSR: 8 };

// 各稀有度的图层组成：专属资源 / 共用资源
const ASSETS = {
  N: {
    own: ['L2_fish.webp'],
    shared: (h) => [`habitat/${h}_gradient.webp`, 'frames/frame_N.webp'],
    layers: 3, offset: 6, rotate: 4, unlock: 1200, sfx: 'unlock_N', effect: 'fade_flip',
  },
  R: {
    own: ['L2_fish.webp'],
    shared: (h) => [`habitat/${h}_texture.webp`, 'frames/frame_R.webp', '(扫光 程序渲染)'],
    layers: 4, offset: 10, rotate: 6, unlock: 1800, sfx: 'unlock_R', effect: 'blue_flip',
  },
  SR: {
    own: ['L2_fish.webp', 'L4_holo_mask.png'],
    shared: (h) => [`habitat/${h}_scene.webp`, `habitat/${h}_foreground.webp`, 'holo/holo_rainbow.webp', 'frames/frame_SR.webp'],
    layers: 5, offset: 14, rotate: 8, unlock: 2500, sfx: 'unlock_SR', effect: 'purple_burst',
  },
  SSR: {
    own: ['L1_bg.webp', 'L2_mid.webp', 'L3_body.webp', 'L4_fin.webp', 'L6_holo_mask.png'],
    shared: () => ['holo/holo_gold.webp', 'frames/frame_SSR.webp', '(光点粒子 程序生成)'],
    layers: 6, offset: 18, rotate: 8, unlock: 3500, sfx: 'unlock_SSR', effect: 'gold_pillar',
  },
};
const habitatKey = (h) => h; // 文件名前缀即栖息地 key

const dir = (s) => `${s.no}_${s.slug}`;

// 易混淆组：图鉴鱼种 slug → 组 id（与保护物种相似，识别时强制候选确认）
const CONFUSABLE = {
  baijia: 'onychostoma', yayu: 'schizothorax', manli: 'anguilla', hailu: 'songjianglu',
  chiyanzun: 'ochetobius', ganyu: 'luciobrama', hongzun: 'salmonid', hezun: 'salmonid',
};

// ---------- species.json ----------
const json = species.map((s) => {
  const a = ASSETS[s.rarity];
  if (!a) throw new Error(`未知稀有度 ${s.no} ${s.rarity}`);
  return {
    no: s.no, slug: s.slug, name: s.name, alias: s.alias.split('/'), latin: s.latin,
    family: s.family, rarity: s.rarity, habitat: s.habitat, region: s.region, season: s.season,
    method: s.method, commonCm: Number(s.commonCm), rankSizeCapCm: Number(s.rankSizeCapCm),
    origin: s.origin, releasePolicy: s.release, hint: s.hint, fact: s.fact, note: s.verify || null,
    confusableGroup: CONFUSABLE[s.slug] ?? null,
    assetDir: `species/${dir(s)}`, manifestVersion: 1,
    assets: {
      own: [...a.own, 'thumb.webp'],
      shared: a.shared(habitatKey(s.habitat)).map((p) => (p.startsWith('(') ? p : `common/${p}`)),
    },
    parallax: { layers: a.layers, maxOffset: a.offset, maxRotate: a.rotate },
    unlock: { duration: a.unlock, effect: a.effect, sfx: `common/sfx/${a.sfx}.mp3` },
  };
});
writeFileSync(new URL('data/species.json', root), JSON.stringify(json, null, 2) + '\n');

// ---------- demo 数据（classic script，可直接双击 index.html 打开） ----------
writeFileSync(
  new URL('demo/js/data.js', root),
  '// 自动生成：node tools/gen-species.mjs —— 请勿手改\n' +
    `window.YK_SPECIES = ${JSON.stringify(json)};\n` +
    `window.YK_PROTECTED = ${JSON.stringify(protectedList)};\n`,
);

// ---------- 统计 ----------
const count = (pred) => species.filter(pred).length;
const byRarity = Object.fromEntries(RARITY_ORDER.map((r) => [r, count((s) => s.rarity === r)]));
const byHabitat = Object.fromEntries(Object.keys(HABITAT).map((h) => [h, count((s) => s.habitat === h)]));
const ownFiles = json.reduce((n, s) => n + s.assets.own.length, 0);

const md = [];
md.push('# Yukomon 鱼种图鉴总表 v1.0', '');
md.push('> 本文件由 `tools/gen-species.mjs` 根据 `data/species.csv` 自动生成，**请改 CSV 后重新生成，不要手改本文件**。');
md.push('> 数据来源：《中国淡水鱼类志》、FishBase、《国家重点保护野生动物名录》(2021) 等公开资料整理。');
md.push('> 编写时联网检索不可用，所有数据**按领域知识整理**：备注列标注了需复核的条目。`rankSizeCapCm` 是段位积分尺寸系数的封顶参考值，不是成就线；上线前需请资深钓友逐条校准。', '');

md.push('## 1. 总览', '');
md.push(`- 图鉴收录 **${species.length}** 种（MVP：中国淡水 + 河口常见垂钓鱼种），另有 **${protectedList.length}** 种保护鱼类只记录为“遇见”，不发卡。`);
md.push('- 每个鱼种只对应 1 张鱼种卡；重复渔获保留在渔获记录中，并参与段位积分结算。', '');
md.push('| 稀有度 | 鱼种数 | 占比 | 积分 | 图层数 | 最大位移 | 解锁时长 | 定位 |');
md.push('|---|---|---|---|---|---|---|---|');
const POS = {
  N: '新手第一天就能解锁好几张', R: '需要一点技巧、特定钓法或特定水体',
  SR: '需要特定水域（溪流/冷水/边疆水系）或较强技术', SSR: '地域门槛高、野生个体稀少或体型巨大',
};
for (const r of RARITY_ORDER) {
  const a = ASSETS[r];
  md.push(`| ${r} | ${byRarity[r]} | ${Math.round((byRarity[r] / species.length) * 100)}% | ${SCORE[r]} | ${a.layers} | ${a.offset}px | ${a.unlock / 1000}s | ${POS[r]} |`);
}
md.push('| 尺寸参考 | — | — | 影响段位积分系数 | — | — | — | `rankSizeCapCm` 仅作为积分封顶参考 |', '');

md.push('**按栖息地分布**（决定共用场景资源的复用情况）：', '');
md.push('| 栖息地 | key | 鱼种数 |', '|---|---|---|');
for (const [k, v] of Object.entries(HABITAT)) md.push(`| ${v} | \`${k}\` | ${byHabitat[k]} |`);
md.push('');
md.push(`**按来源**：本土 ${count((s) => s.origin === 'native')} 种 / 外来 ${count((s) => s.origin === 'introduced')} 种 / 入侵 ${count((s) => s.origin === 'invasive')} 种。入侵物种照常发卡（钓走入侵鱼是好事），但**禁止放生**，打开“已放流”开关时弹出提示。`, '');

md.push('## 2. 稀有度判定依据', '');
md.push('稀有度由以下 4 个因素综合人工评定（不是生物学上的濒危程度）：');
md.push('1. **分布广度**：全国常见 → 只在某流域/某省份。');
md.push('2. **栖息地门槛**：城市河塘 → 山溪、冷水、边疆水系。');
md.push('3. **钓获难度**：台钓随手可得 → 需要专门的路亚/活饵/夜钓/冰钓技巧。');
md.push('4. **野生个体稀缺度**：养殖逃逸常见 → 野生资源明显下降。', '');
md.push('上线后可用全服打卡数据校准：若某鱼种实际钓获率明显偏离预期，按季度调整稀有度（已获得的卡保留原稀有度）。', '');

md.push('## 3. 鱼种总表', '');
for (const r of RARITY_ORDER) {
  md.push(`### 3.${RARITY_ORDER.indexOf(r) + 1} ${r}（${byRarity[r]} 种）`, '');
  md.push('| 编号 | 鱼种 | 俗名 | 学名 | 科 | 栖息地 | 分布 | 旺季 | 常见钓法 | 常见尺寸 | 段位尺寸上限参考 | 来源 | 放流 | 资源目录 | 备注 |');
  md.push('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const s of species.filter((x) => x.rarity === r)) {
    md.push(`| ${s.no} | **${s.name}** | ${s.alias.replaceAll('/', '、')} | *${s.latin}* | ${s.family} | ${HABITAT[s.habitat]} | ${s.region} | ${s.season} | ${s.method} | ${s.commonCm}cm | ${s.rankSizeCapCm}cm | ${ORIGIN[s.origin]} | ${RELEASE[s.release]} | \`${dir(s)}/\` | ${s.verify} |`);
  }
  md.push('');
}

md.push('## 4. 卡面文案（未解锁线索 / 冷知识）', '');
md.push('| 编号 | 鱼种 | 稀有度 | 未解锁线索（剪影下方） | 冷知识（卡背） |', '|---|---|---|---|---|');
for (const s of species) md.push(`| ${s.no} | ${s.name} | ${s.rarity} | ${s.hint} | ${s.fact} |`);
md.push('');

md.push('## 5. 资源清单', '');
md.push('### 5.1 各稀有度资源组成', '');
md.push('| 稀有度 | 专属资源（每种鱼单独画） | 共用资源（按栖息地/稀有度复用） |', '|---|---|---|');
for (const r of RARITY_ORDER) {
  md.push(`| ${r} | ${ASSETS[r].own.map((f) => `\`${f}\``).join('、')} | ${ASSETS[r].shared('{habitat}').map((f) => (f.startsWith('(') ? f : `\`common/${f}\``)).join('、')} |`);
}
md.push('| 全部 | `thumb.webp` | `common/backs/*`、`common/sfx/*` |', '');

md.push('### 5.2 共用资源总数', '');
md.push('| 类别 | 文件 | 数量 |', '|---|---|---|');
md.push(`| 栖息地 | \`{habitat}_gradient / _texture / _scene / _foreground\`（7 种栖息地 × 4） | 28 |`);
md.push('| 卡框 | `frame_N / R / SR / SSR` | 4 |');
md.push('| 卡背 | `back_default / SR / SSR` | 3 |');
md.push('| Holo | `holo_rainbow / holo_gold / glitter` | 3 |');
md.push('| 音效 | 解锁 ×4 + 界面音 ×7（见《音效设计.md》） | 11 |', '');
md.push(`专属资源手绘文件合计：**${json.reduce((n, s) => n + ASSETS[s.rarity].own.length, 0)}** 个（不含自动合成的缩略图；含缩略图共 ${ownFiles} 个）。`, '');

md.push('### 5.3 美术工作量（写实风）', '');
const DAYS = { N: 1, R: 1.5, SR: 2.5, SSR: 4.5 };
md.push('| 项 | 数量 | 单项 | 小计 |', '|---|---|---|---|');
let total = 0;
for (const r of RARITY_ORDER) {
  const d = byRarity[r] * DAYS[r]; total += d;
  md.push(`| ${r} 鱼 | ${byRarity[r]} | ${DAYS[r]} 天 | ${d} 天 |`);
}
md.push('| 栖息地共用资源 | 7 套 | 2 天 | 14 天 |', '| 卡框/卡背/Holo | — | — | 8 天 |');
total += 30;
md.push(`| **合计** | | | **约 ${total} 人天** |`, '');
md.push('MVP 省钱方案：N/R 先用高质量实拍抠图 + 统一调色上线，插画预算优先投 SR/SSR。', '');

md.push('## 6. 保护物种名单（只记“遇见”，不发卡）', '');
md.push('识别命中以下物种时：不发卡、不计排行榜，弹出保护提示与放生指引，记录为“遇见”（足迹中以特殊图标显示）。');
md.push('名单依据《国家重点保护野生动物名录》（2021）中与垂钓相关的鱼类，**上线前须以官方最新名录逐条核对**，并补充各省地方保护名录。', '');
md.push('| 中文名 | 学名 | 保护级别 | 类群 | 可能遇见的场景 | 处理 |', '|---|---|---|---|---|---|');
for (const p of protectedList) md.push(`| ${p.name} | *${p.latin}* | 国家${p.level} | ${p.group} | ${p.whyAnglersMeet} | ${p.action} |`);
md.push('');
md.push('**容易混淆的组合**（识别时需特别提示用户确认）：');
md.push('- 白甲鱼（发卡） vs 多鳞白甲鱼（二级保护）');
md.push('- 齐口裂腹鱼（发卡） vs 重口裂腹鱼（二级保护）');
md.push('- 日本鳗鲡（发卡） vs 花鳗鲡（二级保护）');
md.push('- 花鲈（发卡） vs 松江鲈（二级保护，体型小、头大）');
md.push('- 赤眼鳟（发卡） vs 鳤（二级保护，体更细长）');
md.push('- 鳡（发卡） vs 鯮（二级保护，吻部呈管状延长）');
md.push('- 虹鳟/褐鳟（发卡） vs 哲罗鲑、细鳞鲑（二级保护）', '');

md.push('## 7. 地区性禁钓提示', '');
md.push('- **长江流域重点水域十年禁渔**（2021 年起）：长江干流、重要支流及大型通江湖泊（鄱阳湖、洞庭湖）的禁捕水域内，各地对垂钓有不同的限制（一人一竿一线一钩、禁止路亚/拟饵等）。打卡定位落在长江流域时显示提示，引导用户遵守当地规定。');
md.push('- **青海湖**全面禁捕。');
md.push('- 各地春季禁渔期（通常 3–6 月，各省不同）：打卡时间与地点命中时提示。');
md.push('- 以上规则做成**后台可配置的规则表**（地区多边形 + 时间段 + 提示文案），不写死在代码里。', '');

writeFileSync(new URL('docs/鱼种图鉴总表.md', root), md.join('\n'));
console.log(`OK: ${species.length} species`, byRarity, `protected: ${protectedList.length}`);
