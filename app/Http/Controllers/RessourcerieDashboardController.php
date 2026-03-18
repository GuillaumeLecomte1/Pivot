<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

final class RessourcerieDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $ressourcerie = $user->ressourcerie;

        $products = $ressourcerie->products()->orderBy('created_at', 'desc')->get();

        return Inertia::render('Ressourcerie/Dashboard', [
            'ressourcerie' => $ressourcerie,
            'products' => $products,
        ]);
    }
}
