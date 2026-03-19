<?php

declare(strict_types=1);

use App\Http\Controllers\DemoController;
use App\Http\Controllers\ProductApiController;
use Illuminate\Support\Facades\Route;

Route::get('/demo/credentials', [DemoController::class, 'credentials']);

Route::middleware('auth')->group(function () {
    Route::post('/products', [ProductApiController::class, 'store']);
    Route::put('/products/{id}', [ProductApiController::class, 'update']);
});
