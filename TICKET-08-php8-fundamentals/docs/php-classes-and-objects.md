# PHP Classes and Objects: A Summary Lesson

A **class** defines the properties (data) and methods (behavior) its objects have. An **object** is an instance of a class.

## 1. Define a class and create an object

```php
<?php
declare(strict_types=1);

class User
{
    public string $name;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public function greeting(): string
    {
        return "Hello, {$this->name}!";
    }
}

$user = new User('Ari');
echo $user->greeting(); // Hello, Ari!
```

`new User('Ari')` creates an object and calls its constructor. Inside the class, `$this` refers to the current object. Use `->` to access an object's properties and methods.

## 2. Constructor property promotion

Constructor property promotion lets you declare and initialize properties directly in the constructor parameter list. It is useful when the constructor mainly assigns its arguments to properties.

```php
class User
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        private ?string $email = null,
    ) {
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function displayName(): string
    {
        return $this->email === null
            ? $this->name
            : "{$this->name} <{$this->email}>";
    }
}

$user = new User(7, 'Ari', 'ari@example.com');
echo $user->displayName(); // Ari <ari@example.com>

$guest = new User(8, 'Sam');
echo $guest->displayName(); // Sam
```

The visibility and type declarations on promoted parameters also define the properties. Here, `id` and `name` are public and readonly, while `email` is private and may be a string or `null`.

## 3. Visibility: public, private, and protected

Visibility controls where a property or method can be accessed:

| Visibility | Accessible from |
| --- | --- |
| `public` | Anywhere |
| `private` | Only inside the class that declares it |
| `protected` | Inside the declaring class and its subclasses |

Use `public` for the class's intended interface, `private` to hide implementation details, and `protected` when a subclass needs access. In the `User` example, callers use `getEmail()` rather than reading the private `$email` property directly:

```php
$user->getEmail(); // Allowed
// $user->email;   // Error: email is private
```

`protected` is mainly useful with inheritance:

```php
class BaseReport
{
    protected function title(): string
    {
        return 'Monthly report';
    }
}

class SalesReport extends BaseReport
{
    public function heading(): string
    {
        return $this->title(); // A subclass can call a protected method
    }
}

echo (new SalesReport())->heading(); // Monthly report
```

## 4. Readonly properties

A `readonly` property can be initialized once and cannot be reassigned afterward. Constructor-promoted readonly properties are initialized when the object is constructed:

```php
$user = new User(7, 'Ari');
echo $user->name; // Ari

// $user->name = 'Sam'; // Error: cannot modify a readonly property
```

Readonly is appropriate for values that should remain fixed, such as an identifier. It does not make every object reachable through a property deeply immutable; for example, an object stored in a readonly property may itself still be mutable.

## Key takeaways

- A class describes an object's data and behavior; `new` creates an instance.
- Use a constructor to initialize an object's required state.
- Constructor property promotion combines property declaration and constructor assignment.
- Choose visibility deliberately: expose a small public interface and keep internal details private.
- Use nullable types for properties that can be `null`, and `readonly` for values that should not be reassigned.
