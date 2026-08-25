using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Diagnostics;

namespace ITB_SCREEN_RECORDER.Core.Common
{
    public static class Logger
    {
        private static readonly object _lock = new object();

        private static string _logDirectory = Path.GetTempPath();
        private static string _baseFileName = "ITB-Agent-Log";
        private static string _fileExtension = ".txt";
        private static string _currentLogFilePath = string.Empty;
        private static string _currentDateString = string.Empty;

        private static bool _enableFileLogging = true;
        private static int _retentionDays = 30;

        // הוספנו את הפרמטר componentName עם ברירת מחדל ריקה
        public static void Initialize(AppConfig config, string componentName = "")
        {
            lock (_lock)
            {
                _enableFileLogging = config.EnableFileLogging;
                _retentionDays = config.LogRetentionDays > 0 ? config.LogRetentionDays : 30;

                if (!_enableFileLogging) return;

                try
                {
                    string targetPath = config.LogFilePath;

                    if (string.IsNullOrWhiteSpace(targetPath))
                    {
                        targetPath = Path.Combine(AppContext.BaseDirectory, "Logs", "Agent.log");
                    }

                    _logDirectory = Path.GetDirectoryName(targetPath);
                    if (string.IsNullOrEmpty(_logDirectory))
                    {
                        _logDirectory = AppContext.BaseDirectory;
                    }

                    if (!Directory.Exists(_logDirectory))
                    {
                        Directory.CreateDirectory(_logDirectory);
                    }

                    _baseFileName = Path.GetFileNameWithoutExtension(targetPath);

                    if (!string.IsNullOrWhiteSpace(componentName))
                    {
                        _baseFileName += $"-{componentName}";
                    }

                    _fileExtension = Path.GetExtension(targetPath);
                    if (string.IsNullOrEmpty(_fileExtension)) _fileExtension = ".txt";

                    // 💡 התיקון הקריטי: איפוס הסטייט כדי לכפות עדכון של נתיב הקובץ בפועל!
                    _currentDateString = string.Empty;

                    UpdateLogFilePath();

                    File.AppendAllText(_currentLogFilePath, $"\n--- LOG INITIALIZED AT {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC ---\n");

                    Task.Run(() => CleanupOldLogs());
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[CRITICAL LOGGER ERROR] Failed to initialize logger! Path: '{config.LogFilePath}'. Error: {ex.Message} \nStackTrace: {ex.StackTrace}");
                }
            }
        }

        private static void UpdateLogFilePath()
        {
            // פונקציה זו בודקת אם התאריך התחלף, ומייצרת נתיב לקובץ יומי חדש (Daily Rolling)
            string today = DateTime.UtcNow.ToString("yyyy-MM-dd");
            if (_currentDateString != today)
            {
                _currentDateString = today;
                _currentLogFilePath = Path.Combine(_logDirectory, $"{_baseFileName}_{today}{_fileExtension}");
            }
        }

        private static void CleanupOldLogs()
        {
            try
            {
                if (!Directory.Exists(_logDirectory)) return;

                // איתור כל הקבצים בתיקייה שמתחילים בשם הלוג הרלוונטי
                var files = Directory.GetFiles(_logDirectory, $"{_baseFileName}_*{_fileExtension}");
                DateTime cutoffDate = DateTime.UtcNow.AddDays(-_retentionDays);

                foreach (var file in files)
                {
                    try
                    {
                        FileInfo fi = new FileInfo(file);
                        // בדיקת תאריך שינוי הקובץ מול ה-Retention
                        if (fi.LastWriteTimeUtc < cutoffDate)
                        {
                            fi.Delete();
                            Console.WriteLine($"[LOGGER] Deleted old log file based on retention policy: {fi.Name}");
                        }
                    }
                    catch
                    {
                        // התעלמות מקבצים שעשויים להיות נעולים על ידי תהליך אחר
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[LOGGER FAULT] Failed to clean up old logs: {ex.Message}");
            }
        }

        public static void Info(string message)
        {
            if (DebugHelper.IsDebugModeEnabled()) Log("INFO", message);
        }

        public static void Warn(string message)
        {
            if (DebugHelper.IsDebugModeEnabled()) Log("WARN", message);
        }

        public static void Error(string message)
        {
            Log("ERROR", message);
        }

        public static void AlwaysInfo(string message)
        {
            Log("INFO", message);
        }

        private static void Log(string level, string message)
        {
            string formattedMessage = $"[{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}] [{level}] {message}";
            Console.WriteLine(formattedMessage);

            if (!_enableFileLogging) return;

            lock (_lock)
            {
                try
                {
                    // הבטחה שתמיד כותבים לקובץ של היום הנכון, גם אם הריצה נמשכת ימים ברצף!
                    UpdateLogFilePath();

                    using var fs = new FileStream(_currentLogFilePath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
                    using var writer = new StreamWriter(fs, Encoding.UTF8);
                    writer.WriteLine(formattedMessage);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[LOGGER FAULT] Could not write to log file {_currentLogFilePath}: {ex.Message}");
                }
            }
        }
    }
}