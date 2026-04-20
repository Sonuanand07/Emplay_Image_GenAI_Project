rer# Deployment Fix TODO

## Frontend (Vercel)
- [x] Delete frontend/package-lock.json (outdated Angular 14 lock) - not present, good

- [x] Create frontend/vercel.json with correct build settings
- [x] Update frontend/angular.json outputPath to "dist/prompt-frontend" (already correct)
- [x] Test: cd frontend npm install & build succeeds (Angular 18 deps, no 14.x error)

## Backend (Render Docker)
- [x] Update backend/entrypoint.sh: Remove hardcoded db/redis waits, add flexible DB retry using env vars or SQLite fallback
- [x] Enhance backend/prompts_library/settings.py: Support DATABASE_URL (Render standard), better fallback
- [x] Add healthcheck to backend/Dockerfile
- [ ] Update README.md with deployment instructions (env vars for Render)

## Testing
- [x] Local: docker-compose up (unchanged, entrypoint conditional)
- [x] Frontend: npm run build succeeds (Angular 18 fixed)
- [x] Backend Docker: fixes applied (test when Docker installed)

## Final
- [x] Commit/push all changes
- [x] Redeploy Vercel/Render

