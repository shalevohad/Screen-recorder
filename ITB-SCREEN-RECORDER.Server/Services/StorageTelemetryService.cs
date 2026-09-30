// ==========================================
// File: Server/Services/StorageTelemetryService.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Server.Models;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public interface IStorageTelemetryService
    {
        StorageTelemetryDto GetCurrentStorageTelemetry();
    }

    public class StorageTelemetryService : IStorageTelemetryService
    {
        private readonly IConfiguration _configuration;
        private readonly IOptions<SystemConfig> _systemConfig;
        private readonly ILogger<StorageTelemetryService> _logger;

        private PerformanceCounter? _iopsCounter;
        private bool _countersInitialized = false;
        private readonly object _initLock = new();

        #region Native Interop (Cross-Platform Win32 & POSIX)

        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        [return: MarshalAs(UnmanagedType.Bool)]
        private static extern bool GetDiskFreeSpaceEx(
            string lpDirectoryName,
            out ulong lpFreeBytesAvailable,
            out ulong lpTotalNumberOfBytes,
            out ulong lpTotalNumberOfFreeBytes);

        [StructLayout(LayoutKind.Sequential)]
        private struct Statvfs
        {
            public ulong f_bsize;
            public ulong f_frsize;
            public ulong f_blocks;
            public ulong f_bfree;
            public ulong f_bavail;
            public ulong f_files;
            public ulong f_ffree;
            public ulong f_favail;
            public ulong f_fsid;
            public ulong f_flag;
            public ulong f_namemax;
        }

        [DllImport("libc", SetLastError = true, CharSet = CharSet.Ansi)]
        private static extern int statvfs(string path, out Statvfs buf);

        #endregion

        public StorageTelemetryService(
            IConfiguration configuration,
            IOptions<SystemConfig> systemConfig,
            ILogger<StorageTelemetryService> logger)
        {
            _configuration = configuration;
            _systemConfig = systemConfig;
            _logger = logger;

            InitCounters();
        }

        private void InitCounters()
        {
            if (_countersInitialized || !OperatingSystem.IsWindows()) return;
            lock (_initLock)
            {
                if (_countersInitialized) return;
                try
                {
                    _iopsCounter = new PerformanceCounter("PhysicalDisk", "Disk Transfers/sec", "_Total", true);
                    _ = _iopsCounter.NextValue();
                    _countersInitialized = true;
                }
                catch
                {
                    // סביבות ללא הרשאות Performance Counters
                }
            }
        }

        public StorageTelemetryDto GetCurrentStorageTelemetry()
        {
            var telemetry = new StorageTelemetryDto();

            string? primaryPath = _systemConfig.Value?.Storage?.NetAppUncPath
                ?? _configuration["SystemConfig:Storage:NetAppUncPath"];

            string? fallbackPath = _systemConfig.Value?.Storage?.LocalFallbackPath
                ?? _configuration["SystemConfig:Storage:LocalFallbackPath"]
                ?? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "ITB-SCREEN-RECORDER", "Recordings");

            telemetry.PrimaryPath = primaryPath ?? string.Empty;

            string activePathToQuery = string.Empty;
            bool isUsingFallback = false;

            // 1. בדיקת זמינות של הנתיב הראשי (NetApp / Primary Share)
            bool isPrimaryAccessible = false;
            if (!string.IsNullOrWhiteSpace(primaryPath))
            {
                try
                {
                    isPrimaryAccessible = Directory.Exists(primaryPath);
                }
                catch
                {
                    isPrimaryAccessible = false;
                }
            }

            // 2. החלטה על הנתיב הפעיל (Failover Logic)
            if (isPrimaryAccessible)
            {
                activePathToQuery = primaryPath!;
                isUsingFallback = false;
                telemetry.StorageLabel = "STORAGE POOL";
            }
            else
            {
                // הראשי אינו נגיש – בודקים האם ה-Fallback זמין
                bool isFallbackAccessible = false;
                if (!string.IsNullOrWhiteSpace(fallbackPath))
                {
                    try
                    {
                        isFallbackAccessible = Directory.Exists(fallbackPath);
                    }
                    catch
                    {
                        isFallbackAccessible = false;
                    }
                }

                if (isFallbackAccessible)
                {
                    activePathToQuery = fallbackPath!;
                    isUsingFallback = true;
                    telemetry.StorageLabel = "FALLBACK POOL";
                }
                else
                {
                    // שניהם לא נגישים
                    activePathToQuery = !string.IsNullOrWhiteSpace(primaryPath) ? primaryPath! : (fallbackPath ?? string.Empty);
                    isUsingFallback = true;
                    telemetry.StorageLabel = "OFFLINE POOL";
                }
            }

            telemetry.StoragePath = activePathToQuery;
            telemetry.IsConfigured = !string.IsNullOrWhiteSpace(activePathToQuery);
            telemetry.IsFallbackActive = isUsingFallback;

            bool isAccessible = false;
            try
            {
                isAccessible = !string.IsNullOrWhiteSpace(activePathToQuery) && Directory.Exists(activePathToQuery);
            }
            catch
            {
                isAccessible = false;
            }

            telemetry.IsAccessible = isAccessible;

            // 3. תשאול שטח מוקצה מול פנוי של הנתיב הפעיל (Cross-Platform)
            if (isAccessible)
            {
                if (OperatingSystem.IsWindows())
                {
                    try
                    {
                        if (GetDiskFreeSpaceEx(activePathToQuery, out ulong freeBytes, out ulong totalBytes, out _))
                        {
                            telemetry.TotalSizeBytes = (long)totalBytes;
                            telemetry.FreeSizeBytes = (long)freeBytes;
                            telemetry.UsedSizeBytes = Math.Max(0, (long)(totalBytes - freeBytes));
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "[StorageTelemetry] GetDiskFreeSpaceEx failed for {Path}", activePathToQuery);
                    }
                }
                else if (OperatingSystem.IsLinux() || OperatingSystem.IsMacOS())
                {
                    try
                    {
                        if (statvfs(activePathToQuery, out Statvfs vfs) == 0)
                        {
                            ulong blockSize = vfs.f_frsize > 0 ? vfs.f_frsize : vfs.f_bsize;
                            ulong total = vfs.f_blocks * blockSize;
                            ulong free = vfs.f_bavail * blockSize;

                            telemetry.TotalSizeBytes = (long)total;
                            telemetry.FreeSizeBytes = (long)free;
                            telemetry.UsedSizeBytes = Math.Max(0, (long)(total - free));
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "[StorageTelemetry] statvfs failed for {Path}", activePathToQuery);
                    }
                }

                if (telemetry.TotalSizeBytes == 0)
                {
                    try
                    {
                        var root = Path.GetPathRoot(activePathToQuery);
                        if (!string.IsNullOrEmpty(root))
                        {
                            var drive = new DriveInfo(root);
                            if (drive.IsReady)
                            {
                                telemetry.TotalSizeBytes = drive.TotalSize;
                                telemetry.FreeSizeBytes = drive.AvailableFreeSpace;
                                telemetry.UsedSizeBytes = drive.TotalSize - drive.AvailableFreeSpace;
                            }
                        }
                    }
                    catch { }
                }

                if (telemetry.TotalSizeBytes > 0)
                {
                    telemetry.UsedPercent = Math.Round(((double)telemetry.UsedSizeBytes / telemetry.TotalSizeBytes) * 100, 1);
                    telemetry.FreePercent = Math.Round(((double)telemetry.FreeSizeBytes / telemetry.TotalSizeBytes) * 100, 1);
                }
            }

            try
            {
                if (_iopsCounter != null && OperatingSystem.IsWindows())
                {
                    telemetry.CurrentIops = Math.Round(_iopsCounter.NextValue(), 0);
                }
            }
            catch { }

            return telemetry;
        }
    }
}