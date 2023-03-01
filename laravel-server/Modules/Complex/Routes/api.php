<?php

use Illuminate\Support\Facades\Route;
use Modules\Complex\Http\Controllers\CustomerController;
use Modules\Complex\Http\Controllers\OrderController;
use Modules\Complex\Http\Controllers\ProductController;

Route::middleware(['auth:sanctum'])->prefix('complex')->group(function () {
    Route::apiResource('customers', CustomerController::class);
    Route::get('customers/{customer}/address', [CustomerController::class, 'getAddress']);

    Route::get('products', ProductController::class);

    Route::apiResource('orders', OrderController::class);
    Route::delete('orders/products/{orderProduct}', [OrderController::class, 'removeOrderProduct']);
});
