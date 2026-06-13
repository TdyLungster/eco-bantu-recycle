# Bantu The People — E-Waste Recycling Platform

## Project Overview
South Africa's #1 certified e-waste recycling micro-SaaS. Businesses book free pickups, receive POPIA + NEMWA compliance certificates, and optionally upgrade to GreenCert Pro for lifetime compliance management.

**Live URL:** https://bantuthepeople.com  
**Contact:** bantuthepeople@gmail.com | 010 065 4785

## Tech Stack
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend:** Supabase (auth, database, edge functions)
- **Payments:** PayFast (ZAR) + PayPal (USD) — both via direct HTML form POST, no backend needed
- **Deploy:** Netlify auto-deploy from `main` branch
- **Dev branch:** `claude/micro-saas-research-prompt-6dw6gl`

## Payment Credentials (env vars preferred)
- PayFast Merchant ID: `25955793` (env: `VITE_PAYFAST_MERCHANT_ID`)
- PayFast Merchant Key: `4wr6pu7retlr1` (env: `VITE_PAYFAST_MERCHANT_KEY`)
- PayFast endpoint: `https://www.payfast.co.za/eng/process` (POST form)
- PayPal Merchant ID: `PNX85WE6TKWFU`

**Never use a Supabase Edge Function for PayFast.** Direct HTML form POST is the correct pattern — see `src/pages/ProLanding.tsx` `PayFastButton` component for reference.

## Key Pages
| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/pages/OptimizedIndex.tsx` | Homepage |
| `/pro` | `src/pages/ProLanding.tsx` | GreenCert Pro sales page |
| `/tools/pickup` | `src/pages/tools/Pickup.tsx` | Booking form |
| `/tools/value` | `src/pages/tools/Value.tsx` | Device value calculator |
| `/tools/impact` | `src/pages/tools/Impact.tsx` | Impact dashboard |
| `/dashboard` | `src/pages/Dashboard.tsx` | User account dashboard |
| `/pro/thank-you` | `src/pages/ProThankYou.tsx` | Post-payment confirmation |

## Key Components
- `src/components/hero/HeroContent.tsx` — B2B conversion hero with count-up stats
- `src/components/QuickBookingStrip.tsx` — Inline booking form → Supabase `leads` table
- `src/components/B2BTargeting.tsx` — Role-specific messaging (Compliance, IT, ESG, Finance)
- `src/components/PayFastPricingPlans.tsx` — Monthly subscription pricing (direct PayFast POST)
- `src/components/DarkNavigation.tsx` — Fixed top nav with contact bar
- `src/components/ui/auth-modal.tsx` — Google OAuth + email/password + forgot password

## Supabase Tables
- `leads` — columns: `email`, `source`, `company_name`, `city`, `device_count`, `created_at`
- `certificates` — filtered by `user_id` for dashboard display

## Design System
- **Colors:** `green-400/500` (brand), `gray-950/900/800` (backgrounds), `white` (text)
- **Dark theme throughout** — no light backgrounds, no shadcn default light classes
- **Avoid:** `from-slate-50`, `glass-card`, `eco-gradient`, `btn-eco`, `muted-foreground` — these are old Lovable template classes
- **Fonts:** Tailwind defaults (Inter-like)
- **Animations:** Framer Motion `whileInView` with `viewport={{ once: true }}`

## Compliance / Legal Copy
- **POPIA** = Protection of Personal Information Act (SA data privacy)
- **NEMWA** = National Environmental Management: Waste Act
- **DoD 5220.22-M** = US DoD data destruction standard (used for credibility)
- **eWASA** = e-Waste Association of South Africa (logo shown in nav)

## SEO
- Canonical: `https://bantuthepeople.com`
- All OG/social image URLs: `https://bantuthepeople.com/lovable-uploads/...`
- `public/sitemap.xml` auto-generated via `scripts/generate-sitemap.ts` at build time
- GA4 via `VITE_GA4_MEASUREMENT_ID` env var

## Common Tasks

### Add new page
1. Create `src/pages/MyPage.tsx`
2. Add lazy import + route in `src/App.tsx`
3. Add URL to `scripts/generate-sitemap.ts`

### Fix payment issues
Always use direct HTML form POST to PayFast. Never call Supabase functions for payment initiation.
For subscriptions add: `subscription_type=1`, `billing_date`, `recurring_amount`, `frequency=3` (monthly), `cycles=0`.

### Deploy
Push to `claude/micro-saas-research-prompt-6dw6gl` → open PR → merge to `main` → Netlify auto-deploys.
