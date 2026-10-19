/* Yukomon demo —— 程序化鱼体占位插画（正式版由写实插画替换，见资源规范“资源缺失降级”）
 * fishSVG(species, { silhouette }) → SVG 字符串，viewBox 0 0 200 100，头朝左 */
(function () {
  let uid = 0;

  const TYPE_BY_FAMILY = {
    鳗鲡科: 'eel', 合鳃鱼科: 'eel', 刺鳅科: 'eel', 鳅科: 'loach',
    鲇科: 'catfish', 鲿科: 'catfish', 鮰科: 'catfish', 胡鲶科: 'catfish', 江鳕科: 'catfish',
    甲鲶科: 'pleco', 狗鱼科: 'pike', 雀鳝科: 'pike', 鲑科: 'salmon',
    鳜科: 'perch', 鲈科: 'perch', 花鲈科: 'perch', 棘臀鱼科: 'perch', 丽鱼科: 'deep',
    鳢科: 'snakehead', 沙塘鳢科: 'goby', 塘鳢科: 'goby', 虾虎鱼科: 'goby', 鲻科: 'mullet',
  };
  const TYPE_BY_SLUG = {
    bianyu: 'deep', wuchangyu: 'deep', pangpi: 'deep', taiyangyu: 'deep', ououbian: 'deep',
    ganyu: 'slim', qiaozui: 'slim', hongweibo: 'slim', qingshao: 'slim', baitiao: 'slim',
    yinpiaoyu: 'slim', sheju: 'slim', niuweiba: 'catfish', huaitounian: 'catfish',
  };

  // [背, 侧, 腹, 鳍]
  const PALETTES = [
    ['#4d5b4a', '#9aa58f', '#e7e4d4', '#7a7f62'],
    ['#3d4f5c', '#9fb2bd', '#eef2f2', '#7d8f99'],
    ['#5a4a32', '#b39b6d', '#efe3c4', '#8c6d3f'],
    ['#2f4a3e', '#7f9e86', '#dfe8dc', '#5e7d63'],
    ['#4a4f63', '#a3a8bd', '#ecedf3', '#80849a'],
    ['#5b5240', '#a9a07f', '#ece6cf', '#857b5a'],
  ];
  const SLUG_STYLE = {
    liyu: { pal: ['#5b4520', '#c09a4a', '#efdcae', '#a8662e'] },
    jiyu: { pal: ['#3f4a3a', '#a7ae95', '#ece9d9', '#6f745c'] },
    caoyu: { pal: ['#3c4a2c', '#9a9f6c', '#e9e5c6', '#727148'] },
    wuli: { pal: ['#2b2b22', '#5f5b45', '#c9c3a8', '#3a382c'], pattern: 'blotch' },
    banli: { pal: ['#26302a', '#5c6b5a', '#cfd5c4', '#38423a'], pattern: 'blotch' },
    yueli: { pal: ['#24322b', '#5b7462', '#c7d4c4', '#3a4a40'], pattern: 'bands' },
    guiyu: { pal: ['#5a4a26', '#b8a066', '#efe2b8', '#7d6a3a'], pattern: 'spots' },
    dayangui: { pal: ['#5a4a2a', '#b09a6b', '#ede0bf', '#7d6a42'], pattern: 'spots' },
    bangui: { pal: ['#4a3f26', '#a99363', '#eadcb5', '#6e5f39'], pattern: 'spots' },
    huangsang: { pal: ['#3d3517', '#c9a640', '#f2dc8f', '#8a7124'], pattern: 'blotch' },
    guangzehuangsang: { pal: ['#4a3f1a', '#d4b24c', '#f4e29c', '#93792b'] },
    jianghuang: { pal: ['#4a3f22', '#c4a457', '#f0dca0', '#8a7130'] },
    makou: { pal: ['#24425a', '#6fa3b8', '#f2c9a0', '#e07b3e'], pattern: 'bands' },
    kuanqilie: { pal: ['#2f4f66', '#86b3c7', '#f3d2c2', '#e0745a'], pattern: 'bands' },
    xishiban: { pal: ['#4a4636', '#a9a284', '#e9e3cc', '#c06a3a'], pattern: 'bands' },
    hongzun: { pal: ['#3d5148', '#a7b8a6', '#eef0e8', '#7b8f84'], pattern: 'spots', stripe: '#d9708a' },
    hezun: { pal: ['#4e4430', '#b39e6c', '#efe5c8', '#7f6c44'], pattern: 'redspots' },
    luofei: { pal: ['#3e4648', '#8e9a9c', '#dfe4e2', '#6b5a5a'], pattern: 'bands' },
    taiyangyu: { pal: ['#3a4a3a', '#8aa07a', '#f0c070', '#3b5a5a'], pattern: 'bands' },
    baibangouyu: { pal: ['#3b4a2a', '#8f9d63', '#e7e6c8', '#7a6a3a'], pattern: 'spots' },
    heibangouyu: { pal: ['#3a4430', '#98a27c', '#ece9d3', '#6b6a48'], pattern: 'spots' },
    helu: { pal: ['#3c4a2a', '#a3ad6b', '#efe9c4', '#d26a3a'], pattern: 'bands' },
    qingyu: { pal: ['#1f2428', '#3e464c', '#9aa2a6', '#262c30'] },
    ganyu: { pal: ['#5a4a26', '#c7b07a', '#f1e7c8', '#c98a3a'] },
    manli: { pal: ['#2c3326', '#68715a', '#e2e0cf', '#4b5340'] },
    huangshan: { pal: ['#4a3a1a', '#a37f3a', '#e5c98a', '#6e5422'], pattern: 'spots' },
    qingdaofu: { pal: ['#2f2b24', '#6b6252', '#b5ab95', '#3b352c'], pattern: 'spots' },
    queshan: { pal: ['#4a4530', '#9b9471', '#e2dcc0', '#6d6648'], pattern: 'spots' },
    jiangxue: { pal: ['#3e3a24', '#8a7f52', '#ddd3ad', '#5b5435'], pattern: 'blotch' },
    pangpi: { pal: ['#4a5a6a', '#b9c8d2', '#f3eee9', '#e6806a'], stripe: '#4f8fb0' },
    chiyanzun: { pal: ['#3e4a40', '#a3ad9c', '#ecece2', '#8a8a7a'], eye: '#d33' },
    dingguai: { pal: ['#24361f', '#4f6b3a', '#a7b48a', '#2e4226'], eye: '#c33' },
    hongweibo: { pal: ['#3e4a52', '#b2bec4', '#f2f4f4', '#d4553c'] },
    huoshaoqian: { pal: ['#4a3e2e', '#a39272', '#ecdcc2', '#d65a2a'], pattern: 'blotch' },
    xiahuyu: { pal: ['#4a4436', '#9d9478', '#e2dbc5', '#6e6650'], pattern: 'blotch' },
    shatangli: { pal: ['#3a3020', '#86704a', '#d9c7a0', '#5b4a30'], pattern: 'blotch' },
    jiazhoulu: { pal: ['#33452e', '#89a070', '#e8ecd4', '#5f7448'], stripe: '#2c3a28' },
    hailu: { pal: ['#3e4c58', '#a9b7c0', '#f1f4f5', '#7d8b95'], pattern: 'spots' },
  };

  function hash(s) {
    let h = 2166136261;
    for (const c of s) h = Math.imul(h ^ c.codePointAt(0), 16777619);
    return h >>> 0;
  }

  function rng(seed) {
    let t = seed;
    return () => {
      t = (t + 0x6d2b79f5) | 0;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  const SHAPES = {
    carp: { ht: 22, hb: 20, hp: 7, xTop: 70, tail: 'fork', dorsal: [62, 100, 14] },
    deep: { ht: 31, hb: 29, hp: 7, xTop: 75, tail: 'fork', dorsal: [70, 112, 13] },
    slim: { ht: 15, hb: 15, hp: 6, xTop: 70, tail: 'fork', dorsal: [80, 96, 13] },
    perch: { ht: 25, hb: 21, hp: 8, xTop: 65, tail: 'trunc', dorsal: [48, 128, 13], spiny: true },
    salmon: { ht: 17, hb: 16, hp: 7, xTop: 75, tail: 'trunc', dorsal: [78, 98, 13], adipose: true },
    pike: { ht: 12, hb: 12, hp: 7, xTop: 95, tail: 'fork', dorsal: [128, 150, 12], snout: true },
    catfish: { ht: 17, hb: 16, hp: 9, xTop: 60, tail: 'round', dorsal: [52, 64, 12], barbels: true, analLong: true },
    pleco: { ht: 15, hb: 12, hp: 6, xTop: 60, tail: 'trunc', dorsal: [48, 92, 22], barbels: false },
    eel: { ht: 9, hb: 9, hp: 6, xTop: 60, tail: 'eel', dorsal: [70, 185, 5] },
    loach: { ht: 9, hb: 9, hp: 7, xTop: 60, tail: 'round', dorsal: [92, 104, 7], barbels: true },
    snakehead: { ht: 14, hb: 14, hp: 9, xTop: 60, tail: 'round', dorsal: [44, 152, 8], analLong: true },
    goby: { ht: 15, hb: 14, hp: 8, xTop: 45, tail: 'round', dorsal: [58, 74, 10], dorsal2: [90, 128, 9] },
    mullet: { ht: 16, hb: 15, hp: 7, xTop: 65, tail: 'fork', dorsal: [72, 86, 11], dorsal2: [110, 122, 8] },
  };

  function shapeOf(sp) {
    return TYPE_BY_SLUG[sp.slug] || TYPE_BY_FAMILY[sp.family] || 'carp';
  }

  function bodyPath(S) {
    const { ht, hb, hp, xTop } = S;
    const xp = S.tail === 'eel' ? 186 : 152;
    const ny = S.snout ? 52 : 50;
    const nx = 6;
    let p = `M ${nx},${ny} C ${nx + 10},${50 - ht * 0.75} ${xTop - 30},${50 - ht} ${xTop},${50 - ht} `;
    p += `C ${xTop + 40},${50 - ht} ${xp - 25},${50 - hp} ${xp},${50 - hp} `;
    if (S.tail === 'fork') p += `L 194,${50 - ht * 0.85} Q 176,50 194,${50 + ht * 0.85} L ${xp},${50 + hp} `;
    else if (S.tail === 'trunc') p += `L 192,${50 - ht * 0.7} Q 186,50 192,${50 + ht * 0.7} L ${xp},${50 + hp} `;
    else if (S.tail === 'round') p += `C 200,${50 - ht * 0.9} 200,${50 + ht * 0.9} ${xp},${50 + hp} `;
    else p += `C 198,${50 - hp} 198,${50 + hp} ${xp},${50 + hp} `;
    p += `C ${xp - 25},${50 + hp} ${xTop + 40},${50 + hb} ${xTop},${50 + hb} `;
    p += `C ${xTop - 30},${50 + hb} ${nx + 8},${50 + hb * 0.6} ${nx},${ny} Z`;
    return p;
  }

  function topY(S, x) {
    // 背部轮廓近似（用于放置背鳍）
    const { ht, hp, xTop } = S;
    if (x <= xTop) return 50 - ht * (0.45 + 0.55 * Math.sin(((x - 6) / (xTop - 6)) * Math.PI / 2));
    const t = Math.min(1, (x - xTop) / (152 - xTop));
    return 50 - (ht - (ht - hp) * t * t);
  }
  function botY(S, x) {
    const { hb, hp, xTop } = S;
    if (x <= xTop) return 50 + hb * (0.4 + 0.6 * Math.sin(((x - 6) / (xTop - 6)) * Math.PI / 2));
    const t = Math.min(1, (x - xTop) / (152 - xTop));
    return 50 + (hb - (hb - hp) * t * t);
  }

  function finPath(S, [x0, x1, h], spiny) {
    const y0 = topY(S, x0) + 1.5, y1 = topY(S, x1) + 1.5;
    if (!spiny) return `M ${x0},${y0} Q ${x0 + 4},${y0 - h} ${x0 + (x1 - x0) * 0.35},${y0 - h} L ${x1},${y1} Z`;
    let p = `M ${x0},${y0} `;
    const n = Math.max(4, Math.round((x1 - x0) / 8));
    for (let i = 0; i <= n; i++) {
      const x = x0 + ((x1 - x0) * i) / n;
      const ty = topY(S, x);
      p += `L ${x},${ty - h * (i < n * 0.6 ? 1 : 0.75)} L ${x + (x1 - x0) / n / 2},${ty - h * 0.45} `;
    }
    return p + `L ${x1},${y1} Z`;
  }

  const pixelSilhouettes = new Map();
  function silhouetteSVG(type, body, fins) {
    if (pixelSilhouettes.has(type)) return pixelSilhouettes.get(type);
    const step = 2, cols = 100, rows = 50;
    const canvas = document.createElement('canvas');
    canvas.width = cols; canvas.height = rows;
    const ctx = canvas.getContext('2d');
    ctx.scale(1 / step, 1 / step);
    [body, ...fins].forEach((d) => ctx.fill(new Path2D(d)));
    const { data } = ctx.getImageData(0, 0, cols, rows);
    let path = '';
    // Convert the sampled mask into horizontal SVG runs with square edges.
    for (let y = 0; y < rows; y++) {
      let start = -1;
      for (let x = 0; x <= cols; x++) {
        const filled = x < cols && data[(y * cols + x) * 4 + 3] >= 128;
        if (filled && start < 0) start = x;
        else if (!filled && start >= 0) {
          path += `M${start * step} ${y * step}h${(x - start) * step}v${step}H${start * step}Z`;
          start = -1;
        }
      }
    }
    const svg = `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" class="fish-svg pixel-fish" shape-rendering="crispEdges"><path fill="#05101a" d="${path}"/></svg>`;
    pixelSilhouettes.set(type, svg);
    return svg;
  }

  function fishSVG(sp, opt = {}) {
    const id = `f${++uid}`;
    const type = shapeOf(sp);
    const S = SHAPES[type];
    const st = SLUG_STYLE[sp.slug] || {};
    const pal = st.pal || PALETTES[hash(sp.slug) % PALETTES.length];
    const [back, side, belly, fin] = pal;
    const body = bodyPath(S);
    const sil = !!opt.silhouette;
    const r = rng(hash(sp.slug));

    const fins = [];
    fins.push(finPath(S, S.dorsal, S.spiny));
    if (S.dorsal2) fins.push(finPath(S, S.dorsal2));
    if (S.adipose) fins.push(`M 132,${topY(S, 132) + 1} Q 138,${topY(S, 136) - 6} 144,${topY(S, 144) + 1} Z`);
    // 腹鳍、臀鳍
    const px = S.xTop + 10;
    fins.push(`M ${px},${botY(S, px) - 1} L ${px + 8},${botY(S, px) + 9} L ${px + 14},${botY(S, px + 12) - 1} Z`);
    if (S.analLong) fins.push(`M 98,${botY(S, 98) - 1} L 104,${botY(S, 100) + 7} L 150,${botY(S, 150) + 5} L 152,${botY(S, 150) - 1} Z`);
    else if (S.tail !== 'eel') fins.push(`M 118,${botY(S, 118) - 1} L 124,${botY(S, 120) + 9} L 136,${botY(S, 136) - 1} Z`);
    if (S.tail === 'eel') fins.push(`M 110,${botY(S, 110) - 1} L 186,${botY(S, 186) + 3} L 186,${botY(S, 186) - 1} Z`);

    const eyeX = S.snout ? 30 : type === 'goby' ? 20 : 24;
    const eyeY = topY(S, eyeX) + (type === 'catfish' ? 5 : 7);
    const eyeR = Math.max(2.2, S.ht * 0.11);

    if (sil) {
      return silhouetteSVG(type, body, fins);
    }

    // 花纹
    const pat = [];
    const pattern = st.pattern;
    if (pattern === 'bands') {
      const n = sp.slug === 'xishiban' ? 6 : 7;
      for (let i = 0; i < n; i++) {
        const x = 40 + i * (100 / n);
        pat.push(`<rect x="${x}" y="0" width="${70 / n}" height="100" fill="${back}" opacity=".45"/>`);
      }
    } else if (pattern === 'spots' || pattern === 'redspots') {
      for (let i = 0; i < 46; i++) {
        const x = 30 + r() * 125, y = 50 - S.ht + r() * S.ht * 1.7;
        const c = pattern === 'redspots' && i % 3 === 0 ? '#c4473a' : back;
        pat.push(`<circle cx="${x}" cy="${y}" r="${0.8 + r() * 1.8}" fill="${c}" opacity=".7"/>`);
      }
    } else if (pattern === 'blotch') {
      for (let i = 0; i < 9; i++) {
        const x = 34 + r() * 115, y = 50 - S.ht * 0.6 + r() * S.ht * 1.0;
        pat.push(`<ellipse cx="${x}" cy="${y}" rx="${5 + r() * 7}" ry="${3 + r() * 5}" fill="${back}" opacity=".55"/>`);
      }
    }
    if (st.stripe) pat.push(`<rect x="20" y="${48}" width="170" height="${Math.max(3, S.ht * 0.22)}" fill="${st.stripe}" opacity=".55"/>`);

    // 鳞片纹理（写实感）
    const scales = type === 'eel' || type === 'catfish' || type === 'loach'
      ? ''
      : `<pattern id="${id}s" width="6" height="5" patternUnits="userSpaceOnUse"><path d="M0 5 Q3 0 6 5" fill="none" stroke="${back}" stroke-width=".5" opacity=".35"/></pattern>
         <rect x="0" y="0" width="200" height="100" fill="url(#${id}s)"/>`;

    const barbels = S.barbels
      ? `<g stroke="${fin}" stroke-width="1" fill="none" stroke-linecap="round">
           <path d="M 9,${50 + 2} Q 0,${58} -4,${70}"/><path d="M 11,${50 + 4} Q 6,${64} 4,${72}"/>
           ${type === 'catfish' ? `<path d="M 12,${50 - 2} Q 0,${40} -6,${44}"/>` : ''}</g>`
      : '';

    return `<svg viewBox="-8 0 210 100" xmlns="http://www.w3.org/2000/svg" class="fish-svg">
  <defs>
    <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${back}"/><stop offset=".45" stop-color="${side}"/><stop offset="1" stop-color="${belly}"/>
    </linearGradient>
    <linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".32" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="${id}c"><path d="${body}"/></clipPath>
  </defs>
  ${barbels}
  <g fill="${fin}" opacity=".88">${fins.map((f) => `<path d="${f}"/>`).join('')}</g>
  <path d="${body}" fill="url(#${id}b)"/>
  <g clip-path="url(#${id}c)">
    ${pat.join('')}
    ${scales}
    <rect x="0" y="0" width="200" height="100" fill="url(#${id}h)"/>
    <path d="M 40,${50 - S.ht * 0.1} Q 100,${50 - S.ht * 0.05} 160,50" stroke="${back}" stroke-width=".6" fill="none" opacity=".5"/>
    <path d="M ${eyeX + 12},${50 - S.ht * 0.75} Q ${eyeX + 20},50 ${eyeX + 12},${50 + S.hb * 0.7}" stroke="${back}" stroke-width="1" fill="none" opacity=".45"/>
  </g>
  <ellipse cx="${eyeX + 26}" cy="${50 + S.ht * 0.25}" rx="9" ry="3.5" fill="${fin}" opacity=".75" transform="rotate(25 ${eyeX + 26} ${50 + S.ht * 0.25})"/>
  <circle cx="${eyeX}" cy="${eyeY}" r="${eyeR}" fill="${st.eye || '#d9c27a'}"/>
  <circle cx="${eyeX}" cy="${eyeY}" r="${eyeR * 0.62}" fill="#0b0b0b"/>
  <circle cx="${eyeX - eyeR * 0.3}" cy="${eyeY - eyeR * 0.35}" r="${eyeR * 0.25}" fill="#fff" opacity=".9"/>
</svg>`;
  }

  window.YK_FISH = { fishSVG, hash, rng };
})();
