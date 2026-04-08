/**
 * script.js — RupeeWise v3 Shared Utilities
 * Dark mode, Navbar, Toast, Modal, Chart defaults, Helpers
 */
'use strict';

const DARK_KEY = 'rw_dark_mode';

/* ══════════════════════════════════════════════════════════
   DARK MODE — Flash-free, animated, system-aware
══════════════════════════════════════════════════════════ */

// Apply theme instantly (called before DOM ready to prevent flash)
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark-mode', dark);
  // Update all toggle buttons
  document.querySelectorAll('.dark-toggle-btn').forEach(btn => {
    updateToggleBtn(btn, dark);
  });
  // Update legacy .dark-toggle emoji buttons
  document.querySelectorAll('.dark-toggle').forEach(btn => {
    btn.textContent = dark ? '☀️' : '🌙';
    btn.title = dark ? 'Light Mode' : 'Dark Mode';
  });
}

function updateToggleBtn(btn, dark) {
  if (!btn) return;
  btn.setAttribute('aria-checked', dark ? 'true' : 'false');
  btn.title = dark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  const thumb = btn.querySelector('.dt-thumb');
  const icon  = btn.querySelector('.dt-icon');
  if (thumb) thumb.style.transform = dark ? 'translateX(24px)' : 'translateX(2px)';
  if (icon)  icon.textContent = dark ? '🌙' : '☀️';
}

function initDarkMode() {
  const saved       = localStorage.getItem(DARK_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark        = saved !== null ? saved === 'true' : prefersDark;
  applyTheme(dark);

  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem(DARK_KEY) === null) applyTheme(e.matches);
  });
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newDark = !isDark;
  localStorage.setItem(DARK_KEY, String(newDark));
  applyTheme(newDark);
  if (typeof setChartDefaults === 'function') setTimeout(setChartDefaults, 60);
}

/* ══════════════════════════════════════════════════════════
   BUILD DARK TOGGLE BUTTON (replaces emoji button)
══════════════════════════════════════════════════════════ */
function buildDarkToggle() {
  // Replace every .dark-toggle emoji button with a proper pill toggle
  document.querySelectorAll('.dark-toggle').forEach(oldBtn => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const btn = document.createElement('button');
    btn.className = 'dark-toggle-btn';
    btn.setAttribute('role', 'switch');
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.setAttribute('aria-checked', isDark ? 'true' : 'false');
    btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    btn.innerHTML = `
      <span class="dt-track">
        <span class="dt-icon">${isDark ? '🌙' : '☀️'}</span>
        <span class="dt-thumb"></span>
      </span>`;
    btn.addEventListener('click', toggleDarkMode);
    updateToggleBtn(btn, isDark);
    oldBtn.parentNode.replaceChild(btn, oldBtn);
  });
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
function initNavbar() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });
}

function toggleMobileMenu() {
  const menu      = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (hamburger) hamburger.textContent = isOpen ? '✕' : '☰';
}

function closeMobileMenu() {
  const menu      = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (hamburger) hamburger.textContent = '☰';
}

document.addEventListener('click', e => {
  const menu      = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  if (menu && hamburger && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});

/* ══════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════ */
let _toastEl = null;
function getToastContainer() {
  if (_toastEl) return _toastEl;
  _toastEl = document.getElementById('toast-container');
  if (!_toastEl) {
    _toastEl = document.createElement('div');
    _toastEl.id = 'toast-container';
    document.body.appendChild(_toastEl);
  }
  return _toastEl;
}

function toast(message, type = 'info', duration = 3200) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const div   = document.createElement('div');
  div.className = `toast ${type}`;
  div.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  getToastContainer().appendChild(div);
  setTimeout(() => {
    div.style.opacity   = '0';
    div.style.transform = 'translateX(20px)';
    div.style.transition = 'all .3s ease';
    setTimeout(() => div.remove(), 320);
  }, duration);
}

/* ══════════════════════════════════════════════════════════
   MODAL HELPERS
══════════════════════════════════════════════════════════ */
function showModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('hide'); document.body.style.overflow = 'hidden'; }
}
function hideModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('hide'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.hide)').forEach(m => {
      m.classList.add('hide'); document.body.style.overflow = '';
    });
  }
});

/* ══════════════════════════════════════════════════════════
   FORMATTING HELPERS
══════════════════════════════════════════════════════════ */
function formatINR(v, d = 2) {
  if (isNaN(v)) return '—';
  return '₹' + Number(v).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
}

function formatChange(change, changePct) {
  const up   = changePct >= 0;
  const sign = up ? '+' : '';
  const arrow = up ? '▲' : '▼';
  return {
    html: `${arrow} ${sign}${formatINR(change)} (${sign}${Math.abs(changePct).toFixed(2)}%)`,
    cls:  up ? 'up' : 'down',
  };
}

function abbreviateNumber(n) {
  if (n >= 1e7) return (n / 1e7).toFixed(1) + ' Cr';
  if (n >= 1e5) return (n / 1e5).toFixed(1) + ' L';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return String(n);
}
function debounce(fn, wait = 300) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); };
}
function showSkeletons(container, count = 8) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'card';
    c.style.minHeight = '160px';
    ['60%','40%','50%','35%'].forEach(w => {
      const d = document.createElement('div');
      d.className = 'skeleton';
      d.style.cssText = `height:12px;width:${w};margin-bottom:10px;border-radius:6px`;
      c.appendChild(d);
    });
    container.appendChild(c);
  }
}

/* ══════════════════════════════════════════════════════════
   CHART.JS DEFAULTS
══════════════════════════════════════════════════════════ */
function setChartDefaults() {
  if (typeof Chart === 'undefined') return;
  const dark      = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const lblColor  = dark ? '#94a3b8' : '#64748b';
  const tooltipBg = dark ? '#1e293b' : '#0f172a';

  Chart.defaults.font.family = "'DM Sans', sans-serif";
  Chart.defaults.font.size   = 11;
  Chart.defaults.color       = lblColor;
  Chart.defaults.plugins.legend.display             = false;
  Chart.defaults.plugins.tooltip.backgroundColor    = tooltipBg;
  Chart.defaults.plugins.tooltip.titleColor         = '#ffffff';
  Chart.defaults.plugins.tooltip.bodyColor          = '#cbd5e1';
  Chart.defaults.plugins.tooltip.padding            = 10;
  Chart.defaults.plugins.tooltip.cornerRadius       = 8;
  Chart.defaults.scale.grid.color                   = gridColor;
  Chart.defaults.scale.ticks.color                  = lblColor;
}

/* ══════════════════════════════════════════════════════════
   DARK MODE FLOATING FAB (bottom-left shortcut)
══════════════════════════════════════════════════════════ */
function injectDarkFAB() {
  // Small floating dark mode pill — bottom left, always visible
  const fab = document.createElement('button');
  fab.id        = 'dark-fab';
  fab.title     = 'Toggle Dark / Light Mode';
  fab.innerHTML = '<span id="dark-fab-icon">☀️</span>';
  fab.addEventListener('click', toggleDarkMode);
  document.body.appendChild(fab);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.getElementById('dark-fab-icon').textContent = isDark ? '🌙' : '☀️';
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavbar();
  setChartDefaults();
  buildDarkToggle();
  injectDarkFAB();

  // Expose globals
  window.toggleDarkMode   = toggleDarkMode;
  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu  = closeMobileMenu;
  window.toast            = toast;
  window.showModal        = showModal;
  window.hideModal        = hideModal;
  window.formatINR        = formatINR;
  window.abbreviateNumber = abbreviateNumber;
  window.formatChange = formatChange;
  window.debounce         = debounce;
  window.showSkeletons    = showSkeletons;
  window.setChartDefaults = setChartDefaults;
  window.applyTheme       = applyTheme;
});
