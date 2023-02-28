<?php

use Illuminate\Support\Facades\Route;

Route::prefix('complex')->group(function() {
    Route::get('/', fn() => 'Complex module');
});
