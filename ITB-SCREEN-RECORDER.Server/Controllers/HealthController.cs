// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Controllers/HealthController.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Server.Controllers;

using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Core.Configuration;

[ApiController]
public class HealthController : ControllerBase
{
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;

    public HealthController(IOptionsMonitor<SystemConfig> configMonitor)
    {
        _configMonitor = configMonitor;
    }

    [HttpGet("api/v1/health")]
    [HttpGet("health")]
    [AllowAnonymous]
    public IActionResult GetHealth()
    {
        var disc = _configMonitor.CurrentValue.Discovery ?? new DiscoverySettings();
        return Ok(new
        {
            Status = "Healthy",
            Role = disc.Role,
            Priority = disc.Priority,
            ServerTimeUtc = DateTime.UtcNow,
            MachineName = Environment.MachineName
        });
    }
}
