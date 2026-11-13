@echo off
title Delimenu Maison - Servidor
cd /d "%~dp0"

echo ==================================================
echo    DELIMENU MAISON - INICIANDO SERVIDOR LOCAL     
echo ==================================================
echo.

:: Abre el navegador tras 3 segundos
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

:: Detectar si pnpm esta instalado, sino usar npm
where pnpm >nul 2>&1
if %errorlevel% equ 0 (
    pnpm dev
) else (
    npm run dev
)

if %errorlevel% neq 0 (
    echo.
    echo Ocurrio un error al ejecutar el servidor.
    pause
)

