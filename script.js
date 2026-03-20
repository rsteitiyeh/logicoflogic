/* Logic of Logic — Client-side JavaScript */

const RECAPTCHA_SITE_KEY = '6Let45AsAAAAAJpX3dIEF67t3osSIeaiOyIWCOkD';

document.addEventListener('DOMContentLoaded', () => {
  // ── Smooth scroll for CTA buttons ──
  document.querySelectorAll('a[href="#signup"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('signup').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // ── FAQ Accordion ──
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Scroll animations ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── Form Submission Handler (shared by both forms) ──
  function handleFormSubmit(form, msgElId) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const consent = form.querySelector('input[name="consent"]');
      const btn = form.querySelector('button[type="submit"]');
      const msgEl = document.getElementById(msgElId);
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      // Reset
      msgEl.textContent = '';
      msgEl.className = 'form-message';

      // Validate name
      if (!name) {
        msgEl.textContent = 'Please enter your first name.';
        msgEl.className = 'form-message error';
        nameInput.focus();
        return;
      }

      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msgEl.textContent = 'Please enter a valid email address.';
        msgEl.className = 'form-message error';
        emailInput.focus();
        return;
      }

      // Validate consent
      if (!consent.checked) {
        msgEl.textContent = 'Please check the consent box to continue.';
        msgEl.className = 'form-message error';
        return;
      }

      // Loading state
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled = true;

      try {
        // Get reCAPTCHA token
        const recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'subscribe' });

        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, recaptchaToken }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          form.innerHTML = `
            <div class="success-state">
              <div class="success-icon">✓</div>
              <h3>Check your inbox!</h3>
              <p>Your Prompt Cheat Sheet is on its way to <strong>${email}</strong>.</p>
              <p class="small">Don't see it? Check your spam folder. Or grab it directly:</p>
              <a href="/downloads/prompt-cheatsheet.pdf" download class="btn-secondary">Download PDF Directly →</a>
            </div>
          `;
        } else {
          msgEl.textContent = data.error || 'Something went wrong. Please try again.';
          msgEl.className = 'form-message error';
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      } catch (err) {
        msgEl.textContent = 'Network error. Please try again or email us at hello@logicoflogic.com';
        msgEl.className = 'form-message error';
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });
  }

  // Initialize both forms
  const heroForm = document.getElementById('hero-form');
  const mainForm = document.getElementById('subscribe-form');
  if (heroForm) handleFormSubmit(heroForm, 'hero-form-message');
  if (mainForm) handleFormSubmit(mainForm, 'form-message');
});
