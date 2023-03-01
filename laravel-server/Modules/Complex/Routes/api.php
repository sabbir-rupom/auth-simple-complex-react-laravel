<?php

use Illuminate\Support\Facades\Route;
use Modules\Complex\Http\Controllers\CustomerController;
use Modules\Complex\Http\Controllers\ProductController;

Route::middleware(['auth:sanctum'])->prefix('complex')->group(function () {
    Route::apiResource('customers', CustomerController::class);

    Route::get('products', ProductController::class);
});