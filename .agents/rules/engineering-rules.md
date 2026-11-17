---
trigger: always_on
---

# Defense Software Engineering Standards & Runtime Rules (.NET 8.0 LTS)

Source of truth: `.agent-kit/rules/engineering-rules.md`

## 1. Low-Latency & High-Performance Directives
- **Zero-Allocation Hot Paths:** In I/O pipelines, network packet handlers, telemetry buses, and streaming loops:
  - Prefer `Span<T>`, `ReadOnlySpan<T>`, and `Memory<T>`.
  - Use `ArrayPool<byte>.Shared` or `MemoryPool<byte>.Shared` for transient buffers. Always rent and return within `finally` blocks.
  - Never allocate strings or invoke LINQ inside per-packet/per-tick processing loops.
- **Pure Asynchronous Programming:**
  - Enforce `async`/`await` across all I/O boundaries.
  - Never call `.Result`, `.Wait()`, or `.GetAwaiter().GetResult()`.
  - Accept and propagate `CancellationToken ct` through all async call stacks.
  - Use `ValueTask<T>` where synchronous completion is frequent.

## 2. Naming Conventions & Variable Semantics
- `xi_` + camelCase: Input parameters (`xi_packetBuffer`, `xi_sampleRate`).
- `xo_` + camelCase: Output parameters (`xo_bytesProcessed`, `xo_sessionState`).
- `m_` + camelCase: Private/protected member fields (`m_mediaStreamQueue`).
- `s_` + camelCase: Static internal fields (`s_instanceLock`).
- PascalCase: Public properties, methods, classes.
- camelCase: Local variables (no prefix).

## 3. Strict Anti-Poisoning & Security Invariants
- Ban on sleeper logic & time triggers: No branching on `DateTime.Now`, `DateTime.UtcNow`, or `Environment.TickCount` without explicit timeout requirement.
- Ban on covert exfiltration or side-channels: No unauthorized network sockets or processes.
- Execution safety: Prohibit `Reflection.Emit`, runtime compilation, or dynamic code generation.

## 4. Structured Logging
- Zero-allocation logging via `[LoggerMessage]` source generation in high-throughput paths.
- Contextual scopes: `_logger.BeginScope`.

## 5. In-Process Media Pipeline Invariants
- Prefer managed in-process encoding, decoding, and probing via `ITB-SCREEN-RECORDER.Core.Media` (`FfmpegInProcessEncoder`, `FfmpegInProcessProbe`, `FfmpegInProcessAudioDecoder`) over external process spawning.
