# 📝 Bun Todo API - Full-Stack Todo Application

A modern full-stack Todo application built with Bun, Fastify, Prisma, and React. This project demonstrates the use of the Bun runtime for both backend and frontend development.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [License](#license)

## 🎯 Project Overview

This repository contains a complete Todo task management application, split into two main parts:

- **todo-api**: REST API backend built with Fastify and Prisma
- **todo-app**: React frontend built with Bun and TailwindCSS

The application allows users to organize their tasks into groups, with support for priorities, statuses, and timestamps.

## ✨ Features

### Backend (todo-api)
- 🚀 RESTful API server built with Fastify
- 💾 SQLite database with Prisma ORM
- 🔄 Auto-loading system for plugins and routes
- 🌐 Configured CORS support
- 📊 Complete CRUD management for Todos and Groups
- ✅ Input validation
- 🏷️ Priority system (LOW, MEDIUM, HIGH)
- 📈 Task statuses (PENDING, IN_PROGRESS, COMPLETED)

### Frontend (todo-app)
- ⚛️ Modern React interface
- 🎨 Styled with TailwindCSS v4
- 🔍 State management with TanStack Query (React Query)
- 🎭 UI components with Radix UI
- 📱 Responsive design
- ⚡ Hot Module Replacement (HMR)
- 🎯 TypeScript for type safety

## 🛠️ Technology Stack

### Backend
- **Runtime**: Bun
- **Framework**: Fastify v5.6.2
- **ORM**: Prisma v7.2.0 with LibSQL adapter
- **Database**: SQLite
- **Language**: TypeScript

### Frontend
- **Runtime**: Bun
- **UI Framework**: React 19
- **Styling**: TailwindCSS v4
- **State Management**: TanStack Query v5
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Language**: TypeScript

## 📁 Project Structure

```
bun-todo-api/
├── todo-api/                  # Backend API
│   ├── index.ts              # Server entry point
│   ├── prisma.config.ts      # Prisma configuration
│   ├── plugins/              # Fastify plugins
│   │   ├── cors.ts          # CORS configuration
│   │   └── prisma.ts        # Prisma plugin
│   ├── routes/              # API routes
│   │   └── v1/
│   │       ├── todo.ts      # Todo endpoints
│   │       ├── group.ts     # Group endpoints
│   │       └── ping.ts      # Health check
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   └── generated/           # Prisma generated code
│
└── todo-app/                 # React frontend
    ├── src/
    │   ├── App.tsx          # Main component
    │   ├── index.ts         # Entry point
    │   ├── components/      # React components
    │   │   ├── add-todo.tsx
    │   │   ├── add-group.tsx
    │   │   ├── task-item.tsx
    │   │   └── ui/          # Reusable UI components
    │   └── types/
    │       └── api.ts       # API type definitions
    └── build.ts             # Build script
```

## 📦 Prerequisites

- [Bun](https://bun.sh/) v1.0.0 or higher
- Node.js v18+ (optional, for compatibility)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd bun-todo-api
```

### 2. Install Backend dependencies

```bash
cd todo-api
bun install
```

### 3. Install Frontend dependencies

```bash
cd ../todo-app
bun install
```

## ⚙️ Configuration

### Backend (todo-api)

1. Create a `.env` file in the `todo-api` directory:

```env
DATABASE_URL="file:./todo-database.db"
```

2. Generate Prisma Client:

```bash
cd todo-api
bunx prisma generate
```

3. Run database migrations:

```bash
bunx prisma migrate dev
```

### Frontend (todo-app)

The frontend is configured to connect to the API at `http://localhost:4000`. If needed, modify the API URL in [src/App.tsx](todo-app/src/App.tsx).

## 🎮 Running the Application

### Start the Backend

```bash
cd todo-api
bun run index.ts
```

The server will be available at `http://localhost:4000`

### Start the Frontend

In a new terminal:

```bash
cd todo-app
bun run dev
```

The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:4000/v1
```

### Endpoints

#### 📋 Todos

##### GET /todos
Retrieve all todos

**Response:**
```json
{
  "success": true,
  "data": {
    "todos": [
      {
        "id": 1,
        "title": "Sample Todo",
        "description": "Description",
        "status": "PENDING",
        "priority": "MEDIUM",
        "groupId": 1,
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

##### POST /todos
Create a new todo

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "group": 1,
  "priority": "HIGH"
}
```

**Note:** The `group` field (groupId) is required.

##### PUT /todos/:id
Update an existing todo

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

##### DELETE /todos/:id
Delete a todo

**Response:**
```json
{
  "success": true
}
```

##### GET /todos/groups
Get todo statistics grouped by status

**Response:**
```json
{
  "success": true,
  "data": {
    "groupedTodos": [
      {
        "status": "PENDING",
        "_count": { "id": 5 }
      }
    ]
  }
}
```

#### 📁 Groups

##### GET /groups
Retrieve all groups with their todos

**Response:**
```json
{
  "success": true,
  "data": {
    "groups": [
      {
        "id": 1,
        "name": "Work",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z",
        "todos": []
      }
    ]
  }
}
```

##### POST /groups
Create a new group

**Request Body:**
```json
{
  "name": "New Group"
}
```

##### PUT /groups/:id
Update an existing group

**Request Body:**
```json
{
  "name": "Updated Name"
}
```

##### DELETE /groups/:id
Delete a group

### Enums

#### Status
- `PENDING` - Task pending
- `IN_PROGRESS` - Task in progress
- `COMPLETED` - Task completed

#### Priority
- `LOW` - Low priority
- `MEDIUM` - Medium priority
- `HIGH` - High priority

## 🗃️ Database Schema

### TodoGroup
| Field     | Type     | Description                    |
|-----------|----------|--------------------------------|
| id        | Int      | Primary ID (auto-increment)    |
| name      | String   | Group name                     |
| createdAt | DateTime | Creation date                  |
| updatedAt | DateTime | Last update date               |
| todos     | Todo[]   | Relation with Todos            |

### Todo
| Field       | Type       | Description                    |
|-------------|------------|--------------------------------|
| id          | Int        | Primary ID (auto-increment)    |
| title       | String     | Todo title                     |
| description | String?    | Description (optional)         |
| status      | Status     | Task status                    |
| priority    | Priority   | Task priority                  |
| groupId     | Int?       | Group ID (optional)            |
| createdAt   | DateTime   | Creation date                  |
| updatedAt   | DateTime   | Last update date               |
| group       | TodoGroup? | Relation with group            |

## 💻 Development

### Backend Commands

```bash
# Start in development mode
bun run index.ts

# Generate Prisma Client
bunx prisma generate

# Create new migration
bunx prisma migrate dev --name migration_name

# Open Prisma Studio (database GUI)
bunx prisma studio

# Run database seed
bunx prisma db seed
```

### Frontend Commands

```bash
# Start development server with HMR
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

### Fastify Plugin Structure

The project uses Fastify's auto-loading pattern:

- **Plugins** (`todo-api/plugins/`): Auto-loaded and configure features like CORS and Prisma
- **Routes** (`todo-api/routes/`): Auto-loaded and register API endpoints

### Code Conventions

- TypeScript strict mode enabled
- Use of async/await for asynchronous operations
- Error handling with try/catch and appropriate HTTP responses
- Input validation in API routes
- Functional React components with hooks

## 🏗️ Architecture

### Backend

The API follows a modular architecture:

1. **Entry Point** ([index.ts](todo-api/index.ts)): Initializes Fastify server and loads plugins/routes
2. **Plugins**: Configure cross-cutting features (database, CORS)
3. **Routes**: Define API endpoints organized by resource
4. **Prisma**: Handles database access with a type-safe ORM

### Frontend

The React app follows a component-based architecture:

1. **App Component**: Root component that orchestrates the UI
2. **UI Components**: Reusable components based on Radix UI
3. **Feature Components**: Application-specific components (AddTodo, TaskItem)
4. **API Layer**: TanStack Query handles data fetching and caching

## 🔐 Security

- CORS configured to accept only requests from `http://localhost:3000`
- Input validation on all API routes
- SQL injection prevention via Prisma ORM
- TypeScript type safety across the entire codebase

## 🐛 Troubleshooting

### Server won't start

1. Verify that Bun is installed correctly: `bun --version`
2. Check that port 4000 is not already in use
3. Verify that the database has been migrated correctly

### Frontend won't connect to API

1. Ensure the backend is running at `http://localhost:4000`
2. Check the browser console for CORS errors
3. Verify CORS configuration in [todo-api/plugins/cors.ts](todo-api/plugins/cors.ts)

### Prisma Errors

1. Regenerate the client: `bunx prisma generate`
2. Check the schema: `bunx prisma validate`
3. Reset the database: `bunx prisma migrate reset`

## 📄 License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## 📧 Contact

For questions or support, open an issue on GitHub.

---

Developed with ❤️ using Bun
