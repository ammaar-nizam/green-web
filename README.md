# Wildlife, Forestry and Environmental Complaint Management System

This project aims to create a comprehensive complaint management system for wildlife, forestry, and environmental-related issues. This is created for our module, Software Development Practice assessment taken at Kingston University, UK. It consists of a Node.js and Express.js backend for API development, a React.js frontend, and MySQL for the database.

## Features

- **User Roles**: Admin, Public Users, Beat Officers with different privileges
- **Complaint Management**: Register and manage complaints, investigations, and notifications
- **Institutional Management**: Manage wildlife, forestry, branches, divisions, and beat offices
- **Authentication & Authorization**: Secure user authentication and role-based access control

## Project Structure

The project follows a structured organization:
- **Backend (Node.js)**
  - `src/controllers`: handles HTTP requests, interacts with services, and returns responses.
  - `src/models`: represents database models using Mongoose or any ORM.
  - `src/routes`: defines API routes using Express.js.
  - `src/services`: business logic implementations that interact with models and perform operations.
  - `src/middleware`: custom middleware functions like authentication and authorization.
  - `src/utils`: utility functions like validation, formatting, etc.
  - `src/app.js`: this is where the application starts and sets up the Express server and middleware.
  - `src/config.js`: all the configuration variables like environment variables, database connections, etc.

- **Frontend (React.js)**
  - Frontend Implementation.

- **Database (MySQL)**
  - Database schema and scripts.

- **Tests**
  - Unit and integration tests.

## How to setup the project

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ammaar-nizam/green-web.git
   cd green-web

2. **Install Dependencies**
   ```bash
   cd node-backend
   npm install
   cd ../react-frontend
   npm install

3. **Database Setup**
- Set up MySQL and create the necessary database and tables based on the provided schema.

4. **Environment Configuration**
- Configure environment variables for the backend like database connection.

5. **Start Backend Server**
   ```bash
   cd node-backend
   npm start

6. **Start Frontend Development Server**
   ```bash
   cd react-frontend
   npm start

## Contributors

1. Ammaar Nizam
2. Tharisha Perera
3. Istina Suresh
4. Chamath Sansala
5. Madhawa Nuwan


## How to Contribute to the Project

- Fork the repository.
- Create a new branch (`git checkout -b feature/yourFeatureName`).
- Commit your changes (`git commit -am 'Add some yourFeatureName'`).
- Push to the branch (`git push origin feature/yourFeatureName`).
- Create a new Pull Request.

## License

This project is for educational purposes only. 

## Acknowledgements

- Mention any libraries, tutorials, or resources used here.
- Acknowledge contributors or inspiration sources if any.
