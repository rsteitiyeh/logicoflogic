/* ============================================================
   LogicOfLogic — partials.js
   Renders header, footer, WhatsApp FAB, and cookie banner
   on every page. Highlights nav by data-page attribute.
   ============================================================ */

(function () {
  var page = document.body.getAttribute('data-page') || '';
  var year = new Date().getFullYear();
  var WHATSAPP_NUM = '962790000000';

  /* ---------- Header ---------- */
  var navItems = [
    { id: 'home',      label: 'Home',      href: 'index.html' },
    { id: 'about',     label: 'About',     href: 'about.html' },
    { id: 'services',  label: 'Services',  href: 'services.html' },
    { id: 'knowledge', label: 'Knowledge', href: 'knowledge.html' },
    { id: 'contact',   label: 'Contact',   href: 'contact.html' }
  ];

  var serviceParents = ['service-agents','service-advisory','service-audits','service-training'];
  var activeNavId = page;
  if (serviceParents.indexOf(page) !== -1) activeNavId = 'services';

  var symbolSVG =
    '<svg class="symbol" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">' +
      '<rect x="1" y="1" width="20" height="20" stroke="currentColor" stroke-width="1.2" fill="none"/>' +
      '<rect x="5" y="5" width="12" height="12" stroke="currentColor" stroke-width="1.2" fill="none"/>' +
      '<rect x="9" y="9" width="4" height="4" fill="currentColor"/>' +
    '</svg>';

  var headerHTML =
    '<header class="site-header"><div class="wrap">' +
      '<a href="index.html" class="brand-mark" aria-label="LogicOfLogic home">' +
        symbolSVG +
        '<span class="wordmark">logicoflogic</span>' +
      '</a>' +
      '<nav class="nav">' +
        navItems.map(function (i) {
          var active = (i.id === activeNavId) ? ' data-active="true"' : '';
          return '<a href="' + i.href + '"' + active + '>' + i.label + '</a>';
        }).join('') +
      '</nav>' +
    '</div></header>';

  var headerMount = document.getElementById('site-header');
  if (headerMount) headerMount.outerHTML = headerHTML;

  /* ---------- Footer ---------- */
  var footerHTML =
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<div class="wordmark">logicoflogic</div>' +
          '<p>Operating brand of Trilot LLC.<br>Agentic AI, implementation-first.</p>' +
          '<p class="mono-sm" style="color:var(--cream-edge)">Trilot LLC · Wyoming · est. 1999 (re-registered 2024)</p>' +
        '</div>' +
        '<div>' +
          '<h4>site</h4>' +
          '<ul>' +
            '<li><a href="index.html">Home</a></li>' +
            '<li><a href="about.html">About</a></li>' +
            '<li><a href="services.html">Services</a></li>' +
            '<li><a href="knowledge.html">Knowledge</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>services</h4>' +
          '<ul>' +
            '<li><a href="service-agents.html">01 Agent design &amp; implementation</a></li>' +
            '<li><a href="service-advisory.html">02 AI infrastructure advisory</a></li>' +
            '<li><a href="service-audits.html">03 AI integration audits</a></li>' +
            '<li><a href="service-training.html">04 Cohort &amp; team training</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>family</h4>' +
          '<ul>' +
            '<li><a href="https://trilot.com" target="_blank" rel="noopener">Trilot ↗</a></li>' +
            '<li><a href="https://dnblackbook.com" target="_blank" rel="noopener">DnBlackbook ↗</a></li>' +
            '<li><a href="privacy.html">Privacy</a></li>' +
            '<li><a href="terms.html">Terms</a></li>' +
            '<li><a href="cookies.html">Cookies</a></li>' +
            '<li><a href="refund.html">Refund</a></li>' +
            '<li><a href="anti-spam.html">Anti-Spam</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© ' + year + ' LogicOfLogic · operating brand of Trilot LLC</span>' +
        '<span>amman ⟷ wyoming</span>' +
      '</div>' +
    '</div></footer>';

  var footerMount = document.getElementById('site-footer');
  if (footerMount) footerMount.outerHTML = footerHTML;

  /* ---------- WhatsApp FAB ---------- */
  if (!document.body.classList.contains('no-fab')) {
    var fab = document.createElement('a');
    fab.href = 'https://wa.me/' + WHATSAPP_NUM + '?text=Hi%20Rami%20%E2%80%94%20found%20you%20via%20LogicOfLogic';
    fab.className = 'fab';
    fab.target = '_blank';
    fab.rel = 'noopener';
    fab.setAttribute('aria-label', 'WhatsApp');
    fab.innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.1 14.9 3.7 13.5 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8-8.3 8z"/>' +
      '</svg>';
    document.body.appendChild(fab);
  }

  /* ---------- Cookie banner ---------- */
  var COOKIE_KEY = 'logicoflogic.cookieConsent';
  if (!localStorage.getItem(COOKIE_KEY)) {
    var banner = document.createElement('div');
    banner.className = 'cookies';
    banner.innerHTML =
      '<div>This site uses cookieless analytics. No tracking pixels. Read our <a href="cookies.html" style="color:var(--ink);border-bottom:1px solid var(--rust)">cookie policy</a>.</div>' +
      '<div class="cookies-actions">' +
        '<button data-c="accept">OK</button>' +
        '<button class="ghost" data-c="decline">decline</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.addEventListener('click', function (e) {
      var action = e.target.getAttribute('data-c');
      if (!action) return;
      localStorage.setItem(COOKIE_KEY, action);
      banner.remove();
    });
  }
})();
