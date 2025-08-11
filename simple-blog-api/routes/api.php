<?php

use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/ping', fn() => ['ok' => true]);

Route::get('posts', [PostController::class, 'index']); // GET /api/posts
Route::get('posts/{slug}', [PostController::class, 'show']); // GET /api/posts/{slug}

Route::post('auth/login', [AuthController::class, 'login']);

// Admin routes (protected by Sanctum)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('posts/trashed', [AdminPostController::class, 'trashed']);
    // CRUD for Posts
    Route::get('posts', [AdminPostController::class, 'index']);
    Route::post('posts', [AdminPostController::class, 'store']); // Create post
    Route::get('posts/{id}', [AdminPostController::class, 'show']);
    Route::put('posts/{id}', [AdminPostController::class, 'update']); // Update post
    Route::delete('posts/{id}', [AdminPostController::class, 'destroy']); // Soft delete

    // Additional admin routes
    Route::patch('posts/{id}/restore', [AdminPostController::class, 'restore']);
    Route::delete('posts/{id}/force', [AdminPostController::class, 'forceDelete']);
});
