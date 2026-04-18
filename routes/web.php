<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RessourcerieController;
use App\Http\Controllers\RessourcerieDashboardController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Health check endpoint for Dokploy
Route::get('/health', function () {
    try {
        // Vérifier la connexion à la base de données
        DB::connection()->getPdo();

        return response()->json([
            'status' => 'healthy',
            'database' => 'connected',
            'timestamp' => now()->toISOString(),
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'unhealthy',
            'database' => 'disconnected',
            'error' => $e->getMessage(),
            'timestamp' => now()->toISOString(),
        ], 503);
    }
});

Route::get('/demo', function () {
    return Inertia::render('Demo/Index');
})->name('demo');

Route::get('/demo/ressourcerie/dashboard', function () {
    return Inertia::render('Ressourcerie/DemoDashboard', [
        'ressourcerieName' => 'La Recyclerie de Lyon',
        'partnerName' => 'Julien Martin',
        'partnerRole' => 'Admin Partner',
        'partnerAvatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdu2XtbLtYSzBp7kdSqz_fE4dDRKQ_HmJaUBPq3SAZQ7JhRMYvciOopxHHg5MT7VFe57D6o22vgCjL7bXVbzyV6SU-GWORTLkBCweRiBy9d7ssQjBJEAccX0lTlEdljnJGEqcnHSGF0F8wOvxYf33V1V7SRMixrwwQQQWk3cvZUsFZGYkbNO2n-78XA7g0yKJoNIj-0efXPOdizpbKdnP8igtr5u3jpgH245cO_jK3PyXAHrUQP9ycGqkhD5MuMwdiTfPYQ437INPV',
        'stats' => [
            'totalSales' => '€12,450',
            'salesChange' => '+12.5% from last month',
            'co2Saved' => '450kg',
            'activeListings' => '124',
            'listingsToday' => '12 items listed today',
        ],
        'activities' => [
            [
                'id' => 1,
                'name' => 'Mid-Century Oak Armchair',
                'imageUrl' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKz7kLItfvOFoMvecytXuh6GgyYDsKhlCqfftkJkKr_hCwhj9WU89kA0V7nKkK-gH4rSLqz1oYJLG9gf2QfmPc6nMBPaURyuKDKYaTrbvP17lBraQt5R3gGir34aSxBhqE4e6yAK4NmXsF1r7NNORqIB4EX1mlaHhLX1XYqnS7wMCmRZXl9DO69LzuQ6KQLnHBKl5HzNYtFZZH26RsRbGbK3wMn-7N_VaPjI7qP2QFumhhBnLWBjp-9gD_Fo7kJnkWaN1n8h39UgIR',
                'action' => 'Sold to Marie L.',
                'user' => 'Marie L.',
                'time' => '2 hours ago',
                'price' => '€85.00',
                'status' => 'completed',
            ],
            [
                'id' => 2,
                'name' => 'Vintage Seiko Diver',
                'imageUrl' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEUxZDbnL6YwgJmd6yxBWlkY-AgLxJHy0O1gsAtHHTGECIZDM1Nb_cW--inHuTWj4a9lm758TzC-aQSSTflmDPfFKWNeU5AGrxC9RmdSuyMl350opK_6gWOf9lj2UHyW-AIRKOhdR_PuB6teu89mkIoQog_kYZY4qlshdM9L0oP5fNubhEFPDV1tVGo3HIpo6mzvxpTtw0LEGSW57SMcEcilbKK-A0gVRfjcFZOEiPNt90e20iWNUUJmvzCIehMOWffKau5G5cAvbE',
                'action' => 'Listed by Team Member: Sarah',
                'user' => 'Sarah',
                'time' => '4 hours ago',
                'price' => '€145.00',
                'status' => 'review',
            ],
            [
                'id' => 3,
                'name' => 'Canon AE-1 Film Camera',
                'imageUrl' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp4qLGdNpthuCjwjcGRXBmYD_5_e4wcE17uDI_HX6IVUHEZTWtAMopK1JyXza6723sCJLt3mL8yo5u8W63yPtYFBbBnt3UxJ7cPs6lLFIF6QOxZ96y9_0YMUj-1EjVDeptcBc3jTVkGhyAxoEv9L-SX5JwjTjpq2-uOfdhFrnA-29YEETUIrZPku4LU0E-ODJ3E6_6TvAR-BqC8H9yoM95vgrKU8jxM6qoXDJPAs9aQzbUrcCxE4HNHjS2jgCeJ8hinC2NZJQEgtkW',
                'action' => 'Sold to Thomas K.',
                'user' => 'Thomas K.',
                'time' => '6 hours ago',
                'price' => '€210.00',
                'status' => 'completed',
            ],
        ],
    ]);
})->name('demo.ressourcier.dashboard');

Route::get('/', function () {
    return Inertia::render('HomePage');
})->name('home');

Route::get('/categories', function () {
    return Inertia::render('Categories/Index');
})->name('categories.index');

Route::get('/departements', [RessourcerieController::class, 'index'])->name('departements.index');
Route::get('/departements/{department}/ressourceries', [RessourcerieController::class, 'byDepartment'])->name('departements.ressourceries');
Route::get('/ressourceries', [RessourcerieController::class, 'index'])->name('ressourceries.index');
Route::get('/ressourceries/{id}', [RessourcerieController::class, 'show'])->name('ressourceries.show');

Route::get('/notre-histoire', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/produits/{id}', [ProductController::class, 'show'])->name('products.show');

// Cart routes
Route::get('/panier', [CartController::class, 'index'])->name('cart.index');
Route::post('/panier/ajouter', [CartController::class, 'add'])->name('cart.add');
Route::put('/panier/items/{item}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/panier/items/{item}', [CartController::class, 'remove'])->name('cart.remove');
Route::delete('/panier/vider', [CartController::class, 'clear'])->name('cart.clear');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('Profile/Edit');
    })->name('profile.edit');

    Route::patch('/profile', function () {
        $user = request()->user();
        $validated = request()->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$user->id],
        ]);

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return back();
    })->name('profile.update');

    Route::put('/profile/password', function () {
        $validated = request()->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        request()->user()->update([
            'password' => bcrypt($validated['password']),
        ]);

        return back();
    })->name('profile.password');

    Route::middleware(['ressourcier'])->group(function () {
        Route::get('/ressourcerie/dashboard', [RessourcerieDashboardController::class, 'index'])
            ->name('ressourcerie.dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
