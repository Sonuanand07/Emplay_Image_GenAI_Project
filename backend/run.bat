@echo off
echo Setting up backend...
if not exist venv (
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000

