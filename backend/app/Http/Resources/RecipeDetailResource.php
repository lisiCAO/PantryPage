<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage; // Add this line to import the Storage class
/**
 * Class RecipeDetailResource
 *
 * This class represents a resource for transforming a recipe detail into an array.
 *
 * @package App\Http\Resources
 */
class RecipeDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request The request object.
     * @return array<string, mixed> The transformed resource as an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->recipe_id,
            'name' => $this->recipe_name,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updatedAt' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            'createdBy' => $this->user->first_name .' '. $this->user->last_name,
            'imagePath' => $this->recipe_image_path,
            'cookingTime' => $this->cooking_time,
            'stepInstruction' => $this->step_instruction,
            'ingredients' => $this->ingredients->map(function ($ingredient) {
                return [
                    'name' => $ingredient->name,
                    'quantity' => $ingredient->pivot->quantity,
                    'unit' => $ingredient->pivot->measurement_unit
                ];
            }),
        ];
    }
}
