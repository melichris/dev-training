# Implementation Approach — Expense Tracker

**Ticket:** TICKET-03-expense-tracker
**Confirmed API style:** Vue 3 Composition API (`<script setup>`)

## Planned Approach

1. **Types first** — define the `Expense` interface (`id`, `description`, `amount`, `date`, `category`, `paid?`), a `Category` union type (`"food" | "transport" | "bills" | "others" | "wife"`), `NewExpense = Omit<Expense, "id">`, and a mock dataset (`Record<number, Expense>`) with a mix of categories and paid/unpaid states. `others` is the category value used by the existing UI and mock data; `wife` is an additional project-specific category.
2. **Reactive state inline first, in a top-level container component (`ExpenseTracker.vue`)** — build `status`, `expenses`, `activeCategory` (including an `"all"` option), and computed values (`filteredExpenses`, `totalAmount`, `unpaidCount`) directly in `ExpenseTracker.vue`, alongside a simulated `onMounted` load. Logic will be written fresh rather than copied from the Recipe Book implementation, using that project only as a structural reference. `ExpenseTracker.vue` is mounted from `App.vue`, mirroring the `RecipeApp.vue` → `App.vue` structure used in TICKET-02, for consistency across tickets.
3. **Component split**, matching the ticket's required architecture:
   - `ExpenseList.vue` — renders `filteredExpenses`, delegates each row to `ExpenseRow`
   - `ExpenseRow.vue` — displays one expense, emits `toggle-paid` with the expense's `id`
   - `ExpenseForm.vue` — validated form (description required, amount must be a positive number), emits `add-expense` with a `NewExpense` payload
   - `TotalsDisplay.vue` — presentational, receives `totalAmount` and `unpaidCount` via props
     All four are orchestrated from `ExpenseTracker.vue`, which owns the `handleAddExpense` and `handleTogglePaid` handlers and passes state/callbacks down as props/event listeners.
4. **Provide/inject** — a `currencySymbol` value provided directly from `ExpenseTracker.vue` and injected by `ExpenseRow.vue` and `TotalsDisplay.vue` for display alongside amounts.
5. **Composable extraction last** — once the full component tree in `ExpenseTracker.vue` works correctly, extract all state and logic into `useExpenses.ts`, leaving `ExpenseTracker.vue` as orchestration + a single composable call.
6. **Evidence capture throughout** — screenshots at each milestone, meaningful commit messages per step.

## Why This Order

Same sequencing as TICKET-02: data shape → reactive behavior → component boundaries → reusable logic, keeping each concern independently testable and avoiding compounding errors across multiple new concepts at once.

## Behavior Decisions

- Category filter choices are `all`, `food`, `transport`, `bills`, `wife`, and `others`. The UI and data retain `others` rather than renaming it to `other`; `wife` is an additional category already used by the application.
- Summary totals and unpaid counts cover all expenses, regardless of the active category filter. Filtering changes the displayed list only.

## Open Question / Risk (carried from ticket)

Whether `amount` should be stored in whole currency units or smallest units (cents) to avoid floating-point rounding issues. Initial approach: store as whole units (e.g. `25.50`) for simplicity at this scope, with the tradeoff documented as a technical decision in the final report — this is a reasonable simplification for a training exercise but would need reconsideration for a production financial application.
