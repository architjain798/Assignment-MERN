# ECommerce API

Backend API

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB installed and running.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/architjain798/Assignment-MERN.git
   cd your-project

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Environment Variables

   Create a .env file in the root of your project with the following variables:

   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your-secret-key

4. Usage

   To start the server, run:

   ```bash
   npm run start
   ```

   Visit http://localhost:3001 in your browser.

### API Endpoints

        POST /api/auth/signup: Create a new user.
        POST /api/auth/login: Log in with existing credentials.
        POST /api/auth/logout: Log out and invalidate the user's token.
        GET /api/auth/users: Get a list of all users (requires authentication).
        GET /api/products: Get a list of products (requires authentication).

### User API

    Signup
    Endpoint: /api/auth/signup
    Method: POST
    Request Body:
            {
                "username": "your-username",
                "password": "your-password"
            }

### Technologies Used

        Node.js
        Express.js
        MongoDB
        JWT for authentication
