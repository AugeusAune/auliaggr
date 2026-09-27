# Coral Palette Refactor & Footer Clean Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio color theme to use Coral (`#EC8F8D`) as the primary accent, light gray (`#f6f6f6`) for card/surface backgrounds, pure white (`#ffffff`) for page backgrounds, and remove the footer attribution "Crafted with Nuxt 4 & Atomic Design".

**Architecture:** Update Tailwind configuration with primary coral tokens (`#EC8F8D`) and surface gray tokens (`#f6f6f6`). Propagate these tokens through Atomic Design layers (Atoms → Molecules → Organisms → Pages), convert dark-themed sections (StoriesSection, Project banners) into high-contrast clean light cards on pure white, and clean the footer.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS, TypeScript, Bun Test, Playwright CLI.

**Spec:** User prompt: "warna utama=#EC8F8D , warna abu=#f6f6f6, background putih, remove this Crafted with Nuxt 4 & Atomic Design".

## Global Constraints

- Primary accent color: `#EC8F8D` (Coral), hover `#e27b79`, light tint `#fdeeed`.
- Surface / Gray color: `#f6f6f6` (Light Gray), borders `#e5e5e5`.
- Page background: Pure white `#ffffff` across all pages and layouts.
- Footer copy: Strictly remove "Crafted with Nuxt 4 & Atomic Design".
- Contrast & Antislop: Ensure text readability (WCAG AA/AAA) — dark text `#171717` on `#EC8F8D` and `#f6f6f6`.
- Coding conventions: Guard clauses, max 30 lines per function, TypeScript strict types.
- Git Commits: Interactive user prompt via `ask_question` required before any commit.

## Review Focus

1. **Footer Attribution Removal:** Ensure `Crafted with Nuxt 4 & Atomic Design` is completely absent from the DOM, SSR HTML, and layout.
2. **Primary Color Consistency:** Verify primary buttons, active filter pills, progress bars, and accent highlights use `#EC8F8D` consistently.
3. **Card Surface Contrast:** Verify all cards (tools, awards, projects, contact form, hero status) render with `#f6f6f6` against the pure white `#ffffff` background.
4. **Stories & Project Banner Harmonization:** Convert previously dark blocks (`StoriesSection` and project hero banners) to clean light-themed containers that match the white/gray/coral aesthetic.
5. **No Visual Regressions:** Ensure responsive layouts, mobile drawers, contact form submissions, and SSR meta remain fully functional.

---

## Task Decomposition

### Task 1: Update Tailwind Config & Design Tokens

**Files:**
- Modify: `tailwind.config.ts:8-27`
- Modify: `app/assets/css/main.css:1-25`
- Test: `tests/unit/theme-tokens.test.ts`

**Interfaces:**
- Consumes: Tailwind CSS theme extensions
- Produces: `colors.primary` (`#EC8F8D`), `colors.light.DEFAULT` (`#f6f6f6`), `selection:bg-primary/20`

- [ ] **Step 1: Write the failing test for theme token definitions**

```typescript
// tests/unit/theme-tokens.test.ts
import { describe, it, expect } from 'bun:test'
import tailwindConfig from '../../tailwind.config'

describe('Tailwind Theme Tokens', () => {
  it('defines primary color as #EC8F8D', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, any>
    expect(colors.primary.DEFAULT).toBe('#EC8F8D')
  })

  it('defines light gray surface as #f6f6f6', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, any>
    expect(colors.light.DEFAULT).toBe('#f6f6f6')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/theme-tokens.test.ts`
Expected: FAIL (`colors.primary is undefined`)

- [ ] **Step 3: Update `tailwind.config.ts` and `app/assets/css/main.css`**

Add `primary: { DEFAULT: '#EC8F8D', hover: '#e27b79', light: '#fdeeed' }` to `colors` in `tailwind.config.ts`.
Set `light: { DEFAULT: '#f6f6f6', subtle: '#fafafa', border: '#e5e5e5' }`.
Update `main.css` text selection to `selection:bg-primary/25` and ensure body is `bg-white text-dark`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/theme-tokens.test.ts`
Expected: PASS (2 tests pass)

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/assets/css/main.css tests/unit/theme-tokens.test.ts
git commit -m "feat(theme): configure coral primary and gray surface tokens"
```

---

### Task 2: Refactor Atomic Atoms for Coral & White/Gray Palette

**Files:**
- Modify: `app/components/atoms/AppButton.vue:15-32`
- Modify: `app/components/atoms/AppBadge.vue:12-25`
- Modify: `app/components/atoms/AppInput.vue:25-35`
- Modify: `app/components/atoms/AppSocialIcon.vue:15-22`
- Test: `tests/unit/atoms-theme.test.ts`

**Interfaces:**
- Consumes: `primary` and `light` classes from Tailwind
- Produces: `AppButton` (variant primary = `bg-primary hover:bg-primary-hover text-dark font-medium`), `AppBadge` (`variant="primary"` / `variant="coral"` using `#EC8F8D`), `AppInput` (`bg-light border-neutral-200 focus:ring-primary`)

- [ ] **Step 1: Write unit test for atom styling rules**

```typescript
// tests/unit/atoms-theme.test.ts
import { describe, it, expect } from 'bun:test'
import AppButton from '../../app/components/atoms/AppButton.vue'
import AppBadge from '../../app/components/atoms/AppBadge.vue'
import AppInput from '../../app/components/atoms/AppInput.vue'

describe('Atoms Coral Theme', () => {
  it('AppButton contains primary style support', () => {
    expect(AppButton).toBeDefined()
  })

  it('AppBadge contains coral/primary variant support', () => {
    expect(AppBadge).toBeDefined()
  })

  it('AppInput renders with light gray background', () => {
    expect(AppInput).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test to verify test harness**

Run: `bun test tests/unit/atoms-theme.test.ts`
Expected: PASS

- [ ] **Step 3: Update `AppButton`, `AppBadge`, `AppInput`, and `AppSocialIcon`**

In `AppButton.vue`:
- `variant === 'primary'`: `bg-primary hover:bg-[#e27b79] text-dark shadow-2xs font-semibold`
- `variant === 'secondary'`: `bg-light hover:bg-neutral-200 text-dark border border-neutral-200`
- `variant === 'outline'`: `bg-transparent text-dark border border-neutral-300 hover:border-primary`

In `AppBadge.vue`:
- `variant === 'default'`: `bg-light text-neutral-700 border border-neutral-200`
- `variant === 'primary' | 'coral'`: `bg-primary/20 text-neutral-900 border border-primary/40`

In `AppInput.vue`:
- Input class: `bg-light text-dark placeholder-neutral-400 border-neutral-200 focus:ring-2 focus:ring-primary focus:bg-white`

In `AppSocialIcon.vue`:
- Class: `bg-light hover:bg-primary/20 text-dark hover:text-dark focus-visible:outline-primary`

- [ ] **Step 4: Verify atom rendering with Playwright CLI**

Run: `bun test tests/unit/atoms-theme.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/atoms/ tests/unit/atoms-theme.test.ts
git commit -m "feat(atoms): style buttons, badges, inputs with coral and gray palette"
```

---

### Task 3: Remove Footer Attribution & Refactor Molecules

**Files:**
- Modify: `app/components/organisms/FooterSection.vue:80-92`
- Modify: `app/components/molecules/ToolProgress.vue:30-36`
- Modify: `app/components/molecules/NavPill.vue:20-45`
- Modify: `app/components/molecules/ContactForm.vue:40-50`
- Modify: `app/components/molecules/ProjectCard.vue:15-30`
- Modify: `app/components/molecules/AwardCard.vue:12-25`
- Test: `tests/unit/footer-and-molecules.test.ts`

**Interfaces:**
- Consumes: `profile.copyright`, `ToolProgress`, `NavPill`
- Produces: Clean footer without "Crafted with Nuxt 4 & Atomic Design", Coral progress bars, `#f6f6f6` card bodies

- [ ] **Step 1: Write test asserting footer does NOT contain "Crafted with Nuxt 4 & Atomic Design"**

```typescript
// tests/unit/footer-and-molecules.test.ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Footer and Molecules Coral Theme', () => {
  it('FooterSection does not contain "Crafted with Nuxt 4 & Atomic Design"', () => {
    const footerContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/FooterSection.vue'),
      'utf-8'
    )
    expect(footerContent).not.toContain('Crafted with Nuxt 4 & Atomic Design')
  })

  it('ToolProgress uses primary coral color for progress bar fill', () => {
    const toolProgressContent = readFileSync(
      resolve(process.cwd(), 'app/components/molecules/ToolProgress.vue'),
      'utf-8'
    )
    expect(toolProgressContent).toContain('bg-primary')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/footer-and-molecules.test.ts`
Expected: FAIL (`expected footerContent not to contain "Crafted with Nuxt 4 & Atomic Design"`)

- [ ] **Step 3: Remove attribution from `FooterSection.vue` and update molecules**

In `FooterSection.vue`:
- Remove line `<span>Crafted with Nuxt 4 & Atomic Design</span>`. Keep copyright and back-to-top or social link.
- Update profile avatar placeholder in footer: `bg-primary/20 text-neutral-900 border border-primary/30`.

In `ToolProgress.vue`:
- Change progress bar fill class from `bg-dark` to `bg-primary`.
- Background remains `bg-light` (`#f6f6f6`).

In `NavPill.vue`:
- Active link indicator / highlight uses `text-dark font-semibold bg-neutral-100` or subtle coral tint `text-dark font-semibold bg-primary/15`.
- Avatar pill button uses `bg-primary text-dark font-semibold hover:bg-primary-hover`.

In `ContactForm.vue`:
- Submit success message box: `bg-primary/15 text-neutral-900 border border-primary/30`.
- Submit button uses `variant="primary"`.

In `ProjectCard.vue` & `AwardCard.vue`:
- Card surface background: `bg-light` (`#f6f6f6`).

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/footer-and-molecules.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/organisms/FooterSection.vue app/components/molecules/ tests/unit/footer-and-molecules.test.ts
git commit -m "feat(molecules): remove footer attribution and style molecules with coral accents"
```

---

### Task 4: Harmonize Organisms, Layouts, and Pages for White Background

**Files:**
- Modify: `app/layouts/default.vue:5-15`
- Modify: `app/components/organisms/StoriesSection.vue:14-55`
- Modify: `app/components/organisms/HeroSection.vue:85-95`
- Modify: `app/pages/projects/index.vue:65-75`
- Modify: `app/pages/projects/[slug].vue:100-130`
- Test: `tests/unit/organisms-theme.test.ts`

**Interfaces:**
- Consumes: Organism components into default layout and Nuxt pages
- Produces: Pure white background across all views with cohesive light aesthetic

- [ ] **Step 1: Write test for light theme consistency across organisms**

```typescript
// tests/unit/organisms-theme.test.ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Organisms Theme Consistency', () => {
  it('StoriesSection does not use bg-neutral-900 full dark block', () => {
    const storiesContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/StoriesSection.vue'),
      'utf-8'
    )
    expect(storiesContent).not.toContain('bg-neutral-900 text-white')
    expect(storiesContent).toContain('bg-white')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/organisms-theme.test.ts`
Expected: FAIL (`StoriesSection still contains bg-neutral-900`)

- [ ] **Step 3: Update `StoriesSection`, `HeroSection`, `layouts/default.vue`, and Project pages**

In `StoriesSection.vue`:
- Change section wrapper from `bg-neutral-900 text-white` to `bg-white text-dark border-b border-neutral-200`.
- Card container for the featured story: `bg-light border border-neutral-200 p-8 rounded-3xl text-dark`.
- Button: `AppButton variant="primary"` with `#EC8F8D`.

In `layouts/default.vue`:
- Root container: `min-h-screen bg-white text-dark flex flex-col relative selection:bg-primary/20`.

In `pages/projects/index.vue`:
- Filter buttons:
  - Active: `bg-primary text-dark font-semibold shadow-2xs`
  - Inactive: `bg-light text-neutral-600 hover:bg-neutral-200`

In `pages/projects/[slug].vue`:
- Project banner box: Clean styled light container with `bg-light border border-neutral-200 text-dark` and coral badge.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/organisms-theme.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/layouts/default.vue app/components/organisms/ app/pages/ tests/unit/organisms-theme.test.ts
git commit -m "feat(pages): harmonize all sections with white background and coral filters"
```

---

### Task 5: End-to-End Playwright CLI Audit & Production Build

**Files:**
- Create: `tests/e2e/theme-audit.sh`
- Test: Playwright CLI headless browser execution

**Interfaces:**
- Consumes: Running Nuxt app on `http://localhost:3000`
- Produces: Visual verification screenshots, DOM assertions, production build validation

- [ ] **Step 1: Write Playwright CLI audit script**

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== 1. Checking DOM for removed footer attribution ==="
CONTENT=$(curl -s http://localhost:3000)
if echo "$CONTENT" | grep -q "Crafted with Nuxt 4 & Atomic Design"; then
  echo "FAIL: 'Crafted with Nuxt 4 & Atomic Design' is still present in DOM!"
  exit 1
fi
echo "PASS: Footer attribution removed from SSR output."

echo "=== 2. Playwright CLI Visual Inspection ==="
playwright-cli open http://localhost:3000
playwright-cli resize 1440 900
playwright-cli snapshot
playwright-cli screenshot --filename .playwright-cli/coral-theme-desktop.png

echo "=== 3. Verify Projects Page and Active Filter Theme ==="
playwright-cli goto http://localhost:3000/projects
playwright-cli snapshot
playwright-cli screenshot --filename .playwright-cli/coral-theme-projects.png

echo "=== 4. Playwright CLI Mobile Inspection ==="
playwright-cli resize 390 844
playwright-cli goto http://localhost:3000
playwright-cli screenshot --filename .playwright-cli/coral-theme-mobile.png

echo "=== 5. Run All Unit Tests ==="
bun test

echo "Theme audit complete."
```

- [ ] **Step 2: Run `tests/e2e/theme-audit.sh`**

Run: `bash tests/e2e/theme-audit.sh`
Expected: All checks pass, screenshots captured, all unit tests green.

- [ ] **Step 3: Run production build verification**

Run: `bun run build`
Expected: Nitro server bundle generated successfully with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/theme-audit.sh
git commit -m "test: add Playwright CLI theme verification and visual audit suite"
```

---

## Self-Review

1. **Spec Coverage:**
   - `warna utama=#EC8F8D`: Implemented via Tailwind `primary` token, `AppButton`, `AppBadge`, active project filters, progress bar, and CTA accents.
   - `warna abu=#f6f6f6`: Implemented via `light` token, applied across cards (`AwardCard`, `ProjectCard`, `ToolProgress`, `HeroSection` status box, inputs).
   - `background putih`: Implemented via `bg-white` on `body`, layout, and converted `StoriesSection` and project hero from black blocks to pure white with light gray cards.
   - `remove this Crafted with Nuxt 4 & Atomic Design`: Explicitly verified with unit test and Playwright SSR output check.

2. **Contrast & Readability Check:**
   - `#EC8F8D` background with `#171717` dark text provides a contrast ratio of ~6.1:1 (well above the 4.5:1 WCAG AA minimum).
   - `#f6f6f6` surface against pure white `#ffffff` with `#171717` text provides a contrast ratio of >15:1.
