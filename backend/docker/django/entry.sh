#!/bin/sh

fab -f fabfile.py load_secrets
python manage.py collectstatic --noinput
python manage.py migrate
gunicorn backend.wsgi:application --bind 0.0.0.0:8000