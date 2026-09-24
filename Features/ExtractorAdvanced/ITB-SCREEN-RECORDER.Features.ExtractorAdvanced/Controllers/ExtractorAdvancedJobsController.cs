// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedJobsController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers
{
    [ApiController]
    [Route("api/v1/extractor-advanced/jobs")]
    public class ExtractorAdvancedJobsController : ControllerBase
    {
        private readonly IAdvanceJobManager _advanceJobManager;
        private readonly IExportJobManager _jobManager;
        private readonly ILogger<ExtractorAdvancedJobsController> _logger;

        public ExtractorAdvancedJobsController(
            IAdvanceJobManager advanceJobManager,
            IExportJobManager jobManager,
            ILogger<ExtractorAdvancedJobsController> logger)
        {
            _advanceJobManager = advanceJobManager;
            _jobManager = jobManager;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult StartAdvanceExportJob([FromBody] AdvanceCutRequestDto request)
        {
            if (request.StationIds == null || request.StationIds.Count == 0 || request.OutEpochMs <= request.InEpochMs)
            {
                return BadRequest(new { error = "Invalid station selection or In/Out time parameters." });
            }

            var job = _advanceJobManager.EnqueueAdvanceCutJob(request);
            return Accepted(job);
        }

        /// <summary>
        /// 💡 הערכת גודל ופערים מקדימה בזמן עריכה בציר הזמן (TimelineBoard)
        /// תומך בפנייה ישירה מ-/api/v1/extractor-advanced/estimate או דרך /jobs/estimate
        /// </summary>
        [HttpPost("estimate")]
        [HttpPost("/api/v1/extractor-advanced/estimate")]
        public async Task<IActionResult> EstimateJob([FromBody] AdvanceCutRequestDto request)
        {
            if (request.StationIds == null || request.StationIds.Count == 0 || request.OutEpochMs <= request.InEpochMs)
            {
                return BadRequest(new { error = "Invalid station selection or In/Out time parameters." });
            }

            try
            {
                var estimate = await _advanceJobManager.EstimateCutJobAsync(request);
                return Ok(estimate);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:AdvancedJobs] Error calculating cut estimate.");
                return StatusCode(500, "Error calculating cut estimate.");
            }
        }

        [HttpGet]
        public IActionResult GetJobs()
        {
            try
            {
                var jobs = _jobManager.GetAllJobs();
                return Ok(jobs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:AdvancedJobs] Failed fetching jobs list.");
                return Ok(new List<ExportJobInfo>());
            }
        }

        [HttpGet("{jobId}")]
        public IActionResult GetJobById([FromRoute] string jobId)
        {
            var job = _jobManager.GetJob(jobId);
            if (job == null) return NotFound(new { error = $"Job {jobId} not found." });
            return Ok(job);
        }

        [HttpPost("{jobId}/bookmark")]
        public IActionResult ToggleBookmark([FromRoute] string jobId)
        {
            bool success = _jobManager.ToggleBookmark(jobId);
            if (!success) return NotFound();

            var job = _jobManager.GetJob(jobId);
            return Ok(new { jobId, isBookmarked = job?.IsBookmarked, downloadCount = job?.DownloadCount });
        }

        [HttpDelete("{jobId}")]
        public IActionResult DismissJob([FromRoute] string jobId)
        {
            _jobManager.DismissJob(jobId);
            return NoContent();
        }

        [HttpGet("{jobId}/download")]
        public IActionResult DownloadJob([FromRoute] string jobId)
        {
            var job = _jobManager.GetJob(jobId);
            if (job == null || !job.IsCompleted || string.IsNullOrWhiteSpace(job.OutputFilePath) || !System.IO.File.Exists(job.OutputFilePath))
            {
                return NotFound(new { error = "Export archive not ready or expired." });
            }

            _jobManager.RegisterDownload(jobId);

            var fileName = job.FileName ?? Path.GetFileName(job.OutputFilePath);
            var contentType = fileName.EndsWith(".tar", StringComparison.OrdinalIgnoreCase)
                ? "application/x-tar"
                : "video/mp4";

            var stream = new FileStream(job.OutputFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            return File(stream, contentType, fileName, enableRangeProcessing: true);
        }
    }
}