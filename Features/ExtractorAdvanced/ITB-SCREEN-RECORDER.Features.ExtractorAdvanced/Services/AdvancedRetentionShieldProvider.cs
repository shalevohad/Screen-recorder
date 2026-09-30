// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedRetentionShieldProvider.cs
// ==========================================
using ITB_SCREEN_RECORDER.Core.Abstractions;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public sealed class AdvancedRetentionShieldProvider : IRetentionShieldProvider
    {
        private readonly IBookmarkRepository _bookmarkRepository;
        private readonly ILogger<AdvancedRetentionShieldProvider> _logger;

        public string ProviderName => "ExtractorAdvanced.BookmarkShield";

        public AdvancedRetentionShieldProvider(
            IBookmarkRepository bookmarkRepository,
            ILogger<AdvancedRetentionShieldProvider> logger)
        {
            _bookmarkRepository = bookmarkRepository;
            _logger = logger;
        }

        public async Task<bool> IsRangeShieldedAsync(string stationId, long startEpochMs, long endEpochMs)
        {
            if (string.IsNullOrWhiteSpace(stationId) || startEpochMs >= endEpochMs)
            {
                return false;
            }

            try
            {
                var startUtc = DateTimeOffset.FromUnixTimeMilliseconds(startEpochMs).UtcDateTime;
                var endUtc = DateTimeOffset.FromUnixTimeMilliseconds(endEpochMs).UtcDateTime;

                // 1. בדיקת חפיפה ספציפית לתחנה ב-advance_extractor.db
                bool isShielded = await _bookmarkRepository.HasOverlapAsync(stationId, startUtc, endUtc);

                // 2. בדיקת חפיפה לסימניות מערכתיות/גלובליות (ALL)
                if (!isShielded)
                {
                    isShielded = await _bookmarkRepository.HasOverlapAsync("ALL", startUtc, endUtc);
                }

                if (isShielded)
                {
                    _logger.LogInformation(
                        "[RETENTION SHIELD] Protected chunk range [{Start} - {End}] on station '{Station}' due to active bookmark.",
                        startUtc.ToString("yyyy-MM-dd HH:mm:ss"),
                        endUtc.ToString("yyyy-MM-dd HH:mm:ss"),
                        stationId);
                }

                return isShielded;
            }
            catch (Exception ex)
            {
                // Fail-Safe: מניעת מחיקת מידע אם יש שגיאה רגעית במסד
                _logger.LogError(ex,
                    "[RETENTION SHIELD] Error querying bookmark shields for station '{Station}'. Falling back to protected state.",
                    stationId);
                return true;
            }
        }
    }
}