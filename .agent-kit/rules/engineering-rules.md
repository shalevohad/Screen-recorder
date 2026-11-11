# DEFENSE SOFTWARE ENGINEERING STANDARDS & RUNTIME RULES (.NET 8.0 LTS)

## 1. Primary Technology Stack
- **Target Runtime:** .NET 8.0 LTS exclusively
- **Language:** C# 12.0 (Strict `#nullable enable`)
- **Execution Target:** High-throughput, low-latency, real-time mission-critical background processing.
- **Operational Constraint:** Strictly Air-Gapped deployment environments (Zero external telemetry, zero dynamic cloud dependencies).

## 2. Low-Latency & High-Performance Directives
- **Zero-Allocation Hot Paths:** In I/O pipelines, network packet handlers, telemetry buses, and streaming loops:
  - Prefer `Span<T>`, `ReadOnlySpan<T>`, and `Memory<T>`.
  - Use `ArrayPool<byte>.Shared` or `MemoryPool<byte>.Shared` for transient buffers. Always rent and return within `finally` blocks.
  - Never allocate strings or invoke LINQ inside per-packet/per-tick processing loops.
- **Pure Asynchronous Programming:**
  - Enforce `async`/`await` across all I/O boundaries.
  - Never call `.Result`, `.Wait()`, or `.GetAwaiter().GetResult()` under any condition.
  - Accept and propagate `CancellationToken` through all async call stacks.
  - Use `ValueTask<T>` where synchronous completion is frequent.
- **Concurrency & Event Streams:**
  - Prefer lock-free constructs and `System.Threading.Channels` (`Channel<T>`) for producer-consumer pipelines.
  - Use `SemaphoreSlim` or `Interlocked` operations when synchronization is mandatory. Never lock on publicly accessible objects or `this`.

## 3. Strict Anti-Poisoning & Security Invariants
- **Ban on Sleeper Logic & Time Bombs:**
  - No logic may branch on `DateTime.Now`, `DateTime.UtcNow`, or `Environment.TickCount` unless explicitly mandated as a timeout/lease in the SOW-WP specification.
  - Prohibit magic numbers, arbitrary GUIDs, or undocumented byte arrays in network handlers. All constants must be strongly typed and traced to interface specifications.
- **Ban on Covert Data Exfiltration & Side-Channels:**
  - Never utilize protocol padding fields, reserved packet headers, or timing delays to smuggle auxiliary state.
  - No new network sockets, named pipes, memory-mapped files, or OS processes may be spawned without formal allocation in the CDR design specification.
- **Execution Safety & Reflection Restriction:**
  - Strictly prohibit `Reflection.Emit`, runtime code compilation, `Activator.CreateInstance` on untrusted types, and dynamic expression tree compilation.
  - P/Invoke calls to native Win32/C++ DLLs must be strictly encapsulated, memory-pinned, and documented with explicit boundary assertions.

## 4. Structured Logging & Observability Standard
- **Zero-Allocation Logging:** In high-throughput paths (sockets, streaming loops, per-packet/frame handlers), use compile-time source-generated logging via `[LoggerMessage]`. Do NOT allocate params arrays or call `string.Format`.
- **Structured Fields:** Always pass context as structured key-values (e.g., `_logger.SessionStarted(sessionId, peerIp)`), never format via string interpolation (`$""`).
- **Contextual Scopes:** Use `_logger.BeginScope` to attach `SessionId`, `CorrelationId`, and `MissionId` across async call stacks.

## 5. In-Code Documentation & Commenting Rules
- **Rule of "Why", not "What":** Explain algorithmic rationale, hardware quirks, and thread-safety invariants.
- **Requirement Cross-Referencing:** If an implementation adheres to a specific requirement, reference it directly:
  `// REQ-TRACE: SRS-COMM-302 (Decoupled signaling from data pipeline)`
- **Mandatory XML Summaries:** All public interfaces, classes, and exported APIs must specify `<summary>`, `<param>`, `<returns>`, and `<exception>`.

## 6. Naming Conventions & Variable Semantics (Syntax Rules)
All software implementation (@SoftwareEngineer) and verification (@VnV_Engineer) logic must strictly adhere to the following naming conventions:

| Element Kind | Convention / Prefix | Example | Mandate & Notes |
| :--- | :--- | :--- | :--- |
| **Input Parameter** | `xi_` + camelCase | `xi_packetBuffer`, `xi_sampleRate` | Explicitly identifies external input parameters into methods/functions. |
| **Output Parameter** | `xo_` + camelCase | `xo_bytesProcessed`, `xo_sessionState` | Explicitly identifies `out` or mutable `ref` return parameters. |
| **Private/Protected Field** | `m_` + camelCase | `m_mediaStreamQueue`, `m_socketHandle` | Identifies instance member fields. |
| **Static Field** | `s_` + camelCase | `s_defaultTimeoutMs`, `s_instanceLock` | Identifies static internal members. |
| **Constant (`const`)** | UPPER_SNAKE_CASE / PascalCase | `MAX_PAYLOAD_SIZE`, `DefaultHeaderLength` | Compile-time invariant constants. |
| **Local Variable** | camelCase (no prefix) | `activeSession`, `payloadLength` | Clean descriptive local variables in function scope. |
| **Public Property / Method** | PascalCase (no prefix) | `SessionId`, `ProcessPacket()` | Exported contract APIs and public members. |

## 7. Frontend & HMI Standards (Ergonomics & Performance)
- Follow project design tokens and tactical dark palettes.
- UI Dispatcher thread must never execute file I/O, database queries, or heavy processing.
- Telemetry streams to the UI must be throttled to 10-15 Hz.
