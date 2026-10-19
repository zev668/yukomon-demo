/* One label component for classic pages and React cards. */
(function () {
  const names = { N: '普通', R: '稀有', SR: '超稀有', SSR: '传说', UR: '巨物' };
  const levelOf = value => Object.hasOwn(names, value) ? value : 'N';
  class RarityLabel extends HTMLElement {
    static get observedAttributes() { return ['level']; }
    connectedCallback() { this.update(); }
    attributeChangedCallback() { this.update(); }
    update() {
      const level = levelOf(this.getAttribute('level'));
      this.dataset.rarity = level;
      this.textContent = level;
      this.setAttribute('aria-label', `${names[level]}品质 ${level}`);
    }
  }
  if (!customElements.get('yk-rarity')) customElements.define('yk-rarity', RarityLabel);
  window.YK_RARITY = {
    html(value, className = '', tone = '') {
      const level = levelOf(value);
      const safeClass = className.replace(/[^a-zA-Z0-9_ -]/g, '');
      return `<yk-rarity level="${level}" class="${safeClass}"${tone === 'dark' ? ' tone="dark"' : ''}>${level}</yk-rarity>`;
    }
  };
})();
