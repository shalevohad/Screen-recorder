# Continuous Documentation & System Book Synchronization Rule

This rule is mandatory for all AI agents working on the **ITB-SCREEN-RECORDER** repository.

## 1. System Book as Primary Architecture Guide
The primary reference and developer documentation for this repository is [SYSTEM_BOOK.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/SYSTEM_BOOK.md).

## 2. Invariant: Always Keep SYSTEM_BOOK.md in Sync
Whenever ANY of the following changes occur in the codebase:
1. **Architectural & Topology Changes**: Changes to communication protocols, port configurations, service-to-worker IPC, or MediaMTX interactions.
2. **Recording & Storage Logic**: Adjustments to wall-clock chunking, failover paths, retention mechanisms, or file locking semantics.
3. **Hardware Acceleration & Video Pipelines**: Modifications to `HardwareProbe`, DXGI capture, WASAPI audio, or FFmpeg encoding parameters.
4. **API, SignalR & Contracts**: New endpoints, modified DTOs, hub events, or database schema migrations.
5. **Multi-Monitor & UI/UX Standards**: Changes to topology canvas, audio solo sink, minimap navigator, or NOC design tokens.
6. **Air-Gapped & Security Invariants**: Updates to certificates, cryptography, or offline packaging rules.

**The agent MUST update [SYSTEM_BOOK.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/SYSTEM_BOOK.md) in tandem with the code changes.**
Never leave `SYSTEM_BOOK.md` outdated or disconnected from the active code implementation.

## 3. Cross-Referencing
- Always verify that changes adhere to [RULES.md](file:///c:/Devlopers/ITB-SCREEN-RECORDER/RULES.md) (behavioral invariants).
- Ensure that references in `SYSTEM_BOOK.md`, `README.md`, `RULES.md`, and `AGENTS.md` remain consistent.
