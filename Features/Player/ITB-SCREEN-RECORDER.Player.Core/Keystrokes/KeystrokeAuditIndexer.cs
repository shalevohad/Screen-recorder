using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Player.Core.Keystrokes;

/// <summary>
/// High-performance forensic keystroke and caption indexer.
/// Ingests SRT subtitle streams without disk extraction and provides sub-millisecond keyword lookup.
/// </summary>
public sealed class KeystrokeAuditIndexer : IKeystrokeAuditIndexer
{
    private readonly object _sync = new();
    private readonly List<KeystrokeAuditCue> _allCues = new();
    private readonly Dictionary<string, List<KeystrokeAuditCue>> _cuesByStation = new(StringComparer.OrdinalIgnoreCase);

    public int TotalCueCount
    {
        get
        {
            lock (_sync) return _allCues.Count;
        }
    }

    public async Task IngestSrtStreamAsync(string stationId, Stream srtStream, CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(srtStream);
        if (string.IsNullOrWhiteSpace(stationId)) stationId = "Default";

        using var reader = new StreamReader(srtStream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true, bufferSize: 4096, leaveOpen: true);
        var parsedCues = new List<KeystrokeAuditCue>();

        string? line;
        int currentCueNumber = 0;
        TimeSpan currentStart = TimeSpan.Zero;
        TimeSpan currentEnd = TimeSpan.Zero;
        var textBuilder = new StringBuilder();
        bool readingText = false;

        while ((line = await reader.ReadLineAsync(ct).ConfigureAwait(false)) != null)
        {
            line = line.Trim();

            if (string.IsNullOrEmpty(line))
            {
                if (readingText && textBuilder.Length > 0)
                {
                    string cueText = textBuilder.ToString().Trim();
                    bool isShortcut = DetectShortcut(cueText);
                    parsedCues.Add(new KeystrokeAuditCue(currentCueNumber, stationId, currentStart, currentEnd, cueText, isShortcut));

                    textBuilder.Clear();
                    readingText = false;
                }
                continue;
            }

            if (!readingText && int.TryParse(line, NumberStyles.Integer, CultureInfo.InvariantCulture, out int cueNum))
            {
                currentCueNumber = cueNum;
                continue;
            }

            if (!readingText && line.Contains("-->", StringComparison.Ordinal))
            {
                var parts = line.Split("-->", StringSplitOptions.TrimEntries);
                if (parts.Length == 2 &&
                    TryParseSrtTimestamp(parts[0], out currentStart) &&
                    TryParseSrtTimestamp(parts[1], out currentEnd))
                {
                    readingText = true;
                }
                continue;
            }

            if (readingText)
            {
                if (textBuilder.Length > 0) textBuilder.AppendLine();
                textBuilder.Append(line);
            }
        }

        // Flush trailing cue if file didn't end with blank line
        if (readingText && textBuilder.Length > 0)
        {
            string cueText = textBuilder.ToString().Trim();
            bool isShortcut = DetectShortcut(cueText);
            parsedCues.Add(new KeystrokeAuditCue(currentCueNumber, stationId, currentStart, currentEnd, cueText, isShortcut));
        }

        IngestCues(stationId, parsedCues);
    }

    public void IngestCues(string stationId, IEnumerable<KeystrokeAuditCue> cues)
    {
        if (string.IsNullOrWhiteSpace(stationId)) stationId = "Default";

        lock (_sync)
        {
            if (!_cuesByStation.TryGetValue(stationId, out var stationList))
            {
                stationList = new List<KeystrokeAuditCue>();
                _cuesByStation[stationId] = stationList;
            }

            foreach (var cue in cues)
            {
                stationList.Add(cue);
                _allCues.Add(cue);
            }

            // Keep sorted chronologically
            stationList.Sort((a, b) => a.StartTime.CompareTo(b.StartTime));
            _allCues.Sort((a, b) => a.StartTime.CompareTo(b.StartTime));
        }
    }

    public void Clear()
    {
        lock (_sync)
        {
            _allCues.Clear();
            _cuesByStation.Clear();
        }
    }

    public IReadOnlyList<KeystrokeAuditCue> Search(string query, string? stationId = null, int maxResults = 100)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return GetAllCues(stationId).Take(maxResults).ToList();
        }

        lock (_sync)
        {
            IEnumerable<KeystrokeAuditCue> source = string.IsNullOrWhiteSpace(stationId)
                ? _allCues
                : _cuesByStation.TryGetValue(stationId, out var sList) ? sList : Enumerable.Empty<KeystrokeAuditCue>();

            return source
                .Where(c => c.Text.Contains(query, StringComparison.OrdinalIgnoreCase))
                .Take(maxResults)
                .ToList();
        }
    }

    public IReadOnlyList<KeystrokeAuditCue> GetCuesAtTime(TimeSpan time, string? stationId = null)
    {
        lock (_sync)
        {
            IEnumerable<KeystrokeAuditCue> source = string.IsNullOrWhiteSpace(stationId)
                ? _allCues
                : _cuesByStation.TryGetValue(stationId, out var sList) ? sList : Enumerable.Empty<KeystrokeAuditCue>();

            return source
                .Where(c => c.StartTime <= time && c.EndTime >= time)
                .ToList();
        }
    }

    public IReadOnlyList<KeystrokeAuditCue> GetAllCues(string? stationId = null)
    {
        lock (_sync)
        {
            if (string.IsNullOrWhiteSpace(stationId))
            {
                return _allCues.ToList();
            }

            return _cuesByStation.TryGetValue(stationId, out var sList)
                ? sList.ToList()
                : Array.Empty<KeystrokeAuditCue>();
        }
    }

    private static bool TryParseSrtTimestamp(string raw, out TimeSpan timeSpan)
    {
        timeSpan = TimeSpan.Zero;
        // Expected format: 00:01:23,456 or 00:01:23.456
        var colonParts = raw.Split(':');
        if (colonParts.Length != 3) return false;

        if (!int.TryParse(colonParts[0], NumberStyles.Integer, CultureInfo.InvariantCulture, out int hours)) return false;
        if (!int.TryParse(colonParts[1], NumberStyles.Integer, CultureInfo.InvariantCulture, out int minutes)) return false;

        string secPart = colonParts[2];
        char separator = secPart.Contains(',') ? ',' : '.';
        var dotParts = secPart.Split(separator);

        if (!int.TryParse(dotParts[0], NumberStyles.Integer, CultureInfo.InvariantCulture, out int seconds)) return false;
        int millis = 0;
        if (dotParts.Length > 1)
        {
            int.TryParse(dotParts[1].PadRight(3, '0')[..3], NumberStyles.Integer, CultureInfo.InvariantCulture, out millis);
        }

        timeSpan = new TimeSpan(0, hours, minutes, seconds, millis);
        return true;
    }

    private static bool DetectShortcut(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return false;
        return text.Contains("[Ctrl", StringComparison.OrdinalIgnoreCase) ||
               text.Contains("[Alt", StringComparison.OrdinalIgnoreCase) ||
               text.Contains("[Shift", StringComparison.OrdinalIgnoreCase) ||
               text.Contains("[Win", StringComparison.OrdinalIgnoreCase) ||
               text.Contains("[Enter]", StringComparison.OrdinalIgnoreCase) ||
               text.Contains("[Delete]", StringComparison.OrdinalIgnoreCase) ||
               (text.StartsWith('[') && text.EndsWith(']'));
    }
}
