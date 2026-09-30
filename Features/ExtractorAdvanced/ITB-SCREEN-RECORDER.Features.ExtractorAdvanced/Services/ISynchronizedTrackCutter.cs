// ==========================================
// File: Features/ExtractorAdvanced/Services/ISynchronizedTrackCutter.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public interface ISynchronizedTrackCutter
    {
        Task<(string OutputFilePath, bool HasAudio)> CutSynchronizedTrackAsync(
            string stationId,
            SynchronizationPlan plan,
            List<RecordingChunkMetadata> stationChunks,
            string tempOutputDir,
            bool isMultiStation,
            IProgress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>? progress = null,
            CancellationToken ct = default);
    }
}