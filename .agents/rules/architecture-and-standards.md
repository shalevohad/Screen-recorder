# ITB-SCREEN-RECORDER Architecture & Coding Invariants

This rule file is automatically loaded by Antigravity and AI coding agents when working within this workspace.

## 1. System Invariants (RULES.md Source of Truth)
- **Wall-Clock Chunk Boundaries**: Recording segments are strictly aligned to UTC wall-clock multiples of `ChunkIntervalMinutes` (5m) via MediaMTX Control API rotation.
- **MediaMTX Version Pin**: Keep MediaMTX pinned to **v1.15.4** (`ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.exe`). Never bump to 1.15.5+ without validating `ntpDriftTolerance`.
- **Storage Failover**: Primary storage is NetApp UNC (`Storage.NetAppUncPath`) probed every tick with a 3s timeout; fallback is `Storage.LocalFallbackPath` (`C:\ProgramData\ITB-SCREEN-RECORDER\Recordings`).
- **GPU Acceleration Order**: Probed in order: NVENC (`h264_nvenc`) -> Intel QuickSync (`h264_qsv`) -> CPU software fallback (`libx264` ultrafast).

## 2. Windows Session Isolation
- `ITB-SCREEN-RECORDER.AgentService` runs in Session 0 as a service. It NEVER captures user desktop graphics or audio directly.
- It detects user logons and launches `ITB-SCREEN-RECORDER.AgentWorker` into Session 1+ via `CreateProcessAsUser` using duplicated user tokens.
- IPC between Service and Worker is strictly over Named Pipes.

## 3. Playback & Near-Live Concurrency
- Never lock media files during reading or indexing:
  `new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete)`
- FFmpeg probe commands must include `-analyzeduration 1M -probesize 1M -threads 2`.

## 4. Multicam Video Synchronization
- In multicam extraction, synchronize all station video tracks using [SynchronizedTrackCutter.cs](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/SynchronizedTrackCutter.cs).
- Trim global idle gaps uniformly across all tracks.
- Interleave synthetic 5-second "No Signal" gap slices ([DummyVideoGenerator.cs](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/BridgeVideoGenerator.cs)) for any station with internal dropouts to ensure timeline alignment.

## 5. Frontend UI/UX Standards
- Follow [ui_ux_design_specification.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/Agents/ui_ux_design_specification.md).
- Use tactical NOC colors: `--bg-app: #070A10`, `--surface-panel: #0F172A`, `--surface-card: #151E2E`, `--accent-cyan: #06B6D4`, `--accent-emerald: #10B981`, `--accent-rose: #F43F5E`.
- No plain or generic browser colors.

## 6. Continuous System Book Synchronization
- Maintain [SYSTEM_BOOK.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/SYSTEM_BOOK.md) as the active, authoritative developer handbook.
- Any modifications to endpoints, contracts, video pipelines, storage schedules, or architecture must be updated in `SYSTEM_BOOK.md` in the same commit/task.
