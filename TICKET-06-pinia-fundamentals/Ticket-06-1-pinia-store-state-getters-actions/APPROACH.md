# Implementation Approach — Pinia State Management

**Ticket:** Ticket-06-1-pinia-store-state-getters-actions
**Project:** `nuxt-with-pinia` (new, dedicated Nuxt 4 project — separate from `nuxt-fundamentals`)
**Confirmed API style:** Pinia options-style store (`state`/`getters`/`actions` object), Vue 3 Composition API elsewhere

## Planned Approach — Gradual, Step by Step

1. **Confirm installation & configuration** — verify `pinia` and `@pinia/nuxt` are installed, and `@pinia/nuxt` is registered in `nuxt.config.ts`. Restart the dev server after any config change, since module registration requires a restart rather than hot-reload.

2. **Build the first store — `counter`** — a minimal `state`/`getter`/`action` store (`stores/counter.ts`):
   - `state`: `count`
   - `getter`: `doubleCount`, derived from `count`
   - `action`: `increment`, mutating `count`
     Consume it in `app/pages/index.vue`, confirm state, getter, and action all work together correctly in the browser before moving on.

3. **Extend the store — multiple getters & actions**:
   - Add a second piece of state (e.g. `step`)
   - Add a getter depending on more than one state property (e.g. combining `count` and `step`)
   - Add a parameterized action (e.g. `incrementBy(amount: number)`)
   - Add an action that calls another action via `this` (e.g. a `reset`-adjacent action that calls `increment` internally), to demonstrate action composition within a single store

4. **Use the store across multiple components** — create a second component (e.g. a sibling display-only component) that also consumes `useCounterStore()`, rendered alongside the first in `index.vue`. Trigger the action from one component and confirm the state change is visible in the other, with no props or emits involved — proving Pinia's global reactivity.

5. **Demonstrate `storeToRefs`** — first, intentionally destructure state/getters directly from the store (`const { count } = useCounterStore()`) and show that this breaks reactivity (the destructured value stops updating). Then correct it using `storeToRefs()`, and confirm reactivity is restored. This step is deliberately built as "break it, then fix it" so the reasoning is memorable, not just the correct syntax.

6. **Implement state reset** — add a `$reset()` call or a custom `resetState` action, and demonstrate it restoring the store to its initial values after the state has been changed.

7. **Evidence capture throughout** — screenshots at each milestone (single store working, cross-component reactivity, the `storeToRefs` before/after comparison, and the reset behavior).

## Why This Order

Each step isolates exactly one new Pinia concept and proves it before adding the next: basic store mechanics → richer state/getters/actions → cross-component sharing (Pinia's actual reason for existing) → the `storeToRefs` pitfall (a common real-world bug) → reset (a common real-world need). This mirrors the incremental, verify-before-proceeding approach used on every prior ticket.

## Risks Carried Over From the Ticket

- **Bypassing actions:** all state mutation routed through actions, never direct component-side assignment to store state.
- **Accidentally avoiding the `storeToRefs` pitfall:** Step 5 is deliberately structured to demonstrate the broken behavior first, rather than only ever showing the correct pattern.

## Open Question / Risk

Options-style vs. setup-style store syntax — starting with options-style since it maps directly onto concepts already learned. Setup-style stores may be considered in a later ticket once this mental model is solid.
