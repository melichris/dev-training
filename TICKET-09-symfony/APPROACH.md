# Implementation Approach: Symfony Routing and Controllers

**Ticket:** TICKET-09-symfony
**Project:** `symfony-routing-controllers`

## Objective

Build a small, read-only JSON users API to practice Symfony 7.4 routing, controller actions, request query parameters, JSON responses, route requirements, and route inspection.

## Implementation

1. Create a Symfony 7.4 skeleton with Composer and keep the project under this ticket folder.
2. Use attribute routes on `src/Controller/UserController.php`; keep the example user data in a private controller method because services and persistence are out of scope.
3. Add a named `GET /api/users` route. Inject `Request`, read the optional `search` query parameter, filter names case-insensitively, and reindex filtered results with `array_values` before returning JSON.
4. Add a named `GET /api/users/{id}` route with a digits-only requirement. Return the matching user as JSON, or a JSON 404 response when the numeric ID is not in the sample data.
5. Restrict both application routes to `GET`. Inspect registered routes with `php bin/console debug:router`.
6. Run the application and verify list, search, detail, unknown numeric ID, invalid nonnumeric ID, and unsupported method behavior with `curl`.
7. Record the route table, representative HTTP responses, and design decisions in `REPORT.md`; document Symfony setup, routing, and controllers in `docs/`.

## Design Decisions

- **Attribute routes:** Keep route definitions next to their controller actions so the URL, method, name, and requirement are easy to review together.
- **Explicit `GET` methods:** These endpoints are read-only; unsupported methods should not invoke their actions.
- **Digits-only ID requirement:** `/api/users/abc` does not match the detail route and is handled by Symfony's not-found flow. An unknown numeric ID reaches the action and returns its JSON 404 body.
- **Reindex filtered results:** `array_filter` retains original keys; `array_values` ensures the response encodes as a JSON list.
- **In-controller sample data:** This avoids introducing a service or database before those topics are covered.

## Verification

From `symfony-routing-controllers/`:

```sh
php bin/console about
php bin/console debug:router
php -l src/Controller/UserController.php
composer validate --no-check-publish
```

With the local server running, check:

```sh
curl -i http://127.0.0.1:8000/api/users
curl -i 'http://127.0.0.1:8000/api/users?search=ali'
curl -i http://127.0.0.1:8000/api/users/2
curl -i http://127.0.0.1:8000/api/users/999
curl -i http://127.0.0.1:8000/api/users/abc
curl -i -X POST http://127.0.0.1:8000/api/users
```

The port can be changed if `8000` is already in use.

## Scope

The implementation intentionally has no write endpoints, request-body validation, database, Doctrine, or separate service layer. Those are outside this ticket.

## Completion

The API implementation and its original curl/route evidence are complete. The documentation summaries and this approach were added during a later review; those documentation edits remain uncommitted until explicitly committed.