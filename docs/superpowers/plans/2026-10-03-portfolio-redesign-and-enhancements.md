# Portfolio Redesign & Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio to match the Framer aesthetic reference by implementing an authentic Hero ID Card, removing all coding/monospace fonts, adding scroll-driven experience timeline animations, combining design tools with developer skills (Laravel, Vue, etc.), refining project interaction (circular buttons, hover GIF/video previews), polishing awards/certificates (circular logos, clickable modal), and eliminating UI clutter (redundant CTA buttons, excessive spacing).

**Architecture:** Nuxt 4 with Vue 3 Composition API (`<script setup lang="ts">`), Tailwind CSS, and CSS/IntersectionObserver animations. Component-driven structure in `app/components/{atoms,molecules,organisms}` and type-safe data models in `app/types/portfolio.ts` and `app/data/portfolio.ts`.

**Tech Stack:** Nuxt 4.5+, Vue 3.5+, Tailwind CSS 3.4+, TypeScript, Playwright CLI for visual regression testing.

## Global Constraints

- Never commit automatically without user confirmation.
- Work only on the requested files/components.
- Use clean sans-serif typography (`Manrope`, `Inter`, `sans-serif`) across all components; eliminate all `font-mono` / coding-like fonts.
- Guard clauses preferred for logic; keep functions under 30 lines.
- Maintain responsive layouts across mobile (375px+), tablet, and desktop (1280px+).

## Review Focus

1. **Hero ID Card Dimensions & Overflow:** On mobile screens, the ID card must fit gracefully without horizontal clipping or awkward lanyard proportions.
2. **Scroll Timeline Progress Line:** The animated timeline line must track scroll position smoothly without layout shift or jank.
3. **Project Card Hover Media:** Hover video/GIF transitions must load cleanly, handle fallback gracefully when no video exists, and not cause continuous background memory leaks.
4. **Duplicate Button Resolution:** In `ProjectsSection.vue`, the duplicate "View All Projects" CTAs must be consolidated into a single, unambiguous CTA.
5. **Modal Interaction Consistency:** Clicking on both Certifications and Awards must open the modal with keyboard accessibility (Escape to close, Tab traps).

---

### Task 1: Typography System Overhaul (Eliminate Monospace/Coding Fonts)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/components/atoms/AppBadge.vue`
- Modify: `app/components/atoms/AppHeading.vue`
- Modify: `app/components/organisms/BrandCarousel.vue`
- Modify: `app/components/organisms/HeroSection.vue`
- Modify: `app/components/organisms/JourneySection.vue`
- Modify: `app/components/molecules/JourneyCard.vue`
- Modify: `app/components/organisms/AwardsSection.vue`
- Modify: `app/components/molecules/AwardCard.vue`
- Modify: `app/components/organisms/ProjectsSection.vue`
- Modify: `app/pages/projects/index.vue`
- Modify: `app/components/organisms/ToolsSection.vue`
- Modify: `app/components/molecules/ToolProgress.vue`
- Modify: `app/components/organisms/CertificationsSection.vue`
- Modify: `app/components/molecules/CertificateItem.vue`
- Modify: `app/components/organisms/StoriesSection.vue`
- Modify: `app/components/organisms/FooterSection.vue`

**Interfaces:**
- Consumes: Tailwind `font-sans` (`Manrope`, `Inter`)
- Produces: Uniform, modern designer typography across all headings, badges, and labels.

- [ ] **Step 1: Inspect and update `tailwind.config.ts` font families**
  Set `fontFamily.sans` and `fontFamily.manrope` as the primary fonts. Remove unnecessary monospace overrides on UI components.

- [ ] **Step 2: Replace all `font-mono` classes across components**
  Replace `font-mono tracking-widest` or `font-mono uppercase` with `font-sans font-semibold tracking-wider text-xs uppercase` or natural case typography.

- [ ] **Step 3: Verify build and visual check**
  Run `bun run build` to ensure no CSS or template errors. Take a screenshot with Playwright to verify clean modern font rendering.

---

### Task 2: Floating Navbar Backdrop Blur & Refinement

**Files:**
- Modify: `app/components/molecules/NavPill.vue`
- Modify: `app/layouts/default.vue`

**Interfaces:**
- Consumes: `whatsappUrl` prop, current Vue router route
- Produces: Frosted-glass floating pill navbar with high-blur backdrop (`backdrop-blur-xl bg-white/80 border border-neutral-200/80 shadow-md`).

- [ ] **Step 1: Enhance `NavPill.vue` glassmorphism styling**
  Update wrapper classes to use `backdrop-blur-xl bg-white/80 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all`.
  Ensure active states and hover states have smooth transitions.

- [ ] **Step 2: Check mobile responsiveness and tap targets**
  Ensure min tap height is 44px for buttons and touch targets.

- [ ] **Step 3: Verification**
  Run Playwright to capture the navbar over different page scroll positions to verify the blur effect over content.

---

### Task 3: Hero Section Redesign: Framer ID Card with Lanyard & Integrated Location Badge

**Files:**
- Modify: `app/components/organisms/HeroSection.vue`
- Modify: `app/data/portfolio.ts`
- Modify: `app/types/portfolio.ts`

**Interfaces:**
- Consumes: `portfolioData.profile`
- Produces: Framer-style Hero ID Card featuring:
  - Lanyard strap & clip at the top
  - ID Card container with card-slot cutout
  - Three colored top progress/accent bars
  - Avatar, name, role subtitle, social icons
  - Status indicator: pulsing coral dot + "Let's make it happen"
  - Main headline: "Good design is invisible. — Mine isn't."
  - 5-star badge: `★★★★★ 20+ projects`
  - Pitch subtitle
  - Action buttons: "Portfolio" & "Download CV"
  - Compact integrated location badge at card footer: "Located in Jakarta, available worldwide." + "Hire me now! →"

- [ ] **Step 1: Construct the ID Card outer hanger & lanyard markup**
  Add lanyard ribbon (`w-8 sm:w-10 h-8 sm:h-12 bg-primary mx-auto rounded-t-sm`), clip holder (`bg-dark w-10 sm:w-12 h-6 sm:h-7 rounded-lg shadow-sm`), and ID card cutout slot.

- [ ] **Step 2: Build ID Card container and interior layout**
  Create rounded card container (`rounded-[32px] sm:rounded-[44px] bg-white border border-neutral-200 shadow-xl max-w-xl mx-auto p-6 sm:p-10 flex flex-col gap-6`).
  Add the 3 colored accent bars (`grid grid-cols-3 gap-2`).
  Add profile row (avatar, name, subtitle, social media icons, status pill).
  Add headline, star rating pill (`★★★★★ 20+ projects`), and description.
  Add action buttons ("Portfolio", "Download CV").

- [ ] **Step 3: Integrate the location badge at the ID card base**
  Transform the previously stretched location banner into a neat, compact badge at the bottom of the ID card with green pulsing status dot and "Hire me now! →" link.

- [ ] **Step 4: Verify with Playwright**
  Capture `hero-id-card-desktop.png` and `hero-id-card-mobile.png`. Verify match with Framer reference.

---

### Task 4: "Proudly Worked With" Spacing Optimization

**Files:**
- Modify: `app/components/organisms/BrandCarousel.vue`
- Modify: `app/pages/index.vue`

**Interfaces:**
- Consumes: `portfolioData.brands`
- Produces: Compact, seamlessly integrated brand logo marquee with reduced vertical padding.

- [ ] **Step 1: Reduce padding and margins**
  Reduce `py-8 sm:py-10` in `BrandCarousel.vue` to `py-4 sm:py-5`.
  Adjust bottom margin of Hero section and top margin of BrandCarousel to eliminate the excessive empty space.

- [ ] **Step 2: Update typography**
  Change "PROUDLY WORKED WITH:" from `font-mono` to clean `font-sans font-semibold tracking-wider text-xs text-neutral-400`.

- [ ] **Step 3: Verify visual flow**
  Screenshot the transition from Hero ID Card → Brand Carousel → Career Timeline to ensure tight, balanced rhythm.

---

### Task 5: Career Timeline Scroll Animation & Rich Work Experience (Results & Logos)

**Files:**
- Modify: `app/types/portfolio.ts`
- Modify: `app/data/portfolio.ts`
- Modify: `app/components/organisms/JourneySection.vue`
- Modify: `app/components/molecules/JourneyCard.vue`

**Interfaces:**
- Consumes: `Milestone` with `companyLogoUrl`, `description`, `results`
- Produces: Scroll-animated timeline vertical line that fills/illuminates as user scrolls, plus cards with company logos and outcome descriptions.

- [ ] **Step 1: Extend `Milestone` type and update data in `portfolio.ts`**
  Add `companyLogoUrl?: string` and `description?: string` to each milestone item (e.g. Aiti Media, Ousean School, PLN Icon Plus, Nuansart, Polairud).

- [ ] **Step 2: Implement scroll-progress animated timeline line in `JourneySection.vue`**
  Use CSS custom property or scroll-driven animation / IntersectionObserver to track scroll progress and dynamically expand the vertical accent line down the timeline.

- [ ] **Step 3: Update `JourneyCard.vue` to render company logo and outcome description**
  Add company logo container (`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-neutral-200 overflow-hidden flex items-center justify-center p-1.5`).
  Display outcome/result description text with clean hierarchy.

- [ ] **Step 4: Verify animation and card layout**
  Test in browser and capture screenshot to verify timeline line fills properly on scroll.

---

### Task 6: Combined Tools & Engineering Skills (Laravel, Vue, Nuxt, Design Tools)

**Files:**
- Modify: `app/types/portfolio.ts`
- Modify: `app/data/portfolio.ts`
- Modify: `app/components/organisms/ToolsSection.vue`
- Modify: `app/components/molecules/ToolProgress.vue`

**Interfaces:**
- Consumes: Unified `ToolSkill` list with category classifications (`Design & UI/UX`, `Engineering & Frameworks`, `Motion & 3D`)
- Produces: Single unified "Skills & Tools" section merging design software and engineering skills (Laravel, Vue.js, Nuxt, TypeScript, Tailwind, Figma, Framer, etc.).

- [ ] **Step 1: Expand `toolsData` in `portfolio.ts` with developer skills**
  Add skills:
  - Laravel: "Robust backend API & fullstack web development"
  - Vue.js & Nuxt: "Modern reactive frontends & SSR web applications"
  - Tailwind CSS: "High-speed utility-first design system architecture"
  - TypeScript: "Type-safe robust web application development"
  - RESTful APIs & Git: "Version control and seamless data integrations"

- [ ] **Step 2: Update `ToolsSection.vue` into a unified layout**
  Update heading to "Skills & Tools" with tabs or grouped categories (`Design Tools` and `Development Skills`) so they live together cleanly in one section.

- [ ] **Step 3: Refine `ToolProgress.vue` styling**
  Remove monospace labels. Use rounded icons, category badges, and clean hover elevation.

- [ ] **Step 4: Verification**
  Run visual check on Tools & Skills section to verify all tools and engineering skills display cleanly.

---

### Task 7: Projects Section Refinement (Circular Proto/Behance Buttons, Hover GIF/Video, Button Deduplication)

**Files:**
- Modify: `app/components/organisms/ProjectsSection.vue`
- Modify: `app/components/molecules/ProjectCard.vue`
- Modify: `app/types/portfolio.ts`
- Modify: `app/data/portfolio.ts`

**Interfaces:**
- Consumes: `Project` with optional `previewMediaUrl` (GIF or MP4)
- Produces:
  - Consolidated single "View All Projects" button in `ProjectsSection.vue` (remove redundant duplicate).
  - Circular action buttons for Prototype and Behance in `ProjectCard.vue`.
  - Smooth hover video/GIF preview playback on card hover.

- [ ] **Step 1: Address duplicate "View All Projects" buttons in `ProjectsSection.vue`**
  Remove the top header duplicate button (`<AppButton v-if="showViewAll" to="/projects"...>`) or make it a sleek subtle text link, keeping the main bottom button as the primary CTA.

- [ ] **Step 2: Convert Prototype & Behance buttons to circular icon buttons**
  In `ProjectCard.vue`, change rectangular action buttons to circular buttons:
  `w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-2xs` with clear SVG icons and `title`/`aria-label`.

- [ ] **Step 3: Implement hover GIF / Video preview in `ProjectCard.vue`**
  Add `<video v-if="project.previewVideoUrl && isHovered" autoplay loop muted playsinline>` and `<img v-else-if="project.previewGifUrl && isHovered">` with smooth cross-fade transition from cover image.

- [ ] **Step 4: Verify with Playwright**
  Capture hover state and normal state of project cards. Confirm circular buttons and video/gif behavior.

---

### Task 8: Graphic Design Projects & Category Filter Smoothness in `/projects`

**Files:**
- Modify: `app/data/portfolio.ts`
- Modify: `app/pages/projects/index.vue`

**Interfaces:**
- Consumes: `portfolioData.projects` with graphic design items
- Produces:
  - Graphic design projects listed in data
  - Filter category buttons with smooth active transition and smooth grid transition

- [ ] **Step 1: Add graphic design projects to `projectsData` in `portfolio.ts`**
  Add project entries with category `'Graphic Design'` (e.g., Brand Identity & Visual System, Packaging Design, Poster & Editorial Arts) with placeholder paths for the user to populate.

- [ ] **Step 2: Add 'Graphic Design' to categories and improve filter button interaction**
  In `app/pages/projects/index.vue`:
  Add `'Graphic Design'` to `categories`.
  Remove `font-mono` from filter buttons.
  Add smooth background sliding pill or transition classes (`transition-all duration-300 ease-out`).
  Add Vue `<TransitionGroup>` or CSS fade-in for filtered project cards to avoid abrupt jumps.

- [ ] **Step 3: Verification**
  Click through category filters in Playwright, test filter reactivity, and capture screenshot of filtered results.

---

### Task 9: Awards & Certifications Polish (Circular Logos & Clickable Award Modal)

**Files:**
- Modify: `app/components/organisms/AwardsSection.vue`
- Modify: `app/components/molecules/AwardCard.vue`
- Modify: `app/components/organisms/CertificationsSection.vue`
- Modify: `app/components/molecules/CertificateModal.vue`

**Interfaces:**
- Consumes: `Award` and `Certification` data
- Produces:
  - Circular logo badges (`rounded-full`) for award cards and certificate items.
  - Clickable award cards that open the certificate/award detail modal.

- [ ] **Step 1: Make award logos circular**
  In `AwardCard.vue`, change logo container from `rounded-2xl` to `rounded-full w-12 h-12 overflow-hidden border border-neutral-200`.

- [ ] **Step 2: Connect Awards to modal viewer**
  Add click event on `AwardCard.vue` (`@click="$emit('click', award)"`).
  In `AwardsSection.vue` (or shared modal handler), open `CertificateModal` displaying the award certificate image and verification details when clicked.

- [ ] **Step 3: Verification**
  Test clicking an award card in Playwright, verify modal opens and closes with Escape key.

---

### Task 10: Clean Data Schema & User Content Structure

**Files:**
- Modify: `app/types/portfolio.ts`
- Modify: `app/data/portfolio.ts`

**Interfaces:**
- Consumes: Updated TypeScript interfaces
- Produces: Clean, well-documented structure where user can easily insert their own image/media files ("isi konten gambar dll aku ajah").

- [ ] **Step 1: Document image and media path conventions in `portfolio.ts`**
  Ensure all paths point to `/images/...` or standard public folders.
  Provide clear placeholder fallbacks so no broken image icons appear if an asset is not yet provided.

- [ ] **Step 2: Type checking**
  Run `bun run nuxt prepare` and verify no TypeScript compilation errors.

---

### Task 11: Verification & Playwright Visual Audit

**Files:**
- Test: Playwright screenshots across desktop (1440px) and mobile (375px)

- [ ] **Step 1: Capture full-page screenshots of updated homepage and `/projects`**
- [ ] **Step 2: Run antislop checklist & contrast verification**
- [ ] **Step 3: Interactive click-through verification of all modals, buttons, and filters**
