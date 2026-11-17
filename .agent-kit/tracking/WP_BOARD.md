# Project Modernization & CDR Work Package Board

## 1. Project Metadata
- **Project Name:** ITB-SCREEN-RECORDER
- **Current Milestone:** Intake Ready — Phase 0 completed
- **Active Controller:** @ProjectLead
- **Domain Invariants Authority:** [RULES.md / Project Baseline]

---

## 2. Active Work Package (WP) Matrix
| WP ID | SRS Ref | WP Description | Base Ref | Target Branch | Assigned Agent | Status | Active Branch |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **WP-100** | SRS-GEN-001 | Baseline As-Is Discovery & Rules Ingestion | `master` | `arch/wp-100-baseline` | `@BaselineAuditor` | ✅ Completed | `master` |
| **WP-101** | SRS-MED-001 | In-Process Media Pipeline & Zero-Binary Migration (NuGet FFmpeg, ManagedMp4Probe, In-Process Audio Decoder, Eliminating `ffmpeg.exe` & `ffprobe.exe`, Chrome GPU/CPU priority invariant) | `master` | `feature/ffmpeg-nuget` | `@SoftwareEngineer` | ✅ Completed | `feature/ffmpeg-nuget` |
| **WP-102** | SRS-PKG-001 | Installer License Cleansing & Proprietary EULA Transition (Removal of FFmpeg GPL licenses/disclaimers, retention of MediaMTX MIT) | `feature/ffmpeg-nuget` | `feature/ffmpeg-nuget` | `@CM_Specialist` | ✅ Completed | `feature/ffmpeg-nuget` |
| **WP-103** | SRS-ARC-001 | Core Domain Architecture Restructuring & Legacy Shims (`Contracts/<Domain>`, `Data/<System>`, `Diagnostics/<System>`, `Infrastructure/<System>`, `Security/<System>`) | `feature/ffmpeg-nuget` | `feature/ffmpeg-nuget` | `@SystemArchitect` | ✅ Completed | `feature/ffmpeg-nuget` |

---

## 3. Active Non-Conformance (NCR) Queue
| NCR ID | WP ID | Raised By | Assigned To | Discrepancy / Failing Test / Security Breach | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| *None* | - | - | - | - | - |

---

## 4. Dependency & Wait State Matrix
| WP ID | Blocked Agent | Waiting On (Human / Agent) | Blocking Reason & Required Action |
| :--- | :--- | :--- | :--- |
| *None* | - | - | - |

## 5. Intake Status
- **Status:** Ready for Intake
- **File route:** `.agent-kit/intake/` documents are eligible for slicing into WP-101+.
- **Chat route:** direct engineering instructions are eligible for immediate WP registration and the full architecture, implementation, security, V&V, and telemetry cycle.
