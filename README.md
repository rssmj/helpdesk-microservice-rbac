```markdown
# Helpdesk Microservice RBAC

This project is a Helpdesk Ticketing System built with a microservices architecture and role-based access control (RBAC).

## User Roles

- **Admin**: Manage users, view all tickets, configure system settings.
- **Support Agent**: Manage assigned tickets, respond to tickets.
- **Customer**: Create and view own tickets, add comments.

## Microservices

- **Authentication Service**: Handle user registration, login, and role management.
- **Ticket Management Service**: Create, update, and track the status of tickets.
- **User Management Service**: Manage user profiles and roles.
- **Notification Service**: Send email or in-app notifications for ticket updates.
- **Reporting Service**: Generate reports on ticket status, response times, etc.

## Project Structure

helpdesk-microservice-rbac/
│
├── apps/
│ ├── auth-service/
│ │ ├── src/
│ │ │ └── index.ts
│ │ ├── tests/
│ │ ├── .dockerignore
│ │ ├── .gitignore
│ │ ├── dockerfile
│ │ ├── package.json
│ │ └── tsconfig.app.json
│ ├── notification-service/
│ │ ├── src/
│ │ │ └── index.ts
│ │ ├── tests/
│ │ ├── .dockerignore
│ │ ├── .gitignore
│ │ ├── dockerfile
│ │ ├── package.json
│ │ └── tsconfig.app.json
│ ├── reporting-service/
│ │ ├── src/
│ │ │ └── index.ts
│ │ ├── tests/
│ │ ├── .dockerignore
│ │ ├── .gitignore
│ │ ├── dockerfile
│ │ ├── package.json
│ │ └── tsconfig.app.json
│ ├── ticket-service/
│ │ ├── src/
│ │ │ └── index.ts
│ │ ├── tests/
│ │ ├── .dockerignore
│ │ ├── .gitignore
│ │ ├── dockerfile
│ │ ├── package.json
│ │ └── tsconfig.app.json
│ └── user-service/
│ ├── src/
│ │ └── index.ts
│ ├── tests/
│ ├── .dockerignore
│ ├── .gitignore
│ ├── dockerfile
│ ├── package.json
│ └── tsconfig.app.json
│
├── libs/
│ └── common/
│ ├── src/
│ │ └── rmq/
│ │ └── rabbitmq.ts
│ ├── tsconfig.lib.json
│
├── dist/
│ ├── apps/
│ └── libs/
│
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── lerna.json
├── LICENSE
├── package.json
├── tsconfig.build.json
├── yarn.lock
└── README.md
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

2. Install dependencies:

```sh
yarn install
```

3. Build and start the services using Docker Compose:

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

To develop and test individual services, you can use Yarn to manage the workspaces. Run the following from the project root:

```sh
yarn workspace auth-service start
```

Repeat for other services.
