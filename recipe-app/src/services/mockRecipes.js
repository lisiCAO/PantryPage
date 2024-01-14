export const mockRecipesList = {
    success: true,
    data: [
      {
        id: 1,
        name: "Tomato Soup",
        createdAt: "2023-12-28 14:33:19",
        updatedAt: "2024-01-02 17:15:35",
        createdBy: "Alice M",
        reviewsCount: 3,
        favoritesCount: 1,
      },
      {
        id: 2,
        name: "Potato Salad",
        createdAt: "2023-12-28 14:33:19",
        updatedAt: "2024-01-02 17:15:56",
        createdBy: "Bob T",
        reviewsCount: 0,
        favoritesCount: 1,
      },
      {
        id: 3,
        name: "Onion Pie",
        createdAt: "2023-12-28 14:33:19",
        updatedAt: "2024-01-02 17:16:10",
        createdBy: "Charlie C",
        reviewsCount: 0,
        favoritesCount: 1,
      },
    ],
    message: "Recipes fetched successfully",
  };
  export const mockRecipeDetails2 = { succes: false, message: "Recipe not found" };
  // mock data
  export const mockRecipeDetails = {
    success: true,
    data: {
      id: 1,
      name: "Tomato Soup",
      createdAt: "2023-12-28 14:33:19",
      updatedAt: "2024-01-02 17:15:35",
      createdBy: "Alice M",
      stepInstruction: "Step-by-step instructions for Tomato Soup.",
      cookingTime: 30,
      ingredients: [
        { name: "Tomato", quantity: "2", unit: "Cup" },
        { name: "Potato", quantity: "1", unit: "Cup" },
        { name: "Onion", quantity: "0.5", unit: "Cup" },
      ],
    },
    message: "Recipe fetched by ID successfully",
  };