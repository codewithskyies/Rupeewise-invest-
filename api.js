/**
 * api.js — RupeeWise Stock Data API Handler
 * -------------------------------------------------
 * Attempts Angel One SmartAPI first.
 * Falls back to realistic mock data with live price simulation.
 * All functions return Promise and use async/await.
 */

'use strict';

// ── CONFIGURATION ─────────────────────────────────────────
const API_CONFIG = {
  // Angel One SmartAPI base URL
  SMARTAPI_BASE: 'https://apiconnect.angelbroking.com/rest/secure',
  // Your Angel One credentials (set via .env or replace here for demo)
  API_KEY:    typeof SMARTAPI_KEY   !== 'undefined' ? SMARTAPI_KEY   : null,
  CLIENT_ID:  typeof SMARTAPI_CLIENT !== 'undefined' ? SMARTAPI_CLIENT : null,
  PASSWORD:   typeof SMARTAPI_PASS  !== 'undefined' ? SMARTAPI_PASS  : null,
  TOTP:       typeof SMARTAPI_TOTP  !== 'undefined' ? SMARTAPI_TOTP  : null,
  // Polling interval for live price simulation (ms)
  REFRESH_INTERVAL: 8000,
};

// ── NIFTY 50 STOCKS MOCK DATA ─────────────────────────────
// Realistic base prices (₹) as of early 2026
const NIFTY_50_STOCKS = [
  { symbol:'RELIANCE', name:'Reliance Industries', sector:'Energy',        price:2842.50, logo:'RE', cap:'₹19.2L Cr' },
  { symbol:'TCS',      name:'Tata Consultancy',   sector:'IT',            price:3940.80, logo:'TC', cap:'₹14.3L Cr' },
  { symbol:'HDFCBANK', name:'HDFC Bank',           sector:'Banking',       price:1724.35, logo:'HD', cap:'₹13.1L Cr' },
  { symbol:'INFY',     name:'Infosys',             sector:'IT',            price:1862.20, logo:'IN', cap:'₹7.7L Cr'  },
  { symbol:'ICICIBANK',name:'ICICI Bank',          sector:'Banking',       price:1284.60, logo:'IC', cap:'₹9.0L Cr'  },
  { symbol:'KOTAKBANK',name:'Kotak Mahindra Bank', sector:'Banking',       price:1756.90, logo:'KO', cap:'₹3.5L Cr'  },
  { symbol:'HINDUNILVR',name:'Hindustan Unilever', sector:'FMCG',         price:2394.15, logo:'HU', cap:'₹5.6L Cr'  },
  { symbol:'LT',       name:'Larsen & Toubro',     sector:'Infrastructure',price:3618.70, logo:'LT', cap:'₹5.1L Cr'  },
  { symbol:'BAJFINANCE',name:'Bajaj Finance',      sector:'NBFC',          price:7284.40, logo:'BF', cap:'₹4.4L Cr'  },
  { symbol:'ASIANPAINT',name:'Asian Paints',       sector:'Paints',        price:2486.30, logo:'AP', cap:'₹2.4L Cr'  },
  { symbol:'MARUTI',   name:'Maruti Suzuki',       sector:'Auto',          price:10842.00,logo:'MS', cap:'₹3.4L Cr'  },
  { symbol:'AXISBANK', name:'Axis Bank',            sector:'Banking',       price:1086.55, logo:'AX', cap:'₹3.3L Cr'  },
  { symbol:'WIPRO',    name:'Wipro',               sector:'IT',            price:586.40,  logo:'WI', cap:'₹3.0L Cr'  },
  { symbol:'HCLTECH',  name:'HCL Technologies',    sector:'IT',            price:1742.80, logo:'HC', cap:'₹4.7L Cr'  },
  { symbol:'SUNPHARMA',name:'Sun Pharmaceutical',  sector:'Pharma',        price:1824.30, logo:'SP', cap:'₹4.4L Cr'  },
  { symbol:'TITAN',    name:'Titan Company',        sector:'Consumer',      price:3284.60, logo:'TI', cap:'₹2.9L Cr'  },
  { symbol:'NESTLEIND',name:'Nestle India',         sector:'FMCG',         price:2284.90, logo:'NE', cap:'₹2.2L Cr'  },
  { symbol:'ULTRACEMCO',name:'UltraTech Cement',   sector:'Cement',        price:10648.00,logo:'UC', cap:'₹3.1L Cr'  },
  { symbol:'POWERGRID',name:'Power Grid Corp',     sector:'Utilities',     price:324.85,  logo:'PG', cap:'₹3.0L Cr'  },
  { symbol:'NTPC',     name:'NTPC',                sector:'Utilities',     price:368.20,  logo:'NT', cap:'₹3.5L Cr'  },
  { symbol:'ONGC',     name:'ONGC',                sector:'Energy',        price:284.60,  logo:'OG', cap:'₹3.6L Cr'  },
  { symbol:'JSWSTEEL', name:'JSW Steel',           sector:'Metals',        price:924.40,  logo:'JS', cap:'₹2.3L Cr'  },
  { symbol:'TATASTEEL',name:'Tata Steel',          sector:'Metals',        price:168.85,  logo:'TS', cap:'₹2.1L Cr'  },
  { symbol:'M&M',      name:'Mahindra & Mahindra', sector:'Auto',          price:2894.70, logo:'MM', cap:'₹3.6L Cr'  },
  { symbol:'BAJAJFINSV',name:'Bajaj Finserv',      sector:'NBFC',          price:1924.80, logo:'BS', cap:'₹3.1L Cr'  },
  { symbol:'SBILIFE',  name:'SBI Life Insurance',  sector:'Insurance',     price:1684.30, logo:'SL', cap:'₹1.7L Cr'  },
  { symbol:'HDFCLIFE', name:'HDFC Life Insurance', sector:'Insurance',     price:724.60,  logo:'HL', cap:'₹1.6L Cr'  },
  { symbol:'TECHM',    name:'Tech Mahindra',       sector:'IT',            price:1684.20, logo:'TM', cap:'₹1.6L Cr'  },
  { symbol:'DRREDDY',  name:'Dr. Reddy\'s Labs',  sector:'Pharma',        price:1284.40, logo:'DR', cap:'₹2.1L Cr'  },
  { symbol:'CIPLA',    name:'Cipla',               sector:'Pharma',        price:1624.80, logo:'CI', cap:'₹1.3L Cr'  },
  { symbol:'COALINDIA',name:'Coal India',          sector:'Mining',        price:484.30,  logo:'CO', cap:'₹2.9L Cr'  },
  { symbol:'DIVISLAB', name:'Divi\'s Laboratories',sector:'Pharma',       price:4284.60, logo:'DL', cap:'₹1.1L Cr'  },
  { symbol:'EICHERMOT',name:'Eicher Motors',       sector:'Auto',          price:4084.80, logo:'EM', cap:'₹1.1L Cr'  },
  { symbol:'GRASIM',   name:'Grasim Industries',   sector:'Conglomerate',  price:2684.40, logo:'GR', cap:'₹1.8L Cr'  },
  { symbol:'HEROMOTOCO',name:'Hero MotoCorp',      sector:'Auto',          price:4284.80, logo:'HM', cap:'₹0.9L Cr'  },
  { symbol:'INDUSINDBK',name:'IndusInd Bank',      sector:'Banking',       price:984.60,  logo:'IB', cap:'₹0.8L Cr'  },
  { symbol:'ITC',      name:'ITC',                 sector:'Conglomerate',  price:468.40,  logo:'IT', cap:'₹5.8L Cr'  },
  { symbol:'APOLLOHOSP',name:'Apollo Hospitals',   sector:'Healthcare',    price:6984.20, logo:'AH', cap:'₹0.9L Cr'  },
  { symbol:'ADANIENT', name:'Adani Enterprises',   sector:'Conglomerate',  price:2484.80, logo:'AE', cap:'₹2.8L Cr'  },
  { symbol:'ADANIPORTS',name:'Adani Ports',        sector:'Infrastructure',price:1284.40, logo:'AP', cap:'₹2.8L Cr'  },
];

// Internal state
let _stockData   = [];   // enriched stock list with live prices
let _authToken   = null; // SmartAPI JWT token
let _pollingTimer = null;

// ── AUTHENTICATION (Angel One SmartAPI) ───────────────────
/**
 * Attempts to authenticate with Angel One SmartAPI.
 * Returns JWT token or null if credentials not set.
 * @returns {Promise<string|null>}
 */
async function authenticateSmartAPI() {
  if (!API_CONFIG.API_KEY || !API_CONFIG.CLIENT_ID) {
    console.info('[API] SmartAPI credentials not set. Using mock data.');
    return null;
  }
  try {
    const resp = await fetch(`${API_CONFIG.SMARTAPI_BASE}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_CONFIG.API_KEY,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        clientcode: API_CONFIG.CLIENT_ID,
        password:   API_CONFIG.PASSWORD,
        totp:       API_CONFIG.TOTP,
      }),
    });
    const data = await resp.json();
    if (data.status && data.data?.jwtToken) {
      console.info('[API] SmartAPI authenticated successfully.');
      return data.data.jwtToken;
    }
    return null;
  } catch (err) {
    console.warn('[API] SmartAPI auth failed:', err.message);
    return null;
  }
}

// ── FETCH LIVE QUOTE (Angel One SmartAPI) ─────────────────
/**
 * Fetches live LTP for a given exchange token via SmartAPI.
 * @param {string} token - Angel One exchange token
 * @returns {Promise<number|null>}
 */
async function fetchLiveQuote(exchangeToken) {
  if (!_authToken) return null;
  try {
    const resp = await fetch(`${API_CONFIG.SMARTAPI_BASE}/order/getltp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_authToken}`,
        'X-API-KEY': API_CONFIG.API_KEY,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        exchange: 'NSE',
        tradingsymbol: exchangeToken,
        symboltoken: exchangeToken,
      }),
    });
    const data = await resp.json();
    return data.data?.ltp || null;
  } catch {
    return null;
  }
}

// ── MOCK PRICE SIMULATION ─────────────────────────────────
/**
 * Simulates realistic live price fluctuations.
 * Uses brownian-motion-like random walk.
 * @param {number} basePrice
 * @returns {object} { price, change, changePct, high, low, volume }
 */
function simulateLivePrice(stock) {
  const volatility = 0.008; // ±0.8% max movement per tick
  const drift      = (Math.random() - 0.498) * volatility;
  const newPrice   = +(stock.price * (1 + drift)).toFixed(2);

  // Keep within ±5% of original base price (circuit breaker)
  const basePrice  = stock._basePrice || stock.price;
  const clamped    = Math.max(basePrice * 0.95, Math.min(basePrice * 1.05, newPrice));

  const change    = +(clamped - basePrice).toFixed(2);
  const changePct = +((change / basePrice) * 100).toFixed(2);

  // Simulate OHLC
  const dayChange = basePrice * (Math.random() * 0.04 - 0.02);
  const high  = +(basePrice + Math.abs(dayChange) + Math.random() * basePrice * 0.01).toFixed(2);
  const low   = +(basePrice - Math.abs(dayChange) - Math.random() * basePrice * 0.01).toFixed(2);
  const open  = +(basePrice + (Math.random() - 0.5) * basePrice * 0.015).toFixed(2);
  const volume = Math.floor(Math.random() * 5000000 + 500000);
  const pe    = +(18 + Math.random() * 30).toFixed(1);
  const mktCap = stock.cap;

  return { price: clamped, change, changePct, high, low, open, volume, pe, mktCap };
}

/**
 * Generates mock historical price data for charts.
 * @param {number} basePrice
 * @param {number} points - number of data points
 * @param {string} period - '1D'|'1W'|'1M'|'3M'|'1Y'
 * @returns {Array<{time, price}>}
 */
function generateHistoricalData(basePrice, points = 30, period = '1M') {
  const data = [];
  let price = basePrice * (0.88 + Math.random() * 0.06); // start slightly lower

  const labels = {
    '1D': Array.from({ length: points }, (_, i) => {
      const h = 9 + Math.floor(i * 6.5 / points);
      const m = Math.floor((i * 390 / points) % 60);
      return `${h}:${String(m).padStart(2, '0')}`;
    }),
    '1W': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    '1M': Array.from({ length: points }, (_, i) => `Day ${i + 1}`),
    '3M': ['Jan', 'Feb', 'Mar'].flatMap(m => Array.from({ length: 10 }, (_, i) => `${m} W${Math.ceil((i+1)/2.5)}`)).slice(0, points),
    '1Y': ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
  };

  for (let i = 0; i < points; i++) {
    const change = price * (Math.random() * 0.025 - 0.011);
    price = Math.max(price + change, basePrice * 0.7);
    data.push({ time: (labels[period] || labels['1M'])[i] || `T${i}`, price: +price.toFixed(2) });
  }
  // Make last price close to current
  data[data.length - 1].price = basePrice;
  return data;
}

// ── PUBLIC API ────────────────────────────────────────────

/**
 * Initialises the API layer: authenticates (if creds set) and loads stock data.
 * @returns {Promise<Array>} stock list
 */
async function initStockAPI() {
  // Try SmartAPI auth
  _authToken = await authenticateSmartAPI();

  // Build enriched stock list
  _stockData = NIFTY_50_STOCKS.map(s => {
    const live = simulateLivePrice({ ...s, _basePrice: s.price });
    return { ...s, ...live, _basePrice: s.price };
  });

  return _stockData;
}

/**
 * Returns current stock list (with latest simulated prices).
 * @returns {Array}
 */
function getStocks() { return _stockData; }

/**
 * Returns a single stock by symbol.
 * @param {string} symbol
 * @returns {object|undefined}
 */
function getStock(symbol) {
  return _stockData.find(s => s.symbol === symbol);
}

/**
 * Refreshes all stock prices (simulated or live).
 * Call this on a timer to show "live" updates.
 * @returns {Promise<Array>}
 */
async function refreshPrices() {
  for (const stock of _stockData) {
    let livePrice = null;
    if (_authToken) {
      livePrice = await fetchLiveQuote(stock.symbol);
    }
    if (livePrice) {
      const change    = +(livePrice - stock._basePrice).toFixed(2);
      const changePct = +((change / stock._basePrice) * 100).toFixed(2);
      Object.assign(stock, { price: livePrice, change, changePct });
    } else {
      // Simulate
      const live = simulateLivePrice(stock);
      Object.assign(stock, live);
    }
  }
  return _stockData;
}

/**
 * Starts polling for live prices every REFRESH_INTERVAL ms.
 * @param {Function} onUpdate - callback(updatedStocks)
 */
function startLivePolling(onUpdate) {
  stopLivePolling();
  _pollingTimer = setInterval(async () => {
    const updated = await refreshPrices();
    if (typeof onUpdate === 'function') onUpdate(updated);
  }, API_CONFIG.REFRESH_INTERVAL);
}

/** Stops live price polling. */
function stopLivePolling() {
  if (_pollingTimer) { clearInterval(_pollingTimer); _pollingTimer = null; }
}

/**
 * Returns historical OHLC data for a stock.
 * @param {string} symbol
 * @param {string} period - '1D'|'1W'|'1M'|'3M'|'1Y'
 * @returns {Promise<Array>}
 */
async function getHistoricalData(symbol, period = '1M') {
  const stock = getStock(symbol);
  if (!stock) return [];

  // If SmartAPI available, you would call the candle data endpoint here.
  // For now, generate realistic mock data.
  const points = { '1D': 78, '1W': 5, '1M': 30, '3M': 90, '1Y': 12 }[period] || 30;
  return generateHistoricalData(stock._basePrice, points, period);
}

/**
 * Returns top gainers (sorted by changePct descending).
 * @param {number} limit
 * @returns {Array}
 */
function getTopGainers(limit = 10) {
  return [..._stockData].sort((a, b) => b.changePct - a.changePct).slice(0, limit);
}

/**
 * Returns top losers (sorted by changePct ascending).
 * @param {number} limit
 * @returns {Array}
 */
function getTopLosers(limit = 10) {
  return [..._stockData].sort((a, b) => a.changePct - b.changePct).slice(0, limit);
}

/**
 * Searches stocks by name or symbol (case-insensitive).
 * @param {string} query
 * @returns {Array}
 */
function searchStocks(query) {
  const q = query.toLowerCase();
  return _stockData.filter(s =>
    s.symbol.toLowerCase().includes(q) ||
    s.name.toLowerCase().includes(q) ||
    s.sector.toLowerCase().includes(q)
  );
}

// ── Nifty 50 Index ─────────────────────────────────────────
/**
 * Simulates NIFTY 50 index value.
 * @returns {object}
 */
function getNiftyIndex() {
  const base = 22500;
  const live = simulateLivePrice({ price: base, _basePrice: base });
  return {
    name: 'NIFTY 50',
    value: live.price,
    change: live.change,
    changePct: live.changePct,
  };
}

// ── EXPORT ────────────────────────────────────────────────
// Expose globally for use in HTML files
window.StockAPI = {
  init:             initStockAPI,
  getStocks,
  getStock,
  refreshPrices,
  startLivePolling,
  stopLivePolling,
  getHistoricalData,
  getTopGainers,
  getTopLosers,
  searchStocks,
  getNiftyIndex,
};
