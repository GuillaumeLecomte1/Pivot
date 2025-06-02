<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Health check endpoint for Dokploy
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'app' => config('app.name'),
        'env' => config('app.env'),
    ]);
});

Route::get('/', function () {
    return Inertia::render('HomePage');
})->name('home');

Route::get('/categories', function () {
    return Inertia::render('Categories/Index');
})->name('categories.index');

Route::get('/ressourceries', function () {
    return Inertia::render('Ressourceries/Index');
})->name('ressourceries.index');

Route::get('/notre-histoire', function () {
    return Inertia::render('About');
})->name('about');

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
