# 🏗️ ITB Screen Recorder Server - מסמך ארכיטקטורה, מפרט טכני ומדריך פיתוח

## 📋 תוכן עניינים
1. [סקירת מערכת ומטרות העל](#1-סקירת-מערכת-ומטרות-העל)
2. [ארכיטקטורת השרת (System Architecture)](#2-ארכיטקטורת-השרת-system-architecture)
3. [תקשורת ופרוטוקולים (C2 & Telemetry)](#3-תקשורת-ופרוטוקולים-c2--telemetry)
4. [מפרט API מלא (Endpoints & Schemas)](#4-מפרט-api-מלא-endpoints--schemas)
5. [אינטגרציה מול מנוע המדיה (MediaMTX / RTMP / HLS)](#5-אינטגרציה-מול-מנוע-המדיה-mediamtx--rtmp--hls)
6. [ניהול אופליין ובאפרים (Offline Buffer Synchronization)](#6-ניהול-אופליין-ובאפרים-offline-buffer-synchronization)
7. [מבנה הפרויקט ב-.NET 8 והגדרות Configuration](#7-מבנה-הפרויקט-ב-net-8-והגדרות-configuration)
8. [מדריך יישום שלב-אחר-שלב (Implementation Guide)](#8-מדריך-יישום-שלב-אחר-שלב-implementation-guide)

---

## 1. סקירת מערכת ומטרות העל

פרויקט ה-**ITB Screen Recorder Server** מהווה את מרכז השליטה והבקרה (Command & Control - C2) וריכוז הטלמטריה והמדיה עבור תשתית הניטור וההקלטה הארגונית. השרת מיועד לתמוך בעבודה רציפה מול **70-100 תחנות קצה (Windows 11 Endpoints)** המריצות את ה-`ITB.Agent`.

### 🎯 מטרות עיקריות:
* **ניהול Telemetry & Heartbeat:** קבלת פעימות ניטור בזמן אמת מתחנות הקצה (שימוש ב-CPU, זיכרון, עמוס דיסק, חלון פעיל, סטטוס מקודד וידאו).
* **ערוץ פיקוד בזמן אמת (Real-Time C2):** שליחת פקודות אקטיביות לתחנות (התחלת/הפסקת הקלטה, שינוי Bitrate/Encoder בזמן ריצה, כפיית סנכרון).
* **קליטה ועיבוד הזרמת מדיה (RTMP/FLV Ingestion):** תיאום ותזמור מול שרת הזרמה (MediaMTX) להסרטה בלייב ואגירת הקלטות.
* **סנכרון קובצי אופליין (Offline Buffer Ingestion):** קבלת קובצי FLV שנאגרו במחשבי הקצה בזמן ניתוק תקשורת, ומיזוגם במערך האחסון המרכזי.
* **ארכיטקטורת Enterprise חסינת תקלות:** עבודה ב-Async I/O מלא, Low-Latency, ואבטחת ערוצי התקשורת.

---

## 2. ארכיטקטורת השרת (System Architecture)

השרת מבוסס **ASP.NET Core 8.0 Web API** בשילוב **SignalR Hub** לתקשורת אסינכרונית דו-כיוונית.

```
+-----------------------------------------------------------------------+
|                             ITB.Agent (x100)                          |
|  [DXGI Capture] [WASAPI Audio] [FFmpeg] --> [RTMP Stream / FLV Buffer]|
+-----------------------------------------------------------------------+
        | (HTTP POST / SignalR)                      | (RTMP Stream)
        v                                            v
+------------------------------------+    +-----------------------------+
|    ITB Recorder Server (.NET 8)    |    |  MediaMTX (RTMP/HLS Server) |
|                                    |    +-----------------------------+
| - AgentController (Telemetry API)  |                   |
| - AgentC2Hub (SignalR WebSockets)  |                   v
| - BufferSyncController (Uploads)   |    +-----------------------------+
| - StorageManagerService            |    | Central Storage / Archive   |
+------------------------------------+    +-----------------------------+
        |                                                ^
        +------------------------------------------------+
```

### 🧩 רכיבי הליבה בשרת:
1. **`AgentTelemetryController`**: מקבל נתוני פעימת חיים (Heartbeats) מכל תחנה ב-HTTP POST לסינכרון מהיר.
2. **`AgentC2Hub` (SignalR Hub)**: מנהל חיבור WebSocket קבוע מול כל תחנה לשליחת פקודות מיידיות ללא Polling.
3. **`BufferSyncController`**: מטפל בהעלאה מקטועה (Chunked Upload) של קובצי אופליין שנוצרו בתחנות בזמן ניתוק.
4. **`MediaMtxOrchestrator`**: מתממשק מול ה-API של MediaMTX לניטור streams פעילים, תיוג ותיעוד שעות התחלה/סיום.
5. **`AgentStatusStore` (In-Memory / Distributed Cache)**: שומר את המצב העדכני של 100 התחנות בזיכרון לגישה באפס השהיה (Zero-Latency Status Lookup).

---

## 3. תקשורת ופרוטוקולים (C2 & Telemetry)

המערכת משלבת בין שני ערוצי תקשורת מקבילים למקסימום אמינות:

### א. ערוץ הטלמטריה (HTTP REST / JSON)
* **פרוטוקול:** HTTP/2 / HTTPS
* **תדירות:** פעם ב-3 עד 5 שניות מכל Agent.
* **תפקיד:** דיווח מדדי משאבים, סטטוס מנוע ההקלטה, ואישור קבלת פקודות.

### ב. ערוץ הפיקוד בזמן אמת (SignalR / WebSockets)
* **פרוטוקול:** WebSocket עם תמיכה ב-Long Polling כ-Fallback.
* **תפקיד:**
  * שליחת פקודות יזומות מהשרת ל-Agent (`StartStreaming`, `StopStreaming`, `UpdateConfig`, `RequestBufferUpload`).
  * עדכון קידוד בזמן אמת (למשל מעבר מ-`h264_nvenc` ל-`libx264`).

---

## 4. מפרט API מלא (Endpoints & Schemas)

### 1️⃣ דיווח טלמטריה (Heartbeat)
* **HTTP Method:** `POST`
* **Route:** `/api/agent/telemetry`

#### Request Body Schema (JSON):
```json
{
  "hostname": "WORKSTATION-102",
  "agentVersion": "1.2.0.0",
  "timestampUtc": "2026-08-09T12:15:00.000Z",
  "cpuUsagePercent": 14.2,
  "ramUsageMb": 245.8,
  "activeWindowTitle": "Microsoft Teams - Daily Standup",
  "isStreamingActive": true,
  "isInOfflineBufferMode": false,
  "currentEncoder": "h264_nvenc",
  "currentFps": 30,
  "activeDestination": "rtmp://128.200.3.10:19350/live/WORKSTATION-102"
}
```

#### Response Body Schema (JSON):
```json
{
  "status": "Success",
  "serverTimeUtc": "2026-08-09T12:15:00.102Z",
  "pendingCommand": {
    "commandId": "CMD-9942",
    "action": "NONE",
    "parameters": {}
  }
}
```

---

### 2️⃣ העלאת קובץ אופליין (Buffer Chunk Upload)
* **HTTP Method:** `POST`
* **Route:** `/api/agent/buffer/upload`
* **Content-Type:** `multipart/form-data`

#### Form Parameters:
* `hostname` (string): שם המחשב
* `fileGuid` (string): מזהה ייחודי של קובץ הבאפר
* `chunkIndex` (int): אינדקס המקטע הנוכחי
* `totalChunks` (int): סה"כ מקטעים
* `file` (binary): קובץ ה-FLV / המקטע המועלה

#### Response Schema (JSON):
```json
{
  "fileGuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "chunkIndex": 3,
  "isCompleted": false,
  "message": "Chunk 3 received successfully."
}
```

---

## 5. אינטגרציה מול מנוע המדיה (MediaMTX / RTMP / HLS)

שרת ה-Backend מתקשר ישירות מול שרת ה-RTMP/RTSP (`MediaMTX`) לניהול זרמי המדיה.

### א. תצורת MediaMTX (`mediamtx.yml`)
ה-Server יוצא מתוך הנחה ש-MediaMTX מוגדר להקליט אוטומטית או לאפשר שידור חי:
```yaml
paths:
  live/~^(.+)$:
    source: publisher
    record: yes
    recordPath: ./recordings/%path/%Y-%m-%d_%H-%M-%S.flv
    recordFormat: flv
```

### ב. תהליך רישום הזרמה ב-Server (`MediaMtxOrchestrator.cs`)
1. ה-Agent מתחיל להזריק RTMP בכתובת `rtmp://<Server_IP>:19350/live/<HOSTNAME>`.
2. שרת ה-MediaMTX שולח Webhook ב-HTTP POST לשרת שלנו בנתיב `/api/media/on-publish`.
3. שרת ה-API מעדכן את ה-In-Memory State שהתחנה `<HOSTNAME>` נמצאת במצב הקלטה פעיל בלייב ומסנכרן את חותמת הזמן ה-UTC.

---

## 6. ניהול אופליין ובאפרים (Offline Buffer Synchronization)

כאשר תחנה חוזרת מאירוע ניתוק תקשורת (Offline Buffer Mode):
1. ה-Agent מזהה חיבור מחודש לערוץ ה-Telemetry.
2. ה-Agent מדווח על קיומם של קובצי FLV מקומיים בתיקיית ה-`LocalBufferPath`.
3. ה-Server שולח פקודת `FORCE_BUFFER_UPLOAD` דרך ערוץ ה-SignalR / Telemetry Response.
4. ה-Agent מעלה את הקובץ במקטעים (Chunks) ל-`BufferSyncController`.
5. ה-Server מאחד את המקטעים (Reassembly) ושומר את הקובץ בארכיון המרכזי תחת הנתיב:
   `\CentralStorage\Recordings\<HOSTNAME>\<YYYY-MM-DD>\`

---

## 7. מבנה הפרויקט ב-.NET 8 והגדרות Configuration

### 📁 מבנה הפרויקט (Project Solution Structure):
```text
ITBRecorderServer/
├── Controllers/
│   ├── AgentTelemetryController.cs
│   ├── BufferSyncController.cs
│   └── MediaWebhookController.cs
├── Hubs/
│   └── AgentC2Hub.cs
├── Services/
│   ├── IAgentStatusStore.cs
│   ├── AgentStatusStore.cs
│   ├── MediaMtxOrchestrator.cs
│   └── StorageManagerService.cs
├── Models/
│   ├── TelemetryReportDto.cs
│   ├── ServerCommandDto.cs
│   └── AgentState.cs
├── Configuration/
│   └── ServerConfig.cs
├── Program.cs
└── appsettings.json
```

### 📄 קובץ הגדרות השרת (`appsettings.json`):
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ServerConfig": {
    "ListenPort": 8080,
    "MediaMtxApiUrl": "http://localhost:9997/v3",
    "CentralStoragePath": "C:\ITB_Recordings_Archive",
    "MaxBufferChunkSizeMb": 10,
    "AgentOfflineTimeoutSeconds": 15,
    "ApiKey": "ITB-SECURE-C2-KEY-2026-SECRET"
  }
}
```

---

## 8. מדריך יישום שלב-אחר-שלב (Implementation Guide)

### 🔹 שלב 1: יצירת מחלקת ה-DTOs (`Models/TelemetryReportDto.cs`)
```csharp
namespace ITBRecorderServer.Models
{
    public class TelemetryReportDto
    {
        public string Hostname { get; set; } = string.Empty;
        public string AgentVersion { get; set; } = string.Empty;
        public DateTime TimestampUtc { get; set; }
        public double CpuUsagePercent { get; set; }
        public double RamUsageMb { get; set; }
        public string ActiveWindowTitle { get; set; } = string.Empty;
        public bool IsStreamingActive { get; set; }
        public bool IsInOfflineBufferMode { get; set; }
        public string CurrentEncoder { get; set; } = "libx264";
        public int CurrentFps { get; set; } = 30;
        public string ActiveDestination { get; set; } = string.Empty;
    }

    public class ServerCommandDto
    {
        public string CommandId { get; set; } = Guid.NewGuid().ToString("N");
        public string Action { get; set; } = "NONE"; // NONE, START_STREAM, STOP_STREAM, RECONFIGURE
        public Dictionary<string, string> Parameters { get; set; } = new();
    }
}
```

### 🔹 שלב 2: ניהול זיכרון המצב בשרת (`Services/AgentStatusStore.cs`)
```csharp
using System.Collections.Concurrent;
using ITBRecorderServer.Models;

namespace ITBRecorderServer.Services
{
    public interface IAgentStatusStore
    {
        void UpdateStatus(TelemetryReportDto report);
        IEnumerable<TelemetryReportDto> GetAllAgents();
        void SetPendingCommand(string hostname, ServerCommandDto command);
        ServerCommandDto? GetAndClearPendingCommand(string hostname);
    }

    public class AgentStatusStore : IAgentStatusStore
    {
        private readonly ConcurrentDictionary<string, TelemetryReportDto> _latestReports = new();
        private readonly ConcurrentDictionary<string, ServerCommandDto> _pendingCommands = new();

        public void UpdateStatus(TelemetryReportDto report)
        {
            _latestReports[report.Hostname] = report;
        }

        public IEnumerable<TelemetryReportDto> GetAllAgents() => _latestReports.Values;

        public void SetPendingCommand(string hostname, ServerCommandDto command)
        {
            _pendingCommands[hostname] = command;
        }

        public ServerCommandDto? GetAndClearPendingCommand(string hostname)
        {
            if (_pendingCommands.TryRemove(hostname, out var command))
            {
                return command;
            }
            return null;
        }
    }
}
```

### 🔹 שלב 3: ה-Controller של הטלמטריה (`Controllers/AgentTelemetryController.cs`)
```csharp
using ITBRecorderServer.Models;
using ITBRecorderServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ITBRecorderServer.Controllers
{
    [ApiController]
    [Route("api/agent")]
    public class AgentTelemetryController : ControllerBase
    {
        private readonly IAgentStatusStore _statusStore;
        private readonly ILogger<AgentTelemetryController> _logger;

        public AgentTelemetryController(IAgentStatusStore statusStore, ILogger<AgentTelemetryController> logger)
        {
            _statusStore = statusStore;
            _logger = logger;
        }

        [HttpPost("telemetry")]
        public IActionResult ReceiveTelemetry([FromBody] TelemetryReportDto report)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return BadRequest("Invalid telemetry payload.");
            }

            _statusStore.UpdateStatus(report);

            // בדיקה אם יש פקודה רשומה לתחנה הזו
            var pendingCommand = _statusStore.GetAndClearPendingCommand(report.Hostname) 
                                 ?? new ServerCommandDto { Action = "NONE" };

            return Ok(new
            {
                Status = "Success",
                ServerTimeUtc = DateTime.UtcNow,
                PendingCommand = pendingCommand
            });
        }
    }
}
```

### 🔹 שלב 4: ה-SignalR Hub לתקשורת אקטיבית (`Hubs/AgentC2Hub.cs`)
```csharp
using Microsoft.AspNetCore.SignalR;

namespace ITBRecorderServer.Hubs
{
    public class AgentC2Hub : Hub
    {
        private readonly ILogger<AgentC2Hub> _logger;

        public AgentC2Hub(ILogger<AgentC2Hub> logger)
        {
            _logger = logger;
        }

        public async Task RegisterAgent(string hostname)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, hostname);
            _logger.LogInformation("Agent '{Hostname}' registered in C2 SignalR Group (ConnectionId: {ConnectionId}).", hostname, Context.ConnectionId);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _logger.LogWarning("Agent disconnected from SignalR Hub: {ConnectionId}", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
```

### 🔹 שלב 5: ה-`Program.cs` המרכזי
```csharp
using ITBRecorderServer.Hubs;
using ITBRecorderServer.Services;

var builder = WebApplication.CreateBuilder(args);

// הוספת שירותים למכולת ה-DI
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddSingleton<IAgentStatusStore, AgentStatusStore>();

var app = builder.Build();

app.UseRouting();
app.UseAuthorization();

app.MapControllers();
app.MapHub<AgentC2Hub>("/hubs/c2");

app.Run("http://0.0.0.0:8080");
```

---

## 📌 סיכום וצעדים הבאים
מסמך זה מהווה את התוכנית הארכיטקטונית המלאה לבניית שרת ה-Middleware. הקוד מוכן ליישום מיידי ב-Visual Studio 2022 תחת פרויקט **ASP.NET Core Web API (.NET 8)**, ומספק מענה אמין, מהיר ושקוף לניהול 100 תחנות הקצה בארגון.
