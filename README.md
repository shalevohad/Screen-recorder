# 🛡️ ITB-SCREEN-RECORDER

[![.NET 8.0](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![MediaMTX](https://img.shields.io/badge/MediaMTX-v1.15.4-FF6F00?logo=fastapi&logoColor=white)](https://github.com/bluenviron/mediamtx)
[![License: Proprietary](https://img.shields.io/badge/License-Enterprise_Proprietary-red)](#)

An Enterprise command-and-control (C2), screen capture, active recording, and live telemetry streaming platform engineered for fully isolated, air-gapped enterprise environments. The platform supports high-density fleets (100+ endpoints) delivering sub-second latency and continuous recording while maintaining zero CPU overhead on workstations through dedicated hardware acceleration (NVIDIA NVENC / Intel QuickSync). Built on .NET 8, the solution provides cross-platform client and server execution across Windows and Linux.

---

## ⚙️ Operational Architecture & End-to-End Topology

The system is designed with a multi-tier client-server command-and-control topology optimized for high reliability, operating system session isolation, and resilient recording:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                CENTRAL SERVER (C2 & Storage)                           │
│                                                                                        │
│  ┌─────────────────────────┐   ┌─────────────────────────────┐   ┌──────────────────┐  │
│  │   React C2 Dashboard    │   │  MediaMTX Streaming Server  │──►│  NetApp Storage  │  │
│  │  (Fleet Grid & Control) │   │     (RTMP Ingest / WHEP)    │   │ (5m Chunks Sync) │  │
│  └────────────▲────────────┘   └──────────────▲──────────────┘   └──────────────────┘  │
└───────────────┼───────────────────────────────┼────────────────────────────────────────┘
                │ Heartbeat / Telemetry         │ RTMP Stream (:19350)
                │ (HTTP / SignalR)              │ (Video + Audio)
┌───────────────┴───────────────────────────────┴────────────────────────────────────────┐
│                             MANAGED WORKSTATION (Endpoint)                             │
│                                                                                        │
│  ┌────────────────────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │ 🛡️ AgentService (Session 0 / systemd)  │  │ 🎥 AgentWorker (Session 1 / GUI)    │  │
│  │  • Watchdog & Server C2 Sync           │  │  • DirectX DDA / X11 Screen Grab     │  │
│  │  • User Logon Detection                │  │  • WASAPI Speaker + Mic Dual Mixer   │  │
│  │  • Spawns Worker into User Session     │─►│  • FFmpeg Compression Engine (NVENC) │  │
│  │    via Win32 CreateProcessAsUser       │  │  • Local Failover Offline Buffer     │  │
│  └────────────────────────────────────────┘  └──────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Solution Projects & Component Breakdown

The codebase is structured into clear architectural layers:

| Project | Target | Description |
| :--- | :--- | :--- |
| [**`ITB-SCREEN-RECORDER.Core`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Core) | Class Library | Shared domain models, configuration classes, IPC contracts, SQLite event logging, and hardware encoder diagnostics ([`HardwareProbe.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Core/Diagnostics/HardwareProbe.cs)). |
| [**`ITB-SCREEN-RECORDER.Server`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server) | ASP.NET Core 8 Web API | Central C2 server managing station telemetry, SignalR command dispatch, MediaMTX process supervision, wall-clock chunk scheduling, storage failover, and WebRTC WHEP proxy. |
| [**`ITB-SCREEN-RECORDER.Server/ClientApp`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp) | React 18 + Vite | Tactical command dashboard (C2/NOC) providing live station monitoring grids, WebRTC / HLS video playback, real-time telemetry bars, and DVR time-scrubbing. |
| [**`ITB-SCREEN-RECORDER.AgentService`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentService) | Windows Service / Daemon | Session 0 background supervisor. Handles C2 heartbeats, detects user desktop sessions, and uses Win32 token duplication to spawn the worker into the active user session. |
| [**`ITB-SCREEN-RECORDER.AgentWorker`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker) | Console Application | Session 1+ interactive worker. Captures screen frames via DXGI Desktop Duplication API (DDA), mixes WASAPI speaker and microphone audio, captures keystroke events, and streams hardware-encoded RTMP to MediaMTX. |
| [**`Features/Extractor`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor) | Feature Plugin | Video export and multicam synchronized track cutting engine ([`SynchronizedTrackCutter.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/SynchronizedTrackCutter.cs)). Aligns timecodes, removes global idle gaps, and injects synthetic "No Signal" gap filler clips. |
| [**`Features/ExtractorAdvanced`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced) | Feature Plugin + Web | Forensic video investigation suite with Near-Live LiveTail DVR scanner and multi-station synchronized canvas timeline. |
| [**`Installers`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Installers) | WiX v4 / Scripts | Enterprise installers for Windows (.msi) and Linux systemd packages. |
| [**`ITB-SCREEN-RECORDER.Tests`**](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Tests) | xUnit | Comprehensive test suite covering IPC, service-to-server communication, chunk math, and storage resolution. |

---

## 🚀 Key Features & Capabilities

### 1. Zero Workstation Impact (<1% CPU)
- Dedicated hardware-accelerated encoding using **NVIDIA NVENC** (`h264_nvenc`) and **Intel QuickSync** (`h264_qsv`).
- Automatic fallback to CPU software encoding (`libx264` ultrafast zerolatency) only when no hardware encoder is present.
- High-efficiency screen grabber via DirectX Desktop Duplication API (DDA) on Windows and X11/XSHM on Linux.

### 2. Deterministic Wall-Clock Recording
- Recordings are cut on exact wall-clock multiples of `ChunkIntervalMinutes` (default 5 minutes), rather than stream elapsed time.
- Guaranteed synchronized chunk intervals across all 100+ endpoints regardless of when individual machines connected or rebooted.

### 3. Dual-Path Storage Failover & Auto-Healing
- **Primary Storage**: NetApp UNC network path with 3-second heartbeat probing.
- **Local Fallback**: Instant auto-failover to local NVMe storage if network connectivity drops.
- **Offline Buffering**: Local agent storage buffer automatically spools recordings during server disconnects and syncs them once connectivity restores.

### 4. Sub-Second Live Monitoring (WebRTC WHEP)
- Real-time live fleet viewing in the web browser using WebRTC (WHEP) for sub-second glass-to-glass latency.
- Automatic fallback to Low-Latency HLS (LL-HLS) when WebRTC peer connection is blocked.

### 5. Multicam Synchronized Forensic Replay & Export
- Multicam NLE extraction engine that cuts across multiple stations simultaneously.
- Frame-accurate gap interpolation using dynamically generated "No Signal" test patterns so all synchronized tracks retain identical timeline duration.

### 6. Keystroke Intelligence & Subtitles
- Low-level keyboard hook logs operational keystroke metadata.
- Automated `.srt` subtitle generation allows forensic analysts to review entered commands and hotkeys synchronized directly with video playback.

---

## 📜 System Rules & Invariants

This platform is governed by strict operational rules documented in [RULES.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/RULES.md):
- **Rule 1 (Wall-Clock Chunks)**: Slicing managed by [`RecordingChunkScheduler`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Services/RecordingChunkScheduler.cs) via MediaMTX API toggle.
- **Rule 1a & MediaMTX Version Pin**: **MediaMTX is pinned to v1.15.4**. Newer versions introduce an NTP drift tolerance check that causes premature segmentation.
- **Rule 2 (Storage Failover)**: NetApp UNC primary verified every tick with 3s probe; local path fallback.
- **Rule 3 (Retention)**: Age-based retention (`recordDeleteAfter: "30d"`).
- **Rule 6 (Single Instance)**: OS-level Mutex enforces single-instance execution per machine.
- **Rule 7 (MediaMTX Supervisor)**: Process watchdog restarts `mediamtx.exe` within 5 seconds of exit.
- **Rule 8 (Tri-Tier GPU Probing)**: NVENC &rarr; Intel QuickSync &rarr; CPU libx264.
- **Rule 9 (Multicam Track Cutting)**: Identical timeline durations with synthetic "No Signal" gap fills.
- **Rule 10 (Near-Live Hot-Window Access)**: Non-locking file streams (`FileShare.ReadWrite | FileShare.Delete`) for zero-collision inspection during active recording.

---

## 🛠️ Development & Build Guide

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+ & npm](https://nodejs.org/)
- Windows 10/11 or Linux (Ubuntu 22.04+)

### Building the .NET Solution
```powershell
# Build entire solution
dotnet build ITB-Screen-Recorder.sln

# Run unit and integration tests
dotnet test ITB-SCREEN-RECORDER.Tests/ITB-SCREEN-RECORDER.Tests.csproj
```

### Running the Tactical C2 Dashboard Locally
```bash
cd ITB-SCREEN-RECORDER.Server/ClientApp
npm install
npm run dev
```

### Running the Server
```powershell
cd ITB-SCREEN-RECORDER.Server
dotnet run
```
The server will start on `http://localhost:5000` (or `https://localhost:5001`), supervise MediaMTX on RTMP port `19350`, and serve the React C2 frontend.

---

## 📚 Architectural & Executive Presentations

High-density visual presentations are available in the [Presentations/](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations) directory:
- **Technical & Engineering Architecture Deck** (21 slides): Available as [PowerPoint (.pptx)](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/ITB_SCREEN_RECORDER_Technical_Architecture.pptx) and [Interactive Web Deck (.html)](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/Technical_Architecture_Presentation.html).
- **Executive Management Deck** (14 slides): Available as [PowerPoint (.pptx)](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/ITB_SCREEN_RECORDER_Executive_Management.pptx) and [Interactive Web Deck (.html)](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/Executive_Management_Presentation.html).
- See [Presentations/README.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/README.md) for presentation controls and PDF export instructions.

---

## 🤖 AI Guidelines & Context
AI assistants working on this codebase should refer to [AGENTS.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/AGENTS.md) and [GEMINI.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/GEMINI.md) for architectural rules, coding standards, and sandbox configuration details.
