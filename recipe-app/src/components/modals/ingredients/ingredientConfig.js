const ingredientConfig = [
  {
    name: "ingredient_id",
    label: "Ingredient ID",
    type: "text",
    mapTo: "id",
  },
  {
    name: "name",
    label: "Ingredient Name",
    type: "text",
    mapTo: "name",
  },
  {
    name: "img_path",
    label: "Ingredient Image",
    type: "file",
    mapTo: "imagePath",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    mapTo: "description",
  },
  {
    name: "updated_at",
    label: "Updated At",
    type: "date",
    mapTo: "updatedAt",
  },
  // Additional fields can be added as required
];

export default ingredientConfig;
