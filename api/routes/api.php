<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\ProfileController; 

Route::middleware('guest')->post('/register', [TokenController::class, 'register']);
Route::middleware('guest')->post('/login', [TokenController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [TokenController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [TokenController::class, 'user']);
Route::middleware('auth:sanctum')->post('/account', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->get('/profile-form', [ProfileController::class, 'index']);
Route::middleware('auth:sanctum')->post('/profile', [ProfileController::class, 'store']);
Route::middleware('auth:sanctum')->post('/profile/{id}', [ProfileController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/profile', [ProfileController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/users/search', [FriendshipController::class, 'search']);
Route::middleware('auth:sanctum')->post('/users/{recipient}/friend-request', [FriendshipController::class, 'sendFriendRequest']);
Route::middleware('auth:sanctum')->put('/friend-requests/{friendship}/accept', [FriendshipController::class, 'acceptFriendRequest']);
