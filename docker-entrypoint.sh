#!/bin/sh

echo "Waiting for PostgreSQL to start..."
# Use a more robust way to check if Postgres is ready
sleep 5
max_retries=30
counter=0

until PGPASSWORD="${POSTGRES_PASSWORD}" psql -h postgres -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -c "SELECT 1" > /dev/null 2>&1; do
    counter=$((counter+1))
    if [ $counter -ge $max_retries ]; then
        echo "Failed to connect to PostgreSQL after $max_retries attempts. Exiting."
        exit 1
    fi
    echo "Waiting for PostgreSQL to become available... ($counter/$max_retries)"
    sleep 2
done

echo "PostgreSQL is up - executing migrations"
npx prisma migrate deploy

echo "Seeding Database..."
npm run seed

echo "Starting application..."
npx ts-node /app/src/server/server.ts
