// ==========================================
// File: Features/Extractor/Models/SmartCutRequestDto.cs
// ==========================================
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Models
{
    public class SmartCutRequestDto
    {
        /// <summary>
        /// מזהה העמדה לחיתוך (Hostname)
        /// </summary>
        public string StationId { get; set; } = string.Empty;

        /// <summary>
        /// נקודת כניסה (Epoch MS ב-UTC)
        /// </summary>
        public long InEpochMs { get; set; }

        /// <summary>
        /// נקודת יציאה (Epoch MS ב-UTC)
        /// </summary>
        public long OutEpochMs { get; set; }

        /// <summary>
        /// אופן ייצוא מקשי המקלדת (Caption / BurnIn / None)
        /// </summary>
        public KeystrokeExportMode KeystrokeMode { get; set; } = KeystrokeExportMode.Caption;
    }
}