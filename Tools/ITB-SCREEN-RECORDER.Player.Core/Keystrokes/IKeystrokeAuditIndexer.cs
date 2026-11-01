using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Player.Core.Keystrokes;

public interface IKeystrokeAuditIndexer
{
    int TotalCueCount { get; }

    Task IngestSrtStreamAsync(string stationId, Stream srtStream, CancellationToken ct = default);
    void IngestCues(string stationId, IEnumerable<KeystrokeAuditCue> cues);
    void Clear();

    IReadOnlyList<KeystrokeAuditCue> Search(string query, string? stationId = null, int maxResults = 100);
    IReadOnlyList<KeystrokeAuditCue> GetCuesAtTime(TimeSpan time, string? stationId = null);
    IReadOnlyList<KeystrokeAuditCue> GetAllCues(string? stationId = null);
}
