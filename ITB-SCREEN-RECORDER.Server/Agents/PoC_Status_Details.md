# 📝 ITB-SCREEN-RECORDER - מפרט ויעדי תוכנית ה-PoC הראשונית

## 🎯 מטרת העל של ה-PoC
הוכחת היתכנות אקטיבית ורזה (מקצה לקצה) עבור צינור הטלמטריה והזרמת המדיה של 100 התחנות, תוך אימות יציבות האורקסטרטור המרכזי.

## 🏗️ רכיבי הליבה הממומשים

### 1. שרת הליבה (C# Middleware - .NET 8)
- **Single Instance Enforcement:** שימוש ב-Global Mutex מבוסס מערכת הפעלה (`Global\ITB-SCREEN-RECORDER-SERVER-MUTEX`) לחסימה אקטיבית של הרצת אינסטנס כפול.
- **MediaMTX Supervisor:** תהליך שירות רקע (`BackgroundService`) המנהל את `mediamtx.exe` כתהליך-בן. כולל מנגנון ניטור אקטיבי (כל 5 שניות) והרמה אוטומטית מקריסה (Auto-Recovery).
- **In-Memory Station Store:** ניהול מצב התחנות הפעילות בזיכרון השרת (Thread-Safe באמצעות `ConcurrentDictionary`) עם מנגנון פינוי אוטומטי (Aging Out) לתחנות שלא דיווחו מעל 15 שניות.

### 2. ממשק הבקרה (React C2 Dashboard)
- **טכנולוגיה:** מבוסס **React.js** מלא (מימוש רזה ב-`wwwroot`).
- **זרם עבודה (Flow):** תחקור אסינכרוני (Polling) כל 3 שניות מול ה-Endpoint של ה-Telemetry Controller.
- **ניגון וידאו:** שימוש ב-Components ייעודיים לניהול מחזור החיים של מנוע `HLS.js` להצגת הסטרימינג החי המגיע מפורט `8888` של ה-MediaMTX.

## 🔍 תרשים זרימת הנתונים במערכת

```text
┌────────────────────────────────────────────────────────┐
│               תחנת קצה (ITB.Agent)                    │
│                                                        │
│  [DXGI DDA] ──► [FFmpeg NVENC/QSV] ──► RTMP (:19350) ──┼──┐
│  [WASAPI Dual Mixer] ─────────────┘                    │  │
│  [AgentService] ────► HTTP / SignalR Telemetry ────────┼──┼──┐
└────────────────────────────────────────────────────────┘  │  │
                                                            │  │
                                     ┌──────────────────────┘  │
                                     ▼                         ▼
                          ┌─────────────────────┐   ┌──────────────────────┐
                          │ MediaMTX (v1.15.4)  │   │ .NET 8 Server API    │
                          │                     │   │                      │
                          │ • RTMP Ingest:19350 │   │ • Telemetry Store    │
                          │ • WHEP WebRTC:8889  │   │ • SignalR C2 Hub     │
                          │ • HLS Egress:8888   │   │ • Chunk Scheduler    │
                          │ • MP4 Wall-Clock Cut│   │ • Storage Resolver   │
                          └──────────┬──────────┘   └──────────┬───────────┘
                                     │                         │
                                     ▼                         ▼
                          ┌─────────────────────┐   ┌──────────────────────┐
                          │ NetApp UNC / NVMe   │   │ React C2 Dashboard   │
                          │ • 5m Clock Chunks   │   │ • WebRTC Live Player │
                          │ • 30d Retention     │   │ • Telemetry Metrics  │
                          │ • SQLite WAL Index  │   │ • DVR Time Scrubbing │
                          └─────────────────────┘   └──────────────────────┘
```

## 📋 מדדי הצלחה טכנולוגיים (Verification Tests)
1. **אכיפת ריצה יחידה:** ניסיון הרצה כפולה של השרת נכשל ומחזיר שגיאה קשיחה דרך ה-System Mutex.
2. **התאוששות תהליך:** הריגת `mediamtx.exe` ידנית דרך ה-Task Manager גוררת הרמה מחדש שלו על ידי ה-Middleware תוך 5 שניות.
3. **רינדור דינמי ב-React:** קבלת פקודת טלמטריה (POST/SignalR) מייצרת כרטיסיית תחנה חדשה ב-React Grid באופן מיידי, ללא צורך בריענון דף ידני.
4. **חיתוך מתואם שעון (Wall-Clock):** קובצי ההקלטה נסגרים ומתחילים בדיוק במכפלות השעון (5 דקות) בכל 100 התחנות במקביל.
5. **תחקור Near-Live ללא נעילות:** קריאת צ'אקים פתוחים מתבצעת בערוץ בלתי נועל (`FileShare.ReadWrite | FileShare.Delete`) ללא הפרעה להקלטה הרציפה.