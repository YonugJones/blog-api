# BLOG API

## Overview

This project is a full-stack blog application featuring a decoupled architecture with:

- A backend API that handles CRUD operations and exposes endpoints.

- Two separate front-end clients:
  - A public-facing front end for blog readers.
  - An admin front end for managing blog content.

The project demonstrates flexibility, modularity, and enhanced security by ensuring distinct authorization mechanisms for the admin and user interfaces. This design also supports potential reusability for future applications or integrations.

# Features

## Backend

- RESTful API for blog posts, comments, and user management.
  
- Secure authentication using JSON Web Tokens (JWT).
  
- Role-based authorization for admin and standard users.
  
- Middleware for input validation and error handling.
  
- Modular structure for scalability and maintainability.

## Public Front End

- Displays blog posts with options for viewing comments and liking posts.

- User-friendly interface for easy navigation and content consumption.

## Admin Front End

- Dashboard for managing blog posts and comments.

- Restricted access to authorized administrators only.

## Technologies Used

# Backend

- **Node.js** and **Express** for the server.

- **PostgreSQL** with **Prisma** as the database and ORM.

- **jsonwebtoken** for authentication.

- **express-validator** for request validation.

# Frontend
 
-  **React** for building user interfaces.

-  **React Router** for navigation.

# API Endspoints

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| GET | /posts | Fetch all blog posts | No |
| GET | /posts/:id | Fetch a single blog posts | Yes |
| POST | /posts | Create blog post | Yes |
| PUT | /posts/:id | Update blog post | Yes(author) |
| DELETE | /posts/:id | Soft delete blog post | Yes(author) |

# Future Improvements
- Add a search and filter feature for blog posts.

- Implement pagination for large datasets.

- Enhance UI with animations and responsive design.

- Deploy the application to platforms like Heroku or Vercel.

# License

- This project is open-source and available under the MIT License.

# Acknowledgements

- **The Odin Project** for the curriculum and guidance.