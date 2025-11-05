# TLDR;

This repository contains the REST API implementation for the SIMS Assignment, focusing on user authentication (Registration, Login), financial transactions (Check Balance, Top Up), and service payments, built according to the provided API Contract and specifications.

detailed swagger requirement : https://api-doc-tht.nutech-integrasi.com/

## Project Structure

The project follows a standard layered architecture to ensure clean separation of concerns. This structure helps reviewers easily locate the core components, documentation, and database files.

```
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

## Deployed Application URL

The API is hosted and accessible via the following URL: https://nutech.jeong.cloud

Thank you for reviewing the project.
