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
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class ExtractorService : IExtractorService
    {
        protected readonly IStorageScannerService _storageScanner;
        protected readonly IFfmpegConcatRunner _ffmpegRunner;
        protected readonly ExtractorOptions _options;
        protected readonly ILogger _logger;

        // תור לפעולות יצוא כבדות (Smart Cut / -c copy)
        protected readonly SemaphoreSlim _concurrencyThrottle;

        // תור נפרד לפעולות ויזואליות קלות (Spritesheets / Thumbnails)
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
            ILogger<ExtractorService> logger)
        {
            _storageScanner = storageScanner;
            _ffmpegRunner = ffmpegRunner;
            _options = extractorOptions.Value;
            _logger = logger;

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

                    if (next.StartUtc - current.EndUtc > TimeSpan.FromSeconds(5))
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

        public virtual async Task StreamTarArchiveAsync(ExtractionRequestDto request, Stream destinationStream, CancellationToken ct)
        {
            ArgumentNullException.ThrowIfNull(request);
            ArgumentNullException.ThrowIfNull(destinationStream);

            var sessionManifest = new SessionManifest
            {
                RangeStartUtc = request.StartTimeUtc,
                RangeEndUtc = request.EndTimeUtc
            };

            await using var tarWriter = new TarWriter(destinationStream, TarEntryFormat.Pax, leaveOpen: true);

            foreach (var hostname in request.Hostnames)
            {
                ct.ThrowIfCancellationRequested();

                var chunks = await _storageScanner.GetChunksForStationAsync(hostname, request.StartTimeUtc, request.EndTimeUtc);
                if (chunks.Count == 0)
                {
                    _logger.LogInformation("No chunks found for host {Host} in requested range", hostname);
                    continue;
                }

                string videoEntryName = $"recordings/{hostname}_{request.StartTimeUtc:yyyyMMdd_HHmmss}.mp4";
                string tempSpoolFile = Path.Combine(Path.GetTempPath(), $"itb_spool_{hostname}_{Guid.NewGuid():N}.mp4");

                await _concurrencyThrottle.WaitAsync(ct);
                try
                {
                    string concatManifest = await _storageScanner.BuildConcatManifestAsync(chunks, request.StartTimeUtc, request.EndTimeUtc);

                    await using (var spoolStream = new FileStream(
                        tempSpoolFile,
                        FileMode.Create,
                        FileAccess.ReadWrite,
                        FileShare.None,
                        bufferSize: 81920))
                    {
                        await _ffmpegRunner.ExecuteStreamCopyAsync(concatManifest, spoolStream, ct);
                        await spoolStream.FlushAsync(ct);

                        if (spoolStream.Length == 0)
                        {
                            _logger.LogWarning("Concatenated video stream for host {Host} is empty. Skipping entry.", hostname);
                            continue;
                        }

                        spoolStream.Position = 0;

                        var entry = new PaxTarEntry(TarEntryType.RegularFile, videoEntryName)
                        {
                            DataStream = spoolStream
                        };

                        await tarWriter.WriteEntryAsync(entry, ct);
                    }

                    sessionManifest.Tracks.Add(new SessionTrackInfo
                    {
                        Hostname = hostname,
                        VideoFileName = videoEntryName,
                        StartOffsetMs = 0,
                        DurationMs = (request.EndTimeUtc - request.StartTimeUtc).TotalMilliseconds,
                        HasAudio = true
                    });
                }
                finally
                {
                    _concurrencyThrottle.Release();

                    if (File.Exists(tempSpoolFile))
                    {
                        try { File.Delete(tempSpoolFile); } catch { }
                    }
                }
            }

            byte[] manifestBytes = JsonSerializer.SerializeToUtf8Bytes(sessionManifest, JsonOptions);
            await using var manifestMemoryStream = new MemoryStream(manifestBytes);

            var manifestEntry = new PaxTarEntry(TarEntryType.RegularFile, "session.json")
            {
                DataStream = manifestMemoryStream
            };

            await tarWriter.WriteEntryAsync(manifestEntry, ct);
            _logger.LogInformation("Successfully completed TAR stream for session {SessionId}", sessionManifest.SessionId);
        }

        /// <summary>
        /// מנוע הליבה לחיתוך מקטע וידאו מדויק (Smart Cut) מבוסס UTC Epoch
        /// </summary>
        public virtual async Task<string> CutSegmentAsync(string stationId, long inEpochMs, long outEpochMs, CancellationToken ct = default)
        {
            if (outEpochMs <= inEpochMs)
            {
                throw new ArgumentException("Out-point must be strictly greater than In-point.");
            }

            // 1. המרה לזמני UTC מוחלטים
            DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(inEpochMs).UtcDateTime;
            DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(outEpochMs).UtcDateTime;

            // 2. איתור כל ה-Chunks בדיסק דרך סורק האחסון של המערכת
            var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);
            if (chunks == null || chunks.Count == 0)
            {
                throw new FileNotFoundException($"No video recordings found for station '{stationId}' between {startUtc:yyyy-MM-dd HH:mm:ss} UTC and {endUtc:yyyy-MM-dd HH:mm:ss} UTC.");
            }

            // 3. בניית מניפסט ה-Concat
            string concatManifest = await _storageScanner.BuildConcatManifestAsync(chunks, startUtc, endUtc);
            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"cut_{stationId}_{Guid.NewGuid():N}.txt");
            await File.WriteAllTextAsync(tempManifestPath, concatManifest, new UTF8Encoding(false), ct);

            // 4. יצירת תיקיית יעד מתוך הגדרות הקונפיגורציה
            string exportDir = !string.IsNullOrWhiteSpace(_options.ExportPath)
                ? _options.ExportPath
                : Path.Combine(AppContext.BaseDirectory, "Exports");
            Directory.CreateDirectory(exportDir);

            string outputFileName = $"CUT_{stationId}_{startUtc:yyyyMMdd_HHmmss}_{endUtc:HHmmss}.mp4";
            string outputPath = Path.Combine(exportDir, outputFileName);

            double durationSeconds = (endUtc - startUtc).TotalSeconds;
            string ffmpegPath = ResolveFfmpegBinary();

            string arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-t {durationSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                               $"-c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k -movflags +faststart -y \"{outputPath.Replace('\\', '/')}\"";

            _logger.LogInformation("[SMART CUT] Executing cut for {Station}: {Ffmpeg} {Args}", stationId, ffmpegPath, arguments);

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            await _concurrencyThrottle.WaitAsync(ct);
            using var process = new Process { StartInfo = startInfo };

            try
            {
                process.Start();
                string errorOutput = await process.StandardError.ReadToEndAsync(ct);
                await process.WaitForExitAsync(ct);

                if (process.ExitCode != 0)
                {
                    _logger.LogError("[SMART CUT ERROR] FFmpeg failed with code {Code}: {Error}", process.ExitCode, errorOutput);
                    throw new InvalidOperationException($"FFmpeg export failed with exit code {process.ExitCode}: {errorOutput}");
                }

                _logger.LogInformation("[SMART CUT SUCCESS] Export saved to: {Path}", outputPath);
                return outputPath;
            }
            finally
            {
                _concurrencyThrottle.Release();

                if (File.Exists(tempManifestPath))
                {
                    try { File.Delete(tempManifestPath); } catch { }
                }
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