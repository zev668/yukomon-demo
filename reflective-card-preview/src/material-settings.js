export const STORAGE_KEY = 'yukomon-card-material-lab-v1';
export const DEFAULT_VIDEO = '/videos/slow-ripples.mp4';

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
  return {
    values, content, subject: saved?.subject === 'fish' ? 'fish' : 'reference',
    source: ['video', 'studio'].includes(saved?.source) ? saved.source : 'video',
    videoSrc: videoSrc === '/videos/reflection.mp4' ? DEFAULT_VIDEO : videoSrc,
    autoRotate: saved?.autoRotate === true && !matchMedia('(prefers-reduced-motion: reduce)').matches,
    enableTilt: saved?.enableTilt !== false, intro: saved?.intro !== false,
    edgeMode: saved?.edgeMode === 'original' ? 'original' : 'enhanced',
    theme: saved?.theme === 'light' ? 'light' : 'dark',
    backdrop: saved?.backdrop === 'light' ? 'light' : 'dark',
  };
}
