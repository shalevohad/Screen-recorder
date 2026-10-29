namespace ITB_SCREEN_RECORDER.Server.Controllers;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Security;

[ApiController]
[Route("api/v1/catalog")]
public class CatalogMaintenanceController : ControllerBase
{
    private readonly ICatalogMaintenanceService _maintenanceService;

    public CatalogMaintenanceController(ICatalogMaintenanceService maintenanceService)
    {
        _maintenanceService = maintenanceService;
    }

    /// <summary>
    /// Manually triggers background disk scanning and indexing of missing recording chunks.
    /// </summary>
    /// <param name="forceFullRecheck">If true, re-verifies already indexed chunks against physical storage.</param>
    /// <returns>202 Accepted with the current background maintenance job state.</returns>
    [HttpPost("reindex")]
    [AuthorizePermission(PermissionKeys.SettingsMaintenance)]
    public async Task<IActionResult> TriggerReindex([FromQuery] bool forceFullRecheck = false)
    {
        var status = await _maintenanceService.TriggerReindexAsync(forceFullRecheck);
        return Accepted(status);
    }

    /// <summary>
    /// Manually triggers full database integrity check, index repair, actual video duration synchronization, and orphaned record cleanup.
    /// </summary>
    /// <returns>202 Accepted with the initiated repair job state.</returns>
    [HttpPost("repair")]
    [AuthorizePermission(PermissionKeys.SettingsMaintenance)]
    public async Task<IActionResult> TriggerRepair()
    {
        var status = await _maintenanceService.TriggerRepairCatalogAsync();
        return Accepted(status);
    }

    /// <summary>
    /// Retrieves the current progress and status of background indexing or repair jobs for UI polling (e.g., GlobalJobIndicator).
    /// </summary>
    /// <returns>200 OK with the active background job state.</returns>
    [HttpGet("reindex/status")]
    [AuthorizePermission(PermissionKeys.StationsView)]
    public IActionResult GetReindexStatus()
    {
        var status = _maintenanceService.GetCurrentJobState();
        return Ok(status);
    }

    /// <summary>
    /// Retrieves database health metrics, chunk counts, physical database file size, and active job status for the Settings Maintenance tab.
    /// </summary>
    /// <returns>200 OK with database catalog statistics.</returns>
    [HttpGet("stats")]
    [AuthorizePermission(PermissionKeys.SettingsView)]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _maintenanceService.GetCatalogStatsAsync();
        return Ok(stats);
    }
}