# 🚀 RupeeWise — Deploy on Vercel

A production-grade fintech platform — Live Stocks, AI Chatbot (Hinglish), Expense Tracker, Paper Trading, Finance Quiz.

---

## ⚡ Deploy in 3 Minutes (No Code Needed!)

### Method 1: Drag & Drop (Easiest)

1. Go to **[vercel.com](https://vercel.com)** → Sign up free
2. Click **"Add New Project"**
3. Drag the entire `rupeewise-final` folder onto the Vercel page
4. Click **"Deploy"** → Done! ✅

---

### Method 2: GitHub (Recommended for updates)

```bash
# Step 1: Install Git (if not installed)
# Windows: https://git-scm.com/download/win
# Mac: brew install git

# Step 2: Create GitHub account at github.com

# Step 3: Create new repository on GitHub
# github.com → New Repository → Name: rupeewise → Public → Create

# Step 4: Open terminal in rupeewise-final folder
cd rupeewise-final

# Step 5: Push to GitHub
git init
git add .
git commit -m "🚀 RupeeWise - Initial deploy"
git remote add origin https://github.com/YOUR_USERNAME/rupeewise.git
git push -u origin main

# Step 6: Go to vercel.com
# → New Project → Import from GitHub → Select rupeewise → Deploy
```

---

### Method 3: Vercel CLI (For Developers)

```bash
# Install Vercel CLI
npm install -g vercel

# Go to project folder
cd rupeewise-final

# Deploy
vercel

# Follow prompts:
# → Login with GitHub/Google
# → Project name: rupeewise
# → Deploy!

# Your site is live at: https://rupeewise.vercel.app
```

---

## 📁 Project Structure

```
rupeewise-final/
├── index.html       ← Landing page
├── login.html       ← Sign in
├── register.html    ← Create account
├── dashboard.html   ← User dashboard
├── stocks.html      ← Live NIFTY 50 stocks
├── learn.html       ← Finance quiz
├── expense.html     ← Expense tracker + AI roast
├── trading.html     ← Paper trading simulator
├── chatbot.js       ← Rupa AI (Hinglish chatbot)
├── auth.js          ← Login/register system
├── api.js           ← Stock API + simulation
├── script.js        ← Shared utilities
├── style.css        ← Complete design system
└── vercel.json      ← Vercel config
```

---

## 🌟 Features

| Feature | Description |
|---|---|
| 📈 **Live Stocks** | All 40 NIFTY 50 stocks with simulated live prices |
| 🤖 **Rupa AI** | Hinglish chatbot — stock advice, goal planning, roast! |
| 💸 **Expense Tracker** | Add expenses, charts, CSV upload, AI roast |
| 🎮 **Paper Trading** | Virtual ₹1 Lakh — trade without real money |
| 🎯 **Goal Planner** | "iPhone lena hai" → instant SIP plan |
| 🎓 **Finance Quiz** | 60+ MCQs across 6 categories |
| 👥 **Multi-user Auth** | 3 demo accounts + register your own |
| 🌙 **Dark Mode** | Persistent across all pages |

---

## 🔐 Demo Accounts

| User | Email | Password |
|---|---|---|
| Aakash Kumar | aakash@demo.com | Demo@1234 |
| Priya Sharma | priya@demo.com | Demo@1234 |
| Rahul Verma | rahul@demo.com | Demo@1234 |

---

## ⚠️ Important Notes

- **No backend needed** — all data stored in browser localStorage
- **No API keys needed** — uses simulated stock data
- **Works offline** after first load
- **Free to deploy** on Vercel (free tier is enough)

---

## 🔗 After Deployment

Your site will be live at:
```
https://rupeewise-XXXX.vercel.app
```

You can add a **custom domain** in Vercel settings for free!
