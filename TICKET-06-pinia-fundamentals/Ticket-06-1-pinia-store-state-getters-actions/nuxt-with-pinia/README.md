# Nuxt with Pinia

A small Nuxt 4 application for learning the core Pinia concepts used in real client work: stores, state, getters, actions, reactivity, and reset behaviour.

**Ticket:** Ticket-06-1-pinia-fundamentals
**Type:** Training / Skill Development
**Stack:** Nuxt 4, Vue 3, TypeScript, Pinia

## Purpose

This project is focused on understanding how Pinia works in Nuxt and how state is shared across components without props drilling or custom global wiring.

## Concepts Covered

- **Store creation** with `defineStore()`
- **State** as reactive shared data
- **Getters** as computed/derived values
- **Actions** as the place to mutate state and run logic
- **Cross-component access** to the same store instance
- **`storeToRefs`** to preserve reactivity when destructuring
- **Resetting state** back to the initial shape

## Tech & Patterns Demonstrated

- **Pinia integration:** Nuxt module registration and store auto-importing
- **Store structure:** `state`, `getters`, and `actions` inside a single store
- **State access:** reading and updating shared reactive state
- **Derived values:** getters depending on state values
- **Logic placement:** actions used instead of mutating state directly in components
- **Reactivity safety:** using `storeToRefs()` when destructuring state/getters

## Project Structure

```text
nuxt-with-pinia/
├── app/
│   ├── components/
│   ├── pages/
│   └── app.vue
├── stores/
│   └── example-store.ts
├── docs/
│   ├── pinia-store.md
│   ├── pinia-state.md
│   ├── pinia-getters.md
│   ├── pinia-actions.md
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── public/
```

## Getting Started

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:3000`

## Out of Scope

- Pinia persistence / localStorage syncing
- Advanced state composition across multiple stores
- Server-side store concerns beyond standard Nuxt integration
- Full CRUD app patterns beyond the core Pinia learning objective

## Related Documents

- [`../TICKET.md`](../TICKET.md) — scope, acceptance criteria, and learning goals
- [`../REPORT.md`](../REPORT.md) — implementation notes and technical decisions
- [`../docs/pinia-store.md`](../docs/pinia-store.md) — summary of stores
- [`../docs/pinia-state.md`](../docs/pinia-state.md) — reactive state concepts
- [`../docs/pinia-getters.md`](../docs/pinia-getters.md) — derived values and `storeToRefs`
- [`../docs/pinia-actions.md`](../docs/pinia-actions.md) — actions and logic patterns
