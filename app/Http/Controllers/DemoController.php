<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

final class DemoController extends Controller
{
    /**
     * Return demo credentials for client and ressourcier users.
     * No authentication required.
     */
    public function credentials(): JsonResponse
    {
        return response()->json([
            'client' => [
                'email' => 'client@demo.pivot',
                'password' => 'demo123',
            ],
            'ressourcier' => [
                'email' => 'ressourcier@demo.pivot',
                'password' => 'demo123',
            ],
        ]);
    }
}
