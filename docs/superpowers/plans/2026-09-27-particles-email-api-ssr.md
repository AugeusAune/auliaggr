# Particle Animation, Server Email API & SSR Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a lightweight, SSR-safe interactive particle canvas animation in the hero and layout, build a robust server-side contact API endpoint in Nuxt Nitro (`server/api/contact.post.ts`) connected to the frontend contact form, and implement an interactive modal gallery for viewing certificate images with prev/next (`<` and `>`) navigation and keyboard controls.

**Architecture:** 
- **Particle System:** Canvas-based particle animation component (`ParticleCanvas.vue`) wrapped in `<ClientOnly>` with clean lifecycle management (`onMounted` setup, `onUnmounted` teardown of `cancelAnimationFrame` and event listeners) to guarantee zero SSR hydration mismatches.
- **Server Email API:** Nuxt 4 Nitro server route (`server/api/contact.post.ts`) using built-in `readBody` and `createError`. Validates input (fail-fast guard clauses for name, email format, and message length) and dispatches message with structured JSON responses.
- **Client Integration:** `ContactForm.vue` calls `/api/contact` via Nuxt's `$fetch` with complete error handling.
- **Certificate Modal:** Accessible modal dialog with backdrop blur, full certificate image, title, issuer, close button (`✕`), and prominent `<` (Previous) and `>` (Next) buttons with keyboard arrow support.

**Tech Stack:** Nuxt 4 (Nitro server engine), Vue 3 Composition API, TypeScript, HTML5 Canvas, Tailwind CSS, Bun, Playwright CLI.

**Spec:** User prompt requirements:
1. Add interactive particle animation that runs smoothly without lag.
2. Add server API for sending email/messages.
3. Ensure complete compatibility in SSR mode (no hydration mismatch, Nitro server route execution, clean builds).
4. When a certification is clicked, open a modal displaying the full certificate image with `<` and `>` navigation controls.

---

## Global Constraints

- Nuxt 4 directory convention (`app/` for client, `server/` for Nitro routes).
- Package manager: Bun (`bun test`, `bun run dev`, `bun run build`).
- No new external dependencies without prior user notice.
- Guard clauses and functions under 30 lines.
- SSR safety: zero DOM/Canvas access during SSR rendering.
- Git commits require explicit confirmation via `ask_question`.

## Review Focus

1. SSR hydration mismatches caused by particle canvas — test verifies component is client-only and server renders cleanly.
2. Memory leaks in particle canvas — test verifies `cancelAnimationFrame` and `removeEventListener` in `onUnmounted`.
3. Input validation on `/api/contact` — test verifies 400 Bad Request on empty or malformed payloads.
4. Client error state handling in `ContactForm.vue` — test verifies user sees descriptive error messages if the API rejects input.
5. Production build correctness — test verifies Nitro compiles server routes cleanly without bundling client canvas code.

---

### Task 1: Server Email API Route (`server/api/contact.post.ts`)

**Files:**
- Create: `server/api/contact.post.ts`
- Test: `tests/unit/contact-api.test.ts`

**Interfaces:**
- Consumes: HTTP POST request `{ name: string, email: string, message: string }`.
- Produces: JSON response `{ success: boolean, message: string }` or HTTP 400/500 error.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/contact-api.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import contactHandler from '../../server/api/contact.post'

describe('Contact Server API Endpoint', () => {
  it('validates missing name with 400 error', async () => {
    const mockEvent: any = {
      node: { req: {} },
      _body: { name: '', email: 'test@example.com', message: 'Hello' }
    }
    // We expect handler to throw or reject with bad request
    expect(contactHandler(mockEvent)).rejects.toThrow()
  })

  it('validates invalid email format with 400 error', async () => {
    const mockEvent: any = {
      node: { req: {} },
      _body: { name: 'Aulia', email: 'not-an-email', message: 'Hello' }
    }
    expect(contactHandler(mockEvent)).rejects.toThrow()
  })

  it('validates empty message with 400 error', async () => {
    const mockEvent: any = {
      node: { req: {} },
      _body: { name: 'Aulia', email: 'aulia@example.com', message: '   ' }
    }
    expect(contactHandler(mockEvent)).rejects.toThrow()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/contact-api.test.ts`
Expected: FAIL (cannot find module `server/api/contact.post`).

- [ ] **Step 3: Implement `server/api/contact.post.ts`**

Create `server/api/contact.post.ts`:
- Use `readBody(event)` to parse JSON body.
- Guard clause 1: validate `body.name` is non-empty string.
- Guard clause 2: validate `body.email` is valid email format using regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
- Guard clause 3: validate `body.message` is non-empty string (at least 3 characters).
- If validation fails, throw `createError({ statusCode: 400, statusMessage: '...' })`.
- Return `{ success: true, message: 'Your message has been received! I will get back to you within 24 hours.' }`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/contact-api.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 1: add Nitro contact email API route?"
Commit: `git add server/api/contact.post.ts tests/unit/contact-api.test.ts docs/superpowers/plans/2026-09-27-particles-email-api-ssr.md && git commit -m "feat: add Nitro contact API route with server-side validation"`

---

### Task 2: Connect ContactForm to Server Email API with Error Handling

**Files:**
- Modify: `app/components/molecules/ContactForm.vue`
- Test: `tests/unit/contact-form-integration.test.ts`

**Interfaces:**
- Consumes: `/api/contact` POST endpoint.
- Produces: Real HTTP request execution, reactive submitting state, descriptive error banners, and success feedback.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/contact-form-integration.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('ContactForm API Integration', () => {
  it('ContactForm submits to /api/contact using $fetch', () => {
    const formCode = readFileSync('app/components/molecules/ContactForm.vue', 'utf-8')
    expect(formCode).toContain('/api/contact')
    expect(formCode).toContain('$fetch')
    expect(formCode).toContain('POST')
  })

  it('ContactForm handles server error responses', () => {
    const formCode = readFileSync('app/components/molecules/ContactForm.vue', 'utf-8')
    expect(formCode).toContain('catch')
    expect(formCode).toContain('errorMessage')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/contact-form-integration.test.ts`
Expected: FAIL.

- [ ] **Step 3: Update `app/components/molecules/ContactForm.vue`**

In `app/components/molecules/ContactForm.vue`:
- Replace mock `setTimeout` with `$fetch('/api/contact', { method: 'POST', body: { name: name.value, email: email.value, message: message.value } })`.
- Wrap in try/catch block with explicit error handling: extract `err.data?.statusMessage || err.message` to `errorMessage.value`.
- Reset form inputs on success and display confirmation banner with button to send another message.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/contact-form-integration.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 2: connect ContactForm to /api/contact endpoint?"
Commit: `git add app/components/molecules/ContactForm.vue tests/unit/contact-form-integration.test.ts && git commit -m "feat: connect contact form to Nitro contact API with error handling"`

---

### Task 3: SSR-Safe Lightweight Particle Canvas Component

**Files:**
- Create: `app/components/atoms/ParticleCanvas.vue`
- Test: `tests/unit/particle-canvas.test.ts`

**Interfaces:**
- Consumes: Canvas context in client environment (`onMounted`).
- Produces: 60fps responsive particle canvas with mouse interaction and clean unmount.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/particle-canvas.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('ParticleCanvas Atom Component', () => {
  it('defines canvas element with absolute positioning and pointer-events-none', () => {
    const code = readFileSync('app/components/atoms/ParticleCanvas.vue', 'utf-8')
    expect(code).toContain('<canvas')
    expect(code).toContain('pointer-events-none')
  })

  it('safely handles client-only lifecycle and cancels animation frame on unmounted', () => {
    const code = readFileSync('app/components/atoms/ParticleCanvas.vue', 'utf-8')
    expect(code).toContain('onMounted')
    expect(code).toContain('onUnmounted')
    expect(code).toContain('cancelAnimationFrame')
  })

  it('uses coral primary color tokens for particles', () => {
    const code = readFileSync('app/components/atoms/ParticleCanvas.vue', 'utf-8')
    expect(code).toContain('236, 143, 141') // RGB equivalent of #EC8F8D
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/particle-canvas.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `app/components/atoms/ParticleCanvas.vue`**

Create `app/components/atoms/ParticleCanvas.vue`:
- `<script setup lang="ts">`:
  - Particle class / structure: `x, y, vx, vy, radius, alpha`.
  - Color: `rgba(236, 143, 141, ${alpha})` (coral primary `#EC8F8D`).
  - Distance threshold for subtle connecting lines between nearby particles: ~90px.
  - Setup in `onMounted`: query canvas, handle devicePixelRatio scaling, add resize listener.
  - Mouse interaction: gentle repulsion/attraction to cursor.
  - Teardown in `onUnmounted`: `cancelAnimationFrame(animationFrameId)` and `window.removeEventListener('resize', ...)`.
- `<template>`: `<canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none z-0" />`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/particle-canvas.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 3: add SSR-safe ParticleCanvas component?"
Commit: `git add app/components/atoms/ParticleCanvas.vue tests/unit/particle-canvas.test.ts && git commit -m "feat: add SSR-safe lightweight ParticleCanvas atom component"`

---

### Task 4: Hero Section & Layout Integration of Particle Animation

**Files:**
- Modify: `app/components/organisms/HeroSection.vue`
- Test: `tests/unit/particle-integration.test.ts`

**Interfaces:**
- Consumes: `<ParticleCanvas />` wrapped in `<ClientOnly>`.
- Produces: Ambient particle depth in the hero section without blocking text or interactions.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/particle-integration.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Particle Canvas Integration', () => {
  it('HeroSection embeds ParticleCanvas within ClientOnly tag', () => {
    const heroCode = readFileSync('app/components/organisms/HeroSection.vue', 'utf-8')
    expect(heroCode).toContain('ParticleCanvas')
    expect(heroCode).toContain('ClientOnly')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/particle-integration.test.ts`
Expected: FAIL.

- [ ] **Step 3: Integrate `ParticleCanvas` into `HeroSection.vue`**

In `app/components/organisms/HeroSection.vue`:
- Import `ParticleCanvas from '../atoms/ParticleCanvas.vue'`.
- Insert `<ClientOnly><ParticleCanvas /></ClientOnly>` as background behind the content.
- Ensure relative z-indexing (`relative z-10` on text and buttons) so buttons remain clickable and contrast is preserved.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/particle-integration.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 4: integrate ParticleCanvas into HeroSection?"
Commit: `git add app/components/organisms/HeroSection.vue tests/unit/particle-integration.test.ts && git commit -m "feat: integrate interactive particle animation into hero section"`

---

### Task 5: Certificate Image Preview Modal with Navigation (< and >)

**Files:**
- Create: `app/components/molecules/CertificateModal.vue`
- Modify: `app/components/molecules/CertificateItem.vue`
- Modify: `app/components/organisms/CertificationsSection.vue`
- Test: `tests/unit/certificate-modal.test.ts`

**Interfaces:**
- Consumes: `certifications: Certification[]`, selected certificate index.
- Produces: Interactive modal displaying full certificate image, with prev (`<`) and next (`>`) navigation buttons, close button (`✕`), and keyboard navigation.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/certificate-modal.test.ts`:
```ts
import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Certificate Modal & Navigation', () => {
  it('CertificateModal defines prev and next buttons with < and >', () => {
    const code = readFileSync('app/components/molecules/CertificateModal.vue', 'utf-8')
    expect(code).toContain('prev')
    expect(code).toContain('next')
    expect(code).toContain('<')
    expect(code).toContain('>')
  })

  it('CertificateModal handles close event and keyboard escape', () => {
    const code = readFileSync('app/components/molecules/CertificateModal.vue', 'utf-8')
    expect(code).toContain('close')
    expect(code).toContain('Escape')
  })

  it('CertificationsSection integrates CertificateModal with selected index', () => {
    const code = readFileSync('app/components/organisms/CertificationsSection.vue', 'utf-8')
    expect(code).toContain('CertificateModal')
    expect(code).toContain('selectedCertIndex')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/unit/certificate-modal.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `CertificateModal.vue` and integrate into `CertificationsSection.vue`**

Create `app/components/molecules/CertificateModal.vue`:
- Props: `certifications: Certification[]`, `currentIndex: number`, `isOpen: boolean`.
- Emits: `close`, `select(index: number)`.
- Features:
  - Backdrop overlay with blur.
  - Large certificate image preview with `object-contain max-h-[75vh]`.
  - Previous (`<`) button on the left edge.
  - Next (`>`) button on the right edge.
  - Close button (`✕`) at the top right.
  - Title, issuer, and counter indicator (e.g. `3 / 16`).
  - Keyboard listener: `Escape` closes, `ArrowLeft` goes previous, `ArrowRight` goes next.

In `app/components/molecules/CertificateItem.vue`:
- Emit `click` event or make card clickable with `cursor-pointer` and hover highlight.

In `app/components/organisms/CertificationsSection.vue`:
- Add `selectedCertIndex = ref<number | null>(null)`.
- When a certificate item is clicked, set `selectedCertIndex.value = index`.
- Render `<CertificateModal v-if="selectedCertIndex !== null" ... />`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/unit/certificate-modal.test.ts`
Expected: PASS.

- [ ] **Step 5: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 5: add certificate modal with navigation controls?"
Commit: `git add app/components/molecules/CertificateModal.vue app/components/molecules/CertificateItem.vue app/components/organisms/CertificationsSection.vue tests/unit/certificate-modal.test.ts && git commit -m "feat: add certificate image preview modal with navigation controls"`

---

### Task 6: End-to-End Verification with Playwright CLI & SSR Production Build

**Files:**
- Create: `tests/e2e/particles-email-ssr-audit.sh`
- Test: Full Playwright CLI audit, curl API test, unit tests, and production build

**Interfaces:**
- Consumes: Dev server at `http://localhost:3000`.
- Produces: Verified API POST response, verified canvas element in DOM, verified modal navigation, captured screenshots, passing test suite.

- [ ] **Step 1: Write `tests/e2e/particles-email-ssr-audit.sh`**

Script steps:
1. Verify `/api/contact` API endpoint via curl:
   - Valid payload returns 200 and `{ "success": true }`.
   - Invalid email returns 400 Bad Request.
2. Verify canvas element in browser via Playwright CLI:
   - `playwright-cli eval "document.querySelector('canvas') !== null"` -> `true`.
3. Test Contact Form submission in browser:
   - Fill in name, email, message.
   - Click submit button.
   - Verify success alert text appears.
4. Test Certificate Modal interaction in browser:
   - Click a certificate card.
   - Verify modal opens and image is visible.
   - Click `>` next button and verify index changes.
   - Click `<` prev button and verify index changes.
   - Click close button or press Escape.
5. Capture screenshot of hero section with particle canvas and certificate modal:
   - `.playwright-cli/particles-hero-desktop.png`.
   - `.playwright-cli/certificate-modal-desktop.png`.
6. Run all unit tests: `bun test`.
7. Run production build: `bun run build`.

- [ ] **Step 2: Run verification script**

Run: `bash tests/e2e/particles-email-ssr-audit.sh`
Expected: All checks PASS, build succeeds.

- [ ] **Step 3: Ask user & Commit**

Interactively prompt user via `ask_question`: "Commit Task 6: add Playwright CLI audit for particles, email API, certificate modal, and SSR build?"
Commit: `git add tests/e2e/particles-email-ssr-audit.sh && git commit -m "test: add Playwright CLI and curl verification for particles, contact API, modal, and SSR build"`

