// PAYPAL WEDDING GIFTS
// Paste your full HTTPS PayPal.Me or PayPal pool link between these quotes:
var PAYPAL_GIFT_LINK = "";

(function initialisePayPalGifts(){
  var wrap = document.getElementById('giftLinkWrap');
  var link = document.getElementById('giftLink');
  if (!wrap || !link) return;

  var paymentLink = typeof PAYPAL_GIFT_LINK === 'string' ? PAYPAL_GIFT_LINK.trim() : '';
  if (!paymentLink) return;

  wrap.style.display = 'none';
  link.removeAttribute('href');
  try {
    var url = new URL(paymentLink);
    var allowedHosts = ['paypal.me', 'www.paypal.me', 'paypal.com', 'www.paypal.com'];
    if (url.protocol !== 'https:' || url.username || url.password || url.port ||
        allowedHosts.indexOf(url.hostname.toLowerCase()) === -1 || url.pathname === '/') return;
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    wrap.style.display = '';
  } catch (e) {
    // An incomplete or invalid link stays hidden without interrupting the page.
  }
})();
