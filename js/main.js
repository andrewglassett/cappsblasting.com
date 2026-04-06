/* Capps Blasting — main.js */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav toggle ─────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when any nav link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  function closeMobileNav() {
    if (!nav) return;
    nav.classList.remove('open');
    toggle && toggle.classList.remove('open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ── Active nav link ───────────────────────────────────── */
  const current = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === current || href === `./${current}`) {
      link.classList.add('active');
    }
  });

});
