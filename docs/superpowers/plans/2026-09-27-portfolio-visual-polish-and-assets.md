# Visual Polish, Lazy Loading, Animations & Assets Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update all portfolio data and components to use the renamed semantic assets with lazy loading, add page-wide transitions and scroll micro-animations, convert brand partners to authentic logos, create a connected timeline for the journey section, add logos to awards, remove excessive project shadows, add the showcase background, add lazy-loaded expandable certifications with images, and add Aulia's photo to the contact section.

**Architecture:** Nuxt 4 Composition API with TypeScript and Tailwind CSS. Atomic design hierarchy (Atoms -> Molecules -> Organisms -> Pages) with SSR compatibility. Image optimization with native `loading="lazy"` and `decoding="async"`.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Bun, Playwright CLI.

**Spec:** User prompt requirements:
1. Fix all image paths following user renames; ensure image loading is light and lazy (`loading="lazy"`).
2. Add smooth animations across all pages.
3. "Proudly worked with": change all text items into authentic brand logos in the marquee.
4. "Section journey": make a connected timeline line connecting milestones from 2021 to 2026.
5. "Section award": use authentic organization logos.
6. "My work": remove heavy over-shadow (`hover:shadow-lg`).
7. "Tools section": fix logos of all tools with authentic vector/PNG assets.
8. "More showcase": add background image (`/images/framer/showcase_bg.png`).
9. "Certification section": add images for all certifications, lazy load them, show initial preview batch, and add an expand/collapse button.
10. "Contact section": add photo of Aulia (`/images/framer/aulia.png`).

---

## Global Constraints

- Nuxt 4 directory convention (`app/` root).
- Package manager: Bun (`bun test`, `bun run dev`, `bun run build`).
- Do NOT commit without explicit user confirmation via `ask_question`.
- Guard clauses and functions under 30 lines.
- Zero broken image links: all paths must resolve to existing files in `public/images/framer/`.

## Review Focus

1. Missing or misspelled renamed assets causing 404 image errors — test checks `existsSync` for every referenced image path in `portfolio.ts`.
2. Expandable certifications state toggle — test confirms initial state renders preview slice (6 items) and expands to full list (16 items) upon click.
3. Brand partner logo accessibility — test verifies `alt` attributes and proper dimensions so marquee doesn't jank.
4. Journey timeline continuity — test verifies vertical timeline container and connected marker elements.
5. Contrast and aesthetics — ensure text on top of the showcase background remains legible and high-contrast.

---

### Task 1: Semantic Asset Alignment & Data Layer Update

**Files:**
- Modify: `app/types/portfolio.ts`
- Modify: `app/data/portfolio.ts`
- Test: `tests/unit/renamed-assets-existence.test.ts`

**Interfaces:**
- Consumes: Files in `public/images/framer/`
- Produces: Updated `BrandPartner`, `Award`, `Certification`, and `portfolioData` with resolved semantic image paths.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/renamed-assets-existence.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { portfolioData } from '../../app/data/portfolio'

describe('Renamed Semantic Assets Existence', () => {
  it('profile avatar and portrait exist on disk', () => {
    expect(existsSync(join(process.cwd(), 'public', portfolioData.profile.avatarUrl))).toBe(true)
    expect(existsSync(join(process.cwd(), 'public', portfolioData.profile.portraitUrl!))).toBe(true)
  })

  it('all project cover images exist on disk', () => {
    for (const project of portfolioData.projects) {
      expect(existsSync(join(process.cwd(), 'public', project.coverImage))).toBe(true)
    }
  })

  it('all brand partner logos exist on disk', () => {
    expect(portfolioData.brands.length).toBeGreaterThan(0)
    for (const brand of portfolioData.brands) {
      expect(brand.logoUrl).toBeDefined()
      expect(existsSync(join(process.cwd(), 'public', brand.logoUrl))).toBe(true)
    }
  })

  it('all award logos exist on disk', () => {
    for (const award of portfolioData.awards) {
      expect(award.logoUrl).toBeDefined()
      expect(existsSync(join(process.cwd(), 'public', award.logoUrl!))).toBe(true)
    }
  })

  it('all tool logos exist on disk', () => {
    for (const tool of portfolioData.tools) {
      expect(existsSync(join(process.cwd(), 'public', tool.iconUrl))).toBe(true)
    }
  })

  it('all certifications have valid images on disk', () => {
    for (const cert of portfolioData.certifications) {
      expect(cert.imageUrl).toBeDefined()
      expect(existsSync(join(process.cwd(), 'public', cert.imageUrl!))).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/renamed-assets-existence.test.ts`
Expected: FAIL (types missing fields or old paths missing on disk).

- [ ] **Step 3: Update `app/types/portfolio.ts` & `app/data/portfolio.ts`**

In `app/types/portfolio.ts`:
- Define `BrandPartner { name: string; logoUrl: string }`.
- Add `logoUrl?: string` to `Award`.
- Add `imageUrl?: string` to `Certification`.
- Update `PortfolioData` to use `brands: BrandPartner[]`.

In `app/data/portfolio.ts`:
- Map profile: `avatarUrl: '/images/framer/aulia.png'`, `portraitUrl: '/images/framer/aulia.png'`.
- Map projects:
  - `rorojonggrang`: `rorojongrang.png`
  - `hyperaid`: `hperaid.png`
  - `voxplore`: `voxplore.png`
  - `foody`: `foody.png`
  - `bidthrift`: `birthrift.jpg`
  - `gamebuddy`: `gamebuddy.png`
  - `ndrey-kitchen`: `ndrey_kitchen.png`
  - `traspotter`: `transporter.png`
  - `drezzle`: `dreeze_logo.png`
  - `mentalup`: `mentalup.png`
  - `clotie`: `clotie.png`
  - `ousean-pay`: `ousean_pay.png`
  - `ontravel`: `ontravel.png`
  - `morker`: `morker.png`
- Map tools:
  - Figma: `/images/framer/figma_logo.svg`
  - Framer: `/images/framer/frammer.svg`
  - Adobe Photoshop: `/images/framer/ps.svg`
  - Adobe Illustrator: `/images/framer/ai.svg`
  - Adobe After Effects: `/images/framer/ae.svg`
  - Canva: `/images/framer/canva.png`
- Map awards:
  - UIN Walisongo: `logoUrl: '/images/framer/logo_walisongo.png'`
  - Reclas Technology: `logoUrl: '/images/framer/reclas_logo.jpg'`
- Map brand partners with logos:
  - Birthrift: `/images/framer/birthrift_logo.png`
  - Clotie: `/images/framer/clotie_logo.png`
  - Dreeze: `/images/framer/dreeze_logo.png`
  - Foody: `/images/framer/foody_logo.png`
  - Gamebuddy: `/images/framer/gamebuddy_logo.png`
  - HyperAid: `/images/framer/hyperaid_logo.png`
  - Morker: `/images/framer/morker_logo.png`
  - Ndrey Kitchen: `/images/framer/ndrey_kitchen_logo.png`
  - Ontravel: `/images/framer/ontravel_logo.png`
  - Ousean Pay: `/images/framer/ousenpay_logo.png`
  - Reclas: `/images/framer/reclas_logo.jpg`
  - Roro Jonggrang: `/images/framer/rorojongrang_logo.png`
  - Traspotter: `/images/framer/traspoter_logo.png`
  - Voxplore: `/images/framer/voxplore_logo.png`
- Map certifications to their exact certificate images:
  - Switchfest: `/images/framer/certificate_walisongo.jpg`
  - Techsprint: `/images/framer/certificate_reclas.jpg`
  - Skilvul: `/images/framer/certificated_skilvul.jpg`
  - BuildWithAngga: `/images/framer/certificate_bwa.jpg`
  - LSP Vokasi IPB: `/images/framer/bnsp_ipb.jpg`
  - BNSP SMK: `/images/framer/certificate_bnsp_smk.jpg`
  - PLN Icon Plus: `/images/framer/certificate_iconplus.jpg`
  - IPB Software Engineering: `/images/framer/skl.jpg`
  - MPKMB DDB: `/images/framer/certificate_mpkmb_ddb.jpg`
  - Buatin Creative: `/images/framer/certificate_buatin_kamu.jpg`
  - Ditmawa Mentor: `/images/framer/mentor_poster.jpg`
  - SRD: `/images/framer/certificate_srd.jpg`
  - Udemy: `/images/framer/certificate_udemy.jpg`
  - Dicoding: `/images/framer/certificate_py_dicoding.jpg`
  - MPKMB: `/images/framer/certificate_mpkmb.jpg`
  - Korpolairud: `/images/framer/certificaye_korpolairud.jpg`

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/renamed-assets-existence.test.ts`
Expected: PASS (all assertions true).

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 1: update portfolio types and data with renamed semantic assets?"
Commit: `git add app/types/portfolio.ts app/data/portfolio.ts tests/unit/renamed-assets-existence.test.ts && git commit -m "feat: align portfolio data with renamed semantic assets"`

---

### Task 2: Page Transitions, Micro-Animations & Light Lazy Loading (No Over-Shadow)

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `app/assets/css/main.css`
- Modify: `app/components/molecules/ProjectCard.vue`
- Modify: `app/pages/projects/[slug].vue`
- Modify: `app/pages/projects/index.vue`
- Test: `tests/unit/lazy-loading-and-transitions.test.ts`

**Interfaces:**
- Consumes: Tailwind classes and Nuxt page transition config.
- Produces: Smooth page switching, lazy decoded images, and clean project cards without `hover:shadow-lg`.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/lazy-loading-and-transitions.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Transitions & Lazy Loading', () => {
  it('nuxt.config.ts configures page transitions', () => {
    const config = readFileSync('nuxt.config.ts', 'utf-8')
    expect(config).toContain('pageTransition')
  })

  it('main.css defines page transition styles and keyframes', () => {
    const css = readFileSync('app/assets/css/main.css', 'utf-8')
    expect(css).toContain('.page-enter-active')
    expect(css).toContain('.page-leave-active')
  })

  it('ProjectCard does not use heavy hover:shadow-lg', () => {
    const card = readFileSync('app/components/molecules/ProjectCard.vue', 'utf-8')
    expect(card).not.toContain('hover:shadow-lg')
    expect(card).toContain('loading="lazy"')
    expect(card).toContain('decoding="async"')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/lazy-loading-and-transitions.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement transitions, remove over-shadow, and add lazy loading**

In `nuxt.config.ts`:
Add `pageTransition: { name: 'page', mode: 'out-in' }` to `app`.

In `app/assets/css/main.css`:
Add:
```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
```

In `app/components/molecules/ProjectCard.vue`:
- Replace `hover:shadow-lg` with `hover:border-neutral-400 hover:bg-neutral-50/50` (clean aesthetic, no heavy shadow drop).
- Ensure `<img>` has `loading="lazy"` and `decoding="async"`.

In `app/pages/projects/[slug].vue` and `app/pages/projects/index.vue`:
- Ensure all `<img>` tags have `loading="lazy"` and `decoding="async"`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/lazy-loading-and-transitions.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 2: add page transitions, light lazy loading, and remove over-shadow?"
Commit: `git add nuxt.config.ts app/assets/css/main.css app/components/molecules/ProjectCard.vue app/pages/projects/[slug].vue app/pages/projects/index.vue tests/unit/lazy-loading-and-transitions.test.ts && git commit -m "feat: add page transitions, optimize lazy loading, and remove over-shadow on cards"`

---

### Task 3: Brand Partner Logos Marquee & Showcase Background

**Files:**
- Modify: `app/components/organisms/BrandCarousel.vue`
- Modify: `app/components/organisms/StoriesSection.vue`
- Test: `tests/unit/brand-logos-and-showcase.test.ts`

**Interfaces:**
- Consumes: `BrandPartner[]` from `portfolioData.brands`, `/images/framer/showcase_bg.png`.
- Produces: Seamless logo marquee and immersive background for "More Designs. More Stories."

- [ ] **Step 1: Write the failing test**

Create `tests/unit/brand-logos-and-showcase.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Brand Partner Logos & Showcase Background', () => {
  it('BrandCarousel renders brand logos instead of plain text tags', () => {
    const carousel = readFileSync('app/components/organisms/BrandCarousel.vue', 'utf-8')
    expect(carousel).toContain('brand.logoUrl')
    expect(carousel).toContain('loading="lazy"')
    expect(carousel).toContain(':alt="brand.name"')
  })

  it('StoriesSection renders showcase background image', () => {
    const stories = readFileSync('app/components/organisms/StoriesSection.vue', 'utf-8')
    expect(stories).toContain('/images/framer/showcase_bg.png')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/brand-logos-and-showcase.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement BrandCarousel and StoriesSection**

In `app/components/organisms/BrandCarousel.vue`:
- Accept `brands: BrandPartner[]`.
- Double/triple the list for continuous marquee loop.
- In each item, render a logo badge:
  ```html
  <div class="flex items-center justify-center px-4 py-2 rounded-2xl bg-white border border-neutral-200/80 hover:border-primary/40 transition-colors shadow-2xs h-12 min-w-[120px]">
    <img
      :src="brand.logoUrl"
      :alt="brand.name"
      class="max-h-7 max-w-[100px] object-contain filter grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
      loading="lazy"
      decoding="async"
    />
  </div>
  ```

In `app/components/organisms/StoriesSection.vue`:
- Add the showcase background image `/images/framer/showcase_bg.png` as the feature showcase poster with subtle border and floating badge, or as background with scrim.
- Ensure text contrast is crisp.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/brand-logos-and-showcase.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 3: convert brand partners to authentic logos and add showcase background?"
Commit: `git add app/components/organisms/BrandCarousel.vue app/components/organisms/StoriesSection.vue tests/unit/brand-logos-and-showcase.test.ts && git commit -m "feat: render authentic brand logos in marquee and add showcase background"`

---

### Task 4: Connected Journey Timeline & Award Logos

**Files:**
- Modify: `app/components/organisms/JourneySection.vue`
- Modify: `app/components/molecules/JourneyCard.vue`
- Modify: `app/components/organisms/AwardsSection.vue`
- Modify: `app/components/molecules/AwardCard.vue`
- Test: `tests/unit/timeline-and-award-logos.test.ts`

**Interfaces:**
- Consumes: `milestones: Milestone[]`, `awards: Award[]`.
- Produces: Connected vertical line for journey timeline, authentic organization logos for awards.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/timeline-and-award-logos.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Connected Timeline & Award Logos', () => {
  it('JourneySection contains a continuous timeline track line', () => {
    const section = readFileSync('app/components/organisms/JourneySection.vue', 'utf-8')
    expect(section).toContain('border-l-2')
  })

  it('JourneyCard has milestone node dot and year indicator', () => {
    const card = readFileSync('app/components/molecules/JourneyCard.vue', 'utf-8')
    expect(card).toContain('milestone.year')
    expect(card).toContain('rounded-full')
  })

  it('AwardCard renders organization logo when available', () => {
    const award = readFileSync('app/components/molecules/AwardCard.vue', 'utf-8')
    expect(award).toContain('award.logoUrl')
    expect(award).toContain('loading="lazy"')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/timeline-and-award-logos.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement connected timeline and award logos**

In `app/components/organisms/JourneySection.vue`:
- Wrap milestones in a vertical timeline container with `relative pl-6 sm:pl-8 border-l-2 border-primary/20 space-y-6 sm:space-y-8`.
- Pass index and total count to `JourneyCard.vue`.

In `app/components/molecules/JourneyCard.vue`:
- Add a milestone indicator dot positioned absolutely on the timeline track:
  `<span class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-primary shadow-xs" />`.
- Clean card presentation with role, company, and year badge.

In `app/components/molecules/AwardCard.vue`:
- If `award.logoUrl` exists, render `<img>` with `loading="lazy"` and `decoding="async"` inside the logo container.
- Fallback to star icon if no logo is provided.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/timeline-and-award-logos.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 4: add connected journey timeline and authentic award logos?"
Commit: `git add app/components/organisms/JourneySection.vue app/components/molecules/JourneyCard.vue app/components/organisms/AwardsSection.vue app/components/molecules/AwardCard.vue tests/unit/timeline-and-award-logos.test.ts && git commit -m "feat: add connected journey timeline and organization logos for awards"`

---

### Task 5: Expandable Certifications with Lazy Images & Contact Photo

**Files:**
- Modify: `app/components/molecules/CertificateItem.vue`
- Modify: `app/components/organisms/CertificationsSection.vue`
- Modify: `app/components/organisms/FooterSection.vue`
- Test: `tests/unit/expandable-certifications-and-contact.test.ts`

**Interfaces:**
- Consumes: `certifications: Certification[]`, `profile.avatarUrl`.
- Produces: Interactive expandable certifications list with thumbnails, and Aulia's contact photo.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/expandable-certifications-and-contact.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Expandable Certifications & Contact Photo', () => {
  it('CertificationsSection implements expand/collapse toggle', () => {
    const certSection = readFileSync('app/components/organisms/CertificationsSection.vue', 'utf-8')
    expect(certSection).toContain('isExpanded')
    expect(certSection).toContain('visibleCertifications')
  })

  it('CertificateItem displays certificate image thumbnail', () => {
    const certItem = readFileSync('app/components/molecules/CertificateItem.vue', 'utf-8')
    expect(certItem).toContain('cert.imageUrl')
    expect(certItem).toContain('loading="lazy"')
  })

  it('FooterSection includes photo of Aulia in contact section', () => {
    const footer = readFileSync('app/components/organisms/FooterSection.vue', 'utf-8')
    expect(footer).toContain('/images/framer/aulia.png')
    expect(footer).toContain('loading="lazy"')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/expandable-certifications-and-contact.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement expandable certifications and contact photo**

In `app/components/molecules/CertificateItem.vue`:
- Render certificate thumbnail image:
  ```html
  <div v-if="cert.imageUrl" class="w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
    <img :src="cert.imageUrl" :alt="cert.title" class="w-full h-full object-cover" loading="lazy" decoding="async" />
  </div>
  ```
- Keep title, issuer, and verified badge.

In `app/components/organisms/CertificationsSection.vue`:
- Add `const isExpanded = ref(false)`.
- Computed `visibleCertifications = computed(() => isExpanded.value ? props.certifications : props.certifications.slice(0, 6))`.
- Add an `AppButton` below the grid:
  `{{ isExpanded ? 'Show Less' : `View All Certifications (${certifications.length})` }}` with toggle click handler.

In `app/components/organisms/FooterSection.vue`:
- Add Aulia's portrait photo (`/images/framer/aulia.png`) to the contact section header with `loading="lazy"` and `decoding="async"`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/expandable-certifications-and-contact.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 5: add expandable certifications with lazy images and contact photo?"
Commit: `git add app/components/molecules/CertificateItem.vue app/components/organisms/CertificationsSection.vue app/components/organisms/FooterSection.vue tests/unit/expandable-certifications-and-contact.test.ts && git commit -m "feat: add expandable certifications with thumbnails and Aulia contact photo"`

---

### Task 6: Full Verification with Playwright CLI & Production Build

**Files:**
- Create: `tests/e2e/portfolio-visual-polish-audit.sh`
- Test: End-to-end audit via Playwright CLI, all unit tests, and production build

**Interfaces:**
- Consumes: Dev server at `http://localhost:3000`.
- Produces: Verified DOM assertions, desktop/mobile screenshots, passing test suite.

- [ ] **Step 1: Write `tests/e2e/portfolio-visual-polish-audit.sh`**

Script steps:
1. Open `http://localhost:3000`.
2. Verify brand logos in marquee: `playwright-cli eval "document.querySelectorAll('.animate-marquee img').length"`.
3. Verify journey timeline: `playwright-cli eval "document.querySelectorAll('.border-l-2').length"`.
4. Verify award logos: `playwright-cli eval "document.querySelectorAll('section:has(h2:has-text(\"Awards\")) img').length"`.
5. Verify tools logos: `playwright-cli eval "document.querySelectorAll('section:has(h2:has-text(\"Tools\")) img').length"`.
6. Verify contact photo: `playwright-cli eval "document.querySelector('footer img[alt*=\"Aulia\"]').src"`.
7. Verify certifications expand toggle:
   - Initial count == 6.
   - Click expand button.
   - Expanded count == 16.
8. Capture updated screenshots:
   - `.playwright-cli/polished-desktop.png`
   - `.playwright-cli/polished-mobile.png`
9. Run all unit tests: `bun test`.
10. Run production build: `bun run build`.

- [ ] **Step 2: Run verification script**

Run: `bash tests/e2e/portfolio-visual-polish-audit.sh`
Expected: All checks PASS, build succeeds.

- [ ] **Step 3: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 6: add Playwright CLI visual polish audit script?"
Commit: `git add tests/e2e/portfolio-visual-polish-audit.sh && git commit -m "test: add Playwright CLI verification for visual polish and asset enhancements"`
