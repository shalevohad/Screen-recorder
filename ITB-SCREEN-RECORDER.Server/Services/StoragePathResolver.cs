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

        /// <summary>
        /// Builds the MediaMTX recording path pattern targeting the resolved active root directory.
        /// Enforces Epoch timestamping (%s_%f) for deterministic UTC alignment.
        /// </summary>
        /// <param name="root">The resolved active storage root directory.</param>
        /// <param name="config">Current system configuration.</param>
        /// <returns>Formatted MediaMTX recordPath pattern string.</returns>
        public string BuildRecordPath(string root, SystemConfig config)
        {
            string cleanRoot = root.Replace('\\', '/').TrimEnd('/');

            // Enforce Epoch seconds and microseconds (%s_%f)
            // %s in MediaMTX is evaluated from Unix Time (pure UTC), immune to timezone shifts or local Windows clock changes
            return $"{cleanRoot}/%path/%s_%f";
        }

        public static async Task<bool> IsNetAppReachableAsync(string uncPath)
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