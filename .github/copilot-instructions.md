# GitHub Copilot Instructions for ITB-SCREEN-RECORDER

## Project Overview
ITB-SCREEN-RECORDER is an enterprise command-and-control (C2), screen capture, active recording, and live telemetry streaming platform engineered for air-gapped mission-critical environments (100+ endpoints).

## Architecture & Project Layout
- **ITB-SCREEN-RECORDER.Core**: Shared models, configuration schemas, SQLite logging / state, IPC primitives, and diagnostics (`HardwareProbe`).
- **ITB-SCREEN-RECORDER.Server**: ASP.NET Core 8 Web API + SignalR C2 Hubs, MediaMTX process supervisor, wall-clock chunk rotation scheduler, storage path resolver, SQLite WAL video catalog, WebRTC WHEP proxy, and React dashboard host.
- **ITB-SCREEN-RECORDER.Server/ClientApp**: React 18 + Vite + SCSS tactical command dashboard (C2/NOC) with WebRTC WHEP & HLS playback, interactive station grid, live telemetry bars, and DVR timeline.
- **ITB-SCREEN-RECORDER.AgentService**: Windows Service running in Session 0. Watchdog, server C2 heartbeat/sync, logged-on user detection, and launcher of `AgentWorker` into user desktop session (Session 1+) using Win32 `CreateProcessAsUser`.
- **ITB-SCREEN-RECORDER.AgentWorker**: Runs in user session (Session 1). Screen capture (DirectX DDA / DXGI on Windows, X11 on Linux), WASAPI Audio (Speaker loopback + Mic dual mixer with `AudioPacer`), low-level keyboard hook, hardware-accelerated FFmpeg streaming (NVENC -> Intel QSV -> CPU libx264 fallback) to MediaMTX RTMP on port 19350 with offline fallback buffering.
- **Features/Extractor**: Synchronized multicam track cutter (`SynchronizedTrackCutter`), gap filler with "No Signal" test pattern (`DummyVideoGenerator`), FFprobe/FFmpeg operations, and frame-accurate concat demuxer math.
- **Features/ExtractorAdvanced**: Advanced forensic timeline investigation suite with Live-Tail hot-window DVR scanner and dedicated React client.

## Critical Invariants & Rules (Source of Truth: `RULES.md`)
1. **Wall-Clock Chunk Boundaries**: Recordings are cut on exact wall-clock boundaries (multiples of `ChunkIntervalMinutes`, default 5m) via `RecordingChunkScheduler` triggering MediaMTX path toggle (`record: false` -> `true`).
2. **MediaMTX Version Pin**: `MediaMTX` is strictly pinned to **v1.15.4** (`ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.exe`). Do NOT upgrade without testing `ntpDriftTolerance` which causes premature segmentation.
3. **Storage Failover**: Primary storage is NetApp UNC (`Storage.NetAppUncPath`) verified with a 3-second heartbeat probe; fallback is local NVMe (`Storage.LocalFallbackPath`).
4. **Hardware Encoder Priority**: Auto-detection probes NVIDIA NVENC first, then Intel QuickSync (QSV), falling back to CPU (`libx264` ultrafast zerolatency) only if neither is available.
5. **Non-Locking Hot File Access**: In Near-Live and playback flows, always open files with:
   `new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete)`
   and FFmpeg flags `-analyzeduration 1M -probesize 1M -threads 2` to prevent locking open recording files.
6. **Multicam Synchronization**: When exporting multi-station recordings, global gaps are trimmed identically across all tracks, and station-specific internal gaps inject synthetic 5s "No Signal" dummy segments sliced via `ffconcat`.

## Coding Standards
- **C# / .NET 8**: Follow async/await throughout (`CancellationToken` propagation). Avoid blocking calls (`.Result`, `.Wait()`). Use structured logging (`ILogger<T>`).
- **Frontend**: React 18 functional components with hooks. Use CSS custom properties defined in `ui_ux_design_specification.md` (`--bg-app`, `--surface-card`, `--accent-cyan`, `--accent-emerald`, `--accent-rose`). Avoid generic bright colors. Use semantic BEM/SCSS.
