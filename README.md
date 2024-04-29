# Project Echo

This system is engineered for dynamic resource alignment and contingency planning.

## Operation Objectives

- Efficiently map resources to nodes based on operational directives.
- Implement seamless transition protocols during resource downtime.

# TA-Student Pairing System

## Technologies Used

- Frontend:
  - React
  - HTML
  - CSS
  - JavaScript
- Backend:
  - Node.js
  - Express.js
- Database:
  - MongoDB
  - Mongoose
- Authentication:
  - JWT (JSON Web Tokens)
- Containerization:
  - Docker

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- MongoDB (version X.X.X)
- Docker (optional)

### Installation

1. Clone the repository:

   git clone https://github.com/your-username/Project-Echo.git

2. Navigate to the project directory:

   cd Project-Echo

3. Install the dependencies for the backend:

   cd backend
   npm install

4. Install the dependencies for the frontend:

   cd ../frontend
   npm install

5. Set up the environment variables:
   - Create a `.env` file in the `backend` directory based on the provided `.env.example` file.
   - Update the `.env` file with your specific configuration values (e.g., database connection URL, JWT secret key).

6. Start the development servers:
   - For the backend:
     cd ../backend
     npm run dev
   - For the frontend:
     cd ../frontend
     npm start

7. Access the application in your web browser at `http://localhost:3000`.

### Docker Deployment

Alternatively, you can use Docker to run the application in a containerized environment. Make sure you have Docker installed on your system.

1. Build the Docker images:
   docker-compose build
2. Start the Docker containers:
   docker-compose up
3. Access the application in your web browser at `http://localhost:3000`.

## Configuration

The application can be configured using environment variables. The available configuration options are documented in the `.env.example` file. Make sure to create a `.env` file based on the example and update the values according to your specific setup.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).