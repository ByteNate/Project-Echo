# TA Pairing System

The TA Pairing System is a web application that helps manage and optimize the pairing of teaching assistants (TAs) with students for effective learning and support.

## Features

- User registration and authentication for TAs and administrators
- TA profile management
- Class schedule management
- Automated TA-student pairing based on shared schedules, proximity, and workload distribution
- Substitute TA management

## Technologies Used

- Frontend: React, HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT (JSON Web Tokens)
- Containerization: Docker

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (running on localhost or provide the connection URI)
- Docker (optional, for containerization)

### Installation

1. Clone the repository:
[git clone https://github.com/Byte-Nate/Project-Echo](https://github.com/ByteNate/Project-Echo)

2. Navigate to the project directory:
cd Project-Echo

3. Install the dependencies:
npm install

4. Set up the environment variables:
- Create a `.env` file in the root directory.
- Provide the necessary environment variables (e.g., database connection URI, JWT secret).

5. Start the development server:
npm run dev

6. Open your browser and visit `http://localhost:3000` to access the application.

### Docker Deployment

1. Build the Docker images:
docker-compose build

2. Start the containers:
docker-compose up

3. Access the application at `http://localhost:3000`.

## Usage

- Register as a TA or administrator.
- Log in to the system using your credentials.
- Update your profile information and preferences.
- Manage class schedules and TA-student pairings.
- Handle substitute TA assignments when necessary.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).