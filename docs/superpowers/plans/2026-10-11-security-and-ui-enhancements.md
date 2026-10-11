# Security Hardening & UI Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:**
1. Harden [server/api/contact.post.ts](file:///home/farhan/program/bun/awull-porto/server/api/contact.post.ts) with HTML entity sanitization, CRLF stripping, strict field length bounds, invisible honeypot bot trap, IP-based rate limiting, and production SMTP fail-fast.
2. In [app/components/molecules/ProjectCard.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/ProjectCard.vue), display the authentic Figma brand icon on the prototype button (icon-only, no text).
3. In [app/components/molecules/CertificateModal.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/CertificateModal.vue), align the certification title to the left and position the total count badge immediately beside the title text.
4. Restyle [app/components/organisms/AwardsSection.vue](file:///home/farhan/program/bun/awull-porto/app/components/organisms/AwardsSection.vue) and [app/components/molecules/AwardCard.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/AwardCard.vue) to match the layout, typography, image cover preview, and card structure of [ProjectsSection.vue](file:///home/farhan/program/bun/awull-porto/app/components/organisms/ProjectsSection.vue).

**Architecture:**
- **Security:** In `server/api/contact.post.ts`, implement `escapeHtml`, CRLF sanitization on subject, length bounds (name <= 100, email <= 254, message <= 3000), silent honeypot filtering, and in-memory rate limiting (5 req/15 min).
- **Project Card:** In `ProjectCard.vue`, replace the generic play SVG icon in the prototype button with the official Figma vector logo, keeping the round icon-only design.
- **Certificate Modal:** In `CertificateModal.vue`, rearrange the header so `h3.title` is left-aligned and the `{{ currentIndex + 1 }} / {{ certifications.length }}` badge sits inline beside it.
- **Awards Section & Card:** Transform `AwardCard.vue` into a rich visual card with `aspect-[4/3]` preview image (`award.imageUrl || award.logoUrl`), top badge, organization logo/title, and "View Certificate" action, matching `ProjectCard.vue`. Update `AwardsSection.vue` to mirror `ProjectsSection.vue` layout and spacing.

**Tech Stack:** Nuxt 4, Vue 3, Bun test runner, Tailwind CSS.

---

## Global Constraints

- **SSR Safety**: Use pure Vue template logic and Tailwind classes; avoid browser-only runtime leaks.
- **Guard Clauses**: Max 2 levels of nesting; early return on errors and honeypots.
- **Dependencies**: Do NOT install new packages without prior notice.
- **Build Prohibition**: Do NOT run `bun run build`.
- **Git Commit Workflow**: Never commit automatically without user confirmation via `ask_question`.

---

## Tasks

### Task 1: Security Hardening in `server/api/contact.post.ts`

**Files:**
- Modify: [server/api/contact.post.ts](file:///home/farhan/program/bun/awull-porto/server/api/contact.post.ts)
- Test: [tests/unit/contact-api.test.ts](file:///home/farhan/program/bun/awull-porto/tests/unit/contact-api.test.ts)

- [ ] **Step 1: Write unit tests for security features**
  Extend `tests/unit/contact-api.test.ts` to test:
  - Upper length bound rejections: name > 100 chars, message > 3000 chars, email > 254 chars.
  - HTML escaping helper.
  - Honeypot parameter acceptance.
  - CRLF injection prevention in subject.
- [ ] **Step 2: Run test to confirm failures**
  Run: `bun test tests/unit/contact-api.test.ts`
- [ ] **Step 3: Implement security controls in `server/api/contact.post.ts`**
  - Implement `escapeHtml(str: string): string`.
  - Add length checks in `validateContactPayload`.
  - Add in-memory IP rate limiter `checkRateLimit(ip: string): boolean`.
  - Sanitize subject: `name.replace(/[\r\n\t]/g, ' ')`.
  - If `honeypot` is present, return early with `{ success: true, message: 'Message sent successfully.' }`.
  - Escape all inputs in HTML email template.
- [ ] **Step 4: Run unit tests to confirm pass**
  Run: `bun test tests/unit/contact-api.test.ts`

---

### Task 2: ProjectCard Tool Icon (Figma Icon in Round Button)

**Files:**
- Modify: [app/components/molecules/ProjectCard.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/ProjectCard.vue)

- [ ] **Step 1: Update prototype button in `ProjectCard.vue`**
  - Replace generic play button icon with the official Figma vector logo.
  - Keep button icon-only with `w-9 h-9 rounded-full inline-flex items-center justify-center` and accessible aria-label / title `Figma Prototype`.
- [ ] **Step 2: Verify visually and in template**
  - Ensure no text label is rendered inside the button, only the brand icon.

---

### Task 3: Certificate Modal Title & Total Count Alignment

**Files:**
- Modify: [app/components/molecules/CertificateModal.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/CertificateModal.vue)

- [ ] **Step 1: Rearrange header flex layout in `CertificateModal.vue`**
  - Group title and count badge together in an inline flex container.
  - Position title on the left with `text-left` and place the count badge (`{{ currentIndex + 1 }} / {{ certifications.length }}`) directly to the right of the title text.
  - Keep issuer subtitle below title and close button on the far right.

---

### Task 4: AwardsSection & AwardCard Redesign (Parity with ProjectsSection)

**Files:**
- Modify: [app/components/molecules/AwardCard.vue](file:///home/farhan/program/bun/awull-porto/app/components/molecules/AwardCard.vue)
- Modify: [app/components/organisms/AwardsSection.vue](file:///home/farhan/program/bun/awull-porto/app/components/organisms/AwardsSection.vue)

- [ ] **Step 1: Update `AwardCard.vue` to match `ProjectCard.vue` style**
  - Add an aspect ratio top container (`aspect-[4/3]`) with certificate/award image (`award.imageUrl || award.logoUrl`) with zoom on hover.
  - Add top-right badge for `award.date`.
  - In card body, show award title, organization with logo, and a bottom action link "View Certificate →".
- [ ] **Step 2: Update `AwardsSection.vue` to match `ProjectsSection.vue`**
  - Use `bg-white`, `border-b border-neutral-200`, `py-16 sm:py-24`, and `max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-14`.
  - Use matching grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8` (or 2 columns for 2 awards with balanced card size).
- [ ] **Step 3: Verify functionality and modal trigger**
  - Confirm clicking any award card opens the certificate modal with the corresponding certificate image.

---

### Task 5: Verification & Interactive Git Confirmation

- [ ] **Step 1: Run unit tests**
  Run: `bun test tests/unit/contact-api.test.ts`
- [ ] **Step 2: Check dev server responsiveness via curl**
  Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/`
- [ ] **Step 3: Prompt user for commit and push confirmation via `ask_question`**
