using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Server.Services.Security;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/features")]
    [AuthorizePermission(PermissionKeys.StationsView)]
    public class FeaturesController : ControllerBase
    {
        private readonly IEnumerable<IFeatureModule> _features;
        // Static flag ensuring plugin override log message is emitted once per server lifecycle
        private static bool _hasLoggedOverride = false;

        public FeaturesController(IEnumerable<IFeatureModule> features)
        {
            _features = features;
        }

        /// <summary>
        /// Retrieves all currently active and enabled feature modules, resolving plugin override chains (e.g. ExtractorAdvanced superseding Extractor).
        /// </summary>
        /// <returns>200 OK with list of active feature UI descriptor objects.</returns>
        [HttpGet("active")]
        public IActionResult GetActiveFeatures()
        {
            // Case-insensitive comparison ensures consistent cross-platform behavior between Windows and Linux
            var supersededIds = _features
                .SelectMany(f => f.SupersedesIds)
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            var activeFeatures = _features
                .Where(f => f.IsEnabled)
                .Where(f => !supersededIds.Contains(f.Id))
                .Select(f => new
                {
                    f.Id,
                    f.Title,
                    f.IconName,
                    f.ScriptUrl,
                    f.DefaultWidth,
                    f.DefaultHeight,
                    f.MinWidth,
                    f.MinHeight,
                    Supersedes = f.SupersedesIds
                }).ToList();

            if (supersededIds.Any() && !_hasLoggedOverride)
            {
                Logger.AlwaysInfo($"[API] Plugin Override Chain resolved. Suppressed legacy features: {string.Join(", ", supersededIds)}");
                _hasLoggedOverride = true; // Lock logging to prevent repetitive logs on periodic polling
            }

            return Ok(activeFeatures);
        }
    }
}