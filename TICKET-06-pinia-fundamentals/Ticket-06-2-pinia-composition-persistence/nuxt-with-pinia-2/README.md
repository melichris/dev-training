# Nuxt 4 Pinia Composition & Persistence

A small shopping portal built with Nuxt 4 and Pinia to demonstrate store composition, authenticated cart behavior, and persisted state across reloads. The app intentionally keeps the logic simple while showing how one store can depend on another and how persistence is configured in a Nuxt client-only plugin.

**Ticket:** TICKET-06-2-pinia-composition-persistence
**Type:** Training / Skill Development
**Stack:** Nuxt 4, Vue 3, TypeScript, Pinia

## Features

- Login flow with a `userStore` controlling authentication state
- Cart functionality driven by a separate `cartStore`
- Cross-store composition: `cartStore` checks `useUserStore().isLoggedIn` before adding new items
- Blocked action when the user is logged out
- Clear success flow when logged in and adding items to the cart
- Persisted user session state across page reloads using `pinia-plugin-persistedstate`
- Manual plugin registration in a client-only Nuxt plugin for browser-safe persistence

## Tech & Patterns Demonstrated

- **Pinia stores:** `userStore` and `cartStore` defined with `defineStore()`
- **Store composition:** `cartStore` imports and reads `useUserStore()` in an action
- **State persistence:** `persist: true` applied to a chosen store, with plugin setup in `app/plugins/persistedstate.client.ts`
- **Client-only plugin registration:** `.client.ts` ensures `localStorage` is available without SSR crashes
- **DevTools verification:** store state can be inspected live while actions trigger state changes

## Project Structure

```text
nuxt-with-pinia-2/
├── app/
│   ├── pages/
│   │   └── index.vue
│   ├── plugins/
│   │   └── persistedstate.client.ts
│   └── stores/
│       ├── cartStore.ts
│       └── userStore.ts
├── nuxt.config.ts
├── package.json
├── README.md
├── tsconfig.json
├── TICKET.md
├── APPROACH.md
├── REPORT.md
└── public/
```

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` and test the flow:

1. Enter a name and log in
2. Try adding an item while logged out to confirm the guard blocks it
3. Log in and add items to the cart
4. Reload the page to confirm the persisted user state remains active

## Type Checking

```bash
npx vue-tsc --noEmit
```

## Out of Scope

- Nuxt-specific persistence module variations outside the manual plugin setup
- Multi-store circular references or advanced store architecture
- Persistent cart items beyond local browser storage behavior
- Production-grade persistence concerns such as encryption or migration

## Related Documents

- [`../TICKET.md`](../TICKET.md) — objective, scope, acceptance criteria, and Definition of Done
- [`../APPROACH.md`](../APPROACH.md) — planned implementation and technical decisions
- [`../REPORT.md`](../REPORT.md) — verification notes, evidence, and implementation details
