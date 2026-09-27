# Portfolio System Documentation — Aulia Anggraeni Portfolio

A modern, high-performance portfolio web application built with **Nuxt 4**, **Vue 3**, **TypeScript**, **Tailwind CSS**, and **Nitro Server Engine**, designed around **Atomic Design** principles and modern aesthetic standards.

---

## 1. System Architecture & Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | Nuxt 4 (Nuxt 3.16+ / Vue 3.5+) | Uses `app/` and `server/` directory convention |
| **Language** | TypeScript | Strict typing across components, server routes, and data models |
| **Server Engine** | Nitro (`server/api/`) | SSR routes, email dispatch handler, API validation |
| **Styling** | Tailwind CSS | Curated design tokens (`#EC8F8D` primary, `#f6f6f6` surface, dark neutrals) |
| **Animation** | HTML5 Canvas + CSS Keyframes | Ambient 60fps particle physics + infinite marquee + page transitions |
| **Runtime & Tests**| Bun | Rapid package management, test runner (`bun test`), and build pipeline |
| **E2E Testing** | Playwright CLI | Headless browser evaluation, visual screenshot capture, and interaction testing |

---

## 2. Design System & Theme Tokens

### 2.1 Color Palette
- **Primary Coral (`#EC8F8D`)**: Used for branding, primary action buttons, active tabs, certificate counters, and particle elements.
- **Light Gray Surface (`#f6f6f6` / `bg-light`)**: Neutral background for cards, inputs, and badges.
- **Dark Neutral (`#111111` / `text-dark`)**: High-contrast typography ensuring WCAG AA/AAA legibility.
- **Pure White (`#ffffff`)**: Clean section backgrounds and card contrast.

### 2.2 Typography & Spacing
- Clean sans-serif font stack with responsive fluid scaling (`text-xs` to `text-6xl`).
- Generous whitespace (`max-w-6xl` containers with `px-4 sm:px-6` padding).

---

## 3. Atomic Design Component Hierarchy

```
app/
├── components/
│   ├── atoms/
│   │   ├── AppBadge.vue         # Status & category badges
│   │   ├── AppButton.vue        # Primary, secondary, outline, & ghost button links
│   │   ├── AppHeading.vue       # Semantic headings (h1, h2, h3) with fluid sizing
│   │   ├── AppInput.vue         # Accessible inputs and textareas with coral focus rings
│   │   ├── AppSocialIcon.vue    # Social media icons (LinkedIn, Behance, Dribbble, etc.)
│   │   └── ParticleCanvas.vue   # Lightweight SSR-safe interactive HTML5 canvas
│   ├── molecules/
│   │   ├── AwardCard.vue        # Award highlight card with organization logos
│   │   ├── CertificateItem.vue  # Interactive certificate card with hover preview state
│   │   ├── CertificateModal.vue # Modal gallery with < & > navigation and keyboard controls
│   │   ├── ContactForm.vue      # Reactive contact form with Nitro API submission
│   │   ├── JourneyCard.vue      # Timeline milestone node with track line connector
│   │   ├── NavPill.vue          # Floating pill navigation with blur backdrop
│   │   ├── ProjectCard.vue      # Project card with Prototype & Behance action buttons
│   │   └── ToolProgress.vue     # Tool skill card with brand icon and category badge
│   └── organisms/
│       ├── AwardsSection.vue    # Recognition & competition awards
│       ├── BrandCarousel.vue    # Infinite marquee of brand partner logos
│       ├── CertificationsSection.vue # Expandable credentials grid with modal integration
│       ├── FooterSection.vue    # Contact section with Aulia photo & back-to-top button
│       ├── HeroSection.vue      # Dynamic hero with particle canvas & call to action
│       ├── JourneySection.vue   # Connected vertical career & education timeline
│       ├── ProjectsSection.vue  # Filterable showcase grid
│       ├── StoriesSection.vue   # Visual showcase section with authentic background
│       └── ToolsSection.vue     # Technical expertise and tools overview
├── layouts/
│   └── default.vue              # Global layout with NavPill and background particles
└── pages/
    ├── index.vue                # Main single-page portfolio
    └── projects/
        ├── index.vue            # Dedicated projects archive with category filters
        └── [slug].vue           # Dynamic project case study detail page
```

---

## 4. Key Features Implemented

### 4.1 Interactive Particle Animation (`ParticleCanvas.vue`)
- **Performance**: High-speed Canvas 2D engine rendering at 60fps with minimal CPU overhead.
- **Interactivity**: Dynamic cursor disturbance and subtle line connections (`<= 90px`) between neighboring particles.
- **SSR Safety**: Wrapped inside Nuxt's `<ClientOnly>` component. Lifecycle hooks (`onMounted` / `onUnmounted`) ensure clean canvas teardown with `cancelAnimationFrame` and `removeEventListener`, preventing memory leaks and hydration mismatches.

### 4.2 Nodemailer Server API (`server/api/contact.post.ts`)
- **Nitro Event Handler**: Built-in `readBody` and `createError` from `h3`.
- **Validation**: Fail-fast guard clauses validating non-empty names, RFC-compliant email regex, and minimum message length.
- **Nodemailer Integration**:
  - Automatically loads SMTP credentials from environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`).
  - Graceful dev/test fallback: Uses `nodemailer.createTransport({ jsonTransport: true })` when SMTP variables are not set, allowing local tests and E2E runs to execute cleanly.
  - HTML & plaintext email formatting with stylized inquiry details and reply-to headers.
- **Frontend Integration**: [ContactForm.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/ContactForm.vue) calls `$fetch('/api/contact')` with loading state, error alert banners, and a reset button.

### 4.3 Certificate Image Preview Modal (`CertificateModal.vue`)
- **Modal Gallery**: Triggered when any certificate is clicked in [CertificationsSection.vue](file:///home/farhan/program/bun/awull-porto/app/components/organisms/CertificationsSection.vue).
- **Navigation Controls**:
  - Circular `<` (Previous) and `>` (Next) buttons on left and right borders.
  - Counter badge (e.g., `1 / 16`).
  - Title and issuing organization metadata.
  - Close button (`✕`) and "Done" link.
- **Keyboard Support**: Full keyboard accessibility (`Escape` closes modal, `ArrowLeft` navigates to previous certificate, `ArrowRight` navigates to next certificate).
- **Expandable Preview**: Defaults to top 6 certificates with a "View All Certifications (16)" toggle button.

### 4.4 Project Cards with Prototype & Behance Actions (`ProjectCard.vue`)
- **Cover Image & Badges**: Clean aspect ratio with `loading="lazy"` and `decoding="async"`.
- **Direct Action Buttons**:
  - **Prototype**: Opens interactive prototype or demo in a new tab.
  - **Behance Study Case**: Opens the complete Behance study case gallery in a new tab.
  - **Card Link**: Clicking the cover or title navigates to `/projects/${slug}` for the full case study narrative.

### 4.5 Visual Polish & Asset Realism
- **Authentic Framer Assets**: Semantic assets housed in `public/images/framer/` (portrait, projects, brand logos, award logos, and tools).
- **Connected Timeline**: Vertical track line connecting career milestones with milestone indicator dots.
- **Infinite Marquee**: Smooth CSS `@keyframes marquee` scrolling brand partner logos.
- **Contact Photo**: Authentic photo of Aulia included in the footer contact block.
- **Functional Back-to-Top**: Smooth scrolling back to top from the footer.

---

## 5. Configuration & Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `NITRO_PORT` | No | `3000` | Port for the Nuxt/Nitro server |
| `NITRO_HOST` | No | `0.0.0.0` | Host binding for server |
| `SMTP_HOST` | In Prod | `smtp.gmail.com` | SMTP server address |
| `SMTP_PORT` | In Prod | `465` | SMTP port (`465` SSL / `587` TLS) |
| `SMTP_USER` | In Prod | — | SMTP authentication username / email |
| `SMTP_PASS` | In Prod | — | SMTP authentication password / App Password |
| `SMTP_FROM` | No | `noreply@auliaggr.com` | "From" header display name and address |
| `CONTACT_TO_EMAIL` | No | `auliaggrr@gmail.com` | Recipient email for form inquiries |

---

## 6. Development, Testing & Production

### 6.1 Run Development Server
```bash
bun run dev --port 3000
```

### 6.2 Run Full Unit Test Suite
```bash
bun test
```
Runs 79+ unit tests across 23 test suites covering atoms, molecules, organisms, themes, assets, and API routes.

### 6.3 Run End-to-End Audits
```bash
bash tests/e2e/particles-email-ssr-audit.sh
```
Automates:
1. Curl verification of `/api/contact` (valid payload 200 & invalid 400).
2. Playwright CLI verification of particle canvas in live browser.
3. Live contact form submission and response verification.
4. Certificate modal click, `<` and `>` navigation, counter check, and Escape dismissal.
5. Screenshot capture of desktop particles hero and certificate modal.
6. Execution of full unit tests and production build.

### 6.4 Build for Production
```bash
bun run build
```
Generates production server and static client assets inside `.output/`:
- `.output/server/index.mjs` (Nitro Node server bundle)
- `.output/public/` (Optimized client static assets)

Preview production build:
```bash
bun run preview
# or
node .output/server/index.mjs
```
