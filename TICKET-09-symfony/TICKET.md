# Ticket: Symfony Routing and Controllers

**Type:** Training / Skill Development
**Category:** Backend, Symfony 7.4 LTS
**Project:** `symfony-routing-controllers` (new Symfony skeleton)
**Status:** Implementation and learning summaries verified; documentation updates uncommitted; awaiting QA review

## Description

Build a small read-only JSON users API in Symfony to learn routing, controllers, the Request and Response objects, route requirements, and the console debugging tools. It mirrors the mock users API built earlier in Nuxt, so the endpoints are familiar.

## Acceptance Criteria

- [x] Symfony 7.4 skeleton installed and served locally
- [x] `GET /api/users` returns a JSON list of users
- [x] `GET /api/users/{id}` returns one user as JSON
- [x] `{id}` is restricted with `requirements: ['id' => '\d+']`
- [x] Unknown id returns HTTP 404 with a JSON error body
- [x] `GET /api/users?search=...` filters the list through the `Request` object, and the result is a JSON list (not an object)
- [x] Every application route has a name and an explicit `methods` list
- [x] `php bin/console debug:router` output captured as evidence
- [x] Each endpoint verified with curl (including `/api/users/abc` and `/api/users/999`)

## Out of Scope

- POST/PUT/DELETE and request body validation (next ticket)
- Services and dependency injection (data stays in the controller for now)
- Database and Doctrine
- Automated tests

## Definition of Done

- [x] All endpoints verified with curl
- [x] Technical decisions documented
- [ ] Follow-up documentation changes committed (use `Refs:#09` in the commit message)