// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/StoragePathResolver.cs
// ==========================================
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

            // 💡 כפיית Epoch ומיקרו-שניות (%s_%f)
            // משתנה %s ב-MediaMTX מחושב מ-Unix Time (UTC טהור) ואדיש לאזור הזמן או לשעון המקומי של Windows
            return $"{cleanRoot}/%path/%s_%f";
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