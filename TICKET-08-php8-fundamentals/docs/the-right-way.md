# The Right Way: Composer and Namespaces

Composer is PHP's dependency manager. It can also map namespaces to folders so your application classes load automatically instead of requiring each class file by hand.

## 1. Organize a small project

A simple Composer project might look like this:

```text
php-fundamentals/
├── composer.json
├── bin/
│   └── demo.php
├── src/
│   ├── Helpers.php
│   └── User.php
└── vendor/
    └── autoload.php
```

Keep application source code in `src/`, executable scripts in `bin/`, and let Composer manage generated autoload files under `vendor/`.

## 2. Configure PSR-4 autoloading

Add a PSR-4 mapping to `composer.json`:

```json
{
  "name": "example/php-fundamentals",
  "type": "project",
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  }
}
```

The mapping means that a class in the `App` namespace is looked up under `src/`. For example, `App\User` maps to `src/User.php`. Namespace and class names should match the directory and filename, including capitalization.

After adding or changing autoload mappings, regenerate Composer's autoloader:

```sh
composer dump-autoload
```

When starting a new project, `composer init` can create the initial manifest. To install the dependencies recorded in an existing project, use `composer install`.

## 3. Declare a namespace in a class file

The namespace identifies which logical group a class belongs to. In `src/User.php`:

```php
<?php

declare(strict_types=1);

namespace App;

class User
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        private ?string $email = null,
    ) {
    }

    public function displayName(): string
    {
        return $this->email === null
            ? $this->name
            : "{$this->name} <{$this->email}>";
    }
}
```

The full class name is `App\User`. `declare(strict_types=1);` goes before the namespace declaration. Keeping one class in a file named after it makes PSR-4's file mapping predictable.

## 4. Load and use classes in a script

Require Composer's autoloader once at the entry point, then import or fully qualify application classes:

```php
<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use App\User;

$user = new User(7, 'Ari', 'ari@example.com');
echo $user->displayName();
```

`use App\User;` allows the short name `User` in this file. Without the import, use the fully qualified name `new \App\User(...)`. The autoloader finds and loads the class file when the class is first used.

Run the entry point from the project directory:

```sh
php bin/demo.php
```

## 5. Add a class in another namespace

For example, `src/Helpers.php` can declare the same `App` namespace:

```php
<?php

declare(strict_types=1);

namespace App;

class Helpers
{
    public static function formatUsername(string $name): string
    {
        return strtolower(trim($name));
    }
}
```

The script can import both classes:

```php
use App\Helpers;
use App\User;

$user = new User(7, Helpers::formatUsername('  ARI  '));
```

Both classes load through Composer; the script does not need a separate `require` for either source file.

## Common mistakes to avoid

- **Forgetting to regenerate the autoloader:** run `composer dump-autoload` after editing the PSR-4 mapping.
- **Mismatching names:** `namespace App; class User` should be in `src/User.php` for the mapping shown above.
- **Including source files manually:** require `vendor/autoload.php` in the entry point, not every class file.
- **Using the wrong relative path:** `__DIR__` anchors the autoloader path to the script's location, so it works regardless of the current shell directory.
- **Putting statements before the strict-types declaration:** keep `declare(strict_types=1);` immediately after the PHP opening tag (comments may precede it), before the namespace.

## Key takeaways

- Composer manages dependencies and generates the class autoloader.
- PSR-4 maps namespace prefixes to source directories.
- Keep namespace, class name, folder, and filename aligned.
- Require Composer's autoloader once in the application entry point.
- Use `namespace` to define a class's full name and `use` to import it with a short name.
