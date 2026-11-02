using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;

namespace ITB_SCREEN_RECORDER.Player.Core.Presentation;

public sealed class MasterVideoExportService : IMasterVideoExportService
{
    private static readonly Regex TimeRegex = new(@"time=(\d{2}):(\d{2}):(\d{2}\.\d+)", RegexOptions.Compiled);

    public async Task ExportMasterVideoAsync(
        ITarVirtualFileSystem tarFs,
        PresentationDirectorPlan plan,
        string outputFilePath,
        IProgress<(double ProgressPercent, string StatusMessage)>? progress = null,
        CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(tarFs);
        ArgumentNullException.ThrowIfNull(plan);
        ArgumentException.ThrowIfNullOrWhiteSpace(outputFilePath);

        var manifest = tarFs.Manifest ?? throw new InvalidOperationException("Session manifest is not loaded.");
        if (manifest.Tracks.Count == 0)
        {
            throw new InvalidOperationException("No video tracks found in session package.");
        }

        string ffmpegPath = ResolveFfmpeg();
        double totalDuration = manifest.ExportedDurationSeconds > 0 ? manifest.ExportedDurationSeconds : 1.0;

        string stagingDir = Path.Combine(Path.GetTempPath(), "ITB_MasterExport_" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(stagingDir);

        try
        {
            progress?.Report((5.0, "Extracting synchronized video tracks..."));

            // Determine which tracks are required
            var requiredTrackIndices = new HashSet<int>();
            if (plan.Cues.Count > 0)
            {
                foreach (var cue in plan.Cues)
                {
                    if (cue.TargetTrackIndex >= 0 && cue.TargetTrackIndex < manifest.Tracks.Count)
                    {
                        requiredTrackIndices.Add(cue.TargetTrackIndex);
                    }
                }
            }

            // Always ensure at least the hero track or primary director track is included
            int fallbackTrackIdx = plan.InitialHeroTrackIndex >= 0 && plan.InitialHeroTrackIndex < manifest.Tracks.Count
                ? plan.InitialHeroTrackIndex
                : (manifest.Tracks.FindIndex(t => t.IsDirectorCut) is int dIdx && dIdx >= 0 ? dIdx : 0);

            requiredTrackIndices.Add(fallbackTrackIdx);

            var localTrackFiles = new Dictionary<int, string>();
            int extractedCount = 0;
            foreach (int tIdx in requiredTrackIndices)
            {
                ct.ThrowIfCancellationRequested();
                var trackInfo = manifest.Tracks[tIdx];
                string destPath = Path.Combine(stagingDir, $"track_{tIdx}.mp4");

                // In manifest, VideoFileName may be "recordings/xyz.mp4" or "xyz.mp4"
                string entryName = trackInfo.VideoFileName;
                if (!tarFs.TryGetEntry(entryName, out _) && !entryName.StartsWith("recordings/", StringComparison.OrdinalIgnoreCase))
                {
                    entryName = $"recordings/{entryName}";
                }

                await tarFs.ExtractEntryToFileAsync(entryName, destPath, ct).ConfigureAwait(false);
                localTrackFiles[tIdx] = destPath;
                extractedCount++;

                double extractPct = 5.0 + (((double)extractedCount / requiredTrackIndices.Count) * 20.0);
                progress?.Report((extractPct, $"Extracted track {extractedCount} of {requiredTrackIndices.Count}..."));
            }

            // Ensure destination directory exists
            var outDir = Path.GetDirectoryName(outputFilePath);
            if (!string.IsNullOrEmpty(outDir) && !Directory.Exists(outDir))
            {
                Directory.CreateDirectory(outDir);
            }

            string ffmpegArgs;
            string? manifestFile = null;

            // Build presentation switching timeline if cues are present
            if (plan.Cues.Count > 0 && localTrackFiles.Count > 0)
            {
                var sortedCues = plan.Cues
                    .Where(c => c.OffsetSeconds >= 0 && c.OffsetSeconds < totalDuration)
                    .OrderBy(c => c.OffsetSeconds)
                    .ToList();

                var concatLines = new List<string> { "ffconcat version 1.0" };
                double currentOffset = 0.0;
                int currentTrack = fallbackTrackIdx;

                foreach (var cue in sortedCues)
                {
                    if (cue.OffsetSeconds > currentOffset + 0.05)
                    {
                        if (localTrackFiles.TryGetValue(currentTrack, out var trackPath) && File.Exists(trackPath))
                        {
                            concatLines.Add($"file '{trackPath.Replace('\\', '/')}'");
                            concatLines.Add(string.Format(CultureInfo.InvariantCulture, "inpoint {0:F3}", currentOffset));
                            concatLines.Add(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", cue.OffsetSeconds));
                        }
                        currentOffset = cue.OffsetSeconds;
                    }

                    if (cue.TargetTrackIndex >= 0 && localTrackFiles.ContainsKey(cue.TargetTrackIndex))
                    {
                        currentTrack = cue.TargetTrackIndex;
                    }
                }

                // Add trailing segment to end of timeline
                if (currentOffset < totalDuration - 0.05)
                {
                    if (localTrackFiles.TryGetValue(currentTrack, out var trackPath) && File.Exists(trackPath))
                    {
                        concatLines.Add($"file '{trackPath.Replace('\\', '/')}'");
                        concatLines.Add(string.Format(CultureInfo.InvariantCulture, "inpoint {0:F3}", currentOffset));
                        concatLines.Add(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", totalDuration));
                    }
                }

                manifestFile = Path.Combine(stagingDir, "concat_director.txt");
                await File.WriteAllLinesAsync(manifestFile, concatLines, new UTF8Encoding(false), ct).ConfigureAwait(false);

                ffmpegArgs = $"-f concat -safe 0 -i \"{manifestFile.Replace('\\', '/')}\" -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 192k -movflags +faststart -y \"{outputFilePath}\"";
            }
            else
            {
                // Single consolidated hero track export
                string singleTrack = localTrackFiles[fallbackTrackIdx];
                ffmpegArgs = $"-i \"{singleTrack.Replace('\\', '/')}\" -c:v copy -c:a copy -movflags +faststart -y \"{outputFilePath}\"";
            }

            progress?.Report((25.0, "Rendering master presentation video (FFmpeg)..."));

            var psi = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = ffmpegArgs,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = psi };
            process.Start();

            var errorReader = Task.Run(async () =>
            {
                using var reader = process.StandardError;
                string? line;
                while ((line = await reader.ReadLineAsync(ct).ConfigureAwait(false)) != null)
                {
                    var match = TimeRegex.Match(line);
                    if (match.Success)
                    {
                        if (double.TryParse(match.Groups[1].Value, CultureInfo.InvariantCulture, out double h) &&
                            double.TryParse(match.Groups[2].Value, CultureInfo.InvariantCulture, out double m) &&
                            double.TryParse(match.Groups[3].Value, CultureInfo.InvariantCulture, out double s))
                        {
                            double currentProcessedSec = (h * 3600) + (m * 60) + s;
                            double pct = Math.Clamp(25.0 + ((currentProcessedSec / totalDuration) * 72.0), 25.0, 98.0);
                            progress?.Report((pct, $"Rendering: {pct:0}% ({currentProcessedSec:0.0}s / {totalDuration:0.0}s)..."));
                        }
                    }
                }
            }, ct);

            await process.WaitForExitAsync(ct).ConfigureAwait(false);
            await errorReader.ConfigureAwait(false);

            if (process.ExitCode != 0)
            {
                throw new InvalidOperationException($"FFmpeg master export failed with exit code {process.ExitCode}");
            }

            progress?.Report((100.0, "Master presentation export complete!"));
        }
        finally
        {
            try
            {
                if (Directory.Exists(stagingDir))
                {
                    Directory.Delete(stagingDir, true);
                }
            }
            catch
            {
                // Non-critical temp cleanup
            }
        }
    }

    private static string ResolveFfmpeg()
    {
        string binName = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";

        var candidates = new[]
        {
            Path.Combine(AppContext.BaseDirectory, binName),
            Path.Combine(AppContext.BaseDirectory, "Assets", binName),
            Path.Combine(AppContext.BaseDirectory, "..", "..", "Server", "MediaMTX", binName),
            Path.Combine(AppContext.BaseDirectory, "bin", binName),
            Path.Combine(Directory.GetCurrentDirectory(), binName),
            Path.Combine(Directory.GetCurrentDirectory(), "Tools", binName)
        };

        foreach (var c in candidates)
        {
            if (File.Exists(c)) return c;
        }

        // Search PATH environment variable
        var pathEnv = Environment.GetEnvironmentVariable("PATH") ?? string.Empty;
        var paths = pathEnv.Split(Path.PathSeparator, StringSplitOptions.RemoveEmptyEntries);
        foreach (var p in paths)
        {
            string full = Path.Combine(p.Trim(), binName);
            if (File.Exists(full)) return full;
        }

        // Return binName for OS execution
        return binName;
    }
}
