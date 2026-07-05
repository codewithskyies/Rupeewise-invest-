# 💹 RupeeWise — Indian Fintech Investment Platform

<div align="center">

![RupeeWise Banner](https://img.shields.io/badge/RupeeWise-Fintech%20Platform-22c55e?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBvbHlsaW5lIHBvaW50cz0iMjIgNyAxMy41IDE1LjUgOC41IDEwLjUgMiAxNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48L3N2Zz4=)

**A complete Indian fintech platform — Live Stocks, AI Finance Assistant, Paper Trading, Expense Tracker & more!**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Now-22c55e?style=for-the-badge)](https://rupeewise-invest-ofpd.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Source%20Code-181717?style=for-the-badge&logo=github)](https://github.com/codewithskyies/Rupeewise-invest-)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Custom%20Properties-1572B6?style=flat-square&logo=css3&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-v4.4.1-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Demo Accounts](#-demo-accounts)
- [Screenshots](#-screenshots)
- [How It Works](#-how-it-works)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🌟 About

**RupeeWise** is a production-grade Indian fintech investment platform built entirely with **Vanilla JavaScript** — no React, no backend, no database.

Inspired by Groww and Zerodha, it helps Indian beginner investors understand stocks, SIPs, and personal finance through:
- 📈 Live NIFTY 50 stock data with interactive charts
- 🤖 "Rupa" — an AI finance teacher in Hinglish
- 🎮 Paper trading simulator (zero real money risk)
- 💸 Expense tracker with AI spending roast
- 🎓 60+ finance quiz questions

> **Built to show:** Deep JavaScript fundamentals, Web APIs, Chart.js, client-side auth, and full-stack thinking — without any framework.

---

## 🚀 Live Demo

🔗 **[https://rupeewise.vercel.app](https://rupeewise-invest-ofpd.vercel.app/)**

| Credential | Value |
|---|---|
| Email | `aakash@demo.com` |
| Password | `Demo@1234` |

> 3 demo accounts available — see [Demo Accounts](#-demo-accounts)

---

## ✨ Features

### 📈 Live Stock Market (`stocks.html`)
- 40 NIFTY 50 stocks with simulated live prices (updates every 8s)
- Clickable stock cards → opens detail modal with Chart.js chart
- 5 time periods: 1D / 1W / 1M / 3M / 1Y
- Buy/Sell virtual orders with confirmation
- Search + filter (All / Gainers / Losers)
- Market stats bar: NIFTY index, advances, declines, top gainer

### 🤖 Rupa — AI Finance Assistant (`chatbot.js`)
- Floating chatbot on **all 8 pages**
- Speaks Hinglish + English
- 30+ intent handlers, 25+ regex patterns
- Topics: SIP, Mutual Funds, P/E ratio, Tax, Risk vs Return, Goal planning
- Beginner-friendly: "What is stock market?" → real-life example answers
- **Never gives "guaranteed return" advice** — honest and SEBI-aware
- Context-aware: reads your actual portfolio when logged in

### 💸 Expense Tracker + AI Roast (`expense.html`)
- Add expenses with 8 emoji categories
- Bar chart (last 7 days) + Donut chart (by category)
- **AI Roast**: "Bhai ₹2000 coffee pe uda diya!" — savage spending analysis
- **Goal Planner**: "iPhone lena hai" → SIP timeline at 12% CAGR
- CSV upload with drag & drop
- Savings calculator — shows how much you can SIP

### 🎮 Paper Trading Simulator (`trading.html`)
- Virtual ₹1 Lakh portfolio — zero real money
- Buy/Sell any NIFTY 50 stock
- Weighted average price tracking for existing positions
- Real-time P&L calculation
- Order history log
- AI stock analysis panel
- Reset anytime

### 🎓 Finance Quiz (`learn.html`)
- 60 MCQ questions across 6 categories
- Categories: SIP, Mutual Funds, Stock Market, Bonds & Debt, Taxation, Personal Finance
- Explanation shown for every answer
- Score tracking with accuracy percentage
- Quiz history saved to user account

### 📊 User Dashboard (`dashboard.html`)
6-tab per-user dashboard:
| Tab | Content |
|---|---|
| Overview | Stats, growth chart, allocation donut, recent transactions, goals |
| Portfolio | Holdings table, buy modal, P&L per stock |
| SIP Manager | Active SIPs, pause/resume/cancel, create new, debits calendar |
| Goals | Goal cards with progress bars, create/update/delete |
| Transactions | Full history with type filters |
| Settings | Profile editor, notification toggles, quiz history |

### 🔐 Multi-User Authentication (`auth.js`)
- Register / Login / Logout
- Password validation (min 8 chars, uppercase, number)
- Password strength meter on register
- 7-day session persistence
- **Per-user data isolation** — each user has their own portfolio
- 3 pre-seeded demo accounts

### 🌙 Dark Mode
- Animated pill toggle in navbar
- Floating FAB button (bottom-left)
- **Zero flash** on page load — inline script reads localStorage before CSS
- 131 CSS rules covering all 8 pages
- Auto-detects OS dark preference

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **Vanilla JavaScript (ES6+)** | Core logic — async/await, closures, IIFE, modules |
| **HTML5** | Semantic markup — Canvas, Form, ARIA roles |
| **CSS3** | Grid, Flexbox, Custom Properties (292 vars), Keyframes |
| **Chart.js v4.4.1** | Line, Bar, Doughnut charts — only CDN dependency |
| **Web Storage API** | localStorage for all data persistence |
| **Fetch API** | Angel One SmartAPI integration (with simulation fallback) |
| **matchMedia API** | OS dark mode preference detection |
| **Google Fonts** | Plus Jakarta Sans + DM Sans |
| **Vercel** | Static deployment with clean URL routing |

### JavaScript Patterns Used
- `IIFE` — private scope in chatbot.js
- `Observer Pattern` — live price polling with callbacks
- `Module Pattern` — `window.StockAPI`, `window.Auth`
- `Async/Await + Promises` — stock API calls
- `Debounce` — search input optimization
- `Brownian Motion` — realistic stock price simulation

---

## 📁 Project Structure

```
rupeewise/
├── 📄 index.html          → Landing page (auth-aware, live NIFTY ticker)
├── 📄 login.html          → Sign in (3 demo accounts, quick-fill buttons)
├── 📄 register.html       → Registration (password strength, risk profile)
├── 📄 dashboard.html      → 6-tab user dashboard
├── 📄 stocks.html         → Live NIFTY 50 stocks + Chart.js modal
├── 📄 learn.html          → Finance quiz (60 MCQs)
├── 📄 expense.html        → Expense tracker + AI roast + goal planner
├── 📄 trading.html        → Paper trading simulator
│
├── 📜 auth.js             → Multi-user auth system
├── 📜 api.js              → Stock data (Angel One + simulation)
├── 📜 chatbot.js          → Rupa AI (NLP engine + chat UI)
├── 📜 script.js           → Shared utils (dark mode, toast, formatINR)
│
├── 🎨 style.css           → Design system (997 lines, CSS variables)
├── ⚙️  vercel.json         → Vercel routing config
└── 📖 README.md
```

---

## 🚀 Getting Started

### Option 1 — Just Open (No Install Needed!)
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/rupeewise.git

# Open in browser — no build step, no npm install!
open rupeewise/index.html
```

### Option 2 — VS Code Live Server
```bash
git clone https://github.com/YOUR_USERNAME/rupeewise.git
cd rupeewise

# Install Live Server extension in VS Code
# Right click index.html → "Open with Live Server"
```

### Option 3 — Python Simple Server
```bash
cd rupeewise
python -m http.server 3000
# Open: http://localhost:3000
```

> ✅ **Zero dependencies** — no npm install, no build step, no Node.js required!

---

## 👤 Demo Accounts

| Name | Email | Password | Risk Profile |
|---|---|---|---|
| Aakash Kumar | aakash@demo.com | Demo@1234 | Moderate |
| Priya Sharma | priya@demo.com | Demo@1234 | Aggressive |
| Rahul Verma | rahul@demo.com | Demo@1234 | Conservative |

> Each user has different portfolio data — try switching to see different dashboards!

---

## 📸 Screenshots

> *(Add screenshots here after taking them)*

| Page | Screenshot |
|---|---|
| Home Page | ![Home](screenshots/home.png) |
| Stock Market | ![Stocks](screenshots/stocks.png) |
| Dashboard | ![Dashboard](screenshots/dashboard.png) |
| Chatbot | ![Chatbot](screenshots/chatbot.png) |
| Expense Tracker | ![Expense](screenshots/expense.png) |
| Dark Mode | ![Dark](screenshots/dark.png) |

---

## ⚙️ How It Works

### Stock Price Simulation
Real prices are simulated using **Geometric Brownian Motion**:
```javascript
// Slight positive bias (markets trend upward long-term)
const drift    = (Math.random() - 0.498) * 0.008;
const newPrice = clamp(basePrice * (1 + drift), base * 0.95, base * 1.05);
```

### Client-Side Authentication
```
Register → Validate → Hash → localStorage["rw_users"]
Login    → Match    → Create session (7-day expiry)
Data     → Isolated per user: localStorage["rw_data_{userId}"]
```

### AI Chatbot (Rule-Based NLP)
```javascript
// 25+ regex intent patterns → 30+ response handlers
if (/sip kya|what is sip/i.test(input))    return hWhatIsSIP();
if (/market crash|portfolio down/i.test(input)) return hMarketCrash();
if (/iphone lena|goal plan/i.test(input))  return hGoalAdvice();
// Never gives "guaranteed return" advice
```

### Dark Mode — Zero Flash
```html
<!-- In every <head> — runs BEFORE CSS loads -->
<script>
  (function(){
    var d = localStorage.getItem('rw_dark_mode');
    var p = window.matchMedia('(prefers-color-scheme:dark)').matches;
    if(d==='true' || (d===null && p))
      document.documentElement.setAttribute('data-theme','dark');
  })();
</script>
```

---

## 🚀 Deployment

### Deploy on Vercel (Recommended — FREE)

```bash
# Method 1: Vercel CLI
npm install -g vercel
cd rupeewise
vercel

# Method 2: Drag & Drop
# Go to vercel.com → New Project → Drag folder → Deploy!

# Method 3: GitHub Integration
# Connect GitHub repo on vercel.com → Auto-deploys on every push!
```

The `vercel.json` handles clean URL routing:
```json
{ "src": "/stocks",    "dest": "/stocks.html" },
{ "src": "/dashboard", "dest": "/dashboard.html" }
```

---

## 🔮 Future Improvements

- [ ] Node.js + Express backend for real authentication
- [ ] PostgreSQL / MongoDB database
- [ ] Real stock data via NSE/Angel One API
- [ ] WebSocket for truly real-time prices (instead of polling)
- [ ] React + TypeScript migration
- [ ] PWA support (offline + installable)
- [ ] Unit tests with Jest
- [ ] Real SIP execution via Groww/Zerodha APIs

---

## 📊 Project Stats

```
Total Files    : 13 files
Lines of Code  : 7,900+ lines
HTML Pages     : 8 pages
CSS Variables  : 292 custom properties
Dark Mode Rules: 131 CSS rules
NIFTY Stocks   : 40 stocks
Quiz Questions : 60 MCQs
Dependencies   : 1 (Chart.js CDN)
Build Step     : None ✅
```

---

## 👨‍💻 Author

**Aakash Gupta**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aakashsahuu/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github&logoColor=white)](https)(https://github.com/codewithskyies)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-22c55e?style=flat-square&logo=vercel&logoColor=white)](https://yourportfolio.vercel.app)

---

## ⭐ Support

If you found this project helpful:
- ⭐ **Star this repo** — it helps others discover it!
- 🍴 **Fork it** — build your own version
- 🐛 **Report bugs** — open an issue
- 💡 **Suggest features** — open a discussion

---

<div align="center">

**Built with ❤️ for Indian Investors**

*RupeeWise — Start Investing Without Confusion*

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=YOUR_USERNAME.rupeewise)

</div>
