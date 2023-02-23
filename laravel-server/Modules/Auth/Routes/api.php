<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\AuthController;
use Modules\Auth\Http\Controllers\LoginController;
use Modules\Auth\Http\Controllers\RegistrationController;

Route::group([
    'middleware' => [
        'throttle:3,1', // Every minute 3 requests only
        'guest'
    ]
], function () {
    Route::post('/register', RegistrationController::class);
    Route::post('/login', LoginController::class);
});

Route::get('login', function() {
    return response()->json([
        'error' => true,
        'message' => 'Unauthorized access'
    ], 401);
})->name('login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
});
