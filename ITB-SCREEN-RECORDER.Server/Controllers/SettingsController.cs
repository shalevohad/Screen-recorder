using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Server.Models;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/settings")]
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

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SystemConfig updatedConfig)
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

                    if (updatedConfig.Storage != null)
                    {
                        config.Storage.NetAppUncPath = updatedConfig.Storage.NetAppUncPath;
                        config.Storage.LocalFallbackPath = updatedConfig.Storage.LocalFallbackPath;
                        config.Storage.ChunkIntervalMinutes = updatedConfig.Storage.ChunkIntervalMinutes;
                        config.Storage.RetentionDays = updatedConfig.Storage.RetentionDays;
                        config.Storage.RecordFormat = updatedConfig.Storage.RecordFormat;
                    }

                    if (updatedConfig.MediaMtx != null)
                    {
                        config.MediaMtx.RtmpPort = updatedConfig.MediaMtx.RtmpPort;
                        config.MediaMtx.HlsPort = updatedConfig.MediaMtx.HlsPort;
                        config.MediaMtx.ApiPort = updatedConfig.MediaMtx.ApiPort;
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