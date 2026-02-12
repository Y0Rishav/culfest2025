@echo off
echo Starting Culfest 2025 with Chatbot...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Start Next.js in a new window
echo Starting Next.js application...
start "Next.js - Culfest 2025" cmd /k "npm run dev"

REM Wait a moment
timeout /t 3 /nobreak >nul

REM Start Python chatbot in a new window
echo Starting Python Chatbot...
start "Python Chatbot" cmd /k "cd chatbot && python main.py"

echo.
echo ========================================
echo Both services are starting!
echo.
echo Next.js:  http://localhost:3000
echo Chatbot:  http://localhost:8000
echo ========================================
echo.
echo Press any key to stop both services...
pause >nul

REM Kill both services
taskkill /FI "WindowTitle eq Next.js - Culfest 2025*" /T /F >nul 2>nul
taskkill /FI "WindowTitle eq Python Chatbot*" /T /F >nul 2>nul

echo Services stopped.
pause
