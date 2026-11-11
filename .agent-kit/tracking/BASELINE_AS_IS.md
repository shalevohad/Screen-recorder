# AS-IS Architecture Baseline & Domain Discovery

**Phase:** 0 — completed by `@BaselineAuditor`  
**Repository:** ITB-SCREEN-RECORDER  
**Runtime:** .NET 8.0 LTS / C# 12 / nullable reference types enabled  
**Deployment:** air-gapped internal network; Windows and Linux components

## 1. Operational Mission

The system is a central C2 and recording platform for multi-monitor workstation capture. `AgentService` supervises an interactive `AgentWorker`; the worker captures displays/audio and publishes RTMP; the central ASP.NET Core server supervises MediaMTX, exposes REST/SignalR/dashboard services, records deterministic chunks, indexes them, and supports forensic extraction.

## 2. Ingested Domain Invariants (RULES.md / SYSTEM_BOOK.md)

The following 15 invariants are authoritative at baseline:

1. Recording chunks are rotated on UTC wall-clock multiples of `Storage.ChunkIntervalMinutes`; the current operational value is 5 minutes.
2. MediaMTX is pinned to v1.15.4; upgrades require re-verification of fMP4 drift behavior and the matching YAML schema.
3. MediaMTX's RTMP listener is configured by `mediamtx.yml` (`:19350`), not by `SystemConfig.MediaMtx.RtmpPort`; both must remain synchronized.
4. NetApp UNC storage is primary and the local recording directory is the automatic fallback after the 3-second reachability check.
5. Retention is enforced from `Storage.RetentionDays`; the top-level `RecordingRetentionDays` is validated but currently unused.
6. `MaxStorageQuotaGb` is configuration-only and is not currently enforced.
7. JWT/AD security settings are configured and validated, but authentication and `[Authorize]` enforcement are not yet wired into the server pipeline.
8. Only one server process may run per machine, enforced by the named single-instance mutex.
9. The MediaMTX supervisor owns process lifecycle, orphan cleanup, restart, shutdown, and runtime recording configuration.
10. Encoder selection is NVENC ? QSV ? CPU (`libx264`), with the probe result cached for the agent process lifetime.
11. Multi-camera/multi-monitor extraction preserves synchronized timelines and injects a no-signal dummy gap for station-specific gaps.
12. Near-live inspection uses non-locking file access (`ReadWrite | Delete`) and polls the hot storage window directly.
13. Each physical monitor is an independent stream; audio carrier failover and the 60-second anti-flap hysteresis are preserved.
14. The platform is air-gapped: no CDN, external telemetry, cloud endpoint, or outbound Internet dependency is permitted.
15. New NuGet/npm dependencies require Socket.dev/security vetting before installation; critical supply-chain findings must fail the security gate.

Additional session invariant: on Windows, `AgentService` runs in Session 0 as SYSTEM, spawns `AgentWorker` into the interactive Session 1+ using the user token, and communicates through an ACL-protected named pipe.

## 3. Project and Dependency Map

All ten `.csproj` files target `net8.0` with explicit package versions; no wildcard or floating package versions were found:

- `ITB-SCREEN-RECORDER.Core`: shared contracts, configuration, crypto, SQLite base, discovery, IPC.
- `ITB-SCREEN-RECORDER.Server`: ASP.NET Core API/dashboard, SignalR, MediaMTX supervisor, storage, catalog, retention.
- `ITB-SCREEN-RECORDER.AgentService`: Session 0 service/daemon and interactive-session supervisor.
- `ITB-SCREEN-RECORDER.AgentWorker`: Session 1+ capture, audio, encoding, RTMP publishing.
- `Features/Extractor` and `Features/ExtractorAdvanced`: extraction, live-tail and forensic studio modules.
- `ITB-SCREEN-RECORDER.Tests`: unit/integration test suite.
- `Tools/ITB-SCREEN-RECORDER.Diagnostics`: diagnostic/RCA utility.
- `Installers/Linux/*`: Linux server and agent packaging projects.

Native/runtime dependencies include FFmpeg/FFprobe, MediaMTX v1.15.4, Windows DXGI/WASAPI/WTS APIs, Linux X11/PipeWire/PulseAudio facilities, and SQLite via `Microsoft.Data.Sqlite`/`SQLitePCLRaw`.

## 4. Communication, Sockets, and IPC

| Channel | Endpoint | Purpose |
|---|---:|---|
| HTTPS/HTTP ASP.NET Core | configured `SystemConfig.HttpPort` (default 5090) | REST API, dashboard and SignalR |
| RTMP/RTMPS ingest | 19350 | AgentWorker ? co-located MediaMTX |
| WebRTC/WHEP | 8889 | Low-latency browser playback |
| LL-HLS | 8888 | Browser playback fallback |
| MediaMTX Control API | 9997 | Local server control and wall-clock rotation |
| MediaMTX metrics/pprof | 9998 / 9999 | Operational diagnostics |
| Discovery UDP | 239.210.1.5:5098; broadcast fallback | Server discovery/probe response |
| SMB/CIFS | TCP 445 | Server ? NetApp recording storage |
| Named Pipe | `\\.\pipe\ITB_ScreenRecorder_Ipc_{SessionId}` | AgentService Session 0 ? AgentWorker Session 1+ |

Media flow is `AgentWorker ? RTMP ? MediaMTX ? WHEP/LL-HLS`; finalized chunks are written to NetApp or local fallback and indexed in the server catalog.

## 5. Persistence and State

- SQLite `system_catalog.db` is created by `CatalogConnectionFactory` and accessed through Dapper/raw ADO.NET repositories.
- Settings, logs, event/chunk records, and feature databases are local files; the recording media root is NetApp-first with local fallback.
- Telemetry and active station state are process-local in the server; no distributed state store or multi-server catalog replication was identified.

## 6. Engineering and Security Gates

- `.editorconfig` defines `xi_` input, `xo_` output/ref, `m_` instance-field, and `s_` static-field prefixes as warnings.
- Async services use `BackgroundService`; cancellation propagation is the expected model. Existing synchronous calls and naming warnings remain technical-debt candidates and were not altered in Phase 0.
- `agent-kit.config.json` enables NuGet audit and Socket.dev attestation, while SAST/SCA are disabled because their providers are not configured. This is a graceful modular configuration, but Socket.dev strict/offline-attestation requirements must be satisfied before a gated connected build.
- Local quarantine patterns are present in the root `.gitignore`; no local tool artifact remains tracked after sanitization.

## 7. Baseline Findings / Non-Goals

- Active-Active server state replication, distributed locking, and shared catalog are not present in the AS-IS implementation.
- Authentication enforcement, quota enforcement, and distributed telemetry synchronization are known gaps documented by `RULES.md`.
- Phase 0 made no runtime behavior changes. Subsequent work packages must update `SYSTEM_BOOK.md` in the same change whenever interfaces, storage, architecture, or protocols change.
