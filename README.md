# Shop Smart - Server

[Client Side Repository](https://github.com/Tosiqul-Islam-Sopon/shop-smart-client)

[Live Link](https://shop-smart-a4283.web.app)

## Project Overview

The server-side of the "Shop Smart" application is built using Node.js and Express.js, providing the backend functionalities such as handling API requests, managing the database, and ensuring secure communication between the client and server. It is designed to efficiently manage product data, user information, and handle all business logic.

## Features

- **Product Management:** Handles CRUD operations for product listings.
- **Pagination & Filtering:** Supports pagination and filtering for product listings.
- **Search Functionality:** Enables search through the product database by name or category.
- **Secure Data Handling:** Ensures secure data storage and transmission using MongoDB.

## Technologies Used

- **Node.js** - JavaScript runtime for server-side programming
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing product and user data
- **Cors** - Middleware for enabling CORS (Cross-Origin Resource Sharing)

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.
- MongoDB database setup (you can use MongoDB Atlas for a cloud-based solution).
- A `.env` file with necessary environment variables (e.g., MongoDB URI, JWT secret).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Tosiqul-Islam-Sopon/shop-smart-server.git
   cd shop-smart-server
   
2. Install dependencies:
   
   ```bash
   npm install

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:

  ```bash
  DB_USER=your_mongodb_username
  DB_PASS=your_mongodb_password

4. Start the development server:

    ```bash
    nodemon index.js

5. Your server should now be running on `http://localhost:5000`
