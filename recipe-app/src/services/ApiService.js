// Path context: src/services/ApiService.js
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Default Option
const fetchWithConfig = (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };
  return fetch(url, { ...defaultOptions, ...options });
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || 'An error occurred'); 
    }
  } else {
    // non JSON response
    const text = await response.text();
    throw new Error(`Non-JSON response: ${text}`);
  }
};

const ApiService = {
  /* DashBoard */
  fetchDashboardData: async () => {
      const response = await fetchWithConfig(`${API_BASE_URL}/dashboard`, {
        method: 'GET',
      });
      return handleResponse(response);
  },

  /* Users */
  // user list
  async fetchUsers() {
      const response = await fetchWithConfig(`${API_BASE_URL}/users`, {
      });
      return handleResponse(response);
  },

  async fetchUser(userId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/users/${userId}`);
      return handleResponse(response);
  },

  async createUser(userData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: userData
      });
      return handleResponse(response);
  },

  async updateUser(userId, userData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        body: userData
      });
      return handleResponse(response);
  },

  async deleteUser(userId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
  },

  /* Recipe */
  async fetchRecipes() {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes`);
      return handleResponse(response);
  },

  async fetchRecipe(recipeId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes/${recipeId}`);
      return handleResponse(response);
  },

  async fetchRecipeByUser() {
      const response = await fetchWithConfig(`${API_BASE_URL}/user/recipes`);
      return handleResponse(response);
  },

  async fetchFavoriteRecipeByUser() {
      const response = await fetchWithConfig(`${API_BASE_URL}/user/favorites`);
      return handleResponse(response);
  },

  async addFavoriteRecipeByUser() {
      const response = await fetchWithConfig(`${API_BASE_URL}/user/favorites`, {
        method: 'POST'
      });
      return handleResponse(response);
  },

  async deleteFavoriteRecipeByUser(recipeId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/user/favorites/${recipeId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
  },

  async createRecipe(recipeData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        body: recipeData
      });
      return handleResponse(response);
  },

  async updateRecipe(recipeId, recipeData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: 'PUT',
        body: recipeData
      });
      return handleResponse(response);
  },

  async deleteRecipe(recipeId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
  },

  /* Ingredients */
  async fetchIngredients() {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients`);
      return handleResponse(response);
  },

  async fetchIngredient(ingredientId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients/${ingredientId}`);
      return handleResponse(response);
  },

  async createIngredient(recipeData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients`, {
        method: 'POST',
        body: recipeData
      });
      return handleResponse(response);
  },

  async updateIngredient(ingredientId, ingredientData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients/${ingredientId}`, {
        method: 'PUT',
        body: ingredientData
      });
      return handleResponse(response);
  },

  async deleteIngredient(ingredientId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/ingredients/${ingredientId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
  },

  /* Reviews */
  // reviews list
  async fetchReviews() {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews`);
      return handleResponse(response);
  },

  async fetchReviewsByUser() {
      const response = await fetchWithConfig(`${API_BASE_URL}/user/reviews`);
      return handleResponse(response);
  },

  async fetchReviewsByRecipe(recipeId, page) {
    const response = await fetchWithConfig (`${API_BASE_URL}/recipes/${recipeId}/reviews?page=${page}`);
    return handleResponse(response);
  },
  
  async fetchReview(reviewId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews/${reviewId}`);
      return handleResponse(response);
  },

  async fetchRecipeByReview(reviewId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews/${reviewId}/recipe`);
      return handleResponse(response);
  },

  async createReview(reviewData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        body: reviewData
      });
      return handleResponse(response);
  },

  async createReviewByRecipe(recipeId, reviewData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/recipes/${recipeId}/reviews`, {
        method: 'POST',
        body: reviewData
      });
      return handleResponse(response);
  },

  async updateReview(reviewId, reviewData) {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PUT',
        body: reviewData
      });
      return handleResponse(response);
  },

  async deleteReview(reviewId) {
      const response = await fetchWithConfig(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
  },

  /* Uploads */
  async uploadFile(formData) {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      return handleResponse(response);
  },

  /* Auth */
  // login user
  async login(credentials) {
      const response = await fetchWithConfig(`${API_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const data = await handleResponse(response);
      return data;
  },
  async fetchCurrentUser() {
      const response = await fetchWithConfig(`${API_BASE_URL}/user`);
      return handleResponse(response);
  },

  // logout user
  async logout() {
      const response = await fetchWithConfig(`${API_BASE_URL}/logout`, {
        method: 'POST',
      });
      return handleResponse(response);
  }

  // other APIs
};

export default ApiService;
