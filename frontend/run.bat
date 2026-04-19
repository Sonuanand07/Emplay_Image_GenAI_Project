@echo off
echo Setting up frontend...
if not exist node_modules (
    npm install
) 
npm install
ng serve --host 0.0.0.0 --port 3000
pause

