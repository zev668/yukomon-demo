(function () {
  const normalize = value => String(value ?? '').replace(/\D/g, '').slice(0, 3).padStart(3, '0');
  class CardNumber extends HTMLElement {
    static get observedAttributes() { return ['number']; }
    connectedCallback() { this.update(); }
    attributeChangedCallback() { this.update(); }
    update() { this.textContent = `No.${normalize(this.getAttribute('number'))}`; }
  }
  if (!customElements.get('yk-card-number')) customElements.define('yk-card-number', CardNumber);
  window.YK_CARD_NUMBER = {
    html(number) { return `<yk-card-number number="${normalize(number)}"></yk-card-number>`; }
  };
})();
