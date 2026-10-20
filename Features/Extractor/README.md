# 🎬 Extractor Feature Module (`ITB-SCREEN-RECORDER.Features.Extractor`)

The **Extractor** feature module is the forensic video clipping and multicam synchronization engine for the ITB Screen Recorder platform. It is engineered to export frame-accurate, timecode-aligned video clips across multiple workstations simultaneously for mission debriefs, compliance audits, and incident analysis.

---

## 🎯 Operational Objectives

When an incident occurs in a high-density facility (e.g. 4 stations cooperating on an operational event), analysts must review video from all 4 stations side-by-side. If Station A recorded continuously while Station B was offline or rebooting for 30 seconds, traditional concatenation results in Station B playing 30 seconds out of sync with Station A.

The Extractor solves this with **deterministic temporal synchronization guarantee**:
1. **Global Gap Removal**: Time spans where *all* selected stations were inactive are eliminated uniformly, preserving relative alignment without exporting hours of empty black screen.
2. **Local Station Gap Interpolation**: If a specific station had a recording gap while other stations were active, a synthetic **"No Signal"** video slate with silent audio is dynamically generated and spliced into that station's track at the exact millisecond offset.
3. **Synchronized Output**: All exported video tracks share the exact same total duration and frame timestamps, allowing seamless side-by-side multicam playback in any standard NLE or video player.

---

## 🏗️ Architecture & Component Overview

```text
[ Extraction Request ]
         │
         ▼
[ SynchronizationPlanBuilder ]
  • Discovers recorded MP4 chunks across selected stations
  • Calculates global active segments vs. global gaps
  • Computes station-specific internal gaps
         │
         ▼
[ SynchronizedTrackCutter ]
  • Constructs ffconcat manifest per station track
  • Slices chunks using inpoint / outpoint
  • Slices master dummy video for internal gaps
         │
         ▼
[ DummyVideoGenerator & NoSignalPatternService ]
  • Generates 5s baseline dummy video (Lazy on-demand, multicam only)
  • Matches baseline resolution, FPS, and audio configuration
         │
         ▼
[ FFmpeg Concat Engine ]
  • Fast stream copy (-c copy) whenever possible
  • Re-encoding fallback for heterogeneous codec parameters
```

---

## 📁 Key Classes & Services

| Service | File | Role |
| :--- | :--- | :--- |
| **`SynchronizedTrackCutter`** | [`SynchronizedTrackCutter.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/SynchronizedTrackCutter.cs) | Generates `ffconcat` manifests for each station track, interleaving chunk slices with dummy video gap slices. |
| **`SynchronizationPlanBuilder`** | [`SynchronizationPlanBuilder.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/SynchronizationPlanBuilder.cs) | Computes synchronized timeline spans, union boundaries, and active segment intervals across multiple stations. |
| **`DummyVideoGenerator`** | [`DummyVideoGenerator.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/BridgeVideoGenerator.cs) | Generates and caches reusable 5-second synthetic MP4 clips containing "No Signal" graphics and silent audio. |
| **`NoSignalPatternService`** | [`NoSignalPatternService.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/NoSignalPatternService.cs) | Draws tactical test patterns and station metadata overlays for synthetic gap filling. |
| **`FfmpegBinaryResolver`** | [`FfmpegBinaryResolver.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Ffmpeg/FfmpegBinaryResolver.cs) | Automatically discovers FFmpeg and FFprobe binaries across Windows (`bin/ffmpeg.exe`) and Linux systems. |
| **`ExtractorService`** | [`ExtractorService.cs`](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Features/Extractor/ITB-SCREEN-RECORDER.Features.Extractor/Services/Engine/ExtractorService.cs) | High-level orchestrator managing asynchronous extraction jobs, progress reporting, and output delivery. |

---

## ⚙️ Invariant Behavioral Rules (Rule 9)

- **Multicam vs. Single Station**:
  - In multicam mode (`isMultiStation == true`), gaps in any station's track inject a sliced "No Signal" slate via `AppendDummyGapAsync`.
  - In single station mode (`isMultiStation == false`), gaps are treated as global and skipped directly without dummy video filler.
- **Micro-Gap Threshold**: Gaps under 20ms (`gapSeconds <= 0.02`) are discarded to prevent micro-stutter from minor encoder packet jitter.
- **Concat Manifest Precision**: Timestamps in `ffconcat` manifests use invariant culture formatting (`{0:F3}`) to ensure cross-locale compatibility.
