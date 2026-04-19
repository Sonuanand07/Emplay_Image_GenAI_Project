# AI Image Generation Prompts Library

Full-stack app to manage AI prompts: list, create, view details with live view counts.

## Tech Stack
- **Frontend**: Angular 14+ (reactive forms, routing)
- **Backend**: Django (standard views, JSON APIs)
- **Database**: PostgreSQL
- **Cache**: Redis (view counters)
- **DevOps**: Docker Compose

## Quick Start
```bash
cp .env.example .env  # or edit .env directly
docker-compose up --build
```
- Frontend: http://localhost:3000/prompts
- Backend APIs: http://localhost:8000/prompts/
- DB: localhost:5432, Redis: localhost:6379

## Features
- List prompts (title, complexity)
- Add prompt (form validation: title≥3, content≥20, complexity 1-10)
- View detail (content, live view_count from Redis)
- APIs: GET/POST /prompts/, GET /prompts/<id>/

## Architecture
```
Frontend (NG 3000) → Backend APIs (Django 8000) → Postgres + Redis
```
- Docker startup: db/redis healthy → backend migrate → services.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /prompts/ | List all |
| POST | /prompts/ | Create new |
| GET | /prompts/:id/ | Detail + incr view_count |

## Development
```bash
# Backend only
docker-compose up db redis backend

# Test API
curl http://localhost:8000/prompts/
curl -X POST -H "Content-Type: application/json" -d '{"title":"Test","content":"Test content...","complexity":5}' http://localhost:8000/prompts/
```

## Screenshots
(To be added post-completion)

## Decisions
- Django FBVs for simplicity.
- Angular reactive forms per spec.
- Redis source of truth for views (mock local).

## Local Run (No Docker)
**Backend:**
```
cd backend
run.bat
```
(Uses SQLite, mock views. Server: http://localhost:8000)

**Frontend (new terminal):**
```
cd frontend
run.bat
```
(ng serve: http://localhost:3000)

Test APIs:
```
curl http://localhost:8000/prompts/
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Test\",\"content\":\"Long content...\",\"complexity\":5}" http://localhost:8000/prompts/
```

## Deploy to Render

**Backend:**
1. Push repo to GitHub.
2. render.com dashboard > New > Web Service > GitHub repo (root: /backend or full repo).
3. Environment: Python, Root dir: backend.
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `gunicorn prompts_library.wsgi --bind 0.0.0.0:$PORT` (Procfile auto).
6. Add-ons: PostgreSQL (internal DB), Redis (KV).
7. Env Vars: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, REDIS_HOST from add-ons.
8. Deploy!

**Frontend (Static Site on Render):**
1. New > Static Site > repo.
2. Root dir: frontend.
3. Build Command: `npm ci && npm run build`
4. Publish dir: `dist/prompt-frontend` (or app name).
5. Update service.ts API_URL to backend render URL.
6. Deploy!

**Alternative Frontend Vercel:**
1. vercel.com > Import repo (frontend root).
2. Override: Build `npm run build`, Output `dist/prompt-frontend`.
3. Deploy free.

**Docker Local Test:**
docker-compose up --build (Postgres/Redis real).

Project deploy-ready!


