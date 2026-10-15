# ITB-SCREEN-RECORDER Presentations

This directory contains two presentations in English, available in both **PowerPoint (`.pptx`)** and **Interactive Web Deck (`.html`)** formats:

## 1. Technical & Engineering Architecture Presentation (Full Deep-Dive)
* **PowerPoint Presentation:** [ITB_SCREEN_RECORDER_Technical_Architecture.pptx](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/ITB_SCREEN_RECORDER_Technical_Architecture.pptx)
* **Web Slide Deck:** [Technical_Architecture_Presentation.html](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/Technical_Architecture_Presentation.html)
* **Slides:** 21 Engineering Slides (Concise, high-density, no fluff).
* **Target Audience:** System Architects, Software Engineers, DevOps, Security Engineers, and Integrators.
* **Key Content:**
  * End-to-End System Connectivity & Network Topology (Detailed Wiring Schema).
  * UML Component Architecture & Assembly Separation.
  * Windows Session 0 vs. Session 1 Desktop Token Impersonation.
  * DirectX Desktop Duplication (DDA) & WASAPI Dual-Loopback Audio Pacing.
  * Tri-tier GPU Hardware Probing (NVENC &rarr; Intel QuickSync &rarr; CPU).
  * Deterministic Wall-Clock Chunking Engine (Rule 1, MediaMTX v1.15.4 version pinning).
  * Storage Dual-Path Failover (NetApp UNC primary with 3s probe & local NVMe fallback).
  * In-Memory SQLite WAL Mode Database, Covering Indices & Schema.
  * Storage Scanner & Automated Video Cataloging Pipeline.
  * UML Sequence Diagrams:
    1. Agent Ingestion & Telemetry Handshake.
    2. Wall-Clock Segment Rotation.
    3. Multi-Track Synchronized NLE Video Extraction.
  * Gap Interpolation & `NoSignalPatternService` Temporal Guarantee.
  * Low-Level Keystroke Capture & Synchronized `.srt` Generation.
  * Frontend React 18, Vite, WebRTC WHEP & Canvas Timeline NLE.
  * Security, LDAP / Active Directory & RBAC.
  * Fault Tolerance & High-Availability Matrix.

---

## 2. Executive Management Presentation (High-Level Overview)
* **PowerPoint Presentation:** [ITB_SCREEN_RECORDER_Executive_Management.pptx](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/ITB_SCREEN_RECORDER_Executive_Management.pptx)
* **Web Slide Deck:** [Executive_Management_Presentation.html](file:///c:/Devlopers/ITB-SCREEN-RECORDER/Presentations/Executive_Management_Presentation.html)
* **Slides:** 14 Executive Slides (Zero code, strategic & business value focused).
* **Target Audience:** C-Level, VP R&D, Operations Directors, Security & Compliance Officers.
* **Key Content:**
  * Core Mission & Value Proposition.
  * Why standard commercial tools fail in mission-critical facilities.
  * 3-Tier Operational Blueprint (Workstations &rarr; Central C2 & Storage &rarr; Operations Suite).
  * The "Zero Workstation Impact" guarantee (&lt;1% CPU usage via GPU acceleration).
  * 24/7 Resilience: Network outage buffering & automatic self-healing.
  * Live Fleet Command Wall (Sub-second WebRTC monitoring).
  * Forensic Synchronized Replay & Visual NLE Studio.
  * The "Time-Continuity Guarantee" (Accredited incident debriefs).
  * Forensic Keystroke Intelligence & Subtitles.
  * Storage Economics & Automated 30-Day Retention.
  * 100% Air-Gapped Sovereignty & Enterprise Active Directory Integration.
  * Scalability & Low Total Cost of Ownership (COTS hardware, 100+ stations per node).
  * Quantifiable ROI: 90% faster debriefs, compliance defense, operator productivity.
  * Conclusion & Next Steps.

---

## Interactive Presentation Controls:
* **Next Slide:** <kbd>→</kbd> (Right Arrow), <kbd>Space</kbd>, or click **Next ▶**
* **Previous Slide:** <kbd>←</kbd> (Left Arrow) or click **◀ Prev**
* **Fullscreen:** Press <kbd>F</kbd> or click **⛶ Fullscreen**
* **Export to PDF:** Click **🖨️ PDF** (or press <kbd>Ctrl</kbd> + <kbd>P</kbd>) — optimized `@media print` style renders flawless presentation slides for distribution.
