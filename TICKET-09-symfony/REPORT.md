# Implementation Approach: Symfony Routing and Controllers

**Ticket:** TICKET-09-symfony-routing-controllers
**Project:** `symfony-routing-controllers`

## Planned Approach

1. **Install and serve.** `composer create-project symfony/skeleton:"7.4.*" symfony-routing-controllers`, then `cd` in and run `php -S localhost:8000 -t public`. Open `http://localhost:8000` and confirm Symfony answers (a 404 for `/` is expected, since no route exists yet). Add `.gitignore` entries if the skeleton does not (`/vendor/`, `/var/`).

2. **Maker bundle.** `composer require --dev symfony/maker-bundle`, then `php bin/console make:controller UserController`. Read the generated file before editing it.

3. **List route.** In `UserController`, add `#[Route('/api/users', name: 'api_users_list', methods: ['GET'])]` returning `$this->json($users)`. Keep a private `getUsers(): array` method with three users (`id`, `name`, `email`).

4. **Detail route.** `#[Route('/api/users/{id}', name: 'api_users_show', requirements: ['id' => '\d+'], methods: ['GET'])]`. Find the user by id; if missing, return `$this->json(['error' => 'User not found'], 404)`.

5. **Search.** In the list method, accept `Request $request` and read `$request->query->get('search')`. Filter with `array_filter` on the name, then wrap in `array_values` so the JSON stays a list.

6. **Evidence.** Run `php bin/console debug:router` and capture it. Verify with curl: list, one user, `?search=`, `/api/users/999` (404 JSON), `/api/users/abc` (route does not match, so Symfony's own 404).

## Key Rules

- One route per method, always with `name` and `methods`
- Return `Response` objects via `$this->json()`, never `echo`
- `array_values` after any `array_filter` that goes into JSON
- Check `debug:router` first when a URL does not behave