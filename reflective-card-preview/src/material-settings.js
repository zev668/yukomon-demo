export const STORAGE_KEY = 'yukomon-card-material-lab-v1';
export const DEFAULT_VIDEO = '/videos/slow-ripples.mp4';

export const LANYARD_DEFAULTS = {
  imageFit: 'contain', cardColor: '#ffffff', orientation: 'landscape', finish: 'glossy',
  cardWidth: 3.5, cardHeight: 2.58, cornerRadius: 0.31, logoStrength: 0.8, size: 0.62, anchor: 'center', strapLength: 0.5, strapColor: '#161820',
  strapWidth: 0.65, metal: 'silver', gravity: 1, damping: 0.68, elasticity: 0.42, breeze: 0,
  interactive: true, intro: true
};

export const LANYARD_GROUPS = [
  { name: '卡片外观', controls: [
    ['cardWidth', '卡片宽度', 1.1, 4.2, 0.01, 'u'], ['cardHeight', '卡片高度', 1.1, 4.2, 0.01, 'u'],
    ['size', '预览缩放', 0.3, 0.9, 0.01], ['cornerRadius', '圆角', 0, 1, 0.01],
    ['strapLength', '挂牌长度', 0, 1, 0.01], ['strapWidth', '绳带宽度', 0.4, 2, 0.01],
    ['logoStrength', '背面镭射水印', 0, 1, 0.01]
  ] },
  { name: '摆动参数', controls: [
    ['gravity', '重力', 0, 3, 0.05], ['damping', '阻尼', 0, 1, 0.01],
    ['elasticity', '弹性', 0, 1, 0.01], ['breeze', '微风', 0, 1, 0.01]
  ] }
];

export const LANYARD_CONTENT_GROUPS = [
  { name: '段位信息', controls: [
    ['rankIndex', '段位徽章', 0, 7, 1], ['rankStars', '星级', 0, 5, 1], ['rankProgress', '本星进度', 0, 100, 1]
  ] },
  { name: '图鉴统计', controls: [
    ['unlocked', '已解锁鱼种', 0, 82, 1], ['totalSpecies', '鱼种总数', 1, 120, 1],
    ['catches', '渔获', 0, 999, 1]
  ] }
];

export const LANYARD_CONTENT_DEFAULTS = {
  nickname: '大鱼', bio: '周末钓鱼，工作日想钓鱼', avatar: '头像',
  rankName: '浅滩钓手', rankIndex: 1, rankStars: 2, rankProgress: 16, rankPoints: 160,
  unlocked: 12, totalSpecies: 82, catches: 99, cities: 3, sets: 0,
  rarities: { N: 5, R: 3, SR: 2, SSR: 2, UR: 1 },
  rarityTotals: { N: 30, R: 27, SR: 15, SSR: 10, UR: 82 }
};

const LOOK = { tint: '#ffffff', metalness: 1, roughness: 0.3, blurStrength: 6, grayscale: 1, warp: 0.6, warpScale: 1, shine: 1, bevel: 3, glare: 0.5 };
const EDGE = { rimIntensity: 0, rimWidth: 1, rimSoftness: 0.4, rimDepth: 0.6, bevelStrength: 1 };
export const DEFAULT_VALUES = { ...LOOK, ...EDGE, radius: 24, tiltStrength: 12, width: 320, height: 500, holo: 0.8, mobileTiltSensitivity: 7 };

// The first six material presets and their values match the React Bits customizer.
export const PRESETS = {
  steel: { label: 'Steel', values: { ...LOOK, ...EDGE } },
  brushed: { label: 'Brushed', values: { ...LOOK, ...EDGE, roughness: 0.85, blurStrength: 8, shine: 1.2 } },
  mirror: { label: 'Mirror', values: { ...LOOK, ...EDGE, roughness: 0, blurStrength: 1.5, warp: 0.3 } },
  gold: { label: 'Gold', values: { ...LOOK, ...EDGE, tint: '#f3cf8a', shine: 1.1 } },
  rose: { label: 'Rose', values: { ...LOOK, ...EDGE, tint: '#f1b9a4' } },
  satin: { label: 'Satin', values: { ...LOOK, ...EDGE, blurStrength: 14, roughness: 0.5, glare: 0.4 } },
  glass: { label: '玻璃亮边', values: { ...LOOK, ...EDGE, rimIntensity: 0.8, rimWidth: 1.05, rimSoftness: 0.42, rimDepth: 0.58, bevel: 3.6, bevelStrength: 1.1 } },
  fine: { label: '轻薄亮边', values: { ...LOOK, ...EDGE, rimIntensity: 0.55, rimWidth: 0.7, rimSoftness: 0.35, rimDepth: 0.4, bevel: 2.4 } },
};

export const GROUPS = [
  { name: '原版材质', controls: [
    ['metalness', 'Metalness', 0, 1, 0.05], ['roughness', 'Roughness', 0, 1, 0.05],
    ['blurStrength', 'Blur', 0, 40, 0.5, 'px'], ['grayscale', 'Grayscale', 0, 1, 0.05],
    ['shine', 'Shine', 0, 3, 0.05], ['glare', 'Glare', 0, 1, 0.05],
    ['warp', 'Warp', 0, 2, 0.05], ['warpScale', 'Warp Scale', 0.2, 4, 0.05],
    ['bevel', 'Bevel', 0, 16, 0.5, 'px'], ['tiltStrength', 'Tilt Strength', 0, 30, 1, 'deg'],
    ['radius', 'Radius', 0, 48, 1, 'px'],
  ] },
  { name: '亮边优化', controls: [
    ['rimIntensity', '高光强度', 0, 2, 0.01], ['rimWidth', '亮边宽度', 0.35, 3, 0.05, 'px'],
    ['rimSoftness', '亮边柔度', 0.15, 1.2, 0.01], ['rimDepth', '内缘暗线', 0, 1, 0.01],
    ['bevelStrength', '倒角起伏', 0, 2, 0.01],
  ] },
  { name: '尺寸与鱼卡', controls: [
    ['width', 'Width', 220, 500, 1, 'px'], ['height', 'Height', 320, 760, 1, 'px'],
    ['holo', '镭射水印', 0, 1, 0.01], ['mobileTiltSensitivity', '陀螺仪灵敏度', 1, 10, 0.5],
  ] },
];

export const CONTENT = {
  reference: { name: 'Alexander Doe', role: 'Senior Developer', badge: 'Verified', status: 'Active', statusColor: '#22c55e', idLabel: 'ID number', idValue: '8901 2345 6789' },
  fish: { number: 'YK-001', rarity: 'SR', name: '小丑鱼', englishName: 'Clownfish', description: '在海葵之间穿梭的珊瑚礁精灵' },
};

export function restoreSettings(saved) {
  if (saved === undefined) {
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { /* Use the initial preset. */ }
  }
  const values = { ...DEFAULT_VALUES, ...PRESETS.glass.values };
  for (const { controls } of GROUPS) for (const [key, , min, max] of controls) {
    if (typeof saved?.values?.[key] === 'number' && Number.isFinite(saved.values[key])) values[key] = Math.max(min, Math.min(max, saved.values[key]));
  }
  if (/^#[\da-f]{6}$/i.test(saved?.values?.tint)) values.tint = saved.values.tint;
  const content = Object.fromEntries(Object.entries(CONTENT).map(([subject, fields]) => [subject, Object.fromEntries(Object.entries(fields).map(([key, initial]) => [key, typeof saved?.content?.[subject]?.[key] === 'string' ? saved.content[subject][key].slice(0, 120) : initial]))]));
  const videoSrc = typeof saved?.videoSrc === 'string' ? saved.videoSrc : DEFAULT_VIDEO;
  const savedLanyard = Number(saved?.lanyardVersion) >= 4 ? saved.lanyard : null;
  const lanyard = Object.fromEntries(Object.entries(LANYARD_DEFAULTS).map(([key, initial]) => {
    const value = savedLanyard?.[key];
    if (typeof initial === 'number') return [key, Number.isFinite(value) ? value : initial];
    if (typeof initial === 'boolean') return [key, typeof value === 'boolean' ? value : initial];
    return [key, typeof value === 'string' ? value : initial];
  }));
  if (Number(saved?.lanyardVersion) < 5) {
    if ((lanyard.cardWidth === 1.6 && lanyard.cardHeight === 2.25) || (lanyard.cardWidth === 2.25 && lanyard.cardHeight === 1.6)) {
      lanyard.cardWidth = LANYARD_DEFAULTS.cardWidth;
      lanyard.cardHeight = LANYARD_DEFAULTS.cardHeight;
    }
    if (lanyard.cardColor === '#f8faf9') lanyard.cardColor = '#ffffff';
  }
  lanyard.orientation = lanyard.cardWidth >= lanyard.cardHeight ? 'landscape' : 'portrait';
  const lanyardData = { ...LANYARD_CONTENT_DEFAULTS, ...(Number(saved?.lanyardVersion) >= 4 ? (saved?.lanyardData || {}) : {}) };
  // Upgrade the untouched example data to the supplied layout; retain edited data.
  const previousExample = { nickname: '大鱼', bio: '周末钓鱼，工作日想钓鱼', avatar: '大', rankName: '浅滩', rankIndex: 0, rankStars: 1, rankProgress: 10, rankPoints: 160, unlocked: 13, totalSpecies: 82, catches: 16, cities: 3, sets: 0 };
  const previousRarities = { N: 6, R: 3, SR: 2, SSR: 2, UR: 1 };
  const untouchedExample = Object.entries(previousExample).every(([key, value]) => lanyardData[key] === value)
    && Object.entries(previousRarities).every(([key, value]) => lanyardData.rarities?.[key] === value)
    && Object.entries(LANYARD_CONTENT_DEFAULTS.rarityTotals).every(([key, value]) => lanyardData.rarityTotals?.[key] === value);
  if (Number(saved?.lanyardVersion) < 5 && untouchedExample) {
    Object.assign(lanyardData, LANYARD_CONTENT_DEFAULTS);
  }
  for (const key of ['rankIndex', 'rankStars', 'rankProgress', 'rankPoints', 'unlocked', 'totalSpecies', 'catches', 'cities', 'sets']) {
    const value = Number(lanyardData[key]);
    lanyardData[key] = Number.isFinite(value) ? value : LANYARD_CONTENT_DEFAULTS[key];
  }
  for (const key of ['nickname', 'bio', 'avatar', 'rankName']) {
    lanyardData[key] = typeof lanyardData[key] === 'string' ? lanyardData[key].slice(0, 80) : LANYARD_CONTENT_DEFAULTS[key];
  }
  lanyardData.rankIndex = Math.max(0, Math.min(7, Math.round(lanyardData.rankIndex)));
  lanyardData.rankStars = Math.max(0, Math.min(5, Math.round(lanyardData.rankStars)));
  lanyardData.rankProgress = Math.max(0, Math.min(100, Math.round(lanyardData.rankProgress)));
  lanyardData.totalSpecies = Math.max(1, Math.min(120, Math.round(lanyardData.totalSpecies)));
  lanyardData.unlocked = Math.max(0, Math.min(lanyardData.totalSpecies, Math.round(lanyardData.unlocked)));
  lanyardData.rarities = { ...LANYARD_CONTENT_DEFAULTS.rarities, ...(lanyardData.rarities || {}) };
  for (const key of Object.keys(lanyardData.rarities)) lanyardData.rarities[key] = Math.max(0, Math.min(120, Math.round(Number(lanyardData.rarities[key]) || 0)));
  lanyardData.rarityTotals = { ...LANYARD_CONTENT_DEFAULTS.rarityTotals, ...(lanyardData.rarityTotals || {}) };
  for (const key of Object.keys(lanyardData.rarityTotals)) lanyardData.rarityTotals[key] = Math.max(1, Math.min(120, Math.round(Number(lanyardData.rarityTotals[key]) || LANYARD_CONTENT_DEFAULTS.rarityTotals[key])));
  return {
    values, content, subject: saved?.subject === 'fish' ? 'fish' : 'reference',
    surface: saved?.surface === 'lanyard' ? 'lanyard' : 'card',
    lanyardVersion: 5, lanyard, lanyardData,
    source: ['video', 'studio'].includes(saved?.source) ? saved.source : 'video',
    videoSrc: videoSrc === '/videos/reflection.mp4' ? DEFAULT_VIDEO : videoSrc,
    autoRotate: saved?.autoRotate === true && !matchMedia('(prefers-reduced-motion: reduce)').matches,
    enableTilt: saved?.enableTilt !== false, intro: saved?.intro !== false,
    edgeMode: saved?.edgeMode === 'original' ? 'original' : 'enhanced',
    theme: saved?.theme === 'light' ? 'light' : 'dark',
    backdrop: saved?.backdrop === 'light' ? 'light' : 'dark',
  };
}
