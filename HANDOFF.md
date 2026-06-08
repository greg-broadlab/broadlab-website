# BroadLab Website — Full Handoff Document

## Quick reference: what's complete

| Page / Section | Status |
|---|---|
| `/system` — all 7 sections | ✅ Complete |
| `/work` — three full case studies | ✅ Complete |
| Homepage — OurWork section | ✅ Complete |
| Navbar — "Our Work" link | ✅ Complete |
| Homepage — Hero, WhyUnderperforms, Positioning, FinalCTA | ⚠️ Needs copy/messaging work |
| `/solutions` — exists, needs positioning overhaul | ⚠️ Needs work |
| `/about` — structure exists, content is placeholder | ⚠️ Needs content sign-off |
| `/contact` — UI only, no backend | ⚠️ Needs backend |
| Legal pages (`/privacy`, `/cookies`, `/legitimate-interest`) | ❌ Not built |

---

## Design rules — must be respected in every session

- **No dark-themed sections** — all backgrounds must be white `#ffffff` or light blue `#f0f8fb`
- **Brand colours**: `#0d2535` (navy), `#3aaece` (brand blue), `#f0f8fb` (light bg), `#4b5563` (body text), `#10657f` (mid blue for gradients)
- **Eyebrow labels**: `text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece]`
- **Section separator**: `<div className="h-px w-full" style={{ background: "#e5e7eb" }} />`
- **Font**: IBM Plex Sans (set in `src/app/layout.tsx`) — do not change
- **Animations**: Framer Motion, `useInView` with `{ once: true, margin: "-80px" }`, always fade + translate, never scale or rotate content
- **Buttons**: `.btn-primary` (filled navy) and `.btn-secondary` (outlined) from `globals.css`

## Terminology rules

- "Audience Graph" — not "ID Graph" or "identity graph"
- "AI/ML-driven optimisation" — not just "AI optimisation"
- "Outcome-based measurement" — not "performance measurement"
- "Compounding intelligence" — for the learning layer
- BroadLab is a **system / intelligence layer** — not a media agency, buying service, or programmatic vendor

---

## Homepage — section order

Current order in `src/app/page.tsx`:
```
Hero → OurWork → WhyUnderperforms → Positioning → FinalCTA
```

This order is reasonable. Hero establishes the brand, OurWork provides immediate proof, WhyUnderperforms frames the problem, Positioning introduces the system, FinalCTA converts.

---

## 1. Homepage — Hero

**File**: `src/components/sections/Hero.tsx`

**Current state:**
- Headline: `"The CTV system that builds brands and drives outcomes."`
- Sub: `"BroadLab helps marketers and their agencies turn CTV investment into measurable, compounding business growth."`
- CTAs: "Book a consultation" (primary) + "Explore the System" (secondary)
- Trust line: "Trusted by Lenovo, Lloyds Banking Group, Royal Caribbean, Heineken, DAZN and more."
- Right side: interactive floating logo dot animation (mouse repulsion effect)
- Opening animation: brand intro (logo particles fly in, screen wipes up)

**What needs to change:**

The headline is too generic. "Builds brands and drives outcomes" is what every media agency claims. The brief is clear: lead with the intelligence system angle, not media buying outcomes. The word "system" is already there but the surrounding copy doesn't reinforce it.

**Suggested headline direction:**
- `"The intelligence system that makes every CTV campaign smarter than the last."` — leads with the compounding angle
- `"CTV that compounds. A system, not a service."` — direct "system not service" framing
- `"The system behind outcome-driven CTV."` — cleaner, lets the sub do the heavy lifting

**Subheadline direction:**
Current sub is decent. Consider sharpening to something like: *"BroadLab is the intelligence layer that sits above fragmented CTV — unifying audience data, real-time measurement and AI-driven optimisation into one system that gets sharper with every campaign."*

**CTAs**: Fine as-is. "Book a consultation" + "Explore the System" are both correct.

**Trust line**: Fine as-is. Client names are confirmed.

**Do not touch**: the BrandIntro animation, the FloatingLogoDots component, the scroll chevron, the gradient orbs. These are all working and polished.

---

## 2. Homepage — WhyUnderperforms

**File**: `src/components/sections/WhyUnderperforms.tsx`

**Current state:**
- Section title: `"What's holding CTV back."`
- Three tilt/glow cards:
  1. "Too many platforms, no single view" — fragmented buying / no unified reporting
  2. "No one owns it properly" — falls between TV and digital teams
  3. "The wrong metrics" — measured on impressions/completions, not business outcomes

**What needs to change:**

The three cards are good and accurate. The section title is fine. The problem is the section ends with no bridge to BroadLab as the answer — it identifies the problem but doesn't set up the solution that follows in the Positioning section.

**Suggested additions:**
1. Add an eyebrow label: `"Why CTV underperforms"` — matches the brief language
2. After the three cards, add a short bridge paragraph below the grid — something like: *"These aren't technical problems. They're structural ones — and they require a system built to solve them."* This creates a natural transition to the Positioning section.

**Alternative**: Add a short statement below the cards that's visually distinct (e.g., a centered, slightly larger paragraph in `#4b5563`) rather than a new structural element.

**Do not change** the tilt/glow hover animation on the cards — it's polished and working.

---

## 3. Homepage — Positioning

**File**: `src/components/sections/Positioning.tsx`

**Current state:**
- Eyebrow: `"The BroadLab System"`
- Headline: `"One system. Four capabilities."`
- Sub: `"BroadLab is the intelligence layer that sits above fragmented CTV — unifying audience, measurement, optimisation and learning into one connected system."`
- Left sticky column with headline + CTAs; right column with 4 numbered capability rows
- Four capabilities: Audience Graph / Outcome Measurement / Optimisation Engine / Compounding Intelligence
- CTAs: "Explore the System" (→ /system) + "See our solutions" (→ /solutions)

**What needs to change:**

This section is largely correct. The "intelligence layer" language is right, the four capabilities are right. Minor improvements:

1. **Headline**: `"One system. Four capabilities."` is functional but not outcome-led. Consider: `"A system built to compound."` or keep as-is — it's clean.

2. **Capability descriptions**: Use the brief-aligned terminology precisely:
   - Audience Graph: already correct — "1.8M UK postcodes / 5,000+ attributes, privacy-safe via Snowflake"
   - Outcome Measurement: currently says "brand lift, search, conversion, footfall and sales — all tracked daily, in-flight" — this is correct
   - Optimisation Engine: currently says "AI and expert-led refinement across audience, creative, geography, supply and frequency" — use "AI/ML-driven" not just "AI"
   - Compounding Intelligence: currently correct — "every campaign feeds back into the system, making the next one stronger"

3. **Eyebrow**: "The BroadLab System" is fine. Could also use "A system, not a service."

**Do not change** the sticky left column + scroll-animated right column structure — it's the right layout for this content.

---

## 4. Homepage — FinalCTA

**File**: `src/components/sections/FinalCTA.tsx`

**Current state:**
- Three support models listed (Managed / Specialist support / Capability-building)
- Section headline: `"Flexible support, built around your model."`
- CTA headline: `"Grow more with CTV."`
- CTA sub: `"Book a call. We'll show you exactly what's possible."`
- Two CTAs: "Book a consultation" + "Explore the System"

**What needs to change:**

The brief said the CTA should be stronger and more specific — not just "book a call" but tied to what the user will get from that call. "Book a call. We'll show you exactly what's possible." is vague.

**Suggested CTA copy direction:**
- Headline: `"See what the system would look like for your brand."` — positions the call as a demo/briefing, not a sales call
- Sub: `"We'll map your audience, walk through a measurement framework, and show you what compounding intelligence looks like in practice."` — specific deliverables make the ask feel lower-risk
- CTA button: `"Book a system briefing"` rather than "Book a consultation" — more specific

**Support models**: These are fine and correct. Managed / Specialist support / Capability-building accurately reflects how BroadLab works.

**Background**: The `#f0f8fb` dot-grid background is correct. Do not change.

---

## 5. Solutions page

**File**: `src/components/sections/Solutions.tsx` (rendered by `src/app/solutions/page.tsx`)

**Current state:**
The page has three sections:
1. `SolutionsHero` — headline, four stat cards, floating dashboard panels, platform logo strip at bottom
2. `SolutionsDetail` — auto-advance tab/image panel for the four solutions (Inventory Access, Audience Targeting, Measurement, Optimisation)
3. `FinalCTA` — generic "Find out what CTV can do for your brand" CTA

**Issues to address:**

### 5a. Hero headline is too generic
Current: `"Our solutions for CTV that work."`
Sub: `"Built for brands who need CTV to do more than just reach people."`

These are both weak. The brief wanted this page to speak to specific audience types (CMOs, Heads of Media, agencies). Suggested direction:
- Headline: `"CTV built to deliver business outcomes."` or `"The system behind outcome-driven CTV."` (matches homepage)
- Sub: `"For CMOs, heads of media and agencies who need CTV to do more than just reach people — BroadLab turns the channel into a precision instrument."`

### 5b. Platform logo strip references missing image files
The `PLATFORMS` array in `Solutions.tsx` references `/logos/netflix.png`, `/logos/amazon-prime.png` etc. None of these files exist in `/public/logos/`. Either:
- Source the actual logos and add them to `/public/logos/`
- Remove the logo strip entirely until logos are available
- Replace with the text-only version: "19 million homes · Premium inventory only · No open exchange" (the fallback text already exists)

### 5c. SolutionsDetail images also reference missing files
Four images referenced: `/images/streaming.jpg`, `/images/audience-targeting.png`, `/images/optimise.jpg`, `/images/audience-build.jpg`. Only `/images/audience-targeting.png` exists (it was added in this project). The others will 404.

### 5d. Brief specified audience-type solutions
The brief mentioned content organised around who the buyer is (CMO, agency, Head of Media) or around specific use cases. The current structure (Inventory / Audience / Measurement / Optimisation) is capability-oriented, not use-case oriented. Consider whether to:
- Keep capability structure but add use-case context in the descriptions
- Add a second section that maps capabilities to buyer types
- Add a "Who we work with" section (CMOs / Agencies / Brand teams)

### 5e. Headline on overlay text
In `SolutionsDetail`, the overlay headline reads `{SOLUTIONS_DETAIL[active].name}` directly on top of a dark image — it renders as `#0d2535` (navy) which will be invisible against a dark image overlay. Change the overlay headline color to `white` or `#f0f8fb`.

**Priority order for Solutions**: Fix broken images first (they'll cause visible errors), then headline copy, then consider audience-type section.

---

## 6. About page

**File**: `src/components/sections/About.tsx` (rendered by `src/app/about/page.tsx`)

**Current state structure:**
1. `AboutHero` — dark full-screen hero with "The people behind the system." headline — **uses dark background (#071c2a) which violates design rules**
2. `CompanyStatement` — two-column layout with a quote + placeholder paragraph copy
3. `FeaturedBio` — three bios (Jakob Nielsen CEO, Matt Mee CSO, Kristian Claxton VP) — all placeholder text
4. `EmptyBioSlot` — two empty slot placeholders
5. `OfficeMosaic` — 4-cell mosaic grid with placeholder gradient backgrounds
6. `Recognition` — one confirmed Thinkbox shortlist + two placeholder award cards — **Recognition section uses `#0d2535` dark background**

**Issues to address:**

### 6a. Dark hero and Recognition section violate design rules
`AboutHero` uses `background: "#071c2a"` and `Recognition` uses `background: "#0d2535"`. Both are dark. Per design rules all backgrounds should be white or `#f0f8fb`. Either:
- Convert hero to white/light-blue with a large typographic treatment
- Or decide the About page is an exception and document it in CLAUDE.md

### 6b. All bio content is placeholder
`CompanyStatement` — both paragraphs are placeholder. Needs:
- Company origin story (why BroadLab was founded, what problem was being solved)
- Team background (data science + media + technology, what makes the methodology different)

`FeaturedBio` for Jakob, Matt, Kristian — all placeholder. **These need sign-off from each person before publishing** (noted in CLAUDE.md).

### 6c. Office photos are all placeholder
`OfficeMosaic` has four gradient placeholder cells. Real office/team photos needed before launch. File structure expected: `/images/about/office.jpg`, `/images/about/meeting.jpg`, `/images/about/team.jpg`, `/images/about/work.jpg`.

### 6d. Recognition section has two placeholder award cards
`AWARDS` array has one confirmed entry (Thinkbox 2025) and two placeholder entries. The placeholder entries are visible as faded cards. Either hide them (only show confirmed entries) or fill them with real data.

### 6e. Company narrative should reinforce positioning
The quote block — `"We built the system the industry should have built years ago."` — is strong and on-brand. Keep it. The surrounding copy needs to frame BroadLab as an intelligence system builder, not a media agency. Key points to hit:
- Founded because the CTV ecosystem was fragmented and measurement was broken
- Built a proprietary Audience Graph (1.8M postcodes, 5,000+ attributes) as the foundation
- Combined data science, media expertise and technology into one connected system
- Every campaign feeds the next — that's the compounding intelligence angle

---

## 7. Contact page

**File**: `src/components/sections/ContactPage.tsx`

**Current state**: Form renders correctly, submits nowhere. Pure UI.

**Decision needed — backend options:**
1. **Resend** — email API, requires a Next.js API route (`src/app/api/contact/route.ts`). Clean, no third-party form handling. Needs a Resend API key in `.env.local`.
2. **Formspree** — no backend needed, just change the form `action` attribute to a Formspree endpoint. Quickest to implement. Slight loss of control.
3. **Next.js API route + nodemailer/Resend** — full control, proper validation, can send confirmation emails to the user.

Recommended: Resend + Next.js API route. Formspree is fine for a quick launch.

The form currently has fields: Name, Company, Email, Message, a dropdown for "What best describes you?" (Brand / Agency / Other). These fields are correct and should be kept.

---

## 8. Legal pages

Not built. Needed before launch:
- `/privacy` — standard privacy policy
- `/cookies` — cookie usage policy  
- `/legitimate-interest` — legitimate interest assessment (BroadLab-specific, relates to data processing)

These can be built as simple static pages (`src/app/privacy/page.tsx` etc.) with `src/components/sections/LegalPage.tsx` as a shared layout component. Content needs to come from BroadLab's legal team.

---

## 9. ProofSection cleanup

**File**: `src/components/sections/ProofSection.tsx`

This file is no longer imported anywhere — it was replaced by `SystemCTA` on the `/system` page. Safe to delete. Run a search for `ProofSection` imports before deleting to confirm nothing references it.

---

## 10. Content sign-off checklist (from CLAUDE.md)

These must not go live without BroadLab approval:
- [ ] Stats in `OurWork.tsx` (£3 ROAS, 22% awareness, 10,000+ subscriptions)
- [ ] Stats in `Solutions.tsx` (1.8M postcodes, 19M homes — confirm exact figures)
- [ ] Client names in Hero trust line (Lenovo, Lloyds, Royal Caribbean, Heineken, DAZN)
- [ ] Platform/publisher logos in Solutions hero (not yet sourced)
- [ ] Team bios in `About.tsx` — requires sign-off from Jakob, Matt and Kristian individually
- [ ] Company statement in `About.tsx` — requires approval from leadership
- [ ] Dashboard data in `/system` page (all illustrative — clearly labelled)
- [ ] Contact form backend (currently submits nowhere)
- [ ] Award entries in Recognition section — only Thinkbox 2025 is confirmed

---

## 11. Known working things — do not break

These are tested, polished and working. Don't touch them unless there's a specific reason:

- `BrandIntro` animation in `Hero.tsx` — the particle fly-in + screen wipe
- `FloatingLogoDots` + mouse repulsion in `Hero.tsx`
- `AudienceGraphSection` — scrolling data table (uses `useRef` scroll + `overflow-auto`)
- `MeasurementSection` — animated bar chart (height animation from 0)
- `OptimisationSection` — six tabs with `AnimatePresence mode="wait"` + bar animations
- `LearningSection` — four-node diamond loop with flowing dashes (no centre node)
- `OurWork` — tilt/glow stat cards
- `HowWeWork` — four step cards + CSS arc with animated vertical chain
- `/work` page — three full case studies (Lloyds, Lenovo, DAZN) — complete

---

## File map — key paths

```
src/app/
  page.tsx                          ← Homepage
  system/page.tsx                   ← /system (all 7 sections complete)
  work/page.tsx                     ← /work (3 case studies complete)
  solutions/page.tsx                ← /solutions (needs work)
  about/page.tsx                    ← /about (needs content sign-off)
  contact/page.tsx                  ← /contact (needs backend)

src/components/sections/
  Hero.tsx                          ← Homepage hero
  OurWork.tsx                       ← Proof stat cards (homepage)
  WhyUnderperforms.tsx              ← Problem framing (homepage)
  Positioning.tsx                   ← Four capabilities (homepage)
  FinalCTA.tsx                      ← Support models + CTA (homepage)
  Solutions.tsx                     ← Full solutions page
  About.tsx                         ← Full about page
  SystemHero.tsx                    ← /system hero
  HowWeWork.tsx                     ← /system step 2
  AudienceGraphSection.tsx          ← /system step 1
  MeasurementSection.tsx            ← /system step 2
  OptimisationSection.tsx           ← /system step 3
  LearningSection.tsx               ← /system step 4
  SystemCTA.tsx                     ← /system closing CTA
  ContactPage.tsx                   ← Contact form (UI only)

src/components/layout/
  Navbar.tsx                        ← Fixed nav (Home, System, Our Work, Solutions, About, Contact)
  Footer.tsx                        ← Logo, links, address, LinkedIn
```
