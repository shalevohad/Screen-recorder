// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedBookmarksController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers
{
    [ApiController]
    [Route("api/v1/extractor-advanced/bookmarks")]
    public class ExtractorAdvancedBookmarksController : ControllerBase
    {
        private readonly ILogger<ExtractorAdvancedBookmarksController> _logger;
        private static readonly string BookmarksFilePath = Path.Combine(AppContext.BaseDirectory, "extractor_bookmarks.json");

        public ExtractorAdvancedBookmarksController(ILogger<ExtractorAdvancedBookmarksController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetBookmarks()
        {
            try
            {
                if (!System.IO.File.Exists(BookmarksFilePath))
                    return Ok(new List<InvestigationBookmarkDto>());

                var json = System.IO.File.ReadAllText(BookmarksFilePath);
                var bookmarks = JsonSerializer.Deserialize<List<InvestigationBookmarkDto>>(json) ?? new();
                return Ok(bookmarks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Bookmarks] Failed to load bookmarks.");
                return StatusCode(500, "Failed to load bookmarks.");
            }
        }

        [HttpPost]
        public IActionResult SaveBookmark([FromBody] InvestigationBookmarkDto newBookmark)
        {
            try
            {
                var bookmarks = new List<InvestigationBookmarkDto>();
                if (System.IO.File.Exists(BookmarksFilePath))
                {
                    var existingJson = System.IO.File.ReadAllText(BookmarksFilePath);
                    bookmarks = JsonSerializer.Deserialize<List<InvestigationBookmarkDto>>(existingJson) ?? new();
                }

                newBookmark.Id = Guid.NewGuid().ToString();
                newBookmark.CreatedAt = DateTime.UtcNow;
                bookmarks.Insert(0, newBookmark);

                System.IO.File.WriteAllText(BookmarksFilePath, JsonSerializer.Serialize(bookmarks, new JsonSerializerOptions { WriteIndented = true }));
                _logger.LogInformation("[API:Bookmarks] Bookmark saved: {Title}", newBookmark.Title);

                return Ok(new { success = true, bookmark = newBookmark });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Bookmarks] Failed to save bookmark.");
                return StatusCode(500, "Failed to save bookmark.");
            }
        }

        public class InvestigationBookmarkDto
        {
            public string Id { get; set; } = string.Empty;
            public string Title { get; set; } = string.Empty;
            public string StartTime { get; set; } = string.Empty;
            public string EndTime { get; set; } = string.Empty;
            public long PlayheadMs { get; set; }
            public long InPointMs { get; set; }
            public long OutPointMs { get; set; }
            public List<string> StationIds { get; set; } = new();
            public DateTime CreatedAt { get; set; }
        }
    }
}