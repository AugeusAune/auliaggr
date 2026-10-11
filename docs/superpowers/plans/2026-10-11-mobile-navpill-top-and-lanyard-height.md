# Mobile NavPill Top Positioning & Lanyard Strap Height Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Position the floating `NavPill` navigation fixed at the top of the viewport across all viewports (mobile and desktop), keep the hero section at natural content height (not 100dvh), retain the compact lanyard ribbon strap, and elongate the lanyard card container on mobile to provide an authentic, spacious vertical ID badge proportion.

**Architecture:**
- In [app/layouts/default.vue](file:///home/farhan/program/bun/awull-porto/app/layouts/default.vue), switch the `<header>` container positioning classes to `fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto`.
- In [app/components/organisms/HeroSection.vue](file:///home/farhan/program/bun/awull-porto/app/components/organisms/HeroSection.vue), keep the hero section at natural height (`pt-16 sm:pt-20 pb-12 sm:pb-16`), maintain the clean compact ribbon (`h-8 sm:h-10`), and elongate the ID card container on mobile (`min-h-[540px] sm:min-h-0 pt-6 pb-7 sm:pt-5 sm:pb-6 justify-between`).
- In [app/pages/projects/index.vue](file:///home/farhan/program/bun/awull-porto/app/pages/projects/index.vue) and [app/pages/projects/[slug].vue](file:///home/farhan/program/bun/awull-porto/app/pages/projects/%5Bslug%5D.vue), adjust top container padding (`pt-20 sm:pt-24`) so back navigation links and headers are never obstructed by the top-mounted NavPill.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS, Bun runtime.

**Spec:** User request: "ubah, bukan strapnyayang dibuat panjang tapi card lanyardnya dibuat lebih panjangn dimobile, dan height dari section jangan dibuat 100dvh" conforming to [.agents/rules/engineering-standards.md](file:///home/farhan/program/bun/awull-porto/.agents/rules/engineering-standards.md).

---

## Global Constraints

- **SSR Safety**: Use responsive Tailwind utility classes (`top-3.5 sm:top-5`, `min-h-[540px] sm:min-h-0`) rather than client-only JS logic ([nuxt4-patterns](file:///home/farhan/program/bun/awull-porto/.agents/skills/nuxt4-patterns/SKILL.md)).
- **Touch Target & Accessibility**: Maintain $\ge 44 \times 44\text{ px}$ touch target areas and clear spacing between interactive controls.
- **Visual Polish**: Preserve the concentric radiuses and subtle shadows ([make-interfaces-feel-better](file:///home/farhan/program/bun/awull-porto/.agents/skills/make-interfaces-feel-better/SKILL.md)).
- **Git Commit Workflow**: Never commit automatically without user confirmation via `ask_question`.
- **Build Prohibition**: Do NOT run `bun run build`.

---

## Tasks

### Task 1: Elongate Lanyard Card on Mobile & Keep Natural Section Height

**Files:**
- Modify: [app/components/organisms/HeroSection.vue](file:///home/farhan/program/bun/awull-porto/app/components/organisms/HeroSection.vue:15-50)

- [x] **Step 1: Keep natural HeroSection height with top clearance**
  In `HeroSection.vue`, set the header container to natural height with `pt-16 sm:pt-20 pb-12 sm:pb-16` (no 100dvh).
- [x] **Step 2: Maintain compact lanyard strap**
  Retain the clean, authentic ribbon height (`h-8 sm:h-10`) with stitch lines and clamp clip.
- [x] **Step 3: Elongate lanyard card on mobile**
  Set the card container to `min-h-[540px] sm:min-h-0 pt-6 pb-7 sm:pt-5 sm:pb-6 justify-between` on mobile, giving the ID badge generous vertical proportions and breathing room.

---

### Task 2: Reposition NavPill to Fixed Top in default.vue

**Files:**
- Modify: [app/layouts/default.vue](file:///home/farhan/program/bun/awull-porto/app/layouts/default.vue:14-20)

- [x] **Step 1: Update header placement classes**
  In `default.vue`, update `<header>` to position at the top across all viewports:
  ```html
  <!-- Floating Navigation Pill Fixed at Top -->
  <header
    class="fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
  >
    <NavPill />
  </header>
  ```
- [x] **Step 2: Adjust main layout bottom padding**
  Ensure `<main>` has balanced padding (`pb-10`) without excessive bottom whitespace.

---

### Task 3: Adjust Top Padding on Subpages for Top NavPill Clearance

**Files:**
- Modify: [app/pages/projects/index.vue](file:///home/farhan/program/bun/awull-porto/app/pages/projects/index.vue:43-54)
- Modify: [app/pages/projects/[slug].vue](file:///home/farhan/program/bun/awull-porto/app/pages/projects/%5Bslug%5D.vue:34-43)

- [x] **Step 1: Update `app/pages/projects/index.vue` header padding**
  Adjust the header top padding from `pt-8 sm:pt-16` to `pt-20 sm:pt-16` so the back link clears the top NavPill on mobile.
- [x] **Step 2: Update `app/pages/projects/[slug].vue` breadcrumb padding**
  Adjust the breadcrumb container top padding from `pt-6 sm:pt-10` to `pt-20 sm:pt-10`.

---

### Task 4: Responsive Verification & Interactive Git Confirmation

- [ ] **Step 1: Verify on mobile (375px/390px) and desktop (1200px) viewports**
- [ ] **Step 2: Verify zero SSR hydration warnings or build errors**
- [ ] **Step 3: Prompt user via `ask_question` for git commit confirmation**
- [ ] **Step 4: Commit changes upon user approval**
