# Engineering Standards, Spec Design & Coding Rules

All code in this repository MUST strictly follow the specifications, principles, and conventions defined in this document without exception.

---

## 1. Core Architecture & Spec Design

### 1.1 Technology Stack & Directory Structure
- **Framework**: Nuxt 4 with Composition API (`<script setup lang="ts">`)
- **Language**: TypeScript (strict mode, zero `any`)
- **Package Manager & Runtime**: Bun (`bun dev`, `bun install`, `bun test`)
- **Styling**: Tailwind CSS (light theme baseline, semantic color tokens)

```
app/
├── app.vue                 # Root shell & persistent layout scaffolding
├── assets/                 # Static assets, CSS tokens
├── components/             # Atomic Design hierarchy
│   ├── atoms/              # Primitive building blocks (AppHeading, AppBadge, AppButton)
│   ├── molecules/          # Combinations of atoms (JourneyCard, ProjectCard)
│   ├── organisms/          # Distinct functional page sections (JourneySection, HeroSection)
│   └── templates/          # Full page layout compositions
├── composables/            # Shared reactive state and logic (usePortfolio, useScrollProgress)
├── data/                   # Static/mock data sources & seed configurations
└── types/                  # Domain contracts, interfaces, and shared types
server/
├── api/                    # Nuxt server endpoints (`defineEventHandler`)
├── middleware/             # Server route guards & request augmentations
└── utils/                  # Server-side utilities, database clients, helpers
```

### 1.2 Separation of Concerns & Layer Responsibilities
- **Components (`app/components/`)**: Pure presentation & user interaction. Zero raw data fetching or complex business transformations inside template blocks.
- **Composables (`app/composables/`)**: Reactive state orchestration, business logic, client-side lifecycle handling. Each composable has a single focused responsibility.
- **Data & Types (`app/data/`, `app/types/`)**: Immutable schemas, strict type definitions, and baseline content data.
- **Server Endpoints (`server/api/`)**: Request validation, authentication check, delegation to server services, standardized response delivery.

---

## 2. Fundamental Engineering Principles (Mandatory)

### 2.1 SOLID Principles

#### S — Single Responsibility Principle (SRP)
- Each module, composable, function, and component must have **one and only one reason to change**.
- Separate presentation, data retrieval, formatting, error handling, and business calculations.
- Components must not mix DOM presentation with server network handling.

#### O — Open/Closed Principle (OCP)
- Code must be **open for extension, closed for modification**.
- Add new behaviors through props, composition, slots, and strategy patterns rather than editing existing battle-tested functions with sprawling `if/else` chains.

#### L — Liskov Substitution Principle (LSP)
- Derived types, component variants, and implementations must be fully substitutable for their base types without altering system correctness.
- Component variants (e.g. `AppButton` variants: `primary`, `secondary`, `outline`) must conform to the same event and accessibility interface.

#### I — Interface Segregation Principle (ISP)
- Clients must not be forced to depend on interfaces or props they do not use.
- Prefer multiple fine-grained, focused interfaces over bloated god-interfaces. Split monolithic types into distinct domain contracts.

#### D — Dependency Inversion Principle (DIP)
- High-level modules must not depend on low-level modules; both must depend on abstractions.
- Inject dependencies via composables, props, or `provide/inject`. Do not hardcode concrete side-effecting singletons inside components.

---

### 2.2 DRY, KISS & YAGNI

#### DRY (Don't Repeat Yourself)
- Every piece of domain knowledge or logic must exist in exactly **one** place in the codebase.
- Duplicate logic must be extracted into focused helper utilities or composables immediately.
- **No magic numbers or strings**: Extract all thresholds, offsets, timeouts, and constants into named constants.

#### KISS (Keep It Simple, Stupid)
- The simplest correct solution is always superior.
- Avoid premature abstractions, unnecessary design patterns, or multi-layered indirection.
- Code readability and clarity > clever one-liners.

#### YAGNI (You Aren't Gonna Need It)
- Implement **only** what is required for the current task.
- Strictly prohibit speculative generality, unused parameters, future-proofing hooks, or hypothetical feature scaffolds.

---

### 2.3 Law of Demeter & CQS

#### Law of Demeter (Principle of Least Knowledge)
- Do not chain property access across multiple layers (`a.getB().getC().doThing()`).
- Components should only interact with their immediate props or dependencies.

#### Command-Query Separation (CQS)
- **Queries**: Retrieve data, calculate values, return a result. Must produce **zero** observable side effects.
- **Commands**: Perform actions, mutate state, emit events. Must return `void` (or promise of `void`). Never mix both in one function.

#### Fail Fast & Defensive Programming
- Validate all inputs immediately at function/endpoint entry points.
- Throw descriptive exceptions or return error responses early. Never fail silently or return `null`/`undefined` without handling.

---

## 3. Coding Style & Function Architecture

### 3.1 Guard Clauses (Strict Nesting Limit)
- **Maximum 2 levels of nesting per function**. Any deeper indentation signals the need to refactor or extract helper functions.
- Handle error states, edge cases, and preconditions at the top with early returns (`return` / `throw`).
- Keep the happy path left-aligned and unnested.

```typescript
// ❌ BAD: Deeply nested conditions
function processMilestone(milestone: Milestone | null, user: User | null) {
  if (milestone) {
    if (user) {
      if (user.hasPermission) {
        return calculateScore(milestone);
      } else {
        throw new Error('Forbidden');
      }
    } else {
      throw new Error('Unauthenticated');
    }
  } else {
    throw new Error('Milestone missing');
  }
}

// ✅ GOOD: Guard clauses, flat happy path
function processMilestone(milestone: Milestone | null, user: User | null): number {
  if (!milestone) throw new Error('Milestone missing');
  if (!user) throw new Error('Unauthenticated');
  if (!user.hasPermission) throw new Error('Forbidden');

  return calculateScore(milestone);
}
```

### 3.2 Function & Class Limits
- **Function Length**: Ideally 20–30 lines. **Maximum 50 lines**. Split longer functions immediately without asking.
- **Class / Module Size**: Maximum 10 public methods. God classes and bloated utility dumping grounds are strictly prohibited.
- **Purity & Immutability**:
  - `const` by default. `let` only when variable reassignment is strictly required. `var` is forbidden.
  - Never mutate objects or arrays directly. Always use spread syntax or immutable updates:
    ```typescript
    // ✅ GOOD: Immutable
    const nextList = [...items, newItem];
    const nextState = { ...state, isActive: true };

    // ❌ BAD: Direct mutation
    items.push(newItem);
    state.isActive = true;
    ```
- **Arrow Functions**: Preferred for callbacks, helpers, and local transformations.

### 3.3 Error Handling
- Empty `try/catch` blocks are strictly forbidden.
- Always log or rethrow errors with actionable context:
  ```typescript
  try {
    await submitInquiry(payload);
  } catch (error) {
    console.error('[ContactForm] Failed to submit inquiry:', error);
    throw new Error(`Inquiry submission failed: ${(error as Error).message}`);
  }
  ```

---

## 4. API Design Standards

All internal and external API endpoints under `server/api/` must follow standard REST patterns:

### 4.1 Resource Naming & HTTP Methods
- Resource names must be **plural, lowercase nouns** in kebab-case:
  - `GET    /api/projects`
  - `GET    /api/projects/:id`
  - `POST   /api/contact`
  - `GET    /api/milestones`
- Never include verbs in endpoint URLs (`/api/getProjects` is forbidden).

### 4.2 Standard HTTP Status Codes
- `200 OK`: Successful retrieval or update.
- `201 Created`: Successful resource creation (include `Location` header if applicable).
- `204 No Content`: Successful action with no response body.
- `400 Bad Request`: Schema validation failure or malformed payload.
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Authenticated but lack permission.
- `404 Not Found`: Resource does not exist.
- `422 Unprocessable Entity`: Semantic data validation error.
- `500 Internal Server Error`: Unexpected server exception (sanitized output only).

### 4.3 Standard Response Envelope
All API endpoints must return structured responses:

```typescript
// Success Response
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Error Response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}
```

### 4.4 Input Validation
- All server handlers must validate request bodies and query parameters at entry using schema validation (e.g. Zod):
  ```typescript
  import { z } from 'zod';

  const ContactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    message: z.string().min(10).max(2000),
  });

  export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Failed',
        data: result.error.errors,
      });
    }

    return { success: true, data: { status: 'sent' } };
  });
  ```

---

## 5. UI, Responsive & Design Standards

### 5.1 Mobile Reflow & Layout
- Mobile is a designed layout, not a squished desktop screen.
- Layouts must hold up across all screen widths from 320px to 1440px+.
- Zero horizontal overflow (`scrollWidth === clientWidth`) at all breakpoints.
- Ensure all text flex children declare `min-w-0` to avoid flex expansion bugs.

### 5.2 Interactive Targets & Spacing
- Touch targets must be at least **44 × 44 px** with adequate touch separation.
- Hover-only interactions must have touch-equivalent tap states.

### 5.3 Theme & Aesthetics (Antislop)
- Adhere strictly to the project's light theme: primary coral (`#EC8F8D`), neutral borders (`border-neutral-200`), dark text (`text-dark` / `#1A1A1A`).
- Reject generic AI aesthetics: no unmotivated card grids, no random purple/blue gradients, no decorative junk without purpose.

---

## 6. Git & Commit Workflow

- **Never commit automatically without user confirmation.**
- Always prompt the user interactively with `ask_question` before executing `git commit`.
- Present clear options: `"Yes, commit the changes"`, `"No, skip committing for now"`.
- Adhere strictly to Conventional Commits:
  - `feat(...)`, `fix(...)`, `refactor(...)`, `docs(...)`, `test(...)`, `chore(...)`.
