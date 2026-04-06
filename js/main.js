/* Capps Blasting — main.js */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hero title letter-by-letter animation ─────────────────── */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const nodes = Array.from(heroTitle.childNodes);
    heroTitle.innerHTML = '';

    let delay = 0.2;
    const step = 0.055;

    nodes.forEach(node => {
      const isAccent = node.nodeType === Node.ELEMENT_NODE;
      const className = isAccent ? 'char char--accent' : 'char';
      // Split into word/space tokens so words never break mid-character
      const tokens = node.textContent.match(/\S+|\s+/g) || [];

      tokens.forEach(token => {
        if (/^\s+$/.test(token)) {
          // Whitespace — add chars directly (white-space: pre handles display)
          [...token].forEach(char => {
            const span = document.createElement('span');
            span.className = className;
            span.textContent = char;
            span.style.animationDelay = `${delay.toFixed(3)}s`;
            heroTitle.appendChild(span);
            delay += step;
          });
        } else {
          // Word — wrap all its chars in a nowrap container
          const word = document.createElement('span');
          word.style.whiteSpace = 'nowrap';
          word.style.display = 'inline';
          [...token].forEach(char => {
            const span = document.createElement('span');
            span.className = className;
            span.textContent = char;
            span.style.animationDelay = `${delay.toFixed(3)}s`;
            word.appendChild(span);
            delay += step;
          });
          heroTitle.appendChild(word);
        }
      });
    });
  }


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
