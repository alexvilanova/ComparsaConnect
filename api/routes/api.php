<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;

Route::middleware('guest')->post('/register', [TokenController::class, 'register']);
Route::middleware('guest')->post('/login', [TokenController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [TokenController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/verifytoken', [TokenController::class, 'verifyToken']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
