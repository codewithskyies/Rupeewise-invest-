/**
 * auth.js — RupeeWise Authentication & Per-User Data System
 * ─────────────────────────────────────────────────────────────
 * Features:
 *  - Register / Login / Logout
 *  - Per-user isolated portfolio, goals, SIPs, transactions
 *  - Persists everything in localStorage keyed by userId
 *  - Session management (auto-login on reload)
 *  - Password strength validation
 *  - Demo accounts pre-loaded
 */

'use strict';

/* ════════════════════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════════════════════ */
const STORAGE_KEYS = {
  USERS:       'rw_users',
  SESSION:     'rw_session',
  USER_DATA:   (uid) => `rw_data_${uid}`,
};

/* ════════════════════════════════════════════════════════
   DEMO ACCOUNTS  (pre-seeded on first load)
════════════════════════════════════════════════════════ */
const DEMO_ACCOUNTS = [
  {
    id: 'demo_aakash',
    name: 'Aakash Kumar',
    email: 'aakash@demo.com',
    phone: '+91 98765 43210',
    password: 'Demo@1234',
    riskProfile: 'moderate',
    avatar: '🧑‍💼',
    joinDate: '2024-01-15',
  },
  {
    id: 'demo_priya',
    name: 'Priya Sharma',
    email: 'priya@demo.com',
    phone: '+91 91234 56789',
    password: 'Demo@1234',
    riskProfile: 'aggressive',
    avatar: '👩‍💼',
    joinDate: '2024-03-20',
  },
  {
    id: 'demo_rahul',
    name: 'Rahul Verma',
    email: 'rahul@demo.com',
    phone: '+91 99887 65432',
    password: 'Demo@1234',
    riskProfile: 'conservative',
    avatar: '👨‍💼',
    joinDate: '2023-11-05',
  },
];

/* ════════════════════════════════════════════════════════
   DEFAULT PORTFOLIO DATA (generated per user)
════════════════════════════════════════════════════════ */
function generateDefaultData(userId) {
  // Each user gets slightly different data so dashboards look distinct
  const seed = userId.charCodeAt(userId.length - 1) % 5;
  const multiplier = 0.7 + seed * 0.15;

  return {
    portfolio: {
      totalValue:    Math.round(325000 * multiplier),
      totalInvested: Math.round(290000 * multiplier),
      totalGains:    Math.round(35000  * multiplier),
      returnsPct:    +(10 + seed * 0.8).toFixed(1),
      monthlySIP:    2000 + seed * 1000,
      activeSIPs:    3,
    },
    holdings: [
      {
        id: 'h1', symbol: 'TCS',      name: 'Tata Consultancy Svcs',
        sector: 'IT',      units: +(10 * multiplier).toFixed(1),
        avgPrice: 3600,    currPrice: 3940,
        invested: Math.round(36000 * multiplier),
        value: Math.round(39400 * multiplier),
        pnlPct: 9.4, alloc: 25,
      },
      {
        id: 'h2', symbol: 'INFY',     name: 'Infosys Ltd',
        sector: 'IT',      units: +(15 * multiplier).toFixed(1),
        avgPrice: 1650,    currPrice: 1862,
        invested: Math.round(24750 * multiplier),
        value: Math.round(27930 * multiplier),
        pnlPct: 12.8, alloc: 18,
      },
      {
        id: 'h3', symbol: 'HDFCBANK', name: 'HDFC Bank',
        sector: 'Banking', units: +(20 * multiplier).toFixed(1),
        avgPrice: 1600,    currPrice: 1724,
        invested: Math.round(32000 * multiplier),
        value: Math.round(34480 * multiplier),
        pnlPct: 7.75, alloc: 22,
      },
      {
        id: 'h4', symbol: 'RELIANCE', name: 'Reliance Industries',
        sector: 'Energy',  units: +(5 * multiplier).toFixed(1),
        avgPrice: 2600,    currPrice: 2842,
        invested: Math.round(13000 * multiplier),
        value: Math.round(14210 * multiplier),
        pnlPct: 9.3, alloc: 15,
      },
    ],
    sips: [
      {
        id: 's1', fund: 'Axis Bluechip Fund', assetClass: 'Equity',
        amount: 2000 + seed * 500, sipDate: 1, status: 'active',
        installments: 8 + seed, totalInvested: 16000 + seed * 4000, emoji: '📈',
      },
      {
        id: 's2', fund: 'HDFC Liquid Fund', assetClass: 'Debt',
        amount: 3000 + seed * 200, sipDate: 5, status: 'active',
        installments: 12, totalInvested: 36000, emoji: '💧',
      },
      {
        id: 's3', fund: 'SBI Gold ETF', assetClass: 'Gold',
        amount: 1000 + seed * 100, sipDate: 10, status: seed % 2 === 0 ? 'paused' : 'active',
        installments: 4, totalInvested: 8000, emoji: '🥇',
      },
    ],
    goals: [
      {
        id: 'g1', name: 'Down Payment Fund', icon: '🏠',
        targetAmt: 500000, currentAmt: Math.round(325000 * multiplier),
        targetDate: '2026-12-01', status: 'on_track',
      },
      {
        id: 'g2', name: 'Emergency Fund', icon: '🛡️',
        targetAmt: 200000, currentAmt: Math.round(160000 * multiplier),
        targetDate: '2026-06-01', status: 'on_track',
      },
      {
        id: 'g3', name: 'Child Education', icon: '🎓',
        targetAmt: 1000000, currentAmt: Math.round(320000 * multiplier),
        targetDate: '2030-06-01', status: 'on_track',
      },
    ],
    transactions: [
      { id:'t1', date:'Mar 27, 2026', fund:'Axis Bluechip Fund',  type:'sip',      units:'19.2 units', amount: 2000 + seed * 100, status:'completed' },
      { id:'t2', date:'Mar 25, 2026', fund:'SBI Gold ETF',        type:'sell',     units:'2.5 units',  amount: 1800, status:'completed' },
      { id:'t3', date:'Mar 20, 2026', fund:'HDFC Liquid Fund',    type:'buy',      units:'0.78 units', amount: 3000, status:'completed' },
      { id:'t4', date:'Mar 15, 2026', fund:'Mirae Asset Large Cap',type:'sip',     units:'21.7 units', amount: 2000, status:'completed' },
      { id:'t5', date:'Mar 10, 2026', fund:'UTI Nifty 50 Index',  type:'dividend', units:'Dividend',   amount:  480, status:'completed' },
      { id:'t6', date:'Mar 01, 2026', fund:'Parag Parikh Flexi',  type:'buy',      units:'6.4 units',  amount:  500, status:'completed' },
    ],
    quizHistory: [],  // stores quiz results per user
    settings: {
      notifications: { priceAlerts: true, tradeConfirm: true, sipReminder: true, newsletter: false },
      security: { twoFactor: true, biometric: false, autoTimeout: true },
    },
  };
}

/* ════════════════════════════════════════════════════════
   STORAGE HELPERS
════════════════════════════════════════════════════════ */
const Store = {
  get: (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  del: (key) => localStorage.removeItem(key),
};

/* ════════════════════════════════════════════════════════
   AUTH CLASS
════════════════════════════════════════════════════════ */
class AuthManager {
  constructor() {
    this._seedDemoAccounts();
  }

  /* ── Seed demo accounts if first run ── */
  _seedDemoAccounts() {
    let users = Store.get(STORAGE_KEYS.USERS) || {};
    let changed = false;
    for (const demo of DEMO_ACCOUNTS) {
      if (!users[demo.email]) {
        users[demo.email] = { ...demo };
        changed = true;
      }
      // Also seed portfolio data if missing
      if (!Store.get(STORAGE_KEYS.USER_DATA(demo.id))) {
        Store.set(STORAGE_KEYS.USER_DATA(demo.id), generateDefaultData(demo.id));
      }
    }
    if (changed) Store.set(STORAGE_KEYS.USERS, users);
  }

  /* ── REGISTER ── */
  register({ name, email, password, phone = '', riskProfile = 'moderate' }) {
    const users = Store.get(STORAGE_KEYS.USERS) || {};

    if (!name || name.trim().length < 2)
      return { ok: false, error: 'Name must be at least 2 characters.' };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { ok: false, error: 'Please enter a valid email address.' };
    if (users[email.toLowerCase()])
      return { ok: false, error: 'An account with this email already exists.' };
    if (!password || password.length < 8)
      return { ok: false, error: 'Password must be at least 8 characters.' };
    if (!/[A-Z]/.test(password))
      return { ok: false, error: 'Password must contain at least one uppercase letter.' };
    if (!/[0-9]/.test(password))
      return { ok: false, error: 'Password must contain at least one number.' };

    const uid  = 'user_' + Date.now() + Math.random().toString(36).slice(2, 6);
    const user = {
      id: uid, name: name.trim(), email: email.toLowerCase(),
      phone, password, riskProfile,
      avatar: '👤', joinDate: new Date().toISOString().slice(0, 10),
    };

    users[email.toLowerCase()] = user;
    Store.set(STORAGE_KEYS.USERS, users);
    Store.set(STORAGE_KEYS.USER_DATA(uid), generateDefaultData(uid));

    this._createSession(user);
    return { ok: true, user };
  }

  /* ── LOGIN ── */
  login({ email, password }) {
    if (!email || !password)
      return { ok: false, error: 'Please enter your email and password.' };

    const users = Store.get(STORAGE_KEYS.USERS) || {};
    const user  = users[email.toLowerCase()];

    if (!user)
      return { ok: false, error: 'No account found with this email.' };
    if (user.password !== password)
      return { ok: false, error: 'Incorrect password. Please try again.' };

    this._createSession(user);
    return { ok: true, user };
  }

  /* ── LOGOUT ── */
  logout() {
    Store.del(STORAGE_KEYS.SESSION);
  }

  /* ── GET CURRENT USER ── */
  getSession() {
    return Store.get(STORAGE_KEYS.SESSION);
  }

  /* ── IS LOGGED IN ── */
  isLoggedIn() {
    const session = this.getSession();
    return !!(session && session.userId && session.expires > Date.now());
  }

  /* ── GET USER DATA ── */
  getUserData(userId) {
    return Store.get(STORAGE_KEYS.USER_DATA(userId)) || generateDefaultData(userId);
  }

  /* ── SAVE USER DATA ── */
  saveUserData(userId, data) {
    Store.set(STORAGE_KEYS.USER_DATA(userId), data);
  }

  /* ── UPDATE USER PROFILE ── */
  updateProfile(userId, updates) {
    const users = Store.get(STORAGE_KEYS.USERS) || {};
    for (const key in users) {
      if (users[key].id === userId) {
        Object.assign(users[key], updates);
        Store.set(STORAGE_KEYS.USERS, users);
        // Update session
        const session = this.getSession();
        if (session) {
          Object.assign(session.user, updates);
          Store.set(STORAGE_KEYS.SESSION, session);
        }
        return { ok: true };
      }
    }
    return { ok: false };
  }

  /* ── SAVE QUIZ RESULT ── */
  saveQuizResult(userId, result) {
    const data = this.getUserData(userId);
    data.quizHistory = data.quizHistory || [];
    data.quizHistory.unshift({ ...result, date: new Date().toISOString() });
    data.quizHistory = data.quizHistory.slice(0, 20); // keep last 20
    this.saveUserData(userId, data);
  }

  _createSession(user) {
    Store.set(STORAGE_KEYS.SESSION, {
      userId:  user.id,
      user:    { id:user.id, name:user.name, email:user.email, avatar:user.avatar, riskProfile:user.riskProfile, joinDate:user.joinDate },
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  /* ── LIST ALL USERS (for dev/debug, returns safe info only) ── */
  getDemoAccounts() {
    return DEMO_ACCOUNTS.map(d => ({ name:d.name, email:d.email, password:d.password, avatar:d.avatar }));
  }
}

/* ════════════════════════════════════════════════════════
   PASSWORD STRENGTH CALCULATOR
════════════════════════════════════════════════════════ */
function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8)  score += 20;
  if (password.length >= 12) score += 20;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 20;
  if (/[!@#$%^&*]/.test(password)) score += 20;

  const label = score <= 20 ? 'Weak' : score <= 40 ? 'Fair' : score <= 60 ? 'Good' : score <= 80 ? 'Strong' : 'Very Strong';
  const color = score <= 20 ? '#ef4444' : score <= 40 ? '#f97316' : score <= 60 ? '#eab308' : score <= 80 ? '#22c55e' : '#16a34a';
  return { score, label, color };
}

/* ════════════════════════════════════════════════════════
   EXPOSE GLOBALLY
════════════════════════════════════════════════════════ */
window.Auth = new AuthManager();
window.getPasswordStrength = getPasswordStrength;
