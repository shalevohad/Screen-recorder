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
            // עכבר ומקשי שליטה
            [1] = "LButton", [2] = "RButton", [3] = "Cancel", [4] = "MButton", [5] = "XButton1", [6] = "XButton2",
            [8] = "Backspace", [9] = "Tab", [12] = "Clear", [13] = "Enter",
            [16] = "Shift", [17] = "Ctrl", [18] = "Alt", [19] = "Pause", [20] = "Caps Lock", [27] = "Esc",
            [32] = "Space", [33] = "Page Up", [34] = "Page Down", [35] = "End", [36] = "Home",
            [37] = "Left", [38] = "Up", [39] = "Right", [40] = "Down",
            [41] = "Select", [42] = "Print", [43] = "Execute", [44] = "Print Screen", [45] = "Insert", [46] = "Delete", [47] = "Help",

            // ספרות עליונות (0-9)
            [48] = "0", [49] = "1", [50] = "2", [51] = "3", [52] = "4",
            [53] = "5", [54] = "6", [55] = "7", [56] = "8", [57] = "9",

            // אותיות לטיניות (A-Z)
            [65] = "A", [66] = "B", [67] = "C", [68] = "D", [69] = "E", [70] = "F",
            [71] = "G", [72] = "H", [73] = "I", [74] = "J", [75] = "K", [76] = "L",
            [77] = "M", [78] = "N", [79] = "O", [80] = "P", [81] = "Q", [82] = "R",
            [83] = "S", [84] = "T", [85] = "U", [86] = "V", [87] = "W", [88] = "X",
            [89] = "Y", [90] = "Z",

            // מערכת / Windows
            [91] = "Win", [92] = "RWin", [93] = "Apps", [95] = "Sleep",

            // Numpad
            [96] = "Num 0", [97] = "Num 1", [98] = "Num 2", [99] = "Num 3", [100] = "Num 4",
            [101] = "Num 5", [102] = "Num 6", [103] = "Num 7", [104] = "Num 8", [105] = "Num 9",
            [106] = "Num *", [107] = "Num +", [108] = "Separator", [109] = "Num -", [110] = "Num .", [111] = "Num /",

            // מקשי פונקציה (F1 - F24)
            [112] = "F1", [113] = "F2", [114] = "F3", [115] = "F4",
            [116] = "F5", [117] = "F6", [118] = "F7", [119] = "F8",
            [120] = "F9", [121] = "F10", [122] = "F11", [123] = "F12",
            [124] = "F13", [125] = "F14", [126] = "F15", [127] = "F16",
            [128] = "F17", [129] = "F18", [130] = "F19", [131] = "F20",
            [132] = "F21", [133] = "F22", [134] = "F23", [135] = "F24",

            // נעילות
            [144] = "Num Lock", [145] = "Scroll Lock",

            // מקשי Modifiers פרטניים
            [160] = "Shift", [161] = "RShift", [162] = "Ctrl", [163] = "RCtrl", [164] = "Alt", [165] = "RAlt",

            // מקשי דפדפן
            [166] = "Browser Back", [167] = "Browser Forward", [168] = "Browser Refresh",
            [169] = "Browser Stop", [170] = "Browser Search", [171] = "Browser Favorites", [172] = "Browser Home",

            // מקשי שליטה במדיה
            [173] = "Mute", [174] = "Vol -", [175] = "Vol +", [176] = "Next Track",
            [177] = "Prev Track", [178] = "Stop", [179] = "Play/Pause",
            [180] = "Mail", [181] = "Media Select", [182] = "App 1", [183] = "App 2",

            // מקשי פיסוק וסימנים מיוחדים (OEM)
            [186] = ";", [187] = "=", [188] = ",", [189] = "-", [190] = ".", [191] = "/", [192] = "`",
            [219] = "[", [220] = "\\", [221] = "]", [222] = "'", [226] = "\\"
        };

        private readonly IKeystrokeRepository _keystrokeRepository;

        public KeystrokeSrtGenerator(IKeystrokeRepository keystrokeRepository)
        {
            _keystrokeRepository = keystrokeRepository;
        }

        /// <summary>
        /// מנרמל מקש יחיד (תרגום קוד וירטואלי, טיפול ב-Modifiers)
        /// </summary>
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
        /// מפרק צירוף מקשים ומסיר כפילויות (למשל: SHIFT + KEY(160) -> ["Shift"])
        /// </summary>
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

        public async Task<string?> CreateSrtFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default)
        {
            var keys = await _keystrokeRepository.GetKeystrokesForWindowAsync(stationId, inEpochMs, outEpochMs);
            if (keys == null || keys.Count == 0) return null;

            var sortedKeys = keys.OrderBy(k => k.EpochMs).ToList();
            string srtPath = Path.Combine(Path.GetTempPath(), $"sub_{stationId}_{Guid.NewGuid():N}.srt");
            var sb = new StringBuilder();
            int index = 1;

            for (int i = 0; i < sortedKeys.Count; i++)
            {
                var k = sortedKeys[i];
                var parsed = ParseKeyCombination(k.KeyCombination);
                if (parsed.Count == 0) continue;

                if (i + 1 < sortedKeys.Count && (sortedKeys[i + 1].EpochMs - k.EpochMs) < 50)
                {
                    continue;
                }

                long startRelMs = Math.Max(0, k.EpochMs - inEpochMs);
                long nextStartRelMs = (i + 1 < sortedKeys.Count)
                    ? Math.Max(0, sortedKeys[i + 1].EpochMs - inEpochMs)
                    : outEpochMs - inEpochMs;

                long endRelMs = Math.Min(startRelMs + 2000, nextStartRelMs);
                if (endRelMs <= startRelMs)
                {
                    endRelMs = startRelMs + 200;
                }

                string comboText = string.Join(" + ", parsed);

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
        /// 💡 מייצר קובץ ASS מתקדם עם סגנון Keycaps טקטי (כפתורים כהים עם מסגרת ציאן זוהרת)
        /// מעוצב במדויק כמו נגן הסטודיו (Studio UI):
        /// - תגיות מקשים מובחנות עם רקע כהה (#160f0a)
        /// - מסגרת ניאון ציאן זוהרת (#00f0ff)
        /// - הילת ציאן רכה סביב המקשים
        /// - טקסט Segoe UI לבן עבה וממורכז
        /// - סימן פלוס (+) ציאן זוהר בין המקשים
        /// - חיתוך זמן מול הלחיצה הבאה למניעת ערימות אנכיות של שורות
        /// </summary>
        public async Task<string?> CreateAssKeycapsFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default)
        {
            var keys = await _keystrokeRepository.GetKeystrokesForWindowAsync(stationId, inEpochMs, outEpochMs);
            if (keys == null || keys.Count == 0) return null;

            var sortedKeys = keys.OrderBy(k => k.EpochMs).ToList();
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

            // הגדרת סגנונות ה-Keycaps:
            // KeyBox: רקע המקש הכהה (OutlineColour = &H00160F0A), טקסט לבן בולט (PrimaryColour = &H00FFFFFF), BorderStyle 3 (Box)
            // KeyBorder: מסגרת ניאון ציאן חדה (OutlineColour = &H00FFF000), BorderStyle 3 בעובי 17px
            // KeyGlow: הילה זוהרת רכה מסביב (OutlineColour = &H80FFF000), BorderStyle 3 בעובי 24px עם blur
            // KeyPlus: סימן הפלוס בין המקשים בצבע ציאן זוהר
            sb.AppendLine("[V4+ Styles]");
            sb.AppendLine("Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding");
            sb.AppendLine("Style: KeyBox, Segoe UI, 34, &H00FFFFFF, &H00000000, &H00160F0A, &H00000000, 1, 0, 0, 0, 100, 100, 2, 0, 3, 14, 0, 5, 10, 10, 10, 1");
            sb.AppendLine("Style: KeyBorder, Segoe UI, 34, &H00FFFFFF, &H00000000, &H00FFF000, &H00FFF000, 1, 0, 0, 0, 100, 100, 2, 0, 3, 17, 0, 5, 10, 10, 10, 1");
            sb.AppendLine("Style: KeyGlow, Segoe UI, 34, &H00FFFFFF, &H00000000, &H80FFF000, &H00000000, 1, 0, 0, 0, 100, 100, 2, 0, 3, 24, 0, 5, 10, 10, 10, 1");
            sb.AppendLine("Style: KeyPlus, Segoe UI, 32, &H00FFF000, &H00000000, &H00000000, &H00000000, 1, 0, 0, 0, 100, 100, 1, 0, 1, 0, 0, 5, 10, 10, 10, 1");
            sb.AppendLine();

            sb.AppendLine("[Events]");
            sb.AppendLine("Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text");

            bool hasEntries = false;
            for (int i = 0; i < sortedKeys.Count; i++)
            {
                var k = sortedKeys[i];
                var parsed = ParseKeyCombination(k.KeyCombination);
                if (parsed.Count == 0) continue;

                // דילוג על אירועי מקשים רצופים תוך פחות מ-50ms
                if (i + 1 < sortedKeys.Count && (sortedKeys[i + 1].EpochMs - k.EpochMs) < 50)
                {
                    continue;
                }

                long startRelMs = Math.Max(0, k.EpochMs - inEpochMs);
                long nextStartRelMs = (i + 1 < sortedKeys.Count)
                    ? Math.Max(0, sortedKeys[i + 1].EpochMs - inEpochMs)
                    : outEpochMs - inEpochMs;

                // משך התצוגה נחתך כשיש לחיצה חדשה (מונע ערימות שורות אנכיות כמו בתמונה הראשונה)
                long endRelMs = Math.Min(startRelMs + 2200, nextStartRelMs);
                if (endRelMs <= startRelMs)
                {
                    endRelMs = startRelMs + 200;
                }

                string startAss = FormatAssTimestamp(startRelMs);
                string endAss = FormatAssTimestamp(endRelMs);

                var partsGlow = parsed.Select(p =>
                {
                    string u = p.ToUpperInvariant();
                    string pad = u.Length == 1 ? $"   {u}   " : $"  {u}  ";
                    return $"{{\\rKeyGlow\\bord24\\3c&H80FFF000\\blur6}}{pad}";
                });

                var partsBorder = parsed.Select(p =>
                {
                    string u = p.ToUpperInvariant();
                    string pad = u.Length == 1 ? $"   {u}   " : $"  {u}  ";
                    return $"{{\\rKeyBorder}}{pad}";
                });

                var partsBox = parsed.Select(p =>
                {
                    string u = p.ToUpperInvariant();
                    string pad = u.Length == 1 ? $"   {u}   " : $"  {u}  ";
                    return $"{{\\rKeyBox}}{pad}";
                });

                string lineGlow = "{\\fad(80,200)}" + string.Join("{\\rKeyPlus\\alpha&HFF&}   +   ", partsGlow);
                string lineBorder = "{\\fad(80,200)}" + string.Join("{\\rKeyPlus\\alpha&HFF&}   +   ", partsBorder);
                string lineBox = "{\\fad(80,200)}" + string.Join("{\\rKeyPlus\\b1\\c&H00FFF000}   +   ", partsBox);

                sb.AppendLine($"Dialogue: 0,{startAss},{endAss},KeyGlow,,0,0,0,,{lineGlow}");
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