using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ITB_SCREEN_RECORDER.Player.Core.Presentation;

/// <summary>
/// Serializable presentation plan capturing layout mode, active feeds, and timed director switching cues
/// for automated forensic presentation replay and single-master video export.
/// </summary>
public sealed class PresentationDirectorPlan
{
    [JsonPropertyName("title")]
    public string Title { get; set; } = "Tactical Replay Presentation";

    [JsonPropertyName("createdUtc")]
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;

    [JsonPropertyName("initialLayoutMode")]
    public string InitialLayoutMode { get; set; } = "Canvas";

    [JsonPropertyName("initialHeroTrackIndex")]
    public int InitialHeroTrackIndex { get; set; } = 0;

    [JsonPropertyName("initialPipTrackIndex")]
    public int InitialPipTrackIndex { get; set; } = 1;

    [JsonPropertyName("initialSplitTrackIndices")]
    public List<int> InitialSplitTrackIndices { get; set; } = new();

    [JsonPropertyName("cues")]
    public List<PresentationCue> Cues { get; set; } = new();

    public void SaveToFile(string filePath)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(filePath);
        var dir = Path.GetDirectoryName(filePath);
        if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }

        var options = new JsonSerializerOptions
        {
            WriteIndented = true,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        };
        string json = JsonSerializer.Serialize(this, options);
        File.WriteAllText(filePath, json);
    }

    public static PresentationDirectorPlan LoadFromFile(string filePath)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(filePath);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"Presentation plan not found: {filePath}", filePath);
        }

        string json = File.ReadAllText(filePath);
        return JsonSerializer.Deserialize<PresentationDirectorPlan>(json) ?? new PresentationDirectorPlan();
    }
}

public sealed class PresentationCue
{
    [JsonPropertyName("offsetSeconds")]
    public double OffsetSeconds { get; set; }

    [JsonPropertyName("action")]
    public string Action { get; set; } = "SwitchFeed"; // SwitchFeed, SwitchLayout, SwapPip

    [JsonPropertyName("layoutMode")]
    public string? LayoutMode { get; set; } // Canvas, Split, Pip, Solo

    [JsonPropertyName("targetTrackIndex")]
    public int TargetTrackIndex { get; set; }

    [JsonPropertyName("targetHostname")]
    public string TargetHostname { get; set; } = string.Empty;

    [JsonPropertyName("targetDisplayId")]
    public string TargetDisplayId { get; set; } = "mon-0";

    [JsonPropertyName("secondaryTrackIndex")]
    public int? SecondaryTrackIndex { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}
