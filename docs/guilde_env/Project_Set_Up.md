# Project Setup Guide with Docker

This guide describes how to set up the project environment using Docker for both the frontend (React) and backend (Laravel) applications.

## Prerequisites

- Docker
- Docker Compose

## Steps

### 1. Clone the Repository

Clone the project repository to your local machine.

After clone the repository, set up the backend environment.

#### Copy Environment Configuration

#### Backend
Copy the `.env.example` file to `.env`.

```bash
cp backend/.env.example backend/.env
```

#### Frontend(recipe-app)
Set up api root path
```bash
echo "REACT_APP_API_URL=http://localhost:8000/api" > recipe-app/.env
```

### 2. Starting Docker Containers

Navigate to the root directory of the project and start the Docker containers:

```bash
docker-compose up -d
```

This command will build and start the containers as defined in your `docker-compose.yml` file.

### 3. Frontend Setup (React)

The React application is configured to run in a Docker container. 

- The frontend is accessible at `http://localhost:3000`.
- The Docker configuration exposes port 3000 and mounts the project directory.

### 4. Backend Setup (Laravel)

The Laravel application is also configured to run in a Docker container.

- The backend API will be accessible at `http://localhost:8000`.
- Make sure to configure your database connection and other environment variables in the Docker configuration or Laravel `.env` file.

#### Enter Backend Bash
Input command at the root of the parent project

  ```bash
  docker exec -it laravel-app bash
  ```
#### Generate APP KEY and JWT Secret
- The application key and JWT secret should be set up, you can enter the container to run these commands:

  ```bash
  php artisan key:generate
  php artisan jwt:secret
  ```

### Database Migrate and Seed
- Run database migrations and seeders:

  ```bash
  php artisan migrate --seed
  ```

- To create a symbolic link for the storage directory, use:

  ```bash
  php artisan storage:link
  ```

### 5. MySQL and phpMyAdmin

- MySQL is running in its own container, and you can access it on port 3307 of your localhost.
- phpMyAdmin is accessible at `http://localhost:8080`.

## Additional Notes

- Adjust the Docker commands based on your specific configuration and Docker service names.
- Ensure that your `.env` files are correctly set up for both frontend and backend applications.
