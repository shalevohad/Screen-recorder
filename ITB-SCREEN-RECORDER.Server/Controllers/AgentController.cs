using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    public class FleetStreamingPolicyRequest
    {
        public bool Enable { get; set; }
        public List<string>? Hostnames { get; set; }
    }

    public class AgentTuningRequest
    {
        public int? Fps { get; set; }
        public int? BitrateKbps { get; set; }
        public string? Bitrate { get; set; }
    }

    public class UploadBufferRequest
    {
        public string Hostname { get; set; } = string.Empty;
        public IFormFile File { get; set; } = null!;
    }

    [ApiController]
    [Route("api/v1/agent")]
    public class AgentController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly TelemetryBroadcastService _broadcastService;
        private readonly StationOverridesService _overridesService;
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly StoragePathResolver _storageResolver;
        private readonly ILogger<AgentController> _logger;

        public AgentController(
            ITelemetryStateService telemetryState,
            TelemetryBroadcastService broadcastService,
            StationOverridesService overridesService,
            IOptionsMonitor<SystemConfig> configMonitor,
            StoragePathResolver storageResolver,
            ILogger<AgentController> logger)
        {
            _telemetryState = telemetryState;
            _broadcastService = broadcastService;
            _overridesService = overridesService;
            _configMonitor = configMonitor;
            _storageResolver = storageResolver;
            _logger = logger;
        }

        [HttpPost("telemetry")]
        public async Task<IActionResult> ReceiveHeartbeat([FromBody] AgentTelemetryReport report)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return BadRequest("Invalid payload.");
            }

            if (!ModelState.IsValid)
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));

                return BadRequest(errors);
            }

            string requestHost = Request.Host.Host;
            var response = await _telemetryState.ProcessHeartbeatAsync(report, requestHost);
            _ = _broadcastService.BroadcastAgentUpdateAsync(report);

            return Ok(response);
        }

        [HttpPost("upload-buffer")]
        [Consumes("multipart/form-data")]
        [RequestSizeLimit(BufferLimits.MaxRequestSizeBytes)]
        public async Task<IActionResult> UploadBuffer([FromForm] UploadBufferRequest request)
        {
            if (request == null || request.File == null || request.File.Length == 0)
            {
                return BadRequest("File payload is empty.");
            }

            // אכיפת הגודל נטו מול הקבוע
            if (request.File.Length > BufferLimits.MaxFileSizeBytes)
            {
                _logger.LogWarning("[SYNC INGEST] Rejected file '{File}' from host '{Host}': Size {SizeMb}MB exceeds {LimitMb}MB limit.",
                    request.File.FileName, request.Hostname,
                    Math.Round(request.File.Length / (1024.0 * 1024.0), 2),
                    BufferLimits.MaxBufferFileSizeMb);

                return BadRequest($"File size exceeds the maximum allowed limit of {BufferLimits.MaxBufferFileSizeMb}MB.");
            }

            if (string.IsNullOrWhiteSpace(request.Hostname))
            {
                return BadRequest("Hostname parameter is required.");
            }

            string hostname = request.Hostname;
            IFormFile file = request.File;
            string safeFileName = Path.GetFileName(file.FileName);

            // 1. איתור חותמת ה-UTC משם הקובץ של הסוכן (לדוגמה: STATION1_2026-09-08_06-02-49-097824Z.mp4)
            var match = Regex.Match(safeFileName, @"(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}-\d{6})Z", RegexOptions.IgnoreCase);
            if (!match.Success)
            {
                _logger.LogWarning("[SYNC INGEST] Received buffer file '{File}' from host '{Host}' without valid UTC signature.", safeFileName, hostname);
                return BadRequest("Invalid file name format. Expected UTC timestamp signature ('..._YYYY-MM-DD_HH-mm-ss-ffffffZ.ext').");
            }

            string utcString = match.Groups[1].Value;
            if (!DateTime.TryParseExact(utcString, "yyyy-MM-dd_HH-mm-ss-ffffff",
                CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out DateTime chunkUtcTime))
            {
                return BadRequest("Failed to parse file UTC timestamp.");
            }

            // 2. המרה מ-UTC לזמן המקומי של השרת (תואם לשעון שבו MediaMTX מייצר שמות קבצים חיים)
            DateTime serverLocalTime = TimeZoneInfo.ConvertTimeFromUtc(chunkUtcTime, TimeZoneInfo.Local);

            // 3. יצירת שם קובץ תקני בפורמט MediaMTX (שעון שרת מקומי, ללא Z מטעה)
            string extension = Path.GetExtension(safeFileName);
            string finalFileName = $"{serverLocalTime:yyyy-MM-dd_HH-mm-ss-ffffff}{extension}";

            try
            {
                string storageRoot = await _storageResolver.ResolveActiveRootAsync(_configMonitor.CurrentValue.Storage, _logger);
                string stationDirectory = Path.Combine(storageRoot, hostname);

                if (!Directory.Exists(stationDirectory))
                {
                    Directory.CreateDirectory(stationDirectory);
                }

                string destinationPath = Path.Combine(stationDirectory, finalFileName);

                // 4. כתיבת הקובץ לתיקיית העמדה
                await using (var stream = new FileStream(destinationPath, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    await file.CopyToAsync(stream);
                }

                _logger.LogInformation("[SYNC INGEST] Synced offline chunk from '{Host}': '{Original}' -> '{Normalized}' (Server Local: {Time})",
                    hostname, safeFileName, finalFileName, serverLocalTime);

                return Ok(new { success = true, normalizedFile = finalFileName });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[SYNC INGEST] Failed to write synced chunk for host '{Host}' to disk: {Message}", hostname, ex.Message);
                return StatusCode(500, "Internal error writing recording file to storage.");
            }
        }

        [HttpPost("tuning/{hostname}")]
        public async Task<IActionResult> UpdateStationTuning(string hostname, [FromBody] AgentTuningRequest request)
        {
            if (string.IsNullOrWhiteSpace(hostname) || request == null)
            {
                return BadRequest("Invalid tuning request.");
            }

            var allOverrides = await _overridesService.GetAllAsync();
            var stationConfig = allOverrides.TryGetValue(hostname, out var existing)
                ? existing
                : new StationOverride();

            // מינימום 10 FPS, מקסימום 60 FPS
            if (request.Fps.HasValue && request.Fps.Value >= 10 && request.Fps.Value <= 60)
            {
                stationConfig.TargetFps = request.Fps.Value;
            }

            // מינימום 1000 Kbps
            if (request.BitrateKbps.HasValue && request.BitrateKbps.Value >= 1000)
            {
                stationConfig.VideoBitrate = $"{request.BitrateKbps.Value}k";
            }
            else if (!string.IsNullOrWhiteSpace(request.Bitrate))
            {
                stationConfig.VideoBitrate = request.Bitrate.Trim();
            }

            await _overridesService.SetOverrideAsync(hostname, stationConfig);

            return Ok(new
            {
                Hostname = hostname,
                TargetFps = stationConfig.TargetFps,
                VideoBitrate = stationConfig.VideoBitrate,
                Message = "Tuning saved. Policy updated for next heartbeat.",
                TimestampUtc = DateTime.UtcNow
            });
        }

        [HttpPost("command/{hostname}")]
        public IActionResult EnforceStreamingPolicy(string hostname, [FromQuery] bool enable)
        {
            _telemetryState.SetAgentStreamState(hostname, enable);
            return Ok(new { Hostname = hostname, StreamingRequested = enable });
        }

        [HttpGet("config/{hostname}")]
        public async Task<IActionResult> GetAgentConfig(string hostname)
        {
            var policy = await _telemetryState.GetAgentPolicyAsync(hostname, Request.Host.Host);
            return Ok(policy);
        }

        [HttpPost("fleet-streaming-policy")]
        public IActionResult EnforceFleetWideStreamingPolicy(
            [FromBody] FleetStreamingPolicyRequest? request,
            [FromQuery] bool? enable)
        {
            bool targetEnable = request?.Enable ?? enable ?? false;
            var allAgents = _telemetryState.GetAllAgents();

            var activeAgents = allAgents
                .Where(agent => (DateTime.UtcNow - agent.Timestamp).TotalSeconds <= 15)
                .ToList();

            if (request?.Hostnames != null && request.Hostnames.Any())
            {
                var filterSet = new HashSet<string>(request.Hostnames, StringComparer.OrdinalIgnoreCase);
                activeAgents = activeAgents.Where(agent => filterSet.Contains(agent.Hostname)).ToList();
            }

            foreach (var agent in activeAgents)
            {
                _telemetryState.SetAgentStreamState(agent.Hostname, targetEnable);
            }

            return Ok(new
            {
                Action = targetEnable ? "START_POLICY" : "STOP_POLICY",
                IsFiltered = request?.Hostnames != null && request.Hostnames.Any(),
                TargetStationCount = activeAgents.Count,
                TargetHostnames = activeAgents.Select(a => a.Hostname).ToList(),
                TimestampUtc = DateTime.UtcNow
            });
        }
    }
}