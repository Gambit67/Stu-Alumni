# Stu-Alumni Backend
A robust Node.js and Express-based backend system for managing student and alumni interactions. This project provides authentication, profile management, and social posting capabilities, using MySQL as the primary database with Prisma integration.

##  Features
- **Authentication:** Secure user signup and login using `bcrypt` for password hashing and `JWT` (JSON Web Tokens) for session management.
- **Profile Management:** Create, update, and search user profiles.
- **Post Management:** (In Development) Functionality for users to share updates and interact.
- **Database Integration:** Utilizes MySQL with a connection pool for efficient data handling, plus Prisma for schema management.
- **Static File Serving:** Built-in support for serving public assets.

##  Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (via `mysql2`)
- **ORM:** Prisma
- **Security:** Bcrypt, JWT
- **Environment Management:** Dotenv

##  Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) database
- npm or yarn

## ⚙️ Installation

1. **Clone the repository:**
  
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following:
   ```env
   SERVER_PORT=3000
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=StuAlumni
   ACCESS_TOKEN_SECRET=your_jwt_secret
   ```

4. **Database Setup:**
   - Import the `StuAlumni.sql` file into your MySQL instance to set up the necessary tables.
   - Run Prisma migrations (if applicable):
     ```bash
     npx prisma generate
     ```


##  API Endpoints

### Authentication (`/sql/signup`, `/sql/login`)
- `POST /sql/signup`: Register a new user with email and password.
- `POST /sql/login`: Authenticate user and receive a JWT.

### Profiles (`/sql/profiles`)
- `GET /sql/users`: Fetch all user profiles (Protected).
- `GET /sql/user/:id`: Fetch a specific user profile.
- `PUT /sql/update`: Update current user profile details.
- `GET /sql/search?name=...`: Search for users by name.

## 📂 Project Structure

- `controllers/`: Request handling logic.
- `routes/`: Express route definitions.
- `models/`: Database schemas and interaction logic (`mysql2` pool).
- `middlewares/`: Custom middleware (e.g., authentication checks).
- `prisma/`: Prisma schema and configuration.
- `public/`: Static files (HTML, images, etc.).

## 📄 License

This project is licensed under the ISC License.
