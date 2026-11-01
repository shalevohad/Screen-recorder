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
    /// <summary>
    /// Retention shield provider that shields recording chunks overlapping active bookmarks or forensic cases from disk purge.
    /// </summary>
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

        /// <summary>
        /// Checks whether the specified station recording chunk interval overlaps any active bookmark shield.
        /// </summary>
        /// <param name="stationId">The station identifier.</param>
        /// <param name="startEpochMs">Start timestamp in Unix epoch milliseconds.</param>
        /// <param name="endEpochMs">End timestamp in Unix epoch milliseconds.</param>
        /// <returns>True if the range is shielded from deletion; otherwise, false.</returns>
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

                // 1. Check bookmark time-window overlap across all bookmarks (shields any recording falling inside bookmarked range)
                bool isShielded = await _bookmarkRepository.HasAnyOverlapAsync(startUtc, endUtc);

                if (isShielded)
                {
                    _logger.LogInformation(
                        "[RETENTION SHIELD] Protected chunk range [{Start} - {End}] on station '{Station}' due to bookmark time-window shield covering all active stations.",
                        startUtc.ToString("yyyy-MM-dd HH:mm:ss"),
                        endUtc.ToString("yyyy-MM-dd HH:mm:ss"),
                        stationId);
                }

                return isShielded;
            }
            catch (Exception ex)
            {
                // Fail-safe: prevent accidental data deletion if database is temporarily unreachable
                _logger.LogError(ex,
                    "[RETENTION SHIELD] Error querying bookmark shields for station '{Station}'. Falling back to protected state.",
                    stationId);
                return true;
            }
        }
    }
}