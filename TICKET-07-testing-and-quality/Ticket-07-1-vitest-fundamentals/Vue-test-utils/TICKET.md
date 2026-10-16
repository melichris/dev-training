# Ticket: Vue Test Utils — Component Testing

**Type:** Training / Skill Development
**Category:** Testing — Vue Test Utils / Vitest
**Project:** `nuxt-vitest-fundamentals` (continuation)
**Status:** Awaiting QA review

## Description

Build competency in component testing using Vue Test Utils v2 alongside Vitest — mounting components, asserting rendered output, simulating user interactions, testing props and emitted events, and handling async updates.

## Context / Background

Day 1 covered pure unit tests (no DOM, no components). Day 2 moves up the testing pyramid to component tests — verifying that a component renders correctly, responds to user input, and communicates correctly with its parent via props and emits. Vue Test Utils v2 is the official testing library for Vue 3 components.

## Detailed Description

### Core Features

**1. Mounting and asserting rendered output**

- Mount a simple component and assert its text content
- Assert conditional rendering (`v-if`) based on props

**2. Testing props**

- Pass props to a mounted component and assert they affect the rendered output correctly

**3. Testing user interactions**

- Simulate a button click with `wrapper.get('button').trigger('click')`
- Assert the DOM updates after the interaction

**4. Testing emitted events**

- Trigger an action that causes the component to emit an event
- Assert the emitted event and its payload using `wrapper.emitted()`

**5. Async testing**

- Use `await nextTick()` or `flushPromises()` after state changes
- Confirm DOM updates are reflected after async operations

**6. Testing a form component**

- Mount `TaskForm.vue` from the capstone (or a simplified version)
- Set input values, submit the form, assert emitted event with correct payload
- Assert validation errors appear when submitting invalid data

### Technical Requirements

- `@vue/test-utils` installed alongside existing Vitest setup
- Tests in `tests/components/` directory
- `mount` used by default, `shallowMount` only where explicitly justified

### Out of Scope

- Pinia store testing (Day 3)
- Mocking API calls (Day 3)
- E2E testing (Day 4)

## Acceptance Criteria

- [ ] Component mounted and text content asserted
- [ ] Props tested and confirmed to affect rendered output
- [ ] Button click simulated and DOM update asserted
- [ ] Emitted event tested with correct payload
- [ ] Async update tested with `nextTick` or `flushPromises`
- [ ] Form component tested: valid submit emits event, invalid submit shows errors
- [ ] All tests pass with zero failures

## Definition of Done

- [ ] All tests passing
- [ ] `npm test` output captured
- [ ] Technical decisions documented
- [ ] Code committed
