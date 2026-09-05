using ITB_SCREEN_RECORDER.Server.Features.Extractor.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Formats.Tar;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Server.Features.Extractor.Services
{
    public interface IExtractorService
    {
        Task StreamTarArchiveAsync(ExtractionRequestDto request, Stream destinationStream, CancellationToken ct);
    }

    public class ExtractorService : IExtractorService
    {
        private readonly IStorageScannerService _storageScanner;
        private readonly IFfmpegConcatRunner _ffmpegRunner;
        private readonly ILogger<ExtractorService> _logger;
        private readonly SemaphoreSlim _concurrencyThrottle;

        private static readonly JsonSerializerOptions JsonOptions = new()
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
            _logger = logger;

            int maxConcurrency = extractorOptions.Value.MaxConcurrentFfmpegProcesses;
            _concurrencyThrottle = new SemaphoreSlim(maxConcurrency, maxConcurrency);
        }

        public async Task StreamTarArchiveAsync(ExtractionRequestDto request, Stream destinationStream, CancellationToken ct)
        {
            ArgumentNullException.ThrowIfNull(request);
            ArgumentNullException.ThrowIfNull(destinationStream);

            var sessionManifest = new SessionManifest
            {
                RangeStartUtc = request.StartTimeUtc,
                RangeEndUtc = request.EndTimeUtc
            };

            // שימוש בפורמט Pax (POSIX.1-2001) - תאימות מלאה ל-Linux ול-Windows
            await using var tarWriter = new TarWriter(destinationStream, TarEntryFormat.Pax, leaveOpen: true);

            // 1. עיבוד כל תחנה: חיתוך, איחוד וכתיבה ל-TAR
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
                    string concatManifest = _storageScanner.BuildConcatManifest(chunks, request.StartTimeUtc, request.EndTimeUtc);

                    // הזרמת ה-fMP4 לקובץ זמני ייעודי ללא DeleteOnClose למניעת נעילות
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
                            _logger.LogWarning("Concatenated video stream for host {Host} is empty (0 bytes). Skipping entry.", hostname);
                            continue;
                        }

                        spoolStream.Position = 0;

                        // כתיבת הרשומה ל-TAR (קריאת האורך מבוצעת ישירות מה-FileStream)
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

                    try
                    {
                        if (File.Exists(tempSpoolFile))
                        {
                            File.Delete(tempSpoolFile);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to clean up temporary spool file {File}", tempSpoolFile);
                    }
                }
            }

            // 2. הזרקת session.json לשורש הארכיון
            byte[] manifestBytes = JsonSerializer.SerializeToUtf8Bytes(sessionManifest, JsonOptions);
            await using var manifestMemoryStream = new MemoryStream(manifestBytes);

            var manifestEntry = new PaxTarEntry(TarEntryType.RegularFile, "session.json")
            {
                DataStream = manifestMemoryStream
            };

            await tarWriter.WriteEntryAsync(manifestEntry, ct);
            _logger.LogInformation("Successfully completed TAR stream for session {SessionId}", sessionManifest.SessionId);
        }
    }
}