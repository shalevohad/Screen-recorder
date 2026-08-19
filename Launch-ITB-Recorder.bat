@echo off
REM Launches the ITB-SCREEN-RECORDER Server, AgentService, and AgentWorker together,
REM then opens the dashboard in the browser.
REM Make a desktop shortcut pointing at this file to run everything with one double-click.
REM
REM Why three processes: since the "split service/worker" refactor, the Agent is split into
REM   - AgentService: reports telemetry to the Server and (when installed as a real Windows
REM     Service under LocalSystem) auto-launches AgentWorker into the active user session.
REM   - AgentWorker: does the actual screen/audio capture and streaming.
REM AgentService's auto-launch of the Worker requires SYSTEM-level privileges
REM (WTSQueryUserToken) that a normal console/manual run does not have, so this script starts
REM AgentWorker directly as well. If you install AgentService as an actual Windows Service
REM (see the guide printed at the end), it will manage the Worker on its own instead.

setlocal enabledelayedexpansion

set "ROOT=%~dp0"
set "CONFIG=Release"

set "SERVER_DIR=%ROOT%ITB-SCREEN-RECORDER.Server\bin\%CONFIG%\net8.0"
set "SERVER_EXE=%SERVER_DIR%\ITB-SCREEN-RECORDER.Server.exe"
set "AGENTSERVICE_DIR=%ROOT%ITB-SCREEN-RECORDER.AgentService\bin\%CONFIG%\net8.0"
set "AGENTSERVICE_EXE=%AGENTSERVICE_DIR%\ITB-SCREEN-RECORDER.AgentService.exe"
set "AGENTWORKER_DIR=%ROOT%ITB-SCREEN-RECORDER.AgentWorker\bin\%CONFIG%\net8.0"
set "AGENTWORKER_EXE=%AGENTWORKER_DIR%\ITB-SCREEN-RECORDER.AgentWorker.exe"
set "DASHBOARD_URL=http://localhost:5090"

if not exist "%SERVER_EXE%" set "CONFIG=Debug" & goto :recompute
goto :checked

:recompute
set "SERVER_DIR=%ROOT%ITB-SCREEN-RECORDER.Server\bin\%CONFIG%\net8.0"
set "SERVER_EXE=%SERVER_DIR%\ITB-SCREEN-RECORDER.Server.exe"
set "AGENTSERVICE_DIR=%ROOT%ITB-SCREEN-RECORDER.AgentService\bin\%CONFIG%\net8.0"
set "AGENTSERVICE_EXE=%AGENTSERVICE_DIR%\ITB-SCREEN-RECORDER.AgentService.exe"
set "AGENTWORKER_DIR=%ROOT%ITB-SCREEN-RECORDER.AgentWorker\bin\%CONFIG%\net8.0"
set "AGENTWORKER_EXE=%AGENTWORKER_DIR%\ITB-SCREEN-RECORDER.AgentWorker.exe"

:checked
if not exist "%SERVER_EXE%" (
    echo [ERROR] Server executable not found in Release or Debug output.
    echo Build the solution first, e.g.:
    echo   dotnet build "%ROOT%ITB-Screen-Recorder.sln" -c Release
    pause
    exit /b 1
)

if not exist "%AGENTSERVICE_EXE%" (
    echo [ERROR] AgentService executable not found at:
    echo   %AGENTSERVICE_EXE%
    echo Build the solution first: dotnet build "%ROOT%ITB-Screen-Recorder.sln" -c %CONFIG%
    pause
    exit /b 1
)

if not exist "%AGENTWORKER_EXE%" (
    echo [ERROR] AgentWorker executable not found at:
    echo   %AGENTWORKER_EXE%
    echo Build the solution first: dotnet build "%ROOT%ITB-Screen-Recorder.sln" -c %CONFIG%
    pause
    exit /b 1
)

echo Using %CONFIG% build.

echo Starting ITB-SCREEN-RECORDER Server...
set "ASPNETCORE_ENVIRONMENT=Development"
start "ITB Server" /D "%SERVER_DIR%" "%SERVER_EXE%"

echo Waiting for the Server to come online before starting the Agent...
set "RETRIES=0"

:serverwait
curl -s -o nul -w "%%{http_code}" "%DASHBOARD_URL%" > "%TEMP%\itb_launcher_status.txt" 2>nul
set /p STATUS=<"%TEMP%\itb_launcher_status.txt"
if "%STATUS%"=="200" goto serverready
set /a RETRIES+=1
if %RETRIES% GEQ 30 goto serverready
timeout /t 1 /nobreak >nul
goto serverwait

:serverready
echo Starting ITB-SCREEN-RECORDER AgentService (telemetry supervisor)...
start "ITB AgentService" /D "%AGENTSERVICE_DIR%" "%AGENTSERVICE_EXE%"

echo Starting ITB-SCREEN-RECORDER AgentWorker (screen/audio capture)...
start "ITB AgentWorker" /D "%AGENTWORKER_DIR%" "%AGENTWORKER_EXE%"

echo Waiting for the dashboard to reflect the running Agent...
timeout /t 3 /nobreak >nul

del "%TEMP%\itb_launcher_status.txt" >nul 2>nul
start "" "%DASHBOARD_URL%"

endlocal
