# 01. System Architecture & Detailed Design Document (CDR Deliverable)

## 1. Executive Summary & Traceability Matrix
- **Target Baseline:** .NET 8.0 LTS | C# 12.0 | Air-Gapped Mission-Critical Node
- **Lead Architects:** `@SystemArchitect` & `@ProjectLead`
- **Domain Invariants Ref:** `RULES.md` / `BASELINE_AS_IS.md`

| Requirement ID | Architectural Subsystem | Design Pattern / Mechanism | Assigned Work Package | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-001** | Core Ingress Plane | Zero-Alloc `Span<T>` + `Channel<T>` | WP-101 | Automated Unit & Benchmark Test |
| **REQ-002** | Persistence / Audit | SQLite WAL / Dapper Fast Path | WP-102 | Integration Test |

---

## 2. Component Topology & Subsystem Boundaries
```text
+-----------------------------------------------------------------------+
|                        HMI / Operator Console                         |
|                 (Throttled 10-15Hz Telemetry Binding)                 |
+-----------------------------------+-----------------------------------+
                                    | Async Command / Event Bus
                                    v
+-----------------------------------------------------------------------+
|                      Application & Domain Core                        |
|        (Pure Async Orchestration, Session State Machine, C2)          |
+-----------------+-----------------------------------+-----------------+
                  |                                   |
                  v                                   v
+-----------------------------------+   +-------------------------------+
|    Real-Time Data / I/O Plane     |   |   Persistence & Audit Layer   |
| (MemoryPool<byte>, Span<T>, UDP)  |   | (SQLite/PostgreSQL, Dapper)   |
+-----------------------------------+   +-------------------------------+
```

---

## 3. Core Interfaces & Contract Specifications (.NET 8.0 / C# 12)
*(Interfaces adhering strictly to xi_, xo_, m_ prefixes and full XML contracts)*

---

## 4. Concurrency, Memory & Security Architecture
- **Hot-Path Allocation Profile:** Zero GC Gen-2 allocations; strict `MemoryPool<byte>.Shared` lifecycle.
- **Synchronization Primitives:** Lock-free single-writer/single-reader `Channel<T>` pipelines.
- **Observability:** Compile-time `[LoggerMessage]` source generators.
