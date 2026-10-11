# Journey Timeline & Milestone Card Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the career journey timeline in `JourneySection.vue` and `JourneyCard.vue` to adopt the structured layout from the reference design (`ui/project_ui.png`)—including spine index numbering (`01`, `02`, etc.), logo with company eyebrow and prominent role title, calendar date range with active status badge, skill tags pill list, and key achievement callout—while preserving the site's default light theme (coral primary, white/light cards, and accessible neutral contrast).

**Architecture:**
- **Data Layer (`app/types/portfolio.ts` & `app/data/portfolio.ts`):** Extend `Milestone` interface backwards-compatibly with optional `index?: string`, `period?: string`, `skills?: string[]`, and `highlight?: string`. Enrich each milestone in `journeyData`.
- **Molecule Component (`app/components/molecules/JourneyCard.vue`):** Restructure into the modern 5-tier card layout:
  1. Timeline spine connector & numeric badge (*01*, *02*).
  2. Company logo + eyebrow company name + bold role title.
  3. Date range row with calendar icon and "Present" badge.
  4. Skill tags pill list with tag/ribbon icon.
  5. Key achievement callout (with icon) and descriptive narrative body.
- **Organism Component (`app/components/organisms/JourneySection.vue`):** Ensure responsive vertical spine track, scroll-driven progress line, and clean alignment across mobile (`<640px`) and desktop viewports.
- **Theme Fidelity:** Retain the site's default light design system (`bg-white`, `border-neutral-200`, `primary: #EC8F8D`, `text-dark: #171717`) rather than the dark theme in the reference mockup.

**Tech Stack:** Nuxt 4, Vue 3 (`<script setup lang="ts">`), TypeScript, Tailwind CSS, Bun.

**Spec Reference:**
- Visual layout: `ui/project_ui.png` (structural layout: spine index, company/role hierarchy, date range, tech pills, achievement highlight).
- Theme: Current site default light theme (`tailwind.config.ts`, coral primary `#EC8F8D`, neutral borders, white/light backgrounds).

---

## Global Constraints

- **Theme Constraint:** Do NOT adopt dark mode from `ui/project_ui.png`; maintain the site's signature coral `#EC8F8D`, white card backgrounds, and neutral typography.
- **Git Commit Workflow:** Never commit automatically without user confirmation via the interactive `ask_question` tool.
- **Code Standards:**
  - TypeScript interfaces with strict typing and immutability defaults.
  - Functions under 30 lines (maximum 50).
  - Guard clauses for early exits; maximum 2 nesting levels.
  - Descriptive camelCase variable and function names.
- **Nuxt 4 / SSR Safety:**
  - Deterministic SSR rendering; scroll listeners and DOM rect queries strictly encapsulated in `onMounted` / `onUnmounted`.
  - Accessible semantic markup (`<section>`, `<article>`, `<time>`).
  - Zero hydration mismatches between SSR and client output.
- **Build Quality:** All modifications must pass `bun run build` with zero errors.

---

## Review Focus

1. **Theme Consistency:** Confirm cards use `bg-white`, `border-neutral-200`, and `text-dark`—no dark mode or uncurated background colors from the screenshot.
2. **Mobile Responsiveness:** Ensure the timeline spine, numeric indicator (`01`), skill pills, and content wrap cleanly without horizontal overflow on small mobile screens (320px–400px).
3. **Data Backwards Compatibility:** Ensure existing milestone data without new optional fields (`skills`, `highlight`, `period`) renders gracefully without blank voids or broken layouts.
4. **Scroll Activation Precision:** Verify the scroll-driven illuminated timeline line and active state highlighting on `JourneyCard` stay synchronized.
5. **Accessibility & Contrast:** Ensure all text, tags, and status dots meet WCAG AA contrast standards (>4.5:1 for body, >3:1 for large text/badges).

---

### Task 1: Extend Milestone Data Model & Enrich Career Journey Data

**Files:**
- Modify: `app/types/portfolio.ts:19-25`
- Modify: `app/data/portfolio.ts:259-295`

**Interfaces:**
- Updates: `Milestone` interface with optional `period?: string`, `skills?: string[]`, and `highlight?: string`.
- Produces: Rich milestone objects in `journeyData` matching the career history of the portfolio owner.

- [x] **Step 1: Update `Milestone` interface in `app/types/portfolio.ts`**

Add optional fields to `Milestone`:
```typescript
export interface Milestone {
  role: string
  company: string
  year: string
  period?: string
  logoUrl?: string
  skills?: string[]
  highlight?: string
  description?: string
}
```

- [x] **Step 2: Enrich `journeyData` in `app/data/portfolio.ts`**

Update the milestone entries with specific periods (e.g. `'2025 — Present'`), skill tags (e.g. `['Figma', 'Design System', 'Tailwind']`), and achievement highlights (e.g. `'Trained 40+ design students with 95% project completion rate'`).

- [x] **Step 3: Verify TypeScript compilation**

(Skipped build step per user request "don't build that")

---

### Task 2: Redesign `JourneyCard.vue` with 5-Tier Layout & Timeline Spine Index

**Files:**
- Modify: `app/components/molecules/JourneyCard.vue`

**Interfaces:**
- Props: `milestone: Milestone`, `index: number`, `isActive?: boolean`
- Emits / Slots: None (presentational molecule)

- [x] **Step 1: Update props definition in `JourneyCard.vue`**

Add `index: number` to `Props` in `JourneyCard.vue` so each card can format its two-digit sequence index (`01`, `02`, etc.) on the spine or header.

- [x] **Step 2: Implement modern timeline anchor & index break**

Incorporate the index indicator (*01*, *02*, etc.):
- Positioned on or adjacent to the timeline spine with an elegant italicized font (`font-serif italic text-sm sm:text-base font-semibold text-neutral-400 group-hover:text-primary transition-colors`).
- Concentric active milestone dot aligned with the spine line.

- [x] **Step 3: Build the 5-tier card content structure**

1. **Header Row:**
   - Company logo container (rounded-xl with border and subtle shadow).
   - Eyebrow text for company name (`text-xs font-semibold text-primary uppercase tracking-wider`).
   - Role title (`text-base sm:text-lg font-bold text-dark tracking-tight leading-snug`).
2. **Date & Status Row:**
   - Calendar SVG icon + period text (e.g. `2025 — Present`).
   - If period contains "Present", highlight with `text-emerald-600 font-semibold` and small pulsing emerald dot.
3. **Skill Tags Row:**
   - Ribbon/tag SVG icon.
   - Flex-wrap container of light neutral pill badges (`bg-neutral-100 border border-neutral-200/80 text-neutral-700 text-[11px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full`).
4. **Key Achievement Callout:**
   - Megaphone/announcement SVG icon.
   - Bold highlight text (`text-xs sm:text-sm font-semibold text-dark leading-snug`).
5. **Narrative Description:**
   - Description text (`text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed`).

- [x] **Step 4: Style with site's default light theme**

- Container classes: `bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-300`.
- Active state: `border-primary/40 shadow-xs ring-1 ring-primary/20`.

- [x] **Step 5: Verify component syntax and SSR safety**

(Skipped build step per user request "don't build that")

---

### Task 3: Update `JourneySection.vue` Integration & Timeline Alignment

**Files:**
- Modify: `app/components/organisms/JourneySection.vue`

**Interfaces:**
- Pass `:index="idx + 1"` to `JourneyCard`.
- Tune vertical timeline spine padding, trigger height, and active node detection.

- [x] **Step 1: Pass index prop to `JourneyCard` in `JourneySection.vue`**

Update `v-for`:
```vue
<JourneyCard
  v-for="(item, idx) in milestones"
  :key="`${item.company}-${item.year}`"
  :ref="(el) => setCardRef(el, idx)"
  :milestone="item"
  :index="idx + 1"
  :is-active="isMilestoneActive(idx)"
/>
```

- [x] **Step 2: Adjust spine track spacing and left padding**

Ensure the vertical track (`w-[3px] bg-neutral-200` and animated `bg-primary`) aligns precisely with the new card anchor and numeric index on mobile (`pl-8`) and desktop (`pl-12`).

- [x] **Step 3: Verify scroll progress calculations**

Validate that `calculateScrollProgress()` accurately detects milestone activation with the updated card heights.

---

### Task 4: Responsive Verification & Visual Polish

**Files:**
- Inspect: `app/components/organisms/JourneySection.vue`
- Inspect: `app/components/molecules/JourneyCard.vue`

- [ ] **Step 1: Run production build check**

Run: `bun run build`
Expected: Nitro and Vite build succeed with zero errors.

- [ ] **Step 2: Responsive viewport verification**

Check layout at:
- Mobile viewport: 375px (iPhone SE/mini width).
- Tablet viewport: 768px.
- Desktop viewport: 1200px.
Verify no horizontal overflow, correct tag wrapping, and crisp alignment.

- [ ] **Step 3: Request user review and commit confirmation**

Interactively prompt the user using `ask_question` before making any git commit.
