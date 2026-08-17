@echo off
REM Launches the ITB-SCREEN-RECORDER Server and Agent together, then opens the dashboard in the browser.
REM Make a desktop shortcut pointing at this file to run everything with one double-click.

setlocal

set "ROOT=%~dp0"
set "SERVER_DIR=%ROOT%ITB-SCREEN-RECORDER.Server\bin\Debug\net8.0"
set "SERVER_EXE=%SERVER_DIR%\ITB-SCREEN-RECORDER.Server.exe"
set "AGENT_DIR=%ROOT%ITB-SCREEN-RECOREDER-AGENT\bin\Debug\net8.0-windows"
set "AGENT_EXE=%AGENT_DIR%\ITB-SCREEN-RECOREDER-AGENT.exe"
set "DASHBOARD_URL=http://localhost:5090"

if not exist "%SERVER_EXE%" (
    echo [ERROR] Server executable not found at:
    echo   %SERVER_EXE%
    echo Build the solution first: dotnet build "%ROOT%ITB-Screen-Recorder.sln"
    pause
    exit /b 1
)

if not exist "%AGENT_EXE%" (
    echo [ERROR] Agent executable not found at:
    echo   %AGENT_EXE%
    echo Build the solution first: dotnet build "%ROOT%ITB-Screen-Recorder.sln"
    pause
    exit /b 1
)

echo Starting ITB-SCREEN-RECORDER Server...
set "ASPNETCORE_ENVIRONMENT=Development"
start "ITB Server" /D "%SERVER_DIR%" "%SERVER_EXE%"

echo Starting ITB-SCREEN-RECORDER Agent...
start "ITB Agent" /D "%AGENT_DIR%" "%AGENT_EXE%"

echo Waiting for the dashboard to come online...
set "RETRIES=0"

:waitloop
curl -s -o nul -w "%%{http_code}" "%DASHBOARD_URL%" > "%TEMP%\itb_launcher_status.txt" 2>nul
set /p STATUS=<"%TEMP%\itb_launcher_status.txt"
if "%STATUS%"=="200" goto ready
set /a RETRIES+=1
if %RETRIES% GEQ 20 goto ready
timeout /t 1 /nobreak >nul
goto waitloop

:ready
del "%TEMP%\itb_launcher_status.txt" >nul 2>nul
start "" "%DASHBOARD_URL%"

endlocal
