// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedDraftsController.cs
// ==========================================
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers
{
    [ApiController]
    [Route("api/v1/extractor-advanced/drafts")]
    public class ExtractorAdvancedDraftsController : ControllerBase
    {
        private readonly IEditingDraftRepository _draftRepository;
        private readonly ILogger<ExtractorAdvancedDraftsController> _logger;

        public ExtractorAdvancedDraftsController(
            IEditingDraftRepository draftRepository,
            ILogger<ExtractorAdvancedDraftsController> logger)
        {
            _draftRepository = draftRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDrafts()
        {
            try
            {
                var drafts = await _draftRepository.GetAllAsync();
                return Ok(drafts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Drafts] Failed fetching drafts.");
                return StatusCode(500, "Failed to retrieve editing drafts.");
            }
        }

        [HttpGet("{draftId}")]
        public async Task<IActionResult> GetDraftById([FromRoute] string draftId)
        {
            try
            {
                var draft = await _draftRepository.GetByIdAsync(draftId);
                if (draft == null) return NotFound(new { error = $"Draft '{draftId}' not found." });
                return Ok(draft);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Drafts] Failed fetching draft {DraftId}", draftId);
                return StatusCode(500, "Failed to retrieve draft.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveDraft([FromBody] EditingDraftInfo draft)
        {
            if (draft == null || string.IsNullOrWhiteSpace(draft.Title))
            {
                return BadRequest(new { error = "Draft payload and Title are required." });
            }

            try
            {
                if (string.IsNullOrWhiteSpace(draft.DraftId))
                {
                    draft.DraftId = Guid.NewGuid().ToString("N");
                }

                await _draftRepository.UpsertAsync(draft);
                _logger.LogInformation("[API:Drafts] Saved timeline draft '{Title}' ({DraftId}) to advance_extractor.db", draft.Title, draft.DraftId);
                return Ok(draft);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Drafts] Failed saving draft '{Title}'", draft.Title);
                return StatusCode(500, "Failed to persist draft.");
            }
        }

        [HttpDelete("{draftId}")]
        public async Task<IActionResult> DeleteDraft([FromRoute] string draftId)
        {
            try
            {
                bool deleted = await _draftRepository.DeleteAsync(draftId);
                if (!deleted) return NotFound(new { error = $"Draft '{draftId}' not found." });
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Drafts] Failed deleting draft {DraftId}", draftId);
                return StatusCode(500, "Failed to delete draft.");
            }
        }
    }
}