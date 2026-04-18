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

Route::get('/demo/ressourcerie/team', function () {
    return Inertia::render('Ressourcerie/DemoTeam', [
        'currentUser' => [
            'name' => 'Alex Rivière',
            'role' => 'Admin Manager',
            'avatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGyzzqfLEGq36MQKkXp6lS1BGWCG_wJCSSVdLKI2bkAeIATKEZpf1INUu-eJ1rFz7PU-vLPQOW4vor2y_ob5c8peUbNV4UnTNBbx7Kssp0VdIVR2eqKeXMOL-eMqoRG9VA9DTxGtOFHbuvO78fYXZr51wVnh8NgWj3gMO6Z-p52oz98XVlxtzKQyPnYsVV32246YZAHQrWiAYNa-mCKFyfiCBn7RBOKXqlobYDEKrcSJwznaIhYhHDMSJAc_aefe4dDfaB3gmZVAt2',
        ],
        'stats' => [
            'totalStaff' => 24,
            'pendingInvites' => 8,
            'lastActivity' => '14m ago',
        ],
        'members' => [
            [
                'id' => 1,
                'name' => 'Marc Dupont',
                'email' => 'marc.d@ressourcerie.org',
                'avatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMj9Nt4xMPKfGRFERNF-5gJrgVM_ynrv5SYdnIWh6PQDYz3PGpUSKjLPtuGQuJDIh4FVIuRT3FaWqLhL0sNjV4ZaOGS0nSF72Hit56PhQ1P2NBMJGBivZF4QDa5PSET3jZAJnNgycdtH1tD_FePMDFBGlDrzZP2WRSHURXVg_wdtspwl0enS95S8WKaKfgTJw04OZkPRRdnbpGE8J62xB2u_txdfizT9IkbaWaXAQMNJGu1RjlZ7yPSeAh5-kqVmakrVc-VGWCxHp9',
                'role' => 'admin',
            ],
            [
                'id' => 2,
                'name' => 'Sophie Laurent',
                'email' => 'sophie.l@ressourcerie.org',
                'avatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMLcoS3VkG2ZelWln8IDiHD0QKJvtqo94pBbM5g-R2YImUUyA-ZyONwwT4M40O-yFUt8rcp-faWY3nXJ17v1hulIVaY7-XdnriOvspSdqnOCskwdE4CA4CDCOUnIsoJ2IgaBxcq5pUUvqhkv-1zzQ1JWB-yuLtJz0c4Ld84lk47vIDF54gvX5_TVVx10UO5OQpljWl28nXFU2__349XVxNs5eQgq-DGCk9u1GiZwUJA1G99gSu3HCvtSn_v3gs1aZC94IxHd2n3Apt',
                'role' => 'editor',
            ],
            [
                'id' => 3,
                'name' => 'Lucas Bernard',
                'email' => 'lucas.b@ressourcerie.org',
                'avatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGmbAquxCZDcjMGqqI-epfibMs95OAXAtH5uSTAEVsWoKBq9R_DSOGsDKJA9c0faooWywShFMzwNRrhnlA98x9rkJF37uer48iutu6p5STfWv8mgGzq7T43ElAk9Tkl4B4eUOoAXxWnkJFtz67gOfF3uliSHpuJ9nSCAu0FsqHPDUSdluUDmenuneliHHPVWRi1Vgm857CQSdKhDYYXCcPo8pNXaKHfJ9mNMU5vlndXdeR__OZ-a7zhQCAb2sElkJ-csXWcRYwVqMa',
                'role' => 'staff',
            ],
            [
                'id' => 4,
                'name' => 'Emma Petit',
                'email' => 'emma.p@ressourcerie.org',
                'avatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0qBXkXJZkWlvZ9u2aI6lS4QvMRqCqV1e0mN7qY8hT6bKc9L8xZ1oP5dF3gH',
                'role' => 'away',
            ],
        ],
    ]);
})->name('demo.ressourcier.team');

Route::get('/demo/ressourcerie/inventory', function () {
    return Inertia::render('Ressourcerie/DemoInventory', [
        'partnerName' => 'Julien Martin',
        'partnerRole' => 'Admin Partner',
        'partnerAvatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdu2XtbLtYSzBp7kdSqz_fE4dDRKQ_HmJaUBPq3SAZQ7JhRMYvciOopxHHg5MT7VFe57D6o22vgCjL7bXVbzyV6SU-GWORTLkBCweRiBy9d7ssQjBJEAccX0lTlEdljnJGEqcnHSGF0F8wOvxYf33V1V7SRMixrwwQQQWk3cvZUsFZGYkbNO2n-78XA7g0yKJoNIj-0efXPOdizpbKdnP8igtr5u3jpgH245cO_jK3PyXAHrUQP9ycGqkhD5MuMwdiTfPYQ437INPV',
        'items' => [
            [
                'id' => 1,
                'name' => 'Vintage Wooden Chair',
                'category' => 'Furniture',
                'condition' => 'Restored',
                'price' => '€25.00',
                'imageUrl' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhq0fA1mFUNxMXqcvgl2yrAqRryfn6p3ie3KgWMyUjBHmWmjAGjfoNEoAXOETtoGR22iBA5iC8w7nqeCdDMZ5q48k_1y15RUGBGT3dVxPLdLLIOL6sC80qZa2Qvgr_dm9MDYbyZqlOCNXqUEcaVrJC6NZji-_g0czVCOKkPDq16RdnSA89i2pYSy-U2AFy7ssCeZw_ugev7W1JiSjnoRlmNOSrwk3xbqG35VusYh00252s6RJAmg6j-qdqy2Xfyu25S7c6JkCCpHd4',
                'status' => 'in_stock',
            ],
            [
                'id' => 2,
                'name' => 'Retro Table Lamp',
                'category' => 'Decor',
                'condition' => 'Tested Working',
                'price' => '€15.00',
                'imageUrl' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5XC2dc1Mg8U3_JjUpxd1DUfCo6vQDafAwiWCiggsSgE6PMlFzB-75LZdqT7Z7WYRVK_vnop3DJINRCDR-I_WTagPvrdEZ4ZyTghh9xA_I4o7MQ9OyAduNSAlfgyCL6dGFcB3nbjafRwAYN6ugxWCpiV4UH9VZtomOvHjkIDdLM_4BWWUxAdHe79sukIERCM7epfe1m5Fs4lCC0E6OMXHWIyMAQ3QZSZubkxzIXmPjCDeAAi42knRTmNZEqciynmUqfElt6Vhd5tlV',
                'status' => 'in_stock',
            ],
            [
                'id' => 3,
                'name' => 'City Bicycle',
                'category' => 'Sports',
                'condition' => 'Repaired',
                'price' => '€45.00',
                'imageUrl' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3632AV-g2dIWhbO5MmSpHVbZbsObdi4je1GTGewrKp5tb7ZK7vBymM8pvwIhF4wParmAFhlfocNq6Nh7CyI2cbQk3cZvFBzy_ciNU2lvAAGog7prE4xP5a19buI18-9Z5ppFNLIrgAKhM_i1H2A9-9s4SWOxcQhvoqemqOgA5kVJupLchgTNTtNByiRgml47Vbz518CiDT2gRfGAQhZ5ZzFtr8zYKyo6BsDY6M467X7Oe4PFOhSGEaS3f14bZSJffBsUVLC_i6RBD',
                'status' => 'sold',
            ],
            [
                'id' => 4,
                'name' => 'Wooden Bookshelf',
                'category' => 'Furniture',
                'condition' => 'As-Is',
                'price' => '€30.00',
                'imageUrl' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRvy8IPoBcjN_AmH55QFUbPc8xd5xhlFjYJa0X6DL6DkiJ08u-fy62NWB-fls3g4zXpyTNTKzvRpC4h1cpRFoyTgeX60HKdb1V4E-imaXrdUTKsgxd2VeMs-Djg6drZJlE62k2G3ALlMG-CTv9R01FCEOfGMK6I71yW35hUT7D8yba6q3jFDR1q4JAp3CpxZalYOSsPoGle44l57y0SENb2xUCeMfDGZzeFfugoSo8tzrXKGdYP0o9fAIdmu-_QYDjW4ZpEPsxNJ0W',
                'status' => 'needs_repair',
            ],
            [
                'id' => 5,
                'name' => 'Wall Mirror',
                'category' => 'Decor',
                'condition' => 'Good Condition',
                'price' => '€20.00',
                'imageUrl' => '',
                'status' => 'in_stock',
            ],
        ],
    ]);
})->name('demo.ressourcier.inventory');

Route::get('/demo/ressourcerie/analytics', function () {
    return Inertia::render('Ressourcerie/DemoAnalytics', [
        'partnerName' => 'Julien Martin',
        'partnerRole' => 'Admin Partner',
        'partnerAvatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdu2XtbLtYSzBp7kdSqz_fE4dDRKQ_HmJaUBPq3SAZQ7JhRMYvciOopxHHg5MT7VFe57D6o22vgCjL7bXVbzyV6SU-GWORTLkBCweRiBy9d7ssQjBJEAccX0lTlEdljnJGEqcnHSGF0F8wOvxYf33V1V7SRMixrwwQQQWk3cvZUsFZGYkbNO2n-78XA7g0yKJoNIj-0efXPOdizpbKdnP8igtr5u3jpgH245cO_jK3PyXAHrUQP9ycGqkhD5MuMwdiTfPYQ437INPV',
        'stats' => [
            'totalRevenue' => '€12,450',
            'totalSales' => 156,
            'averageBasket' => '€79.80',
            'conversionRate' => '3.2%',
        ],
        'salesByMonth' => [
            ['month' => 'Jan', 'sales' => 45],
            ['month' => 'Feb', 'sales' => 52],
            ['month' => 'Mar', 'sales' => 48],
            ['month' => 'Apr', 'sales' => 61],
            ['month' => 'May', 'sales' => 55],
            ['month' => 'Jun', 'sales' => 72],
        ],
        'salesByCategory' => [
            ['category' => 'Furniture', 'sales' => 89, 'percentage' => 57],
            ['category' => 'Decor', 'sales' => 45, 'percentage' => 29],
            ['category' => 'Electronics', 'sales' => 22, 'percentage' => 14],
        ],
        'topProducts' => [
            ['id' => 1, 'name' => 'Mid-Century Oak Armchair', 'sales' => 12, 'revenue' => '€1,020'],
            ['id' => 2, 'name' => 'Vintage Seiko Diver Watch', 'sales' => 8, 'revenue' => '€1,160'],
            ['id' => 3, 'name' => 'Canon AE-1 Film Camera', 'sales' => 6, 'revenue' => '€1,260'],
            ['id' => 4, 'name' => 'Retro Table Lamp', 'sales' => 15, 'revenue' => '€225'],
        ],
        'salesByDay' => [
            ['day' => 'Mon', 'sales' => 85],
            ['day' => 'Tue', 'sales' => 62],
            ['day' => 'Wed', 'sales' => 78],
            ['day' => 'Thu', 'sales' => 90],
            ['day' => 'Fri', 'sales' => 95],
            ['day' => 'Sat', 'sales' => 110],
            ['day' => 'Sun', 'sales' => 88],
        ],
    ]);
})->name('demo.ressourcier.analytics');

Route::get('/demo/ressourcerie/settings', function () {
    return Inertia::render('Ressourcerie/DemoSettings', [
        'partnerName' => 'Julien Martin',
        'partnerRole' => 'Admin Partner',
        'partnerAvatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdu2XtbLtYSzBp7kdSqz_fE4dDRKQ_HmJaUBPq3SAZQ7JhRMYvciOopxHHg5MT7VFe57D6o22vgCjL7bXVbzyV6SU-GWORTLkBCweRiBy9d7ssQjBJEAccX0lTlEdljnJGEqcnHSGF0F8wOvxYf33V1V7SRMixrwwQQQWk3cvZUsFZGYkbNO2n-78XA7g0yKJoNIj-0efXPOdizpbKdnP8igtr5u3jpgH245cO_jK3PyXAHrUQP9ycGqkhD5MuMwdiTfPYQ437INPV',
        'ressourcerie' => [
            'name' => 'La Recyclerie de Lyon',
            'address' => 'Rue de la République, 45',
            'city' => 'Lyon',
            'postalCode' => '69002',
            'phone' => '+33 4 78 XX XX XX',
            'email' => 'contact@recyclerie-lyon.fr',
        ],
    ]);
})->name('demo.ressourcier.settings');

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
