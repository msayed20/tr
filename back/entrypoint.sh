#!/bin/bash

# Wait for the database to be ready
TIMEOUT=60
until nc -z -v -w30 db 5432 || [ $TIMEOUT -eq 0 ]
do
  echo "Waiting for database connection..."
  TIMEOUT=$((TIMEOUT - 5))
  sleep 5
done

if [ $TIMEOUT -eq 0 ]; then
  echo "Database is not ready, exiting."
  exit 1
fi

# Apply migrations
python manage.py makemigrations TwoFApy
python manage.py makemigrations pong
python manage.py migrate

# Collect static files (for production)
if [ "$DJANGO_ENV" = "production" ]; then
    echo "Collecting static files"
    python manage.py collectstatic --noinput
fi

# Start Daphne for Channels (WebSocket + HTTP support)
exec python manage.py runserver 0.0.0.0:8000