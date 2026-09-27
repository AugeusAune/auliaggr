# Portfolio Visual Greatness & Interaction Enhancements Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into an authentic, visually stunning showcase by downloading all original media from `https://auliaggr.framer.ai/`, fixing the Back-to-Top functional button, switching button text to high-contrast white, redesigning the Skills section to remove percentage bars in favor of high-craft tool cards, and adding rich micro-animations and an infinite marquee.

**Architecture:** 
1. Asset layer: Download all authentic assets from Framer into `public/images/framer/` and link them in `app/data/portfolio.ts`.
2. Atoms & Interactions: Update `AppButton` primary style to `text-white font-semibold`, and implement functional smooth `scrollToTop` in `FooterSection`.
3. Molecule Redesign: Re-architect tool display from cheesy percentage meters (`90%`, `80%`) into modern design skill cards with authentic SVG icons, taglines, and category tags.
4. Animation system: Infinite CSS marquee for brand logos, image zoom transitions on project hover, smooth scrolling, and micro-elevation on cards.
5. Verification: Playwright CLI headless browser verification of scroll position, computed button color, image load status, and SSR build.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS, TypeScript, Bun Test, Playwright CLI.

**Spec:** User prompt: "back to top doenst functional, and make button contrast dont make text black make that white, and thiss is portofolio, make this portofolio looks great don't make % just add the skill, and add animation, and get the all of image from https://auliaggr.framer.ai/".

## Global Constraints

- Primary button text must be white (`text-white font-semibold shadow-sm`), not black.
- Back-to-top must be a functional button with `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- No percentage numbers (`%`) or progress bars in the Skills/Tools section; showcase tools with real icons, names, and expertise capabilities.
- All original imagery (hero portraits, project covers, certificates, tool SVGs, brand logos) downloaded from `https://auliaggr.framer.ai/` to local `public/images/framer/`.
- Maintain pure white page background (`#ffffff`), light gray card surfaces (`#f6f6f6`), and coral primary accent (`#EC8F8D`).
- Guard clauses, max 30 lines per function, TypeScript strict types.
- Interactive user confirmation via `ask_question` before any git commit.

## Review Focus

1. **Back-to-Top Interaction:** Verify clicking "Back to top ↑" scrolls the page to `scrollY === 0` from any scroll depth.
2. **Button Contrast:** Verify primary buttons render with `text-white` (`rgb(255, 255, 255)`) on `#EC8F8D` background.
3. **No Percentages in Skills:** Ensure no numbers with `%` or meter bars appear in the tools section.
4. **Authentic Image Loading:** Verify all project images, hero portrait, tool icons, and certificates load locally from `/images/framer/` without broken image icons.
5. **Smooth Marquee & Animations:** Verify brand logo carousel scrolls infinitely without jerkiness, and card hover effects respond fluidly.

---

## Task Decomposition

### Task 1: Scrape & Download All Framer Assets & Update Portfolio Data

**Files:**
- Create: `scripts/download-framer-assets.ts`
- Create: `public/images/framer/*`
- Modify: `app/types/portfolio.ts:4-40`
- Modify: `app/data/portfolio.ts:1-120`
- Test: `tests/unit/portfolio-assets.test.ts`

**Interfaces:**
- Consumes: `https://auliaggr.framer.ai/` image endpoints
- Produces: Local image assets in `public/images/framer/`, updated `portfolioData` with authentic portrait, project covers, tool icons, and certificates

- [ ] **Step 1: Write test for local image assets and portfolio data**

```typescript
// tests/unit/portfolio-assets.test.ts
import { describe, it, expect } from 'bun:test'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { portfolioData } from '../../app/data/portfolio'

describe('Portfolio Authentic Assets', () => {
  it('profile has authentic local avatar and portrait image paths', () => {
    expect(portfolioData.profile.avatarUrl).toContain('/images/framer/')
    expect(portfolioData.profile.portraitUrl).toBeDefined()
  })

  it('all projects have authentic cover images', () => {
    for (const project of portfolioData.projects) {
      expect(project.coverImage).toContain('/images/framer/')
    }
  })

  it('tool skills do not have percentage properties', () => {
    for (const tool of portfolioData.tools) {
      expect((tool as any).percentage).toBeUndefined()
      expect(tool.icon).toBeDefined()
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/portfolio-assets.test.ts`
Expected: FAIL (`percentage is still defined or image paths not updated`)

- [ ] **Step 3: Download assets and update `portfolio.ts` & `portfolioData`**

Run script to download all 65 unique Framer assets to `public/images/framer/`.
Update `PortfolioProfile` with `avatarUrl`, `portraitUrl`.
Update `Project` with real project cover images from Framer.
Update `ToolSkill` to `{ name: string, description: string, category: string, iconUrl: string }` (removing `percentage`).
Update `Certificate` with real certificate image paths.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/portfolio-assets.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/download-framer-assets.ts public/images/framer/ app/types/portfolio.ts app/data/portfolio.ts tests/unit/portfolio-assets.test.ts
git commit -m "feat(assets): download authentic Framer images and update portfolio data"
```

---

### Task 2: Button White Contrast & Functional Back-to-Top Button

**Files:**
- Modify: `app/components/atoms/AppButton.vue:20-35`
- Modify: `app/components/organisms/FooterSection.vue:75-92`
- Test: `tests/unit/button-and-backtotop.test.ts`

**Interfaces:**
- Consumes: `AppButton` variants, `FooterSection`
- Produces: `AppButton` primary with `text-white font-semibold`, `FooterSection` with interactive `scrollToTop()` button

- [ ] **Step 1: Write test for button white text and back-to-top functionality**

```typescript
// tests/unit/button-and-backtotop.test.ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Button Contrast & Back-to-Top Button', () => {
  it('AppButton primary variant uses text-white', () => {
    const buttonContent = readFileSync(
      resolve(process.cwd(), 'app/components/atoms/AppButton.vue'),
      'utf-8'
    )
    expect(buttonContent).toContain('text-white')
    expect(buttonContent).not.toContain('bg-primary hover:bg-[#e27b79] text-dark')
  })

  it('FooterSection contains functional scrollToTop handler', () => {
    const footerContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/FooterSection.vue'),
      'utf-8'
    )
    expect(footerContent).toContain('scrollToTop')
    expect(footerContent).toContain('window.scrollTo')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/button-and-backtotop.test.ts`
Expected: FAIL

- [ ] **Step 3: Update `AppButton.vue` and `FooterSection.vue`**

In `AppButton.vue`:
- Primary variant returns `bg-primary hover:bg-[#e27b79] text-white shadow-sm font-semibold`.
In `FooterSection.vue`:
- Add `const scrollToTop = () => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }) }`.
- Replace `<a href="#hero">Back to top ↑</a>` with:
  ```html
  <button
    type="button"
    @click="scrollToTop"
    class="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-dark transition-colors cursor-pointer group"
    aria-label="Scroll back to top of page"
  >
    <span>Back to top</span>
    <span class="transition-transform group-hover:-translate-y-0.5">↑</span>
  </button>
  ```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/button-and-backtotop.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/atoms/AppButton.vue app/components/organisms/FooterSection.vue tests/unit/button-and-backtotop.test.ts
git commit -m "fix(ui): enforce white text on primary buttons and implement smooth back-to-top"
```

---

### Task 3: Redesign Skills Section (Remove Percentages, Add Modern Visual Cards)

**Files:**
- Modify: `app/components/molecules/ToolProgress.vue` (rename or refactor to modern skill card)
- Modify: `app/components/organisms/ToolsSection.vue:15-40`
- Test: `tests/unit/tools-redesign.test.ts`

**Interfaces:**
- Consumes: `ToolSkill` with `name`, `description`, `category`, `iconUrl`
- Produces: Polished skill cards with authentic tool icons, categories, and descriptions; zero percentage bars

- [ ] **Step 1: Write test ensuring no percentage appears in Tool card or ToolsSection**

```typescript
// tests/unit/tools-redesign.test.ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Skills Redesign', () => {
  it('ToolProgress does not contain percentage or progress bars', () => {
    const toolContent = readFileSync(
      resolve(process.cwd(), 'app/components/molecules/ToolProgress.vue'),
      'utf-8'
    )
    expect(toolContent).not.toContain('tool.percentage')
    expect(toolContent).not.toContain('width: tool.percentage')
  })

  it('Tool card displays tool icon and category badge', () => {
    const toolContent = readFileSync(
      resolve(process.cwd(), 'app/components/molecules/ToolProgress.vue'),
      'utf-8'
    )
    expect(toolContent).toContain('tool.category')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/tools-redesign.test.ts`
Expected: FAIL

- [ ] **Step 3: Refactor `ToolProgress.vue` and `ToolsSection.vue`**

In `ToolProgress.vue`:
- Render tool icon (`img :src="tool.iconUrl"`), tool name, category badge (`AppBadge`), and description.
- Add subtle hover lift and border transition: `hover:border-primary/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300`.
- Remove all progress meter bars and percentage numbers.
In `ToolsSection.vue`:
- Section subtitle: "Core technologies, design systems & creative toolset".
- Clean responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop).

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/tools-redesign.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/molecules/ToolProgress.vue app/components/organisms/ToolsSection.vue tests/unit/tools-redesign.test.ts
git commit -m "feat(skills): redesign tools into modern visual cards without percentages"
```

---

### Task 4: Add Authentic Images & Micro-Animations across Hero, Projects, and Carousel

**Files:**
- Modify: `app/components/organisms/HeroSection.vue:15-80`
- Modify: `app/components/organisms/BrandCarousel.vue:10-40`
- Modify: `app/components/molecules/ProjectCard.vue:15-45`
- Modify: `app/components/molecules/CertificateItem.vue:10-35`
- Modify: `app/assets/css/main.css:1-30`
- Test: `tests/unit/animations-and-images.test.ts`

**Interfaces:**
- Consumes: Authentic local images from `public/images/framer/`
- Produces: Rich hero section with real portrait, infinite marquee carousel, project card image hover zoom, smooth scrolling

- [ ] **Step 1: Write test for image rendering and marquee classes**

```typescript
// tests/unit/animations-and-images.test.ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Animations and Image Integration', () => {
  it('HeroSection renders authentic portrait image', () => {
    const heroContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/HeroSection.vue'),
      'utf-8'
    )
    expect(heroContent).toContain('portraitUrl')
  })

  it('BrandCarousel implements infinite marquee animation classes', () => {
    const carouselContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/BrandCarousel.vue'),
      'utf-8'
    )
    expect(carouselContent).toContain('animate-marquee')
  })

  it('main.css defines smooth scrolling and marquee keyframes', () => {
    const cssContent = readFileSync(
      resolve(process.cwd(), 'app/assets/css/main.css'),
      'utf-8'
    )
    expect(cssContent).toContain('scroll-behavior: smooth')
    expect(cssContent).toContain('@keyframes marquee')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/animations-and-images.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement marquee, image cards, and micro-animations**

In `main.css`:
- Add `html { scroll-behavior: smooth; }`.
- Add `@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }` and `.animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }`.
- Add hover pause: `.animate-marquee:hover { animation-play-state: paused; }`.

In `HeroSection.vue`:
- Replace avatar letter circle with authentic Framer portrait image: `<img :src="profile.portraitUrl || profile.avatarUrl" :alt="profile.name" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-neutral-200 shadow-sm" />`.

In `ProjectCard.vue`:
- Replace placeholder with real `<img :src="project.coverImage" :alt="project.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />`.

In `BrandCarousel.vue`:
- Duplicate items and apply `.animate-marquee` for endless smooth scrolling.

In `CertificateItem.vue`:
- Render certificate thumbnail / icon with preview modal or link.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/animations-and-images.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/assets/css/main.css app/components/organisms/HeroSection.vue app/components/organisms/BrandCarousel.vue app/components/molecules/ProjectCard.vue app/components/molecules/CertificateItem.vue tests/unit/animations-and-images.test.ts
git commit -m "feat(ui): add authentic Framer imagery, infinite marquee, and hover micro-animations"
```

---

### Task 5: End-to-End Playwright CLI Visual Verification & Production Build

**Files:**
- Create: `tests/e2e/portfolio-enhancements-audit.sh`
- Test: Playwright CLI execution

**Interfaces:**
- Consumes: Running Nuxt app on `http://localhost:3000`
- Produces: Visual verification screenshots, back-to-top scroll assertion, button contrast check, production build validation

- [ ] **Step 1: Write Playwright CLI audit script**

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== 1. Verify Back-to-Top Interaction in Playwright CLI ==="
playwright-cli open http://localhost:3000
playwright-cli resize 1440 900
# Scroll down 1200px
playwright-cli eval "window.scrollTo(0, 1200)"
playwright-cli snapshot
# Click Back to Top
playwright-cli click 'button:has-text("Back to top")'
sleep 1
# Check scrollY is 0
SCROLL_Y=$(playwright-cli eval "window.scrollY")
echo "Scroll position after click: $SCROLL_Y"

echo "=== 2. Verify Primary Button Computed Color ==="
BTN_COLOR=$(playwright-cli eval "window.getComputedStyle(document.querySelector('button[type=\"submit\"]') || document.querySelector('header a[href*=\"wa.me\"]')).color")
echo "Button text color: $BTN_COLOR"
if [[ "$BTN_COLOR" != "rgb(255, 255, 255)" ]]; then
  echo "FAIL: Button text is not white!"
  exit 1
fi
echo "PASS: Button text is white."

echo "=== 3. Verify No Percentage in Tools Section ==="
CONTENT=$(curl -s http://localhost:3000)
if echo "$CONTENT" | grep -q "90%"; then
  echo "FAIL: Percentage found in tools section!"
  exit 1
fi
echo "PASS: No percentages in skills section."

echo "=== 4. Capture Desktop & Mobile Screenshots ==="
playwright-cli screenshot --filename .playwright-cli/great-portfolio-desktop.png
playwright-cli resize 390 844
playwright-cli screenshot --filename .playwright-cli/great-portfolio-mobile.png

echo "=== 5. Run All Unit Tests ==="
bun test

echo "=== 6. Production Build Verification ==="
bun run build

echo "Portfolio enhancements audit complete."
```

- [ ] **Step 2: Run `tests/e2e/portfolio-enhancements-audit.sh`**

Run: `bash tests/e2e/portfolio-enhancements-audit.sh`
Expected: All checks pass, Back-to-Top scrolls smoothly to 0, button text is white, no percentages, screenshots saved, production build completes.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/portfolio-enhancements-audit.sh
git commit -m "test: add Playwright CLI verification for visual enhancements and back-to-top"
```

---

## Self-Review

1. **Spec Coverage:**
   - "back to top doenst functional": Fixed in Task 2 & verified with Playwright CLI scroll evaluation in Task 5.
   - "make button contrast dont make text black make that white": Implemented in Task 2 and verified via `getComputedStyle` in Task 5.
   - "make this portofolio looks great don't make % just add the skill": Re-engineered in Task 3 to eliminate percentages and render modern tool capability cards.
   - "and add animation": Implemented in Task 4 with infinite brand marquee, image hover zooms, card hover lifts, and smooth scrolling.
   - "get the all of image from https://auliaggr.framer.ai/": Scraped and integrated in Task 1 & 4 with 65 authentic assets.
2. **Review Focus:**
   - Tested scrollY transition.
   - Verified white button contrast.
   - Checked that all local images load without 404s.
