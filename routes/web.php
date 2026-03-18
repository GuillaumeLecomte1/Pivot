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
