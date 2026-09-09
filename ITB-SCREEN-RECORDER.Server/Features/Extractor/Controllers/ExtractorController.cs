using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Server.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Server.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Server.Features.Extractor.Controllers
{
    [ApiController]
    [Route("api/v1/extractor")]
    public class ExtractorController : ControllerBase
    {
        private readonly IExtractorService _extractorService;
        private readonly IStorageScannerService _storageScanner;
        private readonly ILogger<ExtractorController> _logger;

        public ExtractorController(
            IExtractorService extractorService,
            IStorageScannerService storageScanner,
            ILogger<ExtractorController> logger)
        {
            _extractorService = extractorService;
            _storageScanner = storageScanner;
            _logger = logger;
        }

        [HttpGet("recorded-hosts")]
        public async Task<IActionResult> GetRecordedHosts([FromQuery] DateTime startUtc, [FromQuery] DateTime endUtc)
        {
            var hosts = await _storageScanner.GetAvailableHostsAsync(startUtc, endUtc);
            return Ok(hosts);
        }

        [HttpPost("preview")]
        public async Task<IActionResult> GetExtractionPreview([FromBody] ExtractionRequestDto request)
        {
            if (request.StartTimeUtc >= request.EndTimeUtc)
            {
                return BadRequest(new { error = "StartTimeUtc must be earlier than EndTimeUtc." });
            }

            var preview = await _extractorService.GetPreviewAsync(request);
            return Ok(preview);
        }

        [HttpPost("export")]
        [Produces("application/x-tar")]
        public async Task ExportArchive([FromBody] ExtractionRequestDto request)
        {
            if (request.StartTimeUtc >= request.EndTimeUtc)
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                await Response.WriteAsJsonAsync(new { error = "StartTimeUtc must be earlier than EndTimeUtc." });
                return;
            }

            if (request.Hostnames == null || request.Hostnames.Count == 0)
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                await Response.WriteAsJsonAsync(new { error = "At least one hostname must be specified." });
                return;
            }

            string archiveFileName = $"Investigation_{request.StartTimeUtc:yyyyMMdd_HHmm}_to_{request.EndTimeUtc:yyyyMMdd_HHmm}.tar";

            Response.ContentType = "application/x-tar";
            Response.Headers.Append("Content-Disposition", $"attachment; filename=\"{archiveFileName}\"");
            Response.Headers.Append("X-Content-Type-Options", "nosniff");

            try
            {
                await _extractorService.StreamTarArchiveAsync(request, Response.Body, HttpContext.RequestAborted);
                await Response.Body.FlushAsync(HttpContext.RequestAborted);
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Archive export stream canceled by client.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during TAR streaming for archive {FileName}", archiveFileName);
                if (!Response.HasStarted)
                {
                    Response.StatusCode = StatusCodes.Status500InternalServerError;
                }
            }
        }
    }
}