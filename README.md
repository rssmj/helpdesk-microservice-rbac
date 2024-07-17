```markdown
# Helpdesk Microservice RBAC

This project is a Helpdesk Ticketing System built with a microservices architecture and role-based access control (RBAC).

- Each microservice is built using Node.js and Express, with Babel for ES6 support.

## User Roles

- **Admin**: Manage users, view all tickets, configure system settings.
- **Support Agent**: Manage assigned tickets, respond to tickets.
- **Customer**: Create and view own tickets, add comments.

## Services

- **Authentication Service**: Handle user registration, login, and role management.
- **Ticket Management Service**: Create, update, and track the status of tickets.
- **User Management Service**: Manage user profiles and roles.
- **Notification Service**: Send email or in-app notifications for ticket updates.
- **Reporting Service**: Generate reports on ticket status, response times, etc.

## Project Structure

helpdesk-microservice-rbac/
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── README.md
├── auth-service/
│ ├── .babelrc
│ ├── .dockerignore
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json
│ ├── src/
│ │ └── index.js
│ └── tests/
├── ticket-service/
│ ├── .babelrc
│ ├── .dockerignore
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json
│ ├── src/
│ │ └── index.js
│ └── tests/
├── user-service/
│ ├── .babelrc
│ ├── .dockerignore
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json
│ ├── src/
│ │ └── index.js
│ └── tests/
├── notification-service/
│ ├── .babelrc
│ ├── .dockerignore
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json
│ ├── src/
│ │ └── index.js
│ └── tests/
├── reporting-service/
│ ├── .babelrc
│ ├── .dockerignore
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json
│ ├── src/
│ │ └── index.js
│ └── tests/
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

```sh
git clone https://github.com/rssmj/helpdesk-microservice-rbac.git
cd helpdesk-microservice-rbac
```

2. Build and start the services using Docker Compose:

```sh
docker-compose up --build
```

### Usage

Each service will be available on the following ports:

- Auth Service: [http://localhost:3001](http://localhost:3001)
- Ticket Service: [http://localhost:3002](http://localhost:3002)
- User Service: [http://localhost:3003](http://localhost:3003)
- Notification Service: [http://localhost:3004](http://localhost:3004)
- Reporting Service: [http://localhost:3005](http://localhost:3005)

### Development

To develop and test individual services, navigate to the service directory and use npm scripts:

```sh
cd auth-service
npm start
```

Repeat for other services.
