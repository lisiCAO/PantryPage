const recipeConfig = [
  {
    name: "recipe_id",
    label: "Recipe ID",
    type: "text",
    mapTo: "id",
  },
  {
    name: "recipe_name",
    label: "Recipe Name",
    type: "text",
    mapTo: "name",
  },
  {
    name: "recipe_image_path",
    label: "Recipe Image",
    type: "file",
    mapTo: "imagePath",
  },
  {
    name: "cooking_time",
    label: "Cooking Time (mins)",
    type: "number",
    mapTo: "cookingTime",
  },
  {
    name: "step_instruction",
    label: "Instructions",
    type: "textarea",
    mapTo: "stepInstruction",
  },
  // Additional fields can be added as required
];

export default recipeConfig;
