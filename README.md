# ITB Screen Recorder

A professional-grade screen recording application built with .NET 8, featuring a distributed architecture with a Windows agent for screen capture and a centralized server for management and streaming.

## Overview

ITB Screen Recorder is a comprehensive solution for capturing and streaming screen content with support for audio, video, and real-time monitoring. The system consists of three main components:

- **Agent** (`ITB-SCREEN-RECOREDER-AGENT`) - Windows desktop application that captures screen and audio
- **Server** (`ITB-SCREEN-RECORDER.Server`) - ASP.NET Core backend for management and API
- **Core** (`ITB-SCREEN-RECORDER.Core`) - Shared models and DTOs

## Architecture

```
???????????????????????????????????????????
?   ITB-SCREEN-RECORDER.Server            ?
?   (ASP.NET Core - Management & API)     ?
???????????????????????????????????????????
? • AgentController - Agent communication ?
? • DashboardController - Dashboard API   ?
? • MediaMtxSupervisor - Stream mgmt      ?
? • TelemetryState - System monitoring    ?
???????????????????????????????????????????
               ? HTTP/WebSocket
               ?
???????????????????????????????????????????
?  ITB-SCREEN-RECOREDER-AGENT             ?
?  (Windows .NET 8 Console App)           ?
????????????????????????????????????????????
? • Screen Capture (DXGI)                 ?
? • Audio Capture (WASAPI)                ?
? • Mouse Cursor Overlay                  ?
? • FFmpeg Integration                    ?
? • Telemetry Reporting                   ?
????????????????????????????????????????????

????????????????????????????????????????????
?  ITB-SCREEN-RECORDER.Core               ?
?  (Shared Library - .NET 8)              ?
????????????????????????????????????????????
? • DTO Models (AuthDto)                  ?
? • Communication Models                  ?
? • System Configuration                  ?
????????????????????????????????????????????
```

## Features

### Agent (Screen Capture)
- **Desktop Capture**: High-performance DXGI-based screen capture
- **Audio Capture**: WASAPI dual-channel audio mixing
- **Mouse Overlay**: Real-time mouse cursor display
- **FFmpeg Integration**: Video encoding and streaming
- **Telemetry**: System performance monitoring and reporting
- **Single Instance**: Prevents multiple instances via OS Mutex
- **Config Management**: JSON-based configuration loading

### Server (Management & API)
- **Agent Management**: Register, monitor, and control agents
- **Dashboard API**: Dashboard data and statistics
- **Media Stream Supervisor**: MediaMtx integration for RTMP streaming
- **Telemetry Collection**: Aggregate system metrics
- **Single Instance Protection**: Server-level instance control
- **Configuration Validation**: Centralized config management via appsettings.json

### Core (Shared)
- **DTO Models**: Standardized data transfer objects for authentication
- **Communication Models**: Agent-server communication contracts
- **System Configuration**: Centralized configuration schema

## Requirements

- **.NET 8.0** or later
- **Windows 10/11** (Agent requires Windows for DXGI and WASAPI)
- **FFmpeg** (for video encoding) - must be in PATH or configured
- **MediaMtx** (optional, for RTMP streaming capabilities)

## Getting Started

### Build

```bash
# Restore dependencies
dotnet restore

# Build all projects
dotnet build

# Build with Release configuration
dotnet build -c Release
```

### Run

#### Server
```bash
# Run the ASP.NET Core server
dotnet run --project ITB-SCREEN-RECORDER.Server

# Server will start on HTTP (default: http://localhost:5000)
```

#### Agent
```bash
# Run the screen capture agent (Windows only)
dotnet run --project ITB-SCREEN-RECOREDER-AGENT

# Agent will auto-connect to configured server endpoint
```

## Project Structure

```
ScreenRecorder/
??? ITB-SCREEN-RECORDER.Server/        # ASP.NET Core server
?   ??? Controllers/
?   ?   ??? AgentController.cs
?   ?   ??? DashboardController.cs
?   ??? Services/
?   ?   ??? TelemetryStateService.cs
?   ?   ??? MediaMtxSupervisorWorker.cs
?   ??? Program.cs
?
??? ITB-SCREEN-RECOREDER-AGENT/        # Windows agent
?   ??? Providers/
?   ?   ??? Video/
?   ?   ?   ??? DxgiScreenCapture.cs
?   ?   ?   ??? MouseCursorOverlay.cs
?   ?   ??? Audio/
?   ?       ??? AudioCaptureStream.cs
?   ?       ??? AudioDeviceNotifier.cs
?   ?       ??? WasapiDualMixer.cs
?   ??? Engine/
?   ?   ??? FfmpegProcessManager.cs
?   ??? AgentEngine.cs
?   ??? ConfigLoader.cs
?   ??? AppConfig.cs
?   ??? Logger.cs
?   ??? TelemetryReporter.cs
?   ??? Program.cs
?
??? ITB-SCREEN-RECORDER.Core/          # Shared library
?   ??? DTO/
?   ?   ??? AuthDto.cs
?   ??? Models/
?       ??? CommunicationModels.cs
?       ??? SystemConfig.cs
?
??? README.md (this file)
```

## Configuration

### Server Configuration (appsettings.json)
```json
{
  "SystemConfig": {
    "ServerPort": 5000,
    "MediaMtxUrl": "http://localhost:9997",
    "LogLevel": "Information"
  }
}
```

### Agent Configuration
The agent loads configuration from `appsettings.json` or environment variables:
- `SERVER_ENDPOINT` - Target server URL
- `AGENT_NAME` - Unique agent identifier
- `LOG_LEVEL` - Logging verbosity

## Key Components

### DxgiScreenCapture
High-performance screen capture using Windows DXGI for low-latency desktop access.

### WasapiDualMixer
Multi-channel audio mixing using Windows WASAPI for synchronized audio capture.

### FfmpegProcessManager
Manages FFmpeg subprocess for video encoding and streaming.

### MediaMtxSupervisorWorker
Integrates with MediaMtx RTMP server for stream distribution.

### TelemetryStateService
Collects and reports system performance metrics (CPU, memory, frame rate).

## Logging

Both Agent and Server use a centralized logging system:
- File logging: `logs/app.log`
- Console logging (development mode)
- Structured logging with levels: Debug, Information, Warning, Error

## Troubleshooting

### Agent fails to start
- Ensure another instance isn't already running (check Task Manager)
- Verify FFmpeg is installed and in PATH
- Check configuration file exists and is valid JSON

### Server connection issues
- Confirm server is running on the configured endpoint
- Check firewall settings allow communication
- Review server logs for errors

### No audio/video capture
- Ensure audio/video devices are not in use by other applications
- Check WASAPI audio devices are available
- Verify DXGI device compatibility with GPU driver

## Development

### Building Debug Configuration
```bash
dotnet build -c Debug
```

### Running Tests (if available)
```bash
dotnet test
```

### Code Style
- Follow C# coding conventions (.NET Design Guidelines)
- Use meaningful variable and method names
- Add XML documentation comments for public APIs

## Technologies

- **.NET 8** - Latest .NET runtime
- **ASP.NET Core** - Web framework for server
- **DXGI** - DirectX Graphics Infrastructure for screen capture
- **WASAPI** - Windows Audio Session API for audio capture
- **FFmpeg** - Multimedia framework
- **MediaMtx** - RTMP media server

## License

See LICENSE file in the repository.

## Repository

- GitHub: [shalevohad/Screen-recorder](https://github.com/shalevohad/Screen-recorder)
- Branch: master

## Support

For issues, bug reports, or feature requests, please visit the GitHub repository.

---

**Note**: This is a Windows-only application due to dependencies on DXGI and WASAPI APIs.
