// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Controllers/SettingsController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/settings")]
    [Route("api/settings")]
    [Route("api/system/config")]
    public class SettingsController : ControllerBase
    {
        private readonly ISystemConfigDbSyncService _syncService;
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;

        public SettingsController(
            ISystemConfigDbSyncService syncService,
            IOptionsMonitor<SystemConfig> configMonitor)
        {
            _syncService = syncService;
            _configMonitor = configMonitor;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_configMonitor.CurrentValue);
        }

        /// <summary>
        /// נקודת קצה ייעודית לשליפת מעברי השעון עבור ממשק המשתמש (Studio & Timeline)
        /// </summary>
        [HttpGet("dst-transitions")]
        public IActionResult GetDstTransitions()
        {
            var config = _configMonitor.CurrentValue;
            return Ok(new
            {
                timezone = config.DisplayTimezone,
                transitions = config.ManualDstTransitions ?? new List<DstTransitionRule>()
            });
        }

        [HttpPut]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] SystemConfig updatedConfig)
        {
            if (updatedConfig == null)
            {
                return BadRequest("Invalid configuration payload.");
            }

            try
            {
                await _syncService.UpdateSystemConfigAsync(config =>
                {
                    config.DefaultTargetFps = updatedConfig.DefaultTargetFps;
                    config.DefaultVideoBitrate = updatedConfig.DefaultVideoBitrate;
                    config.RecordingRetentionDays = updatedConfig.RecordingRetentionDays;
                    config.MaxStorageQuotaGb = updatedConfig.MaxStorageQuotaGb;
                    config.DashboardRefreshRateMs = updatedConfig.DashboardRefreshRateMs;

                    if (!string.IsNullOrWhiteSpace(updatedConfig.DisplayTimezone))
                    {
                        config.DisplayTimezone = updatedConfig.DisplayTimezone;
                    }

                    if (!string.IsNullOrWhiteSpace(updatedConfig.DisplayLocale))
                    {
                        config.DisplayLocale = updatedConfig.DisplayLocale;
                    }

                    // 💡 סנכרון רשימת מעברי השעון
                    if (updatedConfig.ManualDstTransitions != null)
                    {
                        config.ManualDstTransitions = new List<DstTransitionRule>(updatedConfig.ManualDstTransitions);
                    }

                    if (updatedConfig.Storage != null)
                    {
                        config.Storage ??= new StorageSettings();
                        config.Storage.NetAppUncPath = updatedConfig.Storage.NetAppUncPath;
                        config.Storage.LocalFallbackPath = updatedConfig.Storage.LocalFallbackPath;
                        config.Storage.ChunkIntervalMinutes = updatedConfig.Storage.ChunkIntervalMinutes;
                        config.Storage.RetentionDays = updatedConfig.Storage.RetentionDays;
                        config.Storage.RecordFormat = updatedConfig.Storage.RecordFormat;

                        if (!string.IsNullOrWhiteSpace(updatedConfig.Storage.ChunkEventLogPath))
                        {
                            config.Storage.ChunkEventLogPath = updatedConfig.Storage.ChunkEventLogPath;
                        }
                    }

                    if (updatedConfig.MediaMtx != null)
                    {
                        config.MediaMtx ??= new MediaMtxSettings();
                        config.MediaMtx.ExecutablePath = updatedConfig.MediaMtx.ExecutablePath;
                        config.MediaMtx.RtmpPort = updatedConfig.MediaMtx.RtmpPort;
                        config.MediaMtx.HlsPort = updatedConfig.MediaMtx.HlsPort;
                        config.MediaMtx.ApiPort = updatedConfig.MediaMtx.ApiPort;
                        config.MediaMtx.PlaybackPort = updatedConfig.MediaMtx.PlaybackPort;
                        config.MediaMtx.MetricsPort = updatedConfig.MediaMtx.MetricsPort;
                        config.MediaMtx.PprofPort = updatedConfig.MediaMtx.PprofPort;
                        config.MediaMtx.EnableMetrics = updatedConfig.MediaMtx.EnableMetrics;
                        config.MediaMtx.EnablePprof = updatedConfig.MediaMtx.EnablePprof;
                        config.MediaMtx.EnablePlayback = updatedConfig.MediaMtx.EnablePlayback;
                        config.MediaMtx.HlsAlwaysRemux = updatedConfig.MediaMtx.HlsAlwaysRemux;
                        config.MediaMtx.HlsVariant = updatedConfig.MediaMtx.HlsVariant;
                        config.MediaMtx.HlsSegmentDuration = updatedConfig.MediaMtx.HlsSegmentDuration;
                        config.MediaMtx.Timezone = updatedConfig.MediaMtx.Timezone;
                    }

                    if (updatedConfig.Dashboard != null)
                    {
                        config.Dashboard ??= new DashboardSettings();
                        config.Dashboard.SnapshotMinDelayMs = updatedConfig.Dashboard.SnapshotMinDelayMs;
                        config.Dashboard.SnapshotMaxDelayMs = updatedConfig.Dashboard.SnapshotMaxDelayMs;
                        config.Dashboard.SnapshotBufferMarginPx = updatedConfig.Dashboard.SnapshotBufferMarginPx;
                        config.Dashboard.MaxConcurrentLiveStreams = updatedConfig.Dashboard.MaxConcurrentLiveStreams;
                    }

                    if (updatedConfig.Security != null)
                    {
                        config.Security ??= new SecuritySettings();
                        config.Security.AllowedAdAdminGroup = updatedConfig.Security.AllowedAdAdminGroup;
                        config.Security.JwtSecretKey = updatedConfig.Security.JwtSecretKey;
                        config.Security.TokenExpirationHours = updatedConfig.Security.TokenExpirationHours;
                    }
                });

                return Ok(_configMonitor.CurrentValue);
            }
            catch (Exception ex)
            {
                return Problem($"Failed to synchronize configuration: {ex.Message}", statusCode: 500);
            }
        }
    }
}