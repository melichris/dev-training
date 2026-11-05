<?php

declare(strict_types=1);

namespace App;

class Helpers
{
    public static function formatUsername(string $name): string
    {
        return strtolower(trim($name));
    }

    public static function isValidId(int|float $id): bool
    {
        if ($id <= 0) {
            return false;
        }

        return is_int($id) || (is_finite($id) && floor($id) === $id);
    }

    public static function clampNumber(int|float $value, int|float $min, int|float $max): int|float
    {
        return min(max($value, $min), $max);
    }
}
?>