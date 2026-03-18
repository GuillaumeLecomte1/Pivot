<?php

declare(strict_types=1);

use App\Http\Controllers\DemoController;
use Illuminate\Support\Facades\Route;

Route::get('/demo/credentials', [DemoController::class, 'credentials']);
