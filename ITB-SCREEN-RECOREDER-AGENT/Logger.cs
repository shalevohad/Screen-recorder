using System;
using System.IO;

namespace ITBRecorderAgent.Core
{
    public static class Logger
    {
        private static string _logFilePath = GetDefaultTempPath();

        public static void Initialize(string? customPath)
        {
            if (!string.IsNullOrWhiteSpace(customPath))
            {
                try
                {
                    string fullPath = Path.GetFullPath(customPath);

                    if (Directory.Exists(fullPath) || customPath.EndsWith("\\") || customPath.EndsWith("/"))
                    {
                        _logFilePath = Path.Combine(fullPath, "ITB-Agent-Log.txt");
                    }
                    else
                    {
                        _logFilePath = fullPath;
                    }

                    string? directory = Path.GetDirectoryName(_logFilePath);
                    if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
                    {
                        Directory.CreateDirectory(directory);
                    }

                    Console.WriteLine($"[INFO] Log file path set to: {_logFilePath}");
                    return;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[ERROR] Invalid custom log path '{customPath}': {ex.Message}. Falling back to temp directory.");
                }
            }

            _logFilePath = GetDefaultTempPath();
            Console.WriteLine($"[INFO] Log file path defaulted to temp: {_logFilePath}");
        }

        private static string GetDefaultTempPath()
        {
            return Path.Combine(Path.GetTempPath(), "ITB-Agent-Log.txt");
        }

        public static void Info(string message) => Write("INFO", message);
        public static void Warn(string message) => Write("WARN", message);
        public static void Error(string message) => Write("ERROR", message);

        private static void Write(string level, string message)
        {
            string logLine = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{level}] {message}";

            Console.WriteLine(logLine);

            try
            {
                File.AppendAllText(_logFilePath, logLine + Environment.NewLine);
            }
            catch
            {
                // בולעים חריגה במקרה של נעילת קובץ רגעית
            }
        }
    }
}