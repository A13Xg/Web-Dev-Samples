# Changelog

All notable changes to **Web Dev Samples** are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] — 2026-02-26

### Changed

#### Site 01 — Minimalist Portfolio (`docs/sites/01-minimalist-portfolio/`)
- **Project cards**: replaced external Dribbble/Behance links with in-page **case study modals** for all 6 projects (Lumina, Horizon, Mono Studio, Verve, Fragments, Nova); each modal shows full-width image, Challenge/Approach/Result sections, skill tags, and a "View Live" external link

#### Site 03 — Tech Startup / Nexus AI (`docs/sites/03-tech-startup/`)
- **Sign In** nav link: replaced `alert()` with a proper **Sign In modal** (email + password, forgot-password link, success state)
- **Start Free Trial** (all instances): replaced `alert()` with a **Trial Signup modal** (first/last name, work email, company, plan select, password, terms checkbox, success confirmation)
- **Watch Demo**: replaced `alert()` with a **Demo Preview modal** (CSS mock video player, description, trial CTA)
- **Schedule a Demo**: replaced `alert()` with a **Schedule Demo modal** (full name, email, company, team size, date/time pickers generated dynamically, message, confirmation state)
- **14 footer links**: removed all inline `alert()` calls; replaced with `href="https://example.com/nexus-[slug]"` + `target="_blank"`

#### Site 04 — Fashion E-commerce / NOIR (`docs/sites/04-fashion-ecommerce/`)
- **8 product cards**: replaced `onclick="alert(...)"` with `openProductModal({...})` — a full **Product Detail modal** (large image, color swatches, size selector, "Add to Cart" integrating with the existing cart sidebar, "Add to Wishlist" toast)
- **"Read the Story" editorial button**: replaced `alert()` with a proper **Story modal** (image + editorial copy)
- **12 footer links**: removed all `alert()` calls; replaced with `href="https://example.com/noir-[slug]"` + `target="_blank"`

#### Site 05 — Travel Adventure / Wanderlust (`docs/sites/05-travel-adventure/`)
- **5 destination cards**: replaced `onclick="alert(...)"` with `openDestinationModal(key)` — a full **Destination modal** per destination (hero image, quick-facts bar, description, highlights grid, CTA buttons) for Bali, Kyoto, Amalfi Coast, Maldives, Iceland
- **5 story cards + hero "Read the Story"**: replaced `alert()` with `openStoryModal(key)` — a full **Story Reader modal** with article content, author, read time for all stories
- **3 guide items**: converted to `href="https://example.com/wanderlust-[slug]"` external links
- **8 footer links**: removed all `alert()` calls; replaced with external links

#### Site 07 — Creative Agency / Studio Nova (`docs/sites/07-creative-agency/`)
- **4 project cards**: replaced `example.com` external links with in-page **Case Study modals** (Lumina, Prism, Horizon, Apex) — each shows full image, Challenge/Approach/Result, skill tags, live link

#### Site 09 — Music Festival / Horizon Fest (`docs/sites/09-music-festival/`)
- **`showFAQ()`**: replaced `alert()` with a proper **FAQ accordion modal** (9 questions, expand/collapse)
- **`showContact()`**: replaced `alert()` with a **Contact modal** (address, email, phone, contact form with validation + success state)
- **`showFullLineup()`**: replaced `alert()` with a **Full Lineup modal** (day tabs Fri/Sat/Sun, 4 stages, 50+ artists, clickable rows)
- **Artist cards**: all 12 artist cards now open an **Artist Detail modal** (bio, genre, time/stage badge, social links)
- **Jobs / Press footer links**: replaced `alert()` with `href="https://example.com/horizonfest-[slug]"` + `target="_blank"`

#### Site 10 — Law Firm / Sterling & Associates (`docs/sites/10-law-firm/`)
- **Attorney bio modals**: all 4 team member cards now open a **Bio modal** (photo, name, bar admissions, law school, practice areas, bio text, "Schedule Consultation" CTA)
- **FAQ section**: added a new `#faq` accordion section before the footer with 6 questions (fees, scheduling, case duration, payment plans, first consultation, regional coverage)

---

## [Unreleased] — 2026-02-25

### Changed

#### The Theme Atlas (`docs/sites/13-theme-showcase/`)
- **Pastel Bloom** (theme 63) — Redesigned with flat solid pastel colors (no gradients): Light Blue (`#aad4f5`) background, Light Red (`#ffaaaa`) button, Light Green (`#aaf0c4`) panel. Updated card swatches and description.
- **Cubism** (theme 64) — Rebuilt as geometric/isometric, clearly distinct from Brutalism: deep navy (`#1a2e50`) background with isometric grid lines (60°/−60°/0°), gold heading, terracotta-orange trapezoid button (`clip-path`), teal left-border panel with `skewX` tilt, gold bottom-border input. Removed all heavy black borders and offset box-shadows. Updated card swatches and description.
- **Cosmic Concrete** (theme 65) — Enhanced star field with 24 radial-gradient star points (small white/coloured dots) plus two large elliptical nebula glows (purple and blue). Background darkened to near-black (`#06040f`) for deeper space feel.
- **Organic Biomorphic** (theme 27) — Fixed sample block showing as an oval mask: removed the asymmetric `border-radius` from `.s-organic` container (replaced with standard `12px`); child elements retain their organic blob shapes.

---

## [Unreleased] — 2026-02-25 (prior)

### Added

#### The Theme Atlas (`docs/sites/13-theme-showcase/`)
- **Added 5 new themes** expanding the library from 60 to **65 themes**:

#### Main Page (`docs/index.html`)
- Updated Theme Atlas card tag from "60 Themes" to **"65 Themes"**
- Updated Theme Atlas card description to reference the 5 new themes by name

---

## [Unreleased] — 2026-02-24

### Changed

#### Main Page (`docs/index.html`)
- **Theme Atlas card** — Removed all shimmer/animation effects from the hero card; now displays a subtle static glowing outline instead of animated rainbow border
- **Spotlight badge** — Removed "✦ Spotlight Pick" badge from Theme Atlas card for cleaner appearance
- **Settings button** — Moved from middle-right to bottom-right of viewport for less intrusive positioning
- **Cross cursor** — Replaced "Cross" with "Dot" label in cursor style settings
- **Particle color** — Changed default particle color from dark purple (#8b5cf6) to lighter shade (#c4b5fd) for improved visibility
- **Accent color** — Updated default purple accent color to lighter variant for better contrast
- **Card animations** — Added subtle scroll-triggered float animation to site cards; cards now gently float up and down after entering viewport for more dynamic feel

Added

#### The Theme Atlas (`docs/sites/13-theme-showcase/`)
- **Added 10 new themes** expanding the library from 50 to **60 themes**:
  - **Paper Vintage** (Light) — Realistic aged paper texture with subtle grain and letterpress aesthetic
  - **Steampunk Brass** (Artistic) — Victorian industrial with polished brass on dark leather and copper accents
  - **Space Galaxy** (Dark) — Deep space nebula with cosmic colors and starlight across void
  - **Eco Green** (Modern) — Sustainable fresh design with natural greens and earth-conscious palette  
  - **Glitch Art** (Artistic) — Digital corruption aesthetic with RGB shift and data moshing effects
  - **Luxury Gold** (Light) — Premium elegance with warm gold on cream and sophisticated serif typography
  - **Arctic Ice** (Modern) — Crystal-clear cyan and white mimicking frozen water
  - **Desert Sunset** (Modern) — Warm sand tones to burning orange capturing Sahara at golden hour
  - **Velvet Dreams** (Artistic) — Luxurious deep purples and gold with elegant, sophisticated aesthetic
  - **Circuit Board** (Modern) — Tech-inspired monochrome with circuit patterns and digital precision
- Updated header badge count from "50 Themes" to **"60 Themes"** and "250+ Components" to **"290+ Components"**
- Added CSS snippets for all 10 new themes to the copy-to-clipboard functionality
- **Card animations** — Implemented scroll-triggered float animation for theme cards; cards float subtly into view as user scrolls down page

### Added

#### Site 11 — Outdoor Trail Guide (`docs/sites/11-outdoor-trail-guide/`)
- Full single-page site with rugged national-park aesthetic (deep forest greens, earthy ambers)
- Hero section with layered CSS mountain silhouettes, floating particles, and animated stats bar
- **Trail Cards** — 4 trails with difficulty badges (Easy / Moderate / Hard / Expert), distance, elevation gain, time, star ratings, and "Book Now" CTAs
- **Packages** — 3 pricing tiers (Weekend Explorer $149 / Summit Seeker $299 / Ultimate Trek $549) with feature lists
- **Booking Modal** — "Choose Explorer/Summit/Ultimate" buttons open a full booking form with date picker, party size, contact fields, special requests; on submit shows a booking reference number
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
- **Theme Atlas hero card** updated from animated shimmer border to a subtle static glowing outline (no more distracting colour-cycling gradient)
- **"Spotlight Pick" badge** renamed to **"Available Themes"**
- All non-hero cards now display **2 per row** — removed `grid-column: span 2` from featured cards so every site below the hero shows in a clean 2-column grid
- **Cross cursor** option now uses a custom SVG "X" icon with a purple glow effect instead of the OS built-in "+" crosshair
- Hero card (`site-card.hero`) retains full-width span via its own CSS rule

#### Site 01 — Minimalist Portfolio
- **Contact section**: replaced bare `mailto:` link with a full contact form (Name, Email, Subject select, Message textarea)
- Client-side validation with inline error states; success message appears in-place on submit
- Added form CSS to `css/style.css`

#### Site 02 — Gourmet Restaurant (Maison Noir)
- **Reservation form**: replaced `mailto:` handler with in-page confirmation flow — form hides, shows "Reservation Confirmed!" with a summary grid (Date, Time, Guests, Name) and "Make Another Reservation" button
- Toast notification system for validation errors (no more browser `alert()`)

#### Site 04 — Fashion E-commerce (NOIR)
- **Checkout**: replaced `alert()` on the "Proceed to Checkout" button with a full checkout modal (Contact Info, Shipping Address, Payment fields with card-number formatting)
- On successful form validation, shows an Order Confirmation with random order number and "Track Order" link

#### Site 05 — Travel Adventure (Wanderlust)
- **Newsletter**: added email format validation; shows inline "You're in!" success message, auto-clears after 5 s
- **Search**: replaced `alert()` nav search with a real search overlay — blur backdrop, instant `data-title`/category filtering of all destination, story, and guide entries; keyboard-navigable (Escape to close)

#### Site 06 — Fitness Studio (Pulse Fitness)
- **Membership modal**: replaced `alert()` pricing-plan handler with a full modal (plan name/price shown, First/Last Name + Email + Phone fields, success state "Welcome to Pulse!")
- **Book Class modal**: each class card gets a "Book Class" button that opens a pre-filled booking modal (class name, date, name/email)

#### Site 07 — Creative Agency (Studio Nova)
- **Contact section**: replaced bare `mailto:` link with a full inquiry form (Name, Company, Email, Project Type, Budget Range, Message)
- Client-side validation; success state "Thank you! We'll be in touch within 24 hours."
- Project case study links updated to `https://example.com/linkID-70142` / `https://example.com/linkID-70243`

#### Site 08 — News Magazine (The Chronicle)
- **Article modal**: all article cards (`data-article`) open a lightbox modal with full article title, image, author, date, and 2–3 body paragraphs; keyboard-accessible (Escape, backdrop click)
- **Search**: slide-down search bar filters visible article cards live; shows "No articles found" on empty results
- **Newsletter**: email validation + "You're subscribed!" success banner with 5 s auto-dismiss
- Footer `javascript:void(0)` links replaced with `https://example.com/linkID-08001` through `08007`

#### Site 09 — Music Festival (Horizon Fest)
- **Ticket purchase modal**: replaced `alert()` in `purchaseTicket()` with a full ticket modal (ticket type/price, quantity selector with live total, Name + Email fields)
- On submit: shows order confirmation with random 6-digit order number and "Download Tickets" link (`https://example.com/linkID-09001`)

#### Site 11 — Outdoor Trail Guide
- **Package booking**: "Choose Explorer/Summit/Ultimate" buttons (previously `href="#"`) now call `openBookingModal()` with package name + price
- Full booking modal: date picker, party size, contact fields, special requests, confirmation with 6-char booking reference

#### Site 12 — Indie Game Dev (Neon Rift)
- **Footer social links**: all six `href="#"` links updated to real main-site roots (Steam, Twitter/X, Discord, YouTube, Itch.io, GitHub) with `target="_blank" rel="noopener noreferrer"`
- **Hero CTA** "Wishlist on Steam" updated to point to `https://store.steampowered.com`

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
