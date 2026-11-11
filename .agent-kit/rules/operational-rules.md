# DEFENSE OPERATIONAL RULES, CDR QUALITY GATES & SYSTEM DISCOVERY

## 0. Master Configuration Contract (`agent-kit.config.json`)
All agents and build tooling must parse `agent-kit.config.json` at the solution root prior to execution:
1. **`environment.airGapped`:**
   - When `true`: All outbound network calls, telemetry, and unverified package restoration are strictly prohibited. The offline Socket.dev attestation gate (`VerifyAirGappedSecurityAttestation`) is enforced in MSBuild (if `socketDev.enabled` is `true`).
   - When `false`: Connected development allows online dependency resolution and interactive multi-scanner execution during ingestion.
2. **`security.socketDev`, `security.sast`, `security.sca` (Modular Security Toggles):**
   - Each scanner can be individually enabled (`"enabled": true`) or disabled (`"enabled": false`).
   - API keys/tokens can be placed directly in the JSON or provided via CI environment variables (`SOCKET_SECURITY_API_KEY`, `SAST_API_TOKEN`, `SCA_API_TOKEN`).
   - **Graceful Bypass Rule:** If a scanner is disabled (`enabled: false`) or lacks credentials, the pipeline, build, and agents cleanly bypass that specific tool without halting execution.
3. **`hmi.activeTheme` & Palette:** Enforces tactical palette and 10-15 Hz telemetry throttling.
4. **`engineering.namingConventions`:** Enforces prefixes (`xi_`, `xo_`, `m_`, `s_`).
5. **`security.antiPoisoning`:** Configures branch coverage thresholds (100%) and trigger bans.

## 1. Domain Discovery & Project Invariants Authority (`RULES.md` / `SYSTEM_BOOK.md`)
This agent kit is strictly domain-agnostic:
- **Project Invariant Authority:** Before modifying code, all agents must inspect the repository for `RULES.md` or `SYSTEM_BOOK.md`. If present, its behavioral invariants (version pins, storage routes, hardware priorities, and isolation semantics) constitute the primary **Source of Truth** for that project.
- **Continuous Book Synchronization:** Whenever an architectural boundary, communication port, persistence model, or core contract changes, the authoring agent MUST update the project's documentation book in tandem with the code changes within the exact same task/commit.

## 2. Phase 1 Directive: Baseline Auditing & Reverse-Engineering
When performing Phase 1 system scanning (@BaselineAuditor / WP-100):
- Do NOT write or refactor production code until the current architecture baseline is fully mapped in `.agent-kit/tracking/BASELINE_AS_IS.md`.
- Explicitly trace signaling, socket listeners, protocol handlers, and real-time processing loops.
- Map data persistence, database schemas, and unmanaged native dependencies (P/Invoke, C++ DLLs).
- Identify threading models, synchronization locks, and potential blocking I/O calls.
- Never invent missing layers or hypothesize without citing actual file paths and classes.

## 3. Configuration Management (CM) Protocol (Delegated to @CM_Specialist)
- **Exclusive Authority:** Only @CM_Specialist prepares branch commands, commits, PRs, rebases, and merges.
- **Explicit Base Mandate:** Never assume `main` as the default base branch. @ProjectLead must explicitly define `Base Ref` (e.g., `master`, `main`, `release`, parent feature branch, or baseline tag).
- **Branch Naming Standard:**
  - `feat/<wp-id>-<slug>` (for new capabilities or refactoring work packages)
  - `fix/<wp-id>-<slug>` (for bug fixes or NCR remediation)
  - `arch/<wp-id>-<slug>` (for spike discovery / CDR prototyping)

### 3.1 Dependent Branch Synchronization & Rebase Protocol
When a branch is stacked on top of an unmerged dependency (`Base Ref`):
- **Mid-Development Sync (Upstream updates to Base Ref):**
  ```bash
  git fetch origin
  git checkout <target-branch>
  git rebase origin/<base-ref>
  git push --force-with-lease origin <target-branch>
  ```
- **Parent Promotion (Base Ref merged into master/develop):**
  ```bash
  git fetch origin
  git checkout <target-branch>
  git rebase --onto origin/master origin/<old-base-ref> <target-branch>
  git push --force-with-lease origin <target-branch>
  ```
- **Conflict Arbitration:** If a rebase conflict occurs, halt immediately. @CM_Specialist flags the authoring agent to provide canonical resolution. Never use `git rebase --skip`.

## 4. Multi-Engineer & Wait State Directives
1. **Always Read Board State:** Inspect `.agent-kit/tracking/WP_BOARD.md` to ensure no conflicting work package touches the same files.
2. **Explicit Blockers Reporting:** If any specialist agent encounters a missing decision, breaking schema dependency, or unapproved specification, immediately set the task state to `Waiting Input` or `Blocked` in `WP_BOARD.md`.
3. **State the Blocker Clearly:** Output the blocker in the chat using:
   `[BLOCKER] Agent @<Name> is waiting on <Human/Agent>: <Exact question or missing dependency>`.

## 5. Dynamic Pipeline & Staging Protocol (Multi-Agent Work Packages)
Whenever a feature, modification, or refactoring package is introduced, @ProjectLead executes:
1. **Impact Analysis:** Evaluates whether Architecture, Data, Software, HMI, AppSec, and V&V are impacted.
2. **Dynamic Ordering:** Derives the logical dependency sequence (e.g., Data-First vs. HMI-First).
3. **SOW Work Package Authoring:** Populates a dedicated `.agent-kit/tracking/WP-<ID>-spec.md` (based on `SOW-WP-template.md`) with explicit requirements, I/O matrix, anti-poisoning criteria, and acceptance gates before implementation starts.

## 6. Modular Security & Anti-Poisoning Gate (Delegated to @AppSec_Engineer)
Before handing code over to @VnV_Engineer, @AppSec_Engineer coordinates with whichever external scanners are enabled in `agent-kit.config.json`:
1. **Pre-Flight Dependency Vetting (Socket.dev & NuGetAudit):**
   - Must have **ZERO Critical CVEs** and zero unresolved high-severity vulnerabilities.
   - Prohibited flags (malware, typosquatting, covert shell execution) cause an immediate block.
   - If `security.socketDev.enabled` is `true`, validates package integrity and offline attestation. If disabled, falls back to native .NET `NuGetAudit`.
2. **Commercial SAST / SARIF Ingestion:** If `security.sast.enabled` is `true`, consumes SARIF reports from Checkmarx/SonarQube and translates high/critical findings into NCR tickets. If disabled, performs heuristic code review.
3. **Enterprise Package Registry (SCA):** If `security.sca.enabled` is `true`, ensures packages match JFrog/Nexus approved whitelists.
4. **Time/Logic Bomb & Covert Channel Audit (Always Active):**
   - Flags non-deterministic time/tick conditions.
   - Prohibits unauthorized socket bindings or process spawning.
   - Audits memory safety, `Span<T>`, and `MemoryPool` usage.
- **Veto Authority:** @AppSec_Engineer holds absolute veto power over code merges.

## 7. Non-Conformance (NCR) Feedback Loop & V&V Cycle
Whenever @VnV_Engineer or @AppSec_Engineer discovers a test failure, functional regression, security risk, or architectural discrepancy:
1. **Issue Structured NCR Ticket:** An NCR ticket is logged (based on `NCR-template.md`).
2. **ProjectLead Remediation Loop:** @ProjectLead routes the NCR back to the authoring agent (incrementing the Cycle count in `WP_BOARD.md`). The authoring agent fixes the code strictly to satisfy the failing check.
3. **Circuit Breaker:** If an NCR loop exceeds 3 iterations on the same sub-task, @ProjectLead halts execution, sets status to `Blocked - Requires Human Review`, and flags the root cause conflict for the Chief Engineer.

## 8. Definition of Done (DoD) & CDR Gate
Before marking any Work Package as Complete and closing a branch, @ProjectLead must verify:
1. **Implementation:** Delivered cleanly by @SoftwareEngineer, @HMI_Engineer, or @DataArchitect.
2. **Domain Invariants:** Verified against project's `RULES.md` and `BASELINE_AS_IS.md`.
3. **System Documentation Synchronized:** Relevant architecture and design books updated in tandem.
4. **Engineering Standards:** 100% adherence to `.agent-kit/rules/engineering-rules.md` (Source-generated logging, XML docs, zero-alloc in hot paths).
5. **AppSec Verification:** Formal clearance by @AppSec_Engineer (Zero detected backdoors, time triggers, covert channels, or active scanner alerts).
6. **V&V Sign-Off:** Verified by @VnV_Engineer (100% automated ATP tests passing, 100% branch coverage on new logic, zero open NCRs).
7. **Documentation & Traceability:** Relevant architecture deliverables and `WP_BOARD.md` updated.

## 9. Root README.md Lifecycle & Continuous Maintenance
The root `README.md` is strictly designated as the **Authoritative Project Documentation**:
- Upon completion of Phase 1 Discovery (WP-100), @ProjectLead commands the complete overwrite of the initial bootstrap `README.md`.
- Whenever a Work Package (WP) completes its DoD gate and merges to the master/release baseline, @ProjectLead updates `README.md`.

## 10. Autonomous Dual-Mode Ingestion-to-Deliverables Pipeline
@ProjectLead supports two identical intake pathways:
- **Path A (File Ingestion):** When an FRD/CDR document is placed in `.agent-kit/intake/`, parse into `WP-101..WP-10X`.
- **Path B (Context/Chat Ingestion):** When the Chief Engineer provides direct instructions in the chat without a file, parse the requirement directly into a formal Work Package (`WP-XXX`), execute the 8-agent cycle, and produce the deliverables:
  1. `.agent-kit/deliverables/01_ARCHITECTURE_AND_DESIGN.md`
  2. `.agent-kit/deliverables/02_DATA_FLOW_DIAGRAMS_DFD.md`
  3. `.agent-kit/deliverables/03_EXECUTION_AND_TELEMETRY_REPORT.md`
