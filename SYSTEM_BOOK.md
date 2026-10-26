# 📘 ITB-SCREEN-RECORDER — Comprehensive System Book & Developer Architecture Guide
> **Classification**: Enterprise Air-Gapped Operational Platform  
> **Target Audience**: Core Developers, Systems Engineers, DevOps & Security Architects  
> **Last Updated**: 2026-10-25  
> **Current Version**: v1.0.41  
> **Governing Rules**: Consult [RULES.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/RULES.md) for behavioral invariants and strict system constraints.

---

## 📑 Table of Contents
1. [Executive Summary & Operational Mission](#1-executive-summary--operational-mission)
2. [High-Level Architecture & Network Topology](#2-high-level-architecture--network-topology)
3. [Component Matrix & Repository Structure](#3-component-matrix--repository-structure)
4. [Windows Session 0 vs. Session 1 Architecture & IPC](#4-windows-session-0-vs-session-1-architecture--ipc)
5. [Media Capture, Hardware Encoding & Streaming Pipeline](#5-media-capture-hardware-encoding--streaming-pipeline)
6. [Wall-Clock Chunking, Storage Failover & File Locking](#6-wall-clock-chunking-storage-failover--file-locking)
7. [Multi-Monitor Topology & Dynamic Hot-Plug](#7-multi-monitor-topology--dynamic-hot-plug)
8. [Multicam Forensic Extraction & Gap Interpolation](#8-multicam-forensic-extraction--gap-interpolation)
9. [C2 Communication, SignalR Hubs & SQLite Catalog](#9-c2-communication-signalr-hubs--sqlite-catalog)
10. [ClientApp Frontend Architecture & Design System](#10-clientapp-frontend-architecture--design-system)
11. [Air-Gapped & Offline Environment Invariants](#11-air-gapped--offline-environment-invariants)
12. [Developer Playbook: Build, Debug & Test Workflows](#12-developer-playbook-build-debug--test-workflows)

---

## 1. Executive Summary & Operational Mission

**ITB-SCREEN-RECORDER** is an enterprise-grade command-and-control (C2), multi-screen recording, and live telemetry streaming platform engineered specifically for **fully air-gapped, high-security operational networks**.

### Core Requirements & Key Metrics:
- **Scale**: Continuously captures, encodes, and records 70–100+ high-density workstations (running Windows 11 and Linux).
- **Workstation Overhead**: **<1% CPU utilization** on client endpoints achieved through hardware-accelerated video encoding (NVIDIA NVENC and Intel QuickSync QSV).
- **Live Latency**: Sub-second (200–400ms) glass-to-glass live fleet viewing in standard browsers via WebRTC (WHEP) and Low-Latency HLS.
- **Reliability & Resilience**: 24/7 continuous recording with deterministic wall-clock chunk boundaries, automatic local buffering during network partition, self-healing process watchdogs, and non-blocking Near-Live file access.
- **Air-Gapped Invariant**: **Zero outbound internet dependencies**. No CDNs, no external font services (e.g. Google Fonts), no remote license servers. 100% self-contained within internal subnets.

---

## 2. High-Level Architecture & Network Topology

The system uses a distributed client-server topology separating low-level endpoint capture from centralized streaming, indexing, and storage.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              CENTRAL C2 & RECORDING SERVER                             │
│                                                                                        │
│  ┌────────────────────────┐    ┌──────────────────────────┐    ┌────────────────────┐  │
│  │  Tactical C2 Dashboard │    │  MediaMTX (v1.15.4 Pinned) │───►│ NetApp Storage UNC │  │
│  │   (React 18 + Vite)    │    │   RTMP Ingest (:19350)   │    │ (Primary 5m Chunks)│  │
│  │   Station Grid / HUD   │    │   WebRTC WHEP (:8889)    │    └─────────┬──────────┘  │
│  └───────────▲────────────┘    │   LL-HLS Stream (:8888)  │              │             │
│              │                 └─────────────▲────────────┘              │ Failover    │
│              │ SignalR / HTTPS               │ RTMP Stream (:19350)      ▼ Heartbeat   │
│              │ Telemetry & C2 Commands       │ (Video + Audio)   ┌──────────────────┐  │
│              │                               │                   │ Local NVMe Disk  │  │
│              │                               │                   │ (Local Fallback) │  │
│              │                               │                   └──────────────────┘  │
└──────────────┼───────────────────────────────┼─────────────────────────────────────────┘
               │                               │
       Internal Operational LAN Subnets (e.g., 10.x.x.x / 172.16.x.x / 192.168.x.x)
               │                               │
┌──────────────┴───────────────────────────────┴─────────────────────────────────────────┐
│                             MANAGED WORKSTATION (Endpoint)                             │
│                                                                                        │
│  ┌────────────────────────────────────────┐    ┌────────────────────────────────────┐  │
│  │ 🛡️ AgentService (Session 0 Service)    │    │ 🎥 AgentWorker (Session 1+ GUI)    │  │
│  │  • SYSTEM Context                      │    │  • User Context                    │  │
│  │  • Logon/Logoff Session Watchdog       │    │  • DXGI Desktop Duplication (DDA)  │  │
│  │  • Spawns Worker via Token Duplication │───►│  • WASAPI Speaker + Mic Dual Mixer │  │
│  │  • IPC Named Pipe Management           │    │  • Tri-Tier Hardware Encoder (NVENC│  │
│  │  • Heartbeat to C2 Server              │    │  • Low-Level Keystroke Hook        │  │
│  └────────────────────────────────────────┘    └────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Protocol & Port Matrix

| Protocol | Port | Direction | Source | Destination | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RTMP** | `19350` | Inbound | AgentWorker | MediaMTX | Video and audio streaming ingest. (Pinned in `mediamtx.yml`). |
| **WHEP / WebRTC** | `8889` / UDP | Inbound | Operator Browser | MediaMTX / Server | Sub-second real-time video playback via WebRTC. |
| **LL-HLS** | `8888` | Inbound | Operator Browser | MediaMTX | Fallback HTTP Live Streaming. |
| **MediaMTX API** | `9997` | Localhost | Server | MediaMTX | Control API for wall-clock chunk rotation (`record: false -> true`). |
| **SignalR / HTTP**| `5000` / `5001` | Bi-directional| AgentService / UI | Server | Real-time C2 telemetry, status reports, remote controls. |
| **SMB / CIFS** | `445` | Outbound | Server | NetApp NAS | Primary recording chunk storage over UNC paths. |
| **Named Pipe** | Dynamic | IPC Local | AgentService | AgentWorker | Session 0 to Session 1 IPC (`\\.\pipe\ITB_ScreenRecorder_Ipc_*`). |

---

## 3. Component Matrix & Repository Structure

```
c:\Devlopers\ITB-SCREEN-RECORDER\
├── ITB-SCREEN-RECORDER.Core\             # Shared domain, contracts, encryption, SQLite DB base
├── ITB-SCREEN-RECORDER.Server\           # Central ASP.NET Core 8 Web API, SignalR, MediaMTX supervisor
│   ├── ClientApp\                        # Tactical C2 Command Dashboard (React 18, Vite, SCSS)
│   ├── MediaMTX\                         # Bundled MediaMTX v1.15.4 binary and mediamtx.yml config
│   ├── Controllers\                      # REST API endpoints (Auth, Fleet, Settings, Maintenance)
│   ├── Hubs\                             # SignalR Realtime Hubs (AgentHub, DashboardHub)
│   └── Services\                         # Storage failover, chunk scheduler, telemetry monitor
├── ITB-SCREEN-RECORDER.AgentService\      # Windows Service / Linux daemon running in Session 0
├── ITB-SCREEN-RECORDER.AgentWorker\       # Interactive Session 1+ screen/audio/keystroke capture worker
├── Features\
│   ├── Extractor\                        # Core multi-camera track cutter and video export engine
│   └── ExtractorAdvanced\                # Forensic LiveTail DVR viewer and multi-station timeline
├── Installers\                           # WiX Toolset v4 installer definitions (.msi) & Linux packaging
└── ITB-SCREEN-RECORDER.Tests\            # Complete test suite (315+ unit, integration & sync tests)
```

---

## 4. Windows Session 0 vs. Session 1 Architecture & IPC

Windows security restricts Windows Services to **Session 0**, which has no access to interactive display surfaces, window messages, or audio endpoints.

```
Session 0 (Isolated Service Context)            Session 1+ (Interactive User Context)
┌──────────────────────────────────────┐        ┌──────────────────────────────────────┐
│ ITB-SCREEN-RECORDER.AgentService     │        │ ITB-SCREEN-RECORDER.AgentWorker      │
│ (Runs as NT AUTHORITY\SYSTEM)        │        │ (Runs as Logged-in User)             │
│                                      │        │                                      │
│ 1. WTSSessionNotification Listener   │        │ • DXGI Desktop Duplication API       │
│ 2. WTSQueryUserToken(sessionId)      │        │ • WASAPI Audio Loopback Capture      │
│ 3. DuplicateTokenEx -> PrimaryToken  │        │ • Low-Level Keystroke Hook           │
│ 4. CreateProcessAsUser(Worker.exe)   │───────►│ • FFmpeg Hardware Video Compression  │
│                                      │        │                                      │
│ 5. Named Pipe IPC Server             │◄──────►│ Named Pipe IPC Client                │
└──────────────────────────────────────┘        └──────────────────────────────────────┘
```

### Key Implementation Details:
1. **Interactive Process Spawning**:
   - Implemented in [`InteractiveProcessLauncher.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentService/Infrastructure/InteractiveProcessLauncher.cs).
   - Listens for session changes via `WTSSessionNotification` (`WTS_CONSOLE_CONNECT`, `WTS_SESSION_LOGON`).
   - Obtains the logged-in user token via Win32 `WTSQueryUserToken`, duplicates it with `DuplicateTokenEx` (`TOKEN_ALL_ACCESS`), sets the environment block, and calls `CreateProcessAsUser` to spawn `ITB-SCREEN-RECORDER.AgentWorker.exe` directly on `WinSta0\Default`.
2. **Local IPC via Named Pipes**:
   - Implemented in [`IpcServerFactory.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Core/Ipc/IpcServerFactory.cs).
   - Pipe name: `\\.\pipe\ITB_ScreenRecorder_Ipc_{SessionId}`.
   - Named pipe security ACLs are explicitly configured with `PipeSecurity` so that the worker (running under non-elevated user credentials) can exchange heartbeats, telemetry, and control commands with the service.

---

## 5. Media Capture, Hardware Encoding & Streaming Pipeline

The media ingestion engine in `ITB-SCREEN-RECORDER.AgentWorker` is optimized for zero CPU impact and zero packet loss.

### 1. Screen Capture Engine & Resilience
- **Windows Capture Pipeline**: Implemented via [`ResilientScreenCapture.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker/Providers/Video/ResilientScreenCapture.cs), pairing high-performance DXGI Desktop Duplication with fallback GDI capture.
  - **DXGI DDA ([`DxgiScreenCapture.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker/Providers/Video/DxgiScreenCapture.cs))**: Grabs GPU surfaces directly in VRAM with zero-copy whenever possible. Supports multi-adapter topologies (`AdapterIndex`, `OutputIndex`).
  - **Static Screen Frame Retention**: When Windows desktop is idle/static, DXGI returns `WaitTimeout`. The capture engine retains and yields the previously captured frame buffer (`_hasCapturedFrame`), preventing video pipelines from emitting empty/black buffers.
  - **Initial Startup Snapshot**: On initialization, `DxgiScreenCapture` immediately takes a 1-shot GDI snapshot to seed `_frameBuffer`. This guarantees frame 0 is never pitch black (zero bytes).
  - **Multi-Monitor GDI Fallback ([`GdiScreenCapture.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker/Providers/Video/GdiScreenCapture.cs))**: Accepts discrete `(x, y, width, height)` coordinates, enabling accurate BitBlt capture across extended, stacked, or negative-offset secondary monitors when DXGI duplication is unavailable.
- **Linux**: Uses **X11 / XSHM** or **PipeWire** portal interfaces for headless or modern display servers.

### 2. Audio Capture & Intercom Mixer
- Implemented in [`WasapiAudioCapture.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker/Providers/Audio/WasapiAudioCapture.cs).
- Captures two independent streams:
  1. **Speaker Output**: System audio loopback (`eRender` endpoint in loopback mode).
  2. **Microphone Input**: Operator headset/microphone (`eCapture` endpoint).
- Real-time software mixer blends both channels into a unified stereo PCM audio stream, synchronized with video timecodes.

### 3. Tri-Tier Hardware Encoder Selection
Implemented in [`HardwareProbe.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Core/Diagnostics/HardwareProbe.cs):
The encoder selection evaluates capabilities in strict sequence:

```
┌────────────────────────┐      Available?
│ 1. NVIDIA NVENC        │ ────────────────────► h264_nvenc (preset: p2, tune: ll, forced-idr: 1)
└───────────┬────────────┘
            │ No
            ▼
┌────────────────────────┐      Available?
│ 2. Intel QuickSync     │ ────────────────────► h264_qsv (preset: veryfast, low_power: 1)
└───────────┬────────────┘
            │ No
            ▼
┌────────────────────────┐
│ 3. CPU Software        │ ────────────────────► libx264 (preset: ultrafast, tune: zerolatency)
└────────────────────────┘
```

> [!IMPORTANT]
> **Probe Result Caching**: `HardwareProbe` results are cached for the entire process lifetime. Hardware probes are never re-executed during active streaming to prevent pipeline stutter.

### 4. MediaMTX Streaming Server (CRITICAL VERSION PIN)
- **Pinned Version**: **MediaMTX v1.15.4** ([`mediamtx.exe`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.exe)).
- **Why It Is Pinned**: In MediaMTX v1.15.5+, an internal `ntpDriftTolerance` check was introduced in the fMP4 recorder that force-splits chunks if clock jitter occurs. Under real-time workstation encoding, this causes chunks to split every 15–20 seconds instead of adhering to the 5-minute wall-clock rule. **Do not upgrade MediaMTX.**
- **Port Invariant**: MediaMTX RTMP port is hardcoded to `19350` in [`mediamtx.yml`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.yml).

---

## 6. Wall-Clock Chunking, Storage Failover & File Locking

### 1. Wall-Clock Aligned Chunking (Rule 1)
Recordings are sliced into deterministic intervals aligned to the wall clock (multiples of `Storage.ChunkIntervalMinutes`, default 5 min).

```
Timeline: 15:12 (Start) ───────► 15:15 ────────────────► 15:20 ────────────────► 15:25
          [ Short Chunk 3m ]      [ Regular Chunk 5m ]    [ Regular Chunk 5m ]
```

- **Scheduler**: [`RecordingChunkScheduler.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Services/RecordingChunkScheduler.cs) calculates `ComputeNextBoundaryUtc()` using pure UTC clock division, eliminating drift.
- **Trigger**: At the exact boundary, it executes `RotatePathRecordingAsync` against MediaMTX Control API (`record: false -> true`), cleanly finalizing the current MP4 segment and initiating a new segment without dropping frames.
- **Timestamp Format**: MediaMTX uses `%Y-%m-%d_%H-%M-%S-%f` timestamp patterns reflecting exact segment start times.

### 2. Dual-Path Storage Failover (Rule 2)
- Implemented in [`StoragePathResolver.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Services/StoragePathResolver.cs).
- **Primary Storage**: NetApp UNC path (`Storage.NetAppUncPath`).
- **Heartbeat Probe**: Probed every chunk tick with a strict 3-second timeout (`Directory.Exists`).
- **Fallback**: If NetApp is unreachable, traffic seamlessly shifts to `Storage.LocalFallbackPath` (`C:\ProgramData\ITB-SCREEN-RECORDER\Recordings`). When NetApp recovers, the scheduler returns to primary storage on the subsequent chunk boundary.

### 3. Non-Locking File Access Semantics (Rule 10)
Active recordings (<30 minutes old) are continuously written by MediaMTX. Any indexer, player, or probe opening these files **must** use non-locking file share semantics:
```csharp
new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete);
```
FFmpeg probes on hot files must include:
`-analyzeduration 1M -probesize 1M -threads 2`

---

## 7. Multi-Monitor Topology & Dynamic Hot-Plug

### 1. Multi-Monitor Stream Mapping & WHEP Proxy Routing (Rule 11)
- Each display is captured on its native GPU adapter via DXGI DDA (Windows) or XRandR/PipeWire (Linux). Zero cross-GPU PCIe bus transfers.
- Stream paths:
  - Primary Display + Audio: `live/{hostname}/mon-0`
  - Secondary Displays (Video only): `live/{hostname}/mon-1`, `live/{hostname}/mon-2`, etc.
  - Legacy Single-Monitor Path: `live/{hostname}`
- **WHEP Reverse Proxy & Stream Path Fallback ([`WhepProxyController.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Controllers/WhepProxyController.cs))**:
  - Exposes an air-gapped reverse proxy endpoint `/api/v1/whep/{*streamPath}` routing WebRTC SDP exchanges to MediaMTX.
  - Automatically handles stream path aliases: if a client requests `live/{hostname}/mon-0` and MediaMTX returns 404 (e.g. older single-monitor agent streaming to root), it seamlessly falls back to `live/{hostname}`. Conversely, if `live/{hostname}` returns 404, it queries `live/{hostname}/mon-0`.
  - Air-Gapped WebRTC configuration: Client players connect via `/api/v1/whep` with empty ICE server lists (`iceServers: []`), eliminating external STUN lookups and cross-origin localhost connection failures.
- **Dynamic Hot-Plug**: Display connect/disconnect events spawn or cleanly terminate individual display pipelines without interrupting active recording on surviving displays.

### 2. Frontend Topology Display, Audio Solo & Overlap Prevention (Rule 12)
- **Virtual Desktop Canvas**: Real-time monitor positioning according to physical OS virtual desktop bounds $(X, Y, W, H)$.
- **Station Display Bar**: Direct toggle on station cards `[ ⊞ Canvas | 🖥 1 | 🖥 2 ]` positioned at top-right (`top: 8px; right: 8px; z-index: 25`).
- **Four-Quadrant Decoupled Overlays**: To guarantee zero visual collisions across dense fleets:
  - Top-Left: Clickable status tag (`⚠️ MONITOR ONLY` / `⏱ SNOOZED (30m)`).
  - Top-Right: Multi-monitor display selector bar (`StationDisplayBar`).
  - Bottom-Left: Custom configuration / policy tag (`.tactical-override-tag`).
  - Bottom-Right: Audio feed indicator (`.tactical-audio-indicator` — `🔈 MUTED` / `🔊 LIVE`).
- **Responsive Card Geometry**: Minimum card width set to 340px (scaling to 760px) ensuring headers never wrap or overlap controls.
- **Fullscreen Minimap Radar**: Clicking off-canvas displays an interactive HUD Minimap for one-click monitor switching.
- **Exclusive Audio Solo**: Strict intercom radio mode. Only **one** station plays audio across the entire NOC grid at any time; all other video players stay muted to avoid browser audio buffer resource exhaustion.
- **Stream Health & Black Screen Validation**: Automated suite (`streamHealth.test.js`) continuously verifies luma/entropy across buffers, multi-monitor path non-collision, and WebRTC connection pooling across 100+ stations.

---

## 8. Multicam Forensic Extraction & Gap Interpolation

### 1. Synchronized Multicam Track Cutting (Rule 9)
Handled by [`SynchronizedTrackCutter.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/SynchronizedTrackCutter.cs):
- Trims global idle gaps across all stations equally.
- For station-specific internal dropouts, injects a synthetic 5-second "No Signal" test pattern ([`NoSignalPatternService.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/NoSignalPatternService.cs)) sliced to millisecond precision via `ffconcat`. All exported tracks maintain exact timeline alignment.

### 2. Activity Focus & Dynamic Transitions (Rule 13)
- Evaluates mouse and keyboard activity to generate an intelligent director cut.
- Applies symmetric dip-to-black transitions with a 1-second pre-roll lead-in ($T - 1000\text{ms}$).
- Overlays a persistent minimap HUD that never dips or fades.

---

## 9. C2 Communication, SignalR Hubs & SQLite Catalog

### 1. Real-Time SignalR Hubs
- **`AgentHub` (`/hubs/agent`)**:
  - `RegisterAgentAsync(AgentRegistrationDto)`
  - `HeartbeatAsync(AgentHeartbeatDto)`
  - `ReportMetricsAsync(AgentMetricsDto)`
  - `PushKeystrokeBatchAsync(KeystrokeBatchDto)`
- **`DashboardHub` (`/hubs/dashboard`)**:
  - Broadcasts live station status, CPU/GPU telemetry, storage pool health, and active alerts.

### 2. SQLite Metadata Catalog
- Located at: `ITB-SCREEN-RECORDER.Server/Data/catalog.db`.
- Operates strictly in **WAL (Write-Ahead Logging)** mode (`PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL;`).
- Manages indexed recordings, stations, active roles, and custom operational dashboard tabs.

---

## 10. ClientApp Frontend Architecture & Design System

Built on **React 18 + Vite + SCSS**:
- **Design Tokens**: Standard tactical dark NOC palette:
  - App Background: `--bg-app: #070A10`
  - Panel Surfaces: `--surface-panel: #0F172A`, `--surface-card: #151E2E`
  - Accents: `--accent-cyan: #06B6D4`, `--accent-emerald: #10B981` (Live/Nominal), `--accent-rose: #F43F5E` (Alert), `--accent-amber: #F59E0B` (Fallback)
- **Virtualization**: Off-screen station video streams are automatically unmounted via Intersection Observer to eliminate browser hardware decoder exhaustion.

---

## 11. Air-Gapped & Offline Environment Invariants

> [!CAUTION]
> **Rule 14 Enforcement**: Under no circumstances may any component make calls to the public internet, load CDN assets, or query external APIs.

1. **Fonts & Assets**: All fonts (`Inter`, `JetBrains Mono`) are bundled locally as static assets.
2. **Scripts & Styles**: Zero remote `<script>` or `<link>` tags (no `unpkg`, `cdnjs`, `jsdelivr`).
3. **NPM & NuGet**: Packages are pre-cached and committed or sourced from internal mirror feeds.
4. **Network Subnets**: All communications target private operational ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `128.x.x.x`, `.local`, `.internal`).

---

## 12. Developer Playbook: Build, Debug & Test Workflows

### 1. Building the Backend (.NET 8)
```powershell
# Set sandboxed dotnet home if building inside restricted environments
$env:DOTNET_CLI_HOME = "$pwd\.tmp_dotnet"
dotnet build ITB-Screen-Recorder.sln --no-restore -nodeReuse:false
```

### 2. Running Unit & Integration Tests
```powershell
dotnet test ITB-SCREEN-RECORDER.Tests/ITB-SCREEN-RECORDER.Tests.csproj --no-restore -nodeReuse:false
```

### 3. Frontend Development & Linting
```bash
cd ITB-SCREEN-RECORDER.Server/ClientApp
npm install
npm run lint      # Must return 0 errors and 0 warnings
npm run build     # Compiles production bundle to wwwroot
```

### 4. Running the Complete System Locally for Debugging
1. **Start MediaMTX**: Run `ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.exe`.
2. **Start Server**: Launch `ITB-SCREEN-RECORDER.Server` (port `5000` / `5001`).
3. **Run Worker Standalone (Development Mode)**:
   ```powershell
   cd ITB-SCREEN-RECORDER.AgentWorker
   dotnet run -- --standalone --server http://localhost:5000
   ```
4. **Open Dashboard**: Navigate to `http://localhost:5000` in Google Chrome or Microsoft Edge.

---
*End of System Book — ITB-SCREEN-RECORDER Architecture Team*
