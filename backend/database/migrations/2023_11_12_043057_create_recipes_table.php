<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id('recipe_id');
            $table->string('recipe_name', 100);
            $table->unsignedBigInteger('user_id');
            $table->integer('cooking_time')->nullable();
            $table->text('step_instruction')->nullable();
            $table->text('description')->nullable();
            $table->string('recipe_image_path', 255)->nullable();
            $table->timestamps();

            // Foreign key
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recipes', function (Blueprint $table) {
            $table->dropForeign('recipes_user_id_foreign');
        });

        Schema::dropIfExists('recipes');
    }
};
