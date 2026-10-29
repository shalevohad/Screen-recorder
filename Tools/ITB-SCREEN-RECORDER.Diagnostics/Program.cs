using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ITB_SCREEN_RECORDER.Diagnostics.Engine;
using ITB_SCREEN_RECORDER.Diagnostics.Models;
using ITB_SCREEN_RECORDER.Diagnostics.Reporting;

namespace ITB_SCREEN_RECORDER.Diagnostics
{
    internal class Program
    {
        static int Main(string[] args)
        {
            try
            {
                if (OperatingSystem.IsWindows() || !Console.IsOutputRedirected)
                {
                    Console.Title = "ITB-SCREEN-RECORDER — Log Diagnostic & RCA Engine";
                }
            }
            catch { }

            bool isInteractive = args.Length == 0 && !Console.IsInputRedirected;

            var targetFiles = new List<string>();

            if (args.Length > 0)
            {
                foreach (var arg in args)
                {
                    string cleanPath = arg.Trim('"', '\'');
                    if (File.Exists(cleanPath))
                    {
                        targetFiles.Add(cleanPath);
                    }
                    else if (Directory.Exists(cleanPath))
                    {
                        targetFiles.AddRange(FindLogFiles(cleanPath));
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.WriteLine($"[WARNING] Specified path was not found: {cleanPath}");
                        Console.ResetColor();
                    }
                }
            }

            if (targetFiles.Count == 0)
            {
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.WriteLine(@"
════════════════════════════════════════════════════════════════════════════════
   ITB-SCREEN-RECORDER — Automated Field Diagnostic & RCA CLI (Cross-Platform)
════════════════════════════════════════════════════════════════════════════════");
                Console.ResetColor();
                Console.WriteLine("Drag and drop a log file / folder here, or enter the path.");
                Console.WriteLine("Press [ENTER] without input to auto-scan standard local log paths.");
                Console.Write("\nPath > ");

                string? input = Console.ReadLine()?.Trim('"', '\'', ' ');

                if (string.IsNullOrWhiteSpace(input))
                {
                    // Scan standard locations based on OS
                    var candidateDirs = new List<string>
                    {
                        Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs"),
                        Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs"),
                        AppDomain.CurrentDomain.BaseDirectory
                    };

                    if (OperatingSystem.IsWindows())
                    {
                        candidateDirs.AddRange(new[]
                        {
                            @"C:\ProgramData\ITB-SCREEN-RECORDER\Logs",
                            @"C:\ProgramData\ITB-SCREEN-RECORDER\Server\Logs",
                            @"C:\Program Files\ITB-ScreenRecorder\logs",
                            @"C:\Program Files\ITB-ScreenRecorder-Server\logs"
                        });
                    }
                    else
                    {
                        candidateDirs.AddRange(new[]
                        {
                            "/var/log/itb-screenrecorder",
                            "/var/log/itb-server",
                            "/opt/itb-screenrecorder/logs",
                            "/opt/itb-screenrecorder-server/logs",
                            "/var/log"
                        });
                    }

                    foreach (var dir in candidateDirs)
                    {
                        if (Directory.Exists(dir))
                        {
                            targetFiles.AddRange(FindLogFiles(dir));
                        }
                    }
                }
                else
                {
                    if (File.Exists(input))
                    {
                        targetFiles.Add(input);
                    }
                    else if (Directory.Exists(input))
                    {
                        targetFiles.AddRange(FindLogFiles(input));
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine($"[ERROR] Specified path not found: {input}");
                        Console.ResetColor();
                        if (isInteractive)
                        {
                            Console.WriteLine("\nPress any key to exit...");
                            Console.ReadKey();
                        }
                        return 1;
                    }
                }
            }

            if (targetFiles.Count == 0)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("[INFO] No log files found to analyze.");
                Console.ResetColor();
                if (isInteractive)
                {
                    Console.WriteLine("\nPress any key to exit...");
                    Console.ReadKey();
                }
                return 0;
            }

            Console.WriteLine($"\n[INFO] Found {targetFiles.Count} log file(s). Running forensic rule engine...\n");

            var engine = new DiagnosticEngine();
            var report = new OverallDiagnosticReport();

            foreach (var file in targetFiles.Distinct())
            {
                try
                {
                    var result = engine.AnalyzeFile(file);
                    report.AnalyzedFiles.Add(result);
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"[ERROR] Failed to analyze {file}: {ex.Message}");
                    Console.ResetColor();
                }
            }

            ConsoleReportRenderer.RenderToConsole(report);

            // Export detailed report
            try
            {
                string textReport = ConsoleReportRenderer.GenerateTextReport(report);
                string exportFileName = $"ITB_Diagnostic_Report_{DateTime.UtcNow:yyyyMMdd_HHmmss}.txt";
                string exportPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, exportFileName);
                File.WriteAllText(exportPath, textReport);

                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.WriteLine($"\n[EXPORT] Detailed diagnostic report saved to:\n  -> {exportPath}");
                Console.ResetColor();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[NOTE] Could not write report file: {ex.Message}");
            }

            if (isInteractive)
            {
                Console.WriteLine("\nPress any key to exit...");
                Console.ReadKey();
            }

            return report.AnalyzedFiles.Any(f => f.CriticalCount > 0) ? 2 : 0;
        }

        private static List<string> FindLogFiles(string dirPath)
        {
            var files = new List<string>();
            try
            {
                var extensions = new[] { "*.log", "*.txt", "*.log.*" };
                foreach (var ext in extensions)
                {
                    files.AddRange(Directory.GetFiles(dirPath, ext, SearchOption.TopDirectoryOnly));
                }
            }
            catch { }
            return files;
        }
    }
}
