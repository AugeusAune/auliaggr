# Aulia Anggraeni — Personal Portfolio Web App

> Modern UI/UX Designer & Graphic Designer Portfolio built with **Nuxt 4**, **Vue 3**, **TypeScript**, **Tailwind CSS**, and **Nitro Server Engine**.

![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat&logo=nuxt.js)
![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat&logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)
![Bun](https://img.shields.io/badge/Bun-1.4-000000?style=flat&logo=bun)
![Nodemailer](https://img.shields.io/badge/Nodemailer-SMTP-007ACC?style=flat)

---

## ✨ Features

- **Ambient Particle Canvas**: Lightweight 60fps HTML5 Canvas interactive particle animation with cursor disturbance and SSR-safe lifecycle management.
- **Project Cards with Direct Actions**: Each project card features instant action buttons for **Prototype** and **Behance Study Case**, alongside full project detail views.
- **Certificate Image Preview Modal**: Interactive certificate gallery with `<` and `>` navigation controls, counter badge (`1 / 16`), backdrop blur, and full keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Nodemailer SSR Email API**: Robust server-side endpoint at `/api/contact` powered by Nitro and Nodemailer with strict validation and dev/testing fallback.
- **Connected Timeline & Visual Realism**: Vertical track line connecting career milestones, infinite marquee of partner logos, authentic project imagery, and verified credentials.
- **Expandable Certifications**: High-speed initial load showing top credentials with a smooth "View All Certifications" expand/collapse toggle.
- **Full Test Coverage**: 79+ unit tests using Bun test runner and automated browser E2E verification via Playwright CLI.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

_(Optional: configure `SMTP_USER` and `SMTP_PASS` for live email dispatch. If omitted, the API uses JSON transport fallback without throwing errors)._

### 3. Start Development Server

```bash
bun run dev --port 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

```bash
# Run all unit test suites
bun test

# Run end-to-end audit (API curl, browser canvas, modal navigation, form submission)
bash tests/e2e/particles-email-ssr-audit.sh
```

---

## 🏗️ Production Build

```bash
# Build production bundle
bun run build

# Preview production build locally
bun run preview
# or
node .output/server/index.mjs
```

---

## 📖 Detailed Documentation

For full architecture details, design tokens, component hierarchy, and API schemas, see [docs/PORTFOLIO_SYSTEM_DOCUMENTATION.md](file:///home/farhan/program/bun/awull-porto/docs/PORTFOLIO_SYSTEM_DOCUMENTATION.md).
