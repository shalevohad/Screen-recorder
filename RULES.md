# Program Rules

This document is the source of truth for behavioral invariants the ITB Screen Recorder system must follow. Each rule states the expected behavior, where it is implemented, and its current enforcement status. Update this file whenever a rule changes or a new one is introduced — code reviews and changes to the listed files should be checked against it.

Status legend: **Enforced** (implemented and active in code) · **Configured, not enforced** (a config value exists and is validated at startup, but no code path currently acts on it).

---

## 1. Recording chunks are cut on wall-clock boundaries — Enforced

Recordings are split into fixed-length chunks aligned to **wall-clock multiples of `Storage.ChunkIntervalMinutes`** (`appsettings.json`, currently `5`), not to elapsed time since a stream started.

Example (`ChunkIntervalMinutes = 5`): if a station starts streaming at `15:12`, the first chunk runs `15:12→15:15` (short chunk), then `15:15→15:20`, `15:20→15:25`, and so on indefinitely — every chunk boundary lands on a clock time evenly divisible by the interval.

**How it works:**
- [`RecordingChunkScheduler`](ITB-SCREEN-RECORDER.Server/Services/RecordingChunkScheduler.cs) is a `BackgroundService` (registered in [`Program.cs:58`](ITB-SCREEN-RECORDER.Server/Program.cs#L58)) that loops forever: compute the next boundary, sleep until it arrives, act, repeat.
- `ComputeNextBoundaryUtc` (line 117) computes the boundary purely from the current UTC clock (`minutesSinceMidnight - minutesSinceMidnight % interval + interval`) — it is recomputed fresh from `DateTime.UtcNow` every iteration, so there's no cumulative drift from `Task.Delay` inaccuracy.
- At each boundary, `OnBoundaryReachedAsync` (line 76) lists all currently-active MediaMTX paths and calls `MediaMtxApiClient.RotatePathRecordingAsync` on each, which toggles `record: false` → `record: true` via MediaMTX's Control API ([`MediaMtxApiClient.cs:100`](ITB-SCREEN-RECORDER.Server/Services/MediaMtxApiClient.cs#L100)) — this forces MediaMTX to close the in-progress segment and open a new one at that exact instant.
- MediaMTX's own `recordSegmentDuration` is also set to `{ChunkIntervalMinutes}m` as a backing timer (pushed both at MediaMTX startup in [`MediaMtxSupervisorWorker.cs:148`](ITB-SCREEN-RECORDER.Server/Services/MediaMtxSupervisorWorker.cs#L148) and again on every boundary tick), but it's the forced toggle — not MediaMTX's internal timer — that guarantees clock alignment, since MediaMTX's own timer counts from whenever the path started publishing, not from a wall-clock mark.
- Output filenames use MediaMTX's `%Y-%m-%d_%H-%M-%S-%f` substitution, applied at the moment each segment opens, so filenames reflect true chunk start times.

**Validated:** `ComputeNextBoundaryUtc`'s math was executed standalone and confirmed correct for the `15:12` / 5-minute example (returns `15:15`, matching the described behavior exactly), exact-on-boundary ticks, and the configured 5-minute interval (all pass). See caveats below.

**Caveats (not bugs at the current config, but worth knowing):**
- Boundaries are computed against **UTC**, not local time. This only matters if the intended "wall clock" is a local timezone whose UTC offset isn't a multiple of `ChunkIntervalMinutes` — not the case for the currently configured value (5).
- The boundary math resets at UTC midnight based on `Hour`/`Minute` alone. If `ChunkIntervalMinutes` does not evenly divide 1440 (e.g. 7, 11, 13 — the config allows any value 1–60), the last chunk before midnight is shortened, producing one irregular chunk per day. The currently configured value (5) divides 1440 evenly, so this does not currently manifest. If `ChunkIntervalMinutes` is ever changed to a non-divisor of 1440, this edge case will appear.

**MediaMTX is pinned to v1.15.4 — do not upgrade without re-verifying.** Starting in MediaMTX v1.15.5, the recorder compares each sample's real arrival wall-clock time against its nominal encoder timestamp and force-resets the current recording segment if they drift apart (source: [`internal/recorder/format_fmp4_track.go`](https://github.com/bluenviron/mediamtx/pull/5239), constant `ntpDriftTolerance`, not exposed via any config option — see [upstream issue #5550](https://github.com/bluenviron/mediamtx/issues/5550)). Under our live CPU-encoded screen-capture pipeline, that drift check tripped every ~15-20 seconds regardless of `ChunkIntervalMinutes`, cutting a fresh segment far more often than configured and defeating this rule entirely. Since Server and MediaMTX always run co-located on the same machine, the clock-jump scenario the check guards against can't occur here, so the fix is a version pin rather than a pipeline change: [`MediaMTX/mediamtx.exe`](ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.exe) is v1.15.4 (last release before the check was introduced), and [`MediaMTX/mediamtx.yml`](ITB-SCREEN-RECORDER.Server/MediaMTX/mediamtx.yml) was regenerated to match that version's schema (the v1.19.3 yml has fields, e.g. `authHTTPFingerprint`, that v1.15.4 rejects at startup). Upgrading the bundled binary again will silently reintroduce this bug — confirm the drift check hasn't landed a config knob upstream, or re-run the verification in this rule's history, before bumping the version.
- [`FfmpegProcessManager.BuildFfmpegArguments`](ITB-SCREEN-RECORDER.AgentWorker/Engine/FfmpegProcessManager.cs) also passes `-use_wallclock_as_timestamps 1` on both raw inputs (video pipe + audio TCP) so ffmpeg timestamps frames by real arrival time rather than a nominal frame-count clock. This reduces long-run timestamp drift from capture jitter, but did **not** by itself fix the MediaMTX reset behavior above (`-fps_mode cfr` downstream renormalizes output timestamps to a nominal clock regardless) — the version pin is the actual fix; this flag is a complementary accuracy improvement, not a substitute.

---

## 1a. MediaMTX RTMP port is not driven by config — pitfall

`SystemConfig.MediaMtx.RtmpPort` (`appsettings.json`, currently `19350`) is **never read by any C# code** to configure MediaMTX's actual RTMP listener — unlike `ApiPort`, which genuinely is used to build the Control API client's base address ([`MediaMtxApiClient.CreateClient`](ITB-SCREEN-RECORDER.Server/Services/MediaMtxApiClient.cs#L30)). The RTMP listener address is set purely by the static `rtmpAddress` key in `mediamtx.yml`, which must be kept manually in sync with `RtmpPort`. `apiAddress` (`:9997`) and `hlsAddress` (`:8888`) happen to already match `appsettings.json` because those are MediaMTX's own upstream defaults, which papers over the same gap for those two ports specifically — it does not mean they're actually wired up either.

**Consequence:** regenerating `mediamtx.yml` from a stock MediaMTX release (e.g. for a version change, see rule 1's MediaMTX pin) silently resets `rtmpAddress` to MediaMTX's default `:1935`, breaking every RTMP connection from the Agent (which reads `RtmpPort` from its own `DashboardApiUrl`-adjacent config and always targets `19350`) until someone notices and manually re-patches the yml.

---

## 2. Storage root: NetApp primary, local fallback — Enforced

Recordings are written to `Storage.NetAppUncPath` when reachable; otherwise to `Storage.LocalFallbackPath` (`C:\ProgramData\ITB-SCREEN-RECORDER\Recordings`), which is auto-created if missing.

- [`StoragePathResolver.ResolveActiveRootAsync`](ITB-SCREEN-RECORDER.Server/Services/StoragePathResolver.cs#L19) checks `Directory.Exists(NetAppUncPath)` with a 3-second timeout on every chunk-boundary tick; a root switch is re-applied to MediaMTX automatically the next time a boundary fires ([`RecordingChunkScheduler.cs:80-97`](ITB-SCREEN-RECORDER.Server/Services/RecordingChunkScheduler.cs#L80-L97)).

---

## 3. Recording retention — Enforced (via MediaMTX), but see config duplication note

`Storage.RetentionDays` (currently `30`) is pushed to MediaMTX as `recordDeleteAfter: "{RetentionDays}d"`; MediaMTX itself deletes segments older than this age.

**Inconsistency to be aware of:** `SystemConfig.RecordingRetentionDays` (top-level, sibling of `Storage`, also `30` in `appsettings.json`) is a *separate* config value from `Storage.RetentionDays`. Only `Storage.RetentionDays` is read anywhere in code — `RecordingRetentionDays` is bound and validated (`[Range(1,365)]`) but never referenced. It is effectively dead config today. If retention behavior ever needs to change, edit `Storage.RetentionDays`, not `RecordingRetentionDays`.

---

## 4. Storage quota (`MaxStorageQuotaGb`) — Configured, not enforced (planned)

`SystemConfig.MaxStorageQuotaGb` is validated at startup (`[Range(10, 100000)]`, currently `100`) but no code path reads it or enforces a quota. There is currently no mechanism that stops recording or evicts old files when total storage usage exceeds this value — retention is time-based only (see Rule 3).

**Enforcement plan (not yet implemented):**

- **New `StorageQuotaEnforcer` `BackgroundService`**, alongside `RecordingChunkScheduler` and `MediaMtxSupervisorWorker` rather than folded into either — separate concern (disk usage vs. clock-boundary rotation), own timer. Runs on its own interval (e.g. every 5 minutes — frequent enough to catch overage promptly, cheap enough not to matter) rather than piggybacking on the chunk-boundary tick, so quota checks aren't coupled to `Storage.ChunkIntervalMinutes`.
- **Scope**: the quota applies to the *currently active* recordings root only (`StoragePathResolver.ResolveActiveRootAsync` — NetApp when reachable, else `LocalFallbackPath`), summed across **all** stations' subfolders under it (`{root}/live/*/*.mp4`), not per-station. `MaxStorageQuotaGb` is a single global Server-level value, so this matches its shape.
- **Measurement**: recursively sum `*.mp4` file sizes under the active root (`Directory.EnumerateFiles(root, "*.mp4", SearchOption.AllDirectories)`), not disk free-space (`DriveInfo`/`GetDiskFreeSpaceEx`) — the quota is a budget for *our* recordings specifically, not a statement about total disk capacity, and free-space checks would be misleading on a shared NetApp volume with other consumers.
- **Eviction**: when total usage exceeds the quota, delete the oldest `.mp4` files first (sort by the timestamp embedded in the filename, `%Y-%m-%d_%H-%M-%S-%f`, not `LastWriteTime` — more reliable if files are ever copied/moved) across all stations combined, until usage drops back under the quota. Evict globally-oldest-first, not round-robin per station, so one noisy/high-bitrate station doesn't starve eviction budget from quieter ones.
- **Safety**: never evict the single newest file per station-folder, even if it's technically the oldest candidate somewhere in a pathological quota-smaller-than-one-chunk scenario — that file may still be open/actively written by MediaMTX. Skip files younger than roughly `2 * Storage.ChunkIntervalMinutes` as an extra guard against racing an in-progress or just-closed segment.
- **Interaction with Rule 3's time-based retention**: this is an *additional* safety net, not a replacement. MediaMTX's own `recordDeleteAfter` (age-based) keeps running unchanged; the quota enforcer only acts when total size crosses the cap *before* age-based deletion has caught up (e.g. high-bitrate stations filling the quota well within the 30-day retention window).
- **Auditability**: log every eviction via the existing `EventLogger` pattern (parallel to `LogChunkCutAsync` in `RecordingChunkScheduler`) — deleting recordings automatically is consequential enough to want a trail of what was removed and when.
- **Edge cases to handle**: quota disabled/no-op if `MaxStorageQuotaGb <= 0`; log a warning (not a crash) if a single station's most recent chunk alone exceeds the quota, since eviction can't help there — that's a config problem (quota too low relative to `VideoBitrate` × `ChunkIntervalMinutes`) for an admin to fix, not something to fail loudly to end recording over.

---

## 5. Security (JWT / AD admin group) — Configured, not enforced

`SystemConfig.Security` (`AllowedAdAdminGroup`, `JwtSecretKey`, `TokenExpirationHours`) is bound and validated at startup, but:
- `Program.cs` calls `UseAuthorization()` with no matching `AddAuthentication()` / JWT bearer scheme registration.
- No controller in the project uses `[Authorize]`.
- No code references `AllowedAdAdminGroup`, `JwtSecretKey`, or `TokenExpirationHours` outside the config model.

All current API endpoints and the dashboard are effectively unauthenticated. Treat any claim of "admin-only" access as aspirational until an auth pipeline is actually wired up.

---

## 6. Single server instance per machine — Enforced

`Program.cs` acquires a named system `Mutex` (`ITB_SERVER_SINGLE_INSTANCE_DEV`) before starting; a second instance detects the held mutex and exits immediately rather than running alongside the first.

Note: the mutex name hardcodes `_DEV` — if this ships to production unchanged, that's just a name, not a functional issue, but confirm it's intentional before release.

---

## 7. MediaMTX process lifecycle — Enforced

[`MediaMtxSupervisorWorker`](ITB-SCREEN-RECORDER.Server/Services/MediaMtxSupervisorWorker.cs) (registered in [`Program.cs:55`](ITB-SCREEN-RECORDER.Server/Program.cs#L55)):
- Kills any orphaned `mediamtx` processes on startup and before every (re)launch.
- Restarts `mediamtx.exe` automatically if it exits, checking every 5 seconds.
- Kills the MediaMTX process tree on server shutdown (`StopAsync`).
- Pushes recording config (`recordPath`, `recordFormat`, `recordSegmentDuration`, `recordDeleteAfter`) to MediaMTX via its Control API at runtime rather than editing `mediamtx.yml` on disk, so the shipped `mediamtx.yml` stays an untouched safe fallback.

---

## 8. Video encoder auto-selection — Enforced, NVENC → QSV → CPU

When `Agent.VideoEncoder` is `"auto"` (the shipped default), [`HardwareProbe.ResolveEncoderAsync`](ITB-SCREEN-RECORDER.Core/Diagnostics/HardwareProbe.cs) probes for a hardware encoder in order — NVIDIA NVENC first, then Intel Quick Sync (QSV), each by actually running a 0.1s ffmpeg test encode with a 2s timeout — and only falls back to CPU software encoding (`libx264`, `-preset ultrafast -tune zerolatency`) if neither hardware path is available. The result is cached per agent process (`_resolvedEncoder`) so the probe only runs once at stream start, not per reconnect.

**Why this matters:** the probe originally only tested NVENC. On any machine with just an Intel integrated GPU (no discrete NVIDIA card) — common across a typical fleet — it silently fell straight to CPU encoding, even though most such machines support QSV. Real-time libx264 software encoding at 1080p30 pegs close to a full CPU core continuously (measured ~1.04 core-equivalents on an Intel Iris Xe test machine); QSV hardware encoding for the same stream measured ~0.66 core-equivalents, roughly **37% less CPU**. Under real system load, the CPU-bound path is prone to falling behind real-time, which — combined with the low-latency HLS pipeline's small buffer margin (`hlsPartDuration: 200ms` in `mediamtx.yml`, rule 1) — is a direct cause of stutter/lag in the live dashboard view. Encoder-specific flags live in [`FfmpegProcessManager.BuildFfmpegArguments`](ITB-SCREEN-RECORDER.AgentWorker/Engine/FfmpegProcessManager.cs) (NVENC: `p2` preset + `-tune ll -forced-idr 1`; QSV: `veryfast` preset + `-low_power 1`; CPU: `ultrafast` + `-tune zerolatency`). ffmpeg auto-converts the pipeline's `-pix_fmt yuv420p` to QSV's required `nv12` transparently.

AMD AMF is not currently probed — if a target machine has an AMD integrated/discrete GPU only, it will still fall back to CPU encoding today.

---

## 9. Multicam Synchronized Track Cutting & Dummy Gap Injection — Enforced

When extracting clips across multiple stations simultaneously (e.g., multicam operational debriefs), chronological timeline alignment across all tracks is strictly maintained.

- **Implementation**: [`SynchronizedTrackCutter`](Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/SynchronizedTrackCutter.cs) and [`SynchronizationPlanBuilder`](Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/SynchronizationPlanBuilder.cs).
- **Behavior**:
  - Global gaps (time ranges where *no* station recorded) are trimmed uniformly across all stations so exported tracks maintain identical global duration without dead air.
  - Station-specific internal gaps (where station A was recording but station B had network drop or paused) trigger synthetic gap insertion via `AppendDummyGapAsync`.
  - A 5-second master dummy video with "No Signal" slate and silent audio is dynamically created on-demand by [`NoSignalPatternService`](Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/NoSignalPatternService.cs) and [`BridgeVideoGenerator`](Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/BridgeVideoGenerator.cs), sliced to exact millisecond sub-intervals via `ffconcat` (`inpoint` / `outpoint`), guaranteeing frame-accurate synchronization across all exported video tracks.
  - In single-station extraction (`!isMultiStation`), no dummy video is generated; gaps are handled natively without adding synthetic filler frames.

---

## 10. Near-Live Hot-Window DVR & Non-Locking File Access — Enforced

Forensic investigation and time-scrubbing must allow operators to inspect recordings from 5-15 minutes ago without waiting for chunk completion and without interfering with active recording processes.

- **Implementation**: [`StorageScannerService`](ITB-SCREEN-RECORDER.Server/Services/StorageScannerService.cs) and [`LiveTailController`](Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Controllers/).
- **Behavior**:
  - Hot Window (recent 30 minutes): Disk queries bypass in-memory cache and directly poll the storage directory to index newly written MP4 segments within seconds.
  - Non-Locking Streams: All file inspection, duration probing, and thumbnail rendering open files using:
    `new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete);`
    preventing file access collisions with MediaMTX while it is actively writing or rotating chunks.
  - FFmpeg probe commands on hot files inject `-analyzeduration 1M -probesize 1M -threads 2` to prevent stream-read blocking.

---

## 11. Multi-Monitor Per-Adapter Capture & Dynamic Hot-Plug — Enforced

Workstations equipped with multiple physical displays (whether driven by a single GPU, multiple distinct GPUs such as NVIDIA dGPU + Intel iGPU, or USB DisplayLink adapters) must capture each display as a discrete, independent stream.

- **Implementation**: `DxgiMultiScreenCapture` (Windows), `LinuxX11ScreenCapture` (Linux XRandR / Wayland PipeWire), and `StationDisplayTopologyDto`.
- **Per-Adapter Isolation**:
  - Monitors are enumerated via DXGI (`EnumAdapters1` → `EnumOutputs`). Each display attaches directly to a Direct3D 11 device allocated on the specific hardware adapter driving that display. Zero cross-GPU PCIe texture transfers.
  - Primary displays stream by default to `live/{hostname}/mon-0` (or `live/{hostname}` for single-monitor compatibility). Secondary displays stream to `live/{hostname}/mon-1`, `mon-2`, etc.
- **Dynamic Hot-Plug & Unplug Resilience**:
  - Display connection or disconnection events (`WM_DISPLAYCHANGE`, DXGI `DXGI_ERROR_ACCESS_LOST`, XRandR notifications) must NOT interrupt or restart existing healthy streams.
  - When a monitor is disconnected, its specific FFmpeg encoder pipeline gracefully flushes and closes its active chunk. The primary stream continues recording without dropping a frame.
  - When a new monitor is connected at runtime, a dedicated capture pipeline spins up dynamically and begins streaming/recording from the next keyframe.
- **Forensic Slate Gap Filling**:
  - In multicam/multi-monitor exports, asymmetric timelines (e.g. Monitor 2 plugged in 15 minutes after Monitor 1 started) are bridged automatically by `SynchronizedTrackCutter` with a synthetic "No Signal / Disconnected" slate, maintaining 100% timecode synchronization across all tracks.

---

## 12. High-Density NOC Stream Governance, Canvas Default & Audio Solo Sink — Enforced

In large-scale operations (70–100+ workstations, 150–250+ video feeds), the web dashboard must maintain zero browser crashes and strict resource bounds.

- **Default Virtual Topology Canvas**:
  - In the primary Dashboard grid, station thumbnails display the **Virtual Desktop Canvas** by default, rendering displays proportionally according to their real-world OS coordinate geometry (`X, Y, Width, Height`).
  - Every card features a local switcher (`[ ⊞ Canvas | 🖥 1 | 🖥 2 ]`), allowing operators to collapse any station to a single monitor feed, instantly shedding decoder overhead.
- **Viewport-Based Virtualization (Intersection Observer)**:
  - WebRTC WHEP connections are established exclusively for station cards currently inside the browser's visible viewport (typically 8–16 cards). Cards scrolled off-screen pause or disconnect their media sessions, bounding active client-side decoders.
- **Exclusive Audio Solo Sink (Radio Intercom Model)**:
  - All station cards in the Dashboard grid are muted by default (`audio: false` / zero audio DSP processing).
  - Clicking the 🎧 icon on any card grants **Exclusive Audio Solo**: that station immediately unmutes and streams live audio into the operator's headphones/speakers, while any previously active station is instantly muted.
  - Exactly ONE station produces audio at any time in the grid view.
- **Fullscreen Minimap Radar Navigator**:
  - When viewing a station in Fullscreen Solo or Spotlight mode, an interactive Picture-in-Picture Minimap of the full Canvas layout is displayed in the viewport corner.
  - The currently viewed monitor is highlighted with a radiant glow and active radar tag.
  - All monitor boxes in the minimap are interactive: clicking a box immediately switches the full-screen view to that display, and clicking the canvas frame returns to full Canvas mode.

---

## 13. Multi-Monitor Export & DVR Dynamic Focus (Persistent HUD & Millisecond Dip-to-Black) — Enforced

To deliver pristine readability for high-density multi-monitor workstations without occluding primary workspace surfaces during forensic playback and file export:

- **Full-Resolution Hero Surface**:
  - The currently focused or operator-selected monitor renders at 100% natural resolution and full viewport area, avoiding destructive downscaling or illegible multi-screen grid letterboxing.
- **Persistent Tactical Minimap HUD Overlay**:
  - A compact, semi-transparent (60–70% opacity) dark-glass topology wireframe sits persistently in the viewport corner.
  - Displays the workstation's real physical monitor layout, clearly illuminating the active display with a radiant glow indicator (`● ACTIVE: Mon X`) while non-active monitors remain subtle wireframe boxes with their respective display index tags.
  - **HUD Persistence Invariant**: The Minimap HUD is rendered on an independent overlay plane. During video transitions, the Minimap NEVER blinks out, fades, or dips to black; it remains 100% visible and crisp, dynamically updating its highlight indicator at the precise inflection point of the transition.
- **Millisecond-Locked Dip-to-Black Video Transition**:
  - Transitions between monitors (whether triggered automatically by recorded mouse/keystroke activity or manually by operator timeline cuts) execute as a **Dip to Black** transition (fade-to-black -> keyframe cut -> fade-in).
  - **Zero-Time-Drift Invariant**: The transition duration is strictly accounted for in master timecode calculations. Not a single millisecond is added, dropped, or desynchronized relative to concurrent stations or continuous multi-track audio.
  - **1-Second Pre-Roll Lead-In Invariant (Cognitive Context)**: When an activity transition is triggered by a user action (e.g., mouse click or typing focus shift on Monitor B at timestamp $T$), the Dip-to-Black transition initiates **1.0 second prior** ($T - 1000\text{ms}$). This guarantees the viewer's eyes land comfortably on the new screen, observe the cursor trajectory, and absorb the spatial context before the interaction actually occurs, preventing disorienting jump-cuts.
- **Dual-Plane DVR & Extractor Foundation**:
  - Raw video streams (`mon-0`, `mon-1`, `mon-2`) remain completely un-baked and clean in storage.
  - Telemetry and topology timecodes are indexed from time 0, allowing both client-side interactive DVR scrubbing and server-side FFmpeg MP4 export to reconstruct the identical synchronized experience deterministically.



