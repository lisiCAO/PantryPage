### API Documentation for Recipe Web Application
[api](https://documenter.getpostman.com/view/31315195/2s9Ykn8hEY)
---

#### Overview
This document outlines the API endpoints for the Recipe Web Application, detailing the methods, endpoints, request/response formats, and authentication requirements.

#### Base URL
`http://localhost:8000/api`

#### Authentication
- The API uses JWT for authentication.
- To access protected routes, include the JWT token in the header: 
  - `Authorization: Bearer <your_token_here>`

#### Endpoints

#### 1. Dashboard
- **fetchDashboardData**: GET `/dashboard`
  - Retrieves dashboard data.

#### 2. User Management
- **fetchUsers**: GET `/users`
  - Fetches all users.
- **fetchUser**: GET `/users/{userId}`
  - Retrieves a specific user's details.
- **createUser**: POST `/users`
  - Creates a new user.
- **updateUser**: PUT `/users/{userId}`
  - Updates a user's details.
- **deleteUser**: DELETE `/users/{userId}`
  - Deletes a user.

#### 3. Recipe Handling
- **fetchRecipes**: GET `/recipes`
  - Lists all recipes.
- **fetchRecipe**: GET `/recipes/{recipeId}`
  - Fetches a specific recipe's details.
- **createRecipe**: POST `/recipes`
  - Adds a new recipe.
- **updateRecipe**: PUT `/recipes/{recipeId}`
  - Updates a recipe.
- **deleteRecipe**: DELETE `/recipes/{recipeId}`
  - Deletes a recipe.

#### 4. Review Management
- **fetchReviews**: GET `/reviews`
  - Fetches all reviews.
- **fetchReview**: GET `/reviews/{reviewId}`
  - Retrieves a specific review.
- **createReview**: POST `/reviews`
  - Submits a review.
- **updateReview**: PUT `/reviews/{reviewId}`
  - Updates a review.
- **deleteReview**: DELETE `/reviews/{reviewId}`
  - Deletes a review.

#### 5. File Upload
- **uploadFile**: POST `/upload`
  - Uploads a file.

#### 6. Authentication
- **login**: POST `/login`
  - User login.
- **fetchCurrentUser**: GET `/user`
  - Retrieves the currently logged-in user.
- **refreshToken**: POST `/refresh-token`
  - Refreshes the authentication token.
- **logout**: POST `/logout`
  - Logs out the current user.

#### Additional Points
- The service handles responses using `handleResponse`, a function that processes JSON responses and error handling.
- `fetchWithConfig` is used as a wrapper for `fetch` to include default options, such as headers and credentials.

#### Status Codes and Errors
- **200 OK**: The request was successful.
- **401 Unauthorized**: Authentication failed.
- **403 Forbidden**: Access denied.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: A server error occurred.

#### Notes
- Replace `{id}` with the actual ID of the resource.
- Ensure to use the correct HTTP method for each request.
- For `POST` and `PUT` requests, send data in JSON format unless specified otherwise (e.g., file upload).
