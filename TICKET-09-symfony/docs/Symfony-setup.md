# Symfony Setup Summary

This ticket uses a small Symfony 7.4 application named `symfony-routing-controllers`. It exposes a read-only JSON API and keeps its data in memory so the focus stays on framework fundamentals.

## Requirements

- PHP 8.2 or newer
- Composer
- The PHP extensions required by the project manifest

The Composer manifest requires Symfony 7.4 components and maps the `App\` namespace to `src/`.

## Create and run the project

For a new project, Symfony's skeleton can be created with Composer:

```sh
composer create-project symfony/skeleton:"7.4.*" symfony-routing-controllers
cd symfony-routing-controllers
```

Install the project's dependencies when setting up an existing checkout:

```sh
composer install
```

The Symfony console is available at `bin/console`. Inspect the environment and registered routes with:

```sh
php bin/console about
php bin/console debug:router
```

For a lightweight local session, start PHP's built-in server from the project directory:

```sh
php -S 127.0.0.1:8000 -t public public/index.php
```

Then request the API at `http://127.0.0.1:8000/api/users`. Choose another available port if needed. The built-in server is for local development, not production deployment.

## Project layout

```text
symfony-routing-controllers/
├── bin/console
├── config/
├── public/index.php
├── src/Controller/UserController.php
├── var/
├── vendor/
└── composer.json
```

- `public/index.php` is the HTTP entry point.
- `src/Controller/` contains the API controller.
- `config/` contains application and route configuration.
- `vendor/` contains Composer-managed dependencies and generated autoloading.
- `var/` contains runtime cache and logs; it is not application source.

See [Symfony-routing.md](./Symfony-routing.md) for the routes and [Symfony-controllers.md](./Symfony-controllers.md) for how requests are handled.