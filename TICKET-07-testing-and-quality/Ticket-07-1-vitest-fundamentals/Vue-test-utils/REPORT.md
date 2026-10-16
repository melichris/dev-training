# Weekly Work Report

**Ticket:** Vue-test-utils — Vue Test Utils Component Testing
**Project:** `nuxt-vitest-fundamentals`
**Type:** Training / Skill Development

---

## Work Completed

- Installed `@vue/test-utils` alongside existing Vitest setup
- Built `HelloUser.vue` and tested: greeting renders with props, `v-if` conditional rendering, button click toggles DOM
- Built `Counter.vue` and tested: DOM update after click, emitted event after first click, emitted payload array after two clicks (`[[1], [2]]`)
- Built `AsyncMessage.vue` and tested async behavior with `vi.useFakeTimers()` and `vi.runAllTimersAsync()` — discovered `flushPromises()` alone does not flush `setTimeout` in `happy-dom`
- Built `TaskForm.vue` with Zod validation and tested: form renders correctly, validation error on short title, valid submit emits event with payload, emitted payload contains correct title

## Test Results

```
✓ test/components/AsyncMessage.test.ts   (2 tests)
✓ test/components/Counter.test.ts        (3 tests)
✓ test/components/HelloUser.test.ts      (3 tests)
✓ test/components/TaskForm.test.ts       (4 tests)
✓ test/helpers.test.ts                   (6 tests)
✓ test/useCounter.test.ts                (4 tests)
✓ test/sanity.test.ts                    (1 test)

Test Files: 7 passed
Tests:      23 passed
Duration:   2.04s
```

## Technical Decisions

**`vi.useFakeTimers()` over `flushPromises()` for setTimeout** — `flushPromises()` flushes resolved Promises but does not advance `setTimeout`. Fake timers intercept the timer entirely; `vi.runAllTimersAsync()` fast-forwards all pending timers so the test doesn't wait 100ms in real time.

**`wrapper.get()` over `wrapper.find()` for required elements** — `.get()` throws immediately if the element is missing, giving a clear failure. `.find()` reserved for asserting absence via `.exists() === false`.

**`trigger('submit')` not `trigger('submit.prevent')`** — Vue Test Utils does not process event modifiers in `trigger()`. The `.prevent` modifier lives in the template (`@submit.prevent`) and is handled by Vue, not the test.

## Difficulties / Blockers

| Problem                                           | Resolution                                                     |
| ------------------------------------------------- | -------------------------------------------------------------- |
| `flushPromises()` did not flush `setTimeout`      | Switched to `vi.useFakeTimers()` + `vi.runAllTimersAsync()`    |
| `trigger('submit.prevent')` had no effect         | Changed to `trigger('submit')` — modifiers handled by template |
| `expect(wrapper.find('p')).exists()` wrong syntax | Corrected to `expect(wrapper.find('p').exists())`              |
| `TAskForm.vue` typo in import                     | Fixed casing to `TaskForm.vue`                                 |

## Acceptance Criteria

| Criteria                                              | Status           |
| ----------------------------------------------------- | ---------------- |
| Component mounted and text content asserted           | ✅               |
| Props tested and confirmed to affect rendered output  | ✅               |
| Button click simulated and DOM update asserted        | ✅               |
| Emitted event tested with correct payload             | ✅               |
| Async update tested                                   | ✅ (fake timers) |
| Form tested: valid submit emits, invalid shows errors | ✅               |
| All tests pass with zero failures                     | ✅ (23/23)       |

## Definition of Done

| Requirement                    | Status     |
| ------------------------------ | ---------- |
| All tests passing              | ✅         |
| `npm test` output captured     | ✅         |
| Technical decisions documented | ✅         |
| Screenshot captured            | ✅         |
| Committed                      | ⬜ Pending |

## Next Step

**Day 3 — Testing Pinia stores + mocking API calls.**
