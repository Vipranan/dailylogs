# Maverick by AIRMAN — Product Site Design Spec

**Date:** 2026-04-21  
**Product:** Maverick by AIRMAN (AI Co-Pilot aviation training platform)  
**Reference:** https://www.theairman.org/maverick  

---

## Overview

A single-page product marketing site for Maverick — an AI-powered aviation training platform. The site combines a monochrome black-and-white visual identity with an interactive Spline 3D device mockup in the hero, scroll-driven animations via Framer Motion, and a clean section-by-section narrative leading to a beta signup conversion.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| 3D Hero | Spline (embedded via `@splinetool/react-spline`) |
| Animations | Framer Motion (scroll-driven, `useInView`, `motion.div`) |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| Font | Geist Sans + Geist Mono (Next.js default, zero config) |

---

## Visual Identity

- **Background:** `#080808` (near-black)
- **Primary text:** `#ffffff`
- **Secondary text:** `rgba(255,255,255,0.4)`
- **Borders:** `rgba(255,255,255,0.1)` — `rgba(255,255,255,0.25)`
- **CTA (primary):** white bg + black text
- **CTA (secondary):** transparent + white border
- **Accent highlight:** one feature card inverted (white bg, black text) to create visual hierarchy
- **Typography labels:** monospace, uppercase, letter-spacing 2-3px
- **No color accents** — pure monochrome throughout

---

## Page Structure

### 1. Navigation
- Fixed top bar, blurred dark background on scroll
- Left: AIRMAN logo mark + "MAVERICK" wordmark (monospace)
- Center: Nav links — About, XB70, Skynet, Careers
- Right: "Join Beta" CTA button (white, small)

### 2. Hero Section
- Full-viewport height
- **Left half:** 
  - Eyebrow label: `AI CO-PILOT · BETA 2026` (monospace, muted)
  - H1: "Your AI Co‑Pilot. Anytime, Anywhere."
  - Subhead: "Discipline. Passion. Precision." — one sentence supporting copy
  - Primary CTA: "Join the Beta →" (white button)
  - Secondary CTA: "Learn More" (ghost button)
- **Right half:**
  - Spline 3D scene: floating phone/tablet device mockup showing Maverick app UI
  - User can drag to rotate the device
  - Subtle "DRAG TO ROTATE" label (monospace, muted)
- Entry animation: headline fades + slides up on load, device fades in with slight float

### 3. Features Section
- Section label: `FEATURES` (monospace eyebrow)
- H2: "Everything a pilot needs. One platform."
- **2×2 bento grid** of feature cards, each animating in on scroll (staggered):
  1. **Study Mode** — Global training manuals, AI assessments, smart flashcards, streak tracking
  2. **Pre-Flight Mode** — AI ICAO/FAA flight planner, weather, NOTAMs, weight & balance
  3. **Logbook Mode** — Auto-logging via XB70 sync, hour tracking, worldwide certification
  4. **Captain MAVERICK AI** — Adaptive learning, flight briefing, real-time intelligence (inverted card — white bg)
- Each card: icon (simple SVG), title, 2-line description
- Hover: subtle border brighten + slight scale

### 4. Ecosystem Section
- Section label: `ECOSYSTEM` (monospace eyebrow)
- H2: "Built to connect."
- Horizontal connected diagram: **XB70 ← → MAVERICK ← → SKYNET**
  - Each node: circular logo mark + product name
  - Connecting lines with animated dot traveling along the line (Framer Motion)
- Below: 3 short supporting bullets on what the integration enables

### 5. Community Section
- Section label: `COMMUNITY` (monospace eyebrow)
- H2: "Speak. Share. Squawk."
- Left: short copy about pilot-focused community
- Right: animated list of channel items (Squawk channels, Study Pods, Operations Squads)
  - Each row: colored dot indicator + channel name + member count
  - Rows stagger in on scroll

### 6. Beta Signup Section
- Full-width dark section, centered
- H2: "Join the mission."
- Subhead: "Be first in the cockpit. Beta launching 2026."
- Email input + "Join →" submit button (inline, full-width on mobile)
- Below form: "No spam. Mission-critical updates only." (muted monospace)

### 7. Footer
- Left: © 2026 AIRMAN · Privacy Policy
- Right: Instagram, LinkedIn, X/Twitter icon links
- Top border separator

---

## Animation Principles (Framer Motion)

- **Entry:** `opacity: 0 → 1`, `y: 24 → 0`, `duration: 0.6s`, `ease: easeOut`
- **Stagger:** feature cards stagger with `0.1s` delay between each
- **Scroll trigger:** `useInView` with `once: true`, `margin: "-100px"`
- **Nav:** background blurs in after 80px scroll (`useScroll` + `useTransform`)
- **Ecosystem dots:** infinite loop animation traveling along connecting lines

---

## Responsiveness

- **Desktop (≥1024px):** Hero is two-column split. Features are 2×2 grid.
- **Tablet (768–1023px):** Hero stacks (device below text). Features remain 2-col.
- **Mobile (<768px):** Everything single column. Spline scene scales down. Nav collapses to hamburger.

---

## Spline Integration

- Create 3D scene at spline.design: floating phone mockup with Maverick app UI texture applied to screen
- Export as Spline URL or self-hosted `.splinecode`
- Embed via `@splinetool/react-spline` in the Hero component
- Lazy-load with a placeholder skeleton to avoid blocking LCP
- Disable on mobile if performance is poor (show static image fallback)

---

## File Structure

```
maverick-site/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page — imports all sections
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx            # Spline + headline + CTAs
│   ├── Features.tsx        # Bento grid
│   ├── Ecosystem.tsx       # Connected diagram
│   ├── Community.tsx       # Channel list
│   ├── BetaSignup.tsx      # Email form
│   └── Footer.tsx
├── public/
│   └── spline/             # Spline scene file (if self-hosted)
└── next.config.js
```

---

## Out of Scope

- Authentication / user accounts
- Actual beta backend (form submits to a static endpoint or Formspree)
- Multi-page routing (single page only)
- CMS or content management
- Animations beyond scroll-entry (no parallax depth layers)
