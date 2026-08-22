using System;
using System.IO;
using System.Text.Json;
using Microsoft.Win32;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    public static class ConfigLoader
    {
        // עדכון נתיב ה-Shared ללינוקס: שימוש בנתיב שרת סטנדרטי (/etc) במקום UserProfile
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
                    Logger.Warn($"[Config] Config file not found. Using defaults.");
                }
            }
            catch (Exception ex)
            {
                Logger.Error($"[Config] Failed to load config file: {ex.Message}");
            }

            // קריאת הגדרות מותאמות אישית שהוזרקו דרך ה-MSI או ה-Registry (Endpoint Central)
            ApplyRegistryOverrides(config);

            return config;
        }

        private static void ApplyRegistryOverrides(AppConfig config)
        {
            if (!OperatingSystem.IsWindows()) return;

            try
            {
                using var key = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\ITB\ScreenRecorder");
                if (key != null)
                {
                    var dashboardUrl = key.GetValue("DashboardApiUrl") as string;
                    if (!string.IsNullOrWhiteSpace(dashboardUrl))
                    {
                        config.DashboardApiUrl = dashboardUrl;
                    }

                    var rtmpUrl = key.GetValue("RtmpServerBaseUrl") as string;
                    if (!string.IsNullOrWhiteSpace(rtmpUrl))
                    {
                        config.RtmpServerBaseUrl = rtmpUrl;
                    }

                    var videoBitrate = key.GetValue("VideoBitrate") as string;
                    if (!string.IsNullOrWhiteSpace(videoBitrate))
                    {
                        config.VideoBitrate = videoBitrate;
                    }

                    var targetFps = key.GetValue("TargetFps");
                    if (targetFps != null && int.TryParse(targetFps.ToString(), out int parsedFps))
                    {
                        config.TargetFps = parsedFps;
                    }

                    var autoStart = key.GetValue("AutoStartRecordingOnLaunch");
                    if (autoStart != null && bool.TryParse(autoStart.ToString(), out bool parsedAutoStart))
                    {
                        config.AutoStartRecordingOnLaunch = parsedAutoStart;
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[Config] Could not read registry overrides: {ex.Message}");
            }
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