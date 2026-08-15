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

                var config = JsonSerializer.Deserialize<AppConfig>(jsonContent, options);
                Logger.Info("Configuration loaded successfully from appsettings.json.");
                return config ?? new AppConfig();
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to parse '{ConfigFileName}'. Falling back to default settings. Error: {ex.Message}");
                return new AppConfig();
            }
        }
    }
}