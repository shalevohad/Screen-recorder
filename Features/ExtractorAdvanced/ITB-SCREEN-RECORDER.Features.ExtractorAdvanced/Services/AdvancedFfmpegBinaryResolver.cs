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
    public class AdvancedFfmpegBinaryResolver : FfmpegBinaryResolver
    {
        public AdvancedFfmpegBinaryResolver(
            IOptions<ExtractorOptions> options,
            ILogger<AdvancedFfmpegBinaryResolver> logger)
            : base(options, logger)
        {
        }

        protected override IEnumerable<string> GetCandidateDirectories()
        {
            var baseDir = AppContext.BaseDirectory;

            // נתיבים ייעודיים של ה-Advanced בעדיפות עליונה
            yield return Path.Combine(baseDir, "Features", "ExtractorAdvanced");
            yield return Path.Combine(baseDir, "Features", "ExtractorAdvanced", "Bin");

            // כל שאר הנתיבים של מחלקת הבסיס
            foreach (var dir in base.GetCandidateDirectories())
            {
                yield return dir;
            }
        }
    }
}