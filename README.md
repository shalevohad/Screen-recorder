# 🛡️ ITB-SCREEN-RECORDER

An Enterprise command-and-control (C2), screen capture, active recording, and live telemetry streaming platform engineered for fully isolated, air-gapped enterprise environments. The platform supports high-density fleets (100+ endpoints) delivering sub-second latency and continuous recording while maintaining zero CPU overhead on workstations through dedicated hardware acceleration (NVIDIA NVENC / Intel QuickSync). Built on .NET 8, the solution provides cross-platform client and server execution across Windows and Linux.

---

## ⚙️ How It Works (Operational Lifecycle)

The system is designed with a client-server command-and-control topology optimized for high reliability, operating system session isolation, and resilient recording:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                CENTRAL SERVER (C2 & Storage)                           │
│                                                                                        │
│  ┌─────────────────────────┐   ┌─────────────────────────────┐   ┌──────────────────┐  │
│  │   React C2 Dashboard    │   │  MediaMTX Streaming Server  │──►│  NetApp Storage  │  │
│  │  (Fleet Grid & Control) │   │     (RTMP Ingest / WHEP)    │   │ (15m Chunks Sync)│  │
│  └────────────▲────────────┘   └──────────────▲──────────────┘   └──────────────────┘  │
└───────────────┼───────────────────────────────┼────────────────────────────────────────┘
                │ Heartbeat / Telemetry         │ RTMP Stream (:19350)
                │ (HTTP / SignalR)              │ (Video + Audio)
┌───────────────┴───────────────────────────────┴────────────────────────────────────────┐
│                             MANAGED WORKSTATION (Endpoint)                             │
│                                                                                        │
│  ┌────────────────────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │ 🛡️ AgentService (Session 0 / systemd)  │  │ 🎥 AgentWorker (Session 1 / GUI)    │  │
│  │  • Watchdog & Server C2 Sync           │  │  • DirectX DDA / X11 Screen Grab     │  │
│  │  • User Logon Detection                │  │  • WASAPI Speaker + Mic Dual Mixer   │  │
│  │  • Spawns Worker into User Session     │─►│  • FFmpeg Compression Engine (NVENC) │  │
│  │    via Win32 CreateProcessAsUser       │  │  • Local Failover Offline Buffer     │  │
│  └────────────────────────────────────────┘  └──────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
