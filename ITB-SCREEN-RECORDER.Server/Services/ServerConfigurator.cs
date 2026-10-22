// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/ServerConfigurator.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.Win32;

public static class ServerConfigurator
{
    public static int ApplyConfig(string rawData)
    {
        string logPath = @"C:\Windows\Temp\itb-server-setup.log";
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
            Log("=== [Server Setup Configuration Started] ===");
            Log($"Received CustomActionData: {rawData}");

            if (string.IsNullOrWhiteSpace(rawData))
            {
                Log("ERROR: CustomActionData is empty. Exiting.");
                return 0;
            }

            var parts = rawData.Split('|');
            string installDir = parts.Length > 0 ? parts[0].TrimEnd('\\', '/') : "";
            if (string.IsNullOrWhiteSpace(installDir)) installDir = AppContext.BaseDirectory.TrimEnd('\\', '/');

            string httpPort = parts.Length > 1 && !string.IsNullOrWhiteSpace(parts[1]) ? parts[1].Trim() : "5090";
            string rtmpPort = parts.Length > 2 && !string.IsNullOrWhiteSpace(parts[2]) ? parts[2].Trim() : "19350";
            string apiPort = parts.Length > 3 && !string.IsNullOrWhiteSpace(parts[3]) ? parts[3].Trim() : "9997";
            string hlsPort = parts.Length > 4 && !string.IsNullOrWhiteSpace(parts[4]) ? parts[4].Trim() : "8888";
            string dataDir = parts.Length > 5 && !string.IsNullOrWhiteSpace(parts[5]) ? parts[5].TrimEnd('\\', '/') : @"C:\ProgramData\ITB-SCREEN-RECORDER\Server";
            string serverRole = parts.Length > 6 && !string.IsNullOrWhiteSpace(parts[6]) ? parts[6].Trim() : "Active-Active";
            string serverPriority = parts.Length > 7 && !string.IsNullOrWhiteSpace(parts[7]) ? parts[7].Trim() : "1";
            string discPort = parts.Length > 8 && !string.IsNullOrWhiteSpace(parts[8]) ? parts[8].Trim() : "5098";
            string discMcast = parts.Length > 9 && !string.IsNullOrWhiteSpace(parts[9]) ? parts[9].Trim() : "239.210.1.5";
            bool enableVip = parts.Length > 10 && (parts[10] == "1" || string.Equals(parts[10], "true", StringComparison.OrdinalIgnoreCase));
            string virtualIp = parts.Length > 11 ? parts[11].Trim() : "";
            string partnerUrl = parts.Length > 12 ? parts[12].Trim() : "";
            string vipSubnet = parts.Length > 13 && !string.IsNullOrWhiteSpace(parts[13]) ? parts[13].Trim() : "255.255.255.0";
            string discBcast = parts.Length > 14 && !string.IsNullOrWhiteSpace(parts[14]) ? parts[14].Trim() : "255.255.255.255";

            if (!string.IsNullOrEmpty(virtualIp)) enableVip = true;

            string cleanRole = serverRole.ToLowerInvariant();
            if (cleanRole == "aggregate" || cleanRole == "aggrigate" || cleanRole == "agg" || cleanRole == "super")
            {
                serverRole = "Aggregate";
                if (serverPriority == "1" || string.IsNullOrEmpty(serverPriority)) serverPriority = "0";
            }
            else if (cleanRole == "standalone" || cleanRole == "single")
            {
                serverRole = "Standalone";
                if (string.IsNullOrEmpty(serverPriority) || serverPriority == "0") serverPriority = "1";
            }
            else
            {
                serverRole = "Active-Active";
                if (string.IsNullOrEmpty(serverPriority) || serverPriority == "0") serverPriority = "1";
            }

            string dataDirJson = dataDir.Replace(@"\", @"\\");

            Log($"Parsed settings: HTTP={httpPort}, RTMP={rtmpPort}, API={apiPort}, HLS={hlsPort}, Role={serverRole}, Priority={serverPriority}, DiscPort={discPort}, DiscMcast={discMcast}, VIP={virtualIp}");
            Log($"InstallDir: {installDir}");
            Log($"DataDir: {dataDir}");

            // 1. Update JSON files
            var jsonFiles = new[]
            {
                Path.Combine(installDir, "appsettings.json"),
                Path.Combine(installDir, "appsettings.Windows.json"),
                Path.Combine(AppContext.BaseDirectory, "appsettings.json"),
                Path.Combine(AppContext.BaseDirectory, "appsettings.Windows.json")
            };

            var processed = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            foreach (var jp in jsonFiles)
            {
                if (!File.Exists(jp) || !processed.Add(jp)) continue;

                Log($"Processing JSON file: {jp}");
                string content = File.ReadAllText(jp);

                // Port Kestrel HTTPS
                content = Regex.Replace(content, @"""Url""\s*:\s*""https?://0\.0\.0\.0:\d+""", $@"""Url"": ""https://0.0.0.0:{httpPort}""", RegexOptions.IgnoreCase);
                content = Regex.Replace(content, @"""Endpoints""\s*:\s*\{\s*""Http""\s*:", @"""Endpoints"": {" + "\r\n      \"Https\":", RegexOptions.IgnoreCase);

                // SystemConfig.HttpPort
                if (Regex.IsMatch(content, @"""HttpPort""\s*:\s*\d+", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""HttpPort""\s*:\s*\d+", $@"""HttpPort"": {httpPort}", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""SystemConfig""\s*:\s*\{)", "$1\r\n    \"HttpPort\": " + httpPort + ",", RegexOptions.IgnoreCase);
                }

                // MediaMTX Ports
                content = Regex.Replace(content, @"""RtmpPort""\s*:\s*\d+", $@"""RtmpPort"": {rtmpPort}", RegexOptions.IgnoreCase);
                content = Regex.Replace(content, @"""ApiPort""\s*:\s*\d+", $@"""ApiPort"": {apiPort}", RegexOptions.IgnoreCase);
                content = Regex.Replace(content, @"""HlsPort""\s*:\s*\d+", $@"""HlsPort"": {hlsPort}", RegexOptions.IgnoreCase);

                // Storage and Data paths
                content = Regex.Replace(content, @"""LocalFallbackPath""\s*:\s*""[^""]*""", $@"""LocalFallbackPath"": ""{dataDirJson}\\\\Recordings""", RegexOptions.IgnoreCase);
                content = Regex.Replace(content, @"""BaseDirectory""\s*:\s*""[^""]*""", $@"""BaseDirectory"": ""{dataDirJson}\\\\Data""", RegexOptions.IgnoreCase);
                content = Regex.Replace(content, @"""ExportPath""\s*:\s*""[^""]*""", $@"""ExportPath"": ""{dataDirJson}\\\\Exports""", RegexOptions.IgnoreCase);
                content = Regex.Replace(content, @"""ChunkEventLogPath""\s*:\s*""[^""]*""", $@"""ChunkEventLogPath"": ""{dataDirJson}\\\\Logs\\\\chunk-events.log""", RegexOptions.IgnoreCase);

                // Discovery Role & Priority
                if (Regex.IsMatch(content, @"""Role""\s*:\s*""[^""]*""", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""Role""\s*:\s*""[^""]*""", $@"""Role"": ""{serverRole}""", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"Role\": \"" + serverRole + "\",", RegexOptions.IgnoreCase);
                }

                if (Regex.IsMatch(content, @"""Priority""\s*:\s*\d+", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""Priority""\s*:\s*\d+", $@"""Priority"": {serverPriority}", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"Priority\": " + serverPriority + ",", RegexOptions.IgnoreCase);
                }

                // Discovery Port & Multicast/Broadcast
                if (Regex.IsMatch(content, @"""Port""\s*:\s*\d+", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""Port""\s*:\s*\d+", $@"""Port"": {discPort}", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"Port\": " + discPort + ",", RegexOptions.IgnoreCase);
                }

                if (Regex.IsMatch(content, @"""MulticastAddress""\s*:\s*""[^""]*""", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""MulticastAddress""\s*:\s*""[^""]*""", $@"""MulticastAddress"": ""{discMcast}""", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"MulticastAddress\": \"" + discMcast + "\",", RegexOptions.IgnoreCase);
                }

                if (Regex.IsMatch(content, @"""BroadcastAddress""\s*:\s*""[^""]*""", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""BroadcastAddress""\s*:\s*""[^""]*""", $@"""BroadcastAddress"": ""{discBcast}""", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"BroadcastAddress\": \"" + discBcast + "\",", RegexOptions.IgnoreCase);
                }

                // Virtual IP & Partner Server URL
                if (Regex.IsMatch(content, @"""EnableVirtualIp""\s*:\s*(true|false)", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""EnableVirtualIp""\s*:\s*(true|false)", $@"""EnableVirtualIp"": {(enableVip ? "true" : "false")}", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"EnableVirtualIp\": " + (enableVip ? "true" : "false") + ",", RegexOptions.IgnoreCase);
                }

                if (Regex.IsMatch(content, @"""VirtualIp""\s*:\s*""[^""]*""", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""VirtualIp""\s*:\s*""[^""]*""", $@"""VirtualIp"": ""{virtualIp}""", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"VirtualIp\": \"" + virtualIp + "\",", RegexOptions.IgnoreCase);
                }

                if (Regex.IsMatch(content, @"""VirtualIpSubnetMask""\s*:\s*""[^""]*""", RegexOptions.IgnoreCase))
                {
                    content = Regex.Replace(content, @"""VirtualIpSubnetMask""\s*:\s*""[^""]*""", $@"""VirtualIpSubnetMask"": ""{vipSubnet}""", RegexOptions.IgnoreCase);
                }
                else
                {
                    content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"VirtualIpSubnetMask\": \"" + vipSubnet + "\",", RegexOptions.IgnoreCase);
                }

                if (!string.IsNullOrEmpty(partnerUrl))
                {
                    if (Regex.IsMatch(content, @"""PartnerServerUrl""\s*:\s*""[^""]*""", RegexOptions.IgnoreCase))
                    {
                        content = Regex.Replace(content, @"""PartnerServerUrl""\s*:\s*""[^""]*""", $@"""PartnerServerUrl"": ""{partnerUrl}""", RegexOptions.IgnoreCase);
                    }
                    else
                    {
                        content = Regex.Replace(content, @"(""Discovery""\s*:\s*\{)", "$1\r\n      \"PartnerServerUrl\": \"" + partnerUrl + "\",", RegexOptions.IgnoreCase);
                    }
                }

                File.WriteAllText(jp, content, System.Text.Encoding.UTF8);
                Log($"Successfully updated: {jp}");
            }

            // 2. Update mediamtx.yml
            var yamlCandidates = new[]
            {
                Path.Combine(installDir, "MediaMTX", "mediamtx.yml"),
                Path.Combine(installDir, "mediamtx.yml"),
                Path.Combine(AppContext.BaseDirectory, "MediaMTX", "mediamtx.yml"),
                Path.Combine(AppContext.BaseDirectory, "mediamtx.yml")
            };

            var processedYaml = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            foreach (var yp in yamlCandidates)
            {
                if (!File.Exists(yp) || !processedYaml.Add(yp)) continue;

                Log($"Processing YAML file: {yp}");
                var lines = File.ReadAllLines(yp);
                for (int l = 0; l < lines.Length; l++)
                {
                    string line = lines[l];
                    if (Regex.IsMatch(line, @"^[ \t]*#?[ \t]*api\s*:", RegexOptions.IgnoreCase) &&
                        !Regex.IsMatch(line, @"apiAddress|apiAllowOrigins", RegexOptions.IgnoreCase))
                    {
                        lines[l] = "api: yes";
                    }
                    else if (Regex.IsMatch(line, @"^[ \t]*#?[ \t]*apiAddress\s*:", RegexOptions.IgnoreCase))
                    {
                        lines[l] = $"apiAddress: :{apiPort}";
                    }
                    else if (Regex.IsMatch(line, @"^[ \t]*#?[ \t]*rtmpAddress\s*:", RegexOptions.IgnoreCase))
                    {
                        lines[l] = $"rtmpAddress: :{rtmpPort}";
                    }
                    else if (Regex.IsMatch(line, @"^[ \t]*#?[ \t]*hlsAddress\s*:", RegexOptions.IgnoreCase))
                    {
                        lines[l] = $"hlsAddress: :{hlsPort}";
                    }
                }

                File.WriteAllLines(yp, lines);
                Log($"Successfully updated {yp}");
            }

            // 3. Save to Registry for upgrade persistence and WiX RegistrySearch
            if (OperatingSystem.IsWindows())
            {
                try
                {
                    using var key = Registry.LocalMachine.CreateSubKey(@"SOFTWARE\ITB\ScreenRecorder\Server");
                    if (key != null)
                    {
                        key.SetValue("HttpPort", httpPort);
                        key.SetValue("RtmpPort", rtmpPort);
                        key.SetValue("ApiPort", apiPort);
                        key.SetValue("HlsPort", hlsPort);
                        key.SetValue("DataDir", dataDir);
                        key.SetValue("ServerRole", serverRole);
                        key.SetValue("ServerPriority", serverPriority);
                        key.SetValue("DiscoveryPort", discPort);
                        key.SetValue("DiscoveryMulticast", discMcast);
                        key.SetValue("DiscoveryBroadcast", discBcast);
                        key.SetValue("EnableVip", enableVip ? "1" : "0");
                        key.SetValue("VirtualIp", virtualIp);
                        key.SetValue("VirtualIpSubnet", vipSubnet);
                        key.SetValue("PartnerUrl", partnerUrl);
                        Log(@"Successfully updated Registry HKLM\SOFTWARE\ITB\ScreenRecorder\Server");
                    }
                }
                catch (Exception regEx)
                {
                    Log($"Warning: could not write to registry: {regEx.Message}");
                }

                // 4. Ensure directories exist
                try
                {
                    string certsDir = @"C:\ProgramData\ITB-SCREEN-RECORDER\Certificates";
                    if (!Directory.Exists(certsDir)) Directory.CreateDirectory(certsDir);

                    string recDir = Path.Combine(dataDir, "Recordings");
                    if (!Directory.Exists(recDir)) Directory.CreateDirectory(recDir);

                    string dataSubDir = Path.Combine(dataDir, "Data");
                    if (!Directory.Exists(dataSubDir)) Directory.CreateDirectory(dataSubDir);

                    string expDir = Path.Combine(dataDir, "Exports");
                    if (!Directory.Exists(expDir)) Directory.CreateDirectory(expDir);

                    string logDir = Path.Combine(dataDir, "Logs");
                    if (!Directory.Exists(logDir)) Directory.CreateDirectory(logDir);

                    Log("Ensured data and certificates directories exist.");
                }
                catch (Exception dirEx)
                {
                    Log($"Warning: could not create data directories: {dirEx.Message}");
                }
            }

            Log("=== [Server Setup Configuration Finished Successfully] ===");
            return 0;
        }
        catch (Exception ex)
        {
            Log($"[ERROR] ServerConfigurator exception: {ex}");
            return 0;
        }
    }
}
