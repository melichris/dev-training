# Ticket: Pinia State Management — Store, Getters & Actions

**Type:** Training / Skill Development
**Category:** Frontend — Nuxt 4 / Pinia
**Project:** `nuxt-with-pinia` (new, dedicated Nuxt 4 project)
**Status:** Awaiting QA-review

## Description

Build competency in Pinia, the official Vue 3 / Nuxt state management library, in a dedicated project created specifically for this purpose (`nuxt-with-pinia`). Progress gradually from a minimal single store through the core concepts needed to use Pinia correctly and idiomatically in real Nuxt applications.

## Context / Background

Prior tickets (Recipe Book, Expense Tracker) managed state locally within a single component tree, passed down via props and composables. Pinia addresses a different need: state that must be shared globally across unrelated parts of an application, without prop drilling or an ancestor/descendant relationship. This ticket exists to build that competency in an isolated project, before it is required by a larger feature.

Without this foundation, there is a risk of:

- Reaching for `provide`/`inject` or ad-hoc composable singletons as a workaround for genuinely global state
- Difficulty integrating with real client codebases that use Pinia as their standard state layer

## Detailed Description

### Core Features (built gradually, in order)

**1. Installation & Nuxt Integration**

- Install `pinia` and `@pinia/nuxt`
- Register the `@pinia/nuxt` module in `nuxt.config.ts`
- Confirm auto-import of stores from `stores/`

**2. First Store — State, Getters, Actions**

- Define a store using `defineStore()` (options-style)
- `state`: reactive data owned by the store
- `getters`: computed-like derived values based on state
- `actions`: methods that mutate state
- Consume the store in a page component, confirm reactivity end-to-end

**3. Multiple Getters & Actions**

- Add a second getter that depends on more than one state property
- Add an action that takes a parameter and updates state conditionally
- Add an action that calls another action internally (via `this`)

**4. Using a Store Across Multiple Components**

- Consume the same store from two different components simultaneously
- Confirm state changes in one component are immediately reflected in the other, without props or emits

**5. `storeToRefs`**

- Demonstrate why destructuring a store directly loses reactivity for state/getters
- Use `storeToRefs()` to correctly destructure reactive state/getters while preserving reactivity
- Note that actions do not need `storeToRefs` (they can be destructured directly, or called via the store instance)

**6. Resetting State**

- Implement and demonstrate resetting a store back to its initial state

### Technical Requirements

- Store(s) defined in `stores/` (Nuxt's auto-import convention)
- TypeScript used throughout, with correctly typed state shape (no implicit `any`)
- All state changes routed through actions — no direct state mutation from components

### Out of Scope

- Pinia persistence (e.g. syncing store state to localStorage)
- Store composition (one store using another store) — single-store concepts only for this ticket
- Server-side/SSR-specific store considerations beyond default Nuxt/Pinia integration behavior
- Applying Pinia to a full CRUD feature (deferred to a follow-up ticket)

## Acceptance Criteria

- [ ] Pinia and `@pinia/nuxt` correctly installed and configured in `nuxt-with-pinia`
- [ ] A store is defined with `state`, multiple `getters` (including one depending on multiple state properties), and multiple `actions` (including one taking a parameter, and one action calling another)
- [ ] The store is consumed in at least two different components, with changes in one visibly reflected in the other
- [ ] `storeToRefs` is correctly used to destructure reactive state/getters, with the reactivity-loss problem demonstrated first (destructuring without it) for comparison
- [ ] A reset-to-initial-state mechanism is implemented and demonstrated
- [ ] No TypeScript errors (` vue-tsc --build` clean)

## Risks & Open Points

- **Risk:** Treating actions as optional and mutating state directly from components instead.
  → **Mitigation:** All state changes routed through actions, consistent with this project's existing convention of centralizing logic.
- **Risk:** Missing the `storeToRefs` reactivity pitfall entirely by only ever accessing the store instance directly (e.g. `store.count`) rather than destructuring — the pitfall should be deliberately demonstrated, not avoided by accident.
- **Open Point:** Options-style vs. setup-style store syntax — this ticket uses options-style throughout, since it maps most directly onto concepts already learned (state ≈ data, getters ≈ computed, actions ≈ methods). Setup-style stores may be introduced in a later ticket.

## Definition of Done

- [ ] Implementation completed and manually tested in the browser for every core feature listed above
- [ ] Code compiles with zero TypeScript errors
- [ ] Evidence captured (screenshots demonstrating cross-component reactivity and the reset behavior)
- [ ] Technical decisions and difficulties documented
- [ ] Code committed with clear, descriptive commit messages
