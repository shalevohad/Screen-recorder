using System;
using System.IO;
using System.Text;
using ITB_SCREEN_RECORDER.Diagnostics.Models;

namespace ITB_SCREEN_RECORDER.Diagnostics.Reporting
{
    public static class ConsoleReportRenderer
    {
        public static void RenderToConsole(OverallDiagnosticReport report)
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine(@"
╔════════════════════════════════════════════════════════════════════════════════╗
║         ITB-SCREEN-RECORDER — ENTERPRISE LOG DIAGNOSTIC & RCA TOOL             ║
║                  Autonomous Incident Triaging & Root Cause Analysis            ║
╚════════════════════════════════════════════════════════════════════════════════╝");
            Console.ResetColor();

            Console.WriteLine($"Report Generated: {report.GeneratedAt:yyyy-MM-dd HH:mm:ss} UTC");
            Console.WriteLine($"Files Analyzed:   {report.AnalyzedFiles.Count}");
            if (report.TotalTimeSpanCovered > TimeSpan.Zero)
            {
                Console.WriteLine($"Time Span:        {report.TotalTimeSpanCovered.TotalHours:F1} hours");
            }
            Console.WriteLine(new string('─', 82));

            int totalCritical = 0;
            int totalWarning = 0;
            int totalInfo = 0;

            foreach (var file in report.AnalyzedFiles)
            {
                totalCritical += file.CriticalCount;
                totalWarning += file.WarningCount;
                totalInfo += file.InfoCount;

                Console.WriteLine();
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine($"[FILE] {Path.GetFileName(file.FilePath)} ({file.TotalLines:N0} lines, {file.FileSizeBytes / 1024.0:F1} KB)");
                Console.ResetColor();
                Console.WriteLine($"  Path: {file.FilePath}");

                if (file.FirstLogTimestamp.HasValue && file.LastLogTimestamp.HasValue)
                {
                    Console.WriteLine($"  Logs from: {file.FirstLogTimestamp.Value:yyyy-MM-dd HH:mm:ss} to {file.LastLogTimestamp.Value:yyyy-MM-dd HH:mm:ss}");
                }

                if (file.Findings.Count == 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("  ✓ No anomalies or critical incidents detected in this log file.");
                    Console.ResetColor();
                    continue;
                }

                foreach (var finding in file.Findings)
                {
                    Console.WriteLine();
                    PrintFindingCard(finding);
                }
            }

            Console.WriteLine();
            Console.WriteLine(new string('═', 82));
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("EXECUTIVE SUMMARY & TRIAGE OVERVIEW:");
            Console.ResetColor();

            if (totalCritical > 0)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"  ● CRITICAL ISSUES DETECTED: {totalCritical} (Immediate action required!)");
            }
            if (totalWarning > 0)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"  ▲ WARNINGS DETECTED:        {totalWarning}");
            }
            if (totalCritical == 0 && totalWarning == 0)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("  ✓ SYSTEM LOGS HEALTHY — Zero critical operational faults detected.");
            }
            Console.ResetColor();

            Console.WriteLine(new string('─', 82));
        }

        private static void PrintFindingCard(DiagnosticFinding f)
        {
            var origColor = Console.ForegroundColor;
            switch (f.Severity)
            {
                case FindingSeverity.Critical:
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.Write("[CRITICAL] ");
                    break;
                case FindingSeverity.Warning:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.Write("[WARNING]  ");
                    break;
                case FindingSeverity.Info:
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.Write("[INFO]     ");
                    break;
            }

            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"{f.Title} (Occurred: {f.Count:N0} times, Rule: {f.RuleId})");
            Console.ResetColor();

            Console.WriteLine($"  Description: {f.Description}");
            
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine($"  Root Cause (RCA):");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine($"    {f.RootCause}");
            Console.ResetColor();

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"  Recommended Fix:");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"    {f.Recommendation}");
            Console.ResetColor();

            if (f.Samples.Count > 0)
            {
                Console.ForegroundColor = ConsoleColor.DarkGray;
                Console.WriteLine("  Sample Log Lines:");
                foreach (var s in f.Samples)
                {
                    Console.WriteLine($"    > {s}");
                }
                Console.ResetColor();
            }
        }

        public static string GenerateTextReport(OverallDiagnosticReport report)
        {
            var sb = new StringBuilder();
            sb.AppendLine("================================================================================");
            sb.AppendLine("         ITB-SCREEN-RECORDER — ENTERPRISE LOG DIAGNOSTIC & RCA REPORT           ");
            sb.AppendLine("================================================================================");
            sb.AppendLine($"Generated At: {report.GeneratedAt:yyyy-MM-dd HH:mm:ss} UTC");
            sb.AppendLine($"Files Analyzed: {report.AnalyzedFiles.Count}");
            sb.AppendLine(new string('-', 80));

            foreach (var file in report.AnalyzedFiles)
            {
                sb.AppendLine();
                sb.AppendLine($"FILE: {file.FilePath} ({file.TotalLines:N0} lines, {file.FileSizeBytes / 1024.0:F1} KB)");
                if (file.FirstLogTimestamp.HasValue && file.LastLogTimestamp.HasValue)
                {
                    sb.AppendLine($"Time Window: {file.FirstLogTimestamp.Value:yyyy-MM-dd HH:mm:ss} to {file.LastLogTimestamp.Value:yyyy-MM-dd HH:mm:ss}");
                }

                if (file.Findings.Count == 0)
                {
                    sb.AppendLine("  No anomalies or issues detected.");
                    continue;
                }

                foreach (var f in file.Findings)
                {
                    sb.AppendLine();
                    sb.AppendLine($"[{f.Severity.ToString().ToUpperInvariant()}] {f.Title} ({f.RuleId}) — Count: {f.Count:N0}");
                    sb.AppendLine($"  Description: {f.Description}");
                    sb.AppendLine($"  Root Cause (RCA): {f.RootCause}");
                    sb.AppendLine($"  Recommended Action: {f.Recommendation}");
                    if (f.Samples.Count > 0)
                    {
                        sb.AppendLine("  Samples:");
                        foreach (var s in f.Samples)
                        {
                            sb.AppendLine($"    {s}");
                        }
                    }
                }
            }

            sb.AppendLine();
            sb.AppendLine("================================================================================");
            sb.AppendLine("                             END OF DIAGNOSTIC REPORT                           ");
            sb.AppendLine("================================================================================");
            return sb.ToString();
        }
    }
}
