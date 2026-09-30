namespace ITB_SCREEN_RECORDER.Server.Controllers;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Server.Services;

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
    /// הפעלת סריקת דיסק ואינדוקס חוסרים ברקע (Manual Trigger)
    /// </summary>
    [HttpPost("reindex")]
    public async Task<IActionResult> TriggerReindex([FromQuery] bool forceFullRecheck = false)
    {
        var status = await _maintenanceService.TriggerReindexAsync(forceFullRecheck);
        return Accepted(status);
    }

    /// <summary>
    /// קבלת סטטוס תהליך האינדוקס הנוכחי (Polling עבור הווידג'ט הצף GlobalJobIndicator ולשונית Maintenance)
    /// </summary>
    [HttpGet("reindex/status")]
    public IActionResult GetReindexStatus()
    {
        var status = _maintenanceService.GetCurrentJobState();
        return Ok(status);
    }

    /// <summary>
    /// שליפת סטטיסטיקות אודות מסד הנתונים system_catalog.db והמשימה הפעילה עבור מסך ה-Settings
    /// </summary>
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _maintenanceService.GetCatalogStatsAsync();
        return Ok(stats);
    }
}