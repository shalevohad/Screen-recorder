using System;
using System.IO;
using System.Text;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent
{
    public static class Logger
    {
        private static readonly object _lock = new object();
        private static string? _logFilePath;
        private static bool _enableFileLogging = true;

        public static void Initialize(AppConfig config)
        {
            lock (_lock)
            {
                _enableFileLogging = config.EnableFileLogging;

                if (!_enableFileLogging) return;

                string targetPath = config.LogFilePath;

                try
                {
                    string? directory = Path.GetDirectoryName(targetPath);
                    if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
                    {
                        Directory.CreateDirectory(directory);
                    }

                    _logFilePath = targetPath;
                    Console.WriteLine($"[INFO] Log file path: {_logFilePath}");
                }
                catch (Exception ex)
                {
                    _logFilePath = Path.Combine(Path.GetTempPath(), "ITB-Agent-Log.txt");
                    Console.WriteLine($"[WARN] Failed to initialize log path ({ex.Message}). Defaulting to temp: {_logFilePath}");
                }
            }
        }

        public static void Info(string message) => Log("INFO", message);
        public static void Warn(string message) => Log("WARN", message);
        public static void Error(string message) => Log("ERROR", message);

        private static void Log(string level, string message)
        {
            string formattedMessage = $"[{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}] [{level}] {message}";
            Console.WriteLine(formattedMessage);

            if (!_enableFileLogging) return;

            lock (_lock)
            {
                if (string.IsNullOrEmpty(_logFilePath)) return;

                try
                {
                    using var fs = new FileStream(_logFilePath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
                    using var writer = new StreamWriter(fs, Encoding.UTF8);
                    writer.WriteLine(formattedMessage);
                }
                catch { }
            }
        }
    }
}