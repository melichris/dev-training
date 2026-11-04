# Weekly Work Report

**Ticket:** TICKET-09-symfony-routing-controllers — Symfony Routing and Controllers
**Project:** `symfony-routing-controllers`
**Type:** Training / Skill Development

---

## Environment

- Symfony **v7.4.22 (LTS)**, maintained until 11/2028
- PHP **8.3.36**
- Composer **2.11.1** (official phar installed in `~/.local/bin`)

## Work Completed

- Installed the Symfony 7.4 skeleton and served it locally with the PHP built-in server
- Installed `symfony/maker-bundle` and generated `UserController`
- Replaced the generated route with `GET /api/users` (`api_users_list`) returning a JSON list
- Added `GET /api/users/{id}` (`api_users_show`) with `requirements: ['id' => '\d+']` and a JSON 404 for unknown ids
- Added a case-insensitive `?search=` filter using the `Request` query bag, reindexed with `array_values`
- Every route has a name and an explicit `methods` list

## Verified Endpoints

| Request | Result |
|---|---|
| `GET /api/users` | 200, `application/json`, list of 3 users |
| `GET /api/users?search=ali` and `?search=ALI` | 200, list with Alice only |
| `GET /api/users?search=zzz` | 200, `[]` |
| `GET /api/users?search=bob` | 200, output starts with `[` (reindexed) |
| `GET /api/users/2` | 200, JSON object for Bob Kamga |
| `GET /api/users/999` | 404, `{"error":"User not found"}` |
| `GET /api/users/abc` | 404, `text/html` (rejected by the router) |
| `POST /api/users` | 405, `Allow: GET` header |
| `POST /api/users/2` | 405 |
| `GET /user` (generated route, removed) | 404 |

`php bin/console debug:router` shows `api_users_list` and `api_users_show`, both `GET`, with `id: \d+` on the detail route.

## Technical Decisions

**Explicit `methods` on every route.** The generated route was `ANY`. Restricting to `GET` makes Symfony answer wrong methods with a 405 and an `Allow` header instead of running the controller.

**`requirements: ['id' => '\d+']`.** The router only matches digits, so `/api/users/abc` never reaches the controller, and other routes (such as a lookup by username) could share the same prefix later.

**`$this->json()` with a `JsonResponse` return type.** The helper sets the JSON content type, and the declared type makes the contract explicit.

**`array_values` after `array_filter`.** Filtering keeps original keys. Without reindexing, a search for Bob would serialize as `{"1":{...}}`, an object. This is the lesson from the PHP ticket, confirmed in an HTTP response.

**`$request->query->getString('search')`.** Returns an empty string when the parameter is missing, so no null check is needed.

**Data held in a private `getUsers()` method.** Deliberately simple for this ticket. Services and dependency injection are the next topic.

## Difficulties / Blockers

| Problem | Resolution |
|---|---|
| `composer create-project` crashed with `Call to undefined function Composer\Advisory\array_all()` | The shell's PHP was 8.3.36, and the apt-packaged Composer called `array_all()`, which needs PHP 8.4+. Installed the official Composer phar, which bundles its own dependencies |
| Half-created project (no `bin/console`, no `public/`) after the crash | Deleted the folder and reinstalled with the new Composer |
| Port 8000 already served another app (`uvicorn`) | Used other ports for Symfony (8001, then 8002) |
| Port 8001 later answered with a different app's 404 page | Recognised it by the Bootstrap page and `HTTP/1.0` headers; switched to 8002 and started with a sanity `curl` |
| `curl` connection errors | The dev server tab had been closed; run the server in its own tab |
| URL typo (`/userer`) | Corrected |

## Acceptance Criteria

| Criteria | Status |
|---|---|
| Symfony 7.4 skeleton installed and served locally | Done |
| `GET /api/users` returns a JSON list | Done |
| `GET /api/users/{id}` returns one user | Done |
| `{id}` restricted with `\d+` | Done |
| Unknown id returns 404 with JSON error body | Done |
| `?search=` filters via `Request`, result is a list | Done |
| Every route named, explicit `methods` | Done |
| `debug:router` output captured | Done |
| Each endpoint verified with curl (including `abc` and `999`) | Done |

## Definition of Done

| Requirement | Status |
|---|---|
| All endpoints verified with curl | Done |
| Technical decisions documented | Done |
| Committed with `Refs:#09` | Done: `3d4fb34`, `52d1da5`, `d9f76ea`, `ee530bb`, `823c626`, `ede4f77` |
| Screenshot | Pending |

## Open Items

- A URL rejected by the router (such as `/api/users/abc`) returns Symfony's **HTML** error page, while the controller's own 404 returns JSON. A Vue client would get HTML where it expects JSON. Returning JSON for all API errors is for a later ticket
- Data is hardcoded in the controller (services and dependency injection next)
- No automated tests yet
- Two commits (`ee530bb`, `823c626`) share the same message; history was already pushed, so it was left unchanged
- Not fixed in code: `list(Request $request):JsonResponse` is missing a space before the return type (PSR-12 style)

## Next Step

**Services and dependency injection**: move the user data out of the controller into a service injected by Symfony.