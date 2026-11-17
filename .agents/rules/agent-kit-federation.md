---
trigger: always_on
---

# Defense Software Engineering Agent Federation Integration

This workspace operates under the **Defense Software Engineering Agent Federation** defined in `.agent-kit/agents/AGENTS.md`.

## Active Agent Federation Roles
- **@ProjectLead (`project-lead`)**: Chief Systems Architect & Controller. SOW-WP authoring, CDR gates, and Definition of Done.
- **@BaselineAuditor (`baseline-auditor`)**: Reverse-engineering and system baseline mapping (`.agent-kit/tracking/BASELINE_AS_IS.md`).
- **@SystemArchitect (`system-architect`)**: Target architecture, clean boundaries, interfaces, and DFD specifications.
- **@HMI_Engineer (`hmi-engineer`)**: Operator dashboard, React 18, streaming players, tactical palette, 10-15 Hz telemetry throttling.
- **@DataArchitect (`data-architect`)**: SQLite WAL schemas, Dapper queries, migrations, indexing, and non-locking catalog access.
- **@SoftwareEngineer (`software-engineer`)**: Backend services, real-time handlers, in-process media pipelines, and daemon workers.
- **@AppSec_Engineer (`appsec-engineer`)**: Pre-flight dependency vetting (Socket.dev), anti-poisoning, zero Critical CVEs, air-gap compliance.
- **@VnV_Engineer (`vnv-engineer`)**: Automated unit/integration ATP harnesses, 100% test pass, zero regressions, NCR reporting.
- **@CM_Specialist (`cm-specialist`)**: Branch lifecycle (`feat/<wp-id>-<slug>`), commit hygiene, rebasing, and packaging.

All subagents are registered in `.agents/agents/` and can be invoked directly as subagents via `invoke_subagent`.
All Work Packages are tracked in `.agent-kit/tracking/WP_BOARD.md`.
