<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    #[Route('/api/users', name: 'api_users_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->json($this->getUsers());
    }

    private function getUsers(): array
    {
        return [
            ['id' => 1, 'name' => 'Alice Martin', 'email' => 'alice@example.com'],
            ['id' => 2, 'name' => 'Bob Kamga', 'email' => 'bob@example.com'],
            ['id' => 3, 'name' => 'Chris Nguema', 'email' => 'chris@example.com'],
        ];
    }
}

