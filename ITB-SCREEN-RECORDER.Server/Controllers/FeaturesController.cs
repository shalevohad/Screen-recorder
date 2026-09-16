using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/features")]
    public class FeaturesController : ControllerBase
    {
        private readonly IEnumerable<IFeatureModule> _features;

        public FeaturesController(IEnumerable<IFeatureModule> features)
        {
            _features = features;
        }

        [HttpGet("active")]
        public IActionResult GetActiveFeatures()
        {
            // שימוש ב-StringComparer.OrdinalIgnoreCase כדי שהזיהוי יעבוד זהה בלינוקס ובווינדוס
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

            if (supersededIds.Any())
            {
                Logger.AlwaysInfo($"[API] Plugin Override Chain resolved. Suppressed legacy features: {string.Join(", ", supersededIds)}");
            }

            return Ok(activeFeatures);
        }
    }
}