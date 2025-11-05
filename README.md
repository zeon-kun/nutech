# TLDR;

This repository contains the REST API implementation for the SIMS Assignment, focusing on user authentication (Registration, Login), financial transactions (Check Balance, Top Up), and service payments, built according to the provided API Contract and specifications.

detailed swagger requirement : https://api-doc-tht.nutech-integrasi.com/

## Project Structure

The project follows a standard layered architecture to ensure clean separation of concerns. This structure helps reviewers easily locate the core components, documentation, and database files.

```
Tentu. Saya akan menyajikan versi README.md yang jauh lebih ringkas, hanya fokus pada Struktur Direktori (untuk memandu reviewer menemukan file penting) dan Deployment/Kriteria Utama.

Ini adalah README.md yang sudah disederhanakan:

🚀 SIMS Assignment API Programmer - REST API
This repository contains the REST API implementation for the SIMS Assignment (Registration, Login, Balance, Top Up, and Transactions) built with Node.js, Express.js, and TypeScript.

📂 Project Directory Structure
The project follows a standard layered architecture to ensure clean separation of concerns. This structure helps reviewers easily locate the core components, documentation, and database files.

nutech/
├── prisma/
│   ├── migrations/                  # Database DDL (SQL) files are here
│   └── schema.prisma                # Database Schema (Source of Truth)
├── src/
│   ├── config/                      # Configuration files (e.g., upload.config.ts)
│   ├── controllers/                 # Handles HTTP requests & responses
│   ├── dtos/                        # Data Transfer Objects (Validation)
│   ├── middleware/                  # Auth, Error, Upload handlers
│   ├── repositories/                # Database access logic (Raw Queries are here)
│   ├── routes/                      # API routing definitions
│   ├── services/                    # Business logic implementation
│   └── server/
│       └── server.ts                # Main Express server entry point
├── Dockerfile                       # Production build definition
├── docker-compose.prod.yml          # Production services (App & Postgres)
└── package.json
```

## Setting Up the Project

Create a file named .env in the root directory of your project (if it doesn't exist) and populate it with the required configuration variables.

```
# env.example
DATABASE_URL="<your_postgresql_url>"
PORT=3010
NODE_ENV=dev
ALLOWED_ORIGINS="<your_domains>"
JWT_SECRET="<your-secret-key>"
UPLOAD_DIR="uploads"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nutechdb
```

For a clean local development environment, you only need the database running. You will run the Node.js application directly on your host machine using npm run dev

You can use the docker-compose.dev.yml provided in this project to run your own postgresql instance

## Deployed Application URL

The API is hosted and accessible via the following URL: https://nutech.jeong.cloud

Thank you for reviewing the project.
