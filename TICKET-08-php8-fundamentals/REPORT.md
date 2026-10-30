# Weekly Work Report

**Ticket:** TICKET-08-php8-fundamentals — PHP Fundamentals
**Project:** `php-fundamentals` (Composer project)
**Type:** Training / Skill Development

---

## Work Completed

- Scaffolded a Composer project with PSR-4 autoloading (`App\` mapped to `src/`), verified in `vendor/composer/autoload_psr4.php`
- `src/Helpers.php`: `formatUsername`, `isValidId`, `clampNumber`, ported from the TypeScript utilities, using `declare(strict_types=1)` and a union type (`int|float`)
- Demonstrated strict mode: passing `"5"` to an `int` parameter throws `TypeError`; removing `declare` from the calling file makes the same call silently coerce and return `bool(true)`
- `src/User.php`: constructor promotion, `readonly` properties, nullable `?string $email`; verified that modifying a readonly property throws `Error`
- Array work in `bin/demo.php`: `array_filter`, `array_map`, `array_values`, an associative array, `print_r`, and a `json_encode` comparison
- Refactored the demo script with a `section()` helper and removed redundant comments

## Test Results

`php -l bin/demo.php`: no syntax errors. `php bin/demo.php` runs with no warnings. Key output:

```
isValidId('5') in strict file:  TypeError ... must be of type int, string given
isValidId('5') without declare: bool(true)
Cannot modify readonly property App\User::$name

Without array_values: {"0":{"id":1,"name":"Exsie"},"2":{"id":3,"name":"chris"}}
With array_values:    [{"id":1,"name":"Exsie"},{"id":3,"name":"chris"}]
```

## Technical Decisions

**`strict_types` in every file.** Without it PHP coerces silently. For argument types, the calling file decides, so each file that makes calls needs its own declaration.

**Type does the work of a runtime check.** `isValidId(int $id)` needs no `Number.isInteger` equivalent, because strict mode already rejects `1.5` and `"5"`.

**`array_values` after `array_filter`.** `array_filter` preserves original keys, leaving gaps (`0, 2`). An array with gaps serializes to a JSON object instead of a list, which would break a frontend expecting an array. Reindexing restores a list.

**Private `email` is invisible to `json_encode`.** Only public properties serialize, while `print_r` still shows the private property in debug output.

**Filter callback defined once (`$hasEmail`).** Avoids two copies drifting apart.

## Difficulties / Blockers

| Problem | Resolution |
|---|---|
| Variables written without `$`, so a parse error | Added `$`; PHP variables always need it |
| `user2::getEmail()` used `::` on an instance method | `::` is for static members; instance methods use `->` |
| `==` used where assignment was intended | `=` assigns, `==` compares |
| Duplicate user id and `#` in an email address | Corrected the test data; PHP does not validate it |
| `Warning: Undefined variable $filtered`, printed `null` | Assigned `$filtered` before use. A warning does not stop the script, and `php -l` cannot detect it |
| Initially filed under the wrong ticket number | Renamed to TICKET-08 |

## Acceptance Criteria

| Criteria | Status |
|---|---|
| Composer project with PSR-4 autoloading | Done |
| Every file declares `strict_types=1` | Done |
| Three typed functions ported from TypeScript | Done |
| Strict mode demonstrated with `TypeError` | Done |
| `User` class: promotion, `readonly`, nullable property | Done |
| Arrays: indexed, associative, `array_map`, `array_filter` | Done |
| Demo script runs via autoloading, no manual class `require` | Done |

## Definition of Done

| Requirement | Status |
|---|---|
| `php bin/demo.php` runs without errors or warnings | Done |
| Technical decisions documented | Done |
| Screenshot | Pending |
| Final fix commit (`$filtered`) | Confirm it is committed |

## Open Items

- No automated tests yet; PHPUnit is planned for a later ticket

## Next Step

**Day 2: Symfony routing and controllers.**