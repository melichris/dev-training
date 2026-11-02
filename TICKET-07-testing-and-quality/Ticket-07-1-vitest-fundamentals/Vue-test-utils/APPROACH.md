# Implementation Approach — Vue Test Utils Component Testing

**Ticket:** TICKET-12-vue-test-utils
**Project:** `nuxt-vitest-fundamentals` (continuation from vitest fundametals)

## Planned Approach

1. **Install Vue Test Utils** — `npm install -D @vue/test-utils` in the existing project.

2. **Simple component tests** — create `app/components/HelloUser.vue` (accepts a `name` prop, renders "Hello, {name}!" and a button that toggles a "visible" state). Test in `tests/components/HelloUser.test.ts`:
   - Renders correct text with a given prop
   - Conditional rendering with `v-if` based on prop
   - Button click toggles state — assert DOM update after `await trigger('click')`

3. **Emitted events test** — create `app/components/Counter.vue` (a button that emits `increment` with the new count as payload each time it's clicked). Test:
   - `wrapper.emitted('increment')` exists after click
   - Payload is correct (`[[1], [2]]` after two clicks)

4. **Async test** — create `app/components/AsyncMessage.vue` (on button click, sets a message after a `setTimeout` or a resolved `Promise`). Test with `flushPromises()` to confirm the message appears after the async operation resolves.

5. **Form component test** — test `TaskForm.vue` from the capstone (copy into this project):
   - Mount with no props (create mode)
   - `wrapper.get('input').setValue('ab')` — submit — assert error `'Title must be at least 3 characters'` appears
   - `wrapper.get('input').setValue('Valid title')` — submit — assert `submit` event emitted with correct payload

## Key Rules

- `await wrapper.trigger('event')` — always `await` triggers since they update the DOM asynchronously
- `wrapper.get()` by default, `wrapper.find()` only when asserting absence
- `flushPromises()` imported from `@vue/test-utils` for async operations
