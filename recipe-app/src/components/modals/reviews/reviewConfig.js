const reviewConfig = [
  {
    name: "review_id",
    label: "Review ID",
    type: "text",
    mapTo: "id", 
  },
  {
    name: "recipe_name",
    label: "Recipe Name",
    type: "text",
    mapTo: "recipeName",
  },
  {
    name: "user_name",
    label: "User Name",
    type: "text",
    mapTo: "userName",
  },
  {
    name: "comment",
    label: "Comment",
    type: "textarea",
    mapTo: "comment",
  },
  {
    name: "rating",
    label: "Rating",
    type: "number",
    mapTo: "rating",
  },
  {
    name: "created_at",
    label: "Created At",
    type: "date",
    mapTo: "createdAt",
  },
  // Additional fields can be added as required
];

export default reviewConfig;
