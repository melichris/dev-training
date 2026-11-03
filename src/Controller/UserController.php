<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    #[Route('/api/users', name: 'api_users_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $search = $request->query->getString('search');

        $users = $this->getUsers();

        if ($search !== '') {
            $users = array_filter($users, function (array $user) use ($search): bool {
                return str_contains(mb_strtolower($user['name']), mb_strtolower($search));
            });
            $users = array_values($users);
        }

        return $this->json($users);
    }

    #[Route('/api/users/{id}', name: 'api_users_show', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function show(int $id): JsonResponse
    {
        foreach ($this->getUsers() as $user) {
            if ($user['id'] === $id) {
                return $this->json($user);
            }
        }

        return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
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
