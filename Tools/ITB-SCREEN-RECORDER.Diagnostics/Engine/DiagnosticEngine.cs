using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using ITB_SCREEN_RECORDER.Diagnostics.Models;

namespace ITB_SCREEN_RECORDER.Diagnostics.Engine
{
    public class DiagnosticEngine
    {
        private static readonly Regex LogTimestampRegex = new(@"^\[?(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\.\d+)?)\]?", RegexOptions.Compiled);
        private static readonly Regex ClockOffsetRegex = new(@"Calibrated clock offset:\s*(-?\d+(?:\.\d+)?)ms", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public FileAnalysisResult AnalyzeFile(string filePath)
        {
            var result = new FileAnalysisResult
            {
                FilePath = filePath
            };

            if (!File.Exists(filePath))
            {
                result.GeneralErrors.Add($"File does not exist: {filePath}");
                return result;
            }

            var fileInfo = new FileInfo(filePath);
            result.FileSizeBytes = fileInfo.Length;

            var findingsDict = new Dictionary<string, DiagnosticFinding>();
            int watchdogTerminationCount = 0;
            int ipcContentionCount = 0;
            int brokenPipeCount = 0;
            int serverDiscoveryTimeoutCount = 0;
            int airgapProbeCount = 0;
            int largeClockDriftCount = 0;
            int dxgiErrorCount = 0;
            int whep404Count = 0;
            int encoderFallbackCount = 0;
            int storageFailoverCount = 0;

            DateTime? firstLogTime = null;
            DateTime? lastLogTime = null;
            int lineIndex = 0;

            using (var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete))
            using (var reader = new StreamReader(fs))
            {
                string? line;
                while ((line = reader.ReadLine()) != null)
                {
                    lineIndex++;
                    DateTime? lineTime = ParseTimestamp(line);
                    if (lineTime.HasValue)
                    {
                        if (!firstLogTime.HasValue || lineTime.Value < firstLogTime.Value) firstLogTime = lineTime.Value;
                        if (!lastLogTime.HasValue || lineTime.Value > lastLogTime.Value) lastLogTime = lineTime.Value;
                    }

                    // 1. IPC Concurrency Stream Contention
                    if (line.Contains("The stream is currently in use by a previous operation on the stream", StringComparison.OrdinalIgnoreCase))
                    {
                        ipcContentionCount++;
                        RecordFinding(findingsDict, "IPC-001", FindingSeverity.Critical,
                            "IPC Stream Concurrency Contention",
                            "Multiple asynchronous operations concurrently attempted to write to the unsynchronized Named Pipe stream between AgentSupervisor and AgentWorker.",
                            "AgentSupervisor concurrently called WriteLineAsync from both ListenToWorkerIpcAsync and TelemetryLoopAsync without serialization, causing the duplex NamedPipe stream to throw an InvalidOperationException and enter a permanently poisoned state. The worker never receives 'Start' / 'SetRecording' commands, causing black screens in Dashboard.",
                            "Fixed in v1.0.43: Named Pipe writes are now strictly serialized through a Channel<string> dedicated background writer task. Upgrade endpoint to v1.0.43+.",
                            line, lineTime);
                    }

                    // 2. Watchdog Worker Termination Loop
                    if (line.Contains("Worker process detected but IPC heartbeat is dead", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("LaunchTimeout: True", StringComparison.OrdinalIgnoreCase))
                    {
                        watchdogTerminationCount++;
                        RecordFinding(findingsDict, "WDOG-001", FindingSeverity.Critical,
                            "Watchdog LaunchTimeout Worker Kill Loop",
                            "The supervisor watchdog detected that AgentWorker did not report an active IPC heartbeat within the 25-second startup grace window, triggering hard process termination.",
                            "Because AgentWorker was unable to complete initial IPC command handshakes (due to IPC lockup or crash), no valid heartbeat telemetry was delivered within 25 seconds. The watchdog killed the worker and restarted it in an endless loop every 30 seconds.",
                            "Resolve the underlying IPC lockup or worker startup exception. With serialized IPC in v1.0.43, workers authenticate and stream telemetry in <50ms.",
                            line, lineTime);
                    }

                    // 3. Broken Pipe / Closed TextWriter
                    if (line.Contains("Cannot write to a closed TextWriter", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("Pipe is broken", StringComparison.OrdinalIgnoreCase))
                    {
                        brokenPipeCount++;
                        RecordFinding(findingsDict, "IPC-002", FindingSeverity.Critical,
                            "Broken Pipe / Closed StreamWriter",
                            "Commands were dispatched to the IPC Named Pipe after the client process had already disconnected or been terminated by watchdog.",
                            "The StreamWriter remains referenced after the worker process was killed, resulting in ObjectDisposedException / closed TextWriter warnings on subsequent loop dispatches.",
                            "Ensured proper cleanup of connection CancellationTokenSource and StreamWriter disposal upon disconnect.",
                            line, lineTime);
                    }

                    // 4. Air-Gapped Network Probe Failure (8.8.8.8 socket attempt)
                    if (line.Contains("8.8.8.8", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("A socket operation was attempted to an unreachable host", StringComparison.OrdinalIgnoreCase))
                    {
                        airgapProbeCount++;
                        RecordFinding(findingsDict, "AIRGAP-001", FindingSeverity.Warning,
                            "Air-Gapped Network Violation (External IP Probe)",
                            "HardwareProbe attempted to open an outbound socket to public Google DNS (8.8.8.8:65530) to resolve local IP address, which fails in isolated/air-gapped networks (Rule 14 violation).",
                            "Endpoints in high-security operational enclaves have zero external internet routing. Opening external sockets causes timeouts, socket exceptions, and delayed service startup during boot.",
                            "Fixed in v1.0.43: HardwareProbe now safely enumerates local NetworkInterface adapters directly without any external socket connection attempts.",
                            line, lineTime);
                    }

                    // 5. Server Discovery Timeout / Connection Refused
                    if (line.Contains("Autonomous server discovery timed out without response", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("No connection could be made because the target machine actively refused it", StringComparison.OrdinalIgnoreCase))
                    {
                        serverDiscoveryTimeoutCount++;
                        RecordFinding(findingsDict, "NET-001", FindingSeverity.Warning,
                            "Central Server Discovery / Connection Timeout",
                            "Agent was unable to discover the central C2 server via UDP multicast (239.210.1.5:5098) / broadcast, or central server port 5090 actively refused connection.",
                            "Either the central server service was restarting/down, or the network switches / firewalls between endpoints and server dropped UDP 5098 or blocked HTTPS 5090.",
                            "1) Verify ITB Server service is running on the central node. 2) Ensure UDP port 5098 (broadcast/multicast) and TCP 5090 are allowed in Windows Firewall and VLAN ACLs.",
                            line, lineTime);
                    }

                    // 6. Clock Drift Synchronization
                    var clockMatch = ClockOffsetRegex.Match(line);
                    if (clockMatch.Success)
                    {
                        if (double.TryParse(clockMatch.Groups[1].Value, NumberStyles.Float, CultureInfo.InvariantCulture, out double offsetMs))
                        {
                            if (Math.Abs(offsetMs) > 500.0)
                            {
                                largeClockDriftCount++;
                                RecordFinding(findingsDict, "CLOCK-001", FindingSeverity.Warning,
                                    "Significant Clock Offset Drift (>500ms)",
                                    $"Clock calibration detected high offset ({offsetMs:F1}ms) between workstation and central server.",
                                    "Workstation system time has drifted from central server master clock. Excessive drift can cause out-of-order chunks or MediaMTX NTP tolerance rejections.",
                                    "Ensure Windows Time service (W32Time) is running and synchronized to the internal NTP master clock on domain controllers.",
                                    line, lineTime);
                            }
                        }
                    }

                    // 7. DXGI Desktop Duplication Capture Lost
                    if (line.Contains("DXGI_ERROR_ACCESS_LOST", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("DXGI_ERROR_DEVICE_REMOVED", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("Failed to duplicate output", StringComparison.OrdinalIgnoreCase))
                    {
                        dxgiErrorCount++;
                        RecordFinding(findingsDict, "DXGI-001", FindingSeverity.Warning,
                            "DXGI Desktop Duplication Device Lost",
                            "DirectX Graphics Infrastructure (DXGI) desktop duplication device was lost or removed.",
                            "Occurs during GPU driver resets, monitor resolution changes, display sleep, or user workstation locking (switch to secure Winlogon desktop).",
                            "AgentWorker includes dynamic DDA recovery loops. If recurrent, verify GPU driver stability and disable display sleep in Windows Power Plan.",
                            line, lineTime);
                    }

                    // 8. WHEP 404 / Live Stream Missing
                    if (line.Contains("404 Not Found", StringComparison.OrdinalIgnoreCase) && line.Contains("whep", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("no stream available", StringComparison.OrdinalIgnoreCase))
                    {
                        whep404Count++;
                        RecordFinding(findingsDict, "STREAM-001", FindingSeverity.Critical,
                            "WebRTC WHEP Stream 404 / Black Screen",
                            "Dashboard WebRTC WHEP player received HTTP 404 Not Found when trying to subscribe to the live stream.",
                            "The station is not publishing an active RTMP stream to MediaMTX on port 19350 (live/{hostname}/mon-0). This directly explains why dashboard cards appear black.",
                            "Check station worker logs: verify that AgentWorker is connected to IPC and in an active publishing state.",
                            line, lineTime);
                    }

                    // 9. Hardware Encoder Probe Failure
                    if (line.Contains("h264_nvenc is not supported", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("Falling back to libx264", StringComparison.OrdinalIgnoreCase))
                    {
                        encoderFallbackCount++;
                        RecordFinding(findingsDict, "ENC-001", FindingSeverity.Info,
                            "Hardware Encoder Fallback to Software CPU (libx264)",
                            "NVIDIA NVENC hardware acceleration is unavailable; pipeline fell back to CPU software encoding.",
                            "NVIDIA GPU is absent or graphics drivers do not provide NVENC support.",
                            "Install supported NVIDIA GPU drivers (>= 528.x) to enable zero-CPU hardware acceleration (Rule 8).",
                            line, lineTime);
                    }

                    // 10. Storage Path Failover
                    if (line.Contains("Storage failover triggered", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("Falling back to local path", StringComparison.OrdinalIgnoreCase))
                    {
                        storageFailoverCount++;
                        RecordFinding(findingsDict, "STOR-001", FindingSeverity.Warning,
                            "Storage Dual-Path Failover Engaged",
                            "Primary storage UNC path became unreachable; system redirected recording chunks to local fallback path.",
                            "NetApp UNC heartbeat probe timed out (>3000ms), activating automatic failover (Rule 2).",
                            "Verify network connectivity and SMB authentication to the central storage server.",
                            line, lineTime);
                    }

                    // 11. Linux Systemd Service Failure
                    if (line.Contains("Failed with result 'exit-code'", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("itb-server.service: Main process exited", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("itb-agent.service: Main process exited", StringComparison.OrdinalIgnoreCase))
                    {
                        RecordFinding(findingsDict, "LNX-001", FindingSeverity.Critical,
                            "Linux Systemd Service Abnormal Exit",
                            "Systemd recorded abnormal process termination for ITB Screen Recorder service daemon.",
                            "The daemon crashed or exited with a non-zero exit code. Review the previous 20 lines in journalctl for unhandled exceptions or missing shared objects (.so).",
                            "Run: 'journalctl -u itb-server -n 100 --no-pager' or 'journalctl -u itb-agent -n 100 --no-pager' to view stack traces.",
                            line, lineTime);
                    }

                    // 12. Linux Display Server / Wayland / PipeWire / X11 Errors
                    if (line.Contains("Cannot open display", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("No protocol specified", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("PipeWire node not found", StringComparison.OrdinalIgnoreCase) ||
                        line.Contains("X11 connection failed", StringComparison.OrdinalIgnoreCase))
                    {
                        RecordFinding(findingsDict, "LNX-002", FindingSeverity.Warning,
                            "Linux Display Server Connection Error",
                            "AgentWorker failed to acquire display surface from X11 or PipeWire.",
                            "The session user context or DISPLAY/XDG_RUNTIME_DIR environment variables were missing, or the session was locked.",
                            "Ensure the worker runs within the user's graphical session with access to XAUTHORITY or PipeWire socket.",
                            line, lineTime);
                    }
                }
            }

            result.TotalLines = lineIndex;
            result.FirstLogTimestamp = firstLogTime;
            result.LastLogTimestamp = lastLogTime;

            // Multi-event correlation: If watchdog terminated worker 3+ times AND IPC contention was detected,
            // synthesize a master incident finding explaining the black screen fleet-wide phenomenon.
            if (watchdogTerminationCount >= 3 && ipcContentionCount >= 3)
            {
                findingsDict["INCIDENT-REBOOT-CRASH-LOOP"] = new DiagnosticFinding
                {
                    RuleId = "INCIDENT-001",
                    Severity = FindingSeverity.Critical,
                    Title = "FLEET-WIDE REBOOT DESYNCHRONIZATION & CRASH LOOP (POST-POWER OUTAGE)",
                    Description = $"Detected catastrophic worker crash loop: {watchdogTerminationCount} worker terminations and {ipcContentionCount} IPC stream collision exceptions over {lineIndex} lines.",
                    RootCause = "Following the power outage and station reboot, AgentSupervisor attempted to re-establish communication with AgentWorker. High telemetry frequency combined with simultaneous Start/SyncClock command dispatches triggered concurrent writes on the single Named Pipe stream. This threw 'The stream is currently in use by a previous operation on the stream', completely blocking worker command receipt. AgentWorker never started RTMP publishing (causing dashboard black screen) and never sent valid telemetry, triggering watchdog launch timeout every 30 seconds.",
                    Recommendation = "1. Update AgentService on endpoints to v1.0.44+ (which implements Channel-based single-writer serialization for all IPC commands).\n2. Restart the ITB-SCREEN-RECORDER Agent Service on affected workstations: Restart-Service ITBScreenRecorderAgent.\n3. Verify in Dashboard that live preview restores instantly.",
                    Count = watchdogTerminationCount,
                    FirstSeenUtc = firstLogTime,
                    LastSeenUtc = lastLogTime,
                    Samples = new List<string>
                    {
                        "IPC contention -> Worker blocked -> Watchdog kill (30s) -> Restart loop -> 0 RTMP feeds -> Dashboard all black screens"
                    }
                };
            }

            result.Findings = findingsDict.Values
                .OrderByDescending(f => f.Severity)
                .ThenByDescending(f => f.Count)
                .ToList();

            return result;
        }

        private static void RecordFinding(
            Dictionary<string, DiagnosticFinding> dict,
            string ruleId,
            FindingSeverity severity,
            string title,
            string description,
            string rootCause,
            string recommendation,
            string sampleLine,
            DateTime? timestamp)
        {
            if (!dict.TryGetValue(ruleId, out var finding))
            {
                finding = new DiagnosticFinding
                {
                    RuleId = ruleId,
                    Severity = severity,
                    Title = title,
                    Description = description,
                    RootCause = rootCause,
                    Recommendation = recommendation,
                    Count = 0,
                    FirstSeenUtc = timestamp,
                    LastSeenUtc = timestamp
                };
                dict[ruleId] = finding;
            }

            finding.Count++;
            if (timestamp.HasValue)
            {
                if (!finding.FirstSeenUtc.HasValue || timestamp.Value < finding.FirstSeenUtc.Value) finding.FirstSeenUtc = timestamp.Value;
                if (!finding.LastSeenUtc.HasValue || timestamp.Value > finding.LastSeenUtc.Value) finding.LastSeenUtc = timestamp.Value;
            }

            if (finding.Samples.Count < 4)
            {
                finding.Samples.Add(sampleLine.Trim());
            }
        }

        private static DateTime? ParseTimestamp(string line)
        {
            var m = LogTimestampRegex.Match(line);
            if (m.Success)
            {
                if (DateTime.TryParse(m.Groups[1].Value, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out var dt))
                {
                    return dt;
                }
            }
            return null;
        }
    }
}
