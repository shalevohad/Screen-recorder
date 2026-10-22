# 🌟 Antigravity & Gemini Agent Instructions

This repository is governed by the core guidelines documented in [AGENTS.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/AGENTS.md) and behavioral rules in [RULES.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/RULES.md).

## Quick Agent Directives
1. **Source of Truth**: Always cross-reference [RULES.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/RULES.md) before altering chunk schedules, encoder arguments, storage paths, or MediaMTX interactions.
2. **MediaMTX Version Pin**: Strictly do not attempt to upgrade `MediaMTX` from v1.15.4 due to `ntpDriftTolerance` drift check causing fragmentation.
3. **Hardware Acceleration**: Always prioritize hardware encoders (NVENC -> Intel QuickSync QSV) over CPU software fallback.
4. **Non-Locking Streams**: Open video and log files with `FileShare.ReadWrite | FileShare.Delete` to prevent locking actively recording streams.
5. **UI & Styling**: Use the tactical NOC design system defined in [ui_ux_design_specification.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/ITB-SCREEN-RECORDER.Server/ClientApp/src/Agents/ui_ux_design_specification.md).
6. **Air-Gapped & Isolated Environment**: NEVER use external internet URLs, Google Fonts, remote CDNs, or external APIs in code, styles, or templates. The entire platform must operate 100% self-contained and offline.
