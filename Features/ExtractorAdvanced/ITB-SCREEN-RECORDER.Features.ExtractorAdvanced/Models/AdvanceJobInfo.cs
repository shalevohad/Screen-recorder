// ==========================================
// File: Features/ExtractorAdvanced/Models/AdvanceJobInfo.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models
{
    public class StreamMetadataDto
    {
        public double Fps { get; set; } = 30.0;
        public double FrameDurationMs { get; set; } = 33.333;
        public int Width { get; set; } = 1920;
        public int Height { get; set; } = 1080;
    }

    public class AdvanceJobInfo : ExportJobInfo
    {
        public List<string> StationIds { get; set; } = new();
        public long InEpochMs { get; set; }
        public long OutEpochMs { get; set; }
        public string CutMode { get; set; } = "SynchronizedMultiTrack";

        // 💡 הוספת שדות טלמטריה מתקדמים לניהול ETA ומהירות
        public double EstimatedSecondsRemaining { get; set; }
        public double SpeedMBps { get; set; }
    }

    public class AdvanceCutRequestDto
    {
        public List<string> StationIds { get; set; } = new();
        public long InEpochMs { get; set; }
        public long OutEpochMs { get; set; }
    }

    public class SessionManifest
    {
        public string SessionId { get; set; } = string.Empty;
        public DateTime RangeStartUtc { get; set; }
        public DateTime RangeEndUtc { get; set; }
        public List<SessionTrackInfo> Tracks { get; set; } = new();
    }

    public class SessionTrackInfo
    {
        public string Hostname { get; set; } = string.Empty;
        public string VideoFileName { get; set; } = string.Empty;
        public double StartOffsetMs { get; set; } = 0;
        public double DurationMs { get; set; }
        public bool HasAudio { get; set; } = true;
    }

    public static class DummyVideoGeneratorExtensions
    {
        public static async Task<string> GetOrCreateDummyVideoAsync(
            this IDummyVideoGenerator generator,
            double durationSeconds,
            CancellationToken ct)
        {
            if (generator == null) return string.Empty;

            var type = generator.GetType();
            var methods = type.GetMethods(BindingFlags.Public | BindingFlags.Instance);

            foreach (var m in methods)
            {
                var pars = m.GetParameters();
                if (pars.Length >= 1 && (pars[0].ParameterType == typeof(double) || pars[0].ParameterType == typeof(float) || pars[0].ParameterType == typeof(int)))
                {
                    try
                    {
                        object[] args = pars.Length >= 2 && pars[1].ParameterType == typeof(CancellationToken)
                            ? new object[] { durationSeconds, ct }
                            : new object[] { durationSeconds };

                        var res = m.Invoke(generator, args);
                        if (res is Task<string> taskStr) return await taskStr;
                        if (res is Task taskObj) { await taskObj; return string.Empty; }
                        if (res is string strPath) return strPath;
                    }
                    catch { }
                }
            }
            return string.Empty;
        }
    }
}