// ==========================================
// File: Server/Services/KeystrokeSrtGenerator.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class KeystrokeSrtGenerator : IKeystrokeSrtGenerator
    {
        private static readonly Regex KeyPattern = new(@"^Key\((\d+)\)$", RegexOptions.IgnoreCase | RegexOptions.Compiled);

        private static readonly Dictionary<int, string> VkMap = new()
        {
            // Mouse and control keys
            [1] = "LButton", [2] = "RButton", [3] = "Cancel", [4] = "MButton", [5] = "XButton1", [6] = "XButton2",
            [8] = "Backspace", [9] = "Tab", [12] = "Clear", [13] = "Enter",
            [16] = "Shift", [17] = "Ctrl", [18] = "Alt", [19] = "Pause", [20] = "Caps Lock", [27] = "Esc",
            [32] = "Space", [33] = "Page Up", [34] = "Page Down", [35] = "End", [36] = "Home",
            [37] = "Left", [38] = "Up", [39] = "Right", [40] = "Down",
            [41] = "Select", [42] = "Print", [43] = "Execute", [44] = "Print Screen", [45] = "Insert", [46] = "Delete", [47] = "Help",

            // Top-row number keys (0-9)
            [48] = "0", [49] = "1", [50] = "2", [51] = "3", [52] = "4",
            [53] = "5", [54] = "6", [55] = "7", [56] = "8", [57] = "9",

            // Latin letters (A-Z)
            [65] = "A", [66] = "B", [67] = "C", [68] = "D", [69] = "E", [70] = "F",
            [71] = "G", [72] = "H", [73] = "I", [74] = "J", [75] = "K", [76] = "L",
            [77] = "M", [78] = "N", [79] = "O", [80] = "P", [81] = "Q", [82] = "R",
            [83] = "S", [84] = "T", [85] = "U", [86] = "V", [87] = "W", [88] = "X",
            [89] = "Y", [90] = "Z",

            // System and Windows keys
            [91] = "Win", [92] = "RWin", [93] = "Apps", [95] = "Sleep",

            // Numpad
            [96] = "Num 0", [97] = "Num 1", [98] = "Num 2", [99] = "Num 3", [100] = "Num 4",
            [101] = "Num 5", [102] = "Num 6", [103] = "Num 7", [104] = "Num 8", [105] = "Num 9",
            [106] = "Num *", [107] = "Num +", [108] = "Separator", [109] = "Num -", [110] = "Num .", [111] = "Num /",

            // Function keys (F1 - F24)
            [112] = "F1", [113] = "F2", [114] = "F3", [115] = "F4",
            [116] = "F5", [117] = "F6", [118] = "F7", [119] = "F8",
            [120] = "F9", [121] = "F10", [122] = "F11", [123] = "F12",
            [124] = "F13", [125] = "F14", [126] = "F15", [127] = "F16",
            [128] = "F17", [129] = "F18", [130] = "F19", [131] = "F20",
            [132] = "F21", [133] = "F22", [134] = "F23", [135] = "F24",

            // Lock keys
            [144] = "Num Lock", [145] = "Scroll Lock",

            // Specific modifier keys
            [160] = "Shift", [161] = "RShift", [162] = "Ctrl", [163] = "RCtrl", [164] = "Alt", [165] = "RAlt",

            // Browser navigation keys
            [166] = "Browser Back", [167] = "Browser Forward", [168] = "Browser Refresh",
            [169] = "Browser Stop", [170] = "Browser Search", [171] = "Browser Favorites", [172] = "Browser Home",

            // Media control keys
            [173] = "Mute", [174] = "Vol -", [175] = "Vol +", [176] = "Next Track",
            [177] = "Prev Track", [178] = "Stop", [179] = "Play/Pause",
            [180] = "Mail", [181] = "Media Select", [182] = "App 1", [183] = "App 2",

            // Punctuation and OEM special characters
            [186] = ";", [187] = "=", [188] = ",", [189] = "-", [190] = ".", [191] = "/", [192] = "`",
            [219] = "[", [220] = "\\", [221] = "]", [222] = "'", [226] = "\\"
        };

        private readonly IKeystrokeRepository _keystrokeRepository;

        public KeystrokeSrtGenerator(IKeystrokeRepository keystrokeRepository)
        {
            _keystrokeRepository = keystrokeRepository;
        }

        /// <summary>
        /// Normalizes a single key part, translating virtual key code patterns and standardizing modifiers.
        /// </summary>
        /// <param name="part">Raw key name or Key(code) string.</param>
        /// <returns>Normalized key name string.</returns>
        public static string NormalizeKeyPart(string? part)
        {
            if (string.IsNullOrWhiteSpace(part)) return string.Empty;
            string trimmed = part.Trim();

            var match = KeyPattern.Match(trimmed);
            if (match.Success && int.TryParse(match.Groups[1].Value, out int code))
            {
                return VkMap.TryGetValue(code, out var mapped) ? mapped : $"Key({code})";
            }

            string lower = trimmed.ToLowerInvariant();
            return lower switch
            {
                "ctrl" or "control" or "rctrl" or "lctrl" => "Ctrl",
                "shift" or "rshift" or "lshift" => "Shift",
                "alt" or "ralt" or "lalt" => "Alt",
                "win" or "windows" or "rwin" or "lwin" => "Win",
                "backspace" => "Backspace",
                "enter" or "return" => "Enter",
                "escape" or "esc" => "Esc",
                "space" => "Space",
                "delete" or "del" => "Delete",
                "capslock" or "caps lock" => "Caps Lock",
                _ => trimmed
            };
        }

        /// <summary>
        /// Parses a raw key combination string and deduplicates redundant modifiers (e.g. "SHIFT + KEY(160)" -> ["Shift"]).
        /// </summary>
        /// <param name="rawCombo">Raw combined keystroke string.</param>
        /// <returns>Deduplicated list of normalized key parts.</returns>
        public static List<string> ParseKeyCombination(string? rawCombo)
        {
            if (string.IsNullOrWhiteSpace(rawCombo)) return new List<string>();

            var parts = rawCombo.Split('+', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
            var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var result = new List<string>();

            foreach (var p in parts)
            {
                string norm = NormalizeKeyPart(p);
                if (string.IsNullOrWhiteSpace(norm)) continue;
                if (seen.Add(norm))
                {
                    result.Add(norm);
                }
            }

            return result;
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

            var sortedKeys = keys.OrderBy(k => k.EpochMs).ToList();
            long totalActiveMs = activeSegments.Sum(s => Math.Max(0, s.EndEpochMs - s.StartEpochMs));

            // Map keystrokes to active timeline segments and compute relative offsets after gap trimming
            var activeKeys = new List<(long StartRelMs, long EpochMs, List<string> Parsed)>();
            foreach (var k in sortedKeys)
            {
                long prevActiveMs = 0;
                for (int i = 0; i < activeSegments.Count; i++)
                {
                    var seg = activeSegments[i];
                    if (k.EpochMs >= seg.StartEpochMs && k.EpochMs <= seg.EndEpochMs)
                    {
                        var parsed = ParseKeyCombination(k.KeyCombination);
                        if (parsed.Count > 0)
                        {
                            long startRelMs = prevActiveMs + (k.EpochMs - seg.StartEpochMs);
                            activeKeys.Add((startRelMs, k.EpochMs, parsed));
                        }
                        break;
                    }
                    prevActiveMs += Math.Max(0, seg.EndEpochMs - seg.StartEpochMs);
                }
            }

            if (activeKeys.Count == 0) return null;

            string srtPath = Path.Combine(Path.GetTempPath(), $"sub_{stationId}_{Guid.NewGuid():N}.srt");
            var sb = new StringBuilder();
            int index = 1;

            for (int i = 0; i < activeKeys.Count; i++)
            {
                var current = activeKeys[i];

                // Skip consecutive keystroke events within less than 50ms
                if (i + 1 < activeKeys.Count && (activeKeys[i + 1].EpochMs - current.EpochMs) < 50)
                {
                    continue;
                }

                long startRelMs = Math.Max(0, current.StartRelMs);
                long nextStartRelMs = (i + 1 < activeKeys.Count)
                    ? Math.Max(0, activeKeys[i + 1].StartRelMs)
                    : totalActiveMs;

                long endRelMs = Math.Min(startRelMs + 2000, nextStartRelMs);
                if (endRelMs <= startRelMs)
                {
                    endRelMs = startRelMs + 200;
                }
                endRelMs = Math.Min(totalActiveMs, endRelMs);

                string comboText = string.Join(" + ", current.Parsed);

                sb.AppendLine(index.ToString());
                sb.AppendLine($"{FormatSrtTimestamp(startRelMs)} --> {FormatSrtTimestamp(endRelMs)}");
                sb.AppendLine($"[ {comboText} ]");
                sb.AppendLine();
                index++;
            }

            if (index == 1) return null;

            await File.WriteAllTextAsync(srtPath, sb.ToString(), Encoding.UTF8, ct);
            return srtPath;
        }

        /// <summary>
        /// Generates an advanced ASS subtitle file featuring a tactical Keycaps HUD style (dark buttons with glowing cyan borders) adapted to video cut segments.
        /// Styled to precisely match the Studio UI player:
        /// - Distinct key badges with dark background (#160f0a)
        /// - Neon cyan glowing border (#00f0ff)
        /// - Soft cyan outer glow around key badges
        /// - Centered bold white Segoe UI text
        /// - Glowing cyan plus sign (+) between keys
        /// - Truncated display time when a new key event occurs to prevent vertical stacking
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

            var sortedKeys = keys.OrderBy(k => k.EpochMs).ToList();
            long totalActiveMs = activeSegments.Sum(s => Math.Max(0, s.EndEpochMs - s.StartEpochMs));

            // Map keystrokes to active timeline segments and compute relative offsets after gap trimming
            var activeKeys = new List<(long StartRelMs, long EpochMs, List<string> Parsed)>();
            foreach (var k in sortedKeys)
            {
                long prevActiveMs = 0;
                for (int i = 0; i < activeSegments.Count; i++)
                {
                    var seg = activeSegments[i];
                    if (k.EpochMs >= seg.StartEpochMs && k.EpochMs <= seg.EndEpochMs)
                    {
                        var parsed = ParseKeyCombination(k.KeyCombination);
                        if (parsed.Count > 0)
                        {
                            long startRelMs = prevActiveMs + (k.EpochMs - seg.StartEpochMs);
                            activeKeys.Add((startRelMs, k.EpochMs, parsed));
                        }
                        break;
                    }
                    prevActiveMs += Math.Max(0, seg.EndEpochMs - seg.StartEpochMs);
                }
            }

            if (activeKeys.Count == 0) return null;

            string assPath = Path.Combine(Path.GetTempPath(), $"badge_{stationId}_{Guid.NewGuid():N}.ass");
            var sb = new StringBuilder();

            // Script header, resolution and playback properties
            sb.AppendLine("[Script Info]");
            sb.AppendLine("Title: ITB Tactical Keycaps HUD");
            sb.AppendLine("ScriptType: v4.00+");
            sb.AppendLine("WrapStyle: 0");
            sb.AppendLine("ScaledBorderAndShadow: yes");
            sb.AppendLine("PlayResX: 1920");
            sb.AppendLine("PlayResY: 1080");
            sb.AppendLine();

            // Define Keycaps visual styles:
            // KeyCapHud: Soft outer glow around keys (OutlineColour = &H80FFF000), BorderStyle 3 with 24px blur
            // KeyBorder: Crisp neon cyan border (OutlineColour = &H00FFF000), BorderStyle 3 with 17px width
            // KeyBox: Dark keycap background (OutlineColour = &H00160F0A), bold white text (PrimaryColour = &H00FFFFFF), BorderStyle 3 (Box)
            // KeyPlus: Glowing cyan plus separator (+) between keys
            sb.AppendLine("[V4+ Styles]");
            sb.AppendLine("Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding");
            sb.AppendLine("Style: KeyCapHud, Segoe UI, 34, &H00FFFFFF, &H00000000, &H80FFF000, &H00000000, 1, 0, 0, 0, 100, 100, 2, 0, 3, 24, 0, 5, 10, 10, 10, 1");
            sb.AppendLine("Style: KeyBorder, Segoe UI, 34, &H00FFFFFF, &H00000000, &H00FFF000, &H00FFF000, 1, 0, 0, 0, 100, 100, 2, 0, 3, 17, 0, 5, 10, 10, 10, 1");
            sb.AppendLine("Style: KeyBox, Segoe UI, 34, &H00FFFFFF, &H00000000, &H00160F0A, &H00000000, 1, 0, 0, 0, 100, 100, 2, 0, 3, 14, 0, 5, 10, 10, 10, 1");
            sb.AppendLine("Style: KeyPlus, Segoe UI, 32, &H00FFF000, &H00000000, &H00000000, &H00000000, 1, 0, 0, 0, 100, 100, 1, 0, 1, 0, 0, 5, 10, 10, 10, 1");
            sb.AppendLine();

            sb.AppendLine("[Events]");
            sb.AppendLine("Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text");

            bool hasEntries = false;
            for (int i = 0; i < activeKeys.Count; i++)
            {
                var current = activeKeys[i];

                // Skip consecutive keystroke events within less than 50ms
                if (i + 1 < activeKeys.Count && (activeKeys[i + 1].EpochMs - current.EpochMs) < 50)
                {
                    continue;
                }

                long startRelMs = Math.Max(0, current.StartRelMs);
                long nextStartRelMs = (i + 1 < activeKeys.Count)
                    ? Math.Max(0, activeKeys[i + 1].StartRelMs)
                    : totalActiveMs;

                // Truncate display duration when a new keystroke occurs to prevent vertical text stacking
                long endRelMs = Math.Min(startRelMs + 2200, nextStartRelMs);
                if (endRelMs <= startRelMs)
                {
                    endRelMs = startRelMs + 200;
                }
                endRelMs = Math.Min(totalActiveMs, endRelMs);

                string startAss = FormatAssTimestamp(startRelMs);
                string endAss = FormatAssTimestamp(endRelMs);

                var partsGlow = current.Parsed.Select(p =>
                {
                    string u = p.ToUpperInvariant();
                    string pad = u.Length == 1 ? $"   {u}   " : $"  {u}  ";
                    return $"{{\\rKeyCapHud\\bord24\\3c&H80FFF000\\blur6}}{pad}";
                });

                var partsBorder = current.Parsed.Select(p =>
                {
                    string u = p.ToUpperInvariant();
                    string pad = u.Length == 1 ? $"   {u}   " : $"  {u}  ";
                    return $"{{\\rKeyBorder}}{pad}";
                });

                var partsBox = current.Parsed.Select(p =>
                {
                    string u = p.ToUpperInvariant();
                    string pad = u.Length == 1 ? $"   {u}   " : $"  {u}  ";
                    return $"{{\\rKeyBox}}{pad}";
                });

                string lineGlow = "{\\fad(80,200)}" + string.Join("{\\rKeyPlus\\alpha&HFF&}   +   ", partsGlow);
                string lineBorder = "{\\fad(80,200)}" + string.Join("{\\rKeyPlus\\alpha&HFF&}   +   ", partsBorder);
                string lineBox = "{\\fad(80,200)}" + string.Join("{\\rKeyPlus\\b1\\c&H00FFF000}   +   ", partsBox);

                sb.AppendLine($"Dialogue: 0,{startAss},{endAss},KeyCapHud,,0,0,0,,{lineGlow}");
                sb.AppendLine($"Dialogue: 1,{startAss},{endAss},KeyBorder,,0,0,0,,{lineBorder}");
                sb.AppendLine($"Dialogue: 2,{startAss},{endAss},KeyBox,,0,0,0,,{lineBox}");
                hasEntries = true;
            }

            if (!hasEntries) return null;

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