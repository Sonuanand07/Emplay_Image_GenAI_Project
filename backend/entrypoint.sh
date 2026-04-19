#!/bin/bash
set -e

# Wait for Postgres
echo "Waiting for Postgres..."
until nc -z db 5432; do
  echo "Postgres not ready - sleeping"
  sleep 2
done

# Wait for Redis
echo "Waiting for Redis..."
until nc -z redis 6379; do
  echo "Redis not ready - sleeping"
  sleep 2
done

# Collect static/migrate
echo "Running migrations..."
python manage.py migrate

# Run dev server
echo "Starting Django server..."
exec python manage.py runserver 0.0.0.0:8000

