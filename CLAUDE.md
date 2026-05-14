# BroadLab Website Rebuild — Claude Code Context

## What this project is

This is a full rebuild of the BroadLab website (broadlab.tv), being built by Greg Brenner (greg.brenner@broadlab.tv).

BroadLab is **not** a media agency, a CTV buying service, or a programmatic vendor. It is an **intelligence system for outcome-driven TV** — a tech-heavy, data-driven platform that gives marketers and agencies precise control over how CTV investment works. The website must reflect this positioning at every level: design, copy, and structure should communicate analytical rigour, intelligence, and measurable outcomes — not lifestyle advertising.

Core positioning from the one-pager:
- "A System, Not a Service"
- "Define the business outcome, design the system, continuously optimise for results"
- "The intelligence layer that sits above fragmented media systems"

The four core components of the Broadlab system:
1. **The Audience Graph** — 1.8M UK postcodes / 5,000+ attributes, privacy-safe via Snowflake
2. **Outcome-Based Measurement** — brand lift, search, conversion, footfall, sales; daily in-flight
3. **Continuous Optimisation Engine** — AI + expert-led across audience, creative, geography, supply, frequency
4. **Compounding Intelligence** — every campaign feeds back, integrating with CRM, MMM, wider strategy

Target audience: CMOs, Heads of Media, Growth Leads, Media Agencies & Holding Groups.

Proven results (from one-pager — use carefully, confirm before publishing):
- Financial Services: 3:1 ROAS, 81% cost efficiency improvement
- Retail/DTC: 87% reduction in cost per order, +36% brand awareness
- Automotive: +24.8% showroom visits
- Sports Streaming: 8.9% of total sales attributed to CTV

## Tech stack

- **Next.js 16** with the App Router
- **TypeScript**
- **Tailwind CSS v4** (configured via `postcss.config.mjs`)
- **Framer Motion** (installed, available for animations)
- **IBM Plex Sans** font via Google Fonts

Run locally: `npm install` then `npm run dev` → http://localhost:3000

## Project structure

```
src/
  app/
    page.tsx              ← Home page
    layout.tsx            ← Root layout (font, metadata)
    globals.css           ← Design tokens + base styles
    platform/page.tsx     ← /platform route
    services/page.tsx     ← /services route
    team/page.tsx         ← /team route
  components/
    layout/
      Navbar.tsx          ← Fixed top nav, scroll-aware active state
      Footer.tsx          ← Logo, links, office address, LinkedIn
    sections/
      Hero.tsx            ← Full-screen hero section
      ValueProp.tsx       ← Core value proposition + animated stats
      Services.tsx        ← The four system components
      Platform.tsx        ← Interactive dashboard mockup (tabbed)
      Clients.tsx         ← Client/publisher logos
      Team.tsx            ← Team member photo cards
      Contact.tsx         ← Contact form (UI only — not yet wired up)
      Insights.tsx        ← Insights/blog section
      CEOQuote.tsx        ← CEO quote block
      Stats.tsx           ← Stats component
public/
  images/                 ← Logos and team photos
  videos/                 ← Hero background videos (.webm)
```

## Design direction

The site should feel like a high-end data intelligence platform — think analytical, precise, and confident. Reference points: dark backgrounds, clean typography, data-forward UI, subtle technical motion. It should not feel like a consumer ad platform or lifestyle brand.

Design tokens are defined in `src/app/globals.css`. The official BCAP brand palette (from campaigns.broadlab.tech/branding) should be used as the source of truth when updating colours — do not invent new values. Key utility classes: `.gradient-text`, `.section-padding`, `.container-main`, `.tag`, `.rounded-card`.

## Content status — do not treat placeholder data as final

All of the following need sign-off from BroadLab before going live:
- Stats in `ValueProp.tsx`: household/publisher/campaign figures
- Stats in `Services.tsx`: match rates, publisher names, bullet figures
- Client/publisher logos in `Clients.tsx`: no real logos yet
- Team bios in `Team.tsx`: written from public LinkedIn, pending approval
- Dashboard data in `Platform.tsx`: entirely illustrative
- Contact form in `Contact.tsx`: submits nowhere — needs backend (Resend, Formspree, or API route)
- Legal pages (`/privacy`, `/cookies`, `/legitimate-interest`): not built yet

Keep placeholder warnings in comments. Do not remove them until data is confirmed.

## How content is structured

Each section stores its data as a plain array or object near the top of the component file. To update copy or stats, edit those data objects — no need to touch JSX unless structure is changing.

- Update stats → `ValueProp.tsx`
- Update team → `Team.tsx`
- Update service steps → `Services.tsx`
- Update client logos → `Clients.tsx`

## What Greg is working on

Greg is rebuilding the site section by section, with content and design direction being informed by the BroadLab one-pager and brand kit. More detailed briefs for each section will be provided as the project progresses. The overall goal is a site that reflects BroadLab's technical depth and commercial credibility — one that a CMO or agency MD would take seriously immediately on landing.
