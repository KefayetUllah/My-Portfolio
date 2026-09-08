// Render Lucide icons
lucide.createIcons();

// ---------- Auto-update footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Navbar: glass intensifies + progress bar on scroll ----------
const nav = document.getElementById('siteNav');
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}, { passive: true });

// ---------- Mobile menu toggle ----------
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const setMenu = (open) => {
  burger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
burger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (window.innerWidth > 940) setMenu(false); });

// ---------- Scroll-reveal: fade/slide-in via Intersection Observer ----------
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ---------- Active nav-link highlight ----------
const SECTION_IDS = ['home', 'services', 'process', 'about', 'pricing', 'testimonials', 'case-studies', 'video', 'blog'];
const allLinks = document.querySelectorAll('.nav-link, .mobile-link, .dropdown-item');
const setActive = (id) => allLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
const activeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: '-40% 0px -55% 0px' });
SECTION_IDS.forEach(id => { const s = document.getElementById(id); if (s) activeObs.observe(s); });

// ---------- Animated counters ----------
const easeOut = p => 1 - Math.pow(1 - p, 3);
const animateCount = (el) => {
  const target = parseFloat(el.dataset.target), suffix = el.dataset.suffix || '', dur = 1800;
  const start = performance.now();
  const tick = (now) => {
    const p = easeOut(Math.min((now - start) / dur, 1));
    el.textContent = Math.round(target * p).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counterObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.count-num').forEach(el => counterObs.observe(el));

// ---------- Testimonials: "View More" toggle ----------
const moreBtn = document.getElementById('moreReviewsBtn');
const grid = document.getElementById('testimonialGrid');
moreBtn.addEventListener('click', () => {
  const open = grid.classList.toggle('show-all');
  moreBtn.innerHTML = open
    ? 'Show Less <i data-lucide="arrow-right" style="transform:rotate(-90deg)"></i>'
    : 'View More <i data-lucide="arrow-right" style="transform:rotate(90deg)"></i>';
  lucide.createIcons();
});

// ---------- Social proof toast ----------
const TOAST_AVATARS = [
  'https://images.pexels.com/users/avatars/796614740/volkan-yilmaz-985.jpeg?auto=compress&fit=crop&h=140&w=140&dpr=2',
  'https://images.pexels.com/users/avatars/349383308/james-906.jpeg?auto=compress&fit=crop&h=140&w=140&dpr=2',
  'https://images.pexels.com/users/avatars/447505/diana-578.jpeg?auto=compress&fit=crop&h=140&w=140&dpr=2',
  'https://images.pexels.com/users/avatars/2163573768/muhammad-amdad-hossain-453.jpeg?auto=compress&fit=crop&h=140&w=140&dpr=2',
  'https://images.pexels.com/users/avatars/2018605242/lada-bilozor-393.jpeg?auto=compress&fit=crop&h=140&w=140&dpr=2',
  'https://images.pexels.com/users/avatars/719873/boyan-minchev-169.jpeg?auto=compress&fit=crop&h=140&w=140&dpr=2'
];
const TOAST_MSGS = [
  { name: 'Volkan Y.', action: 'just visited the website' },
  { name: 'James.', action: 'just booked a 15-min call' },
  { name: 'Diana', action: 'just viewed the pricing plans' },
  { name: 'Muhammad A.', action: 'just left a 5-star review' },
  { name: 'Lada Bilozor', action: 'just downloaded the media kit' },
  { name: 'BoyanMinchev', action: 'just visited the website' }
];
const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
const toastAvatar = document.getElementById('toastAvatar');
let toastIndex = 0;
const cycleToast = () => {
  const m = TOAST_MSGS[toastIndex % TOAST_MSGS.length];
  toastAvatar.src = TOAST_AVATARS[toastIndex % TOAST_AVATARS.length];
  toastText.innerHTML = '<b>' + m.name + '</b> ' + m.action;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4200);
  toastIndex++;
  setTimeout(cycleToast, 15000 + Math.random() * 4000);
};
setTimeout(cycleToast, 3500);

// =============================================================
// MOBILE DROPDOWN TOGGLE (Resources)
// =============================================================
const mobileToggle = document.getElementById('mobileResourcesToggle');
const mobileContent = document.getElementById('mobileResourcesContent');

if (mobileToggle && mobileContent) {
  mobileToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('open');
    mobileContent.classList.toggle('open');
    const icon = this.querySelector('.lucide');
    if (icon) {
      icon.style.transform = this.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  });
}

// =============================================================
// Close mobile menu when clicking dropdown items
// =============================================================
document.querySelectorAll('.mobile-dropdown-content a').forEach(link => {
  link.addEventListener('click', function() {
    const menu = document.getElementById('mobileMenu');
    const burger = document.getElementById('burgerBtn');
    if (menu) menu.classList.remove('open');
    if (burger) burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// =============================================================
// THEME TOGGLE (Dark/Light Mode)
// =============================================================
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcon = document.querySelector('.theme-icon');
const mobileThemeIcon = document.querySelector('.mobile-theme-btn .lucide');
const mobileThemeText = document.querySelector('.mobile-theme-toggle span');

const savedTheme = localStorage.getItem('theme') || 'dark';
let currentTheme = savedTheme;

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    if (mobileThemeIcon) mobileThemeIcon.setAttribute('data-lucide', 'sun');
    if (mobileThemeText) mobileThemeText.textContent = '☀️ Light Mode';
  } else {
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    if (mobileThemeIcon) mobileThemeIcon.setAttribute('data-lucide', 'moon');
    if (mobileThemeText) mobileThemeText.textContent = '🌙 Dark Mode';
  }
  localStorage.setItem('theme', theme);
  currentTheme = theme;
  lucide.createIcons();
}

function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

applyTheme(savedTheme);

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (!localStorage.getItem('theme')) {
  applyTheme(prefersDark.matches ? 'dark' : 'light');
}
prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// =============================================================
// SERVICES DROPDOWN (Mobile)
// =============================================================
const mobileServicesToggle = document.getElementById('mobileServicesToggle');
const mobileServicesContent = document.getElementById('mobileServicesContent');

if (mobileServicesToggle && mobileServicesContent) {
  mobileServicesToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('open');
    mobileServicesContent.classList.toggle('open');
    const icon = this.querySelector('.lucide');
    if (icon) {
      icon.style.transform = this.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  });
}

// =============================================================
// DESKTOP DROPDOWN (Services) — Click to toggle + Close on outside click
// =============================================================
const servicesToggle = document.getElementById('servicesToggle');
const servicesDropdown = document.getElementById('servicesDropdown');

if (servicesToggle && servicesDropdown) {
  servicesToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const parent = this.closest('.nav-dropdown');
    parent.classList.toggle('active');
  });
}

// =============================================================
// DESKTOP DROPDOWN (Resources) — Click to toggle + Close on outside click
// =============================================================
const resourcesToggle = document.getElementById('resourcesToggle');
const resourcesDropdown = document.getElementById('resourcesDropdown');

if (resourcesToggle && resourcesDropdown) {
  resourcesToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const parent = this.closest('.nav-dropdown');
    parent.classList.toggle('active');
  });
}

// =============================================================
// CLOSE ALL DROPDOWNS WHEN CLICKING OUTSIDE
// =============================================================
document.addEventListener('click', function(e) {
  const allDropdowns = document.querySelectorAll('.nav-dropdown');
  allDropdowns.forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
});

// =============================================================
// SERVICE DETAILS MODAL
// =============================================================
const modal = document.getElementById('serviceModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

const serviceMap = {
  'social': 'service-social',
  'seo': 'service-seo',
  'ads': 'service-ads',
  'analytics': 'service-analytics'
};

function openServiceModal(serviceId) {
  const templateId = serviceMap[serviceId];
  if (!templateId) return;
  const template = document.getElementById(templateId);
  if (!template) return;
  modalContent.innerHTML = template.innerHTML;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeServiceModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.service-trigger').forEach(trigger => {
  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    const service = this.dataset.service;
    openServiceModal(service);
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeServiceModal);
}

if (modal) {
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      closeServiceModal();
    }
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
    closeServiceModal();
  }
});