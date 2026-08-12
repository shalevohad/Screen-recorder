using System;
using System.IO;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Models;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    /// <summary>
    /// Resolves the effective recordings root: the configured NetApp UNC path when reachable,
    /// otherwise the configured local fallback path (Storage.LocalFallbackPath).
    /// </summary>
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
                    logger.LogInformation("[STORAGE] NetApp UNC path '{Path}' is reachable. Using it as the recordings root.", storage.NetAppUncPath);
                }
                else
                {
                    logger.LogWarning("[STORAGE] NetApp UNC path '{Path}' is unreachable. Falling back to local recordings root '{LocalRoot}'.", storage.NetAppUncPath, storage.LocalFallbackPath);
                }
                _lastReachable = reachable;
            }

            if (reachable)
            {
                return storage.NetAppUncPath;
            }

            Directory.CreateDirectory(storage.LocalFallbackPath);
            return storage.LocalFallbackPath;
        }

        private static async Task<bool> IsNetAppReachableAsync(string uncPath)
        {
            if (string.IsNullOrWhiteSpace(uncPath))
            {
                return false;
            }

            try
            {
                Task<bool> checkTask = Task.Run(() =>
                {
                    try { return Directory.Exists(uncPath); }
                    catch { return false; }
                });

                Task completedTask = await Task.WhenAny(checkTask, Task.Delay(ReachabilityCheckTimeout)).ConfigureAwait(false);
                return completedTask == checkTask && checkTask.Result;
            }
            catch
            {
                return false;
            }
        }
    }
}
