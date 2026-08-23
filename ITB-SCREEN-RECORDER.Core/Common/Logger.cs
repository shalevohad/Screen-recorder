using System;
using System.IO;
using ITB_SCREEN_RECORDER.Core.Configuration;
using System.Text;
using ITB_SCREEN_RECORDER.Core.Diagnostics; // התלות החדשה במחלקת בדיקת ה-Registry

namespace ITB_SCREEN_RECORDER.Core.Common
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

                    if (DebugHelper.IsDebugModeEnabled())
                    {
                        Console.WriteLine($"[INFO] Log file path: {_logFilePath}");
                    }
                }
                catch (Exception ex)
                {
                    _logFilePath = Path.Combine(Path.GetTempPath(), "ITB-Agent-Log.txt");
                    Console.WriteLine($"[ERROR] Failed to initialize log path ({ex.Message}). Defaulting to temp: {_logFilePath}");
                }
            }
        }

        public static void Info(string message)
        {
            // מדפיס ורושם ללוג אך ורק אם דגלון ה-Debug ב-Registry מופעל
            if (DebugHelper.IsDebugModeEnabled())
            {
                Log("INFO", message);
            }
        }

        public static void Warn(string message)
        {
            // אזהרות נרשמות רק במצב דיבאג
            if (DebugHelper.IsDebugModeEnabled())
            {
                Log("WARN", message);
            }
        }

        public static void Error(string message)
        {
            // שגיאות תמיד נרשמות ללוג, ללא קשר למצב דיבאג, למניעת עיוורון תקלות בייצור
            Log("ERROR", message);
        }

        private static void Log(string level, string message)
        {
            string formattedMessage = $"[{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}] [{level}] {message}";

            // כתיבה לחלון (החלון יוסתר אם Debug=0 לפי מחלקת ה-DebugHelper ב-Worker)
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