// ==========================================
// File: Features/ExtractorAdvanced/Models/AdvanceJobInfo.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models
{
    public class AdvanceJobInfo : ExportJobInfo
    {
        public List<string> StationIds { get; set; } = new();
        public long InEpochMs { get; set; }
        public long OutEpochMs { get; set; }
        public string CutMode { get; set; } = "SynchronizedMultiTrack";

        public double EstimatedSecondsRemaining { get; set; }
        public new double SpeedMBps { get; set; }

        public KeystrokeExportMode KeystrokeMode { get; set; } = KeystrokeExportMode.BurnIn;

        public string CompositionScope { get; set; } = "intra-station";
        public string LayoutMode { get; set; } = "director";
        public string? TargetDisplayId { get; set; }
        public bool IsPipSwapped { get; set; } = false;
        public bool IsAutoDirectorEnabled { get; set; } = true;
        public List<DirectorCutSegmentDto>? DirectorSegments { get; set; }
        public List<AudioRoutingSegmentDto>? AudioRoutingSegments { get; set; }
    }

    public class AdvanceCutRequestDto
    {
        [JsonPropertyName("stationIds")]
        public List<string> StationIds { get; set; } = new();

        [JsonPropertyName("inEpochMs")]
        public long InEpochMs { get; set; }

        [JsonPropertyName("outEpochMs")]
        public long OutEpochMs { get; set; }

        [JsonPropertyName("keystrokeMode")]
        public KeystrokeExportMode KeystrokeMode { get; set; } = KeystrokeExportMode.BurnIn;

        [JsonPropertyName("compositionScope")]
        public string CompositionScope { get; set; } = "intra-station";

        [JsonPropertyName("layoutMode")]
        public string LayoutMode { get; set; } = "director";

        [JsonPropertyName("targetDisplayId")]
        public string? TargetDisplayId { get; set; }

        [JsonPropertyName("isPipSwapped")]
        public bool IsPipSwapped { get; set; } = false;

        [JsonPropertyName("isAutoDirectorEnabled")]
        public bool IsAutoDirectorEnabled { get; set; } = true;

        [JsonPropertyName("directorSegments")]
        public List<DirectorCutSegmentDto>? DirectorSegments { get; set; }

        [JsonPropertyName("audioRoutingSegments")]
        public List<AudioRoutingSegmentDto>? AudioRoutingSegments { get; set; }
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
        public string DisplayId { get; set; } = "mon-0";
        public bool IsPrimary { get; set; } = true;
        public bool IsDirectorCut { get; set; } = false;
        public int Width { get; set; } = 1920;
        public int Height { get; set; } = 1080;
        public int X { get; set; } = 0;
        public int Y { get; set; } = 0;
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
