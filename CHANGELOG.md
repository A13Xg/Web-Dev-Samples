# Changelog

All notable changes to **Web Dev Samples** are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] — 2026-02-24

### Added

#### Site 11 — Outdoor Trail Guide (`docs/sites/11-outdoor-trail-guide/`)
- Full single-page site with rugged national-park aesthetic (deep forest greens, earthy ambers)
- Hero section with layered CSS mountain silhouettes, floating particles, and animated stats bar
- **Trail Cards** — 4 trails with difficulty badges (Easy / Moderate / Hard / Expert), distance, elevation gain, time, star ratings, and "Book Now" CTAs
- **Packages** — 3 pricing tiers (Weekend Explorer $149 / Summit Seeker $299 / Ultimate Trek $549) with feature lists
- **Trail Guide** accordion — expandable sections for "What to Pack", "Safety Tips", "Leave No Trace", "Seasonal Guide"
- Scroll-triggered SVG elevation profile chart and static weather widget
- Responsive nav with hamburger menu; fonts: Oswald + Lora (Google Fonts)

#### Site 12 — Indie Game Dev / NEON RIFT (`docs/sites/12-indie-game-dev/`)
- Landing page for a cyberpunk roguelike game in active development
- Hero with 5-keyframe CSS glitch animation on title, animated neon grid background, and scrolling scanline beam
- **Stats bar** — `IntersectionObserver`-driven animated counters (Days in Dev, Commits, Bugs Fixed)
- **Features** — 5 cards (Procedural Generation, Real-time Combat, 200+ Items, Permadeath, Multiplayer CO-OP) with border-glow-cycle hover
- **Gallery** — 4 CSS-only scene illustrations (neon city, underground bunker, server room, boss arena) with click-to-zoom lightbox (keyboard + ARIA accessible)
- **Devlog** — 3 blog post cards showing development progress
- **Roadmap** — vertical timeline with colour-coded milestone status (completed / in-progress / planned)
- Email wishlist form with regex validation, success banner, and 5-second auto-dismiss; fonts: Share Tech Mono + Rajdhani

#### Site 13 — The Theme Atlas (`docs/sites/13-theme-showcase/`)
- Comprehensive UI/CSS theme reference library with **30 named design themes**
- Themes covered: Glassmorphism, Neumorphism, Brutalism, AMOLED Dark, Neon Cyberpunk, Minimalism, Material Design, Flat Design, Skeuomorphism, Swiss International, Memphis Style, Vaporwave, Y2K Internet, Cottagecore, Dark Academia, Art Deco, Bauhaus, Wabi-Sabi, Retro Vintage, Psychedelic, Aurora Gradient, Claymorphism, Grunge Distressed, Typographic, Monochromatic, Duotone, Organic Biomorphic, Nordic Scandinavian, Futurism Sci-Fi HUD, Maximalism
- Each card includes: theme name, category badge, short description, 4-color palette swatches, and a self-contained **sample block** (styled heading, body text, button, mini card, input/select — all in that theme's visual language)
- **Category filter** — 7 buttons (All / Dark / Light / Retro / Modern / Artistic / Minimal) that show/hide cards
- **Copy CSS** — per-card button copies representative CSS variables to clipboard with toast notification
- Scroll-to-top floating action button; fonts: Inter + Space Grotesk + Playfair Display

### Changed

#### `docs/index.html` — Main Showcase
- Cards for sites 11, 12, and 13 inserted at the **top** of the grid (featured sites appear first)
- Stats counter updated from "Lines of Code (8,453)" to **"Site Templates (13)"**

#### `README.md`
- Full rewrite with improved structure and readability
- Added tables listing all 13 templates with category and highlights columns
- Separated "🆕 New Additions" from original collection for clarity
- Cleaner Features, Local Development, and Deployment sections

---

## [1.0.0] — 2026-02-23 (Baseline)

Initial release with 10 website templates:

| # | Template | Category |
|---|----------|----------|
| 01 | Minimalist Portfolio | Portfolio |
| 02 | Gourmet Restaurant | Restaurant |
| 03 | Tech Startup | Technology |
| 04 | Fashion E-commerce | E-commerce |
| 05 | Travel Adventure | Travel |
| 06 | Fitness Studio | Fitness |
| 07 | Creative Agency | Agency |
| 08 | News Magazine | Editorial |
| 09 | Music Festival | Entertainment |
| 10 | Law Firm | Corporate |

- Main showcase page (`docs/index.html`) with animated card grid, counter stats, parallax header, and custom glowing cursor
- Node.js/Express local development server (`server.js`)
- GitHub Pages deployment from `/docs` folder
