# Portfolio Refinements: Slim Hero ID Card, 3D Entrance, Bottom Nav, Connected Timeline, & Grouped Skills

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the portfolio by slimming the Hero ID Card with a 3D flip-drop entrance animation and top-positioned tag, fixing navigation to the bottom, transforming the career journey line into an elegant connected branch timeline, and redesigning Skills & Tools into compact domain groups with real SVG icons.

**Architecture:** 
- Reconfigure `HeroSection.vue` to a slim portrait badge (`max-w-[430px]`) with top-anchored status tag and GPU-accelerated CSS keyframe 3D drop-and-flip entrance.
- Relocate `NavPill.vue` in `layouts/default.vue` to a bottom-docked fixed position with safe bottom scroll padding.
- Upgrade `JourneySection.vue` and `JourneyCard.vue` with horizontal branch connectors, concentric milestone anchors, and a luminous scroll-driven progress stroke.
- Replace bulky 12-card grid in `ToolsSection.vue` with space-efficient grouped domain clusters (Design vs Development) backed by local vector SVG icons downloaded into `public/images/tools/`.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, Tailwind CSS, Bun, Playwright CLI.

**Spec:** User feedback and design direction requested in conversation:
1. Hero card slimmer, top tag placed at the very top edge, entrance animation with 3D drop & flip.
2. Navigation fixed at the bottom.
3. Journey timeline line significantly elevated and properly connected.
4. Skills & tools grouped compactly to eliminate bloated box cards; real Google/official SVG icons for missing dev skills.

---

## Global Constraints

- Never commit automatically without user confirmation via interactive `ask_question` prompt.
- English communication; direct and concise.
- Functions under 30 lines (maximum 50).
- Guard clauses preferred; maximum 2 nesting levels.
- Zero empty try/catch blocks.
- No monospaced coding fonts (`font-mono` / Fragment Mono).
- All changes must pass `bun run build` with zero errors.

---

## Review Focus

1. **Hero Responsiveness:** Ensure the slimmer card (`max-w-[430px]`) does not overflow on small mobile viewports (<360px).
2. **Bottom Navigation Overlap:** Ensure `main` content has adequate bottom padding (`pb-28 sm:pb-32`) so the bottom-fixed navbar never obscures contact submit buttons or footer copyright.
3. **3D Flip Performance:** Ensure the `@keyframes` drop-flip animation uses `will-change: transform, opacity` and `backface-visibility: hidden` for smooth 60fps rendering without layout thrashing.
4. **Timeline Alignment:** Ensure horizontal connector branches precisely align between the vertical spine and card content on both mobile and desktop screen sizes.
5. **Local Icon Reliability:** Ensure all downloaded SVGs are local static assets in `public/images/tools/` without external CDN failure risks.

---

### Task 1: Download & Integrate Official Local SVGs for Development Skills

**Files:**
- Create: `public/images/tools/laravel.svg`
- Create: `public/images/tools/vue.svg`
- Create: `public/images/tools/nuxt.svg`
- Create: `public/images/tools/tailwind.svg`
- Create: `public/images/tools/typescript.svg`
- Create: `public/images/tools/mysql.svg`
- Create: `public/images/tools/git.svg`
- Modify: `app/data/portfolio.ts:230-264`

**Interfaces:**
- Consumes: `ToolSkill` interface from `app/types/portfolio.ts`
- Produces: Complete `iconUrl` paths for all engineering and design tools.

- [ ] **Step 1: Write curl script to download official clean vector SVGs into `public/images/tools/`**

Download clean, official SVGs:
- Laravel: `https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg`
- Vue.js: `https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg`
- Nuxt: `https://raw.githubusercontent.com/devicons/devicon/master/icons/nuxtjs/nuxtjs-original.svg`
- Tailwind: `https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg`
- TypeScript: `https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg`
- MySQL: `https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg`
- Git: `https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg`

- [ ] **Step 2: Run download and verify all SVG files exist and are valid**

Run: `ls -la public/images/tools/`
Expected: 7 SVG files created with non-zero size.

- [ ] **Step 3: Update `toolsData` in `app/data/portfolio.ts` with local icon paths**

Assign `iconUrl: '/images/tools/<name>.svg'` for each skill.

- [ ] **Step 4: Verify `app/data/portfolio.ts` data validity**

Run: `bun -e "import { toolsData } from './app/data/portfolio'; console.log(toolsData.map(t => [t.name, t.iconUrl]))"`
Expected: All tools list non-empty icon URLs.

---

### Task 2: Redesign Skills & Tools into Compact Domain Groups

**Files:**
- Modify: `app/components/organisms/ToolsSection.vue`
- Delete or Refactor: `app/components/molecules/ToolProgress.vue`

**Interfaces:**
- Consumes: `tools: ToolSkill[]` from `app/data/portfolio.ts`
- Produces: Two domain panels ("Design & Creative Systems" and "Engineering & Development") with compact chip clusters.

- [ ] **Step 1: Design grouped data model in `ToolsSection.vue`**

Split tools into two structured domains:
1. `Design & Creative`: Figma, Framer, Photoshop, Illustrator, After Effects, Canva.
2. `Engineering & Tech`: Laravel, Vue.js & Nuxt, Tailwind CSS, TypeScript, REST API & MySQL, Git & GitHub.

- [ ] **Step 2: Implement compact skill chip layout in `ToolsSection.vue`**

Replace the 12-box grid with two sleek grouped panels:
- Each group has a header with title, subtitle, and count badge.
- Inner grid / flex wrap of compact skill items: 28px icon + skill name + concise role pill.
- Hover micro-interactions with border and subtle scale elevation.
- Eliminates >60% of vertical clutter and bloated empty space.

- [ ] **Step 3: Verify visual rendering with Playwright**

Run Playwright screenshot on `http://localhost:3000/#tools` and inspect.

---

### Task 3: Relocate Navigation to Fixed Bottom Dock

**Files:**
- Modify: `app/layouts/default.vue`
- Modify: `app/components/molecules/NavPill.vue`

**Interfaces:**
- Consumes: Route changes
- Produces: Bottom-docked floating navigation pill with safe page scroll padding.

- [ ] **Step 1: Move NavPill position in `app/layouts/default.vue`**

Change `<header>` class from `fixed top-5` to:
`fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto`
Adjust `<main>` padding: remove `pt-16 sm:pt-20`, set `pt-0` and add `pb-28 sm:pb-32` to guarantee safe clearance above the dock.

- [ ] **Step 2: Polish NavPill styling in `app/components/molecules/NavPill.vue`**

Add an elevated bottom shadow (`shadow-xl shadow-black/10`) and high-grade `backdrop-blur-xl bg-white/80 border border-neutral-200/90` optimized for mobile thumb reach and desktop floating aesthetics.

- [ ] **Step 3: Verify bottom dock position and clearance**

Capture screenshot via Playwright to ensure zero overlap with bottom footer content.

---

### Task 4: Slim Hero ID Card, Reposition Top Tag, & Implement 3D Flip-Drop Entrance

**Files:**
- Modify: `app/components/organisms/HeroSection.vue`

**Interfaces:**
- Consumes: `profile: PortfolioProfile`
- Produces: Authentic slim portrait ID card (`max-w-[420px] sm:max-w-[440px]`), top-edge status tag, and 3D swing/flip drop-in animation.

- [ ] **Step 1: Slim card container width and refine portrait proportions**

Change card wrapper from `max-w-xl` to `max-w-[420px] sm:max-w-[440px]` with streamlined padding (`p-5 sm:p-7`).
Tighten headline and typography proportions to create a realistic lanyard portrait card ratio.

- [ ] **Step 2: Reposition the status tag to the very top edge of the card**

Move "● Let's make it happen" out of the profile row and place it at the very top of the card:
Directly below the lanyard slot cutout and above the 3-color accent bars, centered as a crisp top pill badge.

- [ ] **Step 3: Implement 3D flip-and-drop entrance animation**

Add scoped CSS `@keyframes heroDropFlip`:
- Starts with `opacity: 0; transform: translateY(-70px) rotateX(32deg) scale(0.92);`
- Smooth spring ease to `translateY(6px) rotateX(-6deg)` then settles at `translateY(0) rotateX(0deg) scale(1)`.
- Uses `perspective: 1200px; transform-origin: top center;` for physical lanyard-hung realism.

- [ ] **Step 4: Verify Hero entrance and slim appearance with Playwright**

Capture video/screenshot of the hero section on load.

---

### Task 5: Redesign Timeline Spine, Milestone Anchors, & Connector Branches

**Files:**
- Modify: `app/components/organisms/JourneySection.vue`
- Modify: `app/components/molecules/JourneyCard.vue`

**Interfaces:**
- Consumes: `milestones: Milestone[]`
- Produces: Connected journey timeline with illuminated progress spine, horizontal connector arms, and concentric milestone dots.

- [ ] **Step 1: Upgrade vertical timeline spine in `JourneySection.vue`**

Change plain `w-0.5` line to a refined `w-[3px]` track with soft neutral background and radiant `primary` progress stroke with glowing gradient head.

- [ ] **Step 2: Add horizontal connector branches and concentric anchors in `JourneyCard.vue`**

Add horizontal connector branch (`h-[2px] bg-neutral-200 group-hover:bg-primary/50`) extending from the vertical spine directly into the milestone card.
Redesign the anchor node into concentric rings:
- Outer ring with smooth hover pulse.
- Inner core node that illuminates when scrolled into view.

- [ ] **Step 3: Verify connected timeline visual appeal with Playwright**

Capture screenshot of `#experience` section and review line continuity.

---

### Task 6: Comprehensive Verification & Production Build

**Files:**
- Test: Playwright screenshots of `/` and `/projects`.
- Build: `bun run build`.

- [ ] **Step 1: Run Playwright screenshot and interactive test script**

Execute script capturing full home page and specific sections (Hero, Timeline, Grouped Skills, Bottom Nav).

- [ ] **Step 2: Inspect all captured screenshots with `view_file`**

Verify that each of the user's aesthetic and structural goals is met.

- [ ] **Step 3: Run production build verification**

Run: `bun run build`
Expected: Exit code 0, client and server Nitro bundles generated with zero errors.

---

### Task 7: Git Commit Confirmation Prompt

- [ ] **Step 1: Interactively prompt user using `ask_question` tool**

Ask: "All requested portfolio refinements (slim Hero with 3D flip-drop entrance, bottom navigation, connected timeline, and grouped skills with local SVG icons) are complete and tested. Would you like to commit the changes to git?"
Options:
- "Yes, commit the changes"
- "No, skip committing for now"

- [ ] **Step 2: If confirmed, create git commit**

Run `git add` and `git commit` with descriptive commit message.
