// ==========================================
// File: Features/Extractor/Controllers/ExtractorController.cs
// ==========================================
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Controllers
{
    [ApiController]
    [Route("api/v1/extractor")]
    public class ExtractorController : ControllerBase
    {
        protected readonly IStorageScannerService _storageScanner;
        protected readonly IExtractorService _extractorService;
        protected readonly IExportJobManager _jobManager;
        protected readonly ILogger<ExtractorController> _logger;

        public ExtractorController(
            IStorageScannerService storageScanner,
            IExtractorService extractorService,
            IExportJobManager jobManager,
            ILogger<ExtractorController> logger)
        {
            _storageScanner = storageScanner;
            _extractorService = extractorService;
            _jobManager = jobManager;
            _logger = logger;
        }

        [HttpGet("recorded-hosts")]
        public virtual async Task<IActionResult> GetRecordedHosts([FromQuery] DateTime startUtc, [FromQuery] DateTime endUtc)
        {
            var hosts = await _storageScanner.GetAvailableHostsAsync(startUtc, endUtc);
            return Ok(hosts);
        }

        [HttpPost("preview")]
        public virtual async Task<IActionResult> GetPreview([FromBody] ExtractionRequestDto request)
        {
            var preview = await _extractorService.GetPreviewAsync(request);
            return Ok(preview);
        }

        [HttpGet("jobs")]
        public virtual IActionResult GetJobs()
        {
            return Ok(_jobManager.GetAllJobs());
        }

        [HttpPost("jobs")]
        public virtual IActionResult CreateJob([FromBody] ExtractionRequestDto request)
        {
            if (request.StartTimeUtc >= request.EndTimeUtc || request.Hostnames == null || request.Hostnames.Count == 0)
            {
                return BadRequest(new { error = "Invalid time range or empty hostnames." });
            }

            var job = _jobManager.EnqueueExportJob(request);
            return Accepted(job);
        }

        [HttpGet("jobs/{jobId}/download")]
        public virtual IActionResult DownloadJob([FromRoute] string jobId)
        {
            var job = _jobManager.GetJob(jobId);
            if (job == null || !job.IsCompleted || string.IsNullOrWhiteSpace(job.OutputFilePath) || !System.IO.File.Exists(job.OutputFilePath))
            {
                return NotFound(new { error = "Export archive not ready or expired." });
            }

            _jobManager.RegisterDownload(jobId);

            var stream = new FileStream(job.OutputFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            return File(stream, "application/x-tar", job.FileName, enableRangeProcessing: true);
        }

        [HttpPost("jobs/{jobId}/bookmark")]
        public virtual IActionResult ToggleBookmark([FromRoute] string jobId)
        {
            bool success = _jobManager.ToggleBookmark(jobId);
            if (!success) return NotFound();

            var job = _jobManager.GetJob(jobId);
            return Ok(new { jobId, isBookmarked = job?.IsBookmarked, downloadCount = job?.DownloadCount });
        }

        [HttpDelete("jobs/{jobId}")]
        public virtual IActionResult DismissJob([FromRoute] string jobId)
        {
            _jobManager.DismissJob(jobId);
            return NoContent();
        }

        [HttpPost("export")]
        [Produces("application/x-tar")]
        public virtual async Task ExportArchive([FromBody] ExtractionRequestDto request)
        {
            if (request.StartTimeUtc >= request.EndTimeUtc || request.Hostnames == null || request.Hostnames.Count == 0)
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                await Response.WriteAsJsonAsync(new { error = "Invalid time range or hostnames." });
                return;
            }

            string archiveFileName = $"Export_{request.StartTimeUtc:yyyyMMdd_HHmm}_to_{request.EndTimeUtc:yyyyMMdd_HHmm}.tar";

            Response.ContentType = "application/x-tar";
            Response.Headers.Append("Content-Disposition", $"attachment; filename=\"{archiveFileName}\"");
            Response.Headers.Append("X-Content-Type-Options", "nosniff");

            try
            {
                await Response.Body.FlushAsync(HttpContext.RequestAborted);
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