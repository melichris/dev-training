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
- Added focused learning summaries for Symfony setup, routing, and controllers under `docs/`, plus a completed implementation approach

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
| Project was pushed to the repo root, next to the ticket folders, and a push to `Backend` was rejected as non-fast-forward | Found two local repos sharing one remote. Moved the project into `TICKET-09-symfony/symfony-routing-controllers/` with a rename commit (`9807208`); both pushes were fast-forwards, no force-push |

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
| Core implementation committed with `Refs:#09` | Done: `3d4fb34`, `52d1da5`, `d9f76ea`, `ee530bb`, `823c626`, `ede4f77`, plus the ticket-status commit and the folder move `9807208` |
| Screenshots | Not captured; the terminal output is included as text under Evidence |

## Documentation Review Addendum (2026-11-05)

- Populated `docs/Symfony-setup.md`, `docs/Symfony-routing.md`, and `docs/Symfony-controllers.md` with summaries aligned to the checked-in Symfony project.
- Filled `APPROACH.md` with the implementation steps, design choices, verification commands, and scope boundaries.
- Rechecked `php bin/console about`, `php bin/console debug:router`, PHP syntax for `UserController.php`, and `composer validate --no-check-publish`.
- Started the local PHP server and verified list, filtered list, detail, unknown numeric ID, invalid nonnumeric ID, and unsupported-method responses with `curl`. The numeric unknown ID returns the documented JSON 404; the nonnumeric path is rejected by routing with Symfony's normal 404 response.
- `git diff --check` passes. These documentation and ticket/report updates are not yet committed; the Definition of Done commit item remains open until they are committed with `Refs:#09`.

## Evidence (terminal output)

Screenshots were not captured during the session. The output below is copied as printed in the terminal while the work was done.

### 1. Versions (`php bin/console about`, excerpt)

```
  Version              v7.4.22
  Long-Term Support    Yes
  End of maintenance   11/2028 (in +762 days)
  End of life          11/2029 (in +1127 days)
  Type                 App\Kernel
  Environment          dev
  Debug                true
  Version              8.3.36
```

### 2. Routes (`php bin/console debug:router`)

```
 ---------------- -------- -------------------------- 
  Name             Method   Path                      
 ---------------- -------- -------------------------- 
  _preview_error   ANY      /_error/{code}.{_format}  
  api_users_list   GET      /api/users                
  api_users_show   GET      /api/users/{id}           
 ---------------- -------- -------------------------- 
```

### 3. Detail route (`php bin/console debug:router api_users_show`)

```
+--------------+---------------------------------------------------------+
| Property     | Value    |
+--------------+---------------------------------------------------------+
| Route Name   | api_users_show    |
| Path         | /api/users/{id}    |
| Path Regex   | {^/api/users/(?P<id>\d+)$}sDu    |
| Host         | ANY    |
| Host Regex   |    |
| Scheme       | ANY    |
| Method       | GET    |
| Requirements | id: \d+    |
| Class        | Symfony\Component\Routing\Route    |
| Defaults     | _controller: App\Controller\UserController::show()    |
| Options      | compiler_class: Symfony\Component\Routing\RouteCompiler |
|              | utf8: true    |
+--------------+---------------------------------------------------------+
```

### 4. List endpoint (`curl -si http://localhost:8001/api/users`)

```
HTTP/1.1 200 OK
Host: localhost:8001
Connection: close
X-Powered-By: PHP/8.3.36
Cache-Control: no-cache, private
Date: Mon, 02 Nov 2026 10:27:32 GMT
Content-Type: application/json
X-Robots-Tag: noindex

[{"id":1,"name":"Alice Martin","email":"alice@example.com"},{"id":2,"name":"Bob Kamga","email":"bob@example.com"},{"id":3,"name":"Chris Nguema","email":"chris@example.com"}]
```

### 5. Method restriction (`curl -si -X POST http://localhost:8001/api/users | head -12`, and the removed generated route)

```
HTTP/1.1 405 Method Not Allowed
Host: localhost:8001
Connection: close
X-Powered-By: PHP/8.3.36
Content-Type: text/html; charset=UTF-8
X-Debug-Exception: No%20route%20found%20for%20%22POST%20http%3A%2F%2Flocalhost%3A8001%2Fapi%2Fusers%22%3A%20Method%20Not%20Allowed%20%28Allow%3A%20GET%29
Allow: GET
Cache-Control: no-cache, private
Date: Mon, 02 Nov 2026 10:27:32 GMT
X-Robots-Tag: noindex

$ curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8001/user
404
```

### 6. Detail route and errors (port 8002)

```
$ curl -si http://localhost:8002/api/users | head -9
HTTP/1.1 200 OK
Host: localhost:8002
Connection: close
X-Powered-By: PHP/8.3.36
Cache-Control: no-cache, private
Date: Tue, 03 Nov 2026 15:20:18 GMT
Content-Type: application/json
X-Robots-Tag: noindex

$ curl -si http://localhost:8002/api/users/2 | tail -1
{"id":2,"name":"Bob Kamga","email":"bob@example.com"}

$ curl -si http://localhost:8002/api/users/999 | grep -E "^HTTP|error"
HTTP/1.1 404 Not Found
{"error":"User not found"}

$ curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:8002/api/users/abc
404 text/html; charset=UTF-8

$ curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8002/api/users/2
405
```

### 7. Search (port 8002)

```
$ curl -s "http://localhost:8002/api/users?search=ali"
[{"id":1,"name":"Alice Martin","email":"alice@example.com"}]
$ curl -s "http://localhost:8002/api/users?search=ALI"
[{"id":1,"name":"Alice Martin","email":"alice@example.com"}]
$ curl -s "http://localhost:8002/api/users?search=zzz"
[]
$ curl -s "http://localhost:8002/api/users?search=bob"
[{"id":2,"name":"Bob Kamga","email":"bob@example.com"}]
$ curl -s "http://localhost:8002/api/users" | head -c 60
[{"id":1,"name":"Alice Martin","email":"alice@example.com"},
```

### 8. Composer failure and its cause

```
$ composer create-project symfony/skeleton:"7.4.*" symfony-routing-controllers --no-audit
In Auditor.php line 172:
  [Error]
  Call to undefined function Composer\Advisory\array_all()

$ php -r 'var_dump(PHP_VERSION, function_exists("array_all"));'
string(6) "8.3.36"
bool(false)
```

After installing the official Composer phar (`Composer version 2.11.1`), the same command completed and `ls bin public` showed `console` and `index.php`.

### 9. Git history and repository layout

```
ede4f77 feat: add search filter to GET /api/users via Request query Refs:#09
823c626 feat: add GET /api/users/{id} route with requirements and JSON 404 Refs:#09
ee530bb feat: add GET /api/users/{id} route with requirements and JSON 404 Refs:#09
d9f76ea feat: add GET /api/users list route Refs:#09
52d1da5 feat: generate UserController with maker bundle Refs:#09
3d4fb34 chore: install Symfony 7.4 skeleton Refs:#09

[main 9807208] refactor: move Symfony project into TICKET-09-symfony/symfony-routing-controllers Refs:#09
 20 files changed, 0 insertions(+), 0 deletions(-)
   ede4f77..9807208  main -> main
   ede4f77..9807208  main -> Backend

$ git status -sb
## main...origin/Backend

$ git ls-tree --name-only origin/main
README.md
TICKET-02-recipe-book
TICKET-03-expense-tracker
TICKET-04-nuxt-fundamentals
TICKET-05-loan-simulator
TICKET-06-pinia-fundamentals
TICKET-07-testing-and-quality
TICKET-08-php8-fundamentals
TICKET-09-symfony
Vue-fundametals
```

## Open Items

- A URL rejected by the router (such as `/api/users/abc`) returns Symfony's **HTML** error page, while the controller's own 404 returns JSON. A Vue client would get HTML where it expects JSON. Returning JSON for all API errors is for a later ticket
- Data is hardcoded in the controller (services and dependency injection next)
- No automated tests yet
- Two commits (`ee530bb`, `823c626`) share the same message; history was already pushed, so it was left unchanged
- Not fixed in code: `list(Request $request):JsonResponse` is missing a space before the return type (PSR-12 style)

## Next Step

**Services and dependency injection**: move the user data out of the controller into a service injected by Symfony.