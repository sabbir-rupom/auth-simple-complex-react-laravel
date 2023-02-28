<?php

use Illuminate\Support\Facades\Route;
use Modules\Complex\Http\Controllers\CustomerController;

Route::middleware(['auth:sanctum'])->prefix('complex')->group(function () {
    Route::apiResource('customers', CustomerController::class);
});
