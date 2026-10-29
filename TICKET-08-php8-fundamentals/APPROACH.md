# Implementation Approach: PHP Fundamentals

**Ticket:** TICKET-16-php-fundamentals
**Project:** `php-fundamentals`

## Planned Approach

1. **Scaffold.** `mkdir php-fundamentals && cd php-fundamentals`, `composer init`, then add to `composer.json`:
   `"autoload": { "psr-4": { "App\\": "src/" } }`. Run `composer dump-autoload`. Create `src/` and `bin/`.

2. **Typed functions.** `src/Helpers.php` in namespace `App` with static methods `formatUsername(string): string`, `isValidId(int): bool`, `clampNumber(int|float, int|float, int|float): int|float`. File starts with `declare(strict_types=1);`.

3. **Strict mode demo.** In `bin/demo.php`, call `Helpers::isValidId("5")` inside a try/catch for `TypeError` and print the message. Then remove `strict_types` from the calling file, rerun, and observe the silent coercion. Restore it afterwards.

4. **Class.** `src/User.php` with constructor promotion: `public readonly int $id`, `public readonly string $name`, `private ?string $email = null`. Add a `getEmail(): ?string` method and a `displayName(): string` method.

5. **Arrays.** In `bin/demo.php`, build an array of `User` objects. Use `array_filter` to keep users with an email, `array_map` to extract names, and print an associative array (`['id' => 1, 'name' => 'Chris']`) with `print_r`.

6. **Run.** `php bin/demo.php`.

## Key Rules

- `declare(strict_types=1);` must be the first statement in the file (before the namespace)
- No manual `require` for classes, only `require __DIR__ . '/../vendor/autoload.php'`
- One class per file, filename matches class name (PSR-4)
- Use `->` for object access, `$this->` inside methods