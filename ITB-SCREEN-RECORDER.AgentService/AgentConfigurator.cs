// ==========================================
// File: ITB-SCREEN-RECORDER.AgentService/AgentConfigurator.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.AgentService;

using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.Win32;

public static class AgentConfigurator
{
    public static int ApplyConfig(string rawData)
    {
        string logPath = @"C:\Windows\Temp\itb-agent.log";
        void Log(string msg)
        {
            try
            {
                File.AppendAllText(logPath, $"[{DateTime.UtcNow:u}] {msg}{Environment.NewLine}");
            }
            catch { }
        }

        try
        {
            Log("=== [Agent Setup Configuration Started] ===");
            Log($"Raw Data: {rawData}");

            if (string.IsNullOrWhiteSpace(rawData))
            {
                Log("No configuration data passed. Skipping.");
                return 0;
            }

            var parts = rawData.Split('|');
            string installDir = parts.Length > 0 ? parts[0].TrimEnd('\\', '/') : AppContext.BaseDirectory;
            if (string.IsNullOrWhiteSpace(installDir)) installDir = AppContext.BaseDirectory;

            string serverIp = parts.Length > 1 && !string.IsNullOrWhiteSpace(parts[1]) ? parts[1].Trim() : "AUTO";
            string discPort = parts.Length > 2 && !string.IsNullOrWhiteSpace(parts[2]) ? parts[2].Trim() : "5098";
            string discMcast = parts.Length > 3 && !string.IsNullOrWhiteSpace(parts[3]) ? parts[3].Trim() : "239.255.10.90";
            string discBcast = parts.Length > 4 && !string.IsNullOrWhiteSpace(parts[4]) ? parts[4].Trim() : "255.255.255.255";

            bool isAuto = string.Equals(serverIp, "AUTO", StringComparison.OrdinalIgnoreCase) || string.IsNullOrWhiteSpace(serverIp);
            string hostOnly = serverIp.Contains(':') ? serverIp.Split(':')[0] : serverIp;

            Log($"Resolved: installDir='{installDir}', serverIp='{serverIp}', discPort={discPort}, mcast='{discMcast}', bcast='{discBcast}'");

            var targetFiles = new[]
            {
                Path.Combine(installDir, "appsettings.json"),
                Path.Combine(installDir, "appsettings.Windows.json"),
                Path.Combine(AppContext.BaseDirectory, "appsettings.json"),
                Path.Combine(AppContext.BaseDirectory, "appsettings.Windows.json")
            };

            var processed = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            foreach (var file in targetFiles)
            {
                if (!File.Exists(file) || !processed.Add(file)) continue;

                Log($"Updating config file: {file}");
                string content = File.ReadAllText(file);

                if (isAuto)
                {
                    content = Regex.Replace(content, @"(?i)""DashboardApiUrl""\s*:\s*""[^""]*""", @"""DashboardApiUrl"": ""AUTO""");
                    content = Regex.Replace(content, @"(?i)""RtmpServerBaseUrl""\s*:\s*""[^""]*""", @"""RtmpServerBaseUrl"": ""AUTO""");
                }
                else
                {
                    content = Regex.Replace(content, @"(?i)""DashboardApiUrl""\s*:\s*""[^""]*""", $@"""DashboardApiUrl"": ""https://{hostOnly}:5090/api/v1/agent/telemetry""");
                    content = Regex.Replace(content, @"(?i)""RtmpServerBaseUrl""\s*:\s*""[^""]*""", $@"""RtmpServerBaseUrl"": ""rtmps://{hostOnly}:19350/live/""");
                }

                if (Regex.IsMatch(content, @"(?i)""DiscoveryPort""\s*:\s*\d+"))
                {
                    content = Regex.Replace(content, @"(?i)""DiscoveryPort""\s*:\s*\d+", $@"""DiscoveryPort"": {discPort}");
                }
                else
                {
                    content = Regex.Replace(content, @"(?i)\{", "{\r\n  \"DiscoveryPort\": " + discPort + ",");
                }

                if (Regex.IsMatch(content, @"(?i)""DiscoveryMulticastAddress""\s*:\s*""[^""]*"""))
                {
                    content = Regex.Replace(content, @"(?i)""DiscoveryMulticastAddress""\s*:\s*""[^""]*""", $@"""DiscoveryMulticastAddress"": ""{discMcast}""");
                }
                else
                {
                    content = Regex.Replace(content, @"(?i)\{", "{\r\n  \"DiscoveryMulticastAddress\": \"" + discMcast + "\",");
                }

                if (Regex.IsMatch(content, @"(?i)""DiscoveryBroadcastAddress""\s*:\s*""[^""]*"""))
                {
                    content = Regex.Replace(content, @"(?i)""DiscoveryBroadcastAddress""\s*:\s*""[^""]*""", $@"""DiscoveryBroadcastAddress"": ""{discBcast}""");
                }
                else
                {
                    content = Regex.Replace(content, @"(?i)\{", "{\r\n  \"DiscoveryBroadcastAddress\": \"" + discBcast + "\",");
                }

                File.WriteAllText(file, content, System.Text.Encoding.UTF8);
                Log($"Successfully written: {file}");
            }

            // Save to Registry for upgrade persistence and WiX RegistrySearch
            if (OperatingSystem.IsWindows())
            {
                try
                {
                    using var key = Registry.LocalMachine.CreateSubKey(@"SOFTWARE\ITB\ScreenRecorder\Agent");
                    if (key != null)
                    {
                        key.SetValue("ServerIp", serverIp);
                        key.SetValue("DiscoveryPort", discPort);
                        key.SetValue("DiscoveryMulticast", discMcast);
                        key.SetValue("DiscoveryBroadcast", discBcast);
                        Log(@"Successfully updated Registry HKLM\SOFTWARE\ITB\ScreenRecorder\Agent");
                    }
                }
                catch (Exception regEx)
                {
                    Log($"Warning: could not write to registry: {regEx.Message}");
                }

                // Ensure certificates directory exists
                try
                {
                    string certsDir = @"C:\ProgramData\ITB-SCREEN-RECORDER\Certificates";
                    if (!Directory.Exists(certsDir))
                    {
                        Directory.CreateDirectory(certsDir);
                        Log($"Created certificates directory: {certsDir}");
                    }
                }
                catch (Exception dirEx)
                {
                    Log($"Warning: could not create certificates dir: {dirEx.Message}");
                }
            }

            Log("=== [Agent Setup Configuration Finished Successfully] ===");
            return 0;
        }
        catch (Exception ex)
        {
            Log($"[ERROR] AgentConfigurator exception: {ex}");
            return 0;
        }
    }
}
