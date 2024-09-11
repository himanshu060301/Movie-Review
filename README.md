# Movie Review Application

This is a **Movie Review Application** where users can explore and review movies, watch trailers. The application also includes features for user authentication, including login and signup functionality. The frontend is built with **React**, and the backend is powered by **Spring Boot** with **MongoDB** for data storage.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Frontend Setup (React)](#frontend-setup-react)
  - [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **Movie Listings**: Browse a list of movies, view detailed information, and reviews.
- **Watch Trailers**: Watch movie trailers directly from the application.
- **Review Movies**: Add, view, and manage reviews for different movies.
- **User Authentication**: Signup and login functionality for registered users.
- **Responsive Design**: The frontend is fully responsive and works on mobile and desktop devices.

## Tech Stack

### Frontend:
- **React**: Frontend library for building the user interface.
- **Material-UI & Bootstrap**: UI components for consistent styling.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend.

### Backend:
- **Spring Boot**: Java-based framework for building the backend.
- **Spring Security**: For managing user authentication and authorization.
- **MongoDB**: NoSQL database for storing movie and user data.
- **Spring Data MongoDB**: Simplified database access using Spring's data abstraction.

## Installation

### Prerequisites

- **Node.js**: v14.x or higher for the frontend.
- **Java**: JDK 11 or higher for the backend.
- **Maven**: For managing backend dependencies.
- **MongoDB**: A running instance of MongoDB.

### Frontend Setup (React)

1. Clone the repository:

   ```bash
   git clone https://github.com/himanshu060301/Movie-Review

2. Navigate into the frontend folder:

    cd client

3. Install dependencies:

    npm install

4. Start the development server:

    npm start

5. The application will run on http://localhost:3000


### Backend Setup (Spring Boot)

1. Clone the backend repository:

    git clone https://github.com/himanshu060301/Movie-Review

2. Navigate into the backend folder:

    cd server

3. Configure the MongoDB database in the application.properties file (or application.yml if you're using YAML):

    spring.data.mongodb.uri=your mongo uri

    Alternatively, if using application.yml:

    spring:
        data:
            mongodb:
                uri: your mongo uri

4. Build the project using Maven:

    mvn clean install

5. Run the Spring Boot application:

    mvn spring-boot:run

6. The backend will run on http://localhost:8080.


### MongoDB Setup

1. Install MongoDB locally or use a cloud provider like MongoDB Atlas.

2. Ensure MongoDB is running locally or connected to a cloud instance.

3. The database connection is configured in the application.properties or application.yml file using spring.data.mongodb.uri.

    a. Local MongoDB: The default URI is your mongo uri.
    b. MongoDB Atlas: Use your connection string from Atlas in the uri field.

### Usage

1. After both frontend and backend are running, visit http://localhost:3000 to access the application.
2. Sign up or log in to your account.
3. Browse movies, watch trailers, add reviews, and manage your watchlist.

### API Endpoints

Authentication

    1. POST /api/v1/signup: Register a new user.
    2. POST /api/v1/login: Login to the application.

Movies

    1. GET /api/v1/movies: Fetch a list of all movies.
    2. POST /api/v1/reviews{id}: Add a review to a movie.

### Contributing

Contributions are welcome! To contribute:
    
    1. Fork the repository.
    2. Create a new branch: git checkout -b feature-branch-name.
    3. Make your changes and commit them: git commit -m 'Add a feature'.
    4. Push to the branch: git push origin feature-branch-name.
    5. Open a pull request.


