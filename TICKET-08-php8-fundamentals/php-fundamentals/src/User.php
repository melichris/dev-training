<?php

declare(strict_types=1);

namespace App;

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