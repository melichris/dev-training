# Symfony Routing Summary

Routing maps an HTTP method and URL path to a controller action. This project declares routes with Symfony's `#[Route]` attributes in `src/Controller/UserController.php`; `config/routes.yaml` imports controller attributes.

## List and search route

```php
#[Route('/api/users', name: 'api_users_list', methods: ['GET'])]
public function list(Request $request): JsonResponse
```

The route has a stable name and explicitly accepts `GET`. The optional `search` query parameter filters user names without changing the route path:

```text
GET /api/users?search=ali
```

The action lowercases both the query and each name for case-insensitive matching. Since `array_filter` preserves the original keys, the action calls `array_values` so the result serializes as a JSON array, including when a match has a nonzero original key.

## Detail route and requirements

```php
#[Route(
    '/api/users/{id}',
    name: 'api_users_show',
    methods: ['GET'],
    requirements: ['id' => '\d+']
)]
public function show(int $id): JsonResponse
```

The `{id}` placeholder is a route parameter. The `\d+` requirement means this route only matches one or more digits:

- `/api/users/2` reaches the controller.
- `/api/users/999` reaches the controller but returns a JSON 404 when no such user exists.
- `/api/users/abc` does not match this route, so Symfony returns its normal not-found response rather than the controller's JSON error.

## Inspect registered routes

Run this from the Symfony project directory:

```sh
php bin/console debug:router
php bin/console debug:router api_users_show
```

The detailed command shows the route name, path, method, requirement, and controller. The application routes are named and restricted to `GET`; Symfony may also register framework-owned routes.

## HTTP methods

Explicit method lists prevent a read action from accepting writes. A `POST` to `/api/users` does not create data; Symfony rejects the unsupported method with `405 Method Not Allowed` and an `Allow: GET` header.

See [Symfony-controllers.md](./Symfony-controllers.md) for the request/response behavior and example responses.