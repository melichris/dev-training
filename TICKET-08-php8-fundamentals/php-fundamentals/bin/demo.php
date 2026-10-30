<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use App\Helpers;
use App\User;

function section(string $title): void
{
    echo "\n--- {$title} ---\n";
}

section('formatUsername');
echo Helpers::formatUsername('Alice') . "\n";
echo Helpers::formatUsername('  JohnDoe  ') . "\n";

section('isValidId');
var_dump(Helpers::isValidId(5));
var_dump(Helpers::isValidId(0));
var_dump(Helpers::isValidId(-3));

section('clampNumber');
echo Helpers::clampNumber(-5, 1, 10) . "\n";
echo Helpers::clampNumber(15, 1, 10) . "\n";
echo Helpers::clampNumber(5, 1, 10) . "\n";

section('strict_types');
try {
    var_dump(Helpers::isValidId('5'));
} catch (TypeError $e) {
    echo 'TypeError: ' . $e->getMessage() . "\n";
}

section('User');
$user1 = new User(1, 'Exsie', 'alice@example.com');
$user2 = new User(2, 'Alex');
$user3 = new User(3, 'chris', 'chris@gmail.com');

echo $user1->displayName() . "\n";
echo $user2->displayName() . "\n";
echo $user3->displayName() . "\n";
var_dump($user2->getEmail());

try {
    $user1->name = 'meli';
} catch (Error $e) {
    echo 'Error: ' . $e->getMessage() . "\n";
}

section('Arrays');
$users = [$user1, $user2, $user3];

$usersWithEmail = array_values(
    array_filter($users, fn(User $u): bool => $u->getEmail() !== null)
);
echo 'Without array_values: ' . json_encode($filtered) . "\n";
echo 'With array_values:    ' . json_encode($usersWithEmail) . "\n";

$names = array_map(fn(User $u): string => $u->name, $usersWithEmail);
$userArray = ['id' => 1, 'name' => 'Chris', 'email' => null];

echo "Associative array:\n";
print_r($userArray);

echo "Filtered users:\n";
print_r($usersWithEmail);

echo "Names:\n";
print_r($names);