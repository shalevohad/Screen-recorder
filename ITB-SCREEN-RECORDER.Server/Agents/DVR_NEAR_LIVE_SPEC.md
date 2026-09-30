# אפיון טכני: מנגנון DVR ותחקור אירועים "חמים" (Near-Live Investigation)

## 1. תמצית מנהלים וצורך מבצעי
מפעילי המערכת נדרשים לתחקר אירועים מבצעיים מיד עם התרחשותם (5–15 דקות לאחר האירוע), או לחזור אחורה בזמן בציר הזמן (Time-Scrubbing) תוך כדי שהעמדות ממשיכות להקליט בזמן אמת. 

מטרת הרכיב היא לאפשר תחקור שוטף ישירות מתוך הדפדפן ללא צורך בהמתנה לסגירת קבצים, ללא פגיעה בתהליך ההקלטה הרציף, וללא צורך בייצוא ארכיון TAR מקדים.

---

## 2. ארכיטקטורת המערכת

המנגנון נשען על שלושה רבדים:

```text
[ Workstation Screen Recorder ]
           │
           ▼ (כותב צ'אקים של 1-2 דקות)
   [ אחסון מרכזי / NAS ]
           │
           ├───────────────────────────────┐
           ▼                               ▼
[ StorageScannerService ]      [ LiveTailController ]
  - עקיפת Cache ב-Hot Window     - Endpoint לשליפת צ'אקים חדשים
  - FileShare.ReadWrite          - הזרמת מטא-דאטה כל 5-10 שנ'
           │                               │
           └───────────────┬───────────────┘
                           ▼
          [ Frontend Timeline / Player ]
            - כפתור [LIVE] וסמן אדום
            - ציר זמן מתרחב ימינה אוטומטית
            - גרירה אחורה (Scrub) ללא ניתוק הזנה
```

---

## 3. פירוט השכבות והמימוש הטכני

### א. שכבת האחסון (StorageScannerService - Real-Time Tail)
1. **הגדרת Hot Window (30 דקות אחרונות):**
   * כל שאילתת טווח זמן שקצה העליון שלה נמצא בטווח של `DateTime.UtcNow - TimeSpan.FromMinutes(30)` מוגדרת כ"חמה".
   * בטווח זה מבוצע **Bypass מלא ל-Memory Cache** ונערכת סריקת דיסק ישירה כדי לזהות מיידית קבצים חדשים שנכתבו.
2. **מניעת נעילות קבצים (Non-Locking File Access):**
   * תהליך ה-Recorder עשוי עדיין להחזיק Handle פתוח לצורך כתיבה או סגירת Chunk.
   * כל פתיחת קובץ (בדיקת גודל, שליפת פריימים ב-FFmpeg, ו-FFprobe) חייבת להתבצע באמצעות:
     ```csharp
     new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete);
     ```
   * בפקודות FFmpeg יש להזריק את הדגלים:
     `-analyzeduration 1M -probesize 1M -threads 2` למניעת חסימת קריאה.

---

### ב. שכבת ה-API והשרת (LiveTailController)
1. **Endpoint ייעודי למעקב חי:**
   * נתיב: `GET /api/v1/extractor-advanced/live-tail`
   * פרמטרים:
     * `stationIds`: רשימת מזהי תחנות.
     * `sinceEpochMs`: חותמת זמן שממנה והלאה נדרשים עדכונים.
   * תגובה:
     רשימת מטא-דאטה קלה של צ'אקים שנוספו מאז הבקשה הקודמת:
     ```json
     {
       "stationId": "WS-01",
       "newChunks": [
         {
           "startEpochMs": 1727038800000,
           "endEpochMs": 1727038920000,
           "durationSeconds": 120.0,
           "isFinalized": true
         }
       ]
     }
     ```
2. **קריאת Chunk בתהליך כתיבה (Active Ingestion):**
   * במידה וקובץ עדיין נכתב, FFmpeg עשוי להתקשות בקריאת ה-Moov Atom בסוף הקובץ.
   * **פתרון:** תחקור הקובץ הפעיל יתאפשר רק מרגע שנוצר ה-Chunk הבא, או לחלופין על ידי כתיבת צ'אקים בפורמט Fragmented MP4 (`-movflags empty_moov+default_base_moof+frag_keyframe`) ברמת ה-Recorder.

---

### ג. נגן ה-Timeline בצד הלקוח (Frontend Live-Scrubber)
1. **מצבי עבודה בנגן (Player States):**
   * **מצב LIVE:**
     * כפתור `[● LIVE]` דולק בירוק/אדום בציר הזמן.
     * הנגן מנגן באופן קבוע בהשהיה מבוקרת של 10–20 שניות מאחורי ה-Real-Time (Buffer בטוח).
     * ציר הזמן מתרחב ימינה כל 10 שניות עם קבלת צ'אקים חדשים.
   * **מצב REPLAY / DVR:**
     * ברגע שהמשתמש לוחץ על נקודה בעבר או גורר את ה-Scrubber אחורה, מצב `LIVE` מתנתק.
     * הכפתור משתנה ל-`[GO TO LIVE]` באפור/כתום.
     * המשתמש יכול לתחקר את האירוע, לרוץ קדימה/אחורה, לסמן In/Out ולצפות בפריימים.
     * לחיצה על `[GO TO LIVE]` מחזירה את הנגן מיידית לקצה החי של ציר הזמן.

---

## 4. אתגרים טכניים ודרכי פתרון

| אתגר טכני | השפעה | פתרון מומלץ |
| :--- | :--- | :--- |
| **קובץ לא סגור (Missing Moov Atom)** | FFmpeg לא מצליח לפתוח את ה-Chunk הפעיל | הצגת ציר הזמן בדיליי של צ'אק אחד אחורה (1–2 דק'), או תמיכה ב-Fragmented MP4. |
| **עומס I/O על ה-Storage בסריקות חוזרות** | האטה בתגובת ה-API | שימוש ב-`FileSystemWatcher` בשרת או polling קל של ספריות ה-Date האחרונות בלבד. |
| **קפיצות זמנים בציר הזמן** | ציר הזמן קופץ בזמן שהמשתמש גורר | שמירת ה-Viewport וה-Zoom נעולים כאשר המשתמש נמצא במצב Replay/Scrubbing. |

---

## 5. תוכנית עבודה לשלבי המימוש

1. **שלב 1 (Backend Storage):** הוספת מתודת `GetRecentActiveChunksAsync` המבצעת סריקה ללא נעילות וללא Cache של ה-30 דקות האחרונות.
2. **שלב 2 (API):** מימוש `LiveTailController` והחזרת Chunks חדשים לפי חותמת זמן.
3. **שלב 3 (Frontend UX):** הוספת כפתור `[LIVE]` לציר הזמן של ה-Advanced Extractor, מנגנון Polling קל (כל 5 שניות), והרחבה דינמית של קצה ה-Slider.