<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Support\Facades\Route;
use Modules\Simple\Http\Controllers\ItemController;

Route::prefix('simple')->group(function() {
    Route::apiResource('items', ItemController::class);

    Route::get('heads', [ItemController::class, 'itemHeads']);
});
