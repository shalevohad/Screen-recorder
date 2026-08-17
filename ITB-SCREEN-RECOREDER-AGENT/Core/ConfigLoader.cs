using System;
using System.IO;
using System.Text.Json;

namespace ITBRecorderAgent.Core
{
    public static class ConfigLoader
    {
        private const string ConfigFileName = "appsettings.json";

        public static AppConfig Load()
        {
            string basePath = AppDomain.CurrentDomain.BaseDirectory;
            string configPath = Path.Combine(basePath, ConfigFileName);

            if (!File.Exists(configPath))
            {
                Logger.Warn($"Configuration file '{ConfigFileName}' not found at {configPath}. Using default settings.");
                return new AppConfig();
            }

            try
            {
                string jsonContent = File.ReadAllText(configPath);
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    ReadCommentHandling = JsonCommentHandling.Skip
                };

                var config = JsonSerializer.Deserialize<AppConfig>(jsonContent, options) ?? new AppConfig();

                // If FFmpegPath was loaded from config, ensure it's resolved properly
                // This will trigger the resolution logic in the FFmpegPath property getter
                if (!string.IsNullOrEmpty(config.FFmpegPath))
                {
                    // Accessing FFmpegPath property will call ResolveFFmpegPath() if needed
                    _ = config.FFmpegPath;
                }

                Logger.Info("Configuration loaded successfully from appsettings.json.");
                return config;
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to parse '{ConfigFileName}'. Falling back to default settings. Error: {ex.Message}");
                return new AppConfig();
            }
        }
    }
}