# Aulia Portfolio Clone (Nuxt 4 + Atomic Design + SSR) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-fidelity, SSR-enabled Nuxt 4 clone of the Aulia Anggraeni portfolio (https://auliaggr.framer.ai/) using Atomic Design, Tailwind CSS, and automated verification with Playwright CLI.

**Architecture:** Nuxt 4 app with strict Atomic Design component decomposition (`components/atoms/`, `components/molecules/`, `components/organisms/`, `layouts/`, `pages/`). Server-Side Rendering (SSR) is utilized for optimal SEO with comprehensive metadata (`useSeoMeta`). Content is structured in typed data models (`types/portfolio.ts` and `data/portfolio.ts`).

**Tech Stack:** Nuxt 4.5+, Vue 3.5, TypeScript, Tailwind CSS, Bun, Playwright CLI (`playwright-cli`).

**Spec:** Requirements gathered from live analysis of `https://auliaggr.framer.ai/`, including exact typography (Manrope, Fragment Mono), color tokens (`#171717`, `#29ffff`, `#2a29ff`, `#ec8f8d`, `#f6f6f6`, `#fff`), layout sections, and routing (`/`, `/projects`, `/projects/:slug`).

---

## Global Constraints

- Nuxt 4 directory structure: root `app/` containing `app.vue`, `pages/`, `layouts/`, `components/`, `assets/css/`, `types/`, `data/`.
- Styling: Tailwind CSS with custom design tokens matching Framer source design.
- SSR: Server-side rendering enabled by default, ensuring all headings and meta tags are present in raw SSR HTML.
- Coding style: Guard clauses for conditionals, functions strictly <= 30 lines (maximum 50), explicit TypeScript types.
- Verification: Every task verified with Playwright CLI (`playwright-cli open`, `goto`, `snapshot`, `click`, etc.) or unit assertions.
- Git Commits: Interactive confirmation required before committing.

## Review Focus

1. **SSR Hydration and SEO Meta:** Verify `title`, `meta[description]`, `og:image`, and semantic heading tags render in initial HTML without client hydration mismatch.
2. **Atomic Design Component Isolation:** Ensure atoms/molecules don't contain hardcoded section-level layouts; data is passed through typed props.
3. **Dynamic Project Routing:** `/projects/[slug]` properly renders detail attributes (client, category, date, external links) and returns 404 for invalid slugs.
4. **Mobile & Desktop Responsive Layout:** Navigation pill adapts smoothly (bottom-floating or top sticky on mobile, fixed floating on desktop); grid layouts reflow correctly.
5. **Form & Interactive Feedback:** Contact form handles submission validation with error states and clear visual feedback.

---

## Task Decomposition

### Task 1: Foundation Setup — Tailwind CSS, Design Tokens, & Fonts

**Files:**
- Create: `app/assets/css/main.css`
- Modify: `nuxt.config.ts`
- Modify: `package.json`
- Test: `tests/e2e/01-foundation.spec.sh`

**Interfaces:**
- Consumes: Google Fonts (`Manrope`, `Fragment Mono`, `Inter`)
- Produces: CSS utility tokens (`font-manrope`, `font-mono`, `text-dark`, `accent-cyan`, `accent-blue`, `accent-coral`)

- [ ] **Step 1: Write verification script for styling and font loading**
```bash
# tests/e2e/01-foundation.spec.sh
playwright-cli open http://localhost:3000
playwright-cli eval "window.getComputedStyle(document.body).fontFamily"
```

- [ ] **Step 2: Run test to verify it fails (server not running or styles missing)**
Run: `bash tests/e2e/01-foundation.spec.sh`
Expected: Connection error or non-matching font

- [ ] **Step 3: Install Tailwind CSS module and configure Nuxt 4**
Add `@nuxtjs/tailwindcss` to `devDependencies`, update `nuxt.config.ts` to include Tailwind, Google Fonts preconnects, and SSR meta defaults. Configure Tailwind theme colors (`#171717`, `#f6f6f6`, `#29ffff`, `#2a29ff`, `#ec8f8d`) in `tailwind.config.ts`.

- [ ] **Step 4: Run test to verify it passes**
Run: `bun run dev &` and `bash tests/e2e/01-foundation.spec.sh`
Expected: PASS with font family including Manrope/Inter

- [ ] **Step 5: Commit**
```bash
git add nuxt.config.ts app/assets/css/main.css tailwind.config.ts package.json
git commit -m "feat: setup tailwind css and portfolio design tokens"
```

---

### Task 2: Data Models & Portfolio Content Repository

**Files:**
- Create: `app/types/portfolio.ts`
- Create: `app/data/portfolio.ts`
- Test: `tests/unit/portfolio-data.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `Project`, `Milestone`, `Award`, `Tool`, `Certification`, `SocialLink` types and `portfolioData` object containing all original data from `auliaggr.framer.ai`.

- [ ] **Step 1: Write test checking portfolio data integrity**
```typescript
// tests/unit/portfolio-data.test.ts
import { describe, it, expect } from 'bun:test'
import { portfolioData } from '../../app/data/portfolio'

describe('Portfolio Data', () => {
  it('contains expected projects including rorojonggrang', () => {
    expect(portfolioData.projects.length).toBeGreaterThanOrEqual(14)
    expect(portfolioData.projects.find(p => p.slug === 'rorojonggrang')).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**
Run: `bun test tests/unit/portfolio-data.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `types/portfolio.ts` and `data/portfolio.ts`**
Define interfaces (`Project`, `Award`, `Milestone`, `ToolSkill`, `Certificate`, `SocialLink`) and populate exact portfolio data (projects: Roro Jonggrang, HyperAid, Voxplore, Foody, BidThrift, etc.; awards: Switchfest 1st place, Techsprint 3rd place; journey milestones 2021-2026; tool skills: Figma 90%, Photoshop 80%, etc.).

- [ ] **Step 4: Run test to verify it passes**
Run: `bun test tests/unit/portfolio-data.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add app/types/portfolio.ts app/data/portfolio.ts tests/unit/portfolio-data.test.ts
git commit -m "feat: define portfolio types and static datasets"
```

---

### Task 3: Atomic Design — Atoms

**Files:**
- Create: `app/components/atoms/AppButton.vue`
- Create: `app/components/atoms/AppBadge.vue`
- Create: `app/components/atoms/AppHeading.vue`
- Create: `app/components/atoms/AppInput.vue`
- Create: `app/components/atoms/AppSocialIcon.vue`
- Test: `tests/e2e/03-atoms.spec.sh`

**Interfaces:**
- Consumes: `app/assets/css/main.css`
- Produces: Reusable base UI elements with hover transitions and strict accessible contrast

- [ ] **Step 1: Write Playwright CLI test script for Atoms**
```bash
# tests/e2e/03-atoms.spec.sh
playwright-cli open http://localhost:3000
playwright-cli snapshot
```

- [ ] **Step 2: Run test to verify atoms render correctly**
Run: `bash tests/e2e/03-atoms.spec.sh`
Expected: Verification of component markup and visual attributes

- [ ] **Step 3: Implement Atoms**
- `AppButton.vue`: Pill-shaped, dark/light variants, external link or button behavior.
- `AppBadge.vue`: Minimalist tag (percentage indicator or status).
- `AppHeading.vue`: Kerning-spaced title styling matching the signature Framer text style (`G o o d  d e s i g n...`).
- `AppInput.vue`: Clean bordered text field with label/placeholder.
- `AppSocialIcon.vue`: Vector icon links for LinkedIn, Behance, Dribbble, Instagram.

- [ ] **Step 4: Verify atom props and styling**
Run: `bun run dev` & check components in isolation or page demo.

- [ ] **Step 5: Commit**
```bash
git add app/components/atoms/
git commit -m "feat: add atomic design atoms (button, badge, heading, input, icon)"
```

---

### Task 4: Atomic Design — Molecules

**Files:**
- Create: `app/components/molecules/NavPill.vue`
- Create: `app/components/molecules/ProjectCard.vue`
- Create: `app/components/molecules/JourneyCard.vue`
- Create: `app/components/molecules/AwardCard.vue`
- Create: `app/components/molecules/ToolProgress.vue`
- Create: `app/components/molecules/CertificateItem.vue`
- Create: `app/components/molecules/ContactForm.vue`
- Test: `tests/e2e/04-molecules.spec.sh`

**Interfaces:**
- Consumes: Atoms, `app/types/portfolio.ts`
- Produces: Interactive composite cards and controls

- [ ] **Step 1: Write test for interactive molecules**
```bash
# tests/e2e/04-molecules.spec.sh
playwright-cli open http://localhost:3000
playwright-cli find "Projects"
```

- [ ] **Step 2: Run test to verify missing elements fail**
Run: `bash tests/e2e/04-molecules.spec.sh`

- [ ] **Step 3: Implement Molecules**
- `NavPill.vue`: Floating frosted-glass pill bar with Home link, Projects link, and WhatsApp CTA.
- `ProjectCard.vue`: Card displaying project thumbnail, title, subtitle, and link to `/projects/:slug`.
- `JourneyCard.vue`: Timeline row with role, company, and year badge.
- `AwardCard.vue`: Competition victory card with title and date.
- `ToolProgress.vue`: Software name, description, and percentage badge.
- `CertificateItem.vue`: Certification title, institution, and verification link.
- `ContactForm.vue`: Input fields with submit handler and feedback state.

- [ ] **Step 4: Verify molecules functionality**
Run: `bash tests/e2e/04-molecules.spec.sh`

- [ ] **Step 5: Commit**
```bash
git add app/components/molecules/
git commit -m "feat: add atomic design molecules"
```

---

### Task 5: Atomic Design — Organisms & Layout

**Files:**
- Create: `app/components/organisms/HeroSection.vue`
- Create: `app/components/organisms/BrandCarousel.vue`
- Create: `app/components/organisms/JourneySection.vue`
- Create: `app/components/organisms/AwardsSection.vue`
- Create: `app/components/organisms/ProjectsSection.vue`
- Create: `app/components/organisms/ToolsSection.vue`
- Create: `app/components/organisms/StoriesSection.vue`
- Create: `app/components/organisms/CertificationsSection.vue`
- Create: `app/components/organisms/FooterSection.vue`
- Create: `app/layouts/default.vue`
- Test: `tests/e2e/05-organisms.spec.sh`

**Interfaces:**
- Consumes: Molecules, Atoms, `portfolioData`
- Produces: Complete semantic page sections and default layout container

- [ ] **Step 1: Write Playwright CLI test for section rendering**
```bash
# tests/e2e/05-organisms.spec.sh
playwright-cli open http://localhost:3000
playwright-cli find "Good design is invisible"
playwright-cli find "Proudly worked with"
playwright-cli find "My journey through design"
```

- [ ] **Step 2: Run test to verify failure**
Run: `bash tests/e2e/05-organisms.spec.sh`

- [ ] **Step 3: Implement Organisms & Layout**
- Assemble `HeroSection.vue` with profile bio, social icons, headline, action buttons (`Portfolio`, `Download CV`), location pill.
- Build `BrandCarousel.vue` client logos ticker.
- Build `JourneySection.vue`, `AwardsSection.vue`, `ProjectsSection.vue`, `ToolsSection.vue`, `StoriesSection.vue`, and `CertificationsSection.vue`.
- Build `FooterSection.vue` with contact info, WhatsApp link, email, contact form, and copyright.
- Implement `layouts/default.vue` providing fixed `NavPill` and layout boundaries.

- [ ] **Step 4: Run test to verify all sections exist**
Run: `bash tests/e2e/05-organisms.spec.sh`
Expected: PASS with all section markers found

- [ ] **Step 5: Commit**
```bash
git add app/components/organisms/ app/layouts/
git commit -m "feat: implement portfolio organisms and default layout"
```

---

### Task 6: Pages & SSR SEO Optimization

**Files:**
- Create: `app/pages/index.vue`
- Create: `app/pages/projects/index.vue`
- Create: `app/pages/projects/[slug].vue`
- Modify: `app/app.vue`
- Test: `tests/e2e/06-seo-and-routes.spec.sh`

**Interfaces:**
- Consumes: Nuxt 4 routing (`<NuxtPage />`), Organisms, `portfolioData`
- Produces: Fully navigable, SSR-optimized pages with Open Graph tags and meta descriptions

- [ ] **Step 1: Write Playwright CLI test verifying routes and SEO tags**
```bash
# tests/e2e/06-seo-and-routes.spec.sh
playwright-cli open http://localhost:3000
playwright-cli eval "document.title"
playwright-cli goto http://localhost:3000/projects
playwright-cli find "My work"
playwright-cli goto http://localhost:3000/projects/rorojonggrang
playwright-cli find "Kisah Roro Jonggrang"
playwright-cli find "IPB University"
```

- [ ] **Step 2: Run test to verify failure**
Run: `bash tests/e2e/06-seo-and-routes.spec.sh`

- [ ] **Step 3: Implement Pages**
- `app/app.vue`: Replace welcome screen with `<NuxtLayout><NuxtPage /></NuxtLayout>`.
- `app/pages/index.vue`: Integrates Hero, Brands, Journey, Awards, Projects preview, Tools, Stories, Certifications, and Footer. Injects SEO tags (`useSeoMeta`).
- `app/pages/projects/index.vue`: Full projects grid with filters/header.
- `app/pages/projects/[slug].vue`: Project detail page with client metadata, tags, description, screenshots/media, and external project link.

- [ ] **Step 4: Run test to verify all routes and SEO tags pass**
Run: `bash tests/e2e/06-seo-and-routes.spec.sh`
Expected: PASS with titles and project details matching exact spec

- [ ] **Step 5: Commit**
```bash
git add app/pages/ app/app.vue
git commit -m "feat: assemble pages with SSR SEO and dynamic project routing"
```

---

### Task 7: End-to-End Visual & Interaction Verification via Playwright CLI

**Files:**
- Create: `tests/e2e/full-audit.sh`
- Test: `playwright-cli` full suite

**Interfaces:**
- Consumes: Complete running Nuxt 4 application
- Produces: Test artifacts, snapshots, and verification logs

- [ ] **Step 1: Write automated test runner**
Automate page visits to `/`, `/projects`, `/projects/rorojonggrang`, test form interactions, take page snapshots, and check responsiveness at 1280px and 390px (mobile).

- [ ] **Step 2: Run verification script**
Run: `bash tests/e2e/full-audit.sh`
Expected: All snapshots match expected element counts and links work.

- [ ] **Step 3: Antislop visual and copy check**
Run antislop filter: verify no generic unstyled placeholders, verify contrast ratio meets WCAG AA standards, verify mobile touch targets >= 44px.

- [ ] **Step 4: Production build verification**
Run: `bun run build`
Expected: Clean SSR build without errors.

- [ ] **Step 5: Commit**
```bash
git add tests/
git commit -m "test: add comprehensive Playwright CLI verification suite"
```
