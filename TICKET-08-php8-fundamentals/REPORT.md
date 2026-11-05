# Weekly Work Report

**Ticket:** TICKET-08-php8-fundamentals — PHP Fundamentals
**Project:** `php-fundamentals` (Composer project)
**Type:** Training / Skill Development

---

## Work Completed

- Scaffolded a Composer project with PSR-4 autoloading (`App\` mapped to `src/`), verified in `vendor/composer/autoload_psr4.php`
- `src/Helpers.php`: `formatUsername`, `isValidId`, `clampNumber`, ported from the TypeScript utilities, using `declare(strict_types=1)` and union types (`int|float`)
- Updated `isValidId` to accept `int|float` and reject fractional, non-positive, and non-finite IDs, matching the TypeScript `Number.isInteger(id) && id > 0` behavior
- Demonstrated strict mode: passing `"5"` to an `int` parameter throws `TypeError`; removing `declare` from the calling file makes the same call silently coerce and return `bool(true)`
- `src/User.php`: constructor promotion, `readonly` properties, nullable `?string $email`; verified that modifying a readonly property throws `Error`
- Array work in `bin/demo.php`: `array_filter`, `array_map`, `array_values`, an associative array, `print_r`, and a `json_encode` comparison
- Refactored the demo script with a `section()` helper and removed redundant comments

## Test Results

`php -l bin/demo.php`, `php -l src/Helpers.php`, and `php -l src/User.php`: no syntax errors. `php bin/demo.php` runs with no warnings. `composer validate --no-check-publish` passes with the optional warning that no license is specified. Key output:

```
isValidId('5') in strict file:  TypeError ... must be of type int|float, string given
isValidId('5') without declare: bool(true)
isValidId(1.5):                bool(false)
Cannot modify readonly property App\User::$name

Without array_values: {"0":{"id":1,"name":"Exsie"},"2":{"id":3,"name":"chris"}}
With array_values:    [{"id":1,"name":"Exsie"},{"id":3,"name":"chris"}]
```

## Technical Decisions

**`strict_types` in every authored application file.** Without it PHP may coerce scalar arguments. For argument types, the calling file decides, so each authored file that makes calls needs its own declaration; Composer-generated files under `vendor/` are excluded.

**Explicit integer check for IDs.** `isValidId(int|float $id)` mirrors TypeScript's positive-integer check, rejecting fractional and non-finite floats as well as non-positive values. Strict scalar typing separately rejects strings such as `"5"` when called from a strict file.

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
| Every authored application PHP file declares `strict_types=1` | Done |
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
| Existing `$filtered` fix commit | Done (`ade49c1`) |
| Follow-up ID parity fix committed | Pending; changes from this review are uncommitted |

## Open Items

- No automated tests yet; PHPUnit is planned for a later ticket
- The Composer validator reports only the optional missing-license warning.

## Next Step

**Day 2: Symfony routing and controllers.**