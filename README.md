# 🛡️ ITB-SCREEN-RECORDER

מערכת Enterprise ללכידת מסך, הקלטה אקטיבית ושידור נתונים לשרת מרכזי (C2), המותאמת באופן מלא לסביבות ארגוניות מבודדות (Air-Gapped)[cite: 1]. המערכת מספקת צפייה חיה בזמן אמת, הקלטות רציפות וטלמטריה חיה, תוך שאיפה לאפס עומס מעבד (Zero CPU Load) בעמדות הקצה באמצעות האצת חומרה ייעודית (NVIDIA NVENC)[cite: 1]. המערכת כתובה ב-.NET 8 ומציעה תמיכה היברידית מלאה בסביבות Windows ו-Linux[cite: 1].

---

## 🏗️ ארכיטקטורת המערכת (System Architecture)

המערכת פותחה בארכיטקטורת תהליכים מבוזרת ונחלקת ל-4 פרויקטים מרכזיים כדי למנוע שכפול קוד, לעקוף מגבלות מערכת הפעלה (Session 0 Isolation) ולספק תמיכה היברידית חוצת-פלטפורמות[cite: 1]:

```
                                  ┌─────────────────────────────────────────┐
                                  │      ITB-SCREEN-RECORDER.Core           │
                                  │   (Class Library - Pure .NET 8 BCL)     │
                                  └────────────────────┬────────────────────┘
                                                       │ Shared Contracts & IPC Models
                        ┌──────────────────────────────┴──────────────────────────────┐
                        ▼                                                             ▼
┌──────────────────────────────────────────────┐              ┌──────────────────────────────────────────────┐
│        ITB-SCREEN-RECORDER.Server            │              │          ITB Endpoints (100+ Nodes)          │
│   (ASP.NET Core Web API / Podman Host)       │              ├──────────────────────────────────────────────┤
├──────────────────────────────────────────────┤              │ 🛡️ AgentService (Session 0 / systemd Daemon) │
│ • MediaMTX Child Process Supervisor          │              │   ├── Watchdog & C2 Heartbeat Loop           │
│ • NetApp Storage & Wall-Clock 15m Chunker    │              │   └── Process Launcher (CreateProcessAsUser) │
│ • Active Directory (LDAP / RBAC Engine)      │  RTMP Stream │                                              │
│ • React C2 Dashboard (wwwroot Static Server) │◄─────────────┤ 🎥 AgentWorker (Session 1 / GUI Context)     │
│ • Dynamic Config Engine (IOptionsMonitor)    │  (Port 19350)│   ├── DirectX DXGI / X11 Grab (Zero CPU)     │
└──────────────────────────────────────────────┘              │   ├── WASAPI / PulseAudio Dual Mixer         │
                                                              │   ├── Compression Engine: FFmpeg (Subprocess)│
                                                              │   └── Local Offline Buffer (.flv failover)   │
                                                              └──────────────────────────────────────────────┘
```

### 1. 📦 פרויקט התשתית: `ITB-SCREEN-RECORDER.Core`
* **Single Source of Truth:** ספריית Class Library המהווה מקור אמת יחיד לכלל מודלי התקשורת, ה-DTOs וחוזי ה-API של המערכת[cite: 1, 5].
* **ללא תלויות צד-שלישי (Pure BCL):** נשענת אך ורק על ספריות הבסיס המובנות ב-.NET 8 (כגון `System.Text.Json` ו-`System.Diagnostics.PerformanceCounter`) כדי לשמור על קובץ סוכן רזה ולמנוע בעיות תאימות בהפצה[cite: 3].
* **תקשורת IPC חוצת פלטפורמות:** שימוש בסוקטים מקומיים של TCP (Loopback 127.0.0.1) להעברת אודיו ווידאו גולמיים בין C# ל-FFmpeg בצורה אחידה הן ב-Windows והן ב-Linux[cite: 1, 2].
* **דגימות חומרה:** רכיבי `HardwareProbe` ו-`HardwareTelemetry` לתקשורת ישירה מול ממשקי NVML של NVIDIA (או ספריות לינוקס מקבילות) לדגימת ניצולת GPU ו-CPU בזמן אמת ובחירת מקודד מיטבי[cite: 1, 2].

### 2. 🧠 פרויקט השרת המרכזי: `ITB-SCREEN-RECORDER.Server`
אורקסטרטור C# (.NET 8 Web API) המשמש כמוח המערכת ומנהל את מאות הזרמים הנכנסים[cite: 1]:
* **ארכיטקטורת Podman (בסביבת Linux):** מערכת השרת ורכיבי הווידאו נארזים ומופעלים כקונטיינר תחת **Podman**, מה שמבטיח בידוד תהליכים מושלם, סביבת OS נקייה והעלאת גרסאות חלקה ברשת מבודדת[cite: 1].
* **פיקוח על שרת וידאו (MediaMTX):** מריץ ומפקח על תהליך ה-`mediamtx` לקליטת זרמי RTMP, מטפל בהתאוששות אוטומטית מקריסות (Crash Recovery) ומרכז את כל הלוגים למקום אחד[cite: 1, 4].
* **חיתוך ואחסון חכם (NetApp):** חיתוך וידאו רציף ומדויק לפי "שעון קיר" (Wall-Clock Chunker) באינטרוולים של 15 דקות ללא איבוד פריימים, ושמירה ישירה לנתיבי UNC / SMB באחסון המרכזי[cite: 1].
* **אינטגרציית Active Directory:** שליפת היררכיית ה-OU בארגון באמצעות שאילתות LDAP, תמיכה ב-SSO ואימות מבוסס JWT ו-RBAC.
* **שליטה ובקרה (React C2 Dashboard):** שרת Kestrel מובנה המגיש ממשק Web ב-React (מתיקיית `wwwroot`) לתצוגת מטריצת מסכים חיה, שליטה בעמדות וניתוח טלמטריה[cite: 1, 7].

### 3. 🛡️ פרויקט שירות הרקע בתחנות: `ITB-SCREEN-RECORDER.AgentService`
שירות הפועל ברמת המערכת ועוקף את מגבלות ה-Session 0 Isolation של Windows[cite: 1, 8]:
* **הרשאות וסביבה:** בווינדוס פועל כשירות רקע (Windows Service) תחת הרשאות `SYSTEM`; בלינוקס מנוהל כ-systemd Daemon תחת הרשאות Root או רמת-מערכת[cite: 1].
* **Watchdog ותקשורת C2:** מאזין לפקודות השרת, מנהל Heartbeat תקופתי, שומר את הסטייה של שעון השרת ומעביר פקודות ל-Worker דרך Named Pipes מאובטחים[cite: 1, 2].
* **מזניק תהליכים (Launcher):** מאזין לאירועי Logon של משתמשים ומזניק באמצעות `CreateProcessAsUser` (תוך דגימת ה-User Token) את ה-Worker ישירות לתוך ה-Session הגרפי של המשתמש הפעיל (Session 1)[cite: 1].

### 4. 🎥 פרויקט סוכן הלכידה: `ITB-SCREEN-RECORDER.AgentWorker`
תהליך הלכידה בפועל, הרץ באופן שקוף בסביבת המשתמש (Interactive Session / Session 1)[cite: 1, 5]:
* **גישה ישירה לחומרה:** לכידת מסך מהירה דרך DirectX DDA (Vortice) בווינדוס או X11 בלינוקס, ולכידת שמע כפולה (מיקרופון + רמקולים) באמצעות WASAPI Dual Mixer או PulseAudio[cite: 1, 2, 5].
* **מנוע הדחיסה והמיזוג (FFmpeg):** ה-Worker מנהל את תהליך ה-**FFmpeg** המקומי, המשמש כ**מנוע הדחיסה (Compression Engine)** הבלעדי של המערכת[cite: 1]. הנתונים הגולמיים מוזרמים ל-FFmpeg דרך Loopback Sockets לביצוע דחיסה ושידור RTMP[cite: 1, 2].
* **האצת חומרה ו-Fallback:** זיהוי חומרה אוטומטי להפעלת קידוד `h264_nvenc` באפס עומס מעבד, עם Fallback אוטומטי ובטוח לקידוד מעבד (`libx264`) אם לא קיים כרטיס תומך[cite: 1, 2].
* **מנגנון Offline Buffer:** בעת נתק תקשורת מהשרת (Air-Gap / כשל רשת), ה-Worker מתעל את הזרם ישירות לקובץ `.flv` מקומי בדיסק, ומונע אובדן מידע[cite: 1, 2].

---

## 📁 מבנה ה-Solution והקבצים (Project Structure)

```text
ITB-SCREEN-RECORDER/
├── ITB-SCREEN-RECORDER.sln
│
├── ITB-SCREEN-RECORDER.Core/                 # תשתית משותפת וחוזים
│   ├── DTOs/
│   │   └── AuthDto.cs                        # מודלי אימות והרשאות AD
│   ├── Models/
│   │   ├── CommunicationModels.cs            # DTOs לטלמטריה, Heartbeat ופקודות C2
│   │   └── SystemConfig.cs                   # מודל תצורה מרכזי מוקלד (Strongly-Typed)
│   ├── Infrastructure/
│   │   ├── HardwareProbe.cs                  # זיהוי אוטומטי של מקודדי חומרה
│   │   ├── HardwareTelemetry.cs              # דגימת NVML ומשאבי מעבד חוצי-פלטפורמות
│   │   └── SingleInstanceLock.cs             # נעילה למניעת הרצה כפולה
│   └── ITB-SCREEN-RECORDER.Core.csproj
│
├── ITB-SCREEN-RECORDER.Server/               # מוח השרת וה-Middleware
│   ├── Controllers/
│   │   ├── AgentController.cs                # קבלת טלמטריה ושיגור פקודות
│   │   ├── AuthController.cs                 # אימות משתמשים ו-JWT
│   │   ├── ConfigController.cs               # עדכון תצורה חי מהדשבורד
│   │   └── DirectoryController.cs            # חילוץ עץ Active Directory
│   ├── Services/
│   │   ├── ConfigurationService.cs           # מנוע תצורה דינמי (Hot-Reload)
│   │   ├── MediaMtxSupervisorWorker.cs       # פיקוח והרצת MediaMTX כתהליך-בן
│   │   ├── TelemetryStateService.cs          # שמירת מצב תחנות בזיכרון (In-Memory)
│   │   └── WallClockChunkerService.cs        # חיתוך וידאו כל 15 דקות ל-NetApp
│   ├── wwwroot/                              # ממשק המשתמש (React C2 Dashboard)
│   │   ├── index.html
│   │   └── assets/
│   ├── MediaMTX/                             # קובצי מנוע הסטרימינג
│   │   ├── mediamtx.exe                      # הבינארי של MediaMTX
│   │   └── mediamtx.yml                      # הגדרות שרת הסטרימינג
│   ├── appsettings.json                      # קובץ התצורה המרכזי של השרת
│   ├── Dockerfile                            # הגדרת קונטיינר ל-Podman / Linux
│   └── ITB-SCREEN-RECORDER.Server.csproj
│
├── ITB-SCREEN-RECORDER.AgentService/         # שירות מערכת (Session 0 / Watchdog)
│   ├── Infrastructure/
│   │   └── InteractiveProcessLauncher.cs     # הזנקת תהליכים ל-Session 1 (Win32 API)
│   ├── Services/
│   │   └── AgentSupervisorService.cs         # ניטור Worker ותקשורת C2
│   ├── Program.cs
│   └── ITB-SCREEN-RECORDER.AgentService.csproj
│
├── ITB-SCREEN-RECORDER.AgentWorker/          # סוכן הלכידה והמדיה (Session 1)
│   ├── Engine/
│   │   ├── AgentEngine.cs                    # מכונת המצבים של הסוכן
│   │   └── FfmpegProcessManager.cs           # ניהול מנוע הדחיסה של FFmpeg
│   ├── Providers/
│   │   ├── Audio/
│   │   │   ├── AudioCaptureFactory.cs        # בחירת מנוע שמע לפי מערכת הפעלה
│   │   │   ├── WasapiDualMixer.cs            # מיקסר שמע לווינדוס (מיקרופון + רמקולים)
│   │   │   └── LinuxPulseAudioMixer.cs       # לוכד שמע ללינוקס (PulseAudio)
│   │   └── Video/
│   │       ├── ScreenCaptureFactory.cs       # בחירת לוכד מסך לפי מערכת הפעלה
│   │       ├── DxgiScreenCapture.cs          # לכידת מסך ישירה מה-GPU (DXGI DDA)
│   │       └── LinuxX11ScreenCapture.cs      # לכידת מסך ללינוקס (X11)
│   ├── appsettings.json                      # הגדרות סוכן מקומיות
│   └── ITB-SCREEN-RECORDER.AgentWorker.csproj
│
└── ITB-SCREEN-RECORDER.Installer/            # פרויקט יצירת חבילת התקנה
    └── Package.wxs                           # הגדרות WiX Toolset לייצור קובץ MSI
```

---

## 💻 דרישות מערכת (Requirements)

### חומרה (Hardware)
* **שרת מרכזי (Server):** 8 Cores CPU, 16GB RAM, כרטיס רשת 1Gbps/10Gbps, ורוחב פס ייעודי לאחסון NetApp מרכזי.
* **תחנות קצה (Endpoints):** מעבד מרובע-ליבות מודרני, 8GB RAM, כרטיס מסך תומך NVIDIA (המלצה: כרטיסי RTX התומכים ב-NVENC כגון RTX 4070 ומעלה) לקבלת אפס עומס מעבד (Zero CPU Load).
* **תחנות ללא GPU:** במכונות ללא כרטיס ייעודי המערכת תבצע Fallback לקידוד CPU (דרושות לפחות 2 ליבות פנויות לקידוד x264)[cite: 2].

### תוכנה ומערכות הפעלה (OS & Runtimes)
* **שרת:** Windows Server 2022 או Linux Enterprise (RHEL 9+, Rocky Linux, Ubuntu 22.04+).
* **תחנות קצה:** Windows 11 Enterprise (64-bit) או הפצות Linux תואמות (X11 Desktop)[cite: 2, 8].
* **סביבת ריצה:** .NET 8 Runtime / Hosting Bundle מותקן בשרת ובתחנות (במידה ולא משתמשים בתוצר Self-Contained)[cite: 4, 8].
* **קובצי בינארי נלווים:**
  * מנוע `FFmpeg` (גרסה 6.1 ומעלה עם תמיכת NVENC)[cite: 2, 4].
  * שרת `MediaMTX` (גרסה v1.8.x ומעלה)[cite: 4].
  * מנוע **Podman** (במידה והשרת מופעל בסביבת לינוקס)[cite: 1].

---

## ⚙️ מדריך הגדרות ותצורה (Configuration Guide)

המערכת פועלת על פי עקרון **Zero Hardcoded Parameters**[cite: 4]. כל ההגדרות נטענות דינמית באמצעות `IOptionsMonitor` בזמן אמת (Hot-Reload) ללא צורך באתחול שירותים[cite: 1].

### 1. קובץ הגדרות השרת (`appsettings.json`)

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "[http://0.0.0.0:5090](http://0.0.0.0:5090)"
      }
    }
  },
  "SystemConfig": {
    "MediaMtx": {
      "ExecutablePath": "MediaMTX/mediamtx.exe",
      "PublicHostname": "128.200.3.10",
      "RtmpPort": 19350,
      "HlsPort": 8888,
      "ApiPort": 9997
    },
    "Storage": {
      "UncStoragePath": "\\\\netapp-storage.corp\\Recordings",
      "ChunkIntervalMinutes": 15,
      "RetentionDays": 30,
      "DiskAlertThresholdPercent": 85
    },
    "ActiveDirectory": {
      "LdapServer": "corp-dc01.domain.local",
      "RootOuDistinguishedName": "OU=Workstations,DC=corp,DC=local",
      "AdminGroup": "ITB_Admins",
      "CacheDurationHours": 24
    }
  },
  "Serilog": {
    "MinimumLevel": "Information"
  }
}
```

### 2. קובץ הגדרות הסוכן (`appsettings.json` ב-Worker)

```json
{
  "AppConfig": {
    "DashboardApiUrl": "[http://128.200.3.10:5090/api/v1/agent/telemetry](http://128.200.3.10:5090/api/v1/agent/telemetry)",
    "RtmpServerBaseUrl": "rtmp://128.200.3.10:19350/live/",
    "VideoEncoder": "auto",
    "VideoBitrate": "4500k",
    "TargetFps": 30,
    "LocalBufferPath": "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Buffer",
    "LogFilePath": "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Logs\\Agent.log",
    "AutoStartRecordingOnLaunch": true
  }
}
```

### 3. דריסות תצורה בסביבת Windows (Registry Overrides)
בסביבות ארגוניות המופצות באמצעות MSI, ה-Agent קורא דריסות מתוך ה-Registry בנתיב `HKLM\SOFTWARE\ITB\ScreenRecorder`[cite: 6]:
* `ServerIp`: כתובת ופורט ה-Middleware (למשל `128.200.3.10:5090`) – דורס את נתיבי ה-API וה-RTMP אוטומטית[cite: 6].
* `VideoBitrate`: ביטרייט מותאם אישית לתחנה (למשל `5M`)[cite: 2].
* `LocalBufferPath`: נתיב דיסק מקומי חלופי לאגירת קובצי וידאו בעת נתק[cite: 2].

---

## 🚦 תחילת עבודה והרצה (Getting Started)

### בניית הפרויקטים (Build from Source)

```bash
# 1. שכפול המאגר
git clone [https://github.com/your-org/ITB-SCREEN-RECORDER.git](https://github.com/your-org/ITB-SCREEN-RECORDER.git)
cd ITB-SCREEN-RECORDER

# 2. שחזור חבילות וקימפול ה-Solution
dotnet restore
dotnet build -c Release
```

### הרצת השרת

#### בסביבת Windows:
```powershell
cd ITB-SCREEN-RECORDER.Server
dotnet run -c Release
# או הפעלה ישירה של תוצר ה-Publish כ-Windows Service
```

#### בסביבת Linux (באמצעות Podman):
```bash
cd ITB-SCREEN-RECORDER.Server

# בניית ה-Container Image
podman build -t itb-recorder-server:latest -f Dockerfile .

# הרצת הקונטיינר עם מיפוי הפורטים ונתיב ה-Storage
podman run -d \
  --name itb-server \
  --restart always \
  -p 5090:5090 \
  -p 19350:19350 \
  -p 8888:8888 \
  -v /mnt/netapp/recordings:/recordings:Z \
  itb-recorder-server:latest
```

### כניסה ל-Dashboard
לאחר הפעלת השרת, פתח את הדפדפן וגש לכתובת:
`http://localhost:5090` (או כתובת ה-IP המוגדרת בשרת) לצפייה במטריצת המסכים ובטלמטריה החיה.

---

## 🚀 פריסה, התקנה ו-CI/CD

המערכת פועלת באמצעות מנגנוני פריסה טבעיים (Native Deployments) ואוטומציה מלאה ב-GitHub Actions המייצרים תוצרים עצמאיים לחלוטין (Self-Contained Binaries) ללא תלות באינטרנט חיצוני[cite: 1, 6]:

* **סביבת Windows (התקנת MSI):**
  תהליך ה-CI/CD מקמפל חבילת התקנה מסוג `.msi` (באמצעות פרויקט WiX Toolset)[cite: 1, 6]. ניתן לדחוף את ה-MSI בהתקנה שקטה דרך ManageEngine Endpoint Central או SCCM[cite: 1, 6]:
  ```cmd
  msiexec.exe /i "ITB-ScreenRecorder-Agent-Setup.msi" /qn /norestart SERVER_IP="128.200.3.10:5090"
  ```
* **סביבת Linux (Podman והעתקת קבצים):**
  * **פריסת שרת:** שרת ה-Linux נארז ורץ בתוך קונטיינר **Podman**, מה שמאפשר הרצה מבודדת ונקייה מתלויות מערכת הפעלה[cite: 1].
  * **פריסת תחנות (Agents):** מבוססת על העתקת תיקיית הבינאריים, הענקת הרשאות ריצה (`chmod +x`), והגדרת שירות `systemd` מנהל[cite: 1]. ה-CI מוריד ומשלב בילד סטטי של FFmpeg ישירות לתוך החבילה, מה שמייתר לחלוטין צורך בחיבור לרשת או שדרוגי ספריות OS במהלך ההתקנה[cite: 1].

---

## ⚖️ הבהרה משפטית ורישוי (Disclaimer: FFmpeg Dependency)

מערכת זו פועלת בשילוב הדוק ומוחלט עם מנוע העיבוד והמדיה **FFmpeg** לצורך דחיסת הווידאו (NVENC/libx264), סנכרון תדרי השמע (Audio Resampling) ואריזת הזרם (RTMP/FLV Multiplexing)[cite: 1, 2]. **המערכת מתוכננת כיחידה העוטפת את יכולות מנוע הדחיסה הזה, ואינה יכולה לתפקד בלעדיו בשום אופן**[cite: 1].

**הערת קוד פתוח ו-GPL:**
פרויקט FFmpeg מופץ תחת רישיון הקוד הפתוח **GPL** (General Public License)[cite: 1]. על מנת לעמוד בתנאי רישיון זה ולשמור על הקניין הרוחני (IP) של ה-Middleware והסוכנים כקוד סגור ומסחרי, הארכיטקטורה תוכננה בהתאם למתווה המשפטי של **"קיבוץ גרידא" (Mere Aggregation)**[cite: 1]:

1. קוד המערכת (C#) **אינו** מטמיע בתוכו את קוד המקור, אינו מבצע קומפילציה פנימית של ספריות ה-FFmpeg, ואינו משתמש ב-DLLs של FFmpeg בתוך מרחב הזיכרון של התוכנה[cite: 1].
2. מנוע הדחיסה (FFmpeg) מופעל כקובץ בינארי עצמאי הרץ כ**תהליך חיצוני ומבודד לחלוטין (External Sub-process)** המנוהל על ידי מחלקת ה-`FfmpegProcessManager` ב-Worker[cite: 1, 2].
3. התקשורת מתבצעת אך ורק דרך צינורות נתונים סטנדרטיים ברמת מערכת ההפעלה: זרימת וידאו גולמי (Raw BGRA) אל ה-Standard Input וזרימת אודיו גולמי דרך סוקטים פנימיים (TCP Sockets/Named Pipes)[cite: 1, 2].

🔗 **אתר הפרויקט להורדה ולעיון בקוד המקור של FFmpeg:**  
[https://ffmpeg.org](https://ffmpeg.org)[cite: 1]