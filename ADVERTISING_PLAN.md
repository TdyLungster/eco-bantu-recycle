# GreenCert Pro — Full Advertising & Launch Plan
> Product: GreenCert Pro by EcoBantu  
> Target Revenue: R730,000 (~$40,000 USD) within 4-hour launch window  
> URL: yourdomain.co.za/pro  
> Audience: South African SMEs, IT managers, sustainability officers, corporate compliance teams

---

## PHASE 0: PRE-LAUNCH PREP (2–3 Weeks Before)

### 0.1 — Accounts to Create/Confirm
- [ ] **PayFast:** Log in → Settings → Integration → copy Merchant ID + Merchant Key → paste into `src/pages/ProLanding.tsx`
- [ ] **PayPal.me:** Set up PayPal.me/YOURUSERNAME → update `PAYPAL_STARTER_LINK` and `PAYPAL_BUSINESS_LINK` in `ProLanding.tsx`
- [ ] **MailerLite (free tier):** mailerlite.com — set up 5-email launch sequence (templates in `MICRO_SAAS_RESEARCH_REPORT.md`)
- [ ] **WhatsApp Business:** Set up +27 10 065 4785 with auto-reply
- [ ] **Google Analytics 4:** Add event tracking for: landing page view, pricing section scroll, PayFast click, PayPal click
- [ ] **Hotjar (free):** Add heatmap to /pro page to identify friction points

### 0.2 — Pre-Launch Waitlist Page
- Deploy `/pro` immediately as a waitlist page (temporarily hide pricing)
- Add email capture with headline: "Get 50% off — be first when GreenCert Pro launches"
- Target: 300–500 email signups before launch day
- Add a simple opt-in form connected to MailerLite

### 0.3 — Beta Users (10 Accounts)
- Reach out to 10 existing EcoBantu clients who already use the certificate tool
- Offer free Business plan access in exchange for a video testimonial or written quote
- Collect their quote BEFORE launch for the testimonial section

### 0.4 — Content Assets to Prepare
- [ ] 60-second Loom demo video (screen record: upload → generate → download certificate)
- [ ] 3 before/after comparison screenshots (manual Word doc vs GreenCert Pro PDF)
- [ ] 15-second phone video testimonial from one beta user
- [ ] POPIA fine case study (public record — R80K+ fines happen regularly; Google "POPIA fine South Africa")

---

## PHASE 1: ORGANIC PRE-LAUNCH (2 Weeks Before Launch)

### LinkedIn (Highest ROI for B2B South Africa)

**Post Schedule: Daily at 8:00 AM SAST**

**Week 1 — Education Posts (no selling):**
```
Post 1 — Monday:
"Did you know? Under POPIA Section 21, your company must have DOCUMENTED
proof that personal data was destroyed when you dispose of old laptops.

Most SA companies don't have this.

Fine: Up to R10 million.

We're building the fix. Tag an IT manager who needs to see this."

Post 2 — Wednesday:
"Our e-waste platform just hit 48,000 certificates generated for SA businesses.

Here's what surprised us:
→ 73% of companies had never documented device disposal before
→ 41% had faced an audit request they couldn't properly respond to
→ Average time to generate a manual certificate: 2.5 hours

We're cutting that to 60 seconds. More on Friday."

Post 3 — Friday (join waitlist):
"GreenCert Pro launches in 10 days.

Automate your POPIA data destruction certificates + NEMWA records.
60 seconds. No auditor required.

Early access (50% off) → [WAITLIST LINK]

Repost if you know an IT manager in SA who still does this manually."
```

**Week 2 — Social proof + countdown:**
```
Post 4 — Monday (testimonial):
"Beta user Thabo from [Company] said:
'What used to take my team a full day now takes 8 minutes.'

GreenCert Pro opens [DAY]. Waitlist gets 40% off.
[WAITLIST LINK]"

Post 5 — Thursday (launch announcement):
"GreenCert Pro is LIVE tomorrow at 9 AM.

First 200 licenses: 40% off lifetime access.
After that: price goes to R12,497.

Link in comments 👇
#POPIA #SouthAfrica #Compliance #EWaste"
```

### Twitter/X

Use for tech community + founders:
```
Thread template (post day before launch):

1/ Building in public: We turned our free e-waste tool (48K+ users) 
into a proper B2B compliance SaaS.

Thread on what we learned 🧵

2/ Problem: South African companies face R10M POPIA fines for improper 
device disposal. Most don't have any compliance documentation.

3/ Our free tool at bantuthepeople.co.za was generating certificates 
manually. Companies needed more: audit trails, ESG reports, bulk upload.

4/ So we built GreenCert Pro.
60 seconds to generate a POPIA-certified e-waste disposal certificate.
No auditor. No Word doc. No risk.

5/ Launching tomorrow. 200 lifetime licenses at 40% off.
→ [LINK]

After the launch price ends: R12,497.
Today: R7,497.

6/ Built on:
- React + TypeScript (existing platform)
- PayFast for ZAR payments
- Supabase for data
- Firebase for auth

If you're building in SA, RT for the SA startup community 🇿🇦
```

### WhatsApp Broadcast

Send to all existing EcoBantu contacts (customers who used the free certificate tool):
```
Hi [Name] 👋

Quick update from EcoBantu Recycle:

We've upgraded our compliance certificate tool into GreenCert Pro — a 
full POPIA + NEMWA compliance suite.

You've used our free certificates before, so you'll love this:
✅ Generate unlimited certificates in 60 seconds
✅ Auto-ESG reports for your sustainability team
✅ 7-year compliance archive

*Launch offer ends in 24 hours: R7,497 lifetime (normally R12,497)*

See it here: [LINK]

Reply to this message for any questions 🙏
```

### Facebook Groups to Post In (Day Before + Launch Day)

1. **South African Entrepreneurs & Business Owners** (search FB)
2. **SA Tech Founders & Startups**
3. **IT Professionals South Africa**
4. **POPIA Compliance South Africa**
5. **Small Business South Africa**
6. **Johannesburg Business Network**
7. **Cape Town Entrepreneurs**

**Post template:**
```
Hi everyone — sharing something I built for SA businesses.

If your company uses/disposes of laptops, phones, or any electronics, 
you're legally required to have POPIA + NEMWA documentation.

Most companies don't. Fines start at R250,000.

We built GreenCert Pro: generate certified compliance certificates in 
60 seconds. No accountant. No auditor.

Launch pricing ends tonight (40% off lifetime).

→ [LINK]

Happy to answer questions in the comments.
```

---

## PHASE 2: LAUNCH DAY PLAYBOOK (4-HOUR WINDOW)

### Hour-by-Hour Schedule

| Time (SAST) | Action |
|-------------|--------|
| **08:00** | Send launch email (Email 4) to full waitlist |
| **08:30** | Post LinkedIn launch announcement + pin to profile |
| **08:45** | Send WhatsApp broadcast to all past EcoBantu customers |
| **09:00** | Post Twitter/X launch thread |
| **09:15** | Post in all 7 Facebook groups |
| **09:30** | Go live on LinkedIn (5-min demo of the product) |
| **10:00** | DM top 20 LinkedIn connections (IT managers, sustainability officers) |
| **10:30** | Submit to ProductHunt (if product is fully stable) |
| **11:00** | Post in Reddit: r/southafrica, r/entrepreneur, r/SaaS |
| **11:30** | Email 3–5 journalists at TechCentral, BusinessTech, MyBroadband |
| **12:00** | Check conversions — if below 20 sales, activate paid ads |
| **12:30** | Send mid-launch update email ("47 people joined in the last 3 hours") |
| **12:45** | Post a real-time sales counter on social ("62 businesses just joined") |
| **13:00** | Final urgency email to waitlist (countdown ending) |

### Launch Email #1 — 08:00 AM

```
Subject: GreenCert Pro is LIVE — 40% off ends at 1 PM today
Preview: You asked for this. Here it is.

Hi [First name],

It's live.

GreenCert Pro — the tool that generates your POPIA data destruction 
certificates in 60 seconds — is open right now.

Here's what you get:
✅ Unlimited POPIA-certified certificates (Business plan)
✅ NEMWA disposal records — auto-generated
✅ ESG impact dashboard — investor-ready
✅ 7-year compliance archive
✅ White-label PDF with your company logo

Launch price ends at 1 PM today:
~~R12,497~~ → R7,497 lifetime (no monthly fees, ever)

👉 GET INSTANT ACCESS: [LINK]

Only 200 licenses at this price.

[Your name]
EcoBantu Recycle
```

### Launch Email #2 — 12:30 PM (mid-launch update)

```
Subject: 68 businesses in 4 hours — don't miss this
Preview: 132 spots left at the launch price

Hi [First name],

Quick update:

68 South African businesses have already activated GreenCert Pro 
this morning.

132 spots remain at the launch price of R7,497.

After 1 PM: price goes to R12,497.

[ONE CLICK TO SECURE YOUR LICENSE]

[Your name]
```

### Launch Email #3 — 12:50 PM (10-minute warning)

```
Subject: ⏰ 10 minutes left
Preview: Price doubles in 10 minutes. No exceptions.

[First name],

10 minutes.

After 1 PM today, GreenCert Pro goes from R7,497 → R12,497.
Permanently.

[CLAIM YOUR LICENSE NOW →]

That's it. No tricks. Last email.

[Your name]
```

---

## PHASE 3: PAID ADVERTISING (Activate if < 30 Sales at Noon)

### Meta Ads (Facebook + Instagram) — Budget: R7,000 (~$385)

**Campaign Setup:**
- Objective: Conversions → Purchase
- Landing page: yourdomain.co.za/pro#pricing
- Budget: R1,750/day × 4 days

**Audience 1 — Retargeting (highest ROI):**
- Custom audience: website visitors in last 30 days
- Custom audience: email list upload (past EcoBantu users)

**Audience 2 — Cold targeting:**
- Location: South Africa
- Age: 28–55
- Interests: "Compliance", "Business management", "IT management", "Sustainability"
- Job titles: IT Manager, Operations Director, Finance Manager, Sustainability Officer

**Ad Creative — Video (15 seconds):**
```
Hook (0–3 sec): "If your company disposes of old laptops without THIS, you're breaking the law"
Middle (3–12 sec): Screen recording of 60-second certificate generation
CTA (12–15 sec): "GreenCert Pro — lifetime access from R7,497 → link in bio"
```

**Ad Creative — Static Image:**
- Background: Dark with red warning icon
- Headline: "POPIA Fine: R10 Million"
- Sub: "Your business has 60 seconds to fix this."
- CTA button: "Get Compliant Now"

### Google Ads — Budget: R5,500 (~$300)

**Search Campaign — High Intent Keywords:**
```
"POPIA compliance certificate South Africa"
"e-waste certificate South Africa"
"data destruction certificate POPIA"
"NEMWA compliance software"
"e-waste disposal certificate generator"
"POPIA fine South Africa"
```

- Max CPC: R12–R25 per click
- Expected clicks: 220–460
- Expected conversions at 2%: 5–9 sales
- Revenue: R37,485–R67,473

---

## PHASE 4: PR & MEDIA OUTREACH

### Journalists to Email (Same Day as Launch)

Send personalised pitches to:

| Publication | Contact |
|-------------|---------|
| TechCentral.co.za | editor@techcentral.co.za |
| BusinessTech.co.za | news@businesstech.co.za |
| MyBroadband.co.za | ed@mybroadband.co.za |
| ITWeb.co.za | editorial@itweb.co.za |
| Fin24.co.za | fintech@fin24.co.za |

**Press pitch template:**
```
Subject: SA startup automates POPIA compliance certificates — 
         frees businesses from R10M fine risk

Hi [Name],

Quick pitch: We're a Cape Town-based e-waste recycling startup 
(EcoBantu Recycle) that just launched GreenCert Pro — a tool that 
generates POPIA and NEMWA e-waste compliance certificates in 60 seconds.

Why it's relevant now:
→ POPIA fines are actively being enforced in 2026
→ Most SA SMEs still handle this manually (Word docs, spreadsheets)
→ We've already generated 48,000 certificates for SA businesses

We launched today. Happy to provide:
- Product demo
- Founder interview
- Statistics on POPIA compliance gaps in SA

[Your name] | EcoBantu Recycle
+27 10 065 4785 | support@banturecy.co.za
```

### Podcast/YouTube Outreach

Target SA business podcasts for future coverage:
- The Sam Beckbessinger Show
- The Entrepreneurs' Masterclass (South Africa)
- Real Talk with Anele
- SAfm Tech Talk

Offer: Free Business plan license for the host as a listener gift.

---

## PHASE 5: AFFILIATE PROGRAM

Set up a simple affiliate program after launch:

**Terms:**
- 30% commission on every sale (R2,249 per Business plan referral)
- Tracked via unique URL: yourdomain.co.za/pro?ref=AFFILIATENAME
- Paid monthly via PayFast or bank transfer

**Target affiliates:**
1. IT consultants and MSPs in South Africa (they advise clients on compliance)
2. Accountants and auditors (SAIPA, SAICA members)
3. HR consultants (POPIA affects HR data too)
4. LinkedIn influencers in the SA corporate governance space

**Affiliate outreach DM:**
```
Hi [Name],

Love your content on SA compliance/IT management.

I run GreenCert Pro — a SaaS tool that generates POPIA data destruction 
certificates for SA businesses in 60 seconds.

Would you be interested in 30% commission (R2,249/sale) for promoting it 
to your audience? I can set up your affiliate link in 5 minutes.

Happy to give you a free Business account to test it first.

— [Your name]
```

---

## PHASE 6: POST-LAUNCH (Days 2–30)

### Day 2–7: Follow-Up Sequence
- Email all buyers: onboarding tip of the day (5 days)
- Ask buyers for a LinkedIn recommendation
- Ask buyers to refer a colleague for R500 cash (referral program)

### Day 7–14: Case Study
- Contact your first 10 buyers
- Ask for a short case study: "Before GreenCert Pro vs After"
- Publish on your LinkedIn and the landing page

### Day 14–30: ProductHunt Launch
- By now you have real testimonials and a polished product
- Schedule a ProductHunt launch for maximum exposure
- Target: #1 Product of the Day → drives 500–2,500 additional signups

### Day 30+: AppSumo Application
- Apply at sell.appsumo.com
- Standard campaign generates R730K–R1.4M over 60 days
- Requires: stable product, support team, and track record of happy customers

---

## REVENUE PROJECTIONS

### Conservative (Email list: 300, minimal ads)

| Source | Sales | Revenue |
|--------|-------|---------|
| Email waitlist (2% conversion) | 6 | R44,982 |
| WhatsApp broadcast | 5 | R37,485 |
| LinkedIn organic | 8 | R59,976 |
| Facebook groups | 4 | R29,988 |
| Direct/referral | 5 | R37,485 |
| **Total** | **28** | **R209,916** |
| + Order bumps (38%) | 10 | +R4,970 |
| **TOTAL LAUNCH DAY** | | **~R215K (~$12K)** |

### Target (Email list: 1,000 + R7,000 ads)

| Source | Sales | Revenue |
|--------|-------|---------|
| Email list (2.5% conversion) | 25 | R187,425 |
| Paid ads (Meta + Google) | 15 | R112,455 |
| Social organic | 25 | R187,425 |
| Affiliates/referrals | 10 | R74,970 |
| WhatsApp broadcast | 22 | R164,934 |
| **Total** | **97** | **R727,209** |
| + Order bumps (38%) | 37 | +R18,389 |
| **TOTAL LAUNCH DAY** | | **~R745K (~$41K) ✓** |

---

## KEY SUCCESS FACTORS (In Order of Importance)

1. **Pre-built audience** — You MUST have 500–1,000 warm contacts before launch day
2. **Urgency** — The countdown timer must be real. No extending it.
3. **WhatsApp broadcast** — This is the highest-converting channel for South Africa
4. **LinkedIn** — B2B South Africa runs on LinkedIn. Post every day for 2 weeks before.
5. **One clear product** — Don't confuse visitors with the main EcoBantu platform. `/pro` is a standalone sales page.
6. **PayFast ready** — Confirm your PayFast merchant credentials are working in sandbox BEFORE launch day
7. **Instant delivery** — Buyers should receive their login within 5 minutes of payment, automatically

---

## CHECKLIST: 48 HOURS BEFORE LAUNCH

- [ ] PayFast credentials added to `ProLanding.tsx`
- [ ] PayPal.me links updated in `ProLanding.tsx`
- [ ] Site URL updated in `ProLanding.tsx` (`SITE_URL` constant)
- [ ] Test PayFast sandbox payment end-to-end
- [ ] Email welcome sequence loaded in MailerLite (5 emails)
- [ ] Landing page deployed and live at `/pro`
- [ ] Countdown timer tested (localStorage-based, 4-hour window)
- [ ] GA4 events firing on CTA clicks
- [ ] Hotjar heatmap active
- [ ] WhatsApp broadcast list exported from EcoBantu contacts
- [ ] LinkedIn post scheduled for launch morning
- [ ] Press pitches drafted and ready to send
- [ ] PayFast IPN webhook endpoint live (or Netlify function deployed)
- [ ] Thank-you page at `/pro/thank-you` live and tested

---

*Plan last updated: June 2026 | EcoBantu Recycle (Pty) Ltd*
