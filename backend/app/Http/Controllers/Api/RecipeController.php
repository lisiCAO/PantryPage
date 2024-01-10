<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RecipeListResource;
use App\Http\Resources\RecipeDetailResource;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Class RecipeController
 * 
 * This class is responsible for handling API requests related to recipes.
 */
class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // Get all recipes
        try {
            $recipes = Recipe::withCount(['reviews', 'favorites'])->get();
            return $this->sendResponse(RecipeListResource::collection($recipes), 'Recipes fetched successfully');
        } catch (\Exception $e) {
            Log::error('Error fetching recipes: ' . $e->getMessage());
            return $this->sendError('Error fetching recipes', [], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request The HTTP request object.
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            
            // Data validation
            $validatedData = $request->validate([
                'recipe_name' => 'required|string|max:100',
                'cooking_time' => 'nullable|integer',
                'step_instruction' => 'nullable|string',
                'description' => 'nullable|string',
                'recipe_image_path' => 'nullable|string',
            ]);

            // get current ID
            $user = JWTAuth::parseToken()->authenticate();
            $validatedData['user_id'] = $user->user_id;

            // create new recipe
            $recipe = new Recipe($validatedData);
            $recipe->save(); // save to database
            return $this->sendResponse(new RecipeDetailResource($recipe), 'Recipe created successfully');
        } catch (\Exception $e) {
            Log::error('Error creating recipe: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param string $id The ID of the recipe.
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $recipe = Recipe::with('ingredients')->findOrFail($id);
            return $this->sendResponse(new RecipeDetailResource($recipe), 'Recipe fetched by ID successfully');
        } catch (\Exception $e) {
            Log::error('Error fetching recipe: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request The HTTP request object.
     * @param string $id The ID of the recipe.
     * @return JsonResponse
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $recipe = Recipe::findOrFail($id);
            $userId = $recipe->user_id;
            if(!$this->checkRole('admin') && !$this->checkCurrentUser($userId))
            {
                return $this->sendError('Unauthorized', [], 403);
            }
            $validatedData = $request->validate([
                'recipe_name' => 'required|string|max:100',
                'cooking_time' => 'nullable|integer',
                'step_instruction' => 'nullable|string',
                'description' => 'nullable|string',
                'recipe_image_path' => 'nullable|string',
            ]);

            // Check whether upload a new image
            if (!empty($validatedData['recipe_image_path']) && !empty($recipe->recipe_image_path)) {
                // delete old img
                Storage::delete($recipe->recipe_image_path);
            }
            // update model
            $recipe->update($validatedData);

            return $this->sendResponse(new RecipeDetailResource($recipe), 'Recipe updated successfully');
        } catch (\Exception $e) {
            Log::error('Error updating recipe: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id The ID of the recipe.
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $recipe = Recipe::findOrFail($id);
            $userId = $recipe->user_id;
            if(!$this->checkRole('admin') && !$this->checkCurrentUser($userId))
            {
                return $this->sendError('Unauthorized', [], 403);
            }
            $recipe->delete();
            return $this->sendResponse(null, 'Recipe deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error deleting recipe: ' . $e->getMessage());
            return $this->sendError('Error deleting recipe', [], 500);
        }
    }

    public function showByUser(): JsonResponse
    {
        try {
            $currentUser = JWTAuth::parseToken()->authenticate();
            $recipes = Recipe::where('user_id', $currentUser->user_id)->withCount(['reviews', 'favorites'])->get();
            return $this->sendResponse(RecipeListResource::collection($recipes), 'Recipes fetched by user ID successfully');
        } catch (\Exception $e) {
            Log::error('Error fetching recipes: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 500);
        }
    }
}
