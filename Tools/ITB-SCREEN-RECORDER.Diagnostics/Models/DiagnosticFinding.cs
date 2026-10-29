using System;
using System.Collections.Generic;

namespace ITB_SCREEN_RECORDER.Diagnostics.Models
{
    public enum FindingSeverity
    {
        Info,
        Warning,
        Critical
    }

    public class DiagnosticFinding
    {
        public string RuleId { get; set; } = string.Empty;
        public FindingSeverity Severity { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string RootCause { get; set; } = string.Empty;
        public string Recommendation { get; set; } = string.Empty;

        public int Count { get; set; } = 1;
        public DateTime? FirstSeenUtc { get; set; }
        public DateTime? LastSeenUtc { get; set; }
        public List<string> Samples { get; set; } = new();
    }

    public class FileAnalysisResult
    {
        public string FilePath { get; set; } = string.Empty;
        public long FileSizeBytes { get; set; }
        public int TotalLines { get; set; }
        public DateTime? FirstLogTimestamp { get; set; }
        public DateTime? LastLogTimestamp { get; set; }

        public int CriticalCount => Findings.Count(f => f.Severity == FindingSeverity.Critical);
        public int WarningCount => Findings.Count(f => f.Severity == FindingSeverity.Warning);
        public int InfoCount => Findings.Count(f => f.Severity == FindingSeverity.Info);

        public List<DiagnosticFinding> Findings { get; set; } = new();
        public List<string> GeneralErrors { get; set; } = new();
    }

    public class OverallDiagnosticReport
    {
        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
        public List<FileAnalysisResult> AnalyzedFiles { get; set; } = new();
        public TimeSpan TotalTimeSpanCovered
        {
            get
            {
                DateTime? min = null;
                DateTime? max = null;
                foreach (var f in AnalyzedFiles)
                {
                    if (f.FirstLogTimestamp.HasValue && (!min.HasValue || f.FirstLogTimestamp.Value < min.Value)) min = f.FirstLogTimestamp;
                    if (f.LastLogTimestamp.HasValue && (!max.HasValue || f.LastLogTimestamp.Value > max.Value)) max = f.LastLogTimestamp;
                }
                return (min.HasValue && max.HasValue && max.Value >= min.Value) ? (max.Value - min.Value) : TimeSpan.Zero;
            }
        }
    }
}
