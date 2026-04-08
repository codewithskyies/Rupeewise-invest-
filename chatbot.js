/**
 * ════════════════════════════════════════════════════════════
 *  RupeeWise — Rupa AI Financial Assistant  v3.0
 *  Role   : Smart, friendly finance teacher for Indian beginners
 *  Tone   : Simple, clear, helpful — like a teacher, not a textbook
 *  Rules  : No "guaranteed profit". No risky stock tips.
 *           Real ₹ examples. Honest about uncertainty.
 * ════════════════════════════════════════════════════════════
 */
'use strict';

/* ──────────────────────────────────────────────────────────
   STOCK INFO DATABASE  (educational info only — no "buy" advice)
────────────────────────────────────────────────────────── */
var STOCK_INFO = {
  RELIANCE:  { name:'Reliance Industries',  sector:'Energy / Retail / Telecom', pe:28, mktcap:'₹19L Cr', about:'India\'s largest company by revenue. Has diversified into Jio (telecom), Reliance Retail, and green energy alongside its traditional oil business.' },
  TCS:       { name:'Tata Consultancy',      sector:'IT Services',               pe:32, mktcap:'₹14L Cr', about:'India\'s largest IT company. Earns mostly in USD by serving global clients. Known for consistent dividends and strong management.' },
  HDFCBANK:  { name:'HDFC Bank',             sector:'Private Banking',           pe:19, mktcap:'₹13L Cr', about:'India\'s largest private sector bank. Known for low NPAs (bad loans), strong digital presence, and consistent profit growth.' },
  INFY:      { name:'Infosys',               sector:'IT Services',               pe:26, mktcap:'₹7.7L Cr',about:'India\'s 2nd largest IT firm. Strong in AI and cloud transformation. Pays healthy dividends and does regular buybacks.' },
  ICICIBANK: { name:'ICICI Bank',            sector:'Private Banking',           pe:18, mktcap:'₹9L Cr',  about:'Fast-growing private bank. Strong retail banking and digital platform (iMobile). One of India\'s top 5 banks.' },
  KOTAKBANK: { name:'Kotak Mahindra Bank',   sector:'Private Banking',           pe:20, mktcap:'₹3.5L Cr',about:'Premium private bank founded by Uday Kotak. Known for conservative lending and wealth management services.' },
  ITC:       { name:'ITC',                   sector:'FMCG / Hotels / Agri',      pe:28, mktcap:'₹5.8L Cr',about:'Known for cigarettes but rapidly growing FMCG brands (Aashirvaad, Sunfeast). High dividend yield makes it popular with income investors.' },
  WIPRO:     { name:'Wipro',                 sector:'IT Services',               pe:22, mktcap:'₹3L Cr',  about:'Large Indian IT services company. Slower growth than TCS/Infosys but undergoing strategic transformation.' },
  LT:        { name:'Larsen & Toubro',       sector:'Infrastructure / Defence',  pe:35, mktcap:'₹5.1L Cr',about:'India\'s biggest engineering and construction conglomerate. Direct beneficiary of India\'s infrastructure spending boom.' },
  MARUTI:    { name:'Maruti Suzuki',          sector:'Automobiles',               pe:28, mktcap:'₹3.4L Cr',about:'India\'s largest car maker with ~40% market share. Strong rural demand and expanding into electric vehicles.' },
  SUNPHARMA: { name:'Sun Pharmaceutical',    sector:'Pharmaceuticals',           pe:38, mktcap:'₹4.4L Cr',about:'India\'s largest pharma company. Strong in US generic drugs and specialty medicines. Good pipeline of approvals.' },
  TITAN:     { name:'Titan Company',          sector:'Consumer / Jewellery',      pe:90, mktcap:'₹2.9L Cr',about:'Tata group company. Makes Tanishq jewellery, Titan watches, Fastrack. Premium brand with loyal customers, but expensive valuation.' },
  BAJFINANCE:{ name:'Bajaj Finance',          sector:'NBFC / Lending',            pe:35, mktcap:'₹4.4L Cr',about:'India\'s best consumer finance company. Gives EMIs for phones, appliances etc. High growth but also higher risk than banks.' },
  HCLTECH:   { name:'HCL Technologies',      sector:'IT Services',               pe:25, mktcap:'₹4.7L Cr',about:'India\'s 3rd largest IT company. Strong in engineering services and product segment (HCL Software). Often cheaper than TCS/Infosys.' },
  ADANIENT:  { name:'Adani Enterprises',     sector:'Conglomerate',              pe:95, mktcap:'₹2.8L Cr',about:'Flagship of Adani Group. Businesses include airports, green energy, mining. Very high PE — high risk, high potential.' },
  NTPC:      { name:'NTPC',                  sector:'Power Generation',          pe:14, mktcap:'₹3.5L Cr',about:'India\'s largest power producer. Stable earnings from government contracts. Moving into renewables. Good for conservative investors.' },
  ONGC:      { name:'ONGC',                  sector:'Oil & Gas',                 pe:8,  mktcap:'₹3.6L Cr',about:'Government-owned oil explorer. Cheap valuation but earnings depend on global oil prices. Pays decent dividends.' },
  POWERGRID: { name:'Power Grid Corp',       sector:'Power Transmission',        pe:16, mktcap:'₹3L Cr',  about:'Monopoly in high-voltage power transmission. Regulated earnings, ~5% dividend yield. Very stable — good for risk-averse investors.' },
};

/* ──────────────────────────────────────────────────────────
   TEACHER-TONE RESPONSE LIBRARY
────────────────────────────────────────────────────────── */
function r(text, quick) { return { text: text, quick: quick || [] }; }

/* ══════════════════════════════════════════════════════════
   CORE HANDLERS — Teacher style, beginner-first
══════════════════════════════════════════════════════════ */

function hGreet(ctx) {
  var name = ctx.user ? ', ' + ctx.user.name.split(' ')[0] : '';
  return r(
    'Namaste' + name + '! 🙏 Main hoon **Rupa** — aapki personal finance teacher!\n\n'
    + 'Main aapko simple bhasha mein samjhaungi:\n'
    + '• 📈 Stocks aur Share Market\n'
    + '• 🔄 SIP aur Mutual Funds\n'
    + '• 💡 Saving vs Investing ka fark\n'
    + '• ⚖️ Risk aur Return\n'
    + '• 🎯 Goal-based planning\n\n'
    + '**Koi bhi sawal "silly" nahi hota.** Puchiye! 😊',
    ['Stock market kya hota hai?', 'SIP kaise kaam karta hai?', 'Investing kahan se shuru karun?', 'Risk kya hota hai?']
  );
}

function hHelp() {
  return r(
    '**Main kya samjha sakti hoon:** 📚\n\n'
    + '**📈 Share Market Basics**\n'
    + '• "Stock market kya hota hai?"\n'
    + '• "TCS ke baare mein batao" (general info)\n'
    + '• "P/E ratio kya hota hai?"\n\n'
    + '**🔄 SIP & Mutual Funds**\n'
    + '• "SIP kya hota hai?"\n'
    + '• "Mutual fund aur FD mein kya fark hai?"\n'
    + '• "ELSS kya hota hai?"\n\n'
    + '**💰 Saving & Investing**\n'
    + '• "₹5000 se kaise invest karun?"\n'
    + '• "Emergency fund kya hota hai?"\n'
    + '• "Gold vs Stocks — kaunsa better hai?"\n\n'
    + '**⚖️ Risk & Returns**\n'
    + '• "Risk kya hota hai investing mein?"\n'
    + '• "Long-term vs short-term investing"\n\n'
    + '💬 _Koi bhi question simple bhasha mein puchiye!_',
    ['SIP kya hai?', 'Stock market kaise kaam karta hai?', '₹1000 se invest karna hai', 'Risk explain karo']
  );
}

/* ── STOCK MARKET BASICS ── */
function hWhatIsStockMarket() {
  return r(
    '**📈 Stock Market kya hota hai? — Simple Explanation**\n\n'
    + '**Real-life example se samjhiye:**\n\n'
    + 'Socho tumhara dost Ramesh ek chai ki dukaan kholna chahta hai. Usse ₹1 lakh chahiye lekin uske paas sirf ₹50,000 hain.\n\n'
    + 'Woh 100 log dhundta hai, har koi ₹500 deta hai. Ab woh sabke "partner" ban gaye — jab dukaan mein profit hoga, sabko share milega!\n\n'
    + '**Stock market exactly yahi karta hai — lekin badi companies ke liye.**\n\n'
    + '• **Share/Stock** = kisi company mein aapka chhota sa hissa\n'
    + '• **BSE/NSE** = India ke do main stock exchanges (jahan buying-selling hoti hai)\n'
    + '• **NIFTY 50** = India ki top 50 companies ka index\n'
    + '• **SENSEX** = BSE ki top 30 companies ka index\n\n'
    + '**Jab company grow karta hai → share price badhti hai → aapka paisa bhi badhta hai!**\n\n'
    + '⚠️ _Lekin ek zaruri baat: share price girti bhi hai. Risk hota hai._',
    ['P/E ratio kya hota hai?', 'Stock kaise khareedein?', 'NIFTY kya hota hai?', 'Dividend kya hota hai?']
  );
}

function hWhatIsShare() {
  return r(
    '**📊 Share/Stock kya hota hai?**\n\n'
    + '**Simple example:**\n\n'
    + 'Imagine karo ki TCS ki total value ₹14 lakh crore hai, aur unhone 300 crore shares banaye hain.\n\n'
    + 'Agar aap 1 share khareedein:\n'
    + '• Aap TCS ke ek chhote hisse ke owner ban jaate ho\n'
    + '• Company grow kare → aapka share ka price badhe\n'
    + '• Company dividend de → aapko bhi paisa mile\n\n'
    + '**4 tarike paisa banane ke:**\n'
    + '1. **Price gain** — ₹100 mein kharida, ₹150 mein becha\n'
    + '2. **Dividend** — company apna profit baanta hai\n'
    + '3. **Bonus shares** — free mein extra shares milti hain\n'
    + '4. **Stock split** — 1 share se 2 shares bann jaate hain (price half)\n\n'
    + '⚠️ _Shares ki price gir bhi sakti hai — isliye research zaroori hai!_',
    ['Dividend kya hota hai?', 'Kaise stock choose karein?', 'SIP vs Direct Stocks', 'Risk kya hota hai?']
  );
}

function hDividend() {
  return r(
    '**💰 Dividend kya hota hai?**\n\n'
    + '**Simple example:**\n\n'
    + 'Socho aapke paas ITC ke 100 shares hain. ITC ne decide kiya ki har share pe ₹6 dividend dega.\n\n'
    + '→ Aapko milega: 100 × ₹6 = **₹600** — bank account mein seedha!\n\n'
    + '**Dividend kab milta hai?**\n'
    + '• Company jab achha profit karti hai\n'
    + '• Board of Directors decide karte hain kitna dividend dena hai\n'
    + '• Saal mein 1-2 baar diya jaata hai usually\n\n'
    + '**Dividend Yield kya hota hai?**\n'
    + 'Agar share price ₹500 hai aur dividend ₹25/year hai:\n'
    + 'Dividend Yield = 25/500 × 100 = **5%**\n\n'
    + '**High dividend companies (examples):**\n'
    + '• ITC — ~3-4% yield\n'
    + '• Power Grid — ~4-5% yield\n'
    + '• Coal India — ~6-7% yield\n\n'
    + '💡 _Dividend pe bhi tax lagta hai — aapki income slab ke hisaab se._',
    ['P/E ratio kya hota hai?', 'Tax on dividend kya hota hai?', 'High dividend stocks safe hote hain?']
  );
}

function hPERatio() {
  return r(
    '**📊 P/E Ratio kya hota hai? — Very Simple!**\n\n'
    + '**Full form:** Price to Earnings Ratio\n\n'
    + '**Real-life example:**\n\n'
    + 'Socho ek dukaan se ₹1 lakh/year profit aata hai. Agar koi uss dukaan ko ₹20 lakh mein khareedna chahta hai:\n\n'
    + '→ P/E = 20 lakh ÷ 1 lakh = **20x**\n\n'
    + 'Matlab: aap 20 saal ki kamai ke barabar price de rahe ho!\n\n'
    + '**Stock mein:**\n'
    + '• Share Price ÷ Earnings Per Share = P/E Ratio\n'
    + '• TCS ka P/E ~32 → expensive price\n'
    + '• ONGC ka P/E ~8 → sasta price (but kyun? reason samajhna zaroori hai!)\n\n'
    + '**P/E interpret kaise karein:**\n'
    + '| P/E | Matlab |\n'
    + '|---|---|\n'
    + '| <15 | Sasta (value stock) |\n'
    + '| 15-30 | Fair price |\n'
    + '| >30 | Mehenga (growth expected) |\n'
    + '| >60 | Bahut mehenga — carefully check karo |\n\n'
    + '⚠️ _Low P/E = automatically good nahi hota. Kabhi kabhi company problem mein hoti hai!_',
    ['Market Cap kya hota hai?', 'Kaise stock choose karein?', 'EPS kya hota hai?']
  );
}

function hMarketCap() {
  return r(
    '**💼 Market Capitalisation kya hota hai?**\n\n'
    + '**Formula:** Total Shares × Current Share Price\n\n'
    + '**Example:**\n'
    + 'TCS ke 300 crore shares hain, price ₹3,940/share\n'
    + '→ Market Cap = 300 crore × ₹3,940 = **₹11.8 lakh crore**!\n\n'
    + '**3 categories hain:**\n\n'
    + '🔵 **Large Cap** (> ₹20,000 crore)\n'
    + '• Examples: TCS, Reliance, HDFC Bank\n'
    + '• Stable, reliable, less volatile\n'
    + '• Lower risk, moderate returns\n\n'
    + '🟡 **Mid Cap** (₹5,000 – ₹20,000 crore)\n'
    + '• Growing companies\n'
    + '• More growth potential, more risk\n\n'
    + '🔴 **Small Cap** (< ₹5,000 crore)\n'
    + '• Small, newer companies\n'
    + '• Highest growth potential AND highest risk\n\n'
    + '💡 **Beginners ke liye tip:** Large cap se shuru karo. Jab experience ho tab mid/small cap explore karo.',
    ['Large cap vs Small cap — kaunsa better?', 'NIFTY 50 kya hota hai?', 'Beginner ke liye konse stocks?']
  );
}

function hNifty() {
  return r(
    '**📈 NIFTY 50 aur SENSEX kya hote hain?**\n\n'
    + '**Ek simple example se samjhiye:**\n\n'
    + 'Imagine karo India ki top 50 students ko track karna hai. Agar unka average score badhta hai → school achha kar raha hai!\n\n'
    + '**NIFTY 50** bhi exactly yahi karta hai — India ki **top 50 companies** ka average performance track karta hai.\n\n'
    + '**NIFTY 50:**\n'
    + '• NSE (National Stock Exchange) ka index\n'
    + '• India ki top 50 companies\n'
    + '• India ki economy ka "thermometer" hai\n\n'
    + '**SENSEX:**\n'
    + '• BSE (Bombay Stock Exchange) ka index\n'
    + '• Top 30 companies\n'
    + '• India ka oldest stock index (1875 se!)\n\n'
    + '**NIFTY 50 ne 20 saal mein:**\n'
    + '• 2004: ~1,800 levels\n'
    + '• 2024: ~22,000+ levels\n'
    + '• Return: ~12-13% CAGR (compounded)\n\n'
    + '💡 _Isliye Index Funds itne popular hain — seedha NIFTY mein invest karo!_',
    ['Index fund kya hota hai?', 'NIFTY mein directly invest kaise karein?', 'CAGR kya hota hai?']
  );
}

/* ── SIP & MUTUAL FUNDS ── */
function hWhatIsSIP() {
  return r(
    '**🔄 SIP kya hota hai? — Ek simple example**\n\n'
    + 'Socho tum har mahine ₹2,000 apne piggy bank mein daalte ho. Ab imagine karo woh piggy bank tumhara paisa invest karke aur badhata hai!\n\n'
    + '**SIP = Systematic Investment Plan**\n'
    + 'Har mahine ek fixed amount automatically mutual fund mein jaata hai.\n\n'
    + '**Kaise kaam karta hai:**\n'
    + '• 5 tarikh ko bank se ₹2,000 automatically cut hote hain\n'
    + '• Mutual fund us paison se units khareedta hai\n'
    + '• Market upar-neeche ho — tum invest karte rehte ho\n\n'
    + '**SIP ka jadoo — Real example:**\n\n'
    + '| Monthly SIP | Saal | 12% CAGR pe |\n'
    + '|---|---|---|\n'
    + '| ₹1,000 | 10 saal | ₹2.3 lakh |\n'
    + '| ₹1,000 | 20 saal | ₹9.9 lakh |\n'
    + '| ₹5,000 | 20 saal | ₹49.9 lakh |\n\n'
    + '**Tune invest kiya:** ₹1,000 × 240 months = ₹2.4 lakh\n'
    + '**Mila:** ₹9.9 lakh 🤯 (Baaki compounding ne banaya!)\n\n'
    + '⚠️ _12% guaranteed nahi hai — yeh historical average hai. Actual returns vary karti hain._',
    ['Mutual fund kya hota hai?', 'Minimum SIP kitni hoti hai?', 'SIP kaise shuru karein?', 'Compounding kya hota hai?']
  );
}

function hMutualFund() {
  return r(
    '**📊 Mutual Fund kya hota hai? — Super simple!**\n\n'
    + '**Example:**\n\n'
    + 'Socho 1,000 logon ne ek expert fund manager ko paise diye aur kaha — "bhai, hamara paisa invest karo!"\n\n'
    + 'Ab manager woh paisa 50 different companies mein lagata hai — risk automatically kam ho jaata hai!\n\n'
    + '**Mutual Fund ke types:**\n\n'
    + '📈 **Equity Fund** — Stocks mein invest karta hai\n'
    + '• High return potential (12-15% historically)\n'
    + '• High risk bhi, 5+ saal rakhna chahiye\n\n'
    + '🏛️ **Debt Fund** — Government/corporate bonds mein\n'
    + '• FD jaise stable (6-8% typically)\n'
    + '• Low risk, short-term ke liye better\n\n'
    + '⚖️ **Hybrid Fund** — Equity + Debt ka mix\n'
    + '• Balanced approach — moderate risk aur return\n\n'
    + '🏅 **Index Fund** — NIFTY 50 ko copy karta hai\n'
    + '• Very low cost (expense ratio 0.1-0.2%)\n'
    + '• Beginners ke liye **best starting point!**\n\n'
    + '**Direct vs Regular Plan:**\n'
    + '• Regular plan → broker ko commission (1-2% extra charge)\n'
    + '• Direct plan → saste, Groww/Kuvera pe available\n\n'
    + '💡 _Hamesha Direct Plan lo — 20 saal mein lakhs ka fark padta hai!_',
    ['Index fund vs Active fund — kaunsa better?', 'ELSS kya hota hai?', 'NAV kya hota hai?', 'SIP kaise shuru karein?']
  );
}

function hELSS() {
  return r(
    '**🧾 ELSS kya hota hai? — Tax bhi bachao, invest bhi karo!**\n\n'
    + '**ELSS = Equity Linked Savings Scheme**\n\n'
    + '**Simple English mein:** Ek mutual fund jo aapka tax bhi bachaata hai!\n\n'
    + '**Benefits:**\n'
    + '✅ Section 80C ke under ₹1.5 lakh tak tax deduction\n'
    + '✅ Sirf 3 saal ka lock-in (PPF ke 15 saal se zyada kam!)\n'
    + '✅ Equity mein invest → higher return potential\n\n'
    + '**Real Example:**\n\n'
    + 'Agar aap 30% tax bracket mein ho:\n'
    + '• ₹1.5 lakh ELSS mein invest kiya\n'
    + '• Tax mein bachaye: ₹1,50,000 × 30% = **₹45,000!**\n'
    + '• Plus market returns bhi milenge!\n\n'
    + '**Tax saving options compare:**\n'
    + '| Option | Lock-in | Returns |\n'
    + '|---|---|---|\n'
    + '| ELSS | 3 years | Market-linked (12-15% hist.) |\n'
    + '| PPF | 15 years | 7.1% (fixed, tax-free) |\n'
    + '| FD (tax saving) | 5 years | ~6.5% (taxable) |\n'
    + '| NPS | Till retirement | Market-linked |\n\n'
    + '⚠️ _ELSS returns guaranteed nahi hain — market pe depend karta hai._',
    ['PPF vs ELSS — kaunsa better hai?', 'Section 80C mein aur kya hai?', 'LTCG tax kya hota hai?']
  );
}

function hIndexFund() {
  return r(
    '**🏅 Index Fund kya hota hai? — Beginner ka best friend!**\n\n'
    + '**Simple se samjhiye:**\n\n'
    + 'NIFTY 50 mein 50 companies hain. Index fund simply yahi karta hai:\n'
    + '"NIFTY 50 jo kare, main bhi wahi karunga!"\n\n'
    + 'Koi fund manager nahi, koi "stock picking" nahi — bas automatic copy!\n\n'
    + '**Kyu better hai Active Funds se? (often)**\n\n'
    + '| Feature | Index Fund | Active Fund |\n'
    + '|---|---|---|\n'
    + '| Expense Ratio | 0.05-0.2% | 1-2.5% |\n'
    + '| Fund Manager | Nahi chahiye | Haan |\n'
    + '| Returns | NIFTY jaisa | Kabhi better, kabhi worse |\n'
    + '| Complexity | Simple | Complex |\n\n'
    + '**The hidden cost example:**\n'
    + '₹1 lakh × 20 saal × 12% return:\n'
    + '• Index Fund (0.1% cost): → **₹9.2 lakh**\n'
    + '• Active Fund (1.5% cost): → **₹7.4 lakh**\n'
    + 'Sirf fees ka fark = **₹1.8 lakh!** 😮\n\n'
    + '**Best Index Funds (educational, not advice):**\n'
    + '• UTI Nifty 50 Index Fund\n'
    + '• HDFC Index Fund – Nifty 50\n'
    + '• Nippon India Index Fund\n\n'
    + '💡 _Warren Buffett ne bhi kaha hai: Most investors ke liye Index Fund best hai!_',
    ['SIP kaise shuru karein?', 'Expense ratio kya hota hai?', 'Active fund kabhi better hota hai?']
  );
}

function hNAV() {
  return r(
    '**📋 NAV kya hota hai?**\n\n'
    + '**NAV = Net Asset Value**\n'
    + 'Ek mutual fund unit ki current price!\n\n'
    + '**Example:**\n'
    + 'Ek fund ke paas ₹100 crore ke stocks hain.\n'
    + 'Fund ne 10 crore units issue ki hain.\n\n'
    + 'NAV = ₹100 crore ÷ 10 crore units = **₹10 per unit**\n\n'
    + '**NAV ke baare mein ek badi galti:**\n\n'
    + '❌ "NAV ₹10 wala fund sasta hai, ₹500 wala mahanga hai"\n\n'
    + '✅ **Yeh soch bilkul galat hai!**\n\n'
    + 'Agar NAV ₹10 hai ya ₹1,000 — isko dekh ke fund judge mat karo.\n'
    + 'Dekhna chahiye: **fund ka past performance, expense ratio, aur fund manager track record.**\n\n'
    + '**NAV kab badhta hai?**\n'
    + '→ Jab fund ke andar jo stocks hain, unki price badhti hai\n\n'
    + '**NAV kab ghatta hai?**\n'
    + '→ Jab stocks ki price girty hai',
    ['Expense ratio kya hota hai?', 'Fund choose kaise karein?', 'SIP mein kitne units milenge?']
  );
}

/* ── RISK & RETURNS ── */
function hRiskVsReturn() {
  return r(
    '**⚖️ Risk vs Return — Investing ki sabse zaruri lesson**\n\n'
    + '**Golden Rule:** _Jitna zyada return chahiye, utna zyada risk lena padega._\n\n'
    + 'Koi bhi investment "high return + zero risk" nahi de sakta. Jo deta hai woh scam hai!\n\n'
    + '**Risk-Return Ladder:**\n\n'
    + '🔵 **Savings Account** → 3-4% | Almost zero risk\n'
    + '🔵 **FD / PPF** → 6-7.5% | Very low risk\n'
    + '🟡 **Debt Mutual Funds** → 6-9% | Low-medium risk\n'
    + '🟡 **Balanced/Hybrid Funds** → 9-11% | Medium risk\n'
    + '🔴 **Equity/Index Funds** → 10-14% (long term) | Medium-high risk\n'
    + '🔴 **Direct Stocks** → Unlimited up AND down | High risk\n'
    + '🔴 **Small Cap / Crypto** → Very high | Very high risk\n\n'
    + '**Which is right for you?**\n'
    + '• Young (20s-30s) + Long term → Can take equity risk\n'
    + '• Middle aged → Balanced approach\n'
    + '• Near retirement → More debt, less equity\n\n'
    + '⚠️ _Past returns future returns guarantee nahi karte. Market upar bhi jaata hai, neeche bhi._',
    ['Market crash mein kya karein?', 'Long-term investing kyun better hai?', 'Portfolio diversification kya hai?']
  );
}

function hLongTerm() {
  return r(
    '**⏳ Long-term Investing kyun powerful hai?**\n\n'
    + '**Ek story se samjhiye:**\n\n'
    + 'Raju aur Priya dono 25 saal ki umar mein hain.\n\n'
    + '• **Raju** — ₹5,000/month SIP shuru karta hai **aaj se** (25 saal ki umar mein)\n'
    + '• **Priya** — sochti hai "baad mein shuru karungi" aur 35 mein shuru karti hai\n\n'
    + 'Dono 60 saal ki umar tak invest karte hain at 12% CAGR:\n\n'
    + '• **Raju** (35 saal) → **₹3.24 crore** 🎉\n'
    + '• **Priya** (25 saal) → **₹94 lakh** 😮\n\n'
    + 'Sirf 10 saal ka fark = **₹2.3 crore ka fark!**\n\n'
    + '**Kyu itna fark?** Compounding!\n\n'
    + '"Compounding ka matlab hai — return pe bhi return milta hai, aur return ke return pe bhi return milta hai!"\n\n'
    + '**Compounding example:**\n'
    + '₹1 lakh at 12% CAGR:\n'
    + '• 10 saal → ₹3.1 lakh\n'
    + '• 20 saal → ₹9.6 lakh\n'
    + '• 30 saal → ₹29.9 lakh\n\n'
    + '💡 _Aaj jo boring lagta hai — woh 30 saal baad ek crore ban sakta hai._',
    ['Compounding kya hota hai?', 'SIP kaise shuru karein?', 'Investing mein kya mistakes avoid karein?']
  );
}

function hCompounding() {
  return r(
    '**🔢 Compounding — "8th Wonder of the World"**\n\n'
    + 'Albert Einstein ne kaha tha: _"Compound interest is the 8th wonder of the world."_\n\n'
    + '**Simple explanation:**\n\n'
    + 'Aapne ₹1,000 invest kiya at 10%:\n'
    + '• Year 1 end: ₹1,000 + ₹100 = ₹1,100\n'
    + '• Year 2 end: ₹1,100 + ₹110 = ₹1,210 (₹110 mila, ₹100 nahi!)\n'
    + '• Year 3 end: ₹1,210 + ₹121 = ₹1,331\n\n'
    + 'Aap return pe bhi return kama rahe ho — **yahi compounding hai!**\n\n'
    + '**Rule of 72 — Easy mental math:**\n'
    + '72 ÷ return rate = paisa double hone ke saal\n\n'
    + '| Return Rate | Paisa Double Hoga |\n'
    + '|---|---|\n'
    + '| 6% (FD) | 12 saal mein |\n'
    + '| 8% | 9 saal mein |\n'
    + '| 12% | 6 saal mein |\n'
    + '| 15% | 4.8 saal mein |\n\n'
    + '**₹10,000 ka real journey at 12%:**\n'
    + '• 10 saal → ₹31,058\n'
    + '• 20 saal → ₹96,462\n'
    + '• 30 saal → **₹2,99,599** — sirf ₹10k se! 🤯\n\n'
    + '💡 _Compounding ko kaam karne do — baar baar paise nikaalte mat raho!_',
    ['SIP mein compounding kaise kaam karta hai?', 'Long-term investing start karna hai', 'Best investment for 20 years?']
  );
}

function hMarketCrash() {
  return r(
    '**📉 Market crash mein kya karein? — Panic mat karo!**\n\n'
    + '**Pehle ek important baat:**\n'
    + 'Market crashes **normal** hain. Har 5-7 saal mein ek bada correction aata hi hai.\n\n'
    + '**History se seekho:**\n'
    + '• 2008 Financial Crisis: NIFTY 65% gir gaya\n'
    + '• 2020 COVID crash: NIFTY 40% gir gaya\n'
    + '• Dono mein: **Jinhone becha — loss hua. Jinhone rakha ya kharida — bade winners bane!**\n\n'
    + '**Crash mein kya karna chahiye:**\n\n'
    + '✅ **SIP band mat karo** — crash mein zyada units milti hain, cheap mein!\n'
    + '✅ **Ghbrao mat** — dekho 2008 ke baad 2012 tak market ne recovery ki\n'
    + '✅ **Quality companies mein raho** — temporary loss permanent nahi hota\n'
    + '✅ **Emergency fund already ho** — taaki stocks bechne ki zaroorat na pade\n\n'
    + '❌ **Yeh mat karo:**\n'
    + '• Ghabra ke sab stocks mat becho\n'
    + '• "Market aur girega" soch ke timing mat karo\n'
    + '• News dekh ke decisions mat lo\n\n'
    + '💡 _Warren Buffett: "Be fearful when others are greedy, be greedy when others are fearful."_\n\n'
    + '⚠️ _Specific stocks ka crash different hota hai — company fundamentals zaroor check karo._',
    ['Market timing kya hota hai?', 'Emergency fund kyun zaroori hai?', 'Portfolio diversification kya hai?']
  );
}

function hDiversification() {
  return r(
    '**🧺 Diversification kya hai? — "Sare ande ek tokri mein mat rakho"**\n\n'
    + '**Real example:**\n\n'
    + 'Socho tumhare paas ₹1 lakh hai:\n\n'
    + '❌ **Galat tarika:** Saara paisa sirf 1 company mein\n'
    + '→ Company dub gayi? Sab kuch gaya!\n\n'
    + '✅ **Sahi tarika:** Different jagah invest karo\n'
    + '→ 1-2 companies ki problem = portfolio ko zyada asar nahi\n\n'
    + '**Diversification ke levels:**\n\n'
    + '**Level 1: Different Stocks**\n'
    + '• IT + Banking + Pharma + FMCG mix karo\n\n'
    + '**Level 2: Different Asset Classes**\n'
    + '• Equity + Debt + Gold mix karo\n\n'
    + '**Level 3: Time Diversification**\n'
    + '• Ek hi din mein invest na karo — SIP se karo\n\n'
    + '**Beginner ka simple diversified portfolio:**\n'
    + '• 60% → Nifty 50 Index Fund\n'
    + '• 20% → Debt/Liquid Fund\n'
    + '• 10% → Gold ETF / SGB\n'
    + '• 10% → International Fund (optional)\n\n'
    + '⚠️ _Over-diversification bhi problem hai — 20+ funds ka koi fayda nahi!_',
    ['Asset allocation kya hota hai?', 'Gold mein invest kyun karein?', 'Portfolio review kab karein?']
  );
}

/* ── BASICS: FD, PPF, GOLD ── */
function hFDvsSIP() {
  return r(
    '**🏦 FD vs SIP/Mutual Fund — Kaunsa better hai?**\n\n'
    + '**Fixed Deposit (FD):**\n'
    + '• Guaranteed return: ~6.5-7.5%\n'
    + '• Safe: Bank default hone pe ₹5 lakh DICGC insured\n'
    + '• But: Returns taxable as per your slab!\n'
    + '• Inflation adjust ke baad: Real return often 2-4% only\n\n'
    + '**Equity SIP/Mutual Fund:**\n'
    + '• Historical average: 12-14% (NIFTY 50, long term)\n'
    + '• NOT guaranteed — market pe depend karta hai\n'
    + '• Tax: LTCG 10% above ₹1L (FD se better)\n'
    + '• Best for 5+ year horizon\n\n'
    + '**Inflation ki real picture:**\n'
    + 'India mein inflation ~5-6%\n'
    + '• FD 7% – Tax(30%) – Inflation = ~1-2% real return 😕\n'
    + '• SIP 12% – Tax(10%) – Inflation = ~5-6% real return 😊\n\n'
    + '**Conclusion:**\n'
    + '• Short term (1-3 saal), stable chahiye → FD\n'
    + '• Long term (5+ saal), inflation beat karna → SIP/Mutual Fund\n'
    + '• Emergency fund → Liquid Fund (FD se better withdrawal)\n\n'
    + '⚠️ _Ye comparison historical data pe hai. Future returns vary honge._',
    ['Liquid fund kya hota hai?', 'Inflation kya hota hai?', 'Tax on FD kya hota hai?']
  );
}

function hGold() {
  return r(
    '**🥇 Gold mein invest karna chahiye? — Real analysis**\n\n'
    + '**Gold ke facts:**\n'
    + '• Gold ka long-term return: ~8-9% CAGR (India mein)\n'
    + '• Equity ka long-term return: ~12-14% CAGR (NIFTY)\n'
    + '• Gold ki koi "income" nahi hoti — dividend ya interest nahi\n\n'
    + '**Gold kyun rakhein?**\n'
    + '✅ Inflation hedge — rupaya kamzor ho to gold strong hota hai\n'
    + '✅ Crisis mein safe — war, pandemic mein gold badhta hai\n'
    + '✅ Portfolio stability — equity girne pe gold often badhta hai\n\n'
    + '**Gold mein invest karne ke 3 smart tarike:**\n\n'
    + '🥇 **Sovereign Gold Bond (SGB)** — Best!\n'
    + '• RBI issue karta hai, completely safe\n'
    + '• 2.5% extra interest per year milti hai\n'
    + '• 8 saal baad tax-free maturity!\n\n'
    + '🥈 **Gold ETF** — Stock exchange pe khareedein\n'
    + '• SGB jitna benefit nahi, but zyada liquid\n\n'
    + '❌ **Physical Gold** — Avoid!\n'
    + '• Making charges loss, storage risk, purity doubt\n\n'
    + '💡 **Kitna rakhein?** Portfolio ka 10-15% — zyada nahi!',
    ['SGB kaise khareedein?', 'Gold vs Equity — long term mein kaunsa better?', 'Portfolio mein gold kyun zaruri hai?']
  );
}

function hEmergencyFund() {
  return r(
    '**🛡️ Emergency Fund — Ye kyun SABSE PEHLE banana chahiye?**\n\n'
    + '**Kya hota hai Emergency Fund?**\n'
    + '3-6 mahine ke monthly kharche jitna paisa — easily accessible jagah.\n\n'
    + '**Kyun zaruri hai?**\n\n'
    + 'Agar aapke paas emergency fund nahi hai aur:\n'
    + '• Job chali gayi → Shares bechne padenge (market down ho toh loss!)\n'
    + '• Medical emergency → FD todna padega (penalty!)\n'
    + '• Car repair, home repair → Credit card loan lena padega (high interest!)\n\n'
    + '**Emergency Fund kahan rakhein?**\n\n'
    + '✅ **Liquid Mutual Fund** — Best option!\n'
    + '• ~6.5-7% return\n'
    + '• 1-2 business days mein withdrawal\n'
    + '• Examples: Parag Parikh Liquid, HDFC Liquid Fund\n\n'
    + '✅ **High-interest Savings Account**\n'
    + '• IDFC First, AU Bank: ~7% on savings\n'
    + '• Instant withdrawal\n\n'
    + '❌ **Equity/Stocks mein mat rakhna** — market down ho to aur bhi problem!\n\n'
    + '**Kitna banana chahiye?**\n'
    + '• Monthly kharche ₹30,000 → Emergency Fund: ₹90,000 – ₹1,80,000\n\n'
    + '💡 _Emergency Fund bana lo PEHLE, baad mein baaki sab investing._',
    ['Liquid fund kya hota hai?', 'Pehle emergency fund ya SIP?', 'Savings account vs Liquid Fund']
  );
}

function hBeginnerGuide() {
  return r(
    '**🌱 Investing Kahan Se Shuru Karun? — Step by Step**\n\n'
    + '**Step 1: Emergency Fund Banao** 🛡️\n'
    + '3-6 months ke kharche Liquid Fund mein rakh lo.\n'
    + 'Iske bina aage mat badho!\n\n'
    + '**Step 2: Insurance Lo** 🏥\n'
    + '• Health Insurance: Minimum ₹5-10 lakh ka\n'
    + '• Term Life Insurance: Income × 10-15 times\n\n'
    + '**Step 3: Pehli SIP Shuru Karo** 🔄\n'
    + '• ₹500-₹1000/month se shuru karo\n'
    + '• **Nifty 50 Index Fund** — beginners ke liye perfect\n'
    + '• Platform: Groww, Kuvera, Zerodha Coin (sab free!)\n\n'
    + '**Step 4: Tax Planning Karo** 🧾\n'
    + '• ELSS mein invest karo → 80C ka benefit\n'
    + '• PPF account kholo\n\n'
    + '**Step 5: Knowledge Badhao** 📚\n'
    + '• RupeeWise ka Quiz karo!\n'
    + '• "Let\'s Talk Money" by Monika Halan padhna — best beginner book!\n\n'
    + '**Avoid these mistakes:**\n'
    + '❌ Tips pe stock khareedna\n'
    + '❌ "Guaranteed 30% return" wale apps\n'
    + '❌ F&O trading without experience\n'
    + '❌ Saare paise ek jagah\n\n'
    + '⏰ _Sahi time aaj hai — kal nahi!_',
    ['Nifty 50 Index Fund — kaise invest karein?', 'Term insurance vs Life insurance', 'Common investing mistakes', 'ELSS kya hota hai?']
  );
}

function hTax() {
  return r(
    '**🧾 Investing pe Tax — Simple Guide**\n\n'
    + '**Equity (Stocks + Equity Mutual Funds):**\n\n'
    + '📅 **1 saal se kam raha (Short Term):**\n'
    + '→ STCG Tax: **15%** flat (chahe aap kitne bhi slab mein ho)\n\n'
    + '📅 **1 saal se zyada raha (Long Term):**\n'
    + '→ LTCG Tax: **10%** — lekin pehle ₹1 lakh pe koi tax nahi!\n\n'
    + '**Example:**\n'
    + 'Aapne ₹3 lakh ka profit banaya long term mein:\n'
    + '• Pehle ₹1 lakh: Tax-free ✅\n'
    + '• Baaki ₹2 lakh pe: 10% = ₹20,000 tax\n\n'
    + '**Debt Mutual Funds (after April 2023):**\n'
    + '→ Aapki income slab ke hisaab se tax (FD jaisa treat)\n\n'
    + '**Tax Save Kaise Karein:**\n'
    + '✅ ELSS mein invest → ₹1.5 lakh tak 80C deduction\n'
    + '✅ 1 saal se zyada hold karo → LTCG benefit\n'
    + '✅ Tax loss harvesting → losses se gains offset karo\n'
    + '✅ PPF → completely tax-free returns!\n\n'
    + '⚠️ _Tax laws change hoti rehti hain — apne CA se confirm karo._',
    ['ELSS mein invest karna chahiye?', 'PPF vs ELSS', 'Long-term investing ke benefits', 'Tax loss harvesting kya hota hai?']
  );
}

/* ── STOCK-SPECIFIC INFO ── */
function hStockInfo(sym) {
  sym = sym.toUpperCase().replace(/\s+/g,'');
  var info = STOCK_INFO[sym];
  if (!info) {
    return r(
      '**Hmm, ' + sym + ' ke baare mein detailed info mere paas nahi hai!** 😕\n\n'
      + '**Main jo bata sakti hoon:**\n'
      + 'Kisi bhi stock ke baare mein research karte waqt yeh cheezein zaroor dekho:\n\n'
      + '1. **Business kya karta hai?** — Company ka model samjho\n'
      + '2. **Revenue aur Profit trend** — Badhta ja raha hai ya girta?\n'
      + '3. **P/E Ratio** — Sab se compare karo\n'
      + '4. **Debt** — Zyada loan = zyada risk\n'
      + '5. **Promoter holding** — 50%+ achha hota hai\n'
      + '6. **Competition** — Industry mein position\n\n'
      + '**Research ke free tools:**\n'
      + '• Screener.in — Financial data\n'
      + '• Moneycontrol.com — News + charts\n'
      + '• BSE/NSE website — Official filings\n\n'
      + '⚠️ _Kisi bhi specific stock mein invest karne ki advice main nahi de sakti — apni research karo ya SEBI-registered advisor se milo!_',
      ['Kisi bhi stock ko research kaise karein?', 'P/E ratio kya hota hai?', 'Beginner ke liye kahan invest karein?']
    );
  }
  return r(
    '**📊 ' + info.name + ' (' + sym + ') — Educational Info**\n\n'
    + '🏭 **Sector:** ' + info.sector + '\n'
    + '📊 **P/E Ratio:** ~' + info.pe + 'x (approximate)\n'
    + '💼 **Market Cap:** ~' + info.mktcap + '\n\n'
    + '**Company ke baare mein:**\n'
    + info.about + '\n\n'
    + '**Research karte waqt check karo:**\n'
    + '• Revenue growth (3-5 saal ka trend)\n'
    + '• Net Profit margin\n'
    + '• Debt-to-Equity ratio\n'
    + '• Return on Equity (ROE)\n'
    + '• Promoter shareholding\n\n'
    + '⚠️ **Important disclaimer:**\n'
    + '_Yeh sirf educational information hai. Main kisi bhi stock mein invest karne ki recommendation nahi de sakti. Invest karne se pehle apni research karo ya SEBI-registered financial advisor se salah lo._',
    ['P/E ratio ' + sym + ' ka kaisa hai?', sym + ' vs index fund — kya better?', 'Kisi bhi stock research kaise karein?']
  );
}

function hHowToResearch() {
  return r(
    '**🔍 Kisi bhi Stock Ko Research Kaise Karein?**\n\n'
    + '**5-step beginner framework:**\n\n'
    + '**Step 1: Business samjho** 🏢\n'
    + '"Kya main 5 lines mein explain kar sakta hoon company kya karta hai?"\n'
    + 'Agar nahi → invest mat karo!\n\n'
    + '**Step 2: Financial health check** 📊\n'
    + '• Revenue growing hai? (3-5 saal trend)\n'
    + '• Net profit margin achha hai?\n'
    + '• Debt zyada toh nahi? (Debt/Equity < 1 prefer karo)\n\n'
    + '**Step 3: Valuation check** 💰\n'
    + '• P/E ratio: Industry average se compare karo\n'
    + '• PEG ratio: Growth ke saath compare\n\n'
    + '**Step 4: Management check** 👨‍💼\n'
    + '• Promoter holding 50%+ hai?\n'
    + '• Koi fraud/scam history toh nahi?\n'
    + '• Annual reports padhne ki koshish karo\n\n'
    + '**Step 5: Price check** 📈\n'
    + '• SIP se khareedna → averaging ho jaati hai\n'
    + '• Ek baar mein sab invest mat karo\n\n'
    + '**Free Tools:**\n'
    + '• **Screener.in** — Best free tool for financials\n'
    + '• **Tickertape.in** — Easy charts and data\n'
    + '• **NSE/BSE website** — Official data\n'
    + '• **Annual Report** — Company ki website pe\n\n'
    + '⚠️ _Tips pe, WhatsApp pe, YouTube pe stock "tips" mat maano!_',
    ['P/E ratio kya hota hai?', 'Mutual fund vs Direct stocks', 'Common investing mistakes']
  );
}

function hMistakes() {
  return r(
    '**❌ Common Investing Mistakes — Ye mat karna!**\n\n'
    + '**Mistake 1: Bina research ke invest karna**\n'
    + '"XYZ ne bola tha TCS lelo" → Aap khud research karo!\n\n'
    + '**Mistake 2: Sab paisa ek jagah laganaa**\n'
    + '100% equity, 100% ek stock → Agar woh gira sab gaya!\n\n'
    + '**Mistake 3: Ghabra ke bech dena**\n'
    + 'Market 20% girta hai → "Sab kuch bech do!" → Wrong!\n'
    + 'NIFTY 50 ne 2008 mein 65% girne ke baad 2012 mein recover kiya!\n\n'
    + '**Mistake 4: Return sirf return dekh ke fund choose karna**\n'
    + '"Iss fund ne 50% diya last year" → Past performance = future guarantee nahi!\n\n'
    + '**Mistake 5: EMI pe invest karna**\n'
    + 'Loan le ke invest karna — very bad idea!\n'
    + 'Market 30% gira → Aap double loss mein!\n\n'
    + '**Mistake 6: F&O (Futures & Options) without knowledge**\n'
    + 'SEBI study: 90% F&O traders paise kho dete hain!\n\n'
    + '**Mistake 7: Inflation ignore karna**\n'
    + 'FD 6% milti hai, inflation 6% — actual return: ZERO!\n\n'
    + '**Mistake 8: Insurance ko investment samajhna**\n'
    + 'LIC ULIP → high charges, poor returns + insurance coverage bhi kam!\n\n'
    + '💡 _Slow and steady wins the race — boring SIP > exciting stock tips!_',
    ['Portfolio diversification kya hai?', 'SIP vs Direct stocks', 'F&O trading ke baare mein batao']
  );
}

function hGoalInvest(keyword) {
  var goals = {
    iphone:  { name:'iPhone 16 Pro', amt:134900, horizon:'12-18 mahine', best:'Liquid Fund / Short Duration Debt Fund', tip:'EMI pe gadget lena expensive padta hai. Interest mein extra phone aa jaata hai!' },
    phone:   { name:'New Phone', amt:50000, horizon:'6-12 mahine', best:'Liquid Fund / FD', tip:'Budget phones great value dete hain — consider Pixel 8a ya OnePlus 12R!' },
    laptop:  { name:'Laptop', amt:80000, horizon:'12-18 mahine', best:'Liquid Fund / Short-term Debt Fund', tip:'Student ho? Apple Education store pe discount milti hai!' },
    bike:    { name:'Bike', amt:120000, horizon:'12-24 mahine', best:'Short Duration Fund / FD', tip:'Bike pe loan avoid karo — vehicle depreciate hoti hai, loan ka interest alag!' },
    trip:    { name:'Vacation / Trip', amt:80000, horizon:'6-12 mahine', best:'Liquid Fund / FD', tip:'Off-season mein travel 30-40% sasta padta hai! Credit card travel points bhi use karo.' },
    europe:  { name:'Europe Trip', amt:200000, horizon:'12-24 mahine', best:'Short Duration Debt Fund', tip:'Schengen visa 3-4 mahine pehle apply karo. October-March off-season hai!' },
    car:     { name:'Car Down Payment', amt:200000, horizon:'24-36 mahine', best:'Balanced Hybrid Fund', tip:'Maximum down payment do — EMI period kam karo. Kam loan = kam interest = zyada savings!' },
    wedding: { name:'Wedding Fund', amt:500000, horizon:'24-48 mahine', best:'Balanced Hybrid Fund + FD', tip:'Simple wedding > Costly wedding. Usse better paisa ghar ke liye bachao!' },
    house:   { name:'Home Down Payment', amt:1500000, horizon:'5-10 saal', best:'Equity Index Fund (SIP)', tip:'Ghar ke liye 20-30% down payment ready rakhna chahiye. Jitna zyada down payment, utna kam loan aur interest!' },
    child:   { name:'Child Education', amt:2000000, horizon:'10-15 saal', best:'Equity Index Fund (SIP)', tip:'Start karo jab baccha chota ho — 15 saal ka compounding bahut powerful hota hai!' },
  };

  var key = (keyword||'').toLowerCase();
  var found = null;
  Object.keys(goals).forEach(function(k){ if(key.includes(k)) found = goals[k]; });
  if(!found) found = { name:keyword||'Goal', amt:100000, horizon:'12-24 mahine', best:'Based on time horizon choose karo', tip:'Short term (<3 yr): Debt Fund. Long term (5+ yr): Equity SIP.' };

  var monthly5k = found.amt / 5000;
  var months12  = found.horizon;

  return r(
    '**🎯 Goal: ' + found.name + ' — Smart Planning**\n\n'
    + '**Target:** ₹' + found.amt.toLocaleString('en-IN') + '\n'
    + '**Suggested Timeline:** ' + found.horizon + '\n'
    + '**Best Investment:** ' + found.best + '\n\n'
    + '**Simple Calculation:**\n'
    + '₹5,000/month save karo → ' + Math.ceil(monthly5k) + ' mahine mein target!\n\n'
    + '**Rupa ka tip:** ' + found.tip + '\n\n'
    + '**General Rule for Goals:**\n'
    + '• **<1 saal** → Liquid Fund ya FD (safety important hai)\n'
    + '• **1-3 saal** → Short Duration Debt Fund\n'
    + '• **3-5 saal** → Balanced Hybrid Fund\n'
    + '• **5+ saal** → Equity Index Fund (SIP)\n\n'
    + '⚠️ _Short-term goals ke liye equity avoid karo — market temporary neeche bhi ja sakta hai!_',
    ['Liquid fund kya hota hai?', 'SIP start karna hai', 'Budget kaise banayein?']
  );
}

function hSIPStart() {
  return r(
    '**🚀 SIP Kaise Shuru Karein? — Complete Guide**\n\n'
    + '**Step 1: Platform choose karo (sab free!)**\n'
    + '• **Groww** — Most beginner-friendly app\n'
    + '• **Kuvera** — Direct plans, no commissions\n'
    + '• **Zerodha Coin** — If you already use Zerodha\n'
    + '• **HDFC, SBI MF website** — Direct from AMC\n\n'
    + '**Step 2: KYC complete karo (one-time)**\n'
    + '• Aadhaar aur PAN chahiye\n'
    + '• 10-15 minute ka process\n'
    + '• Online ho jaata hai, kisi office nahi jaana\n\n'
    + '**Step 3: Pehla fund choose karo**\n'
    + '• Beginner ke liye: **UTI Nifty 50 Index Fund**\n'
    + '• Expense ratio: sirf ~0.18% — bahut sasta!\n'
    + '• Risk: Medium (market ke saath upar-neeche hoga)\n\n'
    + '**Step 4: Auto-debit set karo**\n'
    + '• Bank account link karo\n'
    + '• Date choose karo (salary ke 5-7 din baad)\n'
    + '• Amount set karo — minimum ₹500!\n\n'
    + '**Kitne se shuru karein?**\n'
    + 'Jo comfortable ho woh — ₹500 se ₹5,000 tak sab theek hai.\n'
    + 'Sab se important hai **shuru karna** — amount baad mein badha sakte ho!\n\n'
    + '💡 _Direct Plan lo — Regular plan mein broker commission jaata hai, jo 20 saal mein lakhs ka fark banaata hai!_',
    ['Nifty 50 Index Fund kaisa hota hai?', 'Direct vs Regular plan — kya fark hai?', 'Minimum SIP kitni honi chahiye?']
  );
}

function hThanks() {
  var msgs = [
    'Khushi hui madad karke! 😊 Aur koi sawal ho toh zaroor puchiye!',
    'Bilkul welcome hai! 🙏 Investing mein patience sabse bada weapon hai — rakhiye!',
    'Shukriya! 💚 Koi bhi concept unclear lage toh kisi bhi waqt puchiye — koi sawal chota nahi hota!',
    'Aise hi seekhte rahiye! 📚 Finance samajhna ek journey hai — aap sahi raaste pe hain!'
  ];
  return r(msgs[Math.floor(Math.random()*msgs.length)],
    ['Aur kuch puchna hai', 'SIP ke baare mein batao', 'Investing mistakes kya hain?']);
}

function hFallback(input) {
  var isHindi = /[^\u0000-\u007F]/.test(input) || /kya|kaise|kyun|batao|samjhao|karun|chahiye/i.test(input);
  var opening = isHindi
    ? 'Aapka sawal main poori tarah samajh nahi paayi! 😊'
    : "I didn't quite understand that!";
  return r(
    opening + ' Kuch aur words mein try kariye.\n\n'
    + 'Yeh cheezein main aasaani se samjha sakti hoon:\n\n'
    + '• **"Stock market kya hota hai?"**\n'
    + '• **"SIP kaise kaam karta hai?"**\n'
    + '• **"TCS ke baare mein batao"** (educational info)\n'
    + '• **"Mujhe ₹5,000 se invest karna hai"**\n'
    + '• **"Market crash mein kya karein?"**\n'
    + '• **"ELSS kya hota hai?"**\n\n'
    + 'Ya simply **"help"** likhiye — main sab options dikhaungi! 😊',
    ['Stock market kya hota hai?', 'SIP kya hota hai?', 'Investing kahan se shuru karein?', 'Help']
  );
}

/* ══════════════════════════════════════════════════════════
   MESSAGE ROUTER — pattern matching engine
══════════════════════════════════════════════════════════ */
function processMessage(rawInput) {
  var ctx   = getCtx();
  var input = rawInput.trim();
  var lo    = input.toLowerCase();

  /* Greet */
  if (/^(hi|hello|hey|namaste|hii|namaskar|good\s*(morning|afternoon|evening))[!?.\s]*$/i.test(input)) return hGreet(ctx);

  /* Thanks */
  if (/\b(thank|shukriya|dhanyawad|bahut acha|great answer|helpful|perfect)\b/i.test(lo)) return hThanks();

  /* Help */
  if (/^help$|^kya puch sakta|^kya kar sakte|what can you|aap kya bata|features/i.test(lo)) return hHelp();

  /* ── STOCK MARKET BASICS ── */
  if (/stock market kya|share market kya|market kaise kaam|how does stock market|what is stock market/i.test(lo)) return hWhatIsStockMarket();
  if (/\bshare kya|stock kya|equity kya|what is a share|what is stock\b/i.test(lo)) return hWhatIsShare();
  if (/dividend kya|what is dividend/i.test(lo)) return hDividend();
  if (/p\/e ratio|pe ratio|price to earnings|p e ratio/i.test(lo)) return hPERatio();
  if (/market cap|market capitalisation|market capitalization|large cap|mid cap|small cap/i.test(lo)) return hMarketCap();
  if (/nifty kya|sensex kya|what is nifty|what is sensex|nifty 50 kya/i.test(lo)) return hNifty();

  /* ── SIP & MF ── */
  if (/sip kya|what is sip|sip kaise kaam|sip explain|systematic investment/i.test(lo)) return hWhatIsSIP();
  if (/mutual fund kya|what is mutual fund|mf kya|fund types|types of mutual/i.test(lo)) return hMutualFund();
  if (/\belss\b|equity linked savings|tax saving fund/i.test(lo)) return hELSS();
  if (/index fund kya|what is index fund|nifty 50 fund|passive fund/i.test(lo)) return hIndexFund();
  if (/\bnav\b|net asset value|fund ki price/i.test(lo)) return hNAV();
  if (/direct plan|regular plan|direct vs regular|expense ratio kya/i.test(lo)) return r(
    '**📋 Direct Plan vs Regular Plan — Kya Fark Hai?**\n\n'
    + '**Regular Plan:**\n'
    + '• Broker ya distributor ke through\n'
    + '• Broker ko commission milta hai (1-1.5% extra every year)\n'
    + '• Same fund, higher expense ratio\n\n'
    + '**Direct Plan:**\n'
    + '• Directly AMC (fund house) se\n'
    + '• Koi broker commission nahi\n'
    + '• Lower expense ratio → more returns!\n\n'
    + '**Real impact (₹1 lakh × 20 saal × 12% base return):**\n'
    + '• Regular (1.5% extra cost): → ₹7.4 lakh\n'
    + '• Direct (0.1% cost): → ₹9.2 lakh\n'
    + '**Sirf fees ka fark = ₹1.8 lakh!**\n\n'
    + '**Direct Plan kahan milega?**\n'
    + '• Groww (Direct option select karo)\n'
    + '• Kuvera.in (by default Direct)\n'
    + '• AMC ki khud ki website (e.g., utimf.com)\n\n'
    + '💡 _Always Direct Plan lo — same fund, more returns!_',
    ['Index fund recommend karo', 'SIP kaise shuru karein?', 'Expense ratio kya hota hai?']
  );

  /* ── RISK & RETURNS ── */
  if (/risk kya|what is risk|risk vs return|kitna risk|risk explain/i.test(lo)) return hRiskVsReturn();
  if (/long.?term|bahut saal|10 20 30 saal|why long term|patience/i.test(lo)) return hLongTerm();
  if (/compounding kya|compound interest|paisa double|rule of 72|compound explain/i.test(lo)) return hCompounding();
  if (/market crash|crash mein kya|market girne|portfolio down|panic|loss ho gaya/i.test(lo)) return hMarketCrash();
  if (/diversif|sare ande|portfolio mix|asset allocation|kahan kahan invest/i.test(lo)) return hDiversification();

  /* ── SAVINGS & BASICS ── */
  if (/fd vs sip|fd vs mutual|fixed deposit vs|fd better hai ya|sip better hai ya fd/i.test(lo)) return hFDvsSIP();
  if (/gold|sona|sovereign gold|sgb|gold etf|gold mein invest/i.test(lo)) return hGold();
  if (/emergency fund|contingency fund|3 month kharcha|6 month savings/i.test(lo)) return hEmergencyFund();
  if (/kahan se shuru|where to start|beginner|first time invest|naya investor|shuruwat/i.test(lo)) return hBeginnerGuide();

  /* ── TAX ── */
  if (/tax|ltcg|stcg|capital gain|80c|section 80|elss tax|tax bachao/i.test(lo)) return hTax();

  /* ── GOALS ── */
  var goalKw = lo.match(/(iphone|phone|laptop|macbook|bike|scooter|trip|europe|goa|car|wedding|house|home|child|education)/);
  if (goalKw && /(lena|khareedna|ke liye|goal|plan|save|saving|invest|chahiye)/i.test(lo)) return hGoalInvest(goalKw[1]);

  /* ── SIP START ── */
  if (/sip (shuru|start|kaise|open)|kaise sip|how to start sip|sip account/i.test(lo)) return hSIPStart();

  /* ── HOW TO RESEARCH ── */
  if (/research kaise|stock research|kaise dhundo|how to pick stock|stock kaise chunein/i.test(lo)) return hHowToResearch();

  /* ── COMMON MISTAKES ── */
  if (/mistake|galti|kya avoid|kya nahi karna|common error|beginner mistakes/i.test(lo)) return hMistakes();

  /* ── SPECIFIC STOCK INFO (educational only) ── */
  var knownSyms = Object.keys(STOCK_INFO);
  var stockMatch = null;
  knownSyms.forEach(function(sym) {
    if (!stockMatch && (lo.includes(sym.toLowerCase()) || lo.includes(STOCK_INFO[sym].name.toLowerCase().split(' ')[0]))) {
      stockMatch = sym;
    }
  });
  if (stockMatch && /(ke baare|batao|kya hai|kaisi company|about|explain|info|detail|kya sochte)/i.test(lo)) return hStockInfo(stockMatch);

  /* ── UNSURE — honest fallback ── */
  var unsureWords = ['guaranteed', 'pakka', 'sure shot', 'confirm', '100%', 'definitely going up'];
  if (unsureWords.some(function(w){ return lo.includes(w); })) {
    return r(
      '**⚠️ "Guaranteed return" — Yeh possible nahi hai investing mein!**\n\n'
      + 'Agar koi kehta hai:\n'
      + '• "100% guaranteed 30% return"\n'
      + '• "Sure shot stock tip"\n'
      + '• "Pakka profit hoga"\n\n'
      + '**→ Yeh almost certainly fraud ya misleading information hai!**\n\n'
      + '**Sach yeh hai:**\n'
      + '• SEBI-registered advisors bhi guarantee nahi de sakte\n'
      + '• Market unpredictable hota hai — always!\n'
      + '• Historical returns future guarantee nahi hote\n\n'
      + 'Aap jo bhi investment kar raho ho — risk samajh ke karo. Main sahi direction mein guide kar sakti hoon, lekin koi guarantee nahi hoti!\n\n'
      + '💡 _Sabse safe investing: Index Fund SIP, long term, diversified portfolio._',
      ['Safe investing kya hoti hai?', 'Risk kya hota hai?', 'Scam se kaise bachein?']
    );
  }

  return hFallback(input);
}

/* ══════════════════════════════════════════════════════════
   CONTEXT HELPER
══════════════════════════════════════════════════════════ */
function getCtx() {
  if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
    var s = Auth.getSession();
    return { user: s.user };
  }
  return { user: null };
}

/* ══════════════════════════════════════════════════════════
   CHATBOT UI — Auto-injects floating widget on every page
══════════════════════════════════════════════════════════ */
(function () {
  /* CSS */
  var style = document.createElement('style');
  style.textContent = [
    '#rw-bubble{position:fixed;bottom:24px;right:24px;z-index:9000;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#14b8a6);box-shadow:0 4px 22px rgba(34,197,94,.5);display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;transition:transform .22s;}',
    '#rw-bubble:hover{transform:scale(1.1);}',
    '#rw-bubble svg{width:27px;height:27px;fill:#fff;}',
    '.rw-pip{position:absolute;top:-2px;right:-2px;width:20px;height:20px;background:#0ea5e9;border-radius:50%;border:2.5px solid #fff;font-size:.55rem;font-weight:800;color:#fff;display:flex;align-items:center;justify-content:center;font-family:sans-serif;}',
    '#rw-win{position:fixed;bottom:90px;right:24px;z-index:9001;width:380px;max-width:calc(100vw - 24px);background:#fff;border-radius:22px;box-shadow:0 12px 50px rgba(0,0,0,.2);display:flex;flex-direction:column;height:545px;max-height:calc(100vh - 120px);transition:transform .35s cubic-bezier(.34,1.56,.64,1),opacity .28s;transform-origin:bottom right;overflow:hidden;border:1px solid rgba(0,0,0,.08);}',
    '#rw-win.rw-closed{transform:scale(.6) translateY(20px);opacity:0;pointer-events:none;}',
    '[data-theme="dark"] #rw-win{background:#1e293b;border-color:#334155;}',
    /* header */
    '.rw-hd{background:linear-gradient(135deg,#22c55e,#14b8a6);padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;}',
    '.rw-hav{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}',
    '.rw-hn{font-weight:800;color:#fff;font-size:.95rem;font-family:"Plus Jakarta Sans",sans-serif;}',
    '.rw-hs{font-size:.68rem;color:rgba(255,255,255,.78);margin-top:1px;}',
    '.rw-hx{margin-left:auto;display:flex;gap:5px;}',
    '.rw-hbtn{background:rgba(255,255,255,.18);border:none;color:rgba(255,255,255,.85);padding:4px 9px;border-radius:7px;cursor:pointer;font-size:.65rem;font-weight:700;font-family:sans-serif;}',
    '.rw-hbtn:hover{background:rgba(255,255,255,.32);}',
    /* messages */
    '.rw-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth;}',
    '.rw-msgs::-webkit-scrollbar{width:3px;}',
    '.rw-msgs::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:99px;}',
    '.rw-msg{display:flex;gap:8px;animation:rwMIn .28s ease;max-width:100%;}',
    '.rw-msg.ru{flex-direction:row-reverse;}',
    '@keyframes rwMIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}',
    '.rw-av{width:30px;height:30px;border-radius:50%;flex-shrink:0;margin-top:2px;background:linear-gradient(135deg,#22c55e,#14b8a6);display:flex;align-items:center;justify-content:center;font-size:.88rem;}',
    '.rw-msg.ru .rw-av{background:linear-gradient(135deg,#6366f1,#8b5cf6);}',
    '.rw-bub{max-width:86%;padding:10px 13px;border-radius:16px;font-size:.83rem;line-height:1.65;word-break:break-word;}',
    '.rw-msg.bot .rw-bub{background:#f1f5f9;color:#0f172a;border-bottom-left-radius:4px;}',
    '.rw-msg.ru  .rw-bub{background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;border-bottom-right-radius:4px;}',
    '[data-theme="dark"] .rw-msg.bot .rw-bub{background:#334155;color:#e2e8f0;}',
    /* typing */
    '.rw-typ{display:flex;gap:4px;align-items:center;padding:10px 13px;}',
    '.rw-typ span{width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:rwtd .9s infinite;}',
    '.rw-typ span:nth-child(2){animation-delay:.2s;}.rw-typ span:nth-child(3){animation-delay:.4s;}',
    '@keyframes rwtd{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}',
    /* quick replies */
    '.rw-qa{display:flex;flex-wrap:wrap;gap:5px;padding:2px 12px 8px;}',
    '.rw-qb{background:#f0fdf4;border:1.5px solid #bbf7d0;color:#16a34a;font-size:.7rem;font-weight:600;padding:5px 11px;border-radius:999px;cursor:pointer;white-space:nowrap;transition:all .16s;}',
    '.rw-qb:hover{background:#dcfce7;border-color:#22c55e;transform:translateY(-1px);}',
    '[data-theme="dark"] .rw-qb{background:#14532d;border-color:#166534;color:#4ade80;}',
    /* input */
    '.rw-ia{padding:9px 12px;border-top:1px solid #f1f5f9;display:flex;gap:8px;flex-shrink:0;background:#fff;}',
    '[data-theme="dark"] .rw-ia{background:#1e293b;border-color:#334155;}',
    '.rw-inp{flex:1;border:1.5px solid #e2e8f0;border-radius:12px;padding:9px 12px;font-size:.83rem;outline:none;background:#f8fafc;color:#0f172a;resize:none;max-height:80px;}',
    '.rw-inp:focus{border-color:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.1);}',
    '[data-theme="dark"] .rw-inp{background:#0f172a;color:#e2e8f0;border-color:#334155;}',
    '.rw-sb{width:38px;height:38px;border-radius:11px;flex-shrink:0;background:linear-gradient(135deg,#22c55e,#16a34a);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;align-self:flex-end;box-shadow:0 2px 8px rgba(34,197,94,.4);}',
    '.rw-sb svg{width:18px;height:18px;fill:#fff;}',
    '.rw-sb:hover{transform:scale(1.08);}',
    '.rw-sb:disabled{opacity:.4;cursor:not-allowed;transform:none;}',
    '.rw-dis{font-size:.6rem;color:#94a3b8;text-align:center;padding:2px 12px 8px;flex-shrink:0;}',
    '@media(max-width:440px){#rw-win{width:calc(100vw - 16px);right:8px;bottom:78px;}}'
  ].join('');
  document.head.appendChild(style);

  var isOpen = false, isTyping = false, history = [];

  /* Build DOM */
  var bubble = document.createElement('button');
  bubble.id = 'rw-bubble'; bubble.title = 'Rupa — Finance Teacher';
  bubble.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg><div class="rw-pip">AI</div>';

  var win = document.createElement('div');
  win.id = 'rw-win'; win.className = 'rw-closed';
  win.innerHTML =
    '<div class="rw-hd">'
    + '<div class="rw-hav">👩‍🏫</div>'
    + '<div><div class="rw-hn">Rupa — Finance Teacher</div>'
    + '<div class="rw-hs">Simple • Beginner-friendly • Honest</div></div>'
    + '<div class="rw-hx"><button class="rw-hbtn" id="rw-clr">Clear</button><button class="rw-hbtn" id="rw-cls">✕</button></div>'
    + '</div>'
    + '<div class="rw-msgs" id="rw-msgs"></div>'
    + '<div id="rw-qa"></div>'
    + '<div class="rw-ia"><textarea class="rw-inp" id="rw-inp" rows="1" placeholder="Kuch bhi puchiye — koi sawal chota nahi hota!" maxlength="500"></textarea>'
    + '<button class="rw-sb" id="rw-sbtn"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>'
    + '</div>'
    + '<div class="rw-dis">📚 Educational only · Not SEBI-registered financial advice · Consult a CFP for personal decisions</div>';

  document.body.appendChild(bubble);
  document.body.appendChild(win);

  var inp   = win.querySelector('#rw-inp');
  var sbtn  = win.querySelector('#rw-sbtn');
  var msgs  = win.querySelector('#rw-msgs');
  var qa    = win.querySelector('#rw-qa');

  /* Toggle */
  function toggle() {
    isOpen = !isOpen;
    win.classList.toggle('rw-closed', !isOpen);
    if (isOpen && !history.length) {
      setTimeout(function () {
        bot({
          text: '**Namaste! 🙏 Main hoon Rupa — aapki finance teacher!**\n\n'
            + 'Main aapko samjhaungi:\n'
            + '• 📈 Stock market — bilkul basics se\n'
            + '• 🔄 SIP aur Mutual Funds — easy language mein\n'
            + '• ⚖️ Risk aur Return — kya expect karein\n'
            + '• 💡 Investing kahan se aur kaise shuru karein\n\n'
            + '**Koi bhi sawal "silly" nahi hota.** Freely puchiye! 😊\n\n'
            + '⚠️ _Main educational guide hoon — SEBI-registered advisor nahi. Bade decisions ke liye certified financial planner se milo._',
          quick: ['Stock market kya hota hai?', 'SIP kaise kaam karta hai?', 'Investing kahan se shuru karun?', 'Risk kya hota hai?']
        });
      }, 280);
    }
    if (isOpen) setTimeout(function () { inp.focus(); }, 340);
  }

  /* Clear */
  function clear() {
    history = []; msgs.innerHTML = ''; qa.innerHTML = '';
    setTimeout(function () {
      bot({ text: 'Naya shuruwat! 🧹 Kya poochna chahte ho?',
        quick: ['Stock market kya hai?', 'SIP explain karo', 'Investing kaise shuru karein?'] });
    }, 160);
  }

  /* Send */
  function send(txt) {
    var msg = (txt || inp.value).trim();
    if (!msg || isTyping) return;
    user(msg);
    if (!txt) { inp.value = ''; inp.style.height = 'auto'; }
    qa.innerHTML = '';
    isTyping = true; sbtn.disabled = true;
    var typEl = typing();
    var delay = 550 + Math.min(msg.length * 6, 1000);
    setTimeout(function () {
      typEl.remove(); isTyping = false; sbtn.disabled = false;
      bot(processMessage(msg));
    }, delay);
  }

  /* Render helpers */
  function user(text) {
    var el = make('rw-msg ru');
    el.innerHTML = '<div class="rw-av">😊</div><div class="rw-bub">' + esc(text) + '</div>';
    app(el); history.push({ role: 'user', text: text });
  }

  function bot(resp) {
    var el = make('rw-msg bot');
    el.innerHTML = '<div class="rw-av">👩‍🏫</div><div class="rw-bub">' + md(resp.text) + '</div>';
    app(el); history.push({ role: 'bot', text: resp.text });
    if (resp.quick && resp.quick.length) {
      qa.innerHTML = '';
      var wrap = document.createElement('div'); wrap.className = 'rw-qa';
      resp.quick.forEach(function (q) {
        var b = document.createElement('button'); b.className = 'rw-qb'; b.textContent = q;
        b.addEventListener('click', function () { send(q); });
        wrap.appendChild(b);
      });
      qa.appendChild(wrap);
    }
  }

  function typing() {
    var el = make('rw-msg bot');
    el.innerHTML = '<div class="rw-av">👩‍🏫</div><div class="rw-bub rw-typ"><span></span><span></span><span></span></div>';
    app(el); return el;
  }

  function make(cls) { var d = document.createElement('div'); d.className = cls; return d; }
  function app(el)   { msgs.appendChild(el); msgs.scrollTop = msgs.scrollHeight; }

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function md(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/`(.+?)`/g,'<code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;font-size:.8em;color:#0f172a">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" style="color:#22c55e;font-weight:600">$1</a>')
      .replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');
  }

  /* Events */
  bubble.addEventListener('click', toggle);
  win.querySelector('#rw-cls').addEventListener('click', toggle);
  win.querySelector('#rw-clr').addEventListener('click', clear);
  sbtn.addEventListener('click', function () { send(); });
  inp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  inp.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });

  window.rwToggle = toggle;
  window.rwClear  = clear;
  window.rwSend   = send;
})();
