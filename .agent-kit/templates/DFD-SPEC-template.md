# 02. Data Flow Diagrams (DFD) & Threat Boundary Specification

## 1. DFD Level 0: System Context Diagram
```text
+---------------------+        External Network / Sensor         +--------------------------+
|  External Peer /    | =======================================> |                          |
|  Tactical Node      | <======================================= |    TARGET DEFENSE NODE   |
+---------------------+              Telemetry                   |    (Air-Gapped Core)     |
                                                                 |                          |
+---------------------+        Operator Commands / Input         |  [Zero-Trust Ingress]    |
|  Operator Workstation| =======================================> |                          |
|  (HMI Console)      | <======================================= |                          |
+---------------------+        15Hz Throttled Telemetry          +-------------+------------+
                                                                               |
                                                                               | Encrypted State I/O
                                                                               v
                                                                 +--------------------------+
                                                                 |   Local Audit & State    |
                                                                 |   Database (SQLite WAL)  |
                                                                 +--------------------------+
```

---

## 2. DFD Level 1: Subsystem Decomposition & Trust Boundaries
```mermaid
flowchart TB
    subgraph IngressBoundary ["Untrusted Ingress Boundary"]
        N1[Socket / Sensor Listener]
    end

    subgraph TrustedCore ["Zero-Allocation Processing Core (Trusted Zone)"]
        P1(1.0 Packet Validator & Bounds Checker)
        P2(2.0 Lock-Free Channel Router)
        P3(3.0 Domain Logic Engine)
        B1[(MemoryPool<byte> Shared Buffer)]
    end

    subgraph StorageHMI ["Presentation & Persistence Plane"]
        D1[(Local State / Audit DB)]
        H1[4.0 HMI Dispatcher (15Hz)]
    end

    N1 -->|Raw Ingress Bytes| P1
    P1 -->|Validated ReadOnlySpan<byte>| B1
    B1 -->|Rented Buffer Lease| P2
    P2 -->|Async ValueTask| P3
    P3 -->|Throttled Telemetry| H1
    P3 -->|Structured Event| D1
```

---

## 3. DFD Level 2: Buffer Lifecycle & Zero-Allocation Hot Path
| Step | Source | Target | Data Payload | Memory Allocation Policy | Security Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | OS Socket / Stream | Ingress Receiver | `Memory<byte>` | `MemoryPool<byte>.Shared.Rent()` | Max packet size guard |
| **2** | Receiver | Protocol Parser | `ReadOnlySpan<byte>` | Stack-only slice (0 bytes heap) | Magic bytes & CRC check |
| **3** | Parser | Worker Pipeline | Strongly-typed struct | `readonly record struct` | Invariant assertion |
| **4** | Pipeline | Finally Block | `IMemoryOwner<byte>` | `.Dispose()` return to pool | Zero buffer retention |
