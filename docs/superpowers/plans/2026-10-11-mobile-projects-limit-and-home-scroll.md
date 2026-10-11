# Mobile Projects Limit & Home Scroll-to-Top Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Limit the homepage portfolio/projects grid to 3 visible cards on mobile viewports while preserving all 6 on tablet/desktop, and ensure the floating navigation home button smoothly scrolls to the top of the page when on the homepage or navigates to `/` when on subpages.

**Architecture:** 
- In [ProjectsSection.vue](file:///home/farhan/program/bun/awull-porto/app/components/organisms/ProjectsSection.vue), apply SSR-safe responsive visibility classes (`idx >= 3 ? 'hidden md:block' : ''`) to project cards so exactly 3 items render on mobile screens (`< 768px`) and the full set renders on tablet and desktop grids without hydration mismatches.
- In [NavPill.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/NavPill.vue), attach a click handler to the home icon link that intercepts clicks when `route.path === '/'` to trigger smooth scrolling (`window.scrollTo({ top: 0, behavior: 'smooth' })`), and allows standard Nuxt routing to `/` from subpages.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, TypeScript, Tailwind CSS, Bun runtime.

**Spec:** User request: "portfolio section, make only 3 visibile on mobile view, button icon home make that redirect to top of home" conforming to [.agents/rules/engineering-standards.md](file:///home/farhan/program/bun/awull-porto/.agents/rules/engineering-standards.md).

---

## Global Constraints

- **SSR Safety**: Never use client-only `window.innerWidth` in template conditionals (`v-if`); use Tailwind responsive display classes (`hidden md:block`) to prevent hydration mismatches ([nuxt4-patterns](file:///home/farhan/program/bun/awull-porto/.agents/skills/nuxt4-patterns/SKILL.md)).
- **Guard Clauses**: Keep function bodies unnested with early returns ([engineering-standards.md](file:///home/farhan/program/bun/awull-porto/.agents/rules/engineering-standards.md)).
- **Immutability**: Avoid mutating state or props directly.
- **Git Commit Workflow**: Never commit automatically without user confirmation via `ask_question`.
- **Build Prohibition**: Do NOT run `bun run build`.

---

## Review Focus

1. **Mobile Card Truncation**: Verify that on viewports $< 768\text{ px}$ exactly 3 project cards are displayed, while on $\ge 768\text{ px}$ all 6 cards appear.
2. **Hydration Integrity**: Verify zero SSR hydration warnings in console when loading mobile and desktop viewports.
3. **Home Icon On Homepage**: When scrolled down on `/`, clicking the home icon scrolls smoothly to `top: 0` without reloading or hash jumping.
4. **Home Icon On Subpages**: When on `/projects` or `/projects/:slug`, clicking the home icon navigates back to `/` and lands at the top of the homepage.
5. **Accessibility**: Maintain descriptive `aria-label` attributes on the home link/button and ensure keyboard focusability (`focus-visible`).

---

## Tasks

### Task 1: Limit Visible Projects to 3 on Mobile in ProjectsSection.vue

**Files:**
- Modify: [app/components/organisms/ProjectsSection.vue](file:///home/farhan/program/bun/awull-porto/app/components/organisms/ProjectsSection.vue)

- [x] **Step 1: Update card loop with responsive visibility classes**
  In `ProjectsSection.vue`, update the `ProjectCard` loop to conditionally hide items starting at index 3 on mobile:
  ```html
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    <ProjectCard
      v-for="(project, idx) in displayedProjects"
      :key="project.slug"
      :project="project"
      :class="idx >= 3 ? 'hidden md:block' : ''"
    />
  </div>
  ```
- [x] **Step 2: Ensure ProjectCard accepts root class attributes**
  Verify that [ProjectCard.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/ProjectCard.vue) inherits attributes onto its root element cleanly so `class` merges as expected.
- [x] **Step 3: Verify responsive rendering**
  Inspect the page via browser/curl at `< 768px` and `≥ 768px` to confirm that 3 cards render on mobile view and 6 cards render on desktop.

---

### Task 2: Implement Home Icon Smooth Scroll-to-Top in NavPill.vue

**Files:**
- Modify: [app/components/molecules/NavPill.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/NavPill.vue)

- [x] **Step 1: Add `handleHomeClick` function in `NavPill.vue`**
  Implement an intent-revealing handler using guard clauses:
  ```ts
  const handleHomeClick = (event: MouseEvent) => {
    if (route.path !== '/') return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  ```
- [x] **Step 2: Bind handler to the Home link in template**
  Attach `@click="handleHomeClick"` to the home `<NuxtLink>`:
  ```html
  <NuxtLink
    to="/"
    aria-label="Go to homepage or scroll to top"
    class="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white hover:bg-primary-hover active:scale-95 transition-all cursor-pointer"
    @click="handleHomeClick"
  >
    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 3l9 8h-3v10h-4v-6h-4v6H6V11H3z" />
    </svg>
  </NuxtLink>
  ```
- [x] **Step 3: Verify behavior**
  - On `/`, scroll down to `#projects` or `#experience` and click the home icon. Verify smooth scrolling to top.
  - On `/projects`, click the home icon. Verify navigation to `/` landing at top.

---

### Task 3: Interactive Review and Commit Confirmation

- [ ] **Step 1: Self-verify changes against engineering standards and antislop**
- [ ] **Step 2: Prompt user via `ask_question` for git commit confirmation**
- [ ] **Step 3: Commit upon user approval**
