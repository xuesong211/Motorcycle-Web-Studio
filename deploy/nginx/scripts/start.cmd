@echo off
setlocal
cd /d "%~dp0..\app"

if not exist node_modules (
  call npm ci --omit=dev
  if errorlevel 1 exit /b %errorlevel%
)

call npx --no-install vinext start --hostname 127.0.0.1 --port 8787
