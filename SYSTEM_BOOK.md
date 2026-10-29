# 📘 ITB-SCREEN-RECORDER — Comprehensive System Book & Developer Architecture Guide
> **Classification**: Enterprise Air-Gapped Operational Platform  
> **Target Audience**: Core Developers, Systems Engineers, DevOps & Security Architects  
> **Last Updated**: 2026-10-28  
> **Current Version**: v1.0.45  
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
13. [Enterprise Forensic Log Diagnostic & RCA Tool (itb-diagnostics)](#13-enterprise-forensic-log-diagnostic--rca-tool-itb-diagnostics)
14. [Enterprise UI/UX Modernization, Fleet Intercom & Advanced Resilience Updates](#14-enterprise-uiux-modernization-fleet-intercom--advanced-resilience-updates-2026-10-28)
15. [Multi-Screen Studio Editing, Director Track Overrides, Server Folder Browser, 1-Hour Stream Drop Immunity & AD SSO](#15-multi-screen-studio-editing-director-track-overrides-server-folder-browser-1-hour-stream-drop-immunity--ad-sso-2026-10-28)
16. [Multi-Monitor Adaptive Video Export Engine (PiP, Split Screen, Auto-Director & Solo Display)](#16-multi-monitor-adaptive-video-export-engine-pip-split-screen-auto-director--solo-display-2026-10-28)
17. [Tactical C2 Bulk Recording Iconography & Ergonomic Inversion](#17-tactical-c2-bulk-recording-iconography--ergonomic-inversion-2026-10-28)
18. [Multi-Monitor Mouse Pointer & Interaction Isolation Engine](#18-multi-monitor-mouse-pointer--interaction-isolation-engine-2026-10-28)
19. [Zero-Black-Screen Persistent Player, Multi-Station Audio Listening & Studio Forensic Canvas Layout](#19-zero-black-screen-persistent-player-multi-station-audio-listening--studio-forensic-canvas-layout-2026-10-28)

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
│  │  Tactical C2 Dashboard │    │MediaMTX (v1.15.4 Pinned) │───►│ NetApp Storage UNC │  │
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
│  │ 🛡️ AgentService (Session 0 Service)    │    │ 🎥 AgentWorker (Session 1+ GUI)   │  │
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
3. **Serialized Channel-Based Single-Writer Pattern**:
   - In [`AgentSupervisorService.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentService/AgentSupervisorService.cs), duplex NamedPipe writes are decoupled from callers via a bounded `Channel<string> _workerCommandChannel`.
   - A dedicated single-writer background task drains this channel sequentially, strictly guaranteeing that concurrent `WriteLineAsync` calls (such as simultaneous telemetry acknowledgments and C2 `Start`/`SetRecording` commands) never collide on the underlying stream. This eliminates `InvalidOperationException: The stream is currently in use by a previous operation on the stream`.
4. **Silent Background Worker Execution (Zero Window Flashing & Focus Stealing)**:
   - `ITB-SCREEN-RECORDER.AgentWorker` is compiled with `<OutputType>WinExe</OutputType>` on Windows, marking its PE subsystem as `IMAGE_SUBSYSTEM_WINDOWS_GUI` to prevent the Windows kernel from attaching a default console window.
   - When spawned into Session 1 by [`InteractiveProcessLauncher.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentService/Infrastructure/InteractiveProcessLauncher.cs), `CreateProcessAsUserW` sets `STARTF_USESHOWWINDOW` with `SW_HIDE` in `STARTUPINFO` and combines `CREATE_UNICODE_ENVIRONMENT | CREATE_NO_WINDOW` in creation flags.
   - This ensures 100% silent background execution: the workstation user never sees a black console window popping up or stealing desktop focus during process launch, watchdog recovery, or workstation login.

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

> [!IMPORTANT]
> **Audio Codec Invariant for RTMP Ingest**: When muxing live feeds into -f flv for MediaMTX RTMP/RTMPS ingest, audio **must** be encoded using -c:a aac (MPEG-4 Audio). Formats such as libopus are unsupported by the FLV container specification; attempting to use libopus with -f flv causes native FFmpeg initialization failure (exit code -22: Invalid argument).

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
- **Deterministic Display Index Sorting ([`DxgiDisplayEnumerator.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker/Providers/Video/DxgiDisplayEnumerator.cs))**: Enumerated displays are sorted so that the physical Windows primary display (virtual coordinates `X=0, Y=0`) is deterministically indexed as `mon-0`, ensuring it is always the initial audio carrier, while secondary displays are sequentially assigned `mon-1`, `mon-2`, etc.
- Stream paths:
  - Primary Display + Audio: `live/{hostname}/mon-0`
  - Secondary Displays (Video only): `live/{hostname}/mon-1`, `live/{hostname}/mon-2`, etc.
  - Legacy Single-Monitor Path: `live/{hostname}`
- **WHEP Reverse Proxy & Stream Path Fallback ([`WhepProxyController.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Controllers/WhepProxyController.cs))**:
  - Exposes an air-gapped reverse proxy endpoint `/api/v1/whep/{*streamPath}` routing WebRTC SDP exchanges to MediaMTX.
  - Automatically handles stream path aliases: if a client requests `live/{hostname}/mon-0` and MediaMTX returns 404 (e.g. older single-monitor agent streaming to root), it seamlessly falls back to `live/{hostname}`. Conversely, if `live/{hostname}` returns 404, it queries `live/{hostname}/mon-0`.
  - Air-Gapped WebRTC configuration: Client players connect via `/api/v1/whep` with empty ICE server lists (`iceServers: []`), eliminating external STUN lookups and cross-origin localhost connection failures.
- **Dynamic Hot-Plug, Audio Carrier Failover & Anti-Flipflop Governor (Rule 11)**:
  - Display connect/disconnect events spawn or cleanly terminate individual display pipelines without interrupting active recording on surviving displays.
  - **Immediate Failover on Carrier Disconnect**: If the primary monitor carrying audio (`mon-0`) disconnects during streaming, [`MultiDisplayPipelineManager`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker/Engine/MultiDisplayPipelineManager.cs) detects that the audio carrier is lost, promotes the first surviving display (e.g. `mon-1`) to become the active Primary Audio Carrier, and re-engages its pipeline with `audioChannels: 2`. The dynamic audio writer and [`AudioPacer`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker/Engine/AudioPacer.cs) immediately route live audio packets to the promoted carrier within <800ms, ensuring zero loss of sound during recording.
  - **Anti-Flipflop 60s Stabilization Buffer on Reconnect**: When `mon-0` reconnects or flaps (loose HDMI/DP cable, graphics driver reset), it engages video capture immediately (`audioChannels: 0`) so the workstation's display recording is complete without delay. However, to prevent stream thrashing and audible glitches, audio remains on the surviving carrier (`mon-1`) until `mon-0` has been continuously, stably present for **a full 60 seconds** (`AudioCarrierHysteresisSeconds`).
  - **Flap Abort Resilience**: If `mon-0` disconnects at any point before the 60-second window completes, the stabilization timer aborts and resets to `null`, while the surviving carrier continues streaming audio uninterrupted.
  - **Graceful Handover**: After 60 seconds of uninterrupted stability, the governor smoothly promotes `mon-0` to `audioChannels: 2` and demotes `mon-1` to video-only (`audioChannels: 0`), triggering `AudioCarrierChanged`.
  - **System-Wide Audio Awareness**:
    - [`StationDisplayTopologyDto.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Core/Contracts/Topology/StationDisplayTopologyDto.cs) carries `AudioCarrierDisplayId` (e.g. `"mon-0"` or `"mon-1"`) and per-display `HasAudio` booleans.
    - [`RecordingChunkScheduler.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Services/RecordingChunkScheduler.cs) inspects `display.HasAudio` and `agent.DisplayTopology.AudioCarrierDisplayId` dynamically rather than hardcoding `mon-0`, ensuring recording chunk metadata accurately reflects the actual audio stream.

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
- **Seamless Live Stream Preservation & Grayscale-to-Color Transition**: Because workstations stream continuous RTMP/WebRTC regardless of recording status, toggling between Live Monitor (`MONITOR`) and Recording (`REC`) does NOT unmount or reload the stream (zero black screen, zero loading matte). The WebRTC peer connection remains uninterrupted, and the video element executes a smooth CSS filter animation between tactical monochrome (`grayscale(100%)`) and full color (`grayscale(0%)`).
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

### 3. Keystroke Telemetry Sync, Ingestion Latency Calibration & Timeline Ruler
- **Ingestion Pipeline Latency Compensation (`KEYSTROKE_CALIBRATION_OFFSET_MS = 2500`)**:
  - Endpoint keyboard events captured by low-level hooks ([`WindowsKeyboardCaptureProvider`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker/Providers/Keyboard/WindowsKeyboardCaptureProvider.cs)) are timestamped at the physical keypress instant.
  - Video frames captured by DXGI undergo hardware encoding, RTMP packetization, and MediaMTX storage chunk writing, introducing an end-to-end ingestion latency of ~2.5s before chunks are indexed on disk.
  - Studio video playback overlays ([`KeystrokePlaybackOverlay.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/Player/KeystrokePlaybackOverlay.jsx)) and timeline ruler tick markers ([`TimelineKeystrokes.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/Timeline/header/TimelineKeystrokes.jsx)) apply `KEYSTROKE_CALIBRATION_OFFSET_MS` (+2500ms) to ensure tactical keycaps and ruler ticks match the exact visual moment in the video.
- **Physical Hostname & Role Alias Invariant**:
  - Keystroke queries in [`ExtractorAdvancedController.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Controllers/ExtractorAdvancedController.cs) automatically resolve station role aliases (e.g. `AWS Commander` ➔ `PROJECT-LAPTOP`) against `_stationRoleProvider`, ensuring database queries never return empty results when queried by operational alias.
  - [`TimelineBoard.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/Timeline/TimelineBoard.jsx) and [`TimelineRuler.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/Timeline/header/TimelineRuler.jsx) forward physical `stationHostname` alongside active display names and pass `keystrokes` down the component tree to guarantee reliable tick mark rendering when `+ RULER TICKS: ON` is active.

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

### 3. Fleet Station Identity & Operational Role Aliases (Uniqueness & Multi-View Rendering)
- **Operational Purpose**: Maps physical endpoint hostnames (e.g. `PROJECT-LAPTOP`) to human-readable operational system names (e.g. `AWS Commander`).
- **Strict Case-Insensitive Uniqueness (1-to-1 Mapping)**:
  - **Backend Validation ([`StationRolesService.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Services/StationRolesService.cs))**: `SetRoleAliasAsync` and `ApplyMappingAsync` validate that no two stations share the same role alias (`StringComparison.OrdinalIgnoreCase`). Duplicate aliases are rejected with HTTP 400 Bad Request.
  - **Comprehensive Fleet CSV Export & Default Alias Fallback**: `ExportMappingCsvAsync` aggregates all workstations known to the system (from SQLite `station_nodes`, `recording_chunks`, `station_overrides`, and active telemetry agents via `ITelemetryStateService`). Stations without an assigned alias are exported as `Default`. During CSV upload/import, `Default` (case-insensitive) is automatically normalized to `null` (unassigned), completely avoiding false collision conflicts across unaliased fleet endpoints.
  - **CSV Bulk Import & Collision Prevention**: `PreviewCsvMappingAsync` inspects batch mappings against both existing SQLite records and internal CSV rows, flagging colliding stations (`conflictWith`) and disabling the "Apply Mappings to Fleet" action until collisions are resolved.
  - **Live Client-Side Collision Guard**: `StationsRolesTab.jsx` detects duplicate alias inputs in real-time, displaying a collision warning and disabling the Save button.
  - **Atomic Cross-Swap (הצלבת שמות עמדות)**:
    - Allows operators to exchange operational names between two workstations in a single atomic action (`POST /api/v1/stations/roles/swap`).
    - Handled in [`CatalogRepository.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Data/Repositories/CatalogRepository.cs) within an atomic SQLite transaction, circumventing unique constraint collisions without requiring temporary placeholder renames.
    - Interactive UI modal in `StationsRolesTab.jsx` provides two-station selection, swap inversion toggle (`⇄`), live outcome preview, and one-click execution accessible from either the tab toolbar or per-station row actions.
- **End-to-End System-Wide Representation**:
  - **Tactical C2 Dashboard**:
    - Station Cards ([`StationThumbnail.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Station/StationThumbnail.jsx)): Header displays the operational alias as primary title with a small physical hostname badge (`.station-host-badge`).
    - Inspection Drawer ([`StationInspectorDrawer.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Station/StationInspectorDrawer.jsx)): Primary title shows operational alias alongside `HOST: {hostname}` pill badge.
    - Master Audio Dock ([`MasterAudioDock.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Station/MasterAudioDock.jsx)): Displays operational alias next to live VU meters.
    - Dense Fleet View ([`StationsDenseView.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Dashboard/StationsDenseView.jsx)): Renders primary operational title with physical host in brackets.
    - Search & Sorting ([`useDashboardLogic.js`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Dashboard/useDashboardLogic.js)): Fleet search query matches physical hostname, IP, and operational alias; sorting prioritizes operational alias.
  - **Forensic Studio & Replay ([`ExtractorAdvanced`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced)):
    - Integrated across backend and frontend via [`IStationRoleProvider`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Core/Contracts/Network/StationRoleContracts.cs).
    - Multicam Timeline ([`TimelineTrack.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/Timeline/tracks/TimelineTrack.jsx)): Displays operational alias in track headers with physical host sublabel.
    - Card Grid & Video Viewport ([`CameraCard.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/Viewport/views/Card/CameraCard.jsx)): Renders operational title with physical machine badge.
    - Cinema Inspection ([`SoloSpotlightModal.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/Modals/SoloSpotlightModal.jsx)): Top brand pill displays operational name and physical machine badge.
    - Station Drawer & Replay Hub ([`StationDrawerRow.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/StationDrawer/views/Drawer/StationDrawerRow.jsx), [`StationHubCard.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/StationDrawer/views/Hub/StationHubCard.jsx), [`StationHubTableRow.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/StationDrawer/views/Hub/StationHubTableRow.jsx)): Displays operational alias with physical host badge/sublabel.
    - Station Context Menu ([`StationContextMenu.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src/components/Modals/StationContextMenu.jsx)): Header shows operational alias with `HOST: {hostname}` in subtext.

---

## 10. ClientApp Frontend Architecture & Design System

Built on **React 18 + Vite + SCSS**:
- **Design Tokens**: Standard tactical dark NOC palette:
  - App Background: `--bg-app: #070A10`
  - Panel Surfaces: `--surface-panel: #0F172A`, `--surface-card: #151E2E`
  - Accents: `--accent-cyan: #06B6D4`, `--accent-emerald: #10B981` (Live/Nominal), `--accent-rose: #F43F5E` (Alert), `--accent-amber: #F59E0B` (Fallback)
- **Virtualization**: Off-screen station video streams are automatically unmounted via Intersection Observer to eliminate browser hardware decoder exhaustion.
- **Continuous Quality & Linting**: ESLint and unit test validation (`npm run lint`, `npm test`) are strictly integrated into MSBuild (`CompileFrontend` in `ITB-SCREEN-RECORDER.Server.csproj`) and GitHub Actions CI (`frontend-lint.yml`, `node.js.yml`), preventing unlinted code from compiling or merging.

### 1. Station Inspection Drawer & Verified Operations Protocol
The station inspector drawer ([`StationInspectorDrawer.jsx`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Station/StationInspectorDrawer.jsx)) serves as the primary tactical C2 hub for individual endpoints. All operations presented to the operator strictly represent verified, functional capabilities without phantom buttons or placeholder stubs:
- **Stream Lifecycle Control**:
  - `START RECORDING STREAM` / `STOP STREAM` directly invokes the agent control pipeline (`/api/agents/{hostname}/start` / `stop`).
  - Stopping an active stream requires explicit two-step confirmation with a 4-second safety timeout to avoid accidental interruption of operational recordings.
- **Theater Fullscreen Mode**:
  - Launches real-time cinema monitoring via WebRTC WHEP / LL-HLS with dynamic PIP minimap navigation for multi-monitor topologies.
- **Extract Recording Clip**:
  - Activates the forensic clip slicer engine (`extractor-slicer`) focused on the target station for instant synchronized timeline extraction.
- **Radio Audio Intercom (Solo Sink)**:
  - Connects directly to [`AudioSoloContext`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/context/AudioSoloContext.jsx) implementing Rule 12's single-station solo audio invariant.
  - Dynamically indicates live listening status (`LISTEN LIVE` / `MUTE AUDIO`) with live visual cues when routed to the operator's headset.
- **Recording Alert Snooze**:
  - Integrated with [`useAlertSnooze`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/hooks/useAlertSnooze.js).
  - Allows operators to postpone offline or unrecorded alerts for 30 minutes or 1 hour, or immediately resume alerts with live remaining countdowns.

---

## 11. Air-Gapped & Offline Environment Invariants

> [!CAUTION]
> **Rule 14 Enforcement**: Under no circumstances may any component make calls to the public internet, load CDN assets, or query external APIs.

1. **Fonts & Assets**: All fonts (`Inter`, `JetBrains Mono`) are bundled locally as static assets.
2. **Scripts & Styles**: Zero remote `<script>` or `<link>` tags (no `unpkg`, `cdnjs`, `jsdelivr`).
3. **NPM & NuGet**: Packages are pre-cached and committed or sourced from internal mirror feeds.
4. **Network Subnets**: All communications target private operational ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `128.x.x.x`, `.local`, `.internal`).
5. **Zero External Socket Probes**: Hardware diagnostics and network adapters are enumerated exclusively via local OS APIs (`NetworkInterface.GetAllNetworkInterfaces()`). Outbound socket connections to public IPs (such as `8.8.8.8`) are strictly prohibited and eliminated.

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

## 13. Enterprise Forensic Log Diagnostic & RCA Tool (itb-diagnostics)

To enable rapid field triaging without manual log parsing, the platform provides a dedicated standalone forensic diagnostic CLI tool located in [`Tools/ITB-SCREEN-RECORDER.Diagnostics`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Tools/ITB-SCREEN-RECORDER.Diagnostics).

### Key Capabilities:
- **True Cross-Platform (Windows & Linux)**:
  - Windows: Single-file executable `itb-diagnostics.exe` (`Publish/Diagnostics/win-x64/`).
  - Linux: Native single-file ELF binary `itb-diagnostics` (`Publish/Diagnostics/linux-x64/`).
  - Automatically identifies local OS and scans default installation paths (`C:\ProgramData\ITB-SCREEN-RECORDER\Logs` on Windows, `/var/log/itb-server` and `/opt/itb-screenrecorder-server/logs` on Linux).
- **Bundled Directly With Server Installations**:
  - **Windows Server MSI**: Packed directly into `C:\Program Files\ITB-ScreenRecorder-Server\Tools\itb-diagnostics.exe` via WiX v4 installer (`ITB-SCREEN-RECORDER.Server.Installer`).
  - **Linux Server Package**: Deployed into `/opt/itb-screenrecorder-server/Tools/itb-diagnostics` via the native `.run` payload installer, with execution permissions (`chmod +x`) automatically applied.
  - **Server Build Pipeline**: Whenever `ITB-SCREEN-RECORDER.Server` is built or published, the single-file diagnostic binary is automatically bundled into its `Tools/` directory.
- **Automated Rule Engine & Pattern Correlation**:
  - `INCIDENT-001`: Correlates fleet-wide post-reboot crash loops where IPC contention prevents worker command receipt and triggers watchdog 30-second restart cascades.
  - `IPC-001` / `IPC-002`: Flags NamedPipe stream concurrency collisions and broken pipe / disposed TextWriter warnings.
  - `WDOG-001`: Detects worker `LaunchTimeout` / heartbeat watchdog process kills.
  - `AIRGAP-001`: Flags outbound public IP socket probes violating Rule 14.
  - `NET-001`: Identifies autonomous server discovery timeouts and blocked UDP 5098 broadcast ports.
  - `CLOCK-001`: Detects domain time drift exceeding 500ms.
  - `STREAM-001`: Pinpoints WebRTC WHEP 404 responses caused by inactive RTMP publication.
  - `LNX-001` / `LNX-002`: Detects Linux systemd service exits and X11/PipeWire display server acquisition errors.
- **Usage**:
  ```powershell
  # Windows:
  .\Tools\itb-diagnostics.exe "C:\ProgramData\ITB-SCREEN-RECORDER\Logs"
  
  # Linux:
  /opt/itb-screenrecorder-server/Tools/itb-diagnostics /var/log/itb-server
  
  # Interactive mode (drag-and-drop or auto-scan default directories):
  .\itb-diagnostics.exe
  ```
- **Exportable Reports**: Automatically saves full forensic summary text files (`ITB_Diagnostic_Report_<timestamp>.txt`) alongside the terminal output.

---
---

## 14. Enterprise UI/UX Modernization, Fleet Intercom & Advanced Resilience Updates (2026-10-28)

To address real-world deployment feedback across 70–100+ dense workstations, the following enterprise architecture enhancements and invariants were integrated:

### 1. Multi-Device WASAPI Intercom & Dual Audio Mixer (WasapiDualMixer.cs)
- **Universal Render Enumeration**: Rather than binding only to the OS default multimedia endpoint, WasapiDualMixer now enumerates all active audio render endpoints (DataFlow.Render, DeviceState.Active). Any audio played through speakers, headsets, or monitor HDMI/DP audio channels is dynamically captured and mixed into the master AAC stream.
- **Microsecond Audio Pacing**: Replaced jittery Task.Delay with high-precision Stopwatch timing producing exact 50 frames/sec (20ms) at 48000 Hz, strictly preventing RTMP timestamp drift.
- **Pacer Watchdog Grace Threshold**: Relaxed synthetic silence watchdog to 500ms to allow smooth audio pipeline startup without packet contention.

### 2. Multi-Monitor Topology & Screen Collision Elimination
- **Collision-Free HUD**: Repositioned .monitor-only-overlay to center-top (left: 50%; transform: translateX(-50%)), completely freeing the top-left for .solo-display-badge and multi-monitor resolution pills (.sub-display-overlay).
- **Stable Header Metrics**: Removed wide text snooze buttons from card-minimal-header. Workstation hostname, physical alias, and IP address now retain dedicated fixed horizontal layout space without truncation or wrapping.
- **Symmetrical 100% Equal Card Heights**: Card header (44px), viewport (16:9), and footer (24px) are locked to identical pixel heights across the entire fleet grid. The footer reserves inline slots for dropped frames warnings and 3px health scores.

### 3. Debounced Audio State & 3-Tier Fault Detection
- **Hysteresis Smoothing**: Integrated a 3.5-second debounce buffer on audio presence telemetry to eliminate rapid green/grey flickering caused by network polling bursts.
- **3-Tier Health States**:
  - ctive (Emerald): Real-time audio stream flowing smoothly.
  - ault (Amber): Workstation audio hardware (speakers/mic) present and configured, but audio stream packets are stalled or absent.
  - muted (Slate): Workstation has no audio devices or is operating in silent mode.

### 4. Storage Quota Clamping & Physical NetApp Enforcement
- Max storage quota in settings is dynamically clamped to the total physical capacity of the active NetApp pool (liveStorage.totalSizeBytes), preventing operators from setting quotas beyond actual disk boundaries.

### 5. System Overview & Health Launchpad (SystemOverviewTab.jsx)
- Introduced as the primary first tab in the Settings view:
  - Real-time fleet health score, online, recording, monitor-only, and frame-drop counters.
  - Interactive Fleet Operational Status Distribution breakdown bar (Recording, Standby, Drops Alert, and Offline ratios).
  - Real-time tactical SVG telemetry charts with zero external CDN dependencies:
    - Server CPU Utilization (Host CPU % vs Server Process CPU % curves with live gradient area fill).
    - Server RAM Allocation & Process Heap (App Process Memory in MB).
    - Network Bandwidth Throughput (NIC Rx Ingest vs Tx WHEP in Mbps).
    - Fleet Capture Stability (average captured FPS across active fleet and dropped frame indicators).
  - Active storage pool capacity visualization (NetApp Primary vs Local NVMe Fallback) and MediaMTX stream engine status.
  - 1-click tactical square navigation cards directly launching the C2 Monitoring Grid, Storage settings, Station overrides, Roles, Agent defaults, Security, and Diagnostics.

### 6. Indefinite Alert Postponement (∞ Forever)
- SnoozeAlertModal and useAlertSnooze now support an indefinite ∞ Forever option (until: 253402300799000), persisting snooze state across sessions and displaying ⏱ SNOOZED (FOREVER).

### 7. Active Directory Real OU Integration & Zero-Coverage Filtering
- **Real AD Tree Query**: TabConfigModal removes hardcoded placeholder strings and only enables OU-based grouping when LDAP/AD is verified active, fetching live organizational units directly from /api/v1/settings/security/ad/tree.
- **Forensic Studio Pruning**: Stations with 0% recording coverage within the selected debriefing time range are automatically filtered out from StationDrawer and studio hubs.

### 8. Viewport-Adaptive Fleet Pagination
- Dense list view and settings configuration tables (Station Overrides & Roles) calculate rows dynamically based on available viewport height, eliminating vertical scrolling and docking pagination controls cleanly at the bottom.
- Consolidated the postponed stations banner into an interactive count summary with dedicated [ 🔍 View Postponed Stations ] and [ ✕ Return to All Stations ] filter toggles.

---

## 15. Multi-Screen Studio Editing, Director Track Overrides, Server Folder Browser, 1-Hour Stream Drop Immunity & AD SSO (2026-10-28)

### 1. Multi-Screen Studio Editing & Auto-Director Track (ExtractorAdvanced)
- **Per-Display Forensic Extraction**: `AdvancedExtractorService.cs` accepts `displayId` parameter (`mon-0`, `mon-1`, etc.) for sub-millisecond accurate frame extraction (`ExtractFrameAsync`) with quantized multi-monitor cache keys (`frame_{hostname}_{cleanDisplay}_{quantEpoch}`).
- **Auto-Director Track with Live Orientation**: `DirectorTrack.jsx` renders directly beneath the video health bar, visualizing active display intervals. The track dynamically displays an orientation badge (`⚡ MON-0 (AUTO)` vs `✋ MON-1 (OVERRIDE)`), clearly indicating which monitor is active at the playhead position.
- **Interactive Cut & Override**: Operators can split segments at the playhead (via `✂️ Split` button or hotkey `S`), assign monitor overrides, or reset segments back to automatic activity-based routing.
- **Multi-Monitor Studio View Modes**: `StudioVideoFeed.jsx` introduces a tactical view switcher:
  - **🎬 DIRECTOR**: Plays the director cut following automatic or overridden display sequences.
  - **🔲 SPLIT**: Displays dual side-by-side synchronized monitors for simultaneous multi-screen analysis.
  - **🪟 PiP**: Renders secondary monitors inside a floating picture-in-picture viewport with 1-click screen swap.
  - **🖥️ Monitor Pins**: Locks playback exclusively to a specific monitor (`mon-0`, `mon-1`).

### 2. Server Directory Browse & Safe Path Navigator
- **Secure FileSystem Exploration**: `/api/v1/settings/browse-directories` enumerates logical system drives (`C:\`, `D:\`, etc.) and allows navigating server-side directories safely without manual typing.
- **Directory Creation**: `/api/v1/settings/create-directory` enables creating new storage folders directly from the dashboard.
- **Tactical Browse Modal**: `FolderBrowseModal.jsx` provides a portal-rendered file explorer for NetApp UNC paths, local fallback storage, and chunk event logs.

### 3. Root Cause Resolution for 1-Hour Continuous Stream Drops
- **Windows Power Manager Display Sleep Defeated**: Windows default power scheme triggers display sleep after 60 minutes of inactivity (`VIDEO_TIMEOUT`), causing DXGI DDA `DXGI_ERROR_ACCESS_LOST` and GDI black frames. `WorkerEngine.cs` now invokes Win32 `SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED)` during active capture sessions, refreshing every 60 seconds to guarantee displays remain awake indefinitely.
- **Resilient WebRTC Reconnection**: `WebRTCPlayer.jsx` replaces the rigid 5-retry cutoff with an infinite smart reconnection scheduler (fast retry followed by steady 6s cadence) and a 3.5-second frame stall watchdog that triggers silent renegotiation if playback freezes.

### 4. Modal Viewport Trapping Elimination via React Portals
- **Ancestor Transform Isolation**: Fixed CSS `transform: translateY(...)` inside `fullPageFadeIn` animation in `SettingsView.scss`, which previously caused child `position: fixed` elements to treat the scrolled canvas as their containing block.
- **Root DOM Portaling**: All settings modals (`FolderBrowseModal`, `AdTreeBrowserModal`, `SecurityAccessTab` role and user modals, and `StationsRolesTab` modals) are rendered directly into `document.body` via `ReactDOM.createPortal`, guaranteeing permanent center-screen viewport alignment regardless of scroll depth.

### 5. Windows Integrated Authentication & Silent Active Directory SSO
- **Zero-Prompt SSO Handshake**: `/api/v1/auth/windows-sso` detects Windows domain identity (`User.Identity?.Name` via Negotiate / Kerberos / NTLM or `X-Remote-User` reverse-proxy headers).
- **Service Account Group Resolution**: `LdapAuthenticationProvider.AuthenticateSsoUserAsync` authenticates the domain user against Active Directory, queries their `memberOf` LDAP group hierarchy, maps their operational roles, and generates a signed JWT token.
- **Silent Dashboard Ingress**: `AuthContext.jsx` issues a silent SSO probe upon application load (`credentials: 'include'`). If the domain user is recognized, they are logged in automatically without prompting for credentials.

---

## 16. Multi-Monitor Adaptive Video Export Engine (PiP, Split Screen, Auto-Director & Solo Display) (2026-10-28)

### 1. Unified Studio-to-Export WYSIWYG Parity (Rule 13)
- **Problem Solved**: Multi-monitor stations previously defaulted to only exporting `mon-0` (the primary display), discarding the operator's active view choice in the Extractor Studio.
- **Adaptive Render Pipeline**: The export engine in `SynchronizedTrackCutter.cs` now strictly adapts the rendered output video to match the layout chosen in the editing studio:
  - **🪟 Picture-in-Picture (PiP)**: Multi-input FFmpeg pipeline (`[0:v]` and `[1:v]`). The Hero display is scaled to 1920x1080 (preserving aspect ratio with letterboxing), while the secondary display is scaled to 576x324 (30% scale), framed with a 2px tactical cyan border (`#06B6D4`), and positioned in the bottom-right corner (`W-w-24:H-h-24`). Respects 1-click primary/secondary display swap (`isPipSwapped`).
  - **🔲 Split Screen (Side-by-Side)**: Scales both monitors to 960x1080 each (preserving native aspect ratios with centering pads) and joins them via `hstack=inputs=2` with a 2px dark-slate tactical divider (`#1E293B`), outputting a pristine 1920x1080 dual-screen MP4.
  - **🎬 Auto-Director Cut**: Slices between displays according to the Auto-Director schedule or operator manual overrides, applying smooth zero-time-drift 0.3s dip-to-black fade transitions.
  - **🖥️ Solo Display Pin**: Explicitly renders a single monitor (`mon-0` or `mon-1`), automatically bridging primary audio from `mon-0` even when exporting a silent secondary display.

### 2. Dual-Track Clock Synchronization & Gap Compensation
- When generating multi-display exports, both displays are processed against the master `plan.ActiveSegments`.
- If an individual monitor experienced a temporary capture interruption or delayed initialization, `AppendDummyGapAsync` automatically inserts a mathematical "No Signal" slate into that specific monitor's manifest. This guarantees that both display streams remain 100% time-synchronized down to the millisecond without drift.

### 3. End-to-End Contract Propagation
- `ExtractionRequestDto`, `SynchronizationPlan`, `AdvanceCutRequestDto`, and `AdvanceJobInfo` now propagate `LayoutMode`, `TargetDisplayId`, `IsPipSwapped`, and `DirectorSegments`.
- `SoloSpotlightModal.jsx` and `ExtractorAdvancedStudio.jsx` synchronize their active view mode and swap states directly into the export payloads, providing live visual feedback on the `[EXPORT CUT (MODE)]` action button.

---

## 17. Tactical C2 Bulk Recording Iconography & Ergonomic Inversion (2026-10-28)

### 1. Tactical Bulk Recording Controls & Operational Semantics
- **Ergonomic Inversion to Standard C2 Operations**:
  - **Bulk Start Recording (`tactical-btn-start`)**:
    - **Visual Styling**: Rendered in tactical red (`color: var(--accent-rose, #EF4444); background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.45);`). On hover, illuminates into solid red (`#EF4444`) with a glowing halo (`0 0 12px rgba(239, 68, 68, 0.6)`).
    - **Iconography**: Outer rounded stroke square enclosing a centered solid circle (`<rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="2.2" />` + `<circle cx="12" cy="12" r="4.5" fill="currentColor" />`), reflecting standard tactical broadcast recording indicators.
  - **Bulk Stop Recording (`tactical-btn-stop`)**:
    - **Visual Styling**: Rendered in operational standby emerald green (`color: var(--accent-emerald-light, #34D399); background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.45);`). On hover, illuminates into solid emerald (`#10B981`) with dark text and green glow (`var(--glow-green)`).
    - **Iconography**: Solid square (`<rect x="5.5" y="5.5" width="13" height="13" rx="2" fill="currentColor" />`), indicating standby/stop state.
- **Component File Mapping**:
  - `ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Dashboard/DashboardDock.jsx`
  - `ITB-SCREEN-RECORDER.Server/ClientApp/src/components/Dashboard/DashboardDock.scss`

---

## 18. Multi-Monitor Mouse Pointer & Interaction Isolation Engine (2026-10-28)

### 1. Root Causes Resolved in Multi-Monitor Capture
- **GDI Concurrency Contention Defeated**: Parallel video pipelines (e.g. `mon-0` and `mon-1`) running on concurrent pacer threads previously collided on shared static cursor pixel buffers and `LockBits` operations on `_cursorBmp` (`Bitmap region is already locked`), causing mouse overlay rendering to abort. Synchronized with internal re-entrant thread locks (`_renderLock`).
- **Global Virtual Desktop Coordinate Mismatch**: Win32 `GetCursorInfo`, `GetCursorPos`, and `MSLLHOOKSTRUCT` coordinates span the entire multi-monitor virtual desktop (e.g. `X: 0..5360`). Display pipelines previously operated on origin `(0, 0)`. Secondary monitors whose global $X$ exceeded their local resolution (e.g. $X=4521$ on a 1920-wide monitor) dropped all cursor rasterization pixels as out-of-bounds, rendering the pointer completely invisible.
- **Cross-Monitor Ghost Interaction Ripples**: Mouse clicks executed on the primary monitor (`mon-0`) were inadvertently rasterized at matching local coordinates on secondary monitors (`mon-1`) or clamped to monitor borders, creating phantom click ripples.

### 2. Multi-Display Viewport Translation & Strict Isolation Pipeline
- **Coordinate Offset Propagation**:
  - `MultiDisplayPipelineManager` passes monitor geometry (`desc.X`, `desc.Y`) into `VideoPipeline`.
  - `VideoPipeline` provides `screenOffsetX` and `screenOffsetY` directly to `MouseCursorOverlay.DrawMouseToFrame`.
  - `IMouseOverlayProvider`, `WindowsMouseOverlay`, and `LinuxMouseOverlay` translate pointers:
    $$\text{localX} = \text{cursorPosX} - \text{screenOffsetX}, \quad \text{localY} = \text{cursorPosY} - \text{screenOffsetY}$$
  - A fast boundary check immediately skips cursor rasterization if the pointer does not intersect the target display's active surface:
    $$\text{localX} \in [-128, \text{width} + 128], \quad \text{localY} \in [-128, \text{height} + 128]$$
- **Interaction Ring & Badge Isolation**:
  - `MouseVisualRasterizer.RenderRingsAndScroll`: Translates shockwave ripple and scroll arrow events by display offsets; events occurring outside the display viewport (with a 64px ripple boundary) are discarded from that display's stream.
  - `MouseVisualRasterizer.RenderClickBadges`: Strictly verifies monitor containment without cross-monitor clamping, ensuring click indicators illuminate only on the physical display where the user action occurred.
- **Color Cursor Fidelity & Transparency Recovery**:
  - `WindowsMouseOverlay` dynamically queries `iconInfo.hbmColor` BITMAP dimensions via Win32 `GetObject` to avoid unnecessary 128x128 over-sampling.
  - For cursors lacking 32-bit alpha channels, the 1-bit transparency mask is decoded from `iconInfo.hbmMask`, preserving dark and black cursor borders.

### 3. Automated Verification & Isolation Regression Suite
- **Pixel-Perfect Buffer Testing**:
  - `ITB-SCREEN-RECORDER.Tests/AgentWorker/MultiMonitorMouseIsolationTests.cs`:
    - `PrimaryScreenClick_RendersOnlyOnPrimaryMonitorBuffer`: Verifies that a click at `(500, 300)` renders on `mon-0` (3440x1440) while `mon-1` (1920x1080 @ 3440,0) remains 100% untouched (`0x00000000` pristine).
    - `SecondaryScreenClick_RendersOnlyOnSecondaryMonitorBuffer`: Verifies that a click at `(4000, 500)` renders solely on `mon-1` (local `560, 500`), while `mon-0` contains zero rendered pixels.
    - `ClicksInVerticalDeltaRegions_AreIsolatedAccurately`: Verifies that clicks in vertical asymmetric zones ($Y > 1080$) are strictly discarded from secondary monitor feeds.
- **Deterministic Test Lifecycle**:
  - `MouseVisualRasterizer.ClearEvents()` provides atomic ring and badge event flushing between test executions to guarantee zero cross-test temporal leakage.

---

## 19. Zero-Black-Screen Persistent Player, Multi-Station Audio Listening & Studio Forensic Canvas Layout (2026-10-28)

### 1. Zero-Black-Screen Persistent WebRTC Topology Architecture
- **Root Problem**:
  - When switching display view modes (`[ ⊞ Canvas | 🖥 1 | 🖥 2 ]`) on station cards, previous implementations destroyed `<WebRTCPlayer>` components and unmounted DOM nodes.
  - This unmounting terminated active `RTCPeerConnection` instances, triggering teardown, new WHEP POST requests, and SDP offer/answer handshakes.
  - This resulted in an unavoidable **500–1500ms black screen** and operator visual disruption whenever inspecting individual displays.
- **Architectural Solution (`VirtualTopologyCanvas.jsx` & `VirtualTopologyCanvas.scss`)**:
  - **Continuous Mounting**: All active `<WebRTCPlayer>` instances remain permanently mounted in the DOM. Switching between `canvas` mode and solo monitor views (`mon-0`, `mon-1`, etc.) never unmounts or interrupts WebRTC stream receivers.
  - **Hardware-Accelerated CSS Transitions**: Display coordinates and dimensions dynamically shift using GPU-accelerated CSS properties:
    ```scss
    transition: left 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                top 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                width 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                height 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.25s ease-out;
    ```
  - **Solo Expansion & Smooth Dimming**:
    - `.is-solo-expanded`: Fills 100% of the canvas container (`inset: 0; width: 100%; height: 100%; z-index: 10; opacity: 1; pointer-events: auto;`).
    - `.is-solo-hidden`: Scales and dims gracefully (`opacity: 0; pointer-events: none; transform: scale(0.96);`).
  - **Result**: Instant, butter-smooth 0ms transitions with **zero black frames** and **zero SDP renegotiation**.

### 2. Multi-Station Audio Listening & Dynamic Master Intercom Dock
- **Evolution to Fleet Multi-Sink Intercom**:
  - Replaced the single-station constraint with multi-station listening capabilities (`activeAudioStationIds: []`).
  - Operators can now monitor audio from multiple operational workstations simultaneously without dropping previous audio sinks.
  - Full backward compatibility maintained for legacy single-station state (`activeAudioStationId`).
- **Tactical Audio Sinks & UI Orchestration**:
  - `AudioSoloContext.jsx`: Manages `activeAudioStationIds`, multi-stream registry `activeAudioStreams`, and atomic station muting via `muteStation(stationId)`.
  - `StationThumbnail.jsx`: Visual listen toggle reflects multi-sink listening status (`activeAudioStationIds.includes(hostname)`).
  - `MasterAudioDock.jsx`:
    - Renders interactive station chips: `[ 🔊 Station-01 ✕ ]`, `[ 🔊 Station-02 ✕ ]` with hover-to-mute actions.
    - Master volume slider controlling combined audio gain.
    - Web Audio API spectral VU analysis for live visual audio levels.

### 3. Forensic Editing Studio: Real-Topology Canvas Layout & Live Director Punch Switcher
- **Physical Topology Canvas Mode (`StudioVideoFeed.jsx`)**:
  - In addition to Split Screen and PiP modes, ExtractorAdvanced Studio now provides a **Physical Canvas** view (`layoutMode === 'canvas'`).
  - Workstation displays are laid out according to actual Windows virtual desktop coordinates ($X, Y, \text{Width}, \text{Height}$) computed via `calculateTopologyBounds` and `calculateNormalizedDisplayRect`.
  - Displays are rendered in true physical aspect ratio with subtle bezel separation and active screen focus borders.
- **Broadcast-Grade Director Live Punch Switcher**:
  - Integrated directly on the video player toolbar, orientation banner, and timeline tracks.
  - Operators can punch cameras live: `[CAM 1]`, `[CAM 2]`, `[↩ AUTO]` directly from the preview monitor without digging into submenus.
  - Hover quick-actions on the timeline allow immediate camera punching or reverting to algorithmic Auto-Director cuts.
- **FFmpeg Multicam Export Synchronization (`SynchronizedTrackCutter.cs`)**:
  - Engine supports `"canvas"` alongside `"split"` and `"pip"` in filtergraph generation.
  - Accurately generates canvas overlays respecting multi-monitor coordinate offsets during video export.

### 4. Multi-Display Keystroke Telemetry Visibility
- **Keystroke Display Decoupling**:
  - Resolved missing keystroke display in multi-screen grids and fullscreen previews.
  - Telemetry fallbacks inspect both fast-path keys and periodic heartbeat properties (`keystrokes`, `Keystrokes`, `recentKeystrokes`).
  - `FullscreenModal.jsx` decouples keystroke rendering from active streaming state, allowing keystroke inspection during both live stream viewing and offline chunk replay.

---

## 20. Cross-Platform CI/CD Architecture & Pipeline Hardening (2026-10-29)

### 1. Cross-Platform Test Runner & Shell Determinism
- **Root Problem**:
  - `package.json` previously defined `"test": "node --test src/tests/*.test.js"`.
  - On Linux/macOS runners, bash expands file wildcards before invoking Node.
  - On Windows GitHub Actions runners (`windows-latest`), `cmd.exe` does not expand wildcards, passing literal `src/tests/*.test.js` to `node.exe`. Node failed to locate the wildcard path, throwing `ENOENT / MODULE_NOT_FOUND`.
- **Architectural Solution**:
  - Standardized the test script to `"test": "node --test"` without arguments.
  - Node's native test runner automatically traverses and discovers `*.test.js` and `test/**/*.js` suites cross-platform while properly ignoring `node_modules`.

### 2. Lockfile Synchronization & npm ci Invariant
- **Root Problem**:
  - `package-lock.json` in `ClientApp` was versioned at `0.0.0` while `package.json` had evolved to `1.0.44`.
  - In CI workflows, `npm ci` strictly enforces lockfile parity with `package.json`. Version mismatches trigger fatal errors during fresh repository installations.
- **Resolution**:
  - Synchronized `package-lock.json` via `npm i --package-lock-only`, aligning package versions and dependency trees across both Linux and Windows runners.
  - Workflow cache keys explicitly target `./ITB-SCREEN-RECORDER.Server/ClientApp/package-lock.json` rather than multi-matching wildcards.

### 3. Server Project CompileFrontend Target & Node.js CI Integration
- **Frontend Build Target Invariant**:
  - `ITB-SCREEN-RECORDER.Server.csproj` declares `<Target Name="CompileFrontend" BeforeTargets="Build">`, triggering `npm run lint`, `npm test`, and `npm run build` during server compilation.
  - `.NET Core Cross-Platform CI` (`dotnet-build-test.yml`) was enhanced with `actions/setup-node@v4` (Node 20.x) immediately following `actions/setup-dotnet@v4` to guarantee consistent Node.js runtimes across both `ubuntu-latest` and `windows-latest`.
  - Unit test execution timeout was extended to `timeout-minutes: 10` to accommodate complete multicam synchronization, SQLite failover, and installer packaging suites.

### 4. React 19 / ESLint 10 Hook & Assignment Strictness
- **Rules of Hooks Invariant**:
  - In `KeystrokePlaybackOverlay.jsx` and `PersistentMinimapHud.jsx`, `useMemo` declarations were hoisted above conditional early-exit returns, ensuring invariant hook invocation counts across renders.
- **Dead Assignment Invariant**:
  - In `ExtractorAdvancedStudio.jsx` and `SoloSpotlightModal.jsx`, eliminated dead initializations (`let resolvedMode;`) flagged by `no-useless-assignment`.

---

## 21. Multi-Monitor Canvas Layout Normalization, Viewport Collision Prevention & Iconography Hardening (2026-10-29)

### 1. Studio Canvas Desktop Geometry & Zero-Stacking Prevention
- **Coordinate Normalization Invariant**:
  - In `StudioVideoFeed.jsx`, `stationDisplays` memoizes displays across all metadata representations (`displays`, `Displays`, `displayTopology.displays`, `topology.displays`).
  - When historical recordings or uncalibrated fallback metadata report identical `(0, 0)` offsets for multiple monitors, the auto-layout engine detects `allZeroCoords` and distributes monitor panes side-by-side using real horizontal physical offsets ($X_{\text{offset}} = \sum \text{Width}_i, Y = 0$).
  - When physical DXGI virtual desktop coordinates are present, true physical topology is strictly preserved.
- **Proportional Canvas Stage Board (`.feed-canvas-board`)**:
  - Encapsulated display panes within `.feed-canvas-board` having inline `aspectRatio: totalWidth / totalHeight`.
  - `.feed-canvas-container` provides top and boundary padding (`padding: 64px 24px 24px 24px`), preventing the canvas stage from stretching, distorting monitor aspect ratios, or hiding behind the command toolbar.

### 2. Viewport HUD Decoupling & Collision Elimination
- **Command Toolbar Centering**:
  - `.feed-viewmode-toolbar` is horizontally centered at `top: 14px; left: 50%; transform: translateX(-50%); z-index: 30;` with `max-width: calc(100% - 240px); overflow-x: auto; scrollbar-width: none;`.
  - Positioned safely away from the top-right corner, leaving room for HUD radars and status overlays.
- **Minimap HUD Separation & Canvas Redundancy Filter**:
  - `.persistent-minimap-hud` is anchored at `top: 14px; right: 14px; z-index: 25;`, completely preventing visual collision with the centered command bar.
  - In `canvas` view mode, `PersistentMinimapHud` is intentionally unrendered, eliminating visual clutter since all monitors are already in full view.

### 3. Tactical Bulk Recording Controls & Fleet Resilience
- **Side Menu Actionability**:
  - In `DashboardDock.jsx`, `canControlStations` evaluates `isOpenMode || isSystemRoot || hasPermission('stations.control')`, ensuring operators in standard Open/Air-gapped installations can trigger fleet recording without administrative deadlocks.
  - In `useDashboardLogic.js`, `canStartAny` and `canStopAny` check multiple casing invariants (`isOnline`, `IsOnline`, `status: 1 | 2`, `isProcessRunning`, `isRecording`, `IsRecording`).
  - `handleFilteredBulkStart` and `handleFilteredBulkStop` target unrecorded online stations from the active filtered view, and automatically fall back to the global fleet pool if filtered views are empty.
  - `App.jsx` optimistically updates station recording badges upon dispatch, eliminating latency stalls.

### 4. Iconography Hardening & Question Mark Elimination
- **Clean SVG Icon Invariant**:
  - Replaced corrupted character artifacts (`?`, `??`, `\uFFFD`) in `StationThumbnail.jsx`, `NotRecordingAlertBanner.jsx`, `StationsRolesTab.jsx`, `StorageRetentionTab.jsx`, `TopScopeBar.jsx`, and `SoloSpotlightModal.jsx` with crisp inline SVGs, semantic badges (`⏰`, `⚠️`, `📌`, `⏺`, `↺`), and correct Unicode symbols (`✕`, `→`, `—`).
  - Preserves 100% offline, self-contained air-gapped compliance (zero external web fonts or CDN downloads).

---
*End of System Book — ITB-SCREEN-RECORDER Architecture Team*





