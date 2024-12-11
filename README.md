# Blog API Project
Overview
This project is a full-stack blog application featuring a decoupled architecture with:

A backend API that handles CRUD operations and exposes endpoints.
Two separate front-end clients:
A public-facing front end for blog readers.
An admin front end for managing blog content.
The project demonstrates flexibility, modularity, and enhanced security by ensuring distinct authorization mechanisms for the admin and user interfaces. This design also supports potential reusability for future applications or integrations.

Features
Backend
RESTful API for blog posts, comments, and user management.
Secure authentication using JSON Web Tokens (JWT).
Role-based authorization for admin and standard users.
Middleware for input validation and error handling.
Modular structure for scalability and maintainability.
Public Front End
Displays blog posts with options for viewing comments and liking posts.
User-friendly interface for easy navigation and content consumption.
Admin Front End
Dashboard for managing blog posts and comments.
Restricted access to authorized administrators only.
Technologies Used
Backend
Node.js and Express for the server.
PostgreSQL with Prisma as the database and ORM.
jsonwebtoken for authentication.
express-validator for request validation.
Front End
React for building user interfaces.
React Router for navigation.

Getting Started
Prerequisites
Install Node.js (v16 or later recommended).
Install PostgreSQL.
Install dependencies using npm install.
Backend Setup
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/blog-api.git
cd blog-api
Set up the environment variables in a .env file:
makefile
Copy code
PORT=3333
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
Run migrations with Prisma:
bash
Copy code
npx prisma migrate dev
Start the server:
bash
Copy code
npm start
Frontend Setup
Navigate to the front-end folder (if separate).
Install dependencies and run the development server:
bash
Copy code
npm install
npm start
API Endpoints
Method	Endpoint	Description	Authentication Required
GET	/posts	Fetch all blog posts	No
GET	/posts/:id	Fetch a single blog post	Yes
POST	/posts	Create a new blog post	Yes (Admin)
PUT	/posts/:id	Update a blog post	Yes (Admin)
DELETE	/posts/:id	Soft delete a blog post	Yes (Admin)
(Include more endpoints as needed.)

Future Improvements
Add a search and filter feature for blog posts.
Implement pagination for large datasets.
Enhance UI with animations and responsive design.
Deploy the application to platforms like Heroku or Vercel.
Contributing
Contributions are welcome! Please open an issue or submit a pull request if you'd like to collaborate.

License
This project is open-source and available under the MIT License.

Acknowledgements
The Odin Project for the curriculum and guidance.
All contributors to the project.

