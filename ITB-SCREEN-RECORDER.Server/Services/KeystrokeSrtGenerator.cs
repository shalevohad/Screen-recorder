// ==========================================
// File: Server/Services/KeystrokeSrtGenerator.cs
// ==========================================
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class KeystrokeSrtGenerator : IKeystrokeSrtGenerator
    {
        private readonly IKeystrokeRepository _keystrokeRepository;

        public KeystrokeSrtGenerator(IKeystrokeRepository keystrokeRepository)
        {
            _keystrokeRepository = keystrokeRepository;
        }

        public Task<string?> CreateSrtFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default)
        {
            return CreateSrtFileForSegmentsAsync(stationId, new[] { (inEpochMs, outEpochMs) }, ct);
        }

        public Task<string?> CreateAssKeycapsFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default)
        {
            return CreateAssKeycapsFileForSegmentsAsync(stationId, new[] { (inEpochMs, outEpochMs) }, ct);
        }

        public async Task<string?> CreateSrtFileForSegmentsAsync(
            string stationId,
            IReadOnlyList<(long StartEpochMs, long EndEpochMs)> activeSegments,
            CancellationToken ct = default)
        {
            if (activeSegments == null || activeSegments.Count == 0) return null;

            long globalStart = activeSegments.Min(s => s.StartEpochMs);
            long globalEnd = activeSegments.Max(s => s.EndEpochMs);

            var keys = await _keystrokeRepository.GetKeystrokesForWindowAsync(stationId, globalStart, globalEnd);
            if (keys == null || keys.Count == 0) return null;

            long totalActiveMs = activeSegments.Sum(s => Math.Max(0, s.EndEpochMs - s.StartEpochMs));
            string srtPath = Path.Combine(Path.GetTempPath(), $"sub_{stationId}_{Guid.NewGuid():N}.srt");
            var sb = new StringBuilder();
            int index = 1;

            foreach (var k in keys)
            {
                long prevActiveMs = 0;
                for (int i = 0; i < activeSegments.Count; i++)
                {
                    var seg = activeSegments[i];
                    if (k.EpochMs >= seg.StartEpochMs && k.EpochMs <= seg.EndEpochMs)
                    {
                        long startRelMs = prevActiveMs + (k.EpochMs - seg.StartEpochMs);
                        long endRelMs = Math.Min(totalActiveMs, startRelMs + 2000);

                        sb.AppendLine(index.ToString());
                        sb.AppendLine($"{FormatSrtTimestamp(startRelMs)} --> {FormatSrtTimestamp(endRelMs)}");
                        sb.AppendLine($"[ {k.KeyCombination} ]");
                        sb.AppendLine();
                        index++;
                        break;
                    }
                    prevActiveMs += Math.Max(0, seg.EndEpochMs - seg.StartEpochMs);
                }
            }

            if (index == 1) return null; // No keys fell into active segments

            await File.WriteAllTextAsync(srtPath, sb.ToString(), Encoding.UTF8, ct);
            return srtPath;
        }

        /// <summary>
        /// 💡 מייצר קובץ ASS מתקדם עם סגנון Keycaps טקטי (כפתורים כהים עם מסגרת ציאן זוהרת) המותאם למקטעים
        /// </summary>
        public async Task<string?> CreateAssKeycapsFileForSegmentsAsync(
            string stationId,
            IReadOnlyList<(long StartEpochMs, long EndEpochMs)> activeSegments,
            CancellationToken ct = default)
        {
            if (activeSegments == null || activeSegments.Count == 0) return null;

            long globalStart = activeSegments.Min(s => s.StartEpochMs);
            long globalEnd = activeSegments.Max(s => s.EndEpochMs);

            var keys = await _keystrokeRepository.GetKeystrokesForWindowAsync(stationId, globalStart, globalEnd);
            if (keys == null || keys.Count == 0) return null;

            long totalActiveMs = activeSegments.Sum(s => Math.Max(0, s.EndEpochMs - s.StartEpochMs));
            string assPath = Path.Combine(Path.GetTempPath(), $"badge_{stationId}_{Guid.NewGuid():N}.ass");
            var sb = new StringBuilder();

            // כותרת והגדרת סקריפט ורזולוציה
            sb.AppendLine("[Script Info]");
            sb.AppendLine("Title: ITB Tactical Keycaps HUD");
            sb.AppendLine("ScriptType: v4.00+");
            sb.AppendLine("WrapStyle: 0");
            sb.AppendLine("ScaledBorderAndShadow: yes");
            sb.AppendLine("PlayResX: 1920");
            sb.AppendLine("PlayResY: 1080");
            sb.AppendLine();

            // הגדרת סגנון ה-Keycap:
            // Alignment 5 = מרכז מסך (או 2 עם MarginV למרכז תחתון)
            // PrimaryColour = לבן, OutlineColour = ציאן זוהר (&H00FFF000), BackColour = רקע כהה שקוף למחצה (&HB0150F08)
            sb.AppendLine("[V4+ Styles]");
            sb.AppendLine("Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding");
            sb.AppendLine("Style: KeyCapHud, Segoe UI, 26, &H00FFFFFF, &H00000000, &H00FFF000, &HD0180F08, 1, 0, 0, 0, 100, 100, 1.5, 0, 1, 2.5, 3.5, 5, 20, 20, 140, 1");
            sb.AppendLine();

            sb.AppendLine("[Events]");
            sb.AppendLine("Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text");

            int writtenCount = 0;
            foreach (var k in keys)
            {
                long prevActiveMs = 0;
                for (int i = 0; i < activeSegments.Count; i++)
                {
                    var seg = activeSegments[i];
                    if (k.EpochMs >= seg.StartEpochMs && k.EpochMs <= seg.EndEpochMs)
                    {
                        long startRelMs = prevActiveMs + (k.EpochMs - seg.StartEpochMs);
                        long endRelMs = Math.Min(totalActiveMs, startRelMs + 2200); // תצוגה ל-2.2 שניות

                        string startAss = FormatAssTimestamp(startRelMs);
                        string endAss = FormatAssTimestamp(endRelMs);

                        // פירוק הצירוף (למשל: "WIN + SHIFT + S") לעיצוב מקש בודד
                        var parts = k.KeyCombination.Split('+', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

                        var formattedKeys = parts.Select(part =>
                            $"{{\\b1\\fscx105\\fscy105\\c&H00FFFFFF&\\bord2.8\\3c&H00FFF000&\\shad3\\4c&HD0120B04&}}  {part.ToUpperInvariant()}  "
                        );

                        string formattedLine = string.Join("{\\rKeyCapHud\\c&H00FFF000\\bord0\\shad0}  +  ", formattedKeys);

                        sb.AppendLine($"Dialogue: 0,{startAss},{endAss},KeyCapHud,,0,0,0,,{formattedLine}");
                        writtenCount++;
                        break;
                    }
                    prevActiveMs += Math.Max(0, seg.EndEpochMs - seg.StartEpochMs);
                }
            }

            if (writtenCount == 0) return null;

            await File.WriteAllTextAsync(assPath, sb.ToString(), new UTF8Encoding(false), ct);
            return assPath;
        }

        internal static string FormatSrtTimestamp(long ms)
        {
            var ts = TimeSpan.FromMilliseconds(ms);
            return $"{(int)ts.TotalHours:D2}:{ts.Minutes:D2}:{ts.Seconds:D2},{ts.Milliseconds:D3}";
        }

        internal static string FormatAssTimestamp(long ms)
        {
            var ts = TimeSpan.FromMilliseconds(ms);
            return $"{(int)ts.TotalHours}:{ts.Minutes:D2}:{ts.Seconds:D2}.{ts.Milliseconds / 10:D2}";
        }
    }
}