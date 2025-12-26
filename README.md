# InnSight

A full-stack accommodation booking application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## About

This project was developed to learn end-to-end development using the MERN stack. It demonstrates the integration of frontend and backend technologies to create a functional web application for booking accommodations, similar to platforms like Airbnb.

## Features

- User registration and login
- Browse and view available places
- Detailed place pages with images
- Book accommodations with date selection
- Manage personal bookings
- Upload and manage photos for places
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- **React 18** - Component-based UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB with Mongoose** - NoSQL database and ODM
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **AWS S3** - Cloud storage for images
- **CORS** - Cross-origin resource sharing

## Installation and Setup

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd InnSight
   ```

2. **Backend Setup**
   ```
   cd api
   npm install
   ```
   - Create a `.env` file with necessary environment variables (e.g., MongoDB URI, JWT secret, AWS credentials)

3. **Frontend Setup**
   ```
   cd ../client
   npm install
   ```

4. **Start the Application**
   - Backend: `cd api && node index.js`
   - Frontend: `cd client && npm run dev`

5. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite)

## Usage

- Register a new account or log in
- Browse available places on the home page
- Click on a place to view details and book
- Manage your bookings from the account page
- Add new places if you're a host (assuming admin/host functionality)

## Skills Learned

This project was an excellent opportunity to learn and apply end-to-end MERN stack development. Key skills acquired include:

### Frontend Development
- Building dynamic user interfaces with React components
- State management using React Context API
- Client-side routing and navigation with React Router
- Responsive design and styling with Tailwind CSS
- Making API calls and handling asynchronous operations with Axios
- Form handling and validation

### Backend Development
- Creating RESTful APIs with Express.js
- Database design and modeling with MongoDB and Mongoose
- Implementing user authentication and authorization with JWT
- Secure password handling with bcryptjs
- File upload and image management with Multer and AWS S3
- Handling CORS and middleware configuration

### Full-Stack Integration
- Connecting frontend and backend through HTTP requests
- Managing environment variables and configuration
- Error handling and debugging across the stack
- Understanding the flow of data between client and server

### Development Tools and Best Practices
- Using Vite for efficient development and building
- Code quality assurance with ESLint
- Version control and project organization
- Debugging and troubleshooting full-stack applications

This hands-on project solidified my understanding of modern web development practices and prepared me for building more complex, production-ready applications with the MERN stack.