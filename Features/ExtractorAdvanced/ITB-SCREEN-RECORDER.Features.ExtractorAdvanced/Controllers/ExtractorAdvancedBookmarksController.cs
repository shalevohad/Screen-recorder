// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedBookmarksController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers
{
    [ApiController]
    [Route("api/v1/extractor-advanced/bookmarks")]
    public class ExtractorAdvancedBookmarksController : ControllerBase
    {
        private readonly IBookmarkRepository _bookmarkRepository;
        private readonly ILogger<ExtractorAdvancedBookmarksController> _logger;

        public ExtractorAdvancedBookmarksController(
            IBookmarkRepository bookmarkRepository,
            ILogger<ExtractorAdvancedBookmarksController> logger)
        {
            _bookmarkRepository = bookmarkRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookmarks()
        {
            try
            {
                var dbBookmarks = await _bookmarkRepository.GetAllAsync();
                var dtoList = new List<InvestigationBookmarkDto>();
                var seenIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

                foreach (var b in dbBookmarks)
                {
                    string originalId = b.Id.Contains('#') ? b.Id.Split('#')[0] : b.Id;
                    if (!seenIds.Add(originalId)) continue;

                    // שחזור ה-DTO המקורי מתוך שדה Tags
                    if (!string.IsNullOrWhiteSpace(b.Tags))
                    {
                        try
                        {
                            var dto = JsonSerializer.Deserialize<InvestigationBookmarkDto>(b.Tags);
                            if (dto != null)
                            {
                                dtoList.Add(dto);
                                continue;
                            }
                        }
                        catch { }
                    }

                    // שחזור ברירת מחדל מנתוני השורה
                    dtoList.Add(new InvestigationBookmarkDto
                    {
                        Id = originalId,
                        Title = b.Title,
                        StartTime = b.StartUtc.ToString("o"),
                        EndTime = b.EndUtc.ToString("o"),
                        InPointMs = new DateTimeOffset(b.StartUtc).ToUnixTimeMilliseconds(),
                        OutPointMs = new DateTimeOffset(b.EndUtc).ToUnixTimeMilliseconds(),
                        PlayheadMs = new DateTimeOffset(b.StartUtc).ToUnixTimeMilliseconds(),
                        StationIds = new List<string> { b.StationId },
                        CreatedAt = b.CreatedAtUtc
                    });
                }

                _logger.LogInformation("[API:Bookmarks] Returning {Count} bookmarks from advance_extractor.db", dtoList.Count);
                return Ok(dtoList.OrderByDescending(b => b.CreatedAt).ToList());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Bookmarks] Failed to load bookmarks from SQLite database.");
                return StatusCode(500, "Failed to load bookmarks.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveBookmark([FromBody] InvestigationBookmarkDto newBookmark)
        {
            if (newBookmark == null)
            {
                return BadRequest("Invalid bookmark data.");
            }

            try
            {
                if (string.IsNullOrWhiteSpace(newBookmark.Id))
                {
                    newBookmark.Id = Guid.NewGuid().ToString("N");
                }

                if (newBookmark.CreatedAt == default)
                {
                    newBookmark.CreatedAt = DateTime.UtcNow;
                }

                DateTime startUtc;
                DateTime endUtc;

                if (newBookmark.InPointMs > 0 && newBookmark.OutPointMs > newBookmark.InPointMs)
                {
                    startUtc = DateTimeOffset.FromUnixTimeMilliseconds(newBookmark.InPointMs).UtcDateTime;
                    endUtc = DateTimeOffset.FromUnixTimeMilliseconds(newBookmark.OutPointMs).UtcDateTime;
                }
                else if (DateTime.TryParse(newBookmark.StartTime, out var s) &&
                         DateTime.TryParse(newBookmark.EndTime, out var e) && e > s)
                {
                    startUtc = s.ToUniversalTime();
                    endUtc = e.ToUniversalTime();
                }
                else
                {
                    startUtc = DateTime.UtcNow.AddMinutes(-5);
                    endUtc = DateTime.UtcNow;
                }

                string jsonPayload = JsonSerializer.Serialize(newBookmark);

                // רישום רשומת הגנה במסד עבור כל תחנה שנכללה בסימנייה
                if (newBookmark.StationIds != null && newBookmark.StationIds.Count > 0)
                {
                    foreach (var stationId in newBookmark.StationIds)
                    {
                        var record = new BookmarkInfo
                        {
                            Id = stationId == newBookmark.StationIds[0] ? newBookmark.Id : $"{newBookmark.Id}#{stationId}",
                            StationId = stationId,
                            Title = newBookmark.Title,
                            StartUtc = startUtc,
                            EndUtc = endUtc,
                            Tags = jsonPayload,
                            CreatedAtUtc = newBookmark.CreatedAt
                        };

                        await _bookmarkRepository.UpsertAsync(record);
                    }
                }
                else
                {
                    var record = new BookmarkInfo
                    {
                        Id = newBookmark.Id,
                        StationId = "ALL",
                        Title = newBookmark.Title,
                        StartUtc = startUtc,
                        EndUtc = endUtc,
                        Tags = jsonPayload,
                        CreatedAtUtc = newBookmark.CreatedAt
                    };

                    await _bookmarkRepository.UpsertAsync(record);
                }

                _logger.LogInformation("[API:Bookmarks] Persisted bookmark '{Title}' ({Id}) to advance_extractor.db with Retention Shield active.",
                    newBookmark.Title, newBookmark.Id);

                return Ok(new { success = true, bookmark = newBookmark });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Bookmarks] Failed to save bookmark to database.");
                return StatusCode(500, "Failed to save bookmark.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookmark([FromRoute] string id)
        {
            if (string.IsNullOrWhiteSpace(id)) return BadRequest();

            try
            {
                var all = await _bookmarkRepository.GetAllAsync();
                var matching = all.Where(b => b.Id == id || b.Id.StartsWith($"{id}#")).ToList();

                if (matching.Count == 0)
                {
                    return NotFound(new { error = "Bookmark not found." });
                }

                foreach (var b in matching)
                {
                    await _bookmarkRepository.DeleteAsync(b.Id);
                }

                _logger.LogInformation("[API:Bookmarks] Deleted bookmark {Id} and associated retention shields.", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Bookmarks] Failed to delete bookmark {Id}", id);
                return StatusCode(500, "Failed to delete bookmark.");
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