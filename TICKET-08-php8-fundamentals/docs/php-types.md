# PHP Types: A Summary Lesson

PHP lets you declare the kinds of values a function accepts and returns. Types make code easier to understand and help PHP catch mistakes before they spread.

## 1. Scalar types

The four basic scalar types are:

| Type | Example |
| --- | --- |
| `int` | `42` |
| `float` | `3.14` |
| `string` | `'hello'` |
| `bool` | `true` |

Use parameter and return types to describe a function's contract:

```php
<?php
declare(strict_types=1);

function formatUsername(string $name): string
{
    return strtolower(trim($name));
}

function isValidId(int $id): bool
{
    return $id > 0;
}

echo formatUsername('  CHRIS  '); // chris
var_dump(isValidId(12));          // bool(true)
```

In `function formatUsername(string $name): string`, the type before `$name` is its parameter type; the type after `):` is the return type.

## 2. Strict typing

Put `declare(strict_types=1);` at the beginning of each PHP file where you want strict scalar argument checking. It must come before other statements (apart from the opening PHP tag and comments).

```php
<?php
declare(strict_types=1);

function double(int $number): int
{
    return $number * 2;
}

echo double(5);   // 10
echo double('5'); // TypeError: string is not accepted as an int
```

Without strict typing, PHP may coerce a numeric string such as `'5'` into an integer when calling a function. Strict typing applies to scalar argument calls made from the file that declares the call; add the declaration to the calling file as well as files defining typed functions. PHP still permits an integer where a `float` is expected, since that conversion does not lose precision.

## 3. Nullable types

A nullable type accepts either the named type or `null`. Use `?Type` or the equivalent union `Type|null`.

```php
<?php
declare(strict_types=1);

function greeting(?string $name): string
{
    if ($name === null) {
        return 'Hello, guest!';
    }

    return 'Hello, ' . $name . '!';
}

echo greeting('Ari'); // Hello, Ari!
echo greeting(null);  // Hello, guest!
```

If a nullable parameter should default to `null`, write that explicitly:

```php
function findEmail(?string $email = null): ?string
{
    return $email;
}
```

The `?` means “may be null”; it does not make the argument optional by itself. The `= null` supplies a default so the caller may omit it.

## 4. Arrays

PHP arrays are ordered maps. They can be used as indexed lists or as associative arrays with named keys.

```php
$colors = ['red', 'green', 'blue']; // Indexed list; indexes start at 0
$user = [
    'id' => 7,
    'name' => 'Ari',
    'active' => true,
]; // Associative array

echo $colors[1];       // green
echo $user['name'];    // Ari
```

Arrays can hold different value types, but a consistent structure makes them easier to work with. For example, a list of users can use the same keys in each item:

```php
$users = [
    ['name' => 'Ari', 'active' => true],
    ['name' => 'Sam', 'active' => false],
    ['name' => 'Lee', 'active' => true],
];

$activeUsers = array_filter(
    $users,
    fn (array $user): bool => $user['active']
);

$activeNames = array_map(
    fn (array $user): string => $user['name'],
    $activeUsers
);

print_r($activeNames); // Ari and Lee (the original indexes are preserved)
```

`array_filter` keeps matching elements and preserves their keys. Use `array_values($activeUsers)` if you need to reindex the result as a zero-based list.

## Key takeaways

- Add parameter and return types to make function contracts clear.
- Use `declare(strict_types=1);` to avoid many silent scalar conversions.
- Use `?Type` when a value can be either that type or `null`.
- Remember that PHP arrays support both list-style indexes and named keys.
- Keep array structures consistent, and use `array_map` and `array_filter` to transform and select data.
