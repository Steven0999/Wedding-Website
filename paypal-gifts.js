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
  var staySection = document.getElementById('stay');
  var stayHeading = staySection && staySection.querySelector('.section-title');
  var invitationHeading = document.getElementById('heroNamedTo');
  if (!stayHeading || !invitationHeading) return;

  var lodgeInvitations = new Set(['Steven Vaughan', 'Caitriona Barry', 'Rian Nobes', 'Kye Newton']);
  var lodgeParties = [
    ['Heather Fraser', 'Brendan Kane'],
    ['Kelsey Killick', 'Nick Ryall'],
    ['Kian Newton', 'Harriet Gaines'],
    ['Paul Barry', 'Elle Barry']
  ];
  GUESTS.forEach(function(invitation) {
    if (!invitation.members) return;
    var members = invitation.members.map(fullNameOf);
    if (lodgeParties.some(function(party) {
      return party.every(function(name) { return members.includes(name); });
    })) {
      lodgeInvitations.add(jointNames(invitation.members).full);
    }
  });

  var stayStyles = document.createElement('style');
  stayStyles.textContent =
    '#stay.lodge-only > .section-inner > .body-text, ' +
    '#stay.lodge-only > .stay-grid, ' +
    '#stay.lodge-only > .stay-travel { display: none; }';
  document.head.appendChild(stayStyles);

  var note = document.createElement('div');
  note.className = 'stay-travel';
  note.style.margin = '0 auto';
  [
    'We are delighted you are staying at the Rivervale Lodge:',
    'Check in is from 3pm on the day of the wedding and check out by 10am the next morning.',
    "Breakfast is served 8am-9am in the breakfast room of the lodge, we can't wait to share our first breakfast as Mr & Mrs Vaughan with you!"
  ].forEach(function(text) {
    var paragraph = document.createElement('p');
    paragraph.textContent = text;
    note.appendChild(paragraph);
  });

  function hasLodgeAccommodation(guest){
    if (!guest) return false;
    if (lodgeInvitations.has(fullNameOf(guest))) return true;

    // A QR link can identify one member of a shared invitation.
    var matches = collectMatches(normName(guest.firstName), normName(guest.surname));
    return matches.length === 1 && lodgeInvitations.has(matches[0].label);
  }

  function updateGuestAccommodation(){
    var showLodgeOnly = hasLodgeAccommodation(window.currentGuest);
    staySection.classList.toggle('lodge-only', showLodgeOnly);
    if (showLodgeOnly) {
      stayHeading.after(note);
    } else {
      note.remove();
    }
  }

  // Opening an invitation updates its heading. Handle QR sign-ins that already ran too.
  new MutationObserver(updateGuestAccommodation).observe(invitationHeading, { childList: true });
  updateGuestAccommodation();
})();

(function initialiseInvitationScroll(){
  var site = document.getElementById('site');
  if (!site) return;

  function scrollToTop(){
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  function resetEntry(){
    // The inline invitation code has already processed any QR link.
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
    scrollToTop();
  }

  resetEntry();
  window.addEventListener('pageshow', function(event){
    if (event.persisted || !site.classList.contains('visible')) {
      window.requestAnimationFrame(resetEntry);
    }
  });

  var revealObserver = new MutationObserver(function(){
    if (site.classList.contains('visible')) {
      scrollToTop();
      revealObserver.disconnect();
    }
  });
  revealObserver.observe(site, { attributes: true, attributeFilter: ['class'] });
})();
