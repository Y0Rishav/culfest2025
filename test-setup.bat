@echo off
echo ============================================
echo   Culfest 2025 - Testing Chatbot Setup
echo ============================================
echo.

REM Check Python
echo [1/4] Checking Python installation...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo    ✗ Python not found
    echo    Please install Python 3.8 or higher
    pause
    exit /b 1
)
echo    ✓ Python found

REM Check Node.js
echo [2/4] Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo    ✗ Node.js not found
    echo    Please install Node.js
    pause
    exit /b 1
)
echo    ✓ Node.js found

REM Test Vertex AI
echo [3/4] Testing Vertex AI connection...
cd chatbot
python test_vertexai.py
if %errorlevel% neq 0 (
    echo.
    echo    ✗ Vertex AI test failed
    echo    Please check your GCP configuration
    cd ..
    pause
    exit /b 1
)
cd ..

REM Test APIs
echo [4/4] Testing Next.js APIs...
echo    Make sure Next.js is running on localhost:3000
timeout /t 3 /nobreak >nul
cd chatbot
python test_apis.py
if %errorlevel% neq 0 (
    echo.
    echo    ⚠ Some API tests failed
    echo    Make sure Next.js is running: npm run dev
)
cd ..

echo.
echo ============================================
echo   Setup Test Complete!
echo ============================================
echo.
pause
