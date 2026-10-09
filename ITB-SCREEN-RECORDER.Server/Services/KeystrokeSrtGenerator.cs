using System;
using System.IO;
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

        public async Task<string?> CreateSrtFileAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default)
        {
            var keys = await _keystrokeRepository.GetKeystrokesForWindowAsync(stationId, inEpochMs, outEpochMs);
            if (keys == null || keys.Count == 0) return null;

            string srtPath = Path.Combine(Path.GetTempPath(), $"sub_{stationId}_{Guid.NewGuid():N}.srt");
            var sb = new StringBuilder();
            int index = 1;

            foreach (var k in keys)
            {
                long startRelMs = Math.Max(0, k.EpochMs - inEpochMs);
                long endRelMs = Math.Min(outEpochMs - inEpochMs, startRelMs + 2000);

                sb.AppendLine(index.ToString());
                sb.AppendLine($"{FormatSrtTimestamp(startRelMs)} --> {FormatSrtTimestamp(endRelMs)}");
                sb.AppendLine($"[ {k.KeyCombination} ]");
                sb.AppendLine();
                index++;
            }

            await File.WriteAllTextAsync(srtPath, sb.ToString(), Encoding.UTF8, ct);
            return srtPath;
        }

        private static string FormatSrtTimestamp(long ms)
        {
            var ts = TimeSpan.FromMilliseconds(ms);
            return $"{(int)ts.TotalHours:D2}:{ts.Minutes:D2}:{ts.Seconds:D2},{ts.Milliseconds:D3}";
        }
    }
}