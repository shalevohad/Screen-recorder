using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Hosting;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class StationOverridesService
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _lock = new(1, 1);
        private readonly JsonSerializerOptions _jsonOptions = new()
        {
            WriteIndented = true,
            PropertyNameCaseInsensitive = true
        };

        public StationOverridesService(IHostEnvironment env)
        {
            string targetDir = env.ContentRootPath;

            try
            {
                string testFile = Path.Combine(targetDir, $".perm_test_{Guid.NewGuid():N}");
                File.WriteAllText(testFile, string.Empty);
                File.Delete(testFile);
            }
            catch
            {
                targetDir = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
                    "ITB-SCREEN-RECORDER");
            }

            Directory.CreateDirectory(targetDir);
            _filePath = Path.Combine(targetDir, "stations-config.json");

            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "{}");
            }
        }

        public async Task<Dictionary<string, StationOverride>> GetAllAsync()
        {
            if (!File.Exists(_filePath))
            {
                return new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
            }

            await _lock.WaitAsync();
            try
            {
                await using var stream = new FileStream(
                    _filePath,
                    FileMode.Open,
                    FileAccess.Read,
                    FileShare.ReadWrite);

                if (stream.Length == 0)
                {
                    return new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
                }

                var result = await JsonSerializer.DeserializeAsync<Dictionary<string, StationOverride>>(stream, _jsonOptions);
                return result != null
                    ? new Dictionary<string, StationOverride>(result, StringComparer.OrdinalIgnoreCase)
                    : new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
            }
            catch
            {
                return new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task SetOverrideAsync(string hostname, StationOverride overrides)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return;

            await _lock.WaitAsync();
            try
            {
                var dict = await ReadInternalAsync();
                dict[hostname.Trim()] = overrides;
                await WriteInternalAsync(dict);
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<bool> RemoveOverrideAsync(string hostname)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return false;

            await _lock.WaitAsync();
            try
            {
                var dict = await ReadInternalAsync();
                string targetKey = hostname.Trim();

                if (dict.Remove(targetKey))
                {
                    await WriteInternalAsync(dict);
                    return true;
                }

                return false;
            }
            finally
            {
                _lock.Release();
            }
        }

        /// <summary>
        /// מאפס את כלל הדריסות הפרטניות ומחזיר את כל העמדות להגדרות ברירת המחדל
        /// </summary>
        public async Task ResetAllOverridesAsync()
        {
            await _lock.WaitAsync();
            try
            {
                var emptyDict = new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
                await WriteInternalAsync(emptyDict);
            }
            finally
            {
                _lock.Release();
            }
        }

        private async Task<Dictionary<string, StationOverride>> ReadInternalAsync()
        {
            if (!File.Exists(_filePath))
            {
                return new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
            }

            await using var stream = new FileStream(
                _filePath,
                FileMode.Open,
                FileAccess.Read,
                FileShare.ReadWrite);

            if (stream.Length == 0)
            {
                return new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
            }

            var res = await JsonSerializer.DeserializeAsync<Dictionary<string, StationOverride>>(stream, _jsonOptions);
            return res != null
                ? new Dictionary<string, StationOverride>(res, StringComparer.OrdinalIgnoreCase)
                : new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
        }

        private async Task WriteInternalAsync(Dictionary<string, StationOverride> data)
        {
            string tempPath = $"{_filePath}.{Guid.NewGuid():N}.tmp";

            await using (var createStream = new FileStream(
                tempPath,
                FileMode.Create,
                FileAccess.Write,
                FileShare.None))
            {
                await JsonSerializer.SerializeAsync(createStream, data, _jsonOptions);
                await createStream.FlushAsync();
            }

            File.Move(tempPath, _filePath, overwrite: true);
        }
    }
}