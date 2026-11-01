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

        /// <summary>
        /// Initializes the logging subsystem with the specified configuration and optional component name.
        /// Configures output directories, rolling daily filenames, and launches background log retention cleanup.
        /// </summary>
        /// <param name="config">Application configuration holding logging settings and paths.</param>
        /// <param name="componentName">Optional component identifier appended to log filename (e.g., Worker, Service).</param>
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

                    // Reset date state to force an immediate evaluation of the target file path
                    _currentDateString = string.Empty;

                    UpdateLogFilePath();

                    try
                    {
                        File.AppendAllText(_currentLogFilePath, $"\n--- LOG INITIALIZED AT {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC ---\n");
                    }
                    catch (UnauthorizedAccessException)
                    {
                        string safeUser = Environment.UserName.Replace("\\", "_");
                        _currentLogFilePath = Path.Combine(_logDirectory, $"{_baseFileName}_{DateTime.UtcNow:yyyy-MM-dd}_{safeUser}{_fileExtension}");
                        File.AppendAllText(_currentLogFilePath, $"\n--- LOG INITIALIZED AT {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC (User Fallback) ---\n");
                    }

                    Task.Run(() => CleanupOldLogs());
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[CRITICAL LOGGER ERROR] Failed to initialize logger! Path: '{config.LogFilePath}'. Error: {ex.Message} \nStackTrace: {ex.StackTrace}");
                }
            }
        }

        /// <summary>
        /// Evaluates current UTC date against current log file target, rotating to a new daily log file if the date changed.
        /// </summary>
        private static void UpdateLogFilePath()
        {
            // Checks if date changed and generates a daily rolling log file path
            string today = DateTime.UtcNow.ToString("yyyy-MM-dd");
            if (_currentDateString != today)
            {
                _currentDateString = today;
                string defaultPath = Path.Combine(_logDirectory, $"{_baseFileName}_{today}{_fileExtension}");

                // Proactive check: if file exists but write permissions are blocked (e.g. created by SYSTEM process)
                try
                {
                    if (File.Exists(defaultPath))
                    {
                        using var testFs = new FileStream(defaultPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
                    }
                    _currentLogFilePath = defaultPath;
                }
                catch (UnauthorizedAccessException)
                {
                    string safeUser = Environment.UserName.Replace("\\", "_");
                    _currentLogFilePath = Path.Combine(_logDirectory, $"{_baseFileName}_{today}_{safeUser}{_fileExtension}");
                }
                catch
                {
                    _currentLogFilePath = defaultPath;
                }
            }
        }

        /// <summary>
        /// Deletes historical log files exceeding the configured retention period.
        /// </summary>
        private static void CleanupOldLogs()
        {
            try
            {
                if (!Directory.Exists(_logDirectory)) return;

                // Locate all files matching base log filename pattern in target directory
                var files = Directory.GetFiles(_logDirectory, $"{_baseFileName}_*{_fileExtension}");
                DateTime cutoffDate = DateTime.UtcNow.AddDays(-_retentionDays);

                foreach (var file in files)
                {
                    try
                    {
                        FileInfo fi = new FileInfo(file);
                        // Check last modified time against retention threshold
                        if (fi.LastWriteTimeUtc < cutoffDate)
                        {
                            fi.Delete();
                            Console.WriteLine($"[LOGGER] Deleted old log file based on retention policy: {fi.Name}");
                        }
                    }
                    catch
                    {
                        // Ignore files locked by another process
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[LOGGER FAULT] Failed to clean up old logs: {ex.Message}");
            }
        }

        /// <summary>
        /// Emits an informational message.
        /// </summary>
        /// <param name="message">Log message content.</param>
        public static void Info(string message)
        {
            Log("INFO", message);
        }

        /// <summary>
        /// Emits a warning message.
        /// </summary>
        /// <param name="message">Warning message content.</param>
        public static void Warn(string message)
        {
            Log("WARN", message);
        }

        /// <summary>
        /// Emits an error message.
        /// </summary>
        /// <param name="message">Error message content.</param>
        public static void Error(string message)
        {
            Log("ERROR", message);
        }

        /// <summary>
        /// Emits an informational message unconditionally.
        /// </summary>
        /// <param name="message">Log message content.</param>
        public static void AlwaysInfo(string message)
        {
            Log("INFO", message);
        }

        /// <summary>
        /// Emits a debug diagnostics message.
        /// </summary>
        /// <param name="message">Debug message content.</param>
        public static void Debug(string message)
        {
            Log("DEBUG", message);
        }

        /// <summary>
        /// Formats and appends a log entry to console and the active daily rolling log file.
        /// </summary>
        /// <param name="level">Severity level label (INFO, WARN, ERROR, DEBUG).</param>
        /// <param name="message">Message text to record.</param>
        private static void Log(string level, string message)
        {
            string formattedMessage = $"[{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}] [{level}] {message}";
            Console.WriteLine(formattedMessage);

            if (!_enableFileLogging) return;

            lock (_lock)
            {
                try
                {
                    // Ensure writing to the correct calendar day file even during continuous multi-day runs
                    UpdateLogFilePath();

                    using var fs = new FileStream(_currentLogFilePath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
                    using var writer = new StreamWriter(fs, Encoding.UTF8);
                    writer.WriteLine(formattedMessage);
                }
                catch (UnauthorizedAccessException)
                {
                    try
                    {
                        string safeUser = Environment.UserName.Replace("\\", "_");
                        string fallbackPath = Path.Combine(_logDirectory, $"{_baseFileName}_{_currentDateString}_{safeUser}{_fileExtension}");
                        _currentLogFilePath = fallbackPath;
                        using var fsFallback = new FileStream(fallbackPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
                        using var writerFallback = new StreamWriter(fsFallback, Encoding.UTF8);
                        writerFallback.WriteLine(formattedMessage);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"[LOGGER FAULT] Could not write to fallback log file: {ex.Message}");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[LOGGER FAULT] Could not write to log file {_currentLogFilePath}: {ex.Message}");
                }
            }
        }
    }
}