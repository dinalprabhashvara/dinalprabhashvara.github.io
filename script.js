const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
}
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', (e) => { if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false); });

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px 50px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const sectionId = entry.target.id;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId));
    });
  }, { rootMargin: '-26% 0px -62% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}


/* COSMIC HORIZON · Ambient motion (no external libraries). */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero');
const progressBar = document.querySelector('.scroll-progress');

// Scroll progress uses one composited transform, updated once per animation frame.
let scrolling = false;
function updateScrollProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const progress = available > 0 ? Math.max(0, Math.min(1, window.scrollY / available)) : 0;
  progressBar.style.transform = `scaleX(${progress})`;
  scrolling = false;
}
window.addEventListener('scroll', () => {
  if (!scrolling) { scrolling = true; requestAnimationFrame(updateScrollProgress); }
}, { passive: true });
window.addEventListener('resize', () => requestAnimationFrame(updateScrollProgress), { passive: true });
updateScrollProgress();

// Deterministic star positions keep each visit visually consistent.
const starField = document.querySelector('.twinkle-field');
let randomSeed = 72819;
function random() {
  randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0;
  return randomSeed / 4294967296;
}
function createStars() {
  if (prefersReducedMotion.matches || starField.childElementCount) return;
  const frag = document.createDocumentFragment();
  const count = window.innerWidth <= 600 ? 14 : 34;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = `twinkle-star${i % 7 === 0 ? ' warm' : ''}`;
    star.style.left = `${(3 + random() * 94).toFixed(2)}%`;
    star.style.top = `${(7 + random() * 74).toFixed(2)}%`;
    star.style.setProperty('--size', `${(1 + random() * 1.7).toFixed(2)}px`);
    star.style.setProperty('--duration', `${(3.4 + random() * 5.6).toFixed(2)}s`);
    star.style.setProperty('--delay', `${(-random() * 9).toFixed(2)}s`);
    star.style.setProperty('--brightness', `${(.35 + random() * .45).toFixed(2)}`);
    frag.appendChild(star);
  }
  starField.appendChild(frag);
}
createStars();
// Pause decorative animations when their section leaves the viewport.
// On long pages, offscreen stars, orbital glows and shadows need no animation frames.
if ('IntersectionObserver' in window) {
  const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(({target, isIntersecting}) => {
      target.classList.toggle('motion-paused', !isIntersecting);
    });
  }, { rootMargin: '100px 0px 100px 0px', threshold: 0 });
  document.querySelectorAll('.hero, .vision-section, .closing-section').forEach((scene) => sceneObserver.observe(scene));
}
prefersReducedMotion.addEventListener('change', (event) => {
  if (event.matches) {
    starField.replaceChildren();
    hero.style.removeProperty('--px');
    hero.style.removeProperty('--py');
  } else {
    createStars();
  }
});

// Gentle desktop-only parallax, never active on touch or reduced motion.
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
let pointerFrame = 0;
hero.addEventListener('pointermove', (event) => {
  if (prefersReducedMotion.matches || !canHover.matches || pointerFrame) return;
  const x = (event.clientX / window.innerWidth - .5) * 2;
  const y = (event.clientY / window.innerHeight - .5) * 2;
  pointerFrame = requestAnimationFrame(() => {
    hero.style.setProperty('--px', x.toFixed(3));
    hero.style.setProperty('--py', y.toFixed(3));
    pointerFrame = 0;
  });
}, { passive: true });
hero.addEventListener('pointerleave', () => {
  hero.style.setProperty('--px', 0);
  hero.style.setProperty('--py', 0);
}, { passive: true });

// The glow under a card follows the pointer. No tilt, so links stay steady.
if (canHover.matches) {
  document.querySelectorAll('.explore-card, .focus-card, .interest').forEach((card) => {
    let frame = 0;
    card.addEventListener('pointermove', (event) => {
      if (prefersReducedMotion.matches || frame) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      frame = requestAnimationFrame(() => {
        card.style.setProperty('--light-x', `${x}px`);
        card.style.setProperty('--light-y', `${y}px`);
        frame = 0;
      });
    }, { passive: true });
  });
}


// Contact buttons should work even when there's no default mail app.
// The regular mailto: link remains the no-JavaScript fallback.
const contactDialog = document.getElementById('contact-dialog');
const openContactButton = document.querySelector('[data-open-contact-dialog]');
const closeContactButton = document.querySelector('[data-close-contact-dialog]');
const copyContactButton = document.getElementById('copy-contact-email');
const contactFeedback = document.getElementById('contact-feedback');
const publicEmail = 'dinalprabhashvara@gmail.com';
if (contactDialog && openContactButton && typeof contactDialog.showModal === 'function') {
  openContactButton.addEventListener('click', (event) => {
    event.preventDefault();
    contactFeedback.textContent = '';
    copyContactButton.firstChild.textContent = 'Copy email address ';
    contactDialog.showModal();
  });
  closeContactButton.addEventListener('click', () => contactDialog.close());
  contactDialog.addEventListener('click', (event) => {
    // Clicking on the shaded area outside the panel closes the dialog.
    if (event.target === contactDialog) contactDialog.close();
  });
  copyContactButton.addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(publicEmail);
        copied = true;
      }
    } catch (_) { /* Fall back below, e.g. on a local file URL. */ }
    if (!copied) {
      const temp = document.createElement('textarea');
      temp.value = publicEmail;
      temp.setAttribute('readonly', '');
      temp.style.cssText = 'position:fixed;left:-9999px;top:0;';
      document.body.append(temp);
      temp.select();
      try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
      temp.remove();
    }
    if (copied) {
      contactFeedback.textContent = 'Email copied! Paste it into your preferred email app.';
      copyContactButton.firstChild.textContent = 'Copied! ';
    } else {
      contactFeedback.textContent = 'Select the email address above to copy it manually.';
      const emailField = document.getElementById('dialog-email');
      emailField.focus();
      emailField.select();
    }
  });
}
