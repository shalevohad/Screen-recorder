using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Core.Plugins;

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
            var activeFeatures = _features
                .Where(f => f.IsEnabled)
                .Select(f => new
                {
                    f.Id,
                    f.Title,
                    f.IconName,
                    f.ScriptUrl,
                    f.DefaultWidth,
                    f.DefaultHeight,
                    f.MinWidth,
                    f.MinHeight
                });

            return Ok(activeFeatures);
        }
    }
}