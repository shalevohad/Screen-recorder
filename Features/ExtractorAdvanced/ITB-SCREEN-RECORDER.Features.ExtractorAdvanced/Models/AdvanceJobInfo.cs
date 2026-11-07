// ==========================================
// File: Features/ExtractorAdvanced/Models/AdvanceJobInfo.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

using System.Linq;

using System.Xml.Serialization;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

using ITB_SCREEN_RECORDER.Core.Contracts.Network;
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

        public string Resolution { get; set; } = "FHD";
        public string? VideoQuality { get; set; }

        public string CompositionScope { get; set; } = "intra-station";
        public string LayoutMode { get; set; } = "director";
        public string? TargetDisplayId { get; set; }
        public bool IsPipSwapped { get; set; } = false;
        public bool IsAutoDirectorEnabled { get; set; } = true;
        public List<DirectorCutSegmentDto>? DirectorSegments { get; set; }
        [XmlIgnore]
        [JsonPropertyName("stationDirectorSegments")]
        public Dictionary<string, List<DirectorCutSegmentDto>>? StationDirectorSegments { get; set; }
        public List<AudioRoutingSegmentDto>? AudioRoutingSegments { get; set; }
        public string? AudioSourceStation { get; set; }
        public CustomCanvasLayoutDto? CanvasLayout { get; set; }
        public CanvasLayoutTimelineDto? CanvasLayoutTimeline { get; set; }
        public string? UtcClockPosition { get; set; } = "top-right";
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

        [JsonPropertyName("resolution")]
        public string? Resolution { get; set; }

        [JsonPropertyName("videoQuality")]
        public string? VideoQuality { get; set; }

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
        [XmlIgnore]
        [JsonPropertyName("stationDirectorSegments")]
        public Dictionary<string, List<DirectorCutSegmentDto>>? StationDirectorSegments { get; set; }

        [JsonPropertyName("audioRoutingSegments")]
        public List<AudioRoutingSegmentDto>? AudioRoutingSegments { get; set; }

        [JsonPropertyName("audioSourceStation")]
        public string? AudioSourceStation { get; set; }

        [JsonPropertyName("startTime")]
        public string? StartTime { get; set; }

        [JsonPropertyName("endTime")]
        public string? EndTime { get; set; }

        [JsonPropertyName("canvasLayout")]
        public CustomCanvasLayoutDto? CanvasLayout { get; set; }

        [JsonPropertyName("canvasLayoutTimeline")]
        public CanvasLayoutTimelineDto? CanvasLayoutTimeline { get; set; }

        [JsonPropertyName("utcClockPosition")]
        public string? UtcClockPosition { get; set; } = "top-right";

        [JsonPropertyName("fileName")]
        public string? FileName { get; set; }

        [JsonPropertyName("createdBy")]
        public string? CreatedBy { get; set; }

        [JsonPropertyName("notes")]
        public string? Notes { get; set; }
    }

    /// <summary>
    /// Represents a dynamic, time-keyframed canvas layout timeline where layouts and placements can transition
    /// between keyframe timestamps either smoothly (animated) or via cuts/dips.
    /// </summary>
    [XmlRoot("CanvasLayoutTimeline")]
    public class CanvasLayoutTimelineDto
    {
        [JsonPropertyName("resolution")]
        [XmlElement("Resolution")]
        public string? Resolution { get; set; }

        [JsonPropertyName("keyframes")]
        [XmlElement("Keyframe")]
        public List<CanvasLayoutKeyframeDto> Keyframes { get; set; } = new();
    }

    public class CanvasLayoutKeyframeDto
    {
        [JsonPropertyName("timestampEpochMs")]
        [XmlAttribute("timestampEpochMs")]
        public long TimestampEpochMs { get; set; }

        [JsonPropertyName("transitionDurationSec")]
        [XmlAttribute("transitionDurationSec")]
        public double TransitionDurationSec { get; set; } = 0.5;

        [JsonPropertyName("transitionType")]
        [XmlAttribute("transitionType")]
        public string TransitionType { get; set; } = "smooth"; // "smooth", "cut", "dip"

        [JsonPropertyName("utcClockPosition")]
        [XmlAttribute("utcClockPosition")]
        public string? UtcClockPosition { get; set; }

        [JsonPropertyName("layout")]
        [XmlElement("Layout")]
        public CustomCanvasLayoutDto Layout { get; set; } = new();
    }

    /// <summary>
    /// Custom Canvas Layout definition for absolute positioning, sizing, and layering of feeds.
    /// </summary>
    [XmlRoot("CustomCanvasLayout")]
    public class CustomCanvasLayoutDto
    {
        [JsonPropertyName("resolution")]
        [XmlElement("Resolution")]
        public string? Resolution { get; set; }

        [JsonPropertyName("width")]
        [XmlElement("Width")]
        public int Width { get; set; } = 1920;

        [JsonPropertyName("height")]
        [XmlElement("Height")]
        public int Height { get; set; } = 1080;

        [JsonPropertyName("backgroundColor")]
        [XmlElement("BackgroundColor")]
        public string BackgroundColor { get; set; } = "#070A10";

        [JsonPropertyName("fps")]
        [XmlElement("Fps")]
        public double Fps { get; set; } = 30.0;

        [JsonPropertyName("utcClockPosition")]
        [XmlElement("UtcClockPosition")]
        public string? UtcClockPosition { get; set; }

        [JsonPropertyName("placements")]
        [XmlElement("Placement")]
        public List<CanvasPlacementDto> Placements { get; set; } = new();
    }

    /// <summary>
    /// Represents a single workstation / display placement on the output video canvas.
    /// </summary>
    public class CanvasPlacementDto
    {
        /// <summary>
        /// Workstation identifier (accepts physical hostname or role alias, e.g. "Commander" or "WS-ALPHA").
        /// </summary>
        [JsonPropertyName("stationId")]
        [XmlElement("StationId")]
        public string StationId { get; set; } = string.Empty;

        /// <summary>
        /// Target display on the station (e.g. "mon-0", "mon-1", or "director"). Defaults to "mon-0".
        /// </summary>
        [JsonPropertyName("displayId")]
        [XmlElement("DisplayId")]
        public string DisplayId { get; set; } = "mon-0";

        /// <summary>
        /// X position on canvas (pixels or normalized 0.0-1.0).
        /// </summary>
        [JsonPropertyName("x")]
        [XmlElement("X")]
        public double X { get; set; } = 0;

        /// <summary>
        /// Y position on canvas (pixels or normalized 0.0-1.0).
        /// </summary>
        [JsonPropertyName("y")]
        [XmlElement("Y")]
        public double Y { get; set; } = 0;

        /// <summary>
        /// Width on canvas (pixels or normalized 0.0-1.0).
        /// </summary>
        [JsonPropertyName("width")]
        [XmlElement("Width")]
        public double Width { get; set; } = 1920;

        /// <summary>
        /// Height on canvas (pixels or normalized 0.0-1.0).
        /// </summary>
        [JsonPropertyName("height")]
        [XmlElement("Height")]
        public double Height { get; set; } = 1080;

        /// <summary>
        /// Stacking order layer / depth ("what is in front of what").
        /// Lower values are placed first (e.g. background); higher values overlay on top (e.g. PiP inset has zIndex=1).
        /// </summary>
        [JsonPropertyName("zIndex")]
        [XmlElement("ZIndex")]
        public int ZIndex { get; set; } = 0;

        /// <summary>
        /// Optional rotation in degrees (e.g. 0, 90, 180, 270).
        /// </summary>
        [JsonPropertyName("rotation")]
        [XmlElement("Rotation")]
        public double Rotation { get; set; } = 0;

        /// <summary>
        /// Optional border thickness in pixels around this feed (e.g. 2 for tactical border, 0 for borderless).
        /// </summary>
        [JsonPropertyName("borderWidth")]
        [XmlElement("BorderWidth")]
        public int BorderWidth { get; set; } = 0;

        /// <summary>
        /// Hex border color (e.g. "#06B6D4" cyan, "#10B981" emerald, "#F43F5E" rose).
        /// </summary>
        [JsonPropertyName("borderColor")]
        [XmlElement("BorderColor")]
        public string BorderColor { get; set; } = "#06B6D4";

        /// <summary>
        /// Optional shadow effect preset (e.g. "none", "deep", "glow-cyan", "glow-emerald", "glow-rose", "glow-amber").
        /// </summary>
        [JsonPropertyName("shadowEffect")]
        [XmlElement("ShadowEffect")]
        public string? ShadowEffect { get; set; } = "none";

        /// <summary>
        /// Optional corner rounding radius in pixels (e.g. 0, 4, 8, 12).
        /// </summary>
        [JsonPropertyName("borderRadius")]
        [XmlElement("BorderRadius")]
        public int BorderRadius { get; set; } = 0;

        /// <summary>
        /// Optional tactical label burned onto the feed (e.g. "COMMANDER - WS-01").
        /// </summary>
        [JsonPropertyName("label")]
        [XmlElement("Label")]
        public string? Label { get; set; }

        /// <summary>
        /// Optional temporal start offset in milliseconds within the exported duration.
        /// </summary>
        [JsonPropertyName("startOffsetMs")]
        [XmlElement("StartOffsetMs")]
        public double? StartOffsetMs { get; set; }

        /// <summary>
        /// Optional temporal end offset in milliseconds within the exported duration.
        /// </summary>
        [JsonPropertyName("endOffsetMs")]
        [XmlElement("EndOffsetMs")]
        public double? EndOffsetMs { get; set; }
    }

    /// <summary>
    /// Request parameters for querying/inspecting server recording capabilities over a time range.
    /// </summary>
    public class ForensicInspectionRequestDto
    {
        [JsonPropertyName("startEpoch")]
        public double? StartEpoch { get; set; }

        [JsonPropertyName("endEpoch")]
        public double? EndEpoch { get; set; }

        [JsonPropertyName("startTime")]
        public string? StartTime { get; set; }

        [JsonPropertyName("endTime")]
        public string? EndTime { get; set; }

        [JsonPropertyName("stations")]
        public string? Stations { get; set; }

        [JsonPropertyName("stationIds")]
        public List<string>? StationIds { get; set; }
    }

    /// <summary>
    /// Complete forensic inspection report returned to external systems before exporting.
    /// </summary>
        public class RoleMappingEntryDto
    {
        [XmlAttribute("role")]
        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty;

        [XmlAttribute("stationId")]
        [JsonPropertyName("stationId")]
        public string StationId { get; set; } = string.Empty;
    }


    public class ForensicInspectionResultDto
    {
        [JsonPropertyName("timeRange")]
        public ForensicTimeRangeDto TimeRange { get; set; } = new();

        [JsonPropertyName("stations")]
        public List<StationInspectionDto> Stations { get; set; } = new();

        [XmlIgnore]
        [JsonPropertyName("roleToStationMap")]
        public Dictionary<string, string> RoleToStationMap { get; set; } = new(StringComparer.OrdinalIgnoreCase);

        [XmlIgnore]
        [JsonPropertyName("stationToRoleMap")]
        public Dictionary<string, string> StationToRoleMap { get; set; } = new(StringComparer.OrdinalIgnoreCase);

        [XmlElement("RoleMapping")]
        [JsonIgnore]
        public RoleMappingEntryDto[] RoleMappingsXml
        {
            get => RoleToStationMap.Select(kv => new RoleMappingEntryDto { Role = kv.Key, StationId = kv.Value }).ToArray();
            set
            {
                if (value != null)
                {
                    foreach (var item in value)
                    {
                        if (!string.IsNullOrEmpty(item.Role) && !string.IsNullOrEmpty(item.StationId))
                        {
                            RoleToStationMap[item.Role] = item.StationId;
                            StationToRoleMap[item.StationId] = item.Role;
                        }
                    }
                }
            }
        }

                [JsonPropertyName("roleHistory")]
        [XmlElement("RoleHistoryInterval")]
        public List<StationRoleIntervalDto> RoleHistory { get; set; } = new();

        [JsonPropertyName("totalStationsFound")]
        public int TotalStationsFound { get; set; }

        [JsonPropertyName("activeRecordingStationsCount")]
        public int ActiveRecordingStationsCount { get; set; }

        [JsonPropertyName("stationsWithAudioCount")]
        public int StationsWithAudioCount { get; set; }

        [JsonPropertyName("stationsWithKeystrokesCount")]
        public int StationsWithKeystrokesCount { get; set; }
    }

    public class ForensicTimeRangeDto
    {
        [JsonPropertyName("startEpochMs")]
        public long StartEpochMs { get; set; }

        [JsonPropertyName("endEpochMs")]
        public long EndEpochMs { get; set; }

        [JsonPropertyName("startUtc")]
        public DateTime StartUtc { get; set; }

        [JsonPropertyName("endUtc")]
        public DateTime EndUtc { get; set; }

        [JsonPropertyName("durationSeconds")]
        public double DurationSeconds { get; set; }
    }

    public class StationDisplayInspectionDto
    {
        [JsonPropertyName("displayId")]
        public string DisplayId { get; set; } = "mon-0";

        [JsonPropertyName("displayNumber")]
        public int DisplayNumber { get; set; } = 1;

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; } = string.Empty;

        [JsonPropertyName("isPrimary")]
        public bool IsPrimary { get; set; } = true;

        [JsonPropertyName("hasAudio")]
        public bool HasAudio { get; set; }

        [JsonPropertyName("width")]
        public int Width { get; set; } = 1920;

        [JsonPropertyName("height")]
        public int Height { get; set; } = 1080;

        [JsonPropertyName("fps")]
        public double Fps { get; set; } = 30.0;

        [JsonPropertyName("resolution")]
        public string Resolution { get; set; } = "1080p";

        [JsonPropertyName("x")]
        public int X { get; set; }

        [JsonPropertyName("y")]
        public int Y { get; set; }
    }

    public class StationInspectionDto
    {
        [JsonPropertyName("stationId")]
        public string StationId { get; set; } = string.Empty;

        [JsonPropertyName("hostname")]
        public string Hostname { get; set; } = string.Empty;

        [JsonPropertyName("roleAlias")]
        public string? RoleAlias { get; set; }

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; } = string.Empty;

        [JsonPropertyName("isOnline")]
        public bool IsOnline { get; set; } = true;

        [JsonPropertyName("hasRecordings")]
        public bool HasRecordings { get; set; }

        [JsonPropertyName("hasAudio")]
        public bool HasAudio { get; set; }

        [JsonPropertyName("hasKeystrokes")]
        public bool HasKeystrokes { get; set; }

        [JsonPropertyName("keystrokeCount")]
        public int KeystrokeCount { get; set; }

        [JsonPropertyName("recordingsCount")]
        public int RecordingsCount { get; set; }

                [JsonPropertyName("roleHistory")]
        [XmlElement("RoleHistoryInterval")]
        public List<StationRoleIntervalDto>? RoleHistory { get; set; }

        [JsonPropertyName("displays")]
        public List<StationDisplayInspectionDto> Displays { get; set; } = new();

        [JsonPropertyName("recordingSegments")]
        public List<TimelineSegmentInspectionDto> RecordingSegments { get; set; } = new();
    }

    public class TimelineSegmentInspectionDto
    {
        [JsonPropertyName("displayId")]
        public string DisplayId { get; set; } = "mon-0";

        [JsonPropertyName("startEpochMs")]
        public long StartEpochMs { get; set; }

        [JsonPropertyName("endEpochMs")]
        public long EndEpochMs { get; set; }

        [JsonPropertyName("startUtc")]
        public DateTime StartUtc { get; set; }

        [JsonPropertyName("endUtc")]
        public DateTime EndUtc { get; set; }

        [JsonPropertyName("durationSeconds")]
        public double DurationSeconds { get; set; }

        [JsonPropertyName("hasAudio")]
        public bool HasAudio { get; set; }
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
