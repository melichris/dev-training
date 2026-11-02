# Ticket: Symfony Routing and Controllers

**Type:** Training / Skill Development
**Category:** Backend, Symfony 7.4 LTS
**Project:** `symfony-routing-controllers` (new Symfony skeleton)
**Status:** Not Started

## Description

Build a small read-only JSON users API in Symfony to learn routing, controllers, the Request and Response objects, route requirements, and the console debugging tools. It mirrors the mock users API built earlier in Nuxt, so the endpoints are familiar.

## Acceptance Criteria

- [ ] Symfony 7.4 skeleton installed and served locally
- [ ] `GET /api/users` returns a JSON list of users
- [ ] `GET /api/users/{id}` returns one user as JSON
- [ ] `{id}` is restricted with `requirements: ['id' => '\d+']`
- [ ] Unknown id returns HTTP 404 with a JSON error body
- [ ] `GET /api/users?search=...` filters the list through the `Request` object, and the result is a JSON list (not an object)
- [ ] Every route has a name and an explicit `methods` list
- [ ] `php bin/console debug:router` output captured as evidence
- [ ] Each endpoint verified with curl (including `/api/users/abc` and `/api/users/999`)

## Out of Scope

- POST/PUT/DELETE and request body validation (next ticket)
- Services and dependency injection (data stays in the controller for now)
- Database and Doctrine
- Automated tests

## Definition of Done

- [ ] All endpoints verified with curl
- [ ] Technical decisions documented
- [ ] Committed (with `Refs:#09` in commit messages)