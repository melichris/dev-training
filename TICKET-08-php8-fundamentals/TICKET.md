# Ticket 8: PHP Fundamentals

**Type:** Training / Skill Development
**Category:** Backend, PHP 8
**Project:** `php-fundamentals` (new Composer project)
**Status:** Not Started

## Description

Build competency in modern PHP: strict typing, functions, arrays, classes with constructor promotion, namespaces, and Composer PSR-4 autoloading. Mirrors the TypeScript utilities from the Vitest ticket so the concepts map directly.

## Acceptance Criteria

- [ ] Composer project created with PSR-4 autoloading (`App\` mapped to `src/`)
- [ ] Every file declares `strict_types=1`
- [ ] Three typed functions ported from TypeScript: `formatUsername`, `isValidId`, `clampNumber`
- [ ] Strict mode demonstrated: passing `"5"` to an `int` parameter throws `TypeError`
- [ ] `User` class using constructor promotion, `readonly`, and a nullable property
- [ ] Array work: indexed and associative arrays, plus `array_map` and `array_filter` on a list of users
- [ ] A demo script (`bin/demo.php`) runs end to end via autoloading with no manual `require` of classes

## Out of Scope

- PHPUnit testing (comes later)
- Symfony (Day 2 onward)
- Databases

## Definition of Done

- [ ] `php bin/demo.php` runs without errors or warnings
- [ ] Technical decisions documented
- [ ] Committed