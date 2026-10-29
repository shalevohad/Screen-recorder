# ITB-SCREEN-RECORDER Presentations (מצגות המערכת)

This directory contains executive and technical architecture presentations in **Hebrew (עברית)** and **English**, available in both **PowerPoint (`.pptx`)** and **Interactive Web Deck (`.html`)** formats:

---

## 🇮🇱 1. מצגת הנהלה בכירה והדגמת יכולות מבצעיות (עברית — Executive Show)
* **מצגת PowerPoint בעברית:** [ITB_SCREEN_RECORDER_Executive_Management_HE.pptx](file:///f:/Ohad%20Shalev/C%23%20Build/ScreenRecorder/Presentations/ITB_SCREEN_RECORDER_Executive_Management_HE.pptx)
* **מצגת דפדפן אינטראקטיבית (HTML5 RTL):** [Executive_Management_Presentation_HE.html](file:///f:/Ohad%20Shalev/C%23%20Build/ScreenRecorder/Presentations/Executive_Management_Presentation_HE.html)
* **מדריך למציג ותסריט הדגמה חיה (Playbook):** [executive_presentation_playbook_he.md](file:///C:/Users/Ohad/.gemini/antigravity-ide/brain/396e7da6-bd04-49ec-b751-80a2d77a7620/executive_presentation_playbook_he.md)
* **היקף:** 13 שקופיות אסטרטגיות ממוקדות הנהלה בכירה ומקבלי החלטות (ללא רעש מנהלתי).
* **קהל יעד:** הנהלה בכירה, סמנכ"לי פיתוח ותפעול, מפקדי מכלולים, קציני ביטחון וציות.
* **תכנים ויכולות עיקריות:**
  * מטרת-העל וביצועים בסד"כ של 100+ עמדות לשרת יחיד.
  * מדוע כלי מדף וענן נכשלים במערך מבצעי (עומס מעבד, פרצות ענן, שבירת סנכרון זמן).
  * קיר פיקוד C2 חי בשיהוי תת-שנייתי (<300ms ב-WebRTC WHEP, מעבר 0ms ללא מסך שחור, סרגל האזנה רב-עמדתי).
  * **🌟 בידול #1: בימוי חכם לריבוי מסכים (Auto-Director)** — ניתוב פוקוס אוטומטי לפי הקלדה ועכבר, תצוגות Canvas פיזית, מסך מפוצל ו-PiP, מעביר שידור חי (`[CAM 1]`, `[CAM 2]`, `[AUTO]`).
  * **🌟 בידול #2: מודיעין הקשות פורנזי וכתוביות וידאו** — דגימת מקלדת במילי-שניות, צריבת כתוביות ראייתיות (.SRT/.ASS) ומנוע חיפוש פקודות מרכזי.
  * **🌟 בידול #3: ציר זמן אחוד ורצף No Signal** — חיתוך צמוד שעון עולמי, שחזור רב-עמדתי הרמטי והזרקת שקופית "No Signal" למניעת שבירת זמנים.
  * אפס עומס על עמדת הקצה (<1% CPU באמצעות חומרת NVIDIA NVENC ו-Intel QuickSync).
  * 100% רשת מבודדת (Air-Gap), שרידות אחסון כפולה וכניסה שקטה מבוססת Active Directory (SSO).
  * סטודיו תחקור ויזואלי מתקדם (Forensic NLE) וחיסכון של 90% בזמן הפקת תחקירים.
  * טבלת עליונות תחרותית מול פתרונות בשוק (ITB מול VMS, OBS וכלי ענן).
  * החזר השקעה (ROI) ותועלת עסקית מדידה.
  * **תסריט הדגמה חיה צעד-אחר-צעד** (מה להציג ומה לומר למנהלים מילה במילה).
  * סיכום אסטרטגי ותוכנית פריסה תלת-שלבית בצי העמדות.

---

## 🇺🇸 2. Executive Management Presentation & Capabilities Showcase (English)
* **PowerPoint Presentation:** [ITB_SCREEN_RECORDER_Executive_Management.pptx](file:///f:/Ohad%20Shalev/C%23%20Build/ScreenRecorder/Presentations/ITB_SCREEN_RECORDER_Executive_Management.pptx)
* **Interactive Web Slide Deck:** [Executive_Management_Presentation.html](file:///f:/Ohad%20Shalev/C%23%20Build/ScreenRecorder/Presentations/Executive_Management_Presentation.html)
* **Executive Playbook (EN):** [executive_presentation_playbook.md](file:///C:/Users/Ohad/.gemini/antigravity-ide/brain/396e7da6-bd04-49ec-b751-80a2d77a7620/executive_presentation_playbook.md)
* **Slides:** 13 Executive Showcase Slides.

---

## 🇺🇸 3. Technical & Engineering Architecture Presentation (Full Deep-Dive)
* **PowerPoint Presentation:** [ITB_SCREEN_RECORDER_Technical_Architecture.pptx](file:///f:/Ohad%20Shalev/C%23%20Build/ScreenRecorder/Presentations/ITB_SCREEN_RECORDER_Technical_Architecture.pptx)
* **Web Slide Deck:** [Technical_Architecture_Presentation.html](file:///f:/Ohad%20Shalev/C%23%20Build/ScreenRecorder/Presentations/Technical_Architecture_Presentation.html)
* **Slides:** 21 Engineering Slides for Architects and DevOps.

---

## מקשי ניווט במצגות הדפדפן (HTML Deck Controls):
* **שקופית הבאה:** <kbd>◀</kbd> (חץ שמאלה בעברית), <kbd>רווח</kbd>, או לחיצה על **◀ הבא**
* **שקופית קודמת:** <kbd>▶</kbd> (חץ ימינה בעברית) או לחיצה על **הקודם ▶**
* **מסך מלא:** מקש <kbd>F</kbd> או לחיצה על **⛶ מסך מלא**
* **הדפסה וייצוא ל-PDF:** מקש <kbd>Ctrl</kbd> + <kbd>P</kbd> או לחיצה על **🖨️ הדפסה / ייצוא PDF**
