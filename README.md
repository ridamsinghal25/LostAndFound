# Lost and Found Project

## Overview

This Lost and Found project is designed to help users register lost items, update their status, delete items, and manage their found and lost items. It includes secure user authentication using JWT tokens for enhanced security.

## Tech Stack

- **MongoDB**: A NoSQL database for storing lost and found items data.
- **React.js**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime environment for server-side development.
- **Express.js**: A web application framework for Node.js for building RESTful APIs.
- **JWT**: JSON Web Tokens for secure user authentication.

## Getting Started

### Backend

1.  Clone the repository:

    ```
    git clone https://github.com/yourusername/lost-and-found.git
    ```

2.  Navigate to the backend folder:

    ```
    cd lost-and-found/backend
    ```

3.  Install dependencies:

    ```
    npm install
    ```

4.  Set up environment variables:

    - Create a `.env` file in the backend folder.
    - Add the following variables:

      ```
      PORT=
      MONGODB_URI=""
      CORS_ORIGIN=""

      CLOUDINARY_CLOUD_NAME=""
      CLOUDINARY_API_KEY=""
      CLOUDINARY_API_SECRET=""

      ACCESS_TOKEN_SECRET=""
      ACCESS_TOKEN_EXPIRY=
      REFRESH_TOKEN_SECRET=""
      REFRESH_TOKEN_EXPIRY=""
      ```

5.  Start the server:

    ```
    npm run start
    ```

### Frontend

1.  Navigate to the frontend folder:

    ```
    cd lost-and-found/frontend
    ```

2.  Install dependencies:

    ```
    npm install
    ```

3.  Start the development server:

    ```
    npm run dev
    ```

4.  Open your browser and visit the website to view the frontend.

## Features

- Secure user authentication using JWT tokens.
- Register lost items.
- Update and delete lost items.
- Get all found and lost items.
- Get users' all lost and found items.

## Postman Collection

You can find the Postman collection for API endpoints here.
[Postman Collection](https://documenter.getpostman.com/view/30187103/2sA3JM71nw)

## Folder Structure

- `backend/`: Contains the Node.js and Express.js server code.
- `frontend/`: Contains the React.js frontend code.
