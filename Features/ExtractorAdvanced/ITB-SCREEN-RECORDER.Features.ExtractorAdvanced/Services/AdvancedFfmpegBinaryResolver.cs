// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedFfmpegBinaryResolver.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    /// <summary>
    /// Specialized binary resolver prioritizing ExtractorAdvanced directory paths for FFmpeg and FFprobe discovery.
    /// </summary>
    public class AdvancedFfmpegBinaryResolver : FfmpegBinaryResolver
    {
        public AdvancedFfmpegBinaryResolver(
            IOptions<ExtractorOptions> options,
            ILogger<AdvancedFfmpegBinaryResolver> logger)
            : base(options, logger)
        {
        }

        /// <summary>
        /// Returns candidate search directories for FFmpeg and FFprobe binaries.
        /// </summary>
        /// <returns>Sequence of candidate directory paths.</returns>
        protected override IEnumerable<string> GetCandidateDirectories()
        {
            var baseDir = AppContext.BaseDirectory;

            // Highest priority: Dedicated ExtractorAdvanced feature binary directories
            yield return Path.Combine(baseDir, "Features", "ExtractorAdvanced");
            yield return Path.Combine(baseDir, "Features", "ExtractorAdvanced", "Bin");

            // Remaining base resolver search directories
            foreach (var dir in base.GetCandidateDirectories())
            {
                yield return dir;
            }
        }
    }
}