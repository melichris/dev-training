# Introduction to Symfony

> The framework is called **Symfony** (not “Symphony”).

Symfony is a PHP framework and collection of reusable components for building web applications, APIs, and command-line tools. It provides structure and common tools so an application does not need to implement routing, request handling, configuration, and service wiring from scratch.

This note is a first look at Symfony. It builds on PHP fundamentals such as Composer, namespaces, classes, and type declarations.

## 1. What happens when a web request arrives?

A typical Symfony request follows this path:

1. The browser sends an HTTP request, such as `GET /hello/Ari`.
2. Symfony's router matches the URL and HTTP method to a route.
3. The route calls a controller.
4. The controller returns a response.
5. Symfony sends that response back to the browser.

For a page, the response might contain HTML. For an API endpoint, it might contain JSON.

## 2. Create a Symfony project

Symfony projects are Composer projects. One way to create a minimal application is:

```sh
composer create-project symfony/skeleton my_project
cd my_project
```

For a traditional web application with commonly used web features, Symfony also provides a `webapp` pack:

```sh
composer require webapp
```

Use the Symfony CLI or a local PHP development server to run the project, following the setup instructions for the environment. The Symfony CLI is optional; Composer and PHP are enough to create and run a Symfony application in a suitable local setup.

## 3. Add a route and controller

A controller is a PHP class or method that handles a request. In a Flex-based Symfony application, create `src/Controller/HelloController.php`:

```php
<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HelloController
{
    #[Route('/hello/{name}', name: 'app_hello', methods: ['GET'])]
    public function hello(string $name): Response
    {
        return new Response(
            'Hello, ' . htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
        );
    }
}
```

The route attribute associates the URL `/hello/{name}` with the `hello()` method. The `{name}` part is a route parameter, so `/hello/Ari` calls the method with `$name` set to `Ari`. The controller returns a Symfony `Response` object.

The example escapes the value before placing it in HTML. For a real HTML page, templates are usually a better choice: Twig escapes output by default when used normally.

## 4. Render a Twig template

For HTML pages, keep presentation in a template rather than building a large HTML string in the controller. After installing Twig if it is not already included:

```sh
composer require symfony/twig-bundle
```

The controller can render a template:

```php
<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HelloController extends AbstractController
{
    #[Route('/hello/{name}', name: 'app_hello', methods: ['GET'])]
    public function hello(string $name): Response
    {
        return $this->render('hello/index.html.twig', [
            'name' => $name,
        ]);
    }
}
```

Create `templates/hello/index.html.twig`:

```twig
<h1>Hello, {{ name }}!</h1>
```

The controller handles the request and passes data to the template. Twig generates the HTML and escapes interpolated values by default.

## 5. Services and dependency injection

As applications grow, controllers should delegate reusable work to services. Symfony's dependency injection container creates and supplies services to the classes that need them.

For example, a small service could format a greeting:

```php
<?php

declare(strict_types=1);

namespace App\Service;

final class GreetingFormatter
{
    public function format(string $name): string
    {
        return 'Hello, ' . $name . '!';
    }
}
```

A controller can request the service through its constructor:

```php
public function __construct(
    private readonly GreetingFormatter $greetingFormatter,
) {
}
```

In the standard Symfony application setup, services under `src/` are generally registered automatically. Constructor injection makes dependencies explicit and easier to replace or test.

## 6. Useful Symfony commands

Symfony provides console commands through `bin/console`. A few useful examples are:

```sh
php bin/console
php bin/console debug:router
php bin/console about
```

- `php bin/console` lists available commands.
- `debug:router` shows registered routes and helps diagnose route matching.
- `about` displays information about the application and its environment.

## Key takeaways

- Symfony is a PHP framework; Composer manages its packages.
- A route maps an HTTP request to a controller action.
- Controllers return responses and should coordinate application behavior rather than contain every detail.
- Twig templates are useful for HTML presentation and escape interpolated values by default.
- Services hold reusable application logic and can be supplied through dependency injection.
- Start by understanding the request → route → controller → response flow, then add framework features as needed.
