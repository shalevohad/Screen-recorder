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

---

## 2. Storage root: NetApp primary, local fallback — Enforced

Recordings are written to `Storage.NetAppUncPath` when reachable; otherwise to `Storage.LocalFallbackPath` (`C:\ProgramData\ITB-SCREEN-RECORDER\Recordings`), which is auto-created if missing.

- [`StoragePathResolver.ResolveActiveRootAsync`](ITB-SCREEN-RECORDER.Server/Services/StoragePathResolver.cs#L19) checks `Directory.Exists(NetAppUncPath)` with a 3-second timeout on every chunk-boundary tick; a root switch is re-applied to MediaMTX automatically the next time a boundary fires ([`RecordingChunkScheduler.cs:80-97`](ITB-SCREEN-RECORDER.Server/Services/RecordingChunkScheduler.cs#L80-L97)).

---

## 3. Recording retention — Enforced (via MediaMTX), but see config duplication note

`Storage.RetentionDays` (currently `30`) is pushed to MediaMTX as `recordDeleteAfter: "{RetentionDays}d"`; MediaMTX itself deletes segments older than this age.

**Inconsistency to be aware of:** `SystemConfig.RecordingRetentionDays` (top-level, sibling of `Storage`, also `30` in `appsettings.json`) is a *separate* config value from `Storage.RetentionDays`. Only `Storage.RetentionDays` is read anywhere in code — `RecordingRetentionDays` is bound and validated (`[Range(1,365)]`) but never referenced. It is effectively dead config today. If retention behavior ever needs to change, edit `Storage.RetentionDays`, not `RecordingRetentionDays`.

---

## 4. Storage quota (`MaxStorageQuotaGb`) — Configured, not enforced

`SystemConfig.MaxStorageQuotaGb` is validated at startup (`[Range(10, 100000)]`) but no code path reads it or enforces a quota. There is currently no mechanism that stops recording or evicts old files when total storage usage exceeds this value — retention is time-based only (see Rule 3).

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
