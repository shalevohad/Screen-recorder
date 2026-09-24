namespace ITB_SCREEN_RECORDER.Features.Extractor.Models
{
    public class ExtractorOptions
    {
        public const string SectionName = "Extractor";

        /// <summary>
        /// תיקיית היעד שאליה יישמרו תוצרי החיתוך והייצוא (Smart Cut / Tar Archives)
        /// </summary>
        public string ExportPath { get; set; } = @"C:\ProgramData\ITB-SCREEN-RECORDER\Exports";

        /// <summary>
        /// נתיב מפורש לבינארי של FFmpeg (אופציונלי - ברירת מחדל מהמערכת או מתיקיית האפליקציה)
        /// </summary>
        public string? FfmpegPath { get; set; } = string.Empty;

        /// <summary>
        /// מספר תהליכי FFmpeg מקבילים מירבי לפעולות חיתוך וייצוא כבדות
        /// </summary>
        public int MaxConcurrentFfmpegProcesses { get; set; } = 4;
    }
}