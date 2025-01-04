# Micro Instagram Backend

## Description
A backend system for a simplified Instagram application built with Node.js, Express, Sequelize, and TypeScript.

## Features
- User management
- Post management with foreign key relationships
- RESTful APIs
- Unit testing with Jest

## Setup Instructions
1. Clone the repository:
2. Install dependencies:
3. Configure the `.env` file with your database credentials.
4. Run migrations:
5. Start the server:
6. Run tests:


## API Endpoints
- `/api/users` - Manage users.
- `/api/posts` - Manage posts.

##Set Up the Project
# Create project folder and navigate to it
mkdir micro-instagram-backend
cd micro-instagram-backend

# Initialize Node.js and TypeScript
npm init -y
npm install express sequelize pg pg-hstore dotenv cors body-parser
npm install --save-dev typescript ts-node @types/node @types/express @types/cors jest ts-jest @types/jest supertest @types/supertest

# Initialize TypeScript configuration
npx tsc --init

# Create folders
mkdir -p src/{controllers,models,routes,utils} migrations tests

# Create essential files
touch src/app.ts src/server.ts src/utils/db.ts src/models/{user.model.ts,post.model.ts,index.ts} src/controllers/{user.controller.ts,post.controller.ts} src/routes/{user.routes.ts,post.routes.ts} .env .gitignore README.md

# Initialize Sequelize CLI for migrations
npx sequelize-cli init

# Install Sequelize CLI globally (optional)
npm install -g sequelize-cli

# Install Testing Libraries
npm install --save-dev supertest jest @types/jest @types/supertest
#Run Test
npm test

##Database Setup
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=micro_instagram
DB_PORT=5432
PORT=3000

##.gitignore
node_modules/
dist/
.env
