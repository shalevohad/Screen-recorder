# 🤖 AI Agent Guidelines & Context — ITB-SCREEN-RECORDER

This document is the primary reference and context for AI coding agents working on the **ITB-SCREEN-RECORDER** repository. All autonomous code generation, refactoring, and debugging must strictly adhere to the patterns and invariants specified herein.

---

## 1. System Mission & Operational Scope

**ITB-SCREEN-RECORDER** is a mission-critical, enterprise command-and-control (C2), screen capture, continuous recording, and real-time telemetry streaming platform engineered for air-gapped environments.

- **Scale**: Designed to continuously capture and monitor 70–100+ high-density workstations (Windows 11 / Linux).
- **Latency**: Sub-second real-time live viewing via WebRTC (WHEP) and Low-Latency HLS.
- **Resource Footprint**: <1% CPU overhead on endpoints through dedicated GPU hardware acceleration (NVIDIA NVENC & Intel QuickSync QSV).
- **Resilience**: 24/7 continuous recording with offline local buffering during network partition, automated self-healing watchdogs, and clock-synchronized forensic export.

---

## 2. Solution Topology & Project Mapping

The repository consists of a modular .NET 8 solution and a modern React 18 frontend:

| Project | Description | Key Source Locations |
| :--- | :--- | :--- |
| **`ITB-SCREEN-RECORDER.Core`** | Shared domain entities, DTOs, IPC contracts, configuration schemas, SQLite logging, and hardware probe. | [Core](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Core) |
| **`ITB-SCREEN-RECORDER.Server`** | Central ASP.NET Core 8 Web API & SignalR C2 server, MediaMTX supervisor, wall-clock chunk rotation scheduler, storage path failover, and WebRTC WHEP proxy. | [Server](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server) |
| **`ITB-SCREEN-RECORDER.Server/ClientApp`** | Tactical C2 Command Dashboard built in React 18 + Vite + SCSS, WebRTC WHEP / HLS player, Station Grid, and live telemetry. | [ClientApp](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp) |
| **`ITB-SCREEN-RECORDER.AgentService`** | Background Windows Service / systemd daemon running in isolated Session 0. Monitors C2, manages watchdogs, and spawns the worker into active user sessions. | [AgentService](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentService) |
| **`ITB-SCREEN-RECORDER.AgentWorker`** | Interactive user-session (Session 1+) capture worker. Captures screen (DXGI DDA), mixed audio (WASAPI loopback + mic), keystrokes, and streams RTMP to MediaMTX. | [AgentWorker](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.AgentWorker) |
| **`Features/Extractor`** | Video extraction and multicam synchronized track cutting engine (`SynchronizedTrackCutter`), gap interpolation, and "No Signal" slate generation. | [Extractor](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor) |
| **`Features/ExtractorAdvanced`** | Advanced forensic replay suite with Near-Live LiveTail DVR scanner, multi-station timeline, and React workspace. | [ExtractorAdvanced](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced) |
| **`Installers`** | Enterprise WiX v4 installers for Windows and systemd / tarball packaging for Linux. | [Installers](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Installers) |
| **`ITB-SCREEN-RECORDER.Tests`** | Unit, integration, and communication test suites. | [Tests](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Tests) |

---

## 3. Core Architectural Rules & Invariants (Must Follow)

The absolute source of truth for behavioral invariants is [RULES.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/RULES.md). Always consult it before modifying recording, storage, or streaming logic:

1. **Rule 1: Wall-Clock Aligned Chunking (Enforced)**
   - Recordings are sliced into deterministic intervals aligned to the wall clock (multiples of `Storage.ChunkIntervalMinutes`, default 5 min).
   - Slicing is executed by [RecordingChunkScheduler.cs](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Services/RecordingChunkScheduler.cs) calling `RotatePathRecordingAsync` on MediaMTX's Control API (`record: false -> true`).
   - Filenames strictly use MediaMTX's `%Y-%m-%d_%H-%M-%S-%f` timestamp format.
2. **Rule 1a & MediaMTX Version Pinning (CRITICAL)**
   - **MediaMTX is pinned to v1.15.4** ([mediamtx.exe](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.exe)). **Do NOT upgrade MediaMTX.** v1.15.5+ introduced internal `ntpDriftTolerance` checks that break wall-clock segmentation under CPU jitter.
   - The RTMP port `19350` is hardcoded in [mediamtx.yml](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.yml).
3. **Rule 2: Storage Dual-Path Failover (Enforced)**
   - Recordings default to primary NetApp UNC ([StoragePathResolver.cs](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/Services/StoragePathResolver.cs)) with a 3-second heartbeat probe.
   - If unreachable, it falls back seamlessly to `Storage.LocalFallbackPath` (`C:\ProgramData\ITB-SCREEN-RECORDER\Recordings`).
4. **Rule 8: Tri-Tier Hardware Encoder Selection (Enforced)**
   - [HardwareProbe.cs](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Core/Diagnostics/HardwareProbe.cs) evaluates encoders in order:
     1. NVIDIA NVENC (`h264_nvenc`, preset `p2`, `-tune ll -forced-idr 1`)
     2. Intel QuickSync (`h264_qsv`, preset `veryfast`, `-low_power 1`)
     3. CPU Software fallback (`libx264`, `-preset ultrafast -tune zerolatency`)
   - Probe results are cached per process to eliminate initialization delays.
5. **Rule 9: Multicam Synchronized Track Cutting & Gap Filling (Enforced)**
   - Handled by [SynchronizedTrackCutter.cs](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/SynchronizedTrackCutter.cs).
   - Global gaps across all stations are trimmed equally.
   - Station-specific internal gaps inject a 5-second synthetic "No Signal" dummy video ([NoSignalPatternService.cs](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/NoSignalPatternService.cs)) sliced to sub-millisecond precision via `ffconcat`.
6. **Rule 10: Near-Live Non-Locking File Access (Enforced)**
   - Hot files (<30 min old) must be opened with non-locking streams:
     ```csharp
     new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete);
     ```
   - FFmpeg probe commands must include `-analyzeduration 1M -probesize 1M -threads 2`.
7. **Rule 11: Multi-Monitor Per-Adapter Capture & Dynamic Hot-Plug (Enforced)**
   - Displays are enumerated across all GPU adapters via DXGI (Windows) or XRandR/PipeWire (Linux). Zero cross-GPU PCIe texture transfers.
   - Stream paths: `live/{hostname}/mon-0` (primary + audio), `live/{hostname}/mon-1` (secondary video).
   - Display hot-plug/unplug dynamically spins up or flushes discrete pipelines without interrupting surviving streams.
8. **Rule 12: High-Density Stream Governance, Canvas Default & Audio Solo Sink (Enforced)**
   - Station cards in Dashboard default to **Virtual Desktop Canvas** layout.
   - Cards off-screen are virtualized (Intersection Observer) to guarantee zero browser decoder exhaustion.
   - **Exclusive Audio Solo**: Only one station plays live audio at any given time in the grid; all other stations remain muted.
   - **Fullscreen Minimap Radar**: Navigating away from Canvas in Fullscreen spawns a clickable Picture-in-Picture Minimap for instant display switching.
9. **Rule 13: Multi-Monitor Export & DVR Dynamic Focus (Persistent HUD & Millisecond Dip-to-Black) (Enforced)**
   - Zero-Time-Drift symmetric fade transitions between active screens.
   - 1-Second Pre-Roll Lead-In ($T - 1000\text{ms}$) on activity focus changes.
   - Persistent tactical Minimap HUD overlay that never fades or dips during transitions.
10. **Rule 14: Air-Gapped & Isolated Environment Invariant (Enforced)**
   - Zero external internet links, remote CDNs (cdnjs, unpkg, jsdelivr), or Google Fonts in code, templates, or styles.
   - Zero outbound analytics or cloud calls. All services and assets are 100% locally self-contained.

---

## 4. Windows Session 0 vs. Session 1 Architecture

Windows security isolates Windows Services in **Session 0** without access to interactive desktop surfaces or audio devices.
- `ITB-SCREEN-RECORDER.AgentService` runs in Session 0 as `NT AUTHORITY\SYSTEM`.
- It monitors active user logons via `WTSGetActiveConsoleSessionId` / WTSSessionNotification.
- When an interactive session (Session 1+) is logged in, it duplicates the user token via Win32 `WTSQueryUserToken` + `DuplicateTokenEx` and spawns `ITB-SCREEN-RECORDER.AgentWorker.exe` inside the user desktop context using `CreateProcessAsUser`.
- Communication between Service and Worker occurs over Named Pipes (`\\.\pipe\ITB_ScreenRecorder_Ipc_*`).

---

## 5. UI/UX & Design Token Conventions

All frontend development in `ClientApp` and `ExtractorAdvanced/Client` must conform to [ui_ux_design_specification.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/Agents/ui_ux_design_specification.md):
- **Tactical Dark Palette**:
  - Backgrounds: `--bg-app: #070A10`, `--surface-panel: #0F172A`, `--surface-card: #151E2E`
  - Accents: `--accent-cyan: #06B6D4`, `--accent-emerald: #10B981` (Live/Healthy), `--accent-rose: #F43F5E` (Drop/Alert), `--accent-amber: #F59E0B`
- **Dynamic Living UI**: Ambient radar pulses, live micro-bars for telemetry, smooth transitions, glassmorphic floating bars.
- **Multi-Monitor Components**:
  - `VirtualTopologyCanvas`: Proportionally positioned monitors reflecting real OS virtual desktop bounds.
  - `StationThumbnail` Switcher: `[ ⊞ Canvas | 🖥 1 | 🖥 2 ]` directly on grid cards.
  - `FullscreenMinimapNavigator`: Interactive HUD minimap with glowing focus indicator and click-to-switch.
  - `MasterAudioDock`: Floating bottom bar for the single active audio listener with live VU meter and volume slider.
- **NEVER** use plain HTML/CSS default colors (`red`, `green`, `blue`).

---

## 6. Build, Test, and Sandboxing Notes

- **Sandboxed Builds**: When building via terminal inside the agent sandbox, write access outside the workspace is restricted. Set `DOTNET_CLI_HOME`:
  ```powershell
  $env:DOTNET_CLI_HOME = "c:\Devlopers\ITB-SCREEN-RECORDER\.tmp_dotnet"; dotnet build --no-restore
  ```
- **Running Tests**:
  ```powershell
  dotnet test ITB-SCREEN-RECORDER.Tests/ITB-SCREEN-RECORDER.Tests.csproj --no-restore
  ```
- **Frontend Development**:
  ```bash
  cd ITB-SCREEN-RECORDER.Server/ClientApp
  npm install
  npm run dev
  ```

---

## 7. AI Code Modification Protocol

When modifying existing files:
1. Always preserve established invariants and configuration models.
2. Ensure asynchronous methods accept and respect `CancellationToken ct`.
3. Keep track of file locking semantics on recording storage directories.
4. Keep `RULES.md` and `README.md` updated if new architectural rules are introduced.
