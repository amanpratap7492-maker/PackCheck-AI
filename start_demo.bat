@echo off
title PackCheck-AI Demo

echo ========================================
echo        PackCheck-AI Demo Starting
echo ========================================
echo.

echo [1/2] Starting Backend...

start "PackCheck-AI Backend" cmd /k "cd /d C:\Users\AMAN PRATAP\OneDrive\Desktop\PackCheck-AI\backend && call venv\Scripts\activate && python -m uvicorn main:app --reload"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo [2/2] Opening Frontend...

start "" "C:\Users\AMAN PRATAP\OneDrive\Desktop\PackCheck-AI\frontend\index.html"

echo.
echo ========================================
echo       PackCheck-AI is Ready!
echo ========================================
echo.

pause