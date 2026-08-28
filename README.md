# 🛡️ ITB-SCREEN-RECORDER

An Enterprise command-and-control (C2), screen capture, active recording, and live telemetry streaming platform engineered for fully isolated, air-gapped enterprise environments[cite: 8, 10]. The platform supports high-density fleets (100+ endpoints) delivering sub-second latency and continuous recording while maintaining zero CPU overhead on workstations through dedicated hardware acceleration (NVIDIA NVENC / Intel QuickSync)[cite: 8, 10, 15]. Built on .NET 8, the solution provides cross-platform client and server execution across Windows and Linux[cite: 10, 15].

---

## ⚙️ How It Works (Operational Lifecycle)

The system is designed with a client-server command-and-control topology optimized for high reliability, operating system session isolation, and resilient recording:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                CENTRAL SERVER (C2 & Storage)                           │
│  ┌─────────────────────────┐   ┌─────────────────────────────┐   ┌──────────────────┐  │
│  │   React C2 Dashboard    │   │  MediaMTX Streaming Server  │   │  NetApp Storage  │  │
│  │  (Fleet Grid & Control) │   │     (RTMP Ingest / WHEP)    │   │ (15m Chunks Sync)│  │
│  └────────────▲────────────┘   └──────────────▲──────────────┘   └────────▲─────────┘  │
└───────────────┼───────────────────────────────┼───────────────────────────┼────────────┘
                │ Heartbeat / Telemetry         │ RTMP Stream (:19350)      │ Direct UNC
                │                               │                           │
┌───────────────┴───────────────────────────────┴───────────────────────────┴────────────┐
│                             MANAGED WORKSTATION (Endpoint)                             │
│  ┌────────────────────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │ 🛡️ AgentService (Session 0 / systemd)  │  │ 🎥 AgentWorker (Session 1 / GUI)    │  │
│  │  • Watchdog & Server C2 Sync           │  │  • DirectX DDA / X11 Screen Grab     │  │
│  │  • User Logon Detection                │  │  • WASAPI Speaker + Mic Dual Mixer   │  │
│  │  • Spawns Worker into User Session     │─►│  • FFmpeg Compression Engine (NVENC) │  │
│  │    via Win32 CreateProcessAsUser       │  │  • Local Failover Offline Buffer     │  │
│  └────────────────────────────────────────┘  └──────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Service Watchdog (Session 0):** `AgentService` runs continuously in the background under `SYSTEM` privileges (or as a root daemon on Linux)[cite: 10, 15]. It maintains heartbeats with the central server, tracks server clock time drift (`ServerUtcOffset`), and listens for user logon/interactive desktop sessions[cite: 10, 15].
2. **Interactive Desktop Worker (Session 1):** When a user logs in, the service queries the user security token (`WTSQueryUserToken`) and launches `AgentWorker` directly inside the user's graphical desktop session (Session 1) using `CreateProcessAsUser`[cite: 10, 15].
3. **Hardware Frame & Dual-Audio Ingest:** The worker captures desktop frames directly from the GPU via DirectX Desktop Duplication (DXGI DDA with Vortice) on Windows or X11 on Linux[cite: 15]. Simultaneously, it captures and mixes default speaker playback with active microphone inputs (WASAPI Dual Mixer / PulseAudio)[cite: 15].
4. **Sub-process Compression (FFmpeg):** The worker manages an isolated local **FFmpeg** process as its compression and multiplexing engine[cite: 10, 15]. Raw BGRA video and float32 audio buffers are streamed into FFmpeg via loopback TCP sockets, encoding video via `h264_nvenc` with automatic software fallback (`libx264`) if no supported GPU is present[cite: 15].
5. **Air-Gap Resilient Streaming & Offline Buffering:** Compressed streams are pushed over RTMP to the central `MediaMTX` server[cite: 8, 9, 10]. If a network disconnect occurs, the worker redirects the live stream into an offline `.flv` disk buffer, resuming transmission once connectivity is restored[cite: 8, 10, 15].
6. **Central Storage & Wall-Clock Chunking:** The server orchestrator segments incoming station streams into 15-minute files aligned with wall-clock time and writes them directly to enterprise storage shares (NetApp UNC/SMB) without frame drops[cite: 9, 10, 13].

---

## 💻 System Requirements

### Hardware Requirements
* **Central Server:** 8 Cores CPU, 16 GB RAM, 1 Gbps / 10 Gbps dedicated NIC, direct high-throughput network access to central storage[cite: 10].
* **Workstation Endpoints:** Modern quad-core CPU, 8 GB RAM, NVIDIA discrete GPU supporting NVENC (e.g., RTX 4070 series) for zero-load operation[cite: 10, 13, 15].
* **CPU-Only Fallback:** Workstations without a dedicated GPU require at least 2 available physical CPU cores for software encoding (`libx264`)[cite: 15].

### Software & Operating System Requirements
* **Server Host:** Windows Server 2022 or Enterprise Linux (RHEL 9+, Rocky Linux, Ubuntu 22.04 LTS)[cite: 10, 15].
* **Endpoints:** Windows 11 Enterprise (64-bit) or Linux desktop environments with an active X11 display server[cite: 10, 15].
* **Runtimes & Frameworks:** .NET 8.0 Runtime or Hosting Bundle (when using framework-dependent deployments)[cite: 10, 15].
* **Required Binaries:**
  * `FFmpeg` (version 6.1+ compiled with NVENC support)[cite: 10, 15].
  * `MediaMTX` (version v1.8.x+)[cite: 9, 10].
  * `Podman` (for Linux containerized server deployments)[cite: 15].

---

## ⚙️ Configuration Guide

The platform adheres to a **Zero Hardcoded Parameters** design philosophy[cite: 10]. All configuration files support dynamic hot-reloading at runtime via `IOptionsMonitor` without restarting running services[cite: 9, 10].

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
    "DashboardApiUrl": "[http://128.200.3.10:5090/api/v1/agent/telemetry](http://128.200.3.10:5090/api/v1/agent/telemetry)",
    "RtmpServerBaseUrl": "rtmp://128.200.3.10:19350/live/",
    "VideoEncoder": "h264_nvenc",
    "VideoBitrate": "4500k",
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
When distributed across enterprise workstation fleets via MSI installers, client configuration values can be overridden via the Windows Registry under `HKLM\SOFTWARE\ITB\ScreenRecorder`[cite: 8]:
* `ServerIp`: Central middleware IP and port (e.g., `128.200.3.10:5090`) – dynamically overrides both API and RTMP targets[cite: 8].
* `VideoBitrate`: Custom stream bitrate for bandwidth-limited subnets (e.g., `4500k`, `6000k`)[cite: 8].
* `LocalBufferPath`: Alternative target drive path for failover offline buffers[cite: 8, 15].

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
1. Ensure the `MediaMTX` folder containing `mediamtx.exe` and `mediamtx.yml` is present in the server publish directory[cite: 9, 10].
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
* **Fleet Matrix Grid:** View real-time station thumbnails with sub-second latency (WebRTC / HLS)[cite: 8, 9, 14].
* **Station Analytics:** Monitor CPU, GPU, RAM, encoder status, and network health per station[cite: 8, 10].
* **Station Controls:** Remotely trigger start, stop, or bit-rate reconfiguration across stations[cite: 10, 11].

---

### Step 4: Deploying Agents to Workstations

#### Windows Endpoints (Silent MSI Deployment)
Deploy the native `.msi` package generated by the WiX installer (`ITB-SCREEN-RECORDER.Installer`) using enterprise deployment tools (ManageEngine Endpoint Central, Microsoft SCCM)[cite: 11, 12]:

```cmd
msiexec.exe /i "ITB-ScreenRecorder-Agent-Setup-1.0.21.2.msi" /qn /norestart SERVER_IP="128.200.3.10:5090"
```
* The installer registers and starts `ITB-SCREEN-RECORDER.AgentService` as a background Windows Service (`SYSTEM` context)[cite: 10, 12].
* On user logon, `AgentWorker` is spawned automatically into the interactive session[cite: 11, 12].

#### Linux Endpoints (Direct Copy & systemd)
1. Deploy the compiled standalone Agent bundle containing the static `ffmpeg` binary to `/opt/itb-recorder`[cite: 15].
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

This software operates in direct conjunction with **FFmpeg** as its primary compression and multiplexing engine (H.264 hardware encoding, audio resampling, and RTMP stream packaging)[cite: 10, 11, 15]. **The platform is designed around this engine and cannot function without it**[cite: 10, 15].

**GPL Compliance & Mere Aggregation:**
The FFmpeg project is distributed under the GNU General Public License (**GPL**). To ensure full compliance with GPL requirements while keeping proprietary application logic closed-source, the architecture implements the **"Mere Aggregation"** legal standard:

1. The proprietary C# application code **does not** embed, statically link, dynamically link, or load FFmpeg shared libraries (DLLs/so files) into its internal memory space.
2. The FFmpeg engine is executed as an independent, external sub-process managed by `FfmpegProcessManager` in the worker application.
3. Data exchange occurs strictly via standard OS inter-process communication primitives: uncompressed BGRA frames piped via Standard Input (`pipe:0`) and audio streams routed over local loopback TCP sockets[cite: 15].

🔗 **FFmpeg Project Source & Download:**  
[https://ffmpeg.org](https://ffmpeg.org)
