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
        private readonly SemaphoreSlim _writeLock = new(1, 1);
        private readonly JsonSerializerOptions _jsonOptions = new() { WriteIndented = true };

        public StationOverridesService(IHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "stations-config.json");

            // יצירת קובץ ריק אם אינו קיים
            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "{}");
            }
        }

        public async Task<Dictionary<string, StationOverride>> GetAllAsync()
        {
            await using var stream = File.OpenRead(_filePath);
            var result = await JsonSerializer.DeserializeAsync<Dictionary<string, StationOverride>>(stream, _jsonOptions);
            return result ?? new Dictionary<string, StationOverride>();
        }

        public async Task SetOverrideAsync(string hostname, StationOverride overrides)
        {
            await _writeLock.WaitAsync();
            try
            {
                var dict = await GetAllAsync();

                // עדכון או הוספה
                dict[hostname] = overrides;

                var tempPath = _filePath + ".tmp";
                await using var createStream = File.Create(tempPath);
                await JsonSerializer.SerializeAsync(createStream, dict, _jsonOptions);
                await createStream.DisposeAsync();

                File.Move(tempPath, _filePath, overwrite: true);
            }
            finally
            {
                _writeLock.Release();
            }
        }
    }
}