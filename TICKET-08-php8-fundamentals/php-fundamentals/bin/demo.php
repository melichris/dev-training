<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use App\Helpers;

echo "autoload ok\n\n";

// 1. Test formatUsername
echo "--- formatUsername tests ---\n";
echo Helpers::formatUsername("Alice") . "\n";           // normal name
echo Helpers::formatUsername("  JohnDoe  ") . "\n";     // with whitespace

// 2. Test isValidId (using var_dump since echo false is an empty string)
echo "\n--- isValidId tests ---\n";
var_dump(Helpers::isValidId(5));    // true (valid id)
var_dump(Helpers::isValidId(0));    // false (zero)
var_dump(Helpers::isValidId(-3));   // false (negative)

// 3. Test clampNumber
echo "\n--- clampNumber tests ---\n";
echo Helpers::clampNumber(-5, 1, 10) . "\n";  // below min (returns 1)
echo Helpers::clampNumber(15, 1, 10) . "\n";  // above max (returns 10)
echo Helpers::clampNumber(5, 1, 10) . "\n";   // inside range (returns 5)
echo "\n--- strict_types demo ---\n";
try {
    var_dump(Helpers::isValidId("5"));
} catch (TypeError $e) {
    echo "TypeError: " . $e->getMessage() . "\n";
}