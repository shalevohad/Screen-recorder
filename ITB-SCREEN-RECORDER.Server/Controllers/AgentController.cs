using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
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
        private readonly ICatalogRepository _catalogRepository;
        private readonly ILogger<AgentController> _logger;

        public AgentController(
            ITelemetryStateService telemetryState,
            TelemetryBroadcastService broadcastService,
            StationOverridesService overridesService,
            IOptionsMonitor<SystemConfig> configMonitor,
            StoragePathResolver storageResolver,
            ICatalogRepository catalogRepository,
            ILogger<AgentController> logger)
        {
            _telemetryState = telemetryState;
            _broadcastService = broadcastService;
            _overridesService = overridesService;
            _configMonitor = configMonitor;
            _storageResolver = storageResolver;
            _catalogRepository = catalogRepository;
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

            // 1. איתור חותמת זמן UTC
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

            DateTime serverLocalTime = TimeZoneInfo.ConvertTimeFromUtc(chunkUtcTime, TimeZoneInfo.Local);
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

                await using (var stream = new FileStream(destinationPath, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    await file.CopyToAsync(stream);
                }

                long fileSizeBytes = new FileInfo(destinationPath).Length;
                long startEpochMs = new DateTimeOffset(chunkUtcTime, TimeSpan.Zero).ToUnixTimeMilliseconds();
                int chunkMinutes = Math.Max(1, _configMonitor.CurrentValue.Storage.ChunkIntervalMinutes);
                long endEpochMs = startEpochMs + (chunkMinutes * 60 * 1000);

                // שליפת נתוני טלמטריה חיים או ברירת מחדל 0 המאותתת על צורך בדגימה
                var agent = _telemetryState.GetAllAgents()
                    .FirstOrDefault(a => string.Equals(a.Hostname, hostname, StringComparison.OrdinalIgnoreCase));

                int width = agent?.ScreenWidth > 0 ? agent.ScreenWidth : 0;
                int height = agent?.ScreenHeight > 0 ? agent.ScreenHeight : 0;
                int fps = agent?.ActualFps > 0 ? agent.ActualFps : (agent?.InternalCaptureFps > 0 ? agent.InternalCaptureFps : 0);
                bool hasAudio = agent?.HasAudio ?? false;

                await _catalogRepository.BulkUpsertChunksAsync(new[]
                {
                    new ChunkFinalizedEvent(
                        StationId: hostname,
                        FilePath: destinationPath,
                        StartEpochMs: startEpochMs,
                        EndEpochMs: endEpochMs,
                        FileSizeBytes: fileSizeBytes,
                        IsFinalized: true,
                        Width: width,
                        Height: height,
                        Fps: fps,
                        HasAudio: hasAudio
                    )
                });

                _logger.LogInformation("[SYNC INGEST] Synced & Indexed offline chunk from '{Host}': '{File}' (Size: {Size} bytes)",
                    hostname, finalFileName, fileSizeBytes);

                return Ok(new { success = true, normalizedFile = finalFileName });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[SYNC INGEST] Failed to write and index synced chunk for host '{Host}': {Message}", hostname, ex.Message);
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

            if (request.Fps.HasValue && request.Fps.Value >= 10 && request.Fps.Value <= 60)
            {
                stationConfig.TargetFps = request.Fps.Value;
            }

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
                Message = "Tuning saved to SQLite. Policy updated for next heartbeat.",
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