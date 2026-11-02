<?php

declare(strict_types=1);

namespace App;

class Helpers
{
    public static function formatUsername(string $name): string
    {
        return strtolower(trim($name));
    }

    public static function isValidId(int $id): bool
    {
        return $id > 0;
    }

    public static function clampNumber(int|float $value, int|float $min, int|float $max): int|float
    {
        return min(max($value, $min), $max);
    }
}
?>