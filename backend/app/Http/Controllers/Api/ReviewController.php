<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RecipeListResource;
use App\Http\Resources\ReviewListResource;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\RecipeDetailResource;
use App\Models\Recipe;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

/**
 * ReviewController
 * 
 * This class is responsible for handling the API requests related to reviews.
 */
class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $reviews = Review::paginate(10);
            return $this->sendResponse(ReviewListResource::collection($reviews), 'Reviews fetched successfully');
        } catch (\Exception $e) {
            Log::error('Error fetching reviews: ' . $e->getMessage());
            return $this->sendError('Error fetching reviews', [], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // Validate request data
            $validatedData = $request->validate([
                'comment' => 'required|string',
                'rating' => 'required|numeric|between:1,5',
                //other fields to be validated here
            ]);

            // Get request data
            $recipeName = $request->input('recipe_name');
            $recipe = Recipe::where('recipe_name', $recipeName)->first();
            if (!$recipe) {
                return $this->sendError('Recipe not found', [], 404);
            }
            $recipeId = $recipe->recipe_id;

            $userName = $request->input('user_name');
            $nameParts = explode(' ', $userName, 2); // limit to 2 parts, in case of middle name
            $firstName = $nameParts[0];
            $lastName = $nameParts[1] ?? '';

            $user = User::where('first_name', $firstName)->where('last_name', $lastName)->first();
            if (!$user) {
                return $this->sendError('User not found', [], 404);
            }
            $userId = $user->user_id;

            $review = Review::create([
                'recipe_id' => $recipeId,
                'user_id' => $userId,
                'comment' => $validatedData['comment'],
                'rating' => $validatedData['rating'],
            ]);

            $review->save();
            Log::info('Review created successfully.', ['review_id' => $review->id]);
            return $this->sendResponse(new ReviewResource($review), 'Review created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating review: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        try {
            $review = Review::findOrFail($id);
            return $this->sendResponse(new ReviewResource($review), 'Review fetched successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to fetch review: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 404);
        }
    }


    public function showByUser()
    {
        try {
            $currentUser = JWTAuth::parseToken()->authenticate();
            $reviews = Review::where('user_id', $currentUser->user_id)->paginate(10);

            return $this->sendResponse(ReviewListResource::collection($reviews), 'Reviews fetched successfully');

        } catch (\Exception $e) {
            Log::error('Error fetching recipes: ' . $e->getMessage());
            return $this->sendError('Error fetching recipes', [], 500);
        }
    }

    public function showByRecipe(string $recipeId)
    {
        try {
            $reviews = Review::where('recipe_id', $recipeId)->paginate(3);
            return $this->sendResponse(ReviewResource::collection($reviews), 'Reviews fetched successfully');
        } catch (\Exception $e) {
            Log::error('Error fetching reviews: ' . $e->getMessage());
            return $this->sendError('Error fetching reviews', [], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id): \Illuminate\Http\JsonResponse
    {
        try {
            $review = Review::findOrFail($id);
            $userId = $review->user_id;
            if(!$this->checkRole('admin') && !$this->checkCurrentUser($userId)) {
                return $this->sendError('Unauthorized', [], 403);
            }
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 404);
        }
        try {
            $validatedData = $request->validate([
                'comment' => 'nullable|string',
                'rating' => 'nullable|numeric|between:1,5',
            ]);

            $review->update($validatedData);

            return $this->sendResponse($review, 'Review updated successfully', 200);
        } catch (\Exception $e) {
            Log::error("Review update failed: " . $e->getMessage());
            return  $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        try {

            $review = Review::findOrFail($id);
            $userId = $review->user_id;
            if(!$this->checkRole('admin') && !$this->checkCurrentUser($userId)) {
                return $this->sendError('Unauthorized', [], 403);
            }
            $review->delete();
            Log::info('Review deleted successfully.', ['review_id' => $id]);
            return $this->sendResponse(null, 'Review deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to delete review: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 500);
        }
    }

        /**
     * Get the recipe information for a given review.
     *
     * @param string $reviewId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRecipeByReview(string $reviewId): \Illuminate\Http\JsonResponse
    {
        try {
            // Find the review by ID
            $review = Review::findOrFail($reviewId);

            // Find the recipe associated with the review
            $recipe = Recipe::findOrFail($review->recipe_id);

            // Return recipe data
            return $this->sendResponse(new RecipeDetailResource($recipe), 'Recipe fetched successfully.');
        } catch (\Exception $e) {
            Log::error('Error fetching recipe by review: ' . $e->getMessage());
            return $this->sendError('Error fetching recipe', [], 500);
        }
    }

    public function storeByRecipe(Request $request, $recipeId)
    {
        try {
            // 验证请求数据
            $validator = Validator::make($request->all(), [
                'comment' => 'nullable|string',
                'rating' => 'nullable|numeric|between:1,5',
            ]);

            // 检查验证失败
            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors(), 400);
            }

            // 验证 Recipe 是否存在
            $recipe = Recipe::find($recipeId);
            if (!$recipe) {
                return $this->sendError('Recipe not found', [], 404);
            }

            // 创建新的 Review
            $review = new Review();
            $review->recipe_id = $recipeId;
            $review->user_id = JWTAuth::parseToken()->authenticate()->user_id; // 假设用户已经通过JWT认证
            $review->comment = $request->input('comment');
            $review->rating = $request->input('rating');
            $review->save();

            return $this->sendResponse(new ReviewResource($review), 'Review created successfully.');

        } catch (\Exception $e) {
            Log::error('Error creating review: ' . $e->getMessage());
            return $this->sendError('Error creating review', [], 500);
        }
    }
}
