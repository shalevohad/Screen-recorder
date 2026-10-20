# 🔬 ExtractorAdvanced Feature Module (`ITB-SCREEN-RECORDER.Features.ExtractorAdvanced`)

The **ExtractorAdvanced** module provides a forensic video investigation suite with an interactive multi-station canvas timeline, Near-Live DVR time-scrubbing, and high-precision clip clipping.

---

## 🎯 Operational Objectives

Standard video players only allow playback of finalized, archived media. In mission-critical monitoring, operators need to:
1. **Time-Scrub Immediately**: Rewind 5–15 minutes into an ongoing recording to investigate an incident without waiting for the current chunk to close or interrupting live streaming.
2. **Multi-Station Alignment**: Review multiple station feeds simultaneously along a single synchronized master time axis.
3. **Interactive Subtitle Overlay**: Display keystrokes and system events aligned with the playhead cursor.

---

## 🏗️ Architecture & Core Components

```text
[ Browser / Frontend Timeline ]
              │
              ▼ (GET /api/v1/extractor-advanced/live-tail)
     [ LiveTailController ]
              │
              ▼
   [ StorageScannerService ]
  (Hot-Window: last 30 minutes)
              │
  • Bypasses in-memory cache
  • Opens files with FileShare.ReadWrite | FileShare.Delete
  • Returns newly written chunks every 5-10 seconds
```

---

## 📁 Key Capabilities & Rules (Rule 10)

### 1. Near-Live Hot-Window DVR
- **Bypass Cache**: Any timeline query covering the last 30 minutes (`DateTime.UtcNow - TimeSpan.FromMinutes(30)`) bypasses the storage catalog cache and scans the disk directly.
- **Zero Lock Collisions**: Chunks being actively written by MediaMTX or just rotated are inspected with non-locking file handles:
  ```csharp
  new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete);
  ```
- **FFmpeg Probe Safety**: Probing active files uses `-analyzeduration 1M -probesize 1M -threads 2` to prevent stream-read blocking.

### 2. Frontend Client (`Client/src`)
- Located in `Features/ExtractorAdvanced/ITB-SCREEN-RECORDER.Features.ExtractorAdvanced/Client/src`.
- Built in React with dedicated viewport cards (`CameraCardFeed.jsx`), timeline canvas, and timecode selectors.
- Injected into the primary C2 Dashboard dynamically as an enterprise feature plugin via ASP.NET Core `IHostingStartup` (`ExtractorAdvancedHostingStartup.cs`).
