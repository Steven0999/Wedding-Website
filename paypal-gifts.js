// PAYPAL WEDDING GIFTS
// Paste your full HTTPS PayPal.Me or PayPal pool link between these quotes:
var PAYPAL_GIFT_LINK = "";

(function initialisePayPalGifts(){
  var wrap = document.getElementById('giftLinkWrap');
  var link = document.getElementById('giftLink');
  if (!wrap || !link) return;

  if (!document.getElementById('paypal-gift-button-styles')) {
    var style = document.createElement('style');
    style.id = 'paypal-gift-button-styles';
    style.textContent =
      '.paypal-gift-button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;max-width:100%;padding:1.1rem 2rem;border:1px solid var(--black,#0a0a0a);background:var(--black,#0a0a0a);color:#fff;font-family:inherit;font-size:.65rem;letter-spacing:.18em;line-height:1.6;text-transform:uppercase;text-align:center;text-decoration:none;cursor:pointer;transition:background .2s;}' +
      '.paypal-gift-button:hover{background:var(--stone-900,#1c1917);}' +
      '.paypal-gift-button:focus-visible{outline:2px solid var(--black,#0a0a0a);outline-offset:4px;}' +
      '.paypal-gift-button[aria-disabled="true"]{opacity:.55;cursor:not-allowed;}';
    document.head.appendChild(style);
  }

  link.textContent = 'Donate to our future';
  link.classList.remove('gift-link');
  link.classList.add('paypal-gift-button');
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.removeAttribute('href');
  link.setAttribute('aria-disabled', 'true');
  link.setAttribute('tabindex', '-1');
  wrap.style.display = '';

  var paymentLink = typeof PAYPAL_GIFT_LINK === 'string' ? PAYPAL_GIFT_LINK.trim() : '';
  if (!paymentLink) return;

  try {
    var url = new URL(paymentLink);
    var allowedHosts = ['paypal.me', 'www.paypal.me', 'paypal.com', 'www.paypal.com'];
    if (url.protocol !== 'https:' || url.username || url.password || url.port ||
        allowedHosts.indexOf(url.hostname.toLowerCase()) === -1 || url.pathname === '/') return;
    link.href = url.href;
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
    link.setAttribute('aria-label', 'Donate to our future using PayPal (opens in a new tab)');
  } catch (e) {
    // An incomplete or invalid link leaves the button inactive.
  }
})();
