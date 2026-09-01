using System;
using System.IO;
using System.Text.Json;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    public static class ConfigLoader
    {
        private static readonly string SharedProgramDataPath = OperatingSystem.IsWindows()
            ? @"C:\ProgramData\ITB-SCREEN-RECORDER\appsettings.json"
            : "/etc/itb-screen-recorder/appsettings.json";

        public static AppConfig Load()
        {
            AppConfig config = new AppConfig();

            try
            {
                string configPath = ResolveConfigPath();

                if (File.Exists(configPath))
                {
                    string json = File.ReadAllText(configPath);
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true,
                        ReadCommentHandling = JsonCommentHandling.Skip,
                        AllowTrailingCommas = true
                    };

                    config = JsonSerializer.Deserialize<AppConfig>(json, options) ?? new AppConfig();
                    Logger.Info($"[Config] Loaded base configuration from: {configPath}");
                }
                else
                {
                    Logger.Warn($"[Config] Config file not found at '{configPath}'. Using defaults.");
                }
            }
            catch (Exception ex)
            {
                Logger.Error($"[Config] Failed to load config file: {ex.Message}");
            }

            return config;
        }

        private static string ResolveConfigPath()
        {
            string appDirConfig = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
            if (File.Exists(appDirConfig)) return appDirConfig;

            if (File.Exists(SharedProgramDataPath)) return SharedProgramDataPath;

            return Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
        }
    }
}