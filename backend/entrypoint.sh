#!/bin/bash
set -e

# Conditional waits for docker-compose
if [[ "$DB_HOST" == "db" ]]; then
  echo "Waiting for Postgres (docker-compose)..."
  until nc -z db 5432 > /dev/null 2>&1; do
    echo "Postgres not ready - sleeping"
    sleep 2
  done
  if [[ "$REDIS_HOST" == "redis" ]]; then
    echo "Waiting for Redis..."
    until nc -z redis 6379 > /dev/null 2>&1; do
      echo "Redis not ready - sleeping"
      sleep 2
    done
  fi
fi

# Migrations always
echo "Running migrations..."
python manage.py migrate --noinput

# Gunicorn prod server
PORT=${PORT:-8000}
echo "Starting Gunicorn on 0.0.0.0:$PORT..."
exec gunicorn prompts_library.wsgi:application --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 120

