#!/bin/sh

echo "Waiting for PostgreSQL to start..."
# Use a more robust way to check if Postgres is ready
sleep 10

echo "PostgreSQL is up - executing migrations"
npx prisma migrate deploy

echo "Seeding Database..."
npm run seed

echo "Starting application..."
npx ts-node /app/src/server/server.ts
