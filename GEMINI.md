# Antigravity & Gemini Workspace Instructions — ITB-SCREEN-RECORDER

This workspace is governed by the **Defense Software Engineering Agent Federation** defined in `.agent-kit/agents/AGENTS.md` and the workspace rules in `.agents/rules/` and `AGENTS.md`.

## Active Agent Federation & Subagents
All 9 specialized agents are defined in `.agents/agents/` and can be invoked as subagents:
- `project-lead` (@ProjectLead): Chief Systems Architect & Controller.
- `baseline-auditor` (@BaselineAuditor): Reverse-Engineering & As-Is Mapping (Read-Only).
- `system-architect` (@SystemArchitect): Target Architecture & CDR Design.
- `hmi-engineer` (@HMI_Engineer): Frontend & React 18 Operator Systems.
- `data-architect` (@DataArchitect): Database & SQLite WAL Persistence.
- `software-engineer` (@SoftwareEngineer): Core Backend & Media Pipeline Engineering.
- `appsec-engineer` (@AppSec_Engineer): Pre-flight Dependency Vetting & Security Veto.
- `vnv-engineer` (@VnV_Engineer): Verification, Validation & Automated Testing.
- `cm-specialist` (@CM_Specialist): Configuration Management & Branch Lifecycles.

## Invariant Authority & Rules
- System Invariants: `RULES.md` and `SYSTEM_BOOK.md`.
- Engineering Rules: `.agent-kit/rules/engineering-rules.md`.
- Operational Rules & Quality Gates: `.agent-kit/rules/operational-rules.md`.
- Active Work Package Board: `.agent-kit/tracking/WP_BOARD.md`.
