# 📘 ITB-SCREEN-RECORDER — Comprehensive System Book & Developer Architecture Guide
> **Classification**: Enterprise Air-Gapped Operational Platform  
> **Target Audience**: Core Developers, Systems Engineers, DevOps & Security Architects  
> **Last Updated**: 2026-11-02  
> **Current Version**: v1.0.50  
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
20. [Cross-Platform CI/CD Architecture & Pipeline Hardening](#20-cross-platform-cicd-architecture--pipeline-hardening-2026-10-29)
21. [Multi-Monitor Canvas Layout Normalization, Viewport Collision Prevention & Iconography Hardening](#21-multi-monitor-canvas-layout-normalization-viewport-collision-prevention--iconography-hardening-2026-10-29)
22. [Discrete Dual-Channel Audio Architecture & Delayed Intercom Echo Elimination](#22-discrete-dual-channel-audio-architecture--delayed-intercom-echo-elimination-2026-11-01)
23. [Graceful Central Server Self-Restart & Online Port Re-Binding Architecture](#23-graceful-central-server-self-restart--online-port-re-binding-architecture-2026-11-01)
24. [Host GPU Hardware Detection & Architecture Diagnostics](#24-host-gpu-hardware-detection--architecture-diagnostics-2026-11-01)
25. [Server-Calibrated Time Engine & Playhead Synchronization Architecture](#25-server-calibrated-time-engine--playhead-synchronization-architecture-2026-11-02)
26. [Multi-Monitor Auto-Director: Active Screen Resolution, Zero-Drift Dip-to-Black & Forensic Timeline Visuals](#26-multi-monitor-auto-director-active-screen-resolution-zero-drift-dip-to-black--forensic-timeline-visuals-2026-11-02)
27. [Universal Studio Composition Engine & Single Master MP4 Export Architecture](#27-universal-studio-composition-engine--single-master-mp4-export-architecture-2026-11-02)
28. [Studio Fullscreen Grid View, Synchronous Multi-Video Playback & Exclusive Audio Solo Architecture](#28-studio-fullscreen-grid-view-synchronous-multi-video-playback--exclusive-audio-solo-architecture-2026-11-02)
29. [External Forensic Inspection, Custom Canvas Layout & Master Remote MP4 Export API](#29-external-forensic-inspection-custom-canvas-layout--master-remote-mp4-export-api-2026-11-02)
30. [Visual Canvas Composer, Multi-Keyframe Layout Timeline & Dynamic Master Synthesis](#30-visual-canvas-composer-multi-keyframe-layout-timeline--dynamic-master-synthesis-2026-11-02)
31. [Multi-Tier Video Quality, Output Resolution & Bitrate Scaling Engine](#31-multi-tier-video-quality-output-resolution--bitrate-scaling-engine-2026-11-02)
32. [WYSIWYG Master Canvas Grid Studio, Direct Layout Editing & Screen Switching Architecture](#32-wysiwyg-master-canvas-grid-studio-direct-layout-editing--screen-switching-architecture-2026-11-02)
33. [Air-Gapped Fontconfig Elimination & FFmpeg Custom Canvas Hardening](#33-air-gapped-fontconfig-elimination--ffmpeg-custom-canvas-hardening-2026-11-02)
34. [Studio Canvas Dimension Stabilization & Frame Quantization](#34-studio-canvas-dimension-stabilization--frame-quantization-2026-11-02)
35. [Live Grid Master Canvas Composer, Free Transform Engine & Timeline Keyframe Animation](#35-live-grid-master-canvas-composer-free-transform-engine--timeline-keyframe-animation-2026-11-02)
36. [Minimalist Support Tracks, Draggable Keyframes & Live Canvas Auto-Grid Architecture](#36-minimalist-support-tracks-draggable-keyframes--live-canvas-auto-grid-architecture-2026-11-03)
37. [Non-Standard Aspect Ratio Preservation & CTRL-Locked Canvas Resizing](#37-non-standard-aspect-ratio-preservation--ctrl-locked-canvas-resizing-2026-11-03)
38. [Zero-Collapse Master Canvas Stage & Responsive ResizeObserver Architecture](#38-zero-collapse-master-canvas-stage--responsive-resizeobserver-architecture-2026-11-03)
39. [Tactical Master Canvas Workspace Normalization, Layer Stacking Hierarchy, Surface Rotation Isolation & Export/Import Architecture](#39-tactical-master-canvas-workspace-normalization-layer-stacking-hierarchy-surface-rotation-isolation--exportimport-architecture-2026-11-03)

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
│   └── ExtractorAdvanced\                # Forensic LiveTail DVR viewer, Studio canvas, and multi-station timeline
├── Tools\
│   └── ITB-SCREEN-RECORDER.Diagnostics\  # Enterprise forensic log diagnostic & RCA utility
├── Installers\                           # WiX Toolset v4 installer definitions (.msi) & Linux packaging
└── ITB-SCREEN-RECORDER.Tests\            # Complete test suite (427+ unit, integration, sync & frontend integrity tests)
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

### 3. Frontend Development, Linting & Integrity Testing
```bash
cd ITB-SCREEN-RECORDER.Server/ClientApp
npm install
npm run lint      # Must return 0 errors and 0 warnings
npm run build     # Compiles production bundle to wwwroot
```

- **ExtractorAdvanced Studio (Forensic Replay & Visual Canvas Composer)**:
```bash
cd Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client
npm install
npm run lint      # Enforces 0 undefined variables, hook rules and syntax checks
npm run build     # Runs ESLint gating followed by Vite production widget bundling
```

- **Automated Frontend Integrity Verification**:
Covered by `FrontendBundleIntegrityTests.cs` inside `ITB-SCREEN-RECORDER.Tests`, verifying widget bundle presence, non-empty compiled artifacts, absence of undefined identifiers, and zero ESLint errors during `dotnet test`.
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
  - 
ault (Amber): Workstation audio hardware (speakers/mic) present and configured, but audio stream packets are stalled or absent.
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
  - Hardware Encoder Invariant Process Flow Graph (Rule 8): visual sequential waterfall diagram showing evaluation stages (NVIDIA NVENC -> AMD AMF -> Intel QuickSync -> CPU libx264) with status indicators: selected (✓), failed (✗), and untested/skipped (—).
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
## 22. Discrete Dual-Channel Audio Architecture & Delayed Intercom Echo Elimination (2026-11-01)

### 1. Operational Problem: Acoustic Bleed & Delayed Intercom Loopback
In multi-station recording environments (control rooms, dispatch consoles, operations centers):
- When an operator on Station A speaks into their microphone, their voice is captured immediately ($t = 0$).
- Station B listens to the broadcast over VoIP/intercom/speakers, where network transmission, audio drivers, and buffering introduce a latency of $\Delta t \approx 100\text{ms} - 300\text{ms}$.
- Because workstations previously summed system loopback and microphone audio into a single mixed stereo stream, Station B re-recorded Station A's voice from its loopback speakers with delay $\Delta t$.
- When an investigator or operator listens to both Station A and Station B simultaneously, speech is repeated with a hollow, unintelligible echo ("השמעה כפולה בדיליי").

### 2. Endpoint Discrete Multiplexing Pipeline (AgentWorker)
- **Architectural Solution**: Separation of system audio and operator voice into discrete channels at the capture source.
- **`DiscreteStereoSampleProvider.cs`**:
  - Implements an allocation-free, zero-lock interleaved stereo sample multiplexer.
  - Channel 0 (Left): Loopback (System audio, incoming communications, VoIP, applications).
  - Channel 1 (Right): Microphone (Local operator voice capture).
- **`WasapiDualMixer.cs` Refactoring**:
  - Replaced the unified `MixingSampleProvider` with two isolated mixers: `_loopbackMixer` (mono 48kHz) and `_micMixer` (mono 48kHz).
  - Multi-device render endpoints are downmixed to mono and routed strictly to Channel 0.
  - The default capture device is downmixed to mono and routed strictly to Channel 1.
  - High-precision 20ms pacer outputs standard 2-channel IEEE float32 PCM over TCP loopback to FFmpeg.
- **Protocol Invariant & Zero Breaking Changes**:
  - FFmpeg encodes the stream as standard 2-channel 48kHz AAC (`-c:a aac -b:a 128k -ar 48000 -ac 2`) into RTMP.
  - MediaMTX, chunk storage, SQLite indexing, and WebRTC WHEP remain 100% compliant with existing invariants.

### 3. Live Dashboard Matrix Mixer & Dual VU Meters (`MasterAudioDock.jsx`)
- **Real-Time Web Audio API Routing**:
  - `MasterAudioDock` uses `createChannelSplitter(2)` and `createChannelMerger(2)` to dynamically matrix the live WebRTC audio stream without element reloads.
  - **4 Tactical Listening Modes**:
    1. **🎧 BOTH (Balanced Downmix, Default)**: Sums Channel 0 (System) and Channel 1 (Mic) equally (gain: 0.5 each) into both ears. The operator hears everything centered with natural balance.
    2. **🎤 MIC ONLY**: Mutes system loopback and routes operator microphone to both ears. Instantly eliminates delayed intercom echo when listening to multiple workstations.
    3. **🔊 SYS ONLY**: Mutes local microphone and routes system/VoIP audio to both ears.
    4. **⮂ STEREO SPLIT**: Routes System Audio to Left ear and Microphone to Right ear.
- **Discrete Dual-Channel Tactical VU Meters**:
  - Real-time spectrum analysis with dedicated visual bars for `[SYS]` (Channel 0) and `[MIC]` (Channel 1).
  - Operators can immediately distinguish between workstation background noise and active voice transmission.

### 4. Forensic Track Extraction & Studio Playback
- **Export Packaging (`ExtractorService.cs` & `ExtractorContracts.cs`)**:
  - Extractor tracks preserve the 2 discrete audio channels with full fidelity (`-ac 2`).
  - `session.json` includes typed `audioConfiguration` metadata:
    ```json
    "audioConfiguration": {
      "channels": 2,
      "sampleRate": 48000,
      "discreteMapping": { "0": "Loopback", "1": "Microphone" }
    }
    ```
- **Forensic Studio Replay (`TransportBar.jsx` & `studioSessionStore.js`)**:
  - Integrated channel mode toggle `[🎧 BOTH | 🎤 MIC | 🔊 SYS | ⮂ STEREO]` directly on the transport bar, enabling investigators to isolate clean dialogue across multi-camera timelines.

---

## 23. Graceful Central Server Self-Restart & Online Port Re-Binding Architecture (2026-11-01)

### 1. Operational Problem: Kestrel Dynamic Port Re-Binding
In enterprise operational deployments, operators may reconfigure the central server port (e.g. from default `:5090` to `:8080`, `:443` for standard HTTPS, or `:80` for standard HTTP) directly via the C2 Settings Dashboard (`SystemNetworkTab`).
- **Operating System Socket Invariant**: The ASP.NET Core Kestrel web server binds its TCP listening sockets at process initialization. Under OS network constraints, an active socket cannot be rebound dynamically without restarting the host process.
- **Agent Discovery Desynchronization Risk**: If the server persisted a port change without immediately rebinding, Multicast Discovery would broadcast the new port while Kestrel remained listening on the old port, temporarily severing communications.

### 2. Backend Self-Restart & Cross-Platform Orchestration (`ServerRestartService.cs`)
- **`IServerRestartService` & `ServerRestartService.cs`**:
  - Encapsulates delayed asynchronous dispatching (`ScheduleRestart(int delayMilliseconds = 1500)`) allowing the current HTTP response to flush completely to the client.
  - **Windows Service Orchestration (`ITB_ServerService`)**:
    Detects if running under Windows Service context via `WindowsServiceHelpers.IsWindowsService()`. Spawns a detached background PowerShell command:
    ```powershell
    Start-Sleep -Seconds 2; try { Restart-Service -Name 'ITB_ServerService' -Force } catch { Start-Service -Name 'ITB_ServerService' }
    ```
  - **Console / Interactive Fallback**:
    In developer workstations or standalone executions, restarts the executable via `Process.Start(Environment.ProcessPath)` and calls `_appLifetime.StopApplication()`.
  - **Linux Systemd Support**:
    Executes detached `systemctl restart ITB_ServerService || itb-server`.
- **Atomic Disk & Database Synchronization (`SystemConfigDbSyncService.cs`)**:
  - Updates the SQLite catalog table (`catalog_config`).
  - Atomically writes updated settings across `appsettings.json`, `appsettings.Windows.json`, and `appsettings.Linux.json`.
  - Synchronizes both `SystemConfig:HttpPort` and `Kestrel:Endpoints:Https:Url` / `Http:Url` using regex replacement so that on boot, Kestrel binds to the new port without configuration drift.
- **C2 API Endpoints (`SettingsController.cs`)**:
  - `PUT /api/v1/settings`: Detects port changes (`updatedConfig.HttpPort != currentConfig.HttpPort`), flushes configuration, returns `{ requiresRestart: true, oldPort, newPort }`, and schedules restart.
  - `POST /api/v1/settings/restart`: Dedicated operator endpoint for on-demand server restarts.

### 3. Frontend Tactical Redirect & Transition Overlay (`ServerRestartModal.jsx`)
- **`ServerRestartModal.jsx` & `_serverRestartModal.scss`**:
  - Automatically intercepts `requiresRestart` responses from settings updates or maintenance restart triggers.
  - Renders a tactical NOC countdown overlay with radar radar pulse animations and real-time transition metrics (`oldPort ➔ newPort`).
  - Pre-computes target URL handling standard browser port omissions (omits `:443` for HTTPS, `:80` for HTTP).
  - Provides a 5-second countdown with an instant "GO NOW" override button, redirecting the operator's browser smoothly to the new endpoint (`window.location.href`).
- **Endpoint Offline Buffering Invariant (Zero Data Loss)**:
  - During the 2–3 second restart window, Agent workers smoothly store continuous captures in `LocalBufferPath` (`RecordingsBuffer`) under Rule 1 & Rule 2.
  - Once the server resumes listening on the new port, Agent discovery reconnects and drains buffered chunks without a single lost frame.

---
## 24. Host GPU Hardware Detection & Architecture Diagnostics (2026-11-01)

### 1. Host Hardware GPU Enumeration (HardwareProbe.cs)
- **Lightweight System Registry & Kernel Probing**:
  - **Windows**: Enumerates display adapters directly from the Windows Registry:
    HKLM\SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}. Extracts DriverDesc, DriverVersion, and ProviderName in sub-millisecond time without spawning heavy WMI or DirectX processes.
  - **Linux**: Probes /proc/driver/nvidia/version or lspci for discrete acceleration hardware.
  - Log output explicitly displays all detected graphics adapters at probe initialization (e.g., [PROBE] Detected Host GPU [0]: NVIDIA A100-PCIE-40GB (Driver: 31.0.15.5222, Provider: NVIDIA)).

### 2. NVIDIA A100/H100 Compute-Only Architecture Invariant
- **Architectural Clarification**:
  - The **NVIDIA A100 (GA100)** and **H100 (GH100)** Tensor Core GPUs are designed by NVIDIA strictly for datacenter AI training, high-performance computing (HPC), and deep learning inference.
  - **Physical Die Design**: NVIDIA intentionally **omitted NVENC hardware video encoding silicon** from the GA100 and GH100 chips. While they feature 5 NVDEC hardware video decoders and 1 JPEG decoder, they have **0 NVENC encoders**.
  - **Encoder Failure Diagnosis**: When FFmpeg or MediaMTX attempts h264_nvenc against an A100, the NVIDIA driver returns exitCode -40 / Function not implemented or Driver does not support required nvenc API version.
  - **Automated Diagnostic Logging**: HardwareProbe.cs now cross-references detected GPU hardware. If an A100 or H100 GPU is detected without NVENC support, it explicitly logs:
    "NVIDIA A100/H100 architecture lacks NVENC video encoder (Compute-only GPU, NVDEC decoders only). Falling back to software/CPU encoding."
  - The pipeline gracefully and deterministically transitions to CPU fallback (libx264, -preset ultrafast -tune zerolatency) or secondary workstation adapters.

### 3. Tactical C2 UI Display (SystemOverviewTab.jsx)
- Detected GPU models and driver versions are surfaced directly in the C2 Dashboard System Overview pipeline header as interactive badges (🖥️ HOST GPU: <Model> (v<Driver>)), providing immediate hardware visibility to NOC operators.

---
## 25. Server-Calibrated Time Engine & Playhead Synchronization Architecture (2026-11-02)

### 1. Operational Problem: Client Host Timezone Drift & Playhead Desynchronization
In air-gapped operational environments, client workstations accessing the Forensic Studio (`ExtractorAdvancedStudio`) or NOC Dashboard may run with divergent local OS timezones, uncalibrated system clocks, or UTC/GMT settings.
- **Playhead Needle Clock Drift**: Previously, `Playhead.jsx` utilized a local `new Date().getHours()` formatter that queried the client browser's local OS clock. If the client machine was set to UTC while the server operated in Israel Standard/Daylight Time (IST/IDT), the playhead badge displayed UTC hours while the timeline ruler labels displayed calibrated server hours.
- **Mission Time Range Modal Shift**: Opening `MasterTimeRangeModal.jsx` previously decomposed timestamps using browser-local date accessors (`getFullYear()`, `getHours()`). When saving the mission time range, it subtracted the server's DST offset from nominal UTC milliseconds, introducing a double-shift in `startEpoch` / `endEpoch`.
- **Stream Seek Desynchronization**: Because backend chunk storage and `/api/v1/extractor-advanced/stream` query recordings via exact Unix Epoch milliseconds, the shifted timestamps caused video playback requests to fetch chunks from non-existent or misaligned time windows, creating an anomaly between the playhead needle, timeline cut boundaries, and the streamed video frames.

### 2. Unified DST Time Decomposition Architecture (`dstEngine.js`)
To guarantee 100% deterministic time representation regardless of host operating system or browser timezone settings, the shared DST Engine (`dstEngine.js`) was extended with pure mathematical time decomposition and composition utilities:
- **`getLocalTimeComponents(epochMs)`**: Decomposes UTC Epoch milliseconds into `{ year, month, day, hour, minute, second, offsetMin, label }` by applying server-calibrated DST rules and reading UTC date parts from the offset-adjusted timestamp. Zero client OS timezone interference.
- **`getUtcTimeComponents(epochMs)`**: Extracts pure UTC time components `{ year, month, day, hour, minute, second, offsetMin: 0, label: 'UTC' }`.
- **`getTimeComponents(epochMs, mode = 'LOCAL')`**: Unified dispatcher returning either local calibrated or UTC time components.
- **`formatDateTimeComponents(epochMs, mode = 'LOCAL')`**: Returns formatted `{ dateStr: "YYYY-MM-DD", timeStr: "HH:MM:SS", fullStr: "YYYY-MM-DDTHH:MM:SS", label, offsetMin }`.
- **`dateTimeToEpochMs(dateStr, timeStr, mode = 'LOCAL', occurrence = 1)`**: Reconstructs exact UTC Unix Epoch milliseconds from nominal date and time strings with automated DST fall-back ambiguity resolution.

### 3. Comprehensive Component Time Alignment
- **Playhead Needle Badge (`Playhead.jsx`)**:
  - Replaced internal flawed formatter with `formatTimelineClock(baseEpochMs + playheadMs, timeMode)`.
  - Playhead needle badge now perfectly matches timeline ruler tick labels and server operational time across all zoom levels and time modes.
- **Master Mission Time Picker Modal (`MasterTimeRangeModal.jsx`)**:
  - Modal initialization and quick presets (`1h`, `4h`, `24h`, `7d`) populate date/time fields using `getTimeComponents(epoch, timeMode)`.
  - Date picking and calendar navigation operate on UTC date instances (`getUTCFullYear()`, `getUTCMonth()`, `getUTCDate()`), eliminating midnight date skew in negative or positive timezone offsets.
  - Form submission calculates exact Unix Epoch milliseconds via `dateTimeToEpochMs`.
- **Tactical Mission Scope Bar (`TopScopeBar.jsx`)**:
  - Uses `getTimeComponents` to format start and end dates/times, eliminating date mismatches across midnight boundaries.
- **Keystroke Burst Overlay (`TimelineKeystrokes.jsx`)**:
  - Tooltip timestamps now call `formatTimelineClock(cluster.startEpochMs, timeMode)`.
- **Incident Bookmarks (`BookmarksModal.jsx`)**:
  - Bookmark cut times format via `formatTimelineClock(epochMs, timeMode)` respecting active studio display mode.
- **Studio Session Invariant (`ExtractorAdvancedStudio.jsx`)**:
  - `generateDefaultTimeRange` formats initial time scope using `formatDateTimeComponents`.
  - `parseSafeEpoch` parses ISO date strings without timezone indicators via `dateTimeToEpochMs` instead of browser-local parsing.

---
## 26. Multi-Monitor Auto-Director: Active Screen Resolution, Zero-Drift Dip-to-Black & Forensic Timeline Visuals (2026-11-02)

### 1. Active Screen Focus Detection & Telemetry Coordinate Capture
- **Global Coordinate Tracking**:
  - `WindowsKeyboardCaptureProvider.cs` and `WindowsMouseOverlay.cs` invoke Win32 `GetCursorPos` and `GetForegroundWindow` / `GetWindowRect` to capture precise virtual desktop coordinates `(X, Y)` at interaction time.
  - Telemetry DTOs (`KeystrokeEventDto`, `ActivityEventDto`) and SQLite schema (`keystroke_events`) are augmented with `x`, `y`, and `display_id` columns.
- **Intelligent Video Bitrate Activity Heuristic**:
  - In `ExtractorAdvancedController.cs`, `ComputeStationDirectorPlanAsync` analyzes per-monitor chunk bitrates (`FileSizeBytes / Duration.TotalMilliseconds`) across the timeline.
  - When workstations operate without active typing or with legacy coordinates, the engine correlates encoding bandwidth deltas between primary and secondary displays, seamlessly detecting when user interaction migrates to secondary monitors.
  - Multi-monitor station queries (`/api/v1/extractor-advanced/stations`) automatically return dynamic, activity-based director plans rather than static primary-monitor defaults.

### 2. Multi-Display Dip-to-Black Video Slicing Engine (`SynchronizedTrackCutter.cs`)
- **Mathematical Zero-Drift Multi-Monitor Slicing**:
  - When rendering tracks in `layoutMode == "director"`, `SynchronizedTrackCutter` builds FFmpeg manifests across all relevant displays (`mon-0`, `mon-1`, etc.).
  - Each director segment is trimmed from its corresponding input stream (`[0:v]`, `[1:v]`) with a 150ms fade-out and 150ms fade-in (300ms symmetrical Dip-to-Black transition), concatenated via `concat=n=...:v=1:a=0[vbase]`.
  - Preserves 100% full native resolution without letterbox distortion, and retains continuous, drift-free audio synchronization mapped from input 0.

### 3. Package Manifest Integration (`session.json`) & Forensic Studio Parity
- **Metadata Persistence in Archives & Studio**:
  - `AdvanceJobManager.cs` and `ExtractorService.cs` embed `directorSegments` into `session.json` inside exported packages and studio playback models.
  - ExtractorAdvanced Studio reads `directorSegments` to visualize historical director cuts on the timeline and synchronize multi-camera previews.
- **Dynamic Playhead Status Badge**:
  - During playback in Director Mode, `DirectorTrack.jsx` and `StudioVideoFeed.jsx` dynamically update with the active screen and time interval using the 1-based display standard: `⚡ AUTO-DIRECTOR: SCREEN 1 [10:14:00 - 10:18:30]`.

### 4. Advanced Extractor Studio Timeline & HUD Enhancements
- **Configurable Auto-Director Minimum Screen Dwell Time (`SystemConfig.AutoDirector.MinDwellSeconds`)**:
  - `ActivityFocusAnalyzer.cs`, `ExtractorAdvancedController.cs`, and `AdvanceJobManager.cs` enforce a configurable minimum screen dwell threshold (`minDwellMs = config.AutoDirector.MinDwellSeconds * 1000`, default 10 seconds, range 1–120s).
  - Rapid interactions across monitors are smoothed out to eliminate visual fatigue: the camera remains locked on the current screen for at least the configured dwell duration before any automated transition can occur. Trailing micro-segments under this duration are absorbed backward into the preceding segment.
  - **Central Administration in System Settings**: Accessible directly via the C2 System Settings UI (`System & Network` tab -> `AUTO-DIRECTOR & REPLAY STUDIO ENGINE`), featuring an ergonomic tactical range slider, direct numeric input, preset ticks (3s, 5s, 10s, 15s, 30s, 60s), and bilingual guidance notes. Changes persist to SQLite and configuration files on disk (`appsettings.Windows.json` / `appsettings.Linux.json`) and apply dynamically to future director plan analyses and export cuts without server restarts.


- **Minimalist Timeline Segment Visualization (`DirectorTrack.jsx`)**:
  - Segments are rendered with high visual minimalism: displaying only the screen number (`🖥 1` / `🖥 2` or `1` / `2`), color-coded per physical display (Cyan for Screen 1, Purple for Screen 2, Emerald for Screen 3, Blue for Screen 4).
  - Overlap Prevention in Zoom-Out: Exact floating-point percentages without artificial minimum widths ensure contiguous, non-overlapping segment layout even across multi-hour zoom scales. Text is automatically suppressed when segment pixel width is insufficient.
- **Right-Click Context Menu Segment Editing**:
  - Right-clicking (`onContextMenu`) any director segment opens a dedicated tactical context menu allowing operators to:
    - Instantly reassign that specific segment to any available physical display (`Screen 1`, `Screen 2`, etc.), marking it as a manual override (`isManualOverride: true`).
    - Revert the segment back to algorithmic AI Auto-Director decisions.
    - Split the segment at the exact right-click timeline timestamp or at the current playhead position.
- **Persistent Minimap HUD & Multi-Screen Indicators**:
  - `PersistentMinimapHud.jsx` and `StudioVideoFeed.jsx` render real-time time range badges, giving operators immediate visual clarity on which display is currently selected and for what exact time span.

---

## 27. Universal Studio Composition Engine & Single Master MP4 Export Architecture (2026-11-02)

### 1. Executive Strategic Pivot: Standalone Player Discontinuation & Studio Convergence
- **Single Operational Platform**: In accordance with executive steering directives, the standalone desktop player (`Tools/ITB-SCREEN-RECORDER.Player`) has been officially retired. All forensic playback, multi-monitor display switching, PiP/split composition, and timeline investigation capabilities have been completely absorbed into the web-based **ExtractorAdvanced Studio** (`Features/ExtractorAdvanced/Client`).
- **Zero-Dependency Universal Replay**: Rather than requiring operators or third-party forensic authorities to install and maintain specialized desktop player clients, the platform now exports a **single, standalone, universally playable `.mp4` video file named directly after the export time** (`{yyyy-MM-dd_HH-mm-ss}.mp4`, e.g. `2026-11-02_14-30-00.mp4`). All multi-station or multi-monitor feeds, active director cuts, audio channel routing, and keystroke forensic evidence are rendered directly into the master container.

### 2. Universal Studio Composition Engine: Inter-Station & Intra-Station Matrix
- **Dual-Scope Composition Architecture**:
  - **Inter-Station Composition**: Allows operators to compose video across separate workstations in the fleet:
    - **Split Screen**: Side-by-side 960x1080 display with 2px tactical divider for concurrent station investigation.
    - **Picture-in-Picture (PiP)**: Full 1080p hero station with 28% inset station in the bottom-right corner with tactical cyan border.
    - **Virtual Canvas / Station Grid**: Multi-station layout arranging up to 4 stations in an ergonomic 2x2 grid on a 1920x1080 tactical dark canvas (`#070A10`).
    - **Director Cut**: Dynamically cuts between stations based on active interaction telemetry or manual director segments.
  - **Intra-Station Composition**: Composes across multiple physical monitors (`mon-0`, `mon-1`, `mon-2`) of a single workstation in Split, PiP, Virtual Canvas, or Auto-Director mode.
- **Solo Mode Canvas Default & Memory Invariant**:
  - When entering Solo focus mode (focusing a workstation from the grid), the composition layout defaults **automatically to Virtual Canvas (`viewMode = 'canvas'`)**, displaying all physical displays arranged proportionally according to real OS virtual desktop bounds.
  - The engine persists the operator's last chosen layout (e.g. Canvas, Split, PiP, Director, or single screen) in `localStorage`, restoring it automatically on subsequent Solo sessions.
- **Fullscreen Target Screen Inheritance Invariant**:
  - When entering Fullscreen mode (Cinema Spotlight or Theater Modal), the system directly selects and focuses whichever specific physical monitor was clicked to trigger the transition (`initialDisplayId`). Clicking Display 2 in Canvas enters Fullscreen showing Display 2, while clicking the generic Fullscreen button or canvas background enters Fullscreen in Canvas mode.
- **Dynamic Orientation Controls**:
  - `⇄ SWAP`: Instant single-click transposition between Left/Right in Split Screen or Main/Inset in Picture-in-Picture.
  - `🎬 AUTO-DIRECTOR: ON / OFF`: Toggles automated screen switching. When OFF, the composition layout remains locked to the operator's manual layout selection.

### 3. Master Audio Routing Timeline Track (`AudioRoutingTrack.jsx`)
- **Dedicated Timeline Audio Track**:
  - Rendered prominently across the timeline board with real-time waveform animation, indicating the active audio source workstation for every temporal slice: `🎙️ AUDIO ROUTING (MASTER MIX)`.
  - Color-coded segments display workstation name, display badge, and active interval boundaries: `[🎙️ WS-01: 10:14:00 - 10:18:30]`.
- **Interactive Routing Operations**:
  - **Split at Playhead (`✂️`)**: Slices the audio routing track at the current playhead position to reassign audio channels during critical forensic moments.
  - **Tactical Station Selector Menu**: Clicking or right-clicking any segment opens a context menu allowing the operator to route audio from any active workstation or select **Mute Interval (`🔇 MUTE`)**.
  - **Follow Visual Feed (`🎯`)**: Automatically synchronizes audio routing segments to whichever workstation or screen is currently in active visual focus.
- **Unified Master Audio Synthesis**:
  - During export, `AdvanceJobManager.ComposeMasterMp4Async` constructs an FFmpeg audio filtergraph that trims audio from each designated workstation (`[{inIdx}:a]atrim=...[a_seg]`) or synthesizes silence (`anullsrc`) during muted intervals, and concatenates them seamlessly into a single master audio stream (`[outa]`).

### 4. Hard In-Place Keystroke Burn-In Invariant
- **Permanent Courtroom-Admissible Evidence**:
  - Soft subtitle tracks (`mov_text` / `.srt`) have been eliminated from the master export pipeline.
  - Keystroke forensic presentation is strictly binary:
    1. **Hard Burn-In (`KeystrokeExportMode.BurnIn`)**: Permanently bakes ASS keycaps directly onto the video pixels at the exact coordinate surface `(X, Y)` of each individual screen before composition.
    2. **None (`KeystrokeExportMode.None`)**: Clean video output without on-screen keystrokes.

### 5. Single Master MP4 Export Pipeline (`AdvanceJobManager.cs`)
- **Direct MP4 Rendering**:
  - The legacy `.tar` pax archive packing loop has been replaced with `ComposeMasterMp4Async`.
  - **Export-Time Filename Invariant**: The master MP4 is named strictly after the exact export timestamp (`yyyy-MM-dd_HH-mm-ss.mp4`, e.g. `2026-11-02_14-30-00.mp4`).
  - **Grid Canvas Synthesis & Auto-Director Governance**: What is exported is the master Grid/Canvas. If a station has only one screen slot in the layout but multiple recorded displays, that slot automatically follows the Auto-Director, dynamically switching between active screens based on operator interaction. If multiple screens of the station are explicitly placed on the canvas, each screen is rendered independently and simultaneously.
  - Individual gap-filled, wall-clock aligned tracks are rendered in `tempStagingDir`.
  - FFmpeg applies hardware-accelerated video filters (NVENC -> Intel QSV -> libx264) with faststart metadata (`-movflags +faststart`) to produce a single master `.mp4` file.
  - Delivered directly through `/api/v1/extractor/jobs/{jobId}/download` with `video/mp4` MIME type.

## 28. Studio Fullscreen Grid View, Synchronous Multi-Video Playback & Exclusive Audio Solo Architecture (2026-11-02)

### 1. Architectural Scope & Mission
In accordance with operational requirements for high-density command-and-control (C2) monitoring in ExtractorAdvanced Studio, the platform features:
1. **Fullscreen Multi-Station Grid View**: Seamless transition from standard workspace into an immersive 100vw x 100vh monitoring wall with dynamic auto-scaling cells and zero distortion.
2. **Synchronous Multi-Video Playback Engine**: Real-time parallel video playback across all visible grid cards in lockstep synchronization with the master playhead epoch.
3. **Exclusive Audio Solo Sink (Rule 12 Compliance)**: Strict enforcement that only one workstation plays audio in the grid at any given moment, with 1-click station audio switching and mute-all support.

### 2. Multi-Video Synchronous Playback Pipeline (`CameraCardFeed.jsx` & `usePlaybackEngine.js`)
- **Master Monotonic Clock & Slave Decoders**:
  - In Grid Mode (`!isSolo`), the master timeline animation loop in `usePlaybackEngine.js` executes at 60fps, smoothly advancing `playheadMs` and broadcasting `currentEpochMs`.
  - Individual workstation video elements act as precision slave decoders.
  - Video streams are initialized on `/api/v1/extractor-advanced/stream?hostname=...&startEpoch=...&endEpoch=...&seekEpoch=...&displayId=...`.
  - **Dynamic Anti-Drift Alignment**: Each card feed compares `video.currentTime` with expected elapsed seconds `(currentEpochMs - streamStartEpochMs) / 1000`. If decoder or network buffer jitter creates a drift $>350\text{ms}$, `video.currentTime` is gently realigned to avoid visual drift while avoiding stream teardown.
  - **Coordinated Scrubbing & Seeking**: When the operator scrubs $>800\text{ms}$ on the timeline scrubber, all active grid feeds debounce and rebind their stream offsets in lockstep.
- **Resource & Decoder Governance**:
  - When paused, card feeds gracefully detach streaming pipelines and fall back to high-fidelity static frames via `frameStore`, releasing GPU decoders and network bandwidth.
  - On play, streams spin up in parallel across visible grid cells with smooth opacity transitions.

### 3. Fullscreen Grid View & Tactical Floating Transport Dock (`MulticamViewport.jsx`)
- **Immersive 100vw x 100vh Tactical Canvas**:
  - Activated via the `⛶ FULLSCREEN GRID` toolbar button, top composition bar toggle, or hotkeys (`F` / `F11`).
  - Native browser `requestFullscreen()` with CSS fixed overlay fallback (`position: fixed; inset: 0; z-index: 999999; background: #070A10`).
  - Top composition controls automatically retract to maximize monitor surface area for workstation feeds.
- **Tactical Glassmorphic Floating Transport HUD**:
  - Floating pill dock (`.grid-fullscreen-floating-dock`) with cyan glassmorphic styling (`rgba(10, 15, 29, 0.94)`, `backdrop-filter: blur(20px)`).
  - **Master Play/Pause All (`▶ PLAY ALL` / `⏸ PAUSE ALL`)**: Toggles synchronous playback across all workstations with `[Space]` shortcut support.
  - **Global Timeline Scrubber**: Allows smooth seeking across the full timeline scope.
  - **Playhead Clock Display**: Live badge indicating wall-clock or UTC epoch (`[10:14:25 / 14:00:00]`).
  - **Multi-Rate Playback Selector**: `0.5x`, `1x`, `2x`, `4x` with real-time rate propagation across all video elements.
  - **Auto-Hide Inactivity Timer**: Smoothly dims after 3.2 seconds of mouse idle; instantly reappears on cursor motion.
  - **Exit Fullscreen (`⤓ EXIT`)**: One-click or `[Esc]` return to normal studio workspace.

### 4. Rule 12 Exclusive Audio Solo Governance
- **Zero-Cacophony Invariant**:
  - Playing 4–12 audio streams concurrently creates operational chaos.
  - In Grid mode, all cards are strictly muted (`muted = true`) except for the designated `activeAudioStationId`.
- **Operator Selection Interface**:
  - Card Header Speaker Action: Each card header features an audio solo button with glowing emerald wave animations (`🔊 AUDIO ACTIVE`) when unmuted, or subdued mute icon (`🔇`).
  - Floating Transport Dock Dropdown: Quick dropdown selector allowing instant audio assignment to any station or total silence (`🔇 MUTE ALL AUDIO`).

---



## 29. External Forensic Inspection, Custom Canvas Layout & Master Remote MP4 Export API (2026-11-02)

### 1. Architectural Mission & Integration Scope
In enterprise and tactical military C2 deployments, external command systems, automated analysis suites, and forensic audit platforms require the capability to programmatically interrogate the server's recording state and request customized multi-station video compilations via an automated REST/XML API.
To achieve this, the server exposes:
1. **Forensic Inspection API (`/api/v1/extractor-advanced/inspect` & `/api/v1/extractor/inspect`)**: A comprehensive discovery endpoint allowing external consumers to interrogate workstation availability, functional role mappings, audio presence, keystroke activity, and display hardware parameters across arbitrary time ranges.
2. **Custom Canvas Layout Engine (`CustomCanvasLayoutDto`)**: A parametric composition engine supporting arbitrary placement coordinates `(x, y)`, sizing `(width, height)`, and stacking layer depth (`zIndex`), allowing external clients to define custom hero/PiP/split configurations with tactical borders and burn-in labels.
3. **Automated Master MP4 Export Pipeline**: Asynchronous background rendering with hardware acceleration (NVENC -> Intel QSV -> libx264) producing a unified, single `.mp4` video with faststart streaming metadata and coordinated master audio routing.
4. **Dual Content-Type Serialization**: Native interoperability supporting both standard JSON (`application/json`) and enterprise XML (`application/xml`, `text/xml`) requests and responses.

### 2. Forensic Inspection API (`ExtractorAdvancedController.cs`)
- **Route Mapping**:
  - `GET /api/v1/extractor-advanced/inspect`
  - `POST /api/v1/extractor-advanced/inspect`
  - `GET /api/v1/extractor/inspect` (alias for backward compatibility)
  - `POST /api/v1/extractor/inspect`
- **Request Parameters (`ForensicInspectionRequestDto`)**:
  - `startEpoch` / `endEpoch`: Time range as Unix epoch milliseconds or seconds.
  - `startTime` / `endTime`: ISO 8601 formatted timestamps (e.g. `2026-11-02T10:00:00Z`).
  - `stations` / `stationIds`: Optional filter for specific hostnames or tactical role names.
- **Inspection Intelligence Returned (`ForensicInspectionResultDto`)**:
  - `TimeRange`: Validated start/end epoch milliseconds, UTC datetimes, and total duration.
  - `TotalStationsFound` & `ActiveRecordingStationsCount`: Total stations identified vs. those with active recording chunks.
  - `StationsWithAudioCount` & `StationsWithKeystrokesCount`: Forensic telemetry availability counters.
  - `RoleToStationMap` & `StationToRoleMap`: Complete bidirectional mapping between operational roles (e.g. "Commander", "Radar Specialist") and physical workstation hostnames (e.g. "WS-ALPHA", "WS-BRAVO").
  - `Stations` (List of `StationInspectionDto`):
    - `StationId`, `Hostname`, `RoleAlias`, `DisplayName`, `IsOnline`.
    - `HasRecordings`, `HasAudio`, `HasKeystrokes`, `KeystrokeCount`, `RecordingsCount`.
    - `Displays` (`StationDisplayInspectionDto`): Screen identifier (`mon-0`, `mon-1`), display number, width, height, framerate, resolution (`1080p`), primary flag, and bounds coordinates `(x, y)`.
    - `RecordingSegments` (`TimelineSegmentInspectionDto`): Discrete chunk coverage intervals with millisecond start/end epochs and audio presence flags.

### 3. Custom Canvas Layout & Stacking Depth Specification
External clients define output video geometry via `CustomCanvasLayoutDto` and `CanvasPlacementDto`:
- **Canvas Properties**:
  - `Width` (int, default `1920`): Output video horizontal resolution.
  - `Height` (int, default `1080`): Output video vertical resolution.
  - `BackgroundColor` (string, default `"#070A10"`): Canvas canvas fill color.
  - `Fps` (double, default `30.0`): Target video framerate.
- **Feed Placement Definition (`CanvasPlacementDto`)**:
  - `StationId`: Physical workstation hostname (`WS-01`) OR operational role alias (`Commander`). The server automatically resolves role aliases to physical hostnames via `IStationRoleProvider`.
  - `DisplayId`: Target monitor (`mon-0`, `mon-1`, or `director`). Defaults to `mon-0`.
  - `X`, `Y`: Canvas origin coordinates (supports absolute pixels or normalized `0.0 - 1.0` floats).
  - `Width`, `Height`: Dimension on canvas (absolute pixels or normalized `0.0 - 1.0` floats).
  - `ZIndex` (int): Stacking depth layer ("what is in front of what"). Placements are ordered by `ZIndex` ascending; items with `ZIndex = 0` are placed on the base canvas (hero feed), and items with `ZIndex = 1` or higher overlay on top (e.g. PiP inset).
  - `BorderWidth` & `BorderColor`: Optional tactical border (e.g. `2px #06B6D4` cyan, `#10B981` emerald, `#F43F5E` rose).
  - `Label`: Optional tactical burn-in caption rendered directly on the feed.
  - `StartOffsetMs` & `EndOffsetMs`: Optional millisecond time window during which this placement is visible (enabling timed PiP appearance/disappearance).

### 4. Custom Canvas Master MP4 Synthesis (`AdvanceJobManager.cs`)
When `LayoutMode = "custom"` or `CanvasLayout` is supplied in `AdvanceCutRequestDto`:
1. **Role Resolution**: Hostnames and role aliases across `StationIds`, `CanvasLayout.Placements`, and `AudioSourceStation` are resolved using `IStationRoleProvider.GetAllStationRoleAliasesAsync()`.
2. **Individual Track Rendering**: Slices each unique workstation track with gap-filling, wall-clock synchronization, and hard keystroke burn-in (`KeystrokeExportMode.BurnIn`).
3. **FFmpeg Filtergraph Assembly (`ComposeCustomCanvasMasterMp4Async`)**:
   - Canvas Base: `color=c={bg}:s={w}x{h}:r={fps}[bg]`
   - Feed Scaling & Bordering: Feeds are scaled with aspect preservation, boxed, padded, and bordered per `CanvasPlacementDto`.
   - Stacking Chain: Overlays are sequentially daisy-chained ordered by `ZIndex` ascending:
     `[bg][feed_0]overlay=x=...:y=...[ol_0]; [ol_0][feed_1]overlay=x=...:y=...:enable='between(t,...)'[ol_1]...`
4. **Master Audio Synthesis**: Audio is pulled from the designated `AudioSourceStation` (or mapped audio routing track), with mute intervals generating synchronized silence (`anullsrc`).
5. **Output**: Renders directly to master `.mp4` with faststart metadata (`-movflags +faststart`).

### 5. API Usage Example (JSON & XML)

#### JSON Export Request (`POST /api/v1/extractor-advanced/export`):
```json
{
  "stationIds": ["Commander", "RadarOperator"],
  "startTime": "2026-11-02T10:00:00Z",
  "endTime": "2026-11-02T10:15:00Z",
  "layoutMode": "custom",
  "audioSourceStation": "Commander",
  "keystrokeMode": 2,
  "canvasLayout": {
    "width": 1920,
    "height": 1080,
    "backgroundColor": "#070A10",
    "placements": [
      {
        "stationId": "Commander",
        "displayId": "mon-0",
        "x": 0, "y": 0, "width": 1920, "height": 1080,
        "zIndex": 0,
        "label": "COMMANDER - PRIMARY FEED"
      },
      {
        "stationId": "RadarOperator",
        "displayId": "mon-0",
        "x": 1380, "y": 720, "width": 500, "height": 320,
        "zIndex": 1,
        "borderWidth": 2,
        "borderColor": "#06B6D4",
        "label": "RADAR OPERATOR (PIP)"
      }
    ]
  }
}
```

#### XML Export Request (`POST /api/v1/extractor/export`):
```xml
<?xml version="1.0" encoding="utf-8"?>
<AdvanceCutRequestDto xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <StationIds>
    <string>Commander</string>
    <string>RadarOperator</string>
  </StationIds>
  <StartTime>2026-11-02T10:00:00Z</StartTime>
  <EndTime>2026-11-02T10:15:00Z</EndTime>
  <LayoutMode>custom</LayoutMode>
  <AudioSourceStation>Commander</AudioSourceStation>
  <KeystrokeMode>BurnIn</KeystrokeMode>
  <CanvasLayout>
    <Width>1920</Width>
    <Height>1080</Height>
    <BackgroundColor>#070A10</BackgroundColor>
    <Placements>
      <CanvasPlacementDto>
        <StationId>Commander</StationId>
        <DisplayId>mon-0</DisplayId>
        <X>0</X>
        <Y>0</Y>
        <Width>1920</Width>
        <Height>1080</Height>
        <ZIndex>0</ZIndex>
        <Label>COMMANDER</Label>
      </CanvasPlacementDto>
      <CanvasPlacementDto>
        <StationId>RadarOperator</StationId>
        <DisplayId>mon-0</DisplayId>
        <X>1380</X>
        <Y>720</Y>
        <Width>500</Width>
        <Height>320</Height>
        <ZIndex>1</ZIndex>
        <BorderWidth>2</BorderWidth>
        <BorderColor>#06B6D4</BorderColor>
        <Label>RADAR OPERATOR</Label>
      </CanvasPlacementDto>
    </Placements>
  </CanvasLayout>
</AdvanceCutRequestDto>
```

#### Response (HTTP 202 Accepted):
```json
{
  "jobId": "f78a2e1c-5d39-440a-912b-312984bcde21",
  "statusUrl": "/api/v1/extractor-advanced/jobs/f78a2e1c-5d39-440a-912b-312984bcde21",
  "downloadUrl": "/api/v1/extractor/jobs/f78a2e1c-5d39-440a-912b-312984bcde21/download"
}
```

### 6. Temporal & Historical Station Role Assignment Architecture
- **Operational Reality & Shift Swapping Invariant**:
  - In dynamic military operations and command centers, operational roles ("Commander", "Radar North", "Interception Controller") are assigned to workstations dynamically.
  - Workstations may change roles or swap stations between operational shifts (הצלבת עמדות).
  - A role assignment is strictly valid **only for the duration it was actively assigned**, and must never retroactively alter the identity of past recordings or corrupt future logs.
- **Dedicated Temporal Persistence (`station_role_history` Table)**:
  - Managed by `CatalogDbInitializer.cs` and `CatalogRepository.cs`:
    ```sql
    CREATE TABLE IF NOT EXISTS station_role_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        station_id TEXT NOT NULL COLLATE NOCASE,
        role_alias TEXT NOT NULL,
        assigned_at_utc INTEGER NOT NULL,
        released_at_utc INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_role_history_station_time 
    ON station_role_history (station_id COLLATE NOCASE, assigned_at_utc, released_at_utc);
    CREATE INDEX IF NOT EXISTS idx_role_history_alias_time 
    ON station_role_history (role_alias COLLATE NOCASE, assigned_at_utc, released_at_utc);
    ```
  - Automatic migration seeds existing `station_nodes.role_alias` records from `assigned_at_utc = 0` to maintain continuous backward compatibility.
- **Time-Bounded Resolution Pipeline (`IStationRoleProvider`)**:
  - `GetStationRoleAliasesAtEpochAsync(long epochMs)`: Resolves the exact role held by each workstation at a specific timestamp.
  - `GetStationRoleAliasesForTimeRangeAsync(long startEpochMs, long endEpochMs)`: Resolves role-to-hostname mappings active during the requested time window.
  - `GetStationRoleHistoryAsync(...)`: Exposes complete assignment timelines (`StationRoleIntervalDto`) with `assignedUtc`, `releasedUtc`, and `isActive` state flags.
- **Seamless Impact across the Platform**:
  - **ExtractorAdvanced Studio**: When an operator navigates to a past incident on the timeline scrubber, `/api/v1/extractor-advanced/stations` automatically tags cards and tracks with the role each workstation held **at that historical time**, preventing operator confusion when viewing previous shifts.
  - **Forensic Inspection API (`/inspect`)**: Returns bidirectional `RoleToStationMap` and `StationToRoleMap` along with `RoleHistory` corresponding specifically to the inspected time window.
  - **Master MP4 Export Pipeline**: When external systems request a cut for "Commander" at a given time window, `AdvanceJobManager` resolves the role alias to the physical machine that actually operated as Commander **during that historical time range**, completely preventing accidental extraction of stations that only assumed the role at a later date.


### 7. Universal 1-Based Display & Screen Numbering Standard across UI, DTOs & Export Pipeline (2026-11-02)

- **Requirement & Mission Objective**:
  - In tactical command centers and multi-display environments, screen numbering must strictly start from **1** (`Screen 1`, `Screen 2`, `Display 1`, `Display 2`) across all operator interfaces, timeline tracks, inspector dialogs, and external API responses.
  - Exposing raw zero-indexed hardware device keys (e.g. `mon-0`) in user badges, tooltips, or director cut segments is prohibited.
- **Data Model & DTO Standard**:
  - `DisplayMetadataDto`: Added `DisplayNumber` (`int`, 1-based) alongside `DisplayName` (`"Screen 1"`, `"Screen 2"`).
  - `StationDirectorSegmentDto` and `DirectorCutSegmentDto`: Added `TargetDisplayNumber` (`int`, 1-based) and `TargetDisplayName` (`string`, e.g. `"Screen 1"`, `"Screen 2"`).
  - `StationDisplayInspectionDto`: Emits `DisplayNumber` (1, 2...) and clean `DisplayName` without hardware suffixes.
- **Auto-Director Bitrate Focus Hysteresis Resolution**:
  - In dual/multi-display environments where keystroke coordinates are unmapped, `ComputeStationDirectorPlanAsync` infers focus transitions by comparing chunk encoding bitrates across monitors over time slices.
  - Previous implementations emitted isolated `MouseMove` events that were discarded by the hysteresis minimum dwell threshold (`minDwellMs`). The analyzer now tracks active display continuity (`lastActiveDisp`) and triggers immediate cut transitions (`ActivityEventType.MouseClick`) when encoding bitrate shifts between displays and smoothly returns to the primary monitor when active work returns.
- **Bidirectional Display Identifier Resolution (`AdvanceJobManager.cs`)**:
  - External API clients and UI components can refer to displays using any convention:
    - 1-Based Numbers: `"1"`, `"2"`, `"3"`
    - Tactical Names: `"Screen 1"`, `"Screen 2"`, `"Display 1"`, `"Display 2"`
    - Hardware Keys: `"mon-0"`, `"mon-1"`, `"mon-2"`
  - `ResolveTargetDisplayKey` and `MatchesDisplay` automatically normalize and resolve these references to the appropriate track and stream segments, ensuring 100% interoperability without breaks.
- **Frontend Living UI Alignments**:
  - `DirectorTrack.jsx`: Active badge displays `⚡ AUTO: SCREEN 1` or `✋ OVERRIDE: SCREEN 2`. Timeline segment badges display `SCREEN 1` / `SCREEN 2`. Hover quick-action buttons display `1`, `2` (1-based).
  - `StudioVideoFeed.jsx`: Split view pane headers render `SCREEN 1` and `SCREEN 2`. PiP inset header renders `PiP: SCREEN 2`. Multicam Punch buttons render `SCREEN 1`, `SCREEN 2`. Orientation banner renders `⚡ AUTO-DIRECTOR: SCREEN 1` (or active screen).
  - `PersistentMinimapHud.jsx`: Radar overlay displays active orientation as `SCREEN 1` / `SCREEN 2` with numeric nodes `1`, `2`.
  - `SoloSpotlightModal.jsx`: Export cut action button displays `EXPORT CUT (SCREEN 1)` or `EXPORT CUT (SCREEN 2)`.

---

## 30. Visual Canvas Composer, Multi-Keyframe Layout Timeline & Dynamic Master Synthesis (2026-11-02)

### 1. Architectural Mission & Operational Scope
In mission-critical command centers, forensic incident replay requires more than fixed split or PiP matrices: operators and automated directing agents require full visual authority to compose arbitrary multi-workstation and multi-monitor layouts, position and size feeds dynamically on a master 16:9 canvas, and sequence layout transitions over time.

To realize this capability, ExtractorAdvanced introduces:
1. **Interactive Visual Canvas Composer (`CanvasComposerModal.jsx`, `CanvasComposerModal.scss`)**: A rich tactical NOC interface allowing operators to drag, resize, layer, and style feeds on a responsive 16:9 canvas (simulating 1920×1080 master output).
2. **Layer Stacking Depth Engine (Z-Index / "מי מעל מי")**: Complete stacking order control with Bring Forward, Send Backward, Bring to Front, and Send to Back capabilities, custom border widths, and tactical highlight colors (`#06B6D4`, `#10B981`, `#F43F5E`, `#F59E0B`).
3. **Multi-Keyframe Layout Timeline (`CanvasLayoutTimelineDto`)**: Temporal keyframing allowing layouts to be applied globally across the entire cut, or modified dynamically at specific playhead timepoints with smooth animations (`smooth` fade/cross-reveal), instantaneous cuts (`cut`), or dips to black (`dip`).
4. **Universal Data Model (JSON & XML)**: Native JSON and XML serialization enabling external C2 systems and API clients to query, import, and submit custom timeline keyframes programmatically.
5. **Dynamic FFmpeg Master MP4 Multi-Interval Synthesis (`AdvanceJobManager.cs`)**: Automatic backend rendering that partitions the export duration into discrete keyframe intervals, renders per-interval composites with aspect-ratio scaling and tactical burn-in labels, applies transition filters, and concatenates intervals into a single standalone MP4 with synchronized master audio.

---

### 2. Interactive Canvas Composer & Studio Integration
- **Studio Entry Points**:
  - `TopScopeBar.jsx`: Prominent `🎨 CANVAS COMPOSER` button styled with tactical glowing gradient in the studio top bar.
  - `MulticamViewport.jsx`: Integrated `🎨 CANVAS` tab in the layout selector bar, allowing immediate switching and composition.
- **Left Panel (Presets & Feeds Inventory)**:
  - **Quick Presets**: 50/50 Split (Horizontal / Vertical), PiP Inset (Top-Right / Bottom-Right), Quad 2×2 Matrix, and 1 Hero + 2 Stacked.
  - **Feeds Inventory**: Enumerates all workstations in the timeline with assigned operational roles (e.g. `COMMANDER (WS-01)`), and displays all monitors strictly starting from **1** (`Screen 1`, `Screen 2`). Clicking `+ Add` inserts the feed onto the canvas with an automatically incremented Z-Index.
- **Center Workspace (Interactive Canvas Stage & Keyframe Strip)**:
  - **16:9 Stage**: Renders positioned feeds with real-time coordinate readouts, center guides, and selection halos.
  - **Drag & Resize Engine**: Mouse-driven box translation with edge boundaries and center snapping. Bottom-right corner resize handle dynamically updates width and height while maintaining hardware-even pixel bounds.
  - **Keyframe Controls**:
    - `🌐 Apply to Entire Timeline (Global)`: Sets a single master layout governing the entire export duration.
    - `⏱️ Add Keyframe at Playhead`: Inserts a keyframe at the current playhead timestamp (`playheadEpochMs`).
    - **Transition Selector**: Configures incoming transition behavior: `smooth` (fade in/cross-reveal), `cut` (instant cut), or `dip` (dip-to-black), with a configurable duration slider (0.1s – 2.0s).
    - **Keyframe Track Bar**: Visual strip displaying keyframe chips with relative timestamp offsets (`+15.0s (🌊)`), allowing instant selection, inspection, or deletion.
- **Right Panel (Layer Depth & Property Inspector)**:
  - Live inspection of selected feed: Station ID, Display Name (`Screen 1`, `Screen 2`), Burn-In Label, Position `(X, Y)` and Size `(W, H)`.
  - **Z-Index Stacking Actions**: `Bring Forward`, `Send Backward`, `To Front`, `To Back`.
  - **Tactical Borders**: Width selector (0px, 2px, 4px, 6px) and color palette picker.
  - **Layer Stack Hierarchy**: Reversed visual stack displaying all canvas items ordered from top layer to base layer.

---

### 3. Universal JSON & XML Specification
External C2 systems, forensic APIs, and the UI communicate layout timelines using standardized JSON and XML models:

#### JSON Schema (`CanvasLayoutTimelineDto`):
```json
{
  "keyframes": [
    {
      "timestampEpochMs": 1700000000000,
      "transitionType": "smooth",
      "transitionDurationSec": 0.5,
      "layout": {
        "width": 1920,
        "height": 1080,
        "backgroundColor": "#070A10",
        "fps": 30.0,
        "placements": [
          {
            "stationId": "WS-01",
            "displayId": "mon-0",
            "x": 0, "y": 0, "width": 960, "height": 1080,
            "zIndex": 0,
            "borderWidth": 2, "borderColor": "#06B6D4",
            "label": "COMMANDER - Screen 1"
          },
          {
            "stationId": "WS-02",
            "displayId": "mon-0",
            "x": 960, "y": 0, "width": 960, "height": 1080,
            "zIndex": 1,
            "borderWidth": 2, "borderColor": "#10B981",
            "label": "RADAR SPECIALIST - Screen 1"
          }
        ]
      }
    },
    {
      "timestampEpochMs": 1700000015000,
      "transitionType": "dip",
      "transitionDurationSec": 0.3,
      "layout": {
        "width": 1920,
        "height": 1080,
        "backgroundColor": "#070A10",
        "fps": 30.0,
        "placements": [
          {
            "stationId": "WS-01",
            "displayId": "mon-0",
            "x": 0, "y": 0, "width": 1920, "height": 1080,
            "zIndex": 0,
            "label": "COMMANDER - FULLSCREEN"
          },
          {
            "stationId": "WS-02",
            "displayId": "mon-0",
            "x": 1380, "y": 40, "width": 500, "height": 281,
            "zIndex": 10,
            "borderWidth": 3, "borderColor": "#06B6D4",
            "label": "RADAR PIP"
          }
        ]
      }
    }
  ]
}
```

#### XML Schema (`<CanvasLayoutTimeline>`):
```xml
<?xml version="1.0" encoding="utf-8"?>
<CanvasLayoutTimeline>
  <Keyframe timestampEpochMs="1700000000000" transitionDurationSec="0.5" transitionType="smooth">
    <Layout>
      <Width>1920</Width>
      <Height>1080</Height>
      <BackgroundColor>#070A10</BackgroundColor>
      <Fps>30</Fps>
      <Placement>
        <StationId>WS-01</StationId>
        <DisplayId>mon-0</DisplayId>
        <X>0</X>
        <Y>0</Y>
        <Width>960</Width>
        <Height>1080</Height>
        <ZIndex>0</ZIndex>
        <BorderWidth>2</BorderWidth>
        <BorderColor>#06B6D4</BorderColor>
        <Label>COMMANDER - Screen 1</Label>
      </Placement>
    </Layout>
  </Keyframe>
</CanvasLayoutTimeline>
```

---

### 4. Automated Multi-Interval FFmpeg Master MP4 Synthesis
In `AdvanceJobManager.cs`:
1. **Station Aggregation & Temporal Role Resolution**:
   - Gathers distinct station IDs across all placements across all keyframes.
   - For each keyframe timestamp, resolves operational roles (e.g. "Commander") using `IStationRoleProvider.GetStationRoleAliasesForTimeRangeAsync(kfEpoch, kfEpoch + 1000)`. If roles changed historically, each interval binds to the station that held that role at that time.
2. **Timeline Partitioning**:
   - Keyframes are sorted by `TimestampEpochMs`.
   - The export window $[T_{in}, T_{out}]$ is sliced into continuous intervals $[t_j, t_{j+1}]$ with durations $D_j$.
3. **Per-Interval Filtergraph Construction**:
   - Interval Base: `color=c={bgHex}:s={W}x{H}:d={D_j}[bg_int_j];`
   - Feed Processing: Each placement trims its input track with `trim=start={t_j}:end={t_{j+1}},setpts=PTS-STARTPTS`, scales with aspect preservation, pads, applies tactical borders (`drawbox`), and burns labels (`drawtext`).
   - Daisy-Chain Stacking: Overlaid in `ZIndex` ascending order:
     `[bg_int_j][p_j_0]overlay=x:y[t_j_0]; [t_j_0][p_j_1]overlay=x:y... -> [raw_int_j]`
   - Transition Filtering:
     - For incoming `smooth` or `dip` transitions ($j > 0$): applies `fade=type=in:start_time=0:duration={transDur}`.
     - For outgoing `dip` transitions ($j < M - 1$): applies `fade=type=out:start_time={D_j - nextTransDur}:duration={nextTransDur}`.
4. **Seamless Interval Concatenation**:
   - Visual streams are concatenated: `[v_int_0][v_int_1]...concat=n=M:v=1:a=0[vbase]`.
   - Combined with synchronized master audio routing (`[outa]`), faststart streaming flags (`-movflags +faststart`), and hardware encoding (NVENC / Intel QSV / libx264).
   - Produces a single, perfectly synchronized, standalone MP4 playable in any video player.

---



## 31. Multi-Tier Video Quality, Output Resolution & Bitrate Scaling Engine (2026-11-02)

### 1. Architectural Mission
To support diverse operational workflows—ranging from rapid, lightweight forensic exports over constrained links to ultra-high-density forensic reviews on large command wall displays—the export pipeline features an end-to-end **Video Quality & Resolution Scaling Engine**.

The engine dynamically translates operator or API quality selections into proportional canvas geometry, scaled typography, border strokes, hardware encoder rate-control parameters, and monotonically estimated export file sizes.

---

### 2. Standardized Quality & Resolution Profiles

The platform standardizes on four deterministic quality tiers:

| Tier Identifier | Aliases | Target Resolution | Target Bitrate | Est. Output File Size | Operational Profile |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`HD`** | `720p`, `720`, `1280x720` | **1280 x 720** | **2,500 kbps** | **~19.7 MB / min** | Compact payload, rapid rendering; optimized for low-bandwidth networks or preliminary triage. |
| **`FHD`** *(Default)* | `1080p`, `1080`, `1920x1080`, `FullHD` | **1920 x 1080** | **6,000 kbps** | **~45.9 MB / min** | Standard high-fidelity NOC master output; optimal balance of visual clarity and storage efficiency. |
| **`2K`** | `1440p`, `1440`, `2560x1440`, `QHD` | **2560 x 1440** | **12,000 kbps** | **~90.9 MB / min** | High pixel density; preserves fine font readability, terminal telemetry, and complex multi-window splits. |
| **`4K`** | `2160p`, `2160`, `3840x2160`, `UHD` | **3840 x 2160** | **24,000 kbps** | **~180.9 MB / min** | Maximum forensic fidelity; uncompromised clarity for massive multi-monitor canvases on video walls. |

---

### 3. Proportional Geometry & Typography Scaling Math

When canvas layouts designed in the default 1080p virtual editor (1920 x 1080) are exported at alternative resolutions, coordinates and visual elements scale proportionally without distortion:

1. **Scale Factors**:
   - `scaleX = targetWidth / referenceWidth`
   - `scaleY = targetHeight / referenceHeight`
2. **Placement Dimensions & Positioning**:
   - For normalized placements (`0 < w <= 1.0`):
     - `TargetW = round(w * targetWidth)`, `TargetX = round(x * targetWidth)`
   - For absolute pixel placements (`w > 1.0`):
     - `TargetW = round(w * scaleX)`, `TargetX = round(x * scaleX)`
   - Even-pixel clamping: all dimensions and coordinates are aligned to multiples of 2 for strict H.264 / `yuv420p` encoder compliance (`w -= w % 2`, `x -= x % 2`).
3. **Burn-In Label Font Size**:
   - `ScaledFontSize = max(10, round(13 * scaleX))` (10px on 720p, 13px on 1080p, 17px on 2K, 26px on 4K)
4. **Tactical Placement Borders**:
   - `ScaledBorderWidth = max(1, round(baseBorder * scaleX))`

---

### 4. Hardware Encoder Rate-Control Integration

`FfmpegBinaryResolver` injects dynamic bitrate limits into NVIDIA NVENC, Intel QuickSync QSV, and CPU libx264 software encoders:
- Appends or overrides `-b:v {targetBitrateKbps}k -maxrate {targetBitrateKbps}k -bufsize {targetBitrateKbps}k`.
- Maintains CBR/VBR rate control ensuring predictable output bitrates matching the chosen tier.

---

### 5. Multi-Tier File Size Estimation Formula

For an active export duration $D$ (in seconds), `EstimateCutJobAsync` and `EnqueueAdvanceCutJob` calculate estimated file size in bytes:
- `EstimatedBytes = max(5 MB, (((targetBitrateKbps + 128) * 1000) / 8) * D)`
Where 128 kbps accounts for the synchronized AAC stereo audio master mix.

---

### 6. User Interface Integration

1. **Export Options Confirmation Modal (`ExportOptionsModal.jsx`)**:
   - Features a dedicated **2x2 Tactical Quality Grid** allowing one-click selection between HD, FHD, 2K, and 4K.
   - Each card displays real-time badges, pixel dimensions, bitrate metrics, and operational descriptions.
   - Selected resolution is dynamically reflected in the composition summary header and the confirm action button (`CONFIRM & EXPORT MASTER MP4 (FHD 1080p)`).
2. **Visual Canvas Composer Studio (`CanvasComposerModal.jsx`)**:
   - Header contains responsive resolution pills: `[ 720p HD | 1080p FHD | 2K QHD | 4K UHD ]`.
   - Dynamic canvas badge displays real-time target dimensions (`3840x2160 4K UHD`, `1920x1080 FHD`, etc.).
   - Persists selected resolution across keyframe editing, timeline saves, and master composition requests.


---
## 32. WYSIWYG Master Canvas Grid Studio, Direct Layout Editing & Screen Switching Architecture (2026-11-02)

### 1. Unified Master Canvas Grid Concept & Elimination of Obsolete Modes
Prior iterations presented a conceptual disconnect between the multi-station matrix grid and canvas export composition, featuring detached modals and obsolete layout modes (`SPLIT`, `PIP`, `INTER-STATION`, `INTRA-STATION`). In accordance with core directives:
- **The Viewport Grid IS the Canvas Stage**: The studio multicam viewport is housed in a fixed 16:9 Master Video Frame (`aspect-ratio: 16 / 9`, background `#070A10`), representing the exact 1920x1080 master MP4 export canvas.
- **Pure Canvas Presets**: Obsolete split/pip tabs are replaced by standardized canvas presets:
  - `⊞ 1x1`: Single full-frame feed.
  - `⊞ 1x2 DUAL`: 2 equal columns side by side (Slot 0 left, Slot 1 right).
  - `⊞ 3-GRID`: 3 feeds (Slot 0 top-left, Slot 1 top-right, Slot 2 bottom-center).
  - `⊞ 2x2 QUAD`: 4 feeds in a 2x2 quad matrix.
  - `⊞ AUTO-GRID`: Optimal 16:9 placement based on active feed count.

### 2. Direct Layout & Feed Composition on the Grid
All composition actions are performed directly on the grid itself without opening detached dialogs:
1. **Interactive Slot Reordering**:
   - **HTML5 Drag & Drop**: Operators can drag any slot card and drop it onto another to instantly swap their canvas positions (`handleSwapSlots`).
   - **Quick Swap Actions**: Toolbar button `⇄ SWAP FEEDS` (swaps slots 0 and 1) and per-card `⇄` quick-swap button.
2. **Per-Slot Screen Picker Pills**:
   - For multi-monitor workstations, each card topbar presents instant screen picker pills: `[ ⚡ Auto | 🖥 1 | 🖥 2 ]`.
   - `⚡ Auto` enables the Auto-Director, smoothly following keyframe cuts across monitors.
   - `🖥 1` / `🖥 2` locks the slot to that specific physical screen.
3. **Single Workstation Multi-Screen Composition**:
   - When a single multi-display workstation is selected in `1x2` or `2x2` preset, Slot 0 automatically binds to Screen 1 and Slot 1 to Screen 2, allowing side-by-side multi-screen review and export.

### 3. WYSIWYG Export Parity & Backend Pipeline Integration
1. **Live Preview Fidelity**:
   - Scrubbing and synchronous playback in the Studio Viewport displays the exact active monitors, slot assignments, and Auto-Director screen cuts that will be rendered by FFmpeg.
2. **Direct Layout Dispatch**:
   - `MulticamViewport` calculates pixel-perfect 1920x1080 placement geometry (`getCanvasPlacementsForExport`) and broadcasts it to `ExtractorAdvancedStudio`.
   - On clicking `EXPORT`, the master export dialog takes the visible `canvasLayout` directly (`layoutMode: 'canvas'`), guaranteeing that the exported MP4 video is 100% WYSIWYG identical to the preview.
3. **Automatic Dwell-Time Compliance**:
   - In accordance with `SystemConfig.AutoDirector.MinDwellSeconds` (default 10s, configurable in system settings), Auto-Director cuts guarantee stable, non-jarring screen dwell times in both the preview player and the master MP4.

### 4. Solo Focus & Fullscreen Display Transitions
1. **Solo Focus Mode**:
   - Selecting a workstation into Solo mode automatically defaults to `canvas` view (Virtual Topology Canvas), while remembering the operator's last layout choice in `localStorage`.
2. **Display-Preserving Fullscreen**:
   - Entering Cinema Fullscreen / Spotlight from a card or topology monitor automatically focuses on the exact screen clicked (`spotlightInitialDisplayId`), eliminating redundant screen re-selection.

---
## 33. Air-Gapped Fontconfig Elimination & FFmpeg Custom Canvas Hardening (2026-11-02)

### 1. Root Cause Analysis: Windows Fontconfig Crash (Exit Code -1073741819 / 0xC0000005)
When FFmpeg executes the `drawtext` video filter without an explicit `fontfile` argument (e.g. `drawtext=text='Station 1':...`), it delegates font resolution to `libfontconfig`.
- In standard Windows installations and air-gapped environments, fontconfig searches for `/etc/fonts/fonts.conf` (or Unix-style paths) which do not exist.
- It logs `Fontconfig error: Cannot load default config file: File not found` and subsequently attempts to dereference an uninitialized configuration struct, causing an immediate segmentation fault / access violation (`STATUS_ACCESS_VIOLATION`, exit code `0xC0000005` / `-1073741819`).

### 2. Resolution Strategy & Bypassing Fontconfig
To completely eliminate `libfontconfig` initialization:
1. **Dynamic Font Discovery (`ResolveSystemFontClause`)**:
   - Both `AdvanceJobManager` and `NoSignalPatternService` inspect local system font paths dynamically:
     - **Windows**: `Environment.GetFolderPath(Environment.SpecialFolder.Fonts)` probing `arial.ttf`, `segoeui.ttf`, `tahoma.ttf`, `consola.ttf`, and standard fallback `C:/Windows/Fonts/arial.ttf`.
     - **Linux**: `/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf`, `/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf`, etc.
   - When located, the path is normalized (`\` to `/` and `:` to `\:`) and formatted as `fontfile='{normalized}':`.
   - By supplying `fontfile` directly to `drawtext`, FFmpeg's `libfreetype` reads the font file from disk directly, bypassing `libfontconfig` 100%.
2. **Safe Fallback**:
   - If no system font file exists on disk, `drawtext` is safely omitted from the filtergraph while preserving all other canvas features (scaling, padding, border `drawbox`, overlays, audio multiplexing). This prevents any risk of FFmpeg crash.
3. **Automated Verification**:
   - Regression tests in `ExternalApiAndCustomCanvasTests.cs` (`ResolveSystemFontClause_ReturnsValidFontClause_WhenFontsExistOnSystem` and `ResolveSystemFontClause_BypassesFontconfig_AndRunsSuccessfullyInFfmpeg`) assert font resolution and verify FFmpeg execution with 0 error exit code and zero Fontconfig errors.

---
## 34. Studio Canvas Dimension Stabilization & Frame Quantization (2026-11-02)

### 1. Root Cause Analysis: Black Screen in Studio Canvas Mode
When rendering multi-monitor workstations in Studio Canvas mode (`viewMode === 'canvas'`), the display rendered completely black due to three distinct compounding factors:
1. **Container Dimension Collapse (0px by 0px)**:
   - In `StudioVideoFeed.scss`, `.feed-canvas-board` was styled with `width: auto; height: auto; max-width: 100%; max-height: 100%`.
   - Because all monitor pane children (`.canvas-display-pane`) use `position: absolute`, the flex child board had zero intrinsic content dimensions and collapsed to `0px x 0px` inside the centering flex container.
   - The parent `.feed-canvas-container` had a solid black background (`#070A10`), rendering an entirely blank/black viewport.
2. **Playhead Scrubbing / Playback Abort Thrashing**:
   - In `StudioVideoFeed.jsx`, the frame extraction `useEffect` was keyed directly to `playheadMs`. During playback or rapid scrubbing, `playheadMs` updated every ~30ms, causing the cleanup function to trigger `abortController.abort()` on every frame request before any response could complete.
   - As a result, `canvasFrames` remained empty `{}` indefinitely, leaving placeholders or un-rendered frames.
3. **Premature Auto-Solo Lockout for Single Workstations**:
   - In `ExtractorAdvancedStudio.jsx`, an effect forcibly set `activeStationId = singleId` whenever `selectedStationIds.length === 1`. This immediately locked single workstations (such as `OHAD-DESKTOP`) into Solo Focus mode instead of allowing them into the multi-slot Master Canvas Grid.
4. **Stacked Monitor Coordinate Collisions**:
   - In `VirtualTopologyCanvas.jsx`, when an agent reported multiple monitors sharing `(X=0, Y=0)` without explicit virtual desktop offsets, both monitors rendered stacked directly on top of each other at `left: 0%, top: 0%`.

### 2. Resolution & Invariants Enforced
1. **Dynamic Pixel-Sized Board (`ResizeObserver`)**:
   - `StudioVideoFeed.jsx` mounts a `ResizeObserver` on `canvasContainerRef` and calculates pixel-perfect dimensions (`canvasBoardSize`) based on available container dimensions minus padding, scaling to match `topologyBounds.totalWidth / topologyBounds.totalHeight`.
   - `.feed-canvas-board` now explicitly specifies `width: ${canvasBoardSize.width}px; height: ${canvasBoardSize.height}px`, completely preventing 0x0 flex collapse.
2. **Frame Request Quantization (250ms Buckets)**:
   - Playhead updates are quantized via `Math.round((baseEpochMs + playheadMs) / 250) * 250`.
   - Rapid scrubbing or playback updates no longer thrash or abort in-flight thumbnail/frame requests, stabilizing frame rendering.
3. **Tactical Skeleton Loading Beacon**:
   - When a display frame is pending decode, `.canvas-pane-placeholder` renders an animated radar beacon pulse (`SYNCING {dispName}...`) with cyan accents instead of a dark blank screen.
4. **Single-Station Multi-Monitor WYSIWYG Auto Layout**:
   - When a single multi-monitor workstation is loaded, `MulticamViewport` automatically maps monitor 0 to Slot 0 and monitor 1 to Slot 1 in `1x2`, `2x2`, and `auto` presets. Single workstations enter directly into the Master Canvas Grid for WYSIWYG editing.
5. **Normalized Horizontal Fallback Coordinates**:
   - In `VirtualTopologyCanvas.jsx`, when all monitors report `(0, 0)`, coordinates dynamically fallback to horizontal concatenation (`cumulativeX += dWidth`), ensuring zero display occlusion.

---
## 35. Live Grid Master Canvas Composer, Free Transform Engine & Timeline Keyframe Animation (2026-11-02)

### 1. Operational Scope & Architectural Motivation
Previously, the Canvas Composer existed as a detached secondary modal dialog accessible via a toolbar button, separating composition from the active studio workspace. Furthermore, grid layouts were restricted to rigid slot structures without continuous multi-station presentation, free spatial transformation, or keyframed timeline animation.

The Live Grid Master Canvas Composer unites workspace playback, freeform composition, keyframe timeline animation, and high-definition WYSIWYG export directly into the central studio viewport:
1. **Unified Grid Composer**:
   - The detached side modal has been eliminated. The primary workspace grid (`MulticamViewport`) natively functions as the Live Canvas Composer.
2. **Default High-Density Presentation**:
   - By default, all available stations and displays are packed onto the virtual 16:9 canvas (`1920x1080` coordinate space) in an optimal aspect-ratio fitted layout, ensuring full operational coverage.
3. **Freeform Direct Manipulation & 60fps Modal Parity**:
   - **Full-Surface Drag (`card-drag-surface`)**: The entire window area (not just a 22px title bar) responds immediately to mouse down, enabling fluid, effortless dragging matching `CanvasComposerModal`.
   - **Solo Mode Decoupling**: In the Live Canvas Composer grid, `<CameraCard>` operates with `onSelectActiveStation={null}` to prevent click hijacking and accidental mode switching. Solo mode remains accessible via the dedicated `🔍 SOLO` tool in the floating inspector.
   - **Global Drag Shield (`canvas-global-drag-shield`)**: When dragging or resizing begins, a transparent fullscreen shield (`fixed, inset 0, z-index 999999`) captures all mouse events, guaranteeing pointer events are never lost over nested video elements or window bounds.
   - **Zero-Latency 60fps Tracking**: CSS transitions are suppressed (`transition: none !important`) during drag and resize gestures for instantaneous response.
   - **Magnetic Snap Guidelines**: Renders glowing cyan guidelines (`canvas-snap-guide-v`, `canvas-snap-guide-h`) with 16–18px magnetic snapping to 50% centerlines and 0%/100% canvas borders.
   - **HUD Coordinate Badge**: Live display of dimensions and coordinates (`W×H @ (X,Y)`), layer, and rotation angle directly in the card header.
   - **Scaling (Resize)**: Corner drag handles (`↘`) for interactive resizing with optional 16:9 aspect constraint.
   - **Rotation**: Integrated 90° stepping (`↺ 90°`) and continuous angle adjustment (-180° to +180°) rendered via CSS transforms (`rotate(θ deg)`).
   - **Border & Layer Styling**: Floating tactical inspector providing real-time palette selection (`#06B6D4` Cyan, `#10B981` Emerald, `#F59E0B` Amber, `#F43F5E` Rose, `#A855F7` Purple, `#38BDF8` Sky, `#FFFFFF` White, `transparent`), border thickness (0px, 2px, 4px, 6px, 8px), and Z-Index stacking order.
4. **Timeline Keyframe Animation & Interpolation Engine**:
   - **Keyframe Capture**: Keyframes can be added at the current playhead timestamp with a single click, recording current placements and spatial transforms.
   - **Transition Types**: Operators can configure transitions between keyframes:
     - `Smooth Ease`: Cubic bezier ease-in-out interpolation of X, Y, Width, Height, and Rotation.
     - `Linear`: Constant velocity transformation.
     - `Instant Cut`: Discrete layout switch at keyframe timestamp.
     - `Crossfade`: Smooth opacity crossfade.
     - `Dip to Black`: Symmetric luminance fade-out and fade-in.
   - **Live Real-Time Playback Interpolation**: Scrubbing or playing on the timeline dynamically computes intermediate feed positions and smoothly renders real-time motion on the live canvas.
   - **Dedicated Timeline Track (`CanvasKeyframeTrack`)**: Visual representation of layout keyframes directly on `TimelineBoard` with interactive seek, selection, and deletion.
5. **Backend Export Parity, Rotation & Shadow Support**:
   - `CanvasPlacementDto.Rotation`, `ShadowEffect`, and `BorderRadius` added in `AdvanceJobInfo.cs`.
   - `AdvanceJobManager.cs` synthesizes FFmpeg `rotate` filter clauses (`rotate={radStr}:ow='rotw({radStr})':oh='roth({radStr})':c=none`) alongside `scale`, `pad`, and `drawbox` operations for both single layouts and multi-keyframe interval timelines.
6. **Playback Network Stabilization & Live Feeds/Presets Parity**:
   - **Zero-Thrash Stream Playback**: Suppresses all static frame requests (`if (isPlaying) return;`) across `CameraCardFeed.jsx` and `StudioVideoFeed.jsx` during active playback, guaranteeing zero network saturation and seamless continuous H.264 stream decode.
   - **Feeds & Displays Inventory Palette (`＋ FEEDS PALETTE`)**: Collapsible tactical drawer displaying all stations and individual displays (Screen 1, Screen 2...) with 1-click `＋ ADD TO CANVAS` and `CLEAR CANVAS` for creating manual canvas layouts from scratch.
   - **Layers Stacking Depth (`≡ LAYERS`)**: Direct visual layer hierarchy manager supporting `⏫ To Front`, `⬆️ Forward`, `⬇️ Backward`, `⏬ To Back`, and individual feed deletion.
   - **Shadow & Glow Effects**: Floating inspector and canvas feed boxes support `Deep Cinema` shadow, tactical glows (`Cyan`, `Emerald`, `Rose`, `Amber`), and custom border widths.
   - **Persistent Custom Presets & JSON Data**: Operators can name and save custom layouts to `localStorage` (`itb_canvas_saved_presets`), recall them instantly from the `📁 SAVED PRESETS` dropdown, or export/import JSON configurations across sessions.

---
## 36. Minimalist Support Tracks, Draggable Keyframes & Live Canvas Auto-Grid Architecture (2026-11-03)

### 1. Operational Scope & UX Enhancements
To optimize tactical operator workflow and eliminate timeline clutter, the studio canvas and timeline tracks have been upgraded:

1. **Default AUTO-GRID & Zero-Blank Initial View**:
   - Workstations and screens populate automatically into `AUTO-GRID` (renamed from `AUTO-PACK`) upon opening the studio, marked as selected and active.
   - User custom edits and placements are preserved in local state (`hasUserCustomizedRef`).
   - A dedicated `↺ RESET CANVAS` button in the toolbar allows operators to immediately revert to a clean, balanced auto-grid of all connected screens at any point.
2. **Draggable Keyframes with Instant Anchoring (`CanvasKeyframeTrack`)**:
   - Initial Keyframe 0 anchors precisely to `baseEpochMs` (`00:00:00` of the timeline), eliminating the artificial 23-second startup offset.
   - Layout keyframe diamond pins (`❖`) support fluid mouse drag (`onMouseDownMarker`) across the timeline surface to adjust transition timestamps dynamically.
   - During drag gestures, a glowing yellow floating badge displays the exact clock timestamp and positive offset (`+XX.Xs`).
3. **Minimalist 26px Unified Support Tracks & 180px Sidebar Alignment**:
   - Both `CanvasKeyframeTrack` (`❖ LAYOUT`) and `AudioRoutingTrack` (`🎙️ AUDIO`) have been streamlined into compact, single-row 26px heights, matching the height and style of `DirectorTrack`.
   - The sidebar header cell across all tracks strictly adheres to the 180px standard width, eliminating header misalignments and redundant vertical stacking.
4. **Timeline Track Stacking Order**:
   - Primary station video tracks (`TimelineTrack`) and display director tracks (`DirectorTrack`) render at the top of the timeline board.
   - All global support tracks (`AudioRoutingTrack` and `CanvasKeyframeTrack`) are grouped together at the bottom of the timeline board, one after the other.
5. **Multi-Corner Freeform Resizing & Tactical Hotkeys**:
   - Selected card boxes feature four corner resize handles (`tl`, `tr`, `bl`, `br`) supporting aspect-locked (Shift) and freeform scaling from any direction.
   - Keyboard shortcuts: `Delete` / `Backspace` removes selected boxes, `Escape` dismisses drawers and popovers, arrow keys nudge selected feeds by 10px (or 1px with Shift), and `+` adds a layout keyframe at the current epoch.
   - The redundant `WYSIWYG MASTER CANVAS STUDIO` center badge has been removed from the canvas toolbar to maximize operational screen real-estate.
6. **Strict Unix Epoch Millisecond Time-Anchor & Cross-Track Synchronization**:
   - All interval boundaries, cut points, keyframes, and audio routing segments are strictly stored, manipulated, and exported in absolute Unix Epoch milliseconds (`EpochMs`, UTC-anchored).
   - Toggling between `LOCAL` and `UTC` time modes in `TopScopeBar` only modifies the textual presentation in `formatTimelineClock` with zero drift in the underlying cut data.
   - Time-range scope updates and bookmark loading re-anchor existing keyframes and audio routing segments to prevent stale offsets from old sessions.
   - Audio routing track supports precision splitting directly at mouse click coordinates (`clickEpoch`) or playhead position (`playheadEpoch`) with right-click context menu and time display.
   - Keyframe dragging is stabilized using unique string IDs, updating only local drag state during cursor movement to prevent mid-drag array re-sorting and index corruption.

---

## 37. Non-Standard Aspect Ratio Preservation & CTRL-Locked Canvas Resizing (2026-11-03)

### 1. Architectural Challenge: Non-Standard Workstation Displays
Operational workstations in air-gapped environments frequently feature non-standard display geometries:
- Ultra-wide monitoring screens (21:9, 32:9).
- Vertical/portrait document and code monitors (9:16).
- Legacy 4:3 and 5:4 square radar/telemetry displays.
- Standard 16:10 laptop/desktop monitors.

Previously, auto-grid packing and canvas additions assumed fixed 16:9 boxes, leading to black pillarbox/letterbox bars or distorted aspect ratios when repositioned or scaled manually.

### 2. Multi-Aspect Native Preservation Engine (`MulticamViewport.jsx`)
1. **Source Geometry Discovery**:
   - Every available display feed probes and maintains its recorded native resolution (`sourceWidth`, `sourceHeight`) and computes `nativeAspectRatio = sourceWidth / sourceHeight`.
   - `getReadableAspectRatio(w, h)` classifies ratios into clear tactical badges: `16:9`, `4:3`, `16:10`, `21:9`, `32:9`, `5:4`, `9:16`, `1:1`, or `X.XX:1`.
2. **Auto-Grid Proportional Cell Packing (`fitInCell`)**:
   - When calculating auto-grid layouts (1x1, 1x2, 2x2, 3-screen, 5+ screen dynamic grids), each screen is bounded inside its assigned grid cell using `fitInCell(cellX, cellY, cellW, cellH, nativeAspectRatio)`.
   - The feed maintains its exact recorded proportions centered inside the cell without stretching or squishing.
3. **CTRL / Shift Aspect Ratio Lock Across All 4 Resize Corners**:
   - When dragging any of the 4 corner resize handles (`tl`, `tr`, `bl`, `br`), holding **`CTRL`** (or `Shift`) locks scaling strictly to the recorded native aspect ratio (`nativeRatio = sourceWidth / sourceHeight`).
   - Freeform resizing remains available when releasing the modifier keys.
4. **One-Click Native Ratio Snap (`📐 NATIVE RATIO`)**:
   - The floating tactical inspector above selected feeds features a dedicated snap button: `📐 NATIVE (W:H)`.
   - Clicking it instantaneously snaps the placement's dimensions to match its recorded aspect ratio while respecting the canvas boundary limits.
5. **Real-Time Dimension & Aspect Ratio HUD**:
   - The draggable top bar of each canvas window displays real-time dimensions and aspect ratio tags: `{width}×{height} ({readableAspect}) @ ({x},{y})`.

---

## 38. Zero-Collapse Master Canvas Stage & Responsive ResizeObserver Architecture (2026-11-03)

### 1. Root Cause Analysis: The 4-Pixel Slit Showstopper Bug
When opening the forensic studio in Master Canvas Grid mode (`!isSoloMode`), workstations and screens populated on the canvas were rendered completely invisible.
Chrome DevTools inspection revealed that the `.canvas-master-frame-16-9` container had computed dimensions of `724px × 4px`:
1. **The CSS Flexbox Auto-Height Collapse**:
   - `.canvas-master-frame-16-9` was styled with `width: auto; height: auto; aspect-ratio: 16 / 9; max-width: 100%; max-height: 100%;` inside a flex container (`.canvas-stage-wrapper`) with `align-items: center`.
   - Every child of `.canvas-master-frame-16-9` (snap guides, empty guide, and station card boxes) is `position: absolute`.
   - In CSS specification, an element containing exclusively out-of-flow (absolute) children has a min-content height of `0px`.
   - In a flex row layout with `align-items: center`, `height: auto` resolves to the min-content height (`0px`).
   - Adding top border (2px) and bottom border (2px) yielded a total computed height of **exactly 4px** (`724 × 4`).
   - Station cards inside it were scaled to percentages of 4px, resulting in sub-pixel heights where the 22px header completely clipped out the video viewport (`height: calc(100% - 22px) <= 0px`).

### 2. Architectural Solution: Dual-Tier Dynamic Responsive Canvas Engine
1. **JavaScript Dynamic Responsive Measurement (`ResizeObserver`)**:
   - Attached `stageWrapperRef` to `.canvas-stage-wrapper`.
   - Integrated a `ResizeObserver` lifecycle listener inside `MulticamViewport.jsx` that dynamically computes available stage width and height (`availableW`, `availableH`).
   - Computes the exact, maximum 16:9 bounding box that fits inside the stage:
     $$\text{if } \frac{W}{H} \ge \frac{16}{9} \implies H_{\text{final}} = H, \quad W_{\text{final}} = \text{round}\left(H \cdot \frac{16}{9}\right) \quad (\text{pillarbox})$$
     $$\text{else} \implies W_{\text{final}} = W, \quad H_{\text{final}} = \text{round}\left(W \cdot \frac{9}{16}\right) \quad (\text{letterbox})$$
   - Explicit inline pixel dimensions `style={{ width: `${canvasFrameDimensions.width}px`, height: `${canvasFrameDimensions.height}px` }}` are stamped directly onto `.canvas-master-frame-16-9`.
   - Guarantees `canvasFrameRef.current.getBoundingClientRect()` always returns healthy non-zero dimensions for exact mouse drag/resize translations.
2. **CSS Defensive Hardening**:
   - Added `min-height: 240px; min-width: 320px; box-sizing: border-box; padding: 8px;` to `.canvas-stage-wrapper`.
   - Added `min-width: 320px; min-height: 180px; flex-shrink: 0;` to `.canvas-master-frame-16-9`, mathematically eliminating 4px/0px collapses regardless of rendering conditions.
3. **Station Identity Resolution Defense**:
   - In `CameraCardFeed.jsx`, updated station identity resolution to `const stationName = station.hostname || station.name || station.id || ''`.
   - In `MulticamViewport.jsx`, added case-insensitive matching against `allStations` and `timelineStations` with metadata hydration from `availableFeeds`.

### 3. Automated Integrity Regression Tests
Enforced in `ITB-SCREEN-RECORDER.Tests/Frontend/FrontendBundleIntegrityTests.cs`:
- `ExtractorAdvanced_CanvasStageFrame_EnforcesMinDimensionsAndNonCollapsedStyles`: Asserts compiled CSS and SCSS source enforce `min-height: 240px`, `min-height: 180px`, and `min-width: 320px`.
- `ExtractorAdvanced_CanvasResponsiveEngine_HasResizeObserverAndStationFallback`: Asserts production JS bundle includes `ResizeObserver` responsive sizing logic and `station.id` fallback.

---

## 39. Tactical Master Canvas Workspace Normalization, Layer Stacking Hierarchy, Surface Rotation Isolation & Export/Import Architecture (2026-11-03)

### 1. Architectural Problem Analysis
During extensive forensic and multi-station layout editing, five workflow and UI anomalies were identified:
1. **Top-Edge Inspector Invisibility**: When a station card was snapped or moved to the absolute top edge ($y = 0$), its floating tactical inspector (`top: -36px`) was placed above the window bounds, and got clipped out by `.canvas-master-frame-16-9`'s `overflow: hidden`.
2. **Layer Hierarchy Invalidation by Selection**: The layer stacking hierarchy ("מי לפני מי") was broken because `.canvas-feed-card-box.is-selected` had `z-index: 60 !important;` in SCSS, causing any selected window to artificially jump in front of or behind other elements, overriding user-configured layer priorities.
3. **Inspector & Control Skew During Rotation**: When rotating a workstation screen (e.g. 90° portrait / flipped displays), `transform: rotate` was applied to the outer `.canvas-feed-card-box`, causing header titles, badges, resize handles, and the floating inspector menu to rotate diagonally along with the video.
4. **Friction in Canvas Data Sharing**: Inspecting and moving canvas layouts required viewing and manually copying raw JSON blobs from a modal dialog rather than exporting/importing standardized `.json` configuration files.
5. **Solo Viewport Workflow Fragmentation**: The old modal/mode-swapping Solo mechanism completely removed the user from the 16:9 Master Canvas, jarring the editing context when reviewing workstations with multi-monitor configurations.

### 2. Implementation & Architectural Patterns
1. **Adaptive Floating Inspector Positioning**:
   - Integrated geometry boundary detection (`isFlippedDown = p.y < 50; isNearLeft = p.x < 100; isNearRight = (p.x + p.width) > 1820;`).
   - Added `.floating-feed-inspector.is-flipped-down` with `top: 26px`, positioning the inspector immediately beneath the 22px window title bar inside the card when touching the top canvas edge.
   - Realigned shadow dropdowns to open downwards (`top: calc(100% + 4px)`) when flipped down.
2. **Normalized Discrete Layer Stacking Hierarchy**:
   - Removed `z-index: 60 !important;` from `.is-selected`.
   - Normalizes placement layers into discrete sequential 1-based ranks (`Layer #1, #2, #3...`).
   - Stacks elements via `zIndex: (layerRank * 10) + (isThisDragging ? 100 : 0)`. Active selection never overrides layer ordering.
   - Added discrete step controls (`⬇️ -1`, `⬆️ +1`, `⏬ BACK`, `⏫ FRONT`) and displayed `#{layerRank}` badge on window headers.
3. **Inner Surface Rotation Isolation**:
   - Isolated `transform: rotate(...)` to an inner `.feed-rotation-surface` wrapping `<CameraCard>`.
   - The outer card, title bar, resize handles, and floating inspector remain perfectly horizontal and stable while the video screen rotates freely.
4. **1-Click Canvas File Export & Import Engine**:
   - Added `📤 EXPORT CANVAS` downloading timestamped `canvas_layout_YYYYMMDD_HHmmss.json`.
   - Added `📥 IMPORT CANVAS` utilizing a silent file picker reading standard JSON layout schemas.
   - Completely eliminated the legacy raw JSON text modal.
5. **Unified Master Canvas Mode & 1x1 Focus**:
   - Eliminated `isSoloMode` viewport swapping. The Master Canvas Grid is now the single continuous stage.
   - Added `⊞ 1x1 FOCUS` in the inspector which instantly expands the selected station to fill the full 16:9 canvas (1920x1080 at 0,0) without leaving the canvas workspace.
   - Hardened `1x2 DUAL` preset to compute proportional aspect-preserved cells for stations with dual monitors.

---
*End of System Book — ITB-SCREEN-RECORDER Architecture Team*
