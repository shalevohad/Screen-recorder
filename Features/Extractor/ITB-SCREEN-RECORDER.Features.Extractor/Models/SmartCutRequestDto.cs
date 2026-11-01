// ==========================================
// File: Features/Extractor/Models/SmartCutRequestDto.cs
// ==========================================
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Models
{
    /// <summary>
    /// Parameters requesting a single-station precision smart cut between In/Out epoch timestamps.
    /// </summary>
    public class SmartCutRequestDto
    {
        /// <summary>
        /// Workstation identifier (Hostname).
        /// </summary>
        public string StationId { get; set; } = string.Empty;

        /// <summary>
        /// In-point timestamp in UTC Unix epoch milliseconds.
        /// </summary>
        public long InEpochMs { get; set; }

        /// <summary>
        /// Out-point timestamp in UTC Unix epoch milliseconds.
        /// </summary>
        public long OutEpochMs { get; set; }

        /// <summary>
        /// Keystroke presentation export mode (Caption SRT, BurnIn, or None).
        /// </summary>
        public KeystrokeExportMode KeystrokeMode { get; set; } = KeystrokeExportMode.Caption;
    }
}