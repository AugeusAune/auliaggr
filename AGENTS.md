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

## 2. Project Architecture & Stack

- **Project Type**: Personal Portfolio Web App
- **Framework**: Nuxt 4 (`app/` directory convention: [app/app.vue](file:///home/farhan/program/bun/awull-porto/app/app.vue))
- **Language**: TypeScript / Vue 3 (Composition API with `<script setup lang="ts">`)
- **Package Manager**: Bun (`bun run dev`, `bun install`, `bun run build`)
- **Styling**: Tailwind CSS

### Engineering Standards
- **Guard Clauses**: Early returns for edge cases and errors. Keep the happy path unnested.
- **Function Length**: Keep functions under 30 lines (maximum 50).
- **Error Handling**: Explicit handling mandatory — empty `catch` blocks are strictly forbidden.
- **Clean Code**: Self-documenting code over excessive comments. Avoid AI comment narration.
- **Git Commits**: Never commit automatically without explicit user confirmation.
