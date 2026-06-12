# EcoBantu Recycle — E-Waste Platform + GreenCert Pro SaaS

> South Africa's leading e-waste recycling and compliance platform.  
> **Live product:** [bantuthepeople.com](https://bantuthepeople.com) · **GreenCert Pro:** `/pro`

---

## What Is This?

Two products in one repository:

| Product | Description | Route |
|---------|-------------|-------|
| **Bantu The People** | Free e-waste recycling tools for individuals and businesses | `/` |
| **GreenCert Pro** | B2B micro SaaS — POPIA + NEMWA compliance certificates in 60 seconds | `/pro` |

---

## GreenCert Pro — Micro SaaS

**The Problem:** South African businesses face fines up to **R10 million** under POPIA and NEMWA for improper electronic device disposal. Most companies still manage compliance manually — Word docs, spreadsheets, and missed audits.

**The Solution:** GreenCert Pro generates legally-valid, audit-ready e-waste compliance certificates in 60 seconds. No auditor. No paperwork. No risk.

### Pricing

| Plan | Price | Description |
|------|-------|-------------|
| Starter | ~~R4,997~~ → **R2,997** lifetime | 50 certificates/year, basic ESG report |
| Business | ~~R12,497~~ → **R7,497** lifetime | Unlimited + ESG dashboard + API + white-label |
| Enterprise | Custom | 500+ devices, dedicated support, SLA |

**Revenue target:** 97 Business plan sales = R727,209 (~$40,000 USD)

### Key Features
- POPIA Section 21 — data destruction certificates (PDF)
- NEMWA Act 59 of 2008 — disposal records
- ESG impact dashboard (investor-ready)
- 7-year compliance archive (SARS requirement)
- White-label PDF with company logo
- Bulk CSV upload (100+ devices at once)
- API access for ERP/HR integration

### Payment Integration
- **PayFast** (ZAR, South African customers) — Merchant ID: `25955793`
- **PayPal** (USD, international customers) — update `PAYPAL_*_LINK` in `ProLanding.tsx`

---

## Tech Stack

### Frontend
- **React 18** + TypeScript + Vite
- **Tailwind CSS** + shadcn/ui + Framer Motion
- React Router v6 (lazy-loaded routes)
- React Query for data fetching

### Backend
- **Firebase Functions** + Express.js
- **MongoDB Atlas** for orders/blog/directory
- **Supabase** for real-time data + edge functions
- **Firebase Auth** (Google sign-in)

### Payments
- **PayFast** — ZAR subscriptions and one-time payments
- **PayPal** — international customers

### Monitoring
- Sentry (error tracking)
- Honeybadger (error monitoring)
- Google Analytics 4

---

## Project Structure

```
eco-bantu-recycle/
├── src/
│   ├── pages/
│   │   ├── OptimizedIndex.tsx     ← Main platform homepage
│   │   ├── ProLanding.tsx         ← GreenCert Pro sales page (/pro)
│   │   ├── ProThankYou.tsx        ← Post-purchase confirmation (/pro/thank-you)
│   │   ├── Blog.tsx
│   │   ├── Directory.tsx
│   │   ├── Tools.tsx
│   │   └── tools/
│   │       ├── Certificate.tsx    ← Free certificate generator
│   │       ├── Pickup.tsx
│   │       ├── Quote.tsx
│   │       ├── Value.tsx
│   │       ├── Impact.tsx
│   │       └── Locations.tsx
│   ├── components/
│   │   ├── landing/
│   │   │   └── CountdownTimer.tsx ← Launch urgency timer (4-hour window)
│   │   ├── PayFastPricingPlans.tsx
│   │   └── ui/                    ← shadcn/ui components
│   └── App.tsx                    ← Routes + providers
├── functions/                     ← Firebase Functions (backend)
├── MICRO_SAAS_RESEARCH_REPORT.md  ← Full market research
├── ADVERTISING_PLAN.md            ← Step-by-step launch playbook
└── README.md                      ← This file
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### Frontend Setup

```bash
git clone https://github.com/TdyLungster/eco-bantu-recycle.git
cd eco-bantu-recycle
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables (`.env.local`)

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcd1234

# API
VITE_API_BASE=https://us-central1-your_project.cloudfunctions.net/api

# Analytics
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key

# Site URL (used in PayFast return/cancel URLs)
VITE_SITE_URL=https://yourdomain.co.za
```

### Backend Setup (Firebase Functions)

```bash
cd functions
npm install
npm run serve          # local dev
npm run deploy         # production
```

---

## Deployment

### Netlify (Recommended)

```bash
npm run build
# Connect GitHub repo to Netlify for automatic deploys on push
```

Set environment variables in Netlify: **Site Settings → Environment Variables**

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

---

## PayFast Integration

PayFast credentials are set in `src/pages/ProLanding.tsx`:

```typescript
const PAYFAST_MERCHANT_ID = '25955793';      // Survivalhackmaster account
const PAYFAST_MERCHANT_KEY = '4wr6pu7retlr1';
```

**For production security**, move these to environment variables:
```env
VITE_PAYFAST_MERCHANT_ID=25955793
VITE_PAYFAST_MERCHANT_KEY=4wr6pu7retlr1
```

**IPN (payment notification) endpoint:** `https://yourdomain.co.za/api/payfast-ipn`  
Configure this URL in your PayFast dashboard under Settings → ITN.

**Test in sandbox first:**
- Sandbox URL: `https://sandbox.payfast.co.za/eng/process`
- Test card: `4000000000000002` | Any future date | CVV: `123`
- Switch to live URL before launch: `https://www.payfast.co.za/eng/process`

---

## Launch Resources

| File | Contents |
|------|----------|
| [`MICRO_SAAS_RESEARCH_REPORT.md`](./MICRO_SAAS_RESEARCH_REPORT.md) | Full market research, pricing math, email templates, funnel design |
| [`ADVERTISING_PLAN.md`](./ADVERTISING_PLAN.md) | Hour-by-hour launch playbook, ad copy, social media templates, PR outreach |

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `OptimizedIndex` | Main EcoBantu platform homepage |
| `/pro` | `ProLanding` | **GreenCert Pro sales page** |
| `/pro/thank-you` | `ProThankYou` | Post-purchase confirmation |
| `/blog` | `Blog` | Company blog |
| `/directory` | `Directory` | Recycler directory |
| `/tools` | `Tools` | Tools overview |
| `/tools/certificate` | `Certificate` | Free e-waste certificate (lead magnet) |
| `/tools/pickup` | `Pickup` | Schedule pickup |
| `/tools/quote` | `Quote` | Get a quote |
| `/tools/value` | `Value` | Device value estimator |
| `/tools/impact` | `Impact` | Environmental impact calculator |
| `/tools/locations` | `Locations` | Find recycling centres |

---

## Security

- Input validation: Zod schemas on all forms
- Auth: Firebase Auth with secure JWT tokens
- Rate limiting: Express rate limiting on all API endpoints
- Data sanitisation: All inputs cleaned before DB storage
- HTTPS only: All production traffic enforced over HTTPS
- PayFast: Signature-verified IPN to prevent fraudulent webhooks

---

## Roadmap

### Phase 1 — Live Now ✅
- Free e-waste tools (certificate, pickup, quote, value, impact, locations)
- Firebase auth + Firestore
- PayFast payment processing
- Admin dashboard

### Phase 2 — GreenCert Pro Launch 🚀
- [x] GreenCert Pro sales landing page (`/pro`)
- [x] PayFast + PayPal dual checkout
- [x] 4-hour countdown timer
- [x] Post-purchase thank-you page
- [ ] MailerLite onboarding sequence (5 emails)
- [ ] PayFast IPN webhook for auto-delivery
- [ ] Affiliate tracking (`?ref=` parameter)

### Phase 3 — Growth
- [ ] AppSumo listing (target: R730K–R1.4M in 60 days)
- [ ] ProductHunt launch
- [ ] Mobile app (React Native)
- [ ] Multi-language support (isiZulu, Afrikaans, Sotho)

### Phase 4 — Platform
- [ ] AI-powered waste classification
- [ ] Carbon credit marketplace
- [ ] IoT device integration
- [ ] B2B portal with ERP integrations

---

## Support

- **Email:** support@banturecy.co.za
- **WhatsApp:** +27 10 065 4785
- **Enterprise:** enterprise@banturecy.co.za

---

*Built with 💚 for a sustainable and compliant South Africa*  
*EcoBantu Recycle (Pty) Ltd — Registered NEMWA recycler — POPIA compliant*
