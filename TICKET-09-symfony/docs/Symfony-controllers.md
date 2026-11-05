# Symfony Controllers Summary

A controller receives a matched request, runs application logic, and returns a response. In this project, `App\Controller\UserController` extends `AbstractController` and implements the list and detail actions for a small in-memory users collection.

## Reading the query string

Symfony injects the `Request` object into the list action. The query bag provides a string value for the optional `search` parameter:

```php
$search = $request->query->getString('search');
```

An empty string means no filter was requested. Otherwise the controller filters names case-insensitively and uses `array_values` to preserve a JSON list shape.

## Returning JSON

The controller uses `$this->json(...)`, which creates a `JsonResponse` with the JSON content type:

```php
return $this->json($users);
```

For a matching detail record it returns one JSON object. If a valid numeric ID is not in the sample data, it returns an explicit JSON error and 404 status:

```php
return $this->json(
    ['error' => 'User not found'],
    Response::HTTP_NOT_FOUND
);
```

The route's numeric requirement rejects nonnumeric paths before the controller action runs; that router-level 404 is not the same response as the controller's unknown-user JSON body.

## Current API behavior

| Request | Expected result |
|---|---|
| `GET /api/users` | JSON array of the three sample users |
| `GET /api/users?search=ali` | JSON array containing Alice |
| `GET /api/users?search=zzz` | Empty JSON array (`[]`) |
| `GET /api/users/2` | JSON object for user 2 |
| `GET /api/users/999` | 404 JSON object: `{"error":"User not found"}` |
| `GET /api/users/abc` | Router-level 404; detail route does not match |
| `POST /api/users` | 405 because the route only allows `GET` |

The user collection is intentionally private to the controller for this fundamentals exercise. A later lesson can move that responsibility into a service or database-backed repository.

## Verify locally

With the server running, use `curl` to inspect both status and response headers:

```sh
curl -i http://127.0.0.1:8000/api/users
curl -i 'http://127.0.0.1:8000/api/users?search=ALI'
curl -i http://127.0.0.1:8000/api/users/2
curl -i http://127.0.0.1:8000/api/users/999
curl -i http://127.0.0.1:8000/api/users/abc
curl -i -X POST http://127.0.0.1:8000/api/users
```