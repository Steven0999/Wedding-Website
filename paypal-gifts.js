// PAYPAL WEDDING GIFTS
// Paste your full HTTPS PayPal.Me or PayPal pool link between these quotes:
var PAYPAL_GIFT_LINK = "https://www.paypal.com/pool/9u6tSF6RJm?sr=wccr";

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

  link.textContent = 'Honeymoon Gift';
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
    link.setAttribute('aria-label', 'Honeymoon Gift using PayPal (opens in a new tab)');
  } catch (e) {
    // An incomplete or invalid link leaves the button inactive.
  }
})();

(function initialiseGuestAccommodation(){
  var stayHeading = document.querySelector('#stay .section-title');
  var invitationHeading = document.getElementById('heroNamedTo');
  if (!stayHeading || !invitationHeading) return;

  var note = document.createElement('div');
  note.className = 'stay-travel';
  note.style.margin = '0 auto 2rem';
  [
    'We are delighted you are staying at the Rivervale Lodge:',
    'Check in is from 3pm on the day of the wedding and check out by 10am the next morning.',
    "Breakfast is served 8am-9am in the breakfast room of the lodge, we can't wait to share our first breakfast as Mr & Mrs Vaughan with you!"
  ].forEach(function(text) {
    var paragraph = document.createElement('p');
    paragraph.textContent = text;
    note.appendChild(paragraph);
  });

  function updateGuestAccommodation(){
    var guest = window.currentGuest;
    if (guest && guest.firstName === 'Steven' && guest.surname === 'Vaughan') {
      stayHeading.after(note);
    } else {
      note.remove();
    }
  }

  // Opening an invitation updates its heading. Handle QR sign-ins that already ran too.
  new MutationObserver(updateGuestAccommodation).observe(invitationHeading, { childList: true });
  updateGuestAccommodation();
})();
