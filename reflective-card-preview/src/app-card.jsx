import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import YukomonFishCard from '../../YukomonFishCard.jsx';
import material from './app-material.json';
import './app-card.css';

const roots = new Map();
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const logo = new URL('img/yukomon-pixel-logo.svg', document.baseURI).href;
const videoSrc = new URL(material.videoSrc, document.baseURI).href;
function create(sp, o = {}) {
  const rarity = o.variant === 'ur' ? 'UR' : sp.rarity;
  const card = o.card || {};
  const fishSVG = window.YK_FISH.fishSVG(sp);
  const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fishSVG)}`;
  const shell = document.createElement('div');
  shell.className = `yk-card reflective-shell r-${rarity}${o.thumb ? ' thumb' : ''}${o.interactive ? ' interactive' : ''}`;
  shell.dataset.rarity = rarity;
  shell.dataset.offset = '10';
  shell.style.setProperty('--rc', window.YK_CARD?.RV[rarity].color || '#a9bec4');
  shell.style.setProperty('--yk-logo', `url("${logo}")`);
  shell.style.setProperty('--yk-fish', `url("${imageUrl}")`);
  const description = o.variant === 'ur' && o.giantInfo ? `巨物 · ${o.giantInfo.lengthCm} cm · ${o.giantInfo.city || ''}` : `${'★'.repeat(card.stars || 1)} · ${window.YK_CARD?.HAB[sp.habitat]?.name || sp.region}`;
  const defaultBack = `<section class="b-info"><div class="b-title"><h2>${esc(sp.name)}</h2><span class="no">YK-${sp.no}</span></div><div class="latin">${esc(sp.latin)}</div><p>${esc(sp.fact)}</p><dl><div><dt>分布</dt><dd>${esc(sp.region)}</dd></div><div><dt>习性</dt><dd>${esc(sp.method)}</dd></div><div><dt>体长</dt><dd>${sp.commonCm} cm</dd></div><div><dt>巨物线</dt><dd>${sp.giantThresholdCm} cm</dd></div></dl></section>`;
  shell.innerHTML = `<div class="card-tilt"><div class="card-flip"><div class="card-face card-front"><div class="reflective-mount"></div></div><div class="card-face card-back"><div class="reflective-back-foil" aria-hidden="true"></div><div class="reflective-back-content">${o.back || defaultBack}</div></div></div></div>`;
  const host = shell.querySelector('.reflective-mount');
  if (o.thumb) {
    host.innerHTML = `<div class="reflective-card yukomon-fish-card"><div class="reflective-card__body"><div class="reflective-card__content"><div class="yukomon-fish-card__inner"><span class="yukomon-fish-card__laser" aria-hidden="true"></span><span class="yukomon-fish-card__number">YK-${sp.no}</span>${window.YK_RARITY.html(rarity, 'yukomon-fish-card__rarity', 'dark')}<span class="yukomon-fish-card__fish-stage"><img class="yukomon-fish-card__fish" src="${esc(imageUrl)}" alt="${esc(sp.name)}" loading="lazy" draggable="false"></span><span class="yukomon-fish-card__scrim"></span><div class="yukomon-fish-card__identity"><h3>${esc(sp.name)}</h3><p>${esc(sp.latin)}</p></div><span class="yukomon-fish-card__inner-rim"></span></div><p class="yukomon-fish-card__description">${esc(description)}</p></div></div></div>`;
  } else {
    const tilt = shell.querySelector('.card-tilt');
    const root = createRoot(host);
    roots.set(shell, root);
    // App timelines own the entrance; the component drives the shared front/back tilt.
    flushSync(() => root.render(<YukomonFishCard {...material.values} theme={material.theme} videoSrc={videoSrc} number={`YK-${sp.no}`} rarity={rarity} name={sp.name} englishName={sp.latin} description={description} imageUrl={imageUrl} width="100%" height="100%" intro={false} enableTilt={material.enableTilt} enableMobileTilt={true} interactionElement={shell} onTiltChange={({ x, y }) => { tilt.style.transform = `rotateX(${x.toFixed(3)}deg) rotateY(${y.toFixed(3)}deg)`; }} />));
  }
  if (o.interactive) {
    shell.setAttribute('role', 'button'); shell.tabIndex = 0;
    shell.setAttribute('aria-label', `${sp.name} ${rarity}鱼卡，点击翻面`);
    shell.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); window.YK_CARD.flip(shell); window.YK_AUDIO.play('ui_flip'); } });
    let pointerStart, dragged = false;
    shell.addEventListener('pointerdown', e => { pointerStart = { x: e.clientX, y: e.clientY }; dragged = false; });
    shell.addEventListener('pointermove', e => { if (pointerStart && Math.hypot(e.clientX - pointerStart.x, e.clientY - pointerStart.y) > 10) dragged = true; });
    shell.addEventListener('click', e => { if (dragged) { e.stopImmediatePropagation(); e.preventDefault(); } pointerStart = null; }, true);
  }
  return shell;
}

// Every page, variant swap and unlock teardown releases its React root and WebGL resources.
new MutationObserver(() => {
  for (const [node, root] of roots) if (!node.isConnected) { root.unmount(); roots.delete(node); }
}).observe(document.getElementById('app'), { childList: true, subtree: true });
window.YK_REFLECTIVE = { create, material, get mountedCount() { return roots.size; } };
