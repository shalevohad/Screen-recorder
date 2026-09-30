// ==========================================
// File: Features/Extractor/Services/FfmpegBinaryResolver.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class FfmpegBinaryResolver : IFfmpegBinaryResolver
    {
        protected readonly ExtractorOptions Options;
        protected readonly ILogger<FfmpegBinaryResolver> Logger;

        public FfmpegBinaryResolver(IOptions<ExtractorOptions> options, ILogger<FfmpegBinaryResolver> logger)
        {
            Options = options.Value;
            Logger = logger;
        }

        public virtual string ResolveFfmpeg() => ResolveBinary("ffmpeg");
        public virtual string ResolveFfprobe() => ResolveBinary("ffprobe");

        public virtual string ResolveBinary(string baseName)
        {
            string binaryName = OperatingSystem.IsWindows() ? $"{baseName}.exe" : baseName;

            // 1. נתיב ייעודי שהוגדר בקונפיגורציה
            if (baseName.Equals("ffmpeg", StringComparison.OrdinalIgnoreCase) &&
                !string.IsNullOrWhiteSpace(Options.FfmpegPath) &&
                File.Exists(Options.FfmpegPath))
            {
                EnsureLinuxExecutablePermissions(Options.FfmpegPath);
                return Options.FfmpegPath;
            }

            // 2. חיפוש לצד ה-Assembly הפעיל
            string? assemblyDir = Path.GetDirectoryName(GetType().Assembly.Location);
            if (!string.IsNullOrWhiteSpace(assemblyDir))
            {
                string pluginBin = Path.Combine(assemblyDir, binaryName);
                if (File.Exists(pluginBin))
                {
                    EnsureLinuxExecutablePermissions(pluginBin);
                    return pluginBin;
                }
            }

            // 3. סריקת תיקיות מועמדות (ניתנות להרחבה על ידי מחלקות יורשות)
            foreach (var candidateDir in GetCandidateDirectories())
            {
                string fullPath = Path.Combine(candidateDir, binaryName);
                if (File.Exists(fullPath))
                {
                    EnsureLinuxExecutablePermissions(fullPath);
                    return fullPath;
                }
            }

            // 4. נתיבי לינוקס סטנדרטיים
            if (OperatingSystem.IsLinux())
            {
                string[] standardPaths = { $"/usr/bin/{binaryName}", $"/usr/local/bin/{binaryName}" };
                foreach (var path in standardPaths)
                {
                    if (File.Exists(path)) return path;
                }
            }

            return binaryName;
        }

        protected virtual IEnumerable<string> GetCandidateDirectories()
        {
            var baseDir = AppContext.BaseDirectory;
            yield return Path.Combine(baseDir, "Features", "Extractor");
            yield return Path.Combine(baseDir, "Features", "Extractor", "Bin");
            yield return Path.Combine(baseDir, "Features", "Extractor", "Tools", "Win");
            yield return baseDir;
        }

        protected virtual void EnsureLinuxExecutablePermissions(string filePath)
        {
            if (!OperatingSystem.IsLinux() || !File.Exists(filePath)) return;

            try
            {
                File.SetUnixFileMode(filePath,
                    UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute |
                    UnixFileMode.GroupRead | UnixFileMode.GroupExecute |
                    UnixFileMode.OtherRead | UnixFileMode.OtherExecute);
            }
            catch (Exception ex)
            {
                Logger.LogWarning(ex, "Failed to set Unix execution permissions on: {Path}", filePath);
            }
        }
    }
}