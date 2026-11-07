# Pre-Flight Dependency Vetting via Socket.dev (Enforced)

This rule governs all package management and third-party dependencies across the ITB-SCREEN-RECORDER solution.

## Mandatory Invariant
Before introducing, installing, or modifying code dependent on any new npm or NuGet package:
1. **Pre-Flight Inspection**: The AI agent or developer MUST query and verify the package on [https://socket.dev/](https://socket.dev/) (e.g., `https://socket.dev/npm/package/<name>` or `https://socket.dev/nuget/package/<name>`).
2. **Metrics Verification**:
   - **Supply Chain Risk Score**: Check for suspicious install/postinstall scripts, network access during install, or unverified author takeovers.
   - **Vulnerabilities**: Must have **ZERO Critical CVEs** and zero unresolved high-severity vulnerabilities.
   - **Quality & Maintenance**: Must have healthy release cadence and clear open-source license compliance.
   - **Prohibited Flags**: Packages flagging Socket **Critical Alerts** (malware, typosquatting, protestware, shell execution) are **STRICTLY PROHIBITED**.
3. **Alternative Selection Before Coding**:
   - If a package does not satisfy the safety criteria, you must NEVER write code around it.
   - You MUST select a vetted alternative or implement the functionality using native platform APIs (Node.js standard library, native Web APIs, .NET standard library) before writing code.
4. **Build Gate Enforcement**:
   - `npm audit --audit-level=critical` is wired into MSBuild targets with `ContinueOnError="false"`.
   - CI workflows enforce `socketsecurity/socket-action@v1` and `npm audit --audit-level=critical`, strictly failing the build on critical vulnerabilities.
