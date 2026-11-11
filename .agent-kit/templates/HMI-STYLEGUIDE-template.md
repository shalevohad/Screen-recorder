# Mission-Critical HMI Styleguide & Operator Ergonomics

## 1. Tactical Color Tokens
- Background Base: `#070A10` (Deep obsidian)
- Container Panels: `#0F172A` (Dark slate container)
- Card Surfaces: `#151E2E` (Surface card)
- Borders & Dividers: `#1E293B` (Subtle boundary line)
- Semantic Status Colors:
  - **Healthy / Active:** `#10B981` (Green)
  - **Telemetry / Stream:** `#06B6D4` (Cyan)
  - **Warning / Degraded:** `#F59E0B` (Amber)
  - **Fault / Alert:** `#F43F5E` (Red)

## 2. Performance & Rendering Invariants
- UI Dispatcher thread must never execute file I/O, database queries, or media decoding.
- Telemetry streams MUST be throttled to 10-15 Hz.
- Monospace fonts (`Cascadia Code`, `Consolas`) for IP addresses, timecodes, and telemetry counters.
