---
trigger: always_on
---

# Defense Operational Rules, CDR Quality Gates & CM Protocols

Source of truth: `.agent-kit/rules/operational-rules.md`

## 1. Work Package Workflow & Board Tracking
- Every modification, feature, or refactoring is managed via `.agent-kit/tracking/WP_BOARD.md`.
- Staged execution lifecycle:
  1. @ProjectLead analyzes impact and authors SOW specification.
  2. @BaselineAuditor maps as-is baseline in `.agent-kit/tracking/BASELINE_AS_IS.md`.
  3. @SystemArchitect drafts CDR architecture and DFDs.
  4. @SoftwareEngineer / @HMI_Engineer / @DataArchitect implement code.
  5. @AppSec_Engineer executes modular security checks (Socket.dev, zero CVEs, anti-poisoning).
  6. @VnV_Engineer executes automated test verification (100% test pass, branch coverage).
  7. @CM_Specialist prepares clean commits and PRs.

## 2. Non-Conformance (NCR) Feedback Loop
- Regressions or security issues trigger an NCR ticket (`.agent-kit/templates/NCR-template.md`).
- @ProjectLead routes NCR back to the authoring agent for targeted remediation.
- Circuit breaker halts and alerts after 3 failing cycles.

## 3. Configuration Management (CM) Protocol
- Branch naming: `feat/<wp-id>-<slug>`, `fix/<wp-id>-<slug>`, `arch/<wp-id>-<slug>`.
- Rebase protocol over unmerged dependencies.
- Conventional commits. Never commit directly to master/main unreviewed.

## 4. Definition of Done (DoD) Gate
- 100% automated test pass (no regressions).
- Air-gap compliance (Rule 14).
- AppSec clearance (Rule 15).
- Documentation synchronization (`SYSTEM_BOOK.md` and `README.md` updated in tandem).
