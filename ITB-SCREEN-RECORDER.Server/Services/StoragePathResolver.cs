using System;
using System.IO;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class StoragePathResolver
    {
        private static readonly TimeSpan ReachabilityCheckTimeout = TimeSpan.FromSeconds(3);
        private bool? _lastReachable;

        public async Task<string> ResolveActiveRootAsync(StorageSettings storage, ILogger logger)
        {
            bool reachable = await IsNetAppReachableAsync(storage.NetAppUncPath).ConfigureAwait(false);

            if (reachable != _lastReachable)
            {
                if (reachable)
                {
                    logger.LogInformation("[STORAGE] NetApp UNC path '{Path}' is reachable.", storage.NetAppUncPath);
                }
                else
                {
                    logger.LogWarning("[STORAGE] NetApp UNC path unreachable. Falling back to local root '{LocalRoot}'.", storage.LocalFallbackPath);
                }
                _lastReachable = reachable;
            }

            string selectedRoot = reachable ? storage.NetAppUncPath : storage.LocalFallbackPath;
            try { Directory.CreateDirectory(selectedRoot); } catch { }
            return selectedRoot;
        }

        public string BuildRecordPath(string root, SystemConfig config)
        {
            string cleanRoot = root.Replace('\\', '/').TrimEnd('/');
            string targetTz = string.IsNullOrWhiteSpace(config.MediaMtx?.Timezone) ? "UTC" : config.MediaMtx.Timezone.Trim();
            bool isUtc = string.Equals(targetTz, "UTC", StringComparison.OrdinalIgnoreCase);
            string timeFormat = isUtc ? "%Y%m%d_%H%M%S_%fZ" : "%Y%m%d_%H%M%S_%f";

            // מובטח נתיב נקי לחלוטין עם לוכסנים קדמיים בלבד
            return $"{cleanRoot}/%path/{timeFormat}";
        }

        private static async Task<bool> IsNetAppReachableAsync(string uncPath)
        {
            if (string.IsNullOrWhiteSpace(uncPath)) return false;
            try
            {
                Task<bool> checkTask = Task.Run(() => Directory.Exists(uncPath));
                Task completedTask = await Task.WhenAny(checkTask, Task.Delay(ReachabilityCheckTimeout)).ConfigureAwait(false);
                return completedTask == checkTask && checkTask.Result;
            }
            catch { return false; }
        }
    }
}