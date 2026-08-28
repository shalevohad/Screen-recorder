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
```

1. **Service Watchdog (Session 0):** `AgentService` runs continuously in the background under `SYSTEM` privileges (or as a root daemon on Linux). It maintains heartbeats with the central server, tracks server clock time drift (`ServerUtcOffset`), and listens for user logon/interactive desktop sessions.
2. **Interactive Desktop Worker (Session 1):** When a user logs in, the service queries the user security token (`WTSQueryUserToken`) and launches `AgentWorker` directly inside the user's graphical desktop session (Session 1) using `CreateProcessAsUser`.
3. **Hardware Frame & Dual-Audio Ingest:** The worker captures desktop frames directly from the GPU via DirectX Desktop Duplication (DXGI DDA with Vortice) on Windows or X11 on Linux. Simultaneously, it captures and mixes default speaker playback with active microphone inputs (WASAPI Dual Mixer / PulseAudio).
4. **Sub-process Compression (FFmpeg):** The worker manages an isolated local **FFmpeg** process as its compression and multiplexing engine. Raw BGRA video and float32 audio buffers are streamed into FFmpeg via loopback TCP sockets, encoding video via `h264_nvenc` with automatic software fallback (`libx264`) if no supported GPU is present.
5. **Air-Gap Resilient Streaming & Offline Buffering:** Compressed streams are pushed over RTMP strictly to the central `MediaMTX` server. If a network disconnect occurs, the worker redirects the live stream into an offline `.flv` disk buffer, resuming transmission once connectivity is restored.
6. **Central Ingestion & Storage Chunking:** The workstation never interacts with enterprise storage. `MediaMTX` and the server middleware receive the incoming stream, segment the video into 15-minute files aligned with wall-clock time, and write them directly to NetApp storage shares (UNC/SMB) without frame drops.

---

## 🏗️ System Architecture & Solution Breakdown

### 1. 📦 Shared Foundation: `ITB-SCREEN-RECORDER.Core`
* **Single Source of Truth:** A standalone class library containing all system data transfer objects (`AuthDto`, `CommunicationModels`), provider abstractions (`IAudioCaptureProvider`, `IScreenCaptureProvider`), typed settings (`AppConfig`, `SystemConfig`, `ConfigLoader`), single-instance locks (`SingleInstanceLock`), and cross-platform IPC socket infrastructure (`IpcServerFactory`, `IpcContracts`).
* **Zero Third-Party Dependencies:** Relies strictly on standard .NET 8 Base Class Libraries (`System.Text.Json`, `System.Diagnostics.PerformanceCounter`) to eliminate runtime conflicts and keep binary footprints minimal.
* **Hardware Detection & Telemetry:** Contains `HardwareProbe` for detecting hardware encoders and `HardwareTelemetry` for reading real-time GPU/CPU metrics directly from NVML (`nvml.dll` / `libnvidia-ml.so`).

### 2. 🧠 Master Orchestrator: `ITB-SCREEN-RECORDER.Server`
A centralized ASP.NET Core (.NET 8 Web API) application serving as the control plane:
* **Containerized Deployment (Podman):** On Linux hosts, the server orchestrator and streaming infrastructure run inside rootless **Podman** containers, isolating host operating-system dependencies.
* **MediaMTX Process Supervisor:** `MediaMtxSupervisorWorker` and `MediaMtxApiClient` manage the lifecycle of the `mediamtx` streaming binary as a supervised child process, ensuring automated restart on failure and diagnostic log aggregation.
* **Storage Integration & Recording Scheduler:** `RecordingChunkScheduler` and `StoragePathResolver` write video streams directly to network shares (NetApp UNC / SMB paths) and split sessions into 15-minute segments aligned with wall-clock time without frame drops.
* **Command & Control (C2) Web Interface:** Built-in Kestrel web server hosting a compiled React/Vite dashboard (`ClientApp` build outputs inside `wwwroot`) for fleet grid monitoring and real-time station diagnostics via Native WebRTC.

### 3. 🛡️ System Watchdog: `ITB-SCREEN-RECORDER.AgentService`
A background supervisor addressing OS-level Session 0 isolation constraints:
* **Execution Context:** Operates as a Windows Service under `NT AUTHORITY\SYSTEM` or a Linux `systemd` daemon.
* **Watchdog & Fleet C2:** `AgentSupervisorService` maintains communication with the central server, computes time drift offsets, and manages local worker processes.
* **Interactive Process Launcher:** `WindowsProcessLauncher` / `InteractiveProcessLauncher` uses Win32 token queries to launch the capture worker directly inside the active interactive user session (Session 1) on logon.

### 4. 🎥 Ingestion & Compression Worker: `ITB-SCREEN-RECORDER.AgentWorker`
The user-session worker executing in Session 1 responsible for screen capture, audio mixing, and encoding:
* **Direct Hardware Capture:** Desktop frame buffers are captured via `DxgiScreenCapture` (DirectX DDA with Vortice) on Windows or `LinuxX11ScreenCapture` on Linux, with hardware cursor rendering via `MouseCursorOverlay`.
* **Dual Audio Mixing:** Blends default output audio (loopback speakers) with active microphone inputs using `WasapiDualMixer` (NAudio) or `LinuxPulseAudioMixer`.
* **Compression Engine (FFmpeg):** `FfmpegProcessManager` executes and manages **FFmpeg** as an external sub-process. Raw video frames and audio buffers are streamed continuously into FFmpeg's standard input and local IPC sockets.
* **Hardware Acceleration & Safe Fallback:** Configures FFmpeg to utilize hardware encoders (`h264_nvenc`, Intel QSV, or AMD AMF) for zero CPU load, with automatic fallback to software encoding (`libx264`) if no compatible GPU is detected.
* **Offline Resiliency Buffer:** Redirects the stream to a local `.flv` storage cache when server network connectivity is lost, resuming transmission once connectivity is restored.

---

## 💻 System Requirements

### Hardware Requirements
* **Central Server:** 8 Cores CPU, 16 GB RAM, 1 Gbps / 10 Gbps dedicated NIC, direct high-throughput network access to central storage.
* **Workstation Endpoints:** Modern quad-core CPU, 8 GB RAM, NVIDIA discrete GPU supporting NVENC (e.g., RTX 4070 series) for zero-load operation.
* **CPU-Only Fallback:** Workstations without a dedicated GPU require at least 2 available physical CPU cores for software encoding (`libx264`).

### Software & Operating System Requirements
* **Server Host:** Windows Server 2022 or Enterprise Linux (RHEL 9+, Rocky Linux, Ubuntu 22.04 LTS).
* **Endpoints:** Windows 11 Enterprise (64-bit) or Linux desktop environments with an active X11 display server.
* **Runtimes & Frameworks:** .NET 8.0 Runtime or Hosting Bundle (when using framework-dependent deployments).
* **Required Binaries:**
  * `FFmpeg` (version 6.1+ compiled with NVENC support).
  * `MediaMTX` (version v1.8.x+)[cite: 1].
  * `Podman` (for Linux containerized server deployments).

---

## ⚙️ Configuration Guide

The platform adheres to a **Zero Hardcoded Parameters** design philosophy[cite: 1]. All configuration files support dynamic hot-reloading at runtime via `IOptionsMonitor` without restarting running services.

### 1. Server Configuration (`appsettings.json`)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "[http://0.0.0.0:5090](http://0.0.0.0:5090)"
      }
    }
  },
  "AppConfig": {
    "EnableFileLogging": true,
    "LogFilePath": "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Logs\\Server-Log.txt",
    "LogRetentionDays": 30
  },
  "SystemConfig": {
    "RecordingRetentionDays": 30,
    "MaxStorageQuotaGb": 100,
    "DashboardRefreshRateMs": 3000,
    "DefaultVideoBitrate": "2M",
    "DefaultTargetFps": 20,
    "DisplayTimezone": "Asia/Jerusalem",
    "DisplayLocale": "en-US",
    "MediaMtx": {
      "ExecutablePath": "MediaMTX\\mediamtx.exe",
      "RtmpPort": 19350,
      "ApiPort": 9997,
      "HlsPort": 8888
    },
    "Storage": {
      "NetAppUncPath": "\\\\NetAppStorage\\CaptureRecordings",
      "LocalFallbackPath": "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Recordings",
      "ChunkIntervalMinutes": 5,
      "RetentionDays": 30,
      "ChunkEventLogPath": "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Logs\\chunk-events.log"
    },
    "Security": {
      "AllowedAdAdminGroup": "C2_Admins",
      "JwtSecretKey": "YOUR_STRONG_SECRET_KEY_HERE",
      "TokenExpirationHours": 8
    }
  }
}
```

### 2. Client Configuration (`appsettings.json`)

```json
{
  "AppConfig": {
    "DashboardApiUrl": "[http://127.0.0.1:5090/api/v1/agent/telemetry](http://128.200.3.10:5090/api/v1/agent/telemetry)",
    "RtmpServerBaseUrl": "rtmp://127.0.0.1:19350/live/",
    "VideoEncoder": "h264_nvenc",
    "VideoBitrate": "5000k",
    "TargetFps": 30,
    "AudioSampleRate": 48000,
    "AudioChannels": 2,
    "CaptureSpeakers": true,
    "CaptureMicrophone": true,
    "LocalBufferPath": "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Buffer",
    "MaxBufferDurationHours": 4,
    "LogFilePath": "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Logs\\Agent.log",
    "AutoStartRecordingOnLaunch": true
  }
}
```

### 3. Windows Registry Parameter Overrides
When distributed across enterprise workstation fleets via MSI installers, client configuration values can be overridden via the Windows Registry under `HKLM\SOFTWARE\ITB\ScreenRecorder`:
* `ServerIp`: Central middleware IP and port (e.g., `127.0.0.1:5090`) – dynamically overrides both API and RTMP targets.
* `VideoBitrate`: Custom stream bitrate for bandwidth-limited subnets (e.g., `4500k`, `6000k`).
* `LocalBufferPath`: Alternative target drive path for failover offline buffers.

---

## 🚦 Operations & User Manual (Getting Started)

### Step 1: Building the Solution from Source

```bash
# 1. Clone repository
git clone [https://github.com/your-org/ITB-SCREEN-RECORDER.git](https://github.com/your-org/ITB-SCREEN-RECORDER.git)
cd ITB-SCREEN-RECORDER

# 2. Restore dependencies and compile solution in Release mode
dotnet restore
dotnet build -c Release
```

---

### Step 2: Deploying & Starting the Central Server

#### Option A: Running on Windows Server
1. Ensure the `MediaMTX` folder containing `mediamtx.exe` and `mediamtx.yml` is present in the server publish directory.
2. Execute the compiled server application:
   ```powershell
   cd ITB-SCREEN-RECORDER.Server
   dotnet run -c Release
   ```
3. Alternatively, install and run using the generated MSI package (`ITB-ScreenRecorder-Server-Setup-1.0.21.2.msi`).

#### Option B: Running on Linux via Podman (Recommended for Enterprise)
1. Build the server container image:
   ```bash
   cd ITB-SCREEN-RECORDER.Server
   podman build -t itb-recorder-server:latest -f Dockerfile .
   ```
2. Launch the container with exposed ports and storage volume mounts:
   ```bash
   podman run -d \
     --name itb-server \
     --restart always \
     -p 5090:5090 \
     -p 19350:19350 \
     -p 8888:8888 \
     -v /mnt/netapp/recordings:/recordings:Z \
     itb-recorder-server:latest
   ```

---

### Step 3: Accessing the C2 Dashboard
Open any modern web browser and navigate to:
```text
http://<SERVER_IP>:5090
```
* **Fleet Matrix Grid:** View real-time station thumbnails with sub-second latency (WebRTC / HLS).
* **Station Analytics:** Monitor CPU, GPU, RAM, encoder status, and network health per station.
* **Station Controls:** Remotely trigger start, stop, or bit-rate reconfiguration across stations.

---

### Step 4: Deploying Agents to Workstations

#### Windows Endpoints (Silent MSI Deployment)
Deploy the native `.msi` package generated by the WiX installer (`ITB-SCREEN-RECORDER.Installer`) using enterprise deployment tools (ManageEngine Endpoint Central, Microsoft SCCM):

```cmd
msiexec.exe /i "ITB-ScreenRecorder-Agent-Setup-1.0.21.2.msi" /qn /norestart SERVER_IP="127.0.0.1:5090"
```
* The installer registers and starts `ITB-SCREEN-RECORDER.AgentService` as a background Windows Service (`SYSTEM` context).
* On user logon, `AgentWorker` is spawned automatically into the interactive session.

#### Linux Endpoints (Direct Copy & systemd)
1. Deploy the compiled standalone Agent bundle containing the static `ffmpeg` binary to `/opt/itb-recorder`.
2. Grant execution permissions:
   ```bash
   chmod +x /opt/itb-recorder/ITB-SCREEN-RECORDER.AgentService
   chmod +x /opt/itb-recorder/ITB-SCREEN-RECORDER.AgentWorker
   chmod +x /opt/itb-recorder/ffmpeg
   ```
3. Enable and start the system daemon:
   ```bash
   systemctl enable --now itb-screen-recorder.service
   ```

---

## ⚖️ Legal Notice & Licensing (Disclaimer: FFmpeg Dependency)

This software operates in direct conjunction with **FFmpeg** as its primary compression and multiplexing engine (H.264 hardware encoding, audio resampling, and RTMP stream packaging). **The platform is designed around this engine and cannot function without it**.

**GPL Compliance & Mere Aggregation:**
The FFmpeg project is distributed under the GNU General Public License (**GPL**). To ensure full compliance with GPL requirements while keeping proprietary application logic closed-source, the architecture implements the **"Mere Aggregation"** legal standard:

1. The proprietary C# application code **does not** embed, statically link, dynamically link, or load FFmpeg shared libraries (DLLs/so files) into its internal memory space.
2. The FFmpeg engine is executed as an independent, external sub-process managed by `FfmpegProcessManager` in the worker application.
3. Data exchange occurs strictly via standard OS inter-process communication primitives: uncompressed BGRA frames piped via Standard Input (`pipe:0`) and audio streams routed over local loopback TCP sockets.

🔗 **FFmpeg Project Source & Download:**  
[https://ffmpeg.org](https://ffmpeg.org)
