using System;
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Server.Models;
using ITB_SCREEN_RECORDER.Server.Services;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/settings")]
    public class SettingsController : ControllerBase
    {
        private readonly SettingsFileService _settingsFile;

        public SettingsController(SettingsFileService settingsFile)
        {
            _settingsFile = settingsFile;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _settingsFile.ReadAsync());
            }
            catch (InvalidOperationException ex)
            {
                return Problem(ex.Message, statusCode: 500);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SystemConfigDto dto)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            try
            {
                await _settingsFile.WriteAsync(dto);
            }
            catch (InvalidOperationException ex)
            {
                return Problem(ex.Message, statusCode: 500);
            }

            return Ok(await _settingsFile.ReadAsync());
        }
    }
}
