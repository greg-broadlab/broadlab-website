# BroadLab Website Rebuild

## What This Is

This is a full rebuild of the BroadLab website (currently live at broadlab.tv). The goal is to create a modern, polished marketing site that clearly communicates what BroadLab does and looks like a credible AdTech company. The content and brand kit are still being aligned with BroadLab — some numbers, copy, and client logos are currently placeholders.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework — handles routing, server rendering, and images |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS v4** | Utility-based styling |
| **Framer Motion** | Animation library (installed, available for use) |
| **IBM Plex Sans** | Brand font (loaded from Google Fonts) |

To run locally:
```
npm install
npm run dev
```
Then open http://localhost:3000

---

## What BroadLab Does

BroadLab is an Addressable TV advertising platform. In plain English:
- Addressable TV means TV ads that are targeted to specific households rather than broadcast to everyone
- BroadLab connects brands/agencies to 18M+ UK households across 60+ broadcaster and streaming partners (Sky, ITV, Channel 4, etc.)
- Their platform handles the full campaign lifecycle: Plan → Target → Activate → Measure
- Clients are media agencies and direct advertisers

---

## Site Structure

### Pages

| Route | File | What's on it |
|---|---|---|
| `/` | `src/app/page.tsx` | Home page — Hero, ValueProp, Insights, Clients, Contact |
| `/platform` | `src/app/platform/page.tsx` | Dedicated Platform page |
| `/services` | `src/app/services/page.tsx` | Dedicated Services page |
| `/team` | `src/app/team/page.tsx` | Dedicated Team page |

### Shared Layout

- **Navbar** (`src/components/layout/Navbar.tsx`) — Fixed top bar with logo, nav links, and "Get in Touch" CTA. Highlights active section as user scrolls.
- **Footer** (`src/components/layout/Footer.tsx`) — Logo, nav links, office address (London), LinkedIn link, copyright, and legal links (Privacy Policy, Cookie Policy, Legitimate Interest).

---

## Sections / Components

### Hero (`src/components/sections/Hero.tsx`)
- Full-screen section with a looping background video (`/videos/background-video.webm`)
- Parallax scroll effect on the video
- Headline: *"Powering the Next Generation of Outcome-Driven Addressable TV"*
- Two CTAs: "Explore the Platform" and "Our Services"

### ValueProp (`src/components/sections/ValueProp.tsx`)
- Headline: *"We simplify the complex world of Addressable TV"*
- Four animated stats with count-up effect:
  - 18M+ UK Households
  - 60+ Publisher Partners
  - 320+ Campaigns Delivered
  - 45+ Brand Clients
- **Note:** These stats are placeholders — need verification from BroadLab

### Services (`src/components/sections/Services.tsx`)
- Scroll-driven sticky section — as the user scrolls down, it steps through 4 service stages
- Four stages with left stepper nav, centre copy, and right visual panel:
  1. **Plan** — Maximum Reach (18M+ households)
  2. **Target** — Customised Audiences (87% ID match rate)
  3. **Activate** — Campaign Optimisation (AI/ML)
  4. **Measure** — Holistic Reporting (full-funnel)
- **Note:** Stats and percentages are illustrative placeholders

### Platform (`src/components/sections/Platform.tsx`)
- Left side: copy about the platform being a "full funnel advertising medium"
- Right side: interactive browser-framed mockup of the BroadLab dashboard
- Dashboard has four clickable tabs: Campaigns, Audiences, Analytics, Reporting
- Each tab shows representative data (KPI cards, charts, tables)
- **Note:** All dashboard data is illustrative — not real

### Clients (`src/components/sections/Clients.tsx`)
- Dark background section ("Trusted by leading agencies & brands")
- Two auto-scrolling marquee rows of client/publisher cards (scrolling opposite directions)
- **Note:** All logos are placeholder text — real logos to be added

### Team (`src/components/sections/Team.tsx`)
- Grid of team member cards with photo, name, title, bio, and LinkedIn link
- Current members: Jakob Nielsen (CEO), Chris Buck (Head of Ops), Timothy Whiterow (Senior PM), Jana Eisenstein (Chief Partnership Officer), Paul Cooper (Partner Advisor)
- One placeholder "Your Name" card for a future hire
- **Note:** Bios are written from public LinkedIn info — need BroadLab approval

### Contact (`src/components/sections/Contact.tsx`)
- Left: office address + LinkedIn link
- Right: contact form (Name, Company, Email, Message)
- **Note:** The form is UI-only — it doesn't actually send anything yet. Needs to be wired up to a form service (e.g. Resend, Formspree, or a Next.js API route)

### Insights (`src/components/sections/Insights.tsx`)
- Blog/insights section on the home page
- (Content to be defined)

---

## Design System

Defined in `src/app/globals.css`:

| Token | Value | Used for |
|---|---|---|
| Primary colour | `#4d7a96` | Buttons, accents, links |
| Primary light | `#6bbdd8` | Hover states, gradients |
| Background | `#eef1f5` | Page background (light blue-grey) |
| Dark background | `#0f1923` | Navbar, footer, Clients section |
| Text | `#0f1923` | Main body text |
| Muted text | `#4a6070` | Supporting copy |
| Subtle text | `#8a9bad` | Labels, captions |
| Font | IBM Plex Sans | All text |

Key CSS utilities:
- `.gradient-text` — blue gradient applied to headline accent words
- `.section-padding` — consistent vertical padding for all sections
- `.container-main` — centred, max-width 1200px container
- `.tag` — small pill label used above section headings
- `.rounded-card` — consistent border radius for cards

---

## Assets

| Path | What it is |
|---|---|
| `/public/images/full.logo.png` | Full horizontal logo (used in Navbar) |
| `/public/images/logo.png` | Icon-only logo (used in Footer) |
| `/public/images/broadlab-full-logo.png` | Alternative full logo |
| `/public/images/broadlab-logo.png` | Alternative icon logo |
| `/public/images/team/*.jpeg/.png` | Team member photos |
| `/public/videos/background-video.webm` | Hero background video |
| `/public/videos/hero.webm` | Alternative hero video |

---

## What Still Needs BroadLab Sign-Off

These items are currently placeholders and need to be confirmed or replaced with real information:

- [ ] **Stats** — 18M+ households, 60+ publishers, 320+ campaigns, 45+ brands, 87% match rate (ValueProp & Services)
- [ ] **Client logos** — currently text placeholders in the Clients marquee
- [ ] **Publisher partners** — currently a text note, not real logos
- [ ] **Team bios** — written from public LinkedIn data, need approval
- [ ] **Team placeholder card** — "Your Name / Placeholder Role"
- [ ] **Hero copy** — *"Powering the Next Generation of Outcome-Driven Addressable TV"* — confirm this is right
- [ ] **Contact form backend** — form submits nowhere; needs a real endpoint
- [ ] **Legal pages** — Privacy Policy, Cookie Policy, Legitimate Interest pages are linked but don't exist yet
- [ ] **Insights section** — content/articles to be determined
- [ ] **Brand kit** — colours, fonts, and logo assets to be confirmed against official brand guidelines

---

## How to Make Changes

The site follows a component-per-section pattern. Each visual section of the page is its own file in `src/components/sections/`. To update copy, stats, or team members, edit the data objects near the top of each component file — you don't need to touch the rendering logic.

Example: to update the stats in the ValueProp section, edit the `stats` array at the top of [src/components/sections/ValueProp.tsx](src/components/sections/ValueProp.tsx).
