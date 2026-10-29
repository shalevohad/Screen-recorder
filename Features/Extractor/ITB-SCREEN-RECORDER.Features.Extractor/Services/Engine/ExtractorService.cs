// ==========================================
// File: Features/Extractor/Services/ExtractorService.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Formats.Tar;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class ExtractorService : IExtractorService
    {
        protected readonly IStorageScannerService _storageScanner;
        protected readonly IFfmpegConcatRunner _ffmpegRunner;
        protected readonly IKeystrokeSrtGenerator? _srtGenerator;
        protected readonly ISynchronizedTrackCutter? _trackCutter;
        protected readonly ISynchronizationPlanBuilder? _planBuilder;
        protected readonly ExtractorOptions _options;
        protected readonly ILogger _logger;

        protected readonly SemaphoreSlim _concurrencyThrottle;
        protected readonly SemaphoreSlim _visualConcurrencyThrottle;

        protected static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };

        public ExtractorService(
            IStorageScannerService storageScanner,
            IFfmpegConcatRunner ffmpegRunner,
            IOptions<ExtractorOptions> extractorOptions,
            ILogger<ExtractorService> logger,
            IKeystrokeSrtGenerator? srtGenerator = null,
            ISynchronizedTrackCutter? trackCutter = null,
            ISynchronizationPlanBuilder? planBuilder = null)
        {
            _storageScanner = storageScanner;
            _ffmpegRunner = ffmpegRunner;
            _options = extractorOptions.Value;
            _logger = logger;
            _srtGenerator = srtGenerator;
            _trackCutter = trackCutter;
            _planBuilder = planBuilder;

            int maxConcurrency = _options.MaxConcurrentFfmpegProcesses > 0
                ? _options.MaxConcurrentFfmpegProcesses
                : 2;
            _concurrencyThrottle = new SemaphoreSlim(maxConcurrency, maxConcurrency);

            int maxVisualConcurrency = Math.Max(4, Environment.ProcessorCount * 2);
            _visualConcurrencyThrottle = new SemaphoreSlim(maxVisualConcurrency, maxVisualConcurrency);
        }

        public virtual async Task<ExtractionPreviewResponseDto> GetPreviewAsync(ExtractionRequestDto request)
        {
            var preview = new ExtractionPreviewResponseDto
            {
                TotalDuration = request.EndTimeUtc - request.StartTimeUtc
            };

            foreach (var hostname in request.Hostnames)
            {
                var chunks = await _storageScanner.GetChunksForStationAsync(hostname, request.StartTimeUtc, request.EndTimeUtc);
                var gaps = new List<TimeGapDto>();

                for (int i = 0; i < chunks.Count - 1; i++)
                {
                    var current = chunks[i];
                    var next = chunks[i + 1];

                    if (next.StartUtc - current.EndUtc > TimeSpan.FromSeconds(1))
                    {
                        gaps.Add(new TimeGapDto
                        {
                            ExpectedUtc = current.EndUtc,
                            ActualNextStartUtc = next.StartUtc
                        });
                    }
                }

                long totalBytes = chunks.Sum(c => c.FileSizeBytes);
                preview.Stations.Add(new StationCoverageDto
                {
                    Hostname = hostname,
                    ChunkCount = chunks.Count,
                    TotalSizeBytes = totalBytes,
                    HasTimeGaps = gaps.Count > 0,
                    Gaps = gaps
                });

                preview.TotalChunkCount += chunks.Count;
                preview.EstimatedTotalSizeBytes += totalBytes;
            }

            preview.TotalHostCount = preview.Stations.Count;
            return preview;
        }

        public virtual Task StreamTarArchiveAsync(ExtractionRequestDto request, Stream destinationStream, CancellationToken ct) =>
            StreamTarArchiveAsync(request, destinationStream, null, ct);

        public virtual async Task StreamTarArchiveAsync(
            ExtractionRequestDto request,
            Stream destinationStream,
            IProgress<(int Percent, string Message, double SpeedMBps, int EtaSeconds)>? progress,
            CancellationToken ct)
        {
            ArgumentNullException.ThrowIfNull(request);
            ArgumentNullException.ThrowIfNull(destinationStream);

            string stagingDir = Path.Combine(Path.GetTempPath(), $"extractor_staging_{Guid.NewGuid():N}");
            Directory.CreateDirectory(stagingDir);

            progress?.Report((2, "Preparing synchronization plan...", 0, 0));

            await _concurrencyThrottle.WaitAsync(ct);
            try
            {
                var allStationChunks = new Dictionary<string, List<RecordingChunkMetadata>>();
                foreach (var host in request.Hostnames)
                {
                    ct.ThrowIfCancellationRequested();
                    var chunks = await _storageScanner.GetChunksForStationAsync(host, request.StartTimeUtc, request.EndTimeUtc);
                    allStationChunks[host] = chunks;
                }

                SynchronizationPlan plan;
                if (_planBuilder != null)
                {
                    plan = _planBuilder.BuildSynchronizationPlan(
                        request.Hostnames.ToList(), request.StartTimeUtc, request.EndTimeUtc, allStationChunks);
                }
                else
                {
                    plan = new SynchronizationPlan
                    {
                        ActiveSegments = new List<TimeInterval>
                        {
                            new TimeInterval { StartUtc = request.StartTimeUtc, EndUtc = request.EndTimeUtc }
                        }
                    };
                }

                plan.KeystrokeMode = request.KeystrokeMode;
                plan.LayoutMode = request.LayoutMode;
                plan.TargetDisplayId = request.TargetDisplayId;
                plan.IsPipSwapped = request.IsPipSwapped;
                plan.DirectorSegments = request.DirectorSegments;

                double originalDurationSec = Math.Max(1.0, (request.EndTimeUtc - request.StartTimeUtc).TotalSeconds);
                double exportedDurationSec = Math.Max(1.0, plan.TotalActiveSeconds);

                var generatedTracks = new List<(string StationId, string FilePath, bool HasAudio)>();
                bool isMultiStation = request.Hostnames.Count > 1;

                int hostCount = request.Hostnames.Count;
                double slicePerHost = 80.0 / Math.Max(1, hostCount);

                for (int i = 0; i < hostCount; i++)
                {
                    ct.ThrowIfCancellationRequested();
                    var host = request.Hostnames[i];
                    var chunks = allStationChunks[host];
                    double basePct = 3.0 + (i * slicePerHost);

                    if (_trackCutter != null)
                    {
                        var stationProgress = new Progress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>(p =>
                        {
                            double fraction = Math.Clamp(p.SecondsProcessed / Math.Max(0.1, exportedDurationSec), 0.0, 1.0);
                            int pct = (int)Math.Clamp(Math.Round(basePct + fraction * slicePerHost, 0), 2, 84);
                            double effectiveSpeed = Math.Max(0.2, p.SpeedMultiplier);
                            double remSec = (Math.Max(0, exportedDurationSec - p.SecondsProcessed) / effectiveSpeed)
                                          + ((hostCount - 1 - i) * (exportedDurationSec / effectiveSpeed));
                            progress?.Report((pct, $"Rendering station {i + 1}/{hostCount} ({host}): {p.Fps:0} fps", 0, (int)Math.Round(remSec, 0)));
                        });

                        var trackResult = await _trackCutter.CutSynchronizedTrackAsync(
                            host, plan, chunks, stagingDir, isMultiStation, stationProgress, ct);

                        generatedTracks.Add((host, trackResult.OutputFilePath, trackResult.HasAudio));
                    }
                    else
                    {
                        string tempSpool = Path.Combine(stagingDir, $"{host}_{request.StartTimeUtc:yyyyMMdd_HHmmss}.mp4");
                        string concatManifest = await _storageScanner.BuildConcatManifestAsync(chunks, request.StartTimeUtc, request.EndTimeUtc);

                        await using (var fs = new FileStream(tempSpool, FileMode.Create, FileAccess.Write, FileShare.None))
                        {
                            await _ffmpegRunner.ExecuteStreamCopyAsync(concatManifest, fs, ct);
                        }
                        generatedTracks.Add((host, tempSpool, true));
                    }
                }

                progress?.Report((85, "Bundling synchronized archive (Tar)...", 0, 2));

                await using var tarWriter = new TarWriter(destinationStream, TarEntryFormat.Pax, leaveOpen: true);
                var sessionTracks = new List<SessionTrackInfo>();

                for (int k = 0; k < generatedTracks.Count; k++)
                {
                    var track = generatedTracks[k];
                    if (!File.Exists(track.FilePath)) continue;

                    int tarPct = (int)Math.Round(85.0 + (((k + 1.0) / generatedTracks.Count) * 12.0), 0);
                    progress?.Report((tarPct, $"Packaging archive entry: {Path.GetFileName(track.FilePath)}...", 0, 1));

                    string entryName = $"recordings/{Path.GetFileName(track.FilePath)}";
                    await using (var trackStream = new FileStream(track.FilePath, FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        var tarEntry = new PaxTarEntry(TarEntryType.RegularFile, entryName)
                        {
                            DataStream = trackStream
                        };
                        await tarWriter.WriteEntryAsync(tarEntry, ct);
                    }

                    sessionTracks.Add(new SessionTrackInfo
                    {
                        Hostname = track.StationId,
                        VideoFileName = entryName,
                        StartOffsetMs = 0,
                        DurationMs = exportedDurationSec * 1000.0,
                        HasAudio = track.HasAudio
                    });
                }

                var sessionManifestObj = new
                {
                    sessionId = Guid.NewGuid().ToString("N"),
                    rangeStartUtc = request.StartTimeUtc,
                    rangeEndUtc = request.EndTimeUtc,
                    keystrokeMode = request.KeystrokeMode.ToString(),
                    originalDurationSeconds = originalDurationSec,
                    exportedDurationSeconds = exportedDurationSec,
                    removedGlobalGaps = plan.RemovedGlobalGaps.Select(g => new
                    {
                        gapIndex = g.GapIndex,
                        startUtc = g.StartUtc,
                        endUtc = g.EndUtc,
                        skippedDurationSeconds = g.SkippedDurationSeconds,
                        timelineOffsetSeconds = g.TimelineOffsetSeconds
                    }),
                    stationGaps = plan.StationGaps.Select(g => new
                    {
                        stationId = g.StationId,
                        startUtc = g.StartUtc,
                        endUtc = g.EndUtc,
                        durationSeconds = g.DurationSeconds,
                        bridgeType = "NoSignal"
                    }),
                    tracks = sessionTracks
                };

                byte[] manifestBytes = JsonSerializer.SerializeToUtf8Bytes(sessionManifestObj, JsonOptions);
                await using var manifestMs = new MemoryStream(manifestBytes);
                var manifestEntry = new PaxTarEntry(TarEntryType.RegularFile, "session.json")
                {
                    DataStream = manifestMs
                };
                await tarWriter.WriteEntryAsync(manifestEntry, ct);

                _logger.LogInformation("[EXTRACTOR] Successfully completed Synchronized TAR stream for {Count} stations.", request.Hostnames.Count);
            }
            finally
            {
                _concurrencyThrottle.Release();
                if (Directory.Exists(stagingDir))
                {
                    try { Directory.Delete(stagingDir, true); } catch { }
                }
            }
        }

        public virtual async Task<string> CutSegmentAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default)
        {
            return await CutSegmentWithModeAsync(stationId, inEpochMs, outEpochMs, KeystrokeExportMode.BurnIn, ct);
        }

        public virtual async Task<string> CutSegmentWithModeAsync(string stationId, long inEpochMs, long outEpochMs, KeystrokeExportMode keystrokeMode, CancellationToken ct = default)
        {
            if (outEpochMs <= inEpochMs)
            {
                throw new ArgumentException("Out-point must be strictly greater than In-point.");
            }

            DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(inEpochMs).UtcDateTime;
            DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(outEpochMs).UtcDateTime;

            var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);
            if (chunks == null || chunks.Count == 0)
            {
                throw new FileNotFoundException($"No video recordings found for station '{stationId}' between {startUtc:yyyy-MM-dd HH:mm:ss} UTC and {endUtc:yyyy-MM-dd HH:mm:ss} UTC.");
            }

            string exportDir = !string.IsNullOrWhiteSpace(_options.ExportPath)
                ? _options.ExportPath
                : Path.Combine(AppContext.BaseDirectory, "Exports");
            Directory.CreateDirectory(exportDir);

            if (_trackCutter != null && _planBuilder != null)
            {
                var dict = new Dictionary<string, List<RecordingChunkMetadata>> { [stationId] = chunks };
                // Pass List<string> for single station synchronization plan
                var plan = _planBuilder.BuildSynchronizationPlan(new List<string> { stationId }, startUtc, endUtc, dict);
                plan.KeystrokeMode = keystrokeMode;

                var result = await _trackCutter.CutSynchronizedTrackAsync(stationId, plan, chunks, exportDir, false, null, ct);
                return result.OutputFilePath;
            }

            string concatManifest = await _storageScanner.BuildConcatManifestAsync(chunks, startUtc, endUtc);
            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"cut_{stationId}_{Guid.NewGuid():N}.txt");
            await File.WriteAllTextAsync(tempManifestPath, concatManifest, new UTF8Encoding(false), ct);

            string outputFileName = $"CUT_{stationId}_{startUtc:yyyyMMdd_HHmmss}_{endUtc:HHmmss}.mp4";
            string outputPath = Path.Combine(exportDir, outputFileName);
            double durationSeconds = (endUtc - startUtc).TotalSeconds;
            string ffmpegPath = ResolveFfmpegBinary();

            string arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-t {durationSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                               $"-c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k -movflags +faststart -y \"{outputPath.Replace('\\', '/')}\"";

            await _concurrencyThrottle.WaitAsync(ct);
            using var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = arguments,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            try
            {
                process.Start();
                string errorOutput = await process.StandardError.ReadToEndAsync(ct);
                await process.WaitForExitAsync(ct);

                if (process.ExitCode != 0)
                {
                    throw new InvalidOperationException($"FFmpeg export failed with exit code {process.ExitCode}: {errorOutput}");
                }

                return outputPath;
            }
            finally
            {
                _concurrencyThrottle.Release();
                if (File.Exists(tempManifestPath)) try { File.Delete(tempManifestPath); } catch { }
            }
        }

        protected virtual string ResolveFfmpegBinary()
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";
            if (!string.IsNullOrWhiteSpace(_options.FfmpegPath) && File.Exists(_options.FfmpegPath))
            {
                return _options.FfmpegPath;
            }
            return binaryName;
        }
    }
}