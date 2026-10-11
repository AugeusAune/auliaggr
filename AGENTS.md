# AI-Assisted Development Guide & Skill Entry Point

This repository uses AI-assisted workflows powered by **Superpowers** and **Antislop**. Every AI agent interacting with this project MUST adhere to the entry rules and invoke the appropriate skills before taking action.

---

## 1. Skill Router & Entry Points

Before planning, coding, or modifying UI, check and invoke the corresponding skill in `.agents/skills/`:

### Process & Workflow (Superpowers)
- **Start of conversation & tasks**: Read [.agents/skills/using-superpowers/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/using-superpowers/SKILL.md).
- **New features / creative proposals**: Read [.agents/skills/brainstorming/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/brainstorming/SKILL.md) before writing code.
- **Architecting & Task Planning**: Read [.agents/skills/writing-plans/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/writing-plans/SKILL.md).
- **Multi-task / Subagent Execution**: Read [.agents/skills/subagent-driven-development/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/subagent-driven-development/SKILL.md).
- **Single-agent Inline Execution**: Read [.agents/skills/executing-plans/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/executing-plans/SKILL.md).
- **Testing & Implementation**: Read [.agents/skills/test-driven-development/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/test-driven-development/SKILL.md).
- **Debugging & Fixing Issues**: Read [.agents/skills/systematic-debugging/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/systematic-debugging/SKILL.md).
- **Code Review**: Read [.agents/skills/requesting-code-review/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/requesting-code-review/SKILL.md) and [.agents/skills/receiving-code-review/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/receiving-code-review/SKILL.md).
- **Final Verification**: Read [.agents/skills/verification-before-completion/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/verification-before-completion/SKILL.md) before marking work complete.
- **Finishing & Merging**: Read [.agents/skills/finishing-a-development-branch/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/finishing-a-development-branch/SKILL.md).

### Domain & Framework Skills (Nuxt 4, Bun & Design Engineering)
- **Nuxt 4 Architecture & SSR Safety**: [.agents/skills/nuxt4-patterns/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/nuxt4-patterns/SKILL.md). Use for hydration safety, `useAsyncData`, `useFetch`, route rules, and payload size.
- **Bun Runtime & Scripts**: [.agents/skills/bun-runtime/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/bun-runtime/SKILL.md). Use for running tests, bun package management, and script execution.
- **Micro-interactions & Optical Polish**: [.agents/skills/make-interfaces-feel-better/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/make-interfaces-feel-better/SKILL.md). Use for optical alignment, concentric radius, `text-wrap: balance`, and hit areas.
- **Frontend Design Direction**: [.agents/skills/frontend-design-direction/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/frontend-design-direction/SKILL.md). Use for typography, spacing rhythm, and high-end aesthetic decisions.
- **Coding Conventions & Immutability**: [.agents/skills/coding-standards/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/coding-standards/SKILL.md). Baseline cross-project coding conventions for naming, readability, immutability, KISS, DRY, and YAGNI.
- **API Design & Server Routes**: [.agents/skills/api-design/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/api-design/SKILL.md). Use when designing endpoints, status codes, Zod validation, and error envelopes under `server/api/`.
- **SEO & Social Metadata**: [.agents/skills/seo/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/seo/SKILL.md). Use for OpenGraph cards, Twitter meta, semantic schema markup, and Core Web Vitals.

<!-- antislop:start -->
### Quality & Design Filters (Antislop)
For any UI, copy, people/accessibility, mobile layout, or code comments work, read [.agents/skills/antislop/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/antislop/SKILL.md) (core filter) and then the skill for the specific task:
- **UI / Visual Design**: [.agents/skills/antislop-ui/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/antislop-ui/SKILL.md)
- **Copy & Text**: [.agents/skills/antislop-copywriting/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/antislop-copywriting/SKILL.md)
- **Human Accessibility**: [.agents/skills/antislop-human/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/antislop-human/SKILL.md)
- **Mobile / Responsive Layout**: [.agents/skills/antislop-layoutmobile/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/antislop-layoutmobile/SKILL.md)
- **Code Comments & Hygiene**: [.agents/skills/antislop-code/SKILL.md](file:///home/farhan/program/bun/awull-porto/.agents/skills/antislop-code/SKILL.md)

*Rule*: Before starting UI work, determine when antislop applies (during creation or post-build audit). Never deliver generic AI aesthetics (e.g., standard purple/blue gradients or unmotivated card grids without purpose).
<!-- antislop:end -->

---

## 2. Project Architecture, Stack & Mandatory Standards

- **Project Type**: Personal Portfolio Web App
- **Framework**: Nuxt 4 (`app/` directory convention: [app/app.vue](file:///home/farhan/program/bun/awull-porto/app/app.vue))
- **Language**: TypeScript / Vue 3 (Composition API with `<script setup lang="ts">`)
- **Package Manager**: Bun (`bun run dev`, `bun install`, `bun run build`)
- **Styling**: Tailwind CSS

### Mandatory Engineering Rules
All code written in this repository must strictly comply with [.agents/rules/engineering-standards.md](file:///home/farhan/program/bun/awull-porto/.agents/rules/engineering-standards.md):
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
- **DRY, KISS, YAGNI**: No duplicated logic, no over-engineering, zero speculative features.
- **Law of Demeter & CQS**: Avoid train-wreck chaining; strict separation between queries and commands.
- **Guard Clauses**: Maximum 2 levels of nesting; early return on preconditions and error cases; unnested happy path.
- **Functions & Immutability**: Functions ideally 20–30 lines (maximum 50, split immediately if longer); `const` by default; immutability via spread operators.
- **Error Handling**: Empty `catch` blocks are strictly forbidden; fail fast with descriptive errors.
- **API Design**: Standard REST resource nouns, standard HTTP status codes, Zod validation, `{ success, data, error }` envelopes.
- **Git Commits**: Never commit automatically without explicit interactive confirmation via `ask_question`.
