using System;
using System.IO;
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
        private readonly IStorageScannerService _storageScanner;
        private readonly IExtractorService _extractorService;
        private readonly ILogger<ExtractorController> _logger;

        public ExtractorController(
            IStorageScannerService storageScanner,
            IExtractorService extractorService,
            ILogger<ExtractorController> logger)
        {
            _storageScanner = storageScanner;
            _extractorService = extractorService;
            _logger = logger;
        }

        /// <summary>
        /// שליפת רשימת שמות התחנות שקיימות עבורן הקלטות בטווח המבוקש
        /// </summary>
        [HttpGet("recorded-hosts")]
        public async Task<IActionResult> GetRecordedHosts([FromQuery] DateTime startUtc, [FromQuery] DateTime endUtc)
        {
            if (startUtc >= endUtc)
            {
                return BadRequest("startUtc must be earlier than endUtc.");
            }

            var hosts = await _storageScanner.GetRecordedHostnamesAsync(startUtc, endUtc);
            return Ok(hosts);
        }

        /// <summary>
        /// הפקת סיכום מקדים: מספר מקטעים, נפח מוערך וזיהוי פערי זמן (Gaps)
        /// </summary>
        [HttpPost("preview")]
        public async Task<IActionResult> GetExtractionPreview([FromBody] ExtractionRequestDto request)
        {
            if (request.StartTimeUtc >= request.EndTimeUtc)
            {
                return BadRequest("StartTimeUtc must be earlier than EndTimeUtc.");
            }

            if (request.Hostnames == null || request.Hostnames.Count == 0)
            {
                return BadRequest("At least one hostname must be specified.");
            }

            var preview = await _storageScanner.BuildPreviewAsync(request.Hostnames, request.StartTimeUtc, request.EndTimeUtc);
            return Ok(preview);
        }

        [HttpPost("export")]
        [Produces("application/octet-stream")]
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
            // 💡 Transfer-Encoding הוסר – Kestrel יטפל בהזרמה אוטומטית בצורה תקינה

            try
            {
                await _extractorService.StreamTarArchiveAsync(request, Response.Body, HttpContext.RequestAborted);
                await Response.Body.FlushAsync(HttpContext.RequestAborted);
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Export stream cancelled by client.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while streaming TAR archive");
                if (!Response.HasStarted)
                {
                    Response.StatusCode = StatusCodes.Status500InternalServerError;
                }
            }
        }
    }
}