#!/bin/sh

echo "Waiting for PostgreSQL to start..."
sleep 5 

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting application..."
npm run start