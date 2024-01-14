<?php

use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FileUploadController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Login
Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh-token', [AuthController::class, 'refreshToken'])->middleware('parse.jwt');

Route::apiResource('recipes', RecipeController::class)->only(['index', 'show']);
Route::apiResource('reviews', ReviewController::class)->only(['index', 'show']);
Route::get('/recipes/{recipeId}/reviews', [ReviewController::class, 'showByRecipe']);

Route::middleware(['parse.jwt', 'jwt.auth','user'])->group(function () {
    // User
    Route::get('/user/recipes', [RecipeController::class, 'showByUser']);
    Route::get('/user/reviews', [ReviewController::class, 'showByUser']);
    Route::get('/user', [UserController::class, 'getCurrentUser']);
    Route::get('/user/favorites/{recipeId}', [UserController::class, 'getFavorite']);
    Route::delete('/user/favorites/{recipeId}', [UserController::class, 'removeFavorite']);
    Route::post('/user/favorites', [UserController::class, 'addFavorites'])->middleware('jwt.auth');
    Route::get('/user/favorites', [UserController::class, 'listFavorites']);

    Route::get('/reviews/{reviewId}/recipe', [ReviewController::class, 'getRecipeByReview']);
    Route::post('/recipes/{recipeId}/reviews', [ReviewController::class, 'storeByRecipe']);


    // Tables
    Route::apiResource('users', UserController::class);
    Route::apiResource('ingredients', IngredientController::class);
    Route::apiResource('recipes', RecipeController::class)->except(['index', 'show']);
    Route::apiResource('reviews', ReviewController::class)->except(['index', 'show']);
    
    // Functions
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/upload', [FileUploadController::class, 'upload']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
});