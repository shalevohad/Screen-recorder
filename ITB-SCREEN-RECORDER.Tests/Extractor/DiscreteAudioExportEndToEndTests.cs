using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Formats.Tar;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Moq;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Extractor
{
    public class DiscreteAudioExportEndToEndTests : IDisposable
    {
        private readonly string _testTempDir;
        private readonly string _ffmpegPath;
        private readonly string _ffprobePath;
        private readonly FfmpegBinaryResolver _binaryResolver;
        private readonly MediaProbeService _mediaProbeService;
        private readonly DummyVideoGenerator _dummyGenerator;
        private readonly NoSignalPatternService _patternService;
        private readonly SynchronizedTrackCutter _trackCutter;
        private readonly SynchronizationPlanBuilder _planBuilder;

        public DiscreteAudioExportEndToEndTests()
        {
            _testTempDir = Path.Combine(Path.GetTempPath(), $"itb_audio_test_{Guid.NewGuid():N}");
            Directory.CreateDirectory(_testTempDir);

            var options = Options.Create(new ExtractorOptions
            {
                MaxConcurrentFfmpegProcesses = 2,
                ExportPath = _testTempDir
            });

            _binaryResolver = new FfmpegBinaryResolver(options, NullLogger<FfmpegBinaryResolver>.Instance);
            _ffmpegPath = _binaryResolver.ResolveFfmpeg();
            _ffprobePath = _binaryResolver.ResolveFfprobe();

            var mockStorageScanner = new Mock<IStorageScannerService>();
            _mediaProbeService = new MediaProbeService(mockStorageScanner.Object, options, NullLogger<MediaProbeService>.Instance);
            _patternService = new NoSignalPatternService(NullLogger<NoSignalPatternService>.Instance);
            _dummyGenerator = new DummyVideoGenerator(_binaryResolver, _patternService, NullLogger<DummyVideoGenerator>.Instance);

            _trackCutter = new SynchronizedTrackCutter(
                _dummyGenerator,
                _mediaProbeService,
                _binaryResolver,
                NullLogger<SynchronizedTrackCutter>.Instance);

            _planBuilder = new SynchronizationPlanBuilder();
        }

        public void Dispose()
        {
            if (Directory.Exists(_testTempDir))
            {
                try { Directory.Delete(_testTempDir, true); } catch { }
            }
        }

        private async Task<string> CreateSyntheticTwoChannelChunkAsync(string filename, double durationSeconds = 2.0)
        {
            string outPath = Path.Combine(_testTempDir, filename);

            // Generates synthetic video with 2 discrete audio channels:
            // Channel 0: 440 Hz tone (representing loopback)
            // Channel 1: 1000 Hz tone (representing microphone)
            string args = $"-y -nostdin -loglevel error " +
                          $"-f lavfi -i testsrc=duration={durationSeconds:0.0}:size=640x360:rate=30 " +
                          $"-f lavfi -i sine=frequency=440:duration={durationSeconds:0.0}:sample_rate=48000 " +
                          $"-f lavfi -i sine=frequency=1000:duration={durationSeconds:0.0}:sample_rate=48000 " +
                          $"-filter_complex \"[1:a][2:a]join=inputs=2:channel_layout=stereo[a]\" " +
                          $"-map 0:v -map \"[a]\" " +
                          $"-c:v libx264 -preset ultrafast -pix_fmt yuv420p " +
                          $"-c:a aac -b:a 128k -ar 48000 " +
                          $"\"{outPath.Replace('\\', '/')}\"";

            var psi = new ProcessStartInfo
            {
                FileName = _ffmpegPath,
                Arguments = args,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var proc = Process.Start(psi);
            Assert.NotNull(proc);
            await proc.WaitForExitAsync();
            Assert.Equal(0, proc.ExitCode);
            Assert.True(File.Exists(outPath));
            return outPath;
        }

        private async Task<string> CreateSyntheticVideoOnlyChunkAsync(string filename, double durationSeconds = 2.0)
        {
            string outPath = Path.Combine(_testTempDir, filename);

            string args = $"-y -nostdin -loglevel error " +
                          $"-f lavfi -i testsrc=duration={durationSeconds:0.0}:size=640x360:rate=30 " +
                          $"-an -c:v libx264 -preset ultrafast -pix_fmt yuv420p " +
                          $"\"{outPath.Replace('\\', '/')}\"";

            var psi = new ProcessStartInfo
            {
                FileName = _ffmpegPath,
                Arguments = args,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var proc = Process.Start(psi);
            Assert.NotNull(proc);
            await proc.WaitForExitAsync();
            Assert.Equal(0, proc.ExitCode);
            Assert.True(File.Exists(outPath));
            return outPath;
        }

        [Fact]
        public async Task MediaProbeService_DetectsTwoDiscreteAudioChannels_And48kHzSampleRate()
        {
            string chunkFile = await CreateSyntheticTwoChannelChunkAsync("probe_test.mp4", 1.5);

            var probe = await _mediaProbeService.ProbeMediaFileDirectlyAsync(chunkFile, "station-test");

            Assert.True(probe.HasAudio);
            Assert.Equal(2, probe.AudioChannels);
            Assert.Equal(48000, probe.AudioSampleRate);
            Assert.Equal("aac", probe.AudioCodec);
        }

        [Fact]
        public async Task SynchronizedTrackCutter_PreservesTwoDiscreteAudioChannels_InCutOutput()
        {
            string chunkFile = await CreateSyntheticTwoChannelChunkAsync("cut_source.mp4", 2.0);

            DateTime t0 = new DateTime(2026, 11, 1, 10, 0, 0, DateTimeKind.Utc);
            var chunkMeta = new RecordingChunkMetadata
            {
                FullPath = chunkFile,
                Hostname = "WS-AUDIO-01",
                StartUtc = t0,
                EndUtc = t0.AddSeconds(2),
                HasAudio = true,
                DisplayId = "mon-0",
                IsPrimary = true,
                FileSizeBytes = new FileInfo(chunkFile).Length,
                Width = 640,
                Height = 360,
                Fps = 30.0
            };

            var plan = new SynchronizationPlan
            {
                ActiveSegments = new List<TimeInterval>
                {
                    new() { StartUtc = t0, EndUtc = t0.AddSeconds(2) }
                },
                LayoutMode = "mon-0"
            };

            var cutResult = await _trackCutter.CutSynchronizedTrackAsync(
                "WS-AUDIO-01",
                plan,
                new List<RecordingChunkMetadata> { chunkMeta },
                _testTempDir,
                isMultiStation: false,
                progress: null,
                ct: CancellationToken.None);

            Assert.False(string.IsNullOrEmpty(cutResult.OutputFilePath));
            Assert.True(File.Exists(cutResult.OutputFilePath));
            Assert.True(cutResult.HasAudio);

            // Probe the cut output file to verify audio channels and sample rate are preserved
            var outputProbe = await _mediaProbeService.ProbeMediaFileDirectlyAsync(cutResult.OutputFilePath, "WS-AUDIO-01");
            Assert.True(outputProbe.HasAudio);
            Assert.Equal(2, outputProbe.AudioChannels);
            Assert.Equal(48000, outputProbe.AudioSampleRate);
            Assert.Equal("aac", outputProbe.AudioCodec);
        }

        [Fact]
        public async Task ExtractorService_StreamTarArchiveAsync_ExportsSessionJsonWithDiscreteAudioConfiguration_AndPreservesChannels()
        {
            string chunkFile = await CreateSyntheticTwoChannelChunkAsync("tar_source.mp4", 2.0);

            DateTime t0 = new DateTime(2026, 11, 1, 12, 0, 0, DateTimeKind.Utc);
            DateTime tEnd = t0.AddSeconds(2);
            const string host = "WS-EXPORT-STATION";

            var chunkMeta = new RecordingChunkMetadata
            {
                FullPath = chunkFile,
                Hostname = host,
                StartUtc = t0,
                EndUtc = tEnd,
                HasAudio = true,
                DisplayId = "mon-0",
                IsPrimary = true,
                FileSizeBytes = new FileInfo(chunkFile).Length,
                Width = 640,
                Height = 360,
                Fps = 30.0
            };

            var mockStorageScanner = new Mock<IStorageScannerService>();
            mockStorageScanner
                .Setup(s => s.GetChunksForStationAsync(host, t0, tEnd))
                .ReturnsAsync(new List<RecordingChunkMetadata> { chunkMeta });

            var mockFfmpegRunner = new Mock<IFfmpegConcatRunner>();

            var extractorService = new ExtractorService(
                mockStorageScanner.Object,
                mockFfmpegRunner.Object,
                Options.Create(new ExtractorOptions { ExportPath = _testTempDir }),
                NullLogger<ExtractorService>.Instance,
                srtGenerator: null,
                trackCutter: _trackCutter,
                planBuilder: _planBuilder);

            var request = new ExtractionRequestDto
            {
                Hostnames = new List<string> { host },
                StartTimeUtc = t0,
                EndTimeUtc = tEnd,
                LayoutMode = "mon-0"
            };

            using var tarMemoryStream = new MemoryStream();
            await extractorService.StreamTarArchiveAsync(request, tarMemoryStream, CancellationToken.None);

            tarMemoryStream.Seek(0, SeekOrigin.Begin);
            Assert.True(tarMemoryStream.Length > 0);

            // Inspect the generated TAR package
            using var tarReader = new TarReader(tarMemoryStream);
            TarEntry? entry;
            string? sessionJsonContent = null;
            string? extractedVideoPath = null;

            while ((entry = await tarReader.GetNextEntryAsync()) != null)
            {
                if (entry.Name == "session.json")
                {
                    using var ms = new MemoryStream();
                    await entry.DataStream!.CopyToAsync(ms);
                    sessionJsonContent = System.Text.Encoding.UTF8.GetString(ms.ToArray());
                }
                else if (entry.Name.StartsWith("recordings/") && entry.Name.EndsWith(".mp4"))
                {
                    extractedVideoPath = Path.Combine(_testTempDir, "extracted_from_tar.mp4");
                    using var fs = new FileStream(extractedVideoPath, FileMode.Create, FileAccess.Write);
                    await entry.DataStream!.CopyToAsync(fs);
                }
            }

            // 1. Verify session.json metadata
            Assert.NotNull(sessionJsonContent);
            using var jsonDoc = JsonDocument.Parse(sessionJsonContent);
            var root = jsonDoc.RootElement;

            Assert.True(root.TryGetProperty("audioConfiguration", out var audioCfg));
            Assert.Equal(2, audioCfg.GetProperty("channels").GetInt32());
            Assert.Equal(48000, audioCfg.GetProperty("sampleRate").GetInt32());

            var discreteMapping = audioCfg.GetProperty("discreteMapping");
            Assert.Equal("Loopback", discreteMapping.GetProperty("0").GetString());
            Assert.Equal("Microphone", discreteMapping.GetProperty("1").GetString());

            Assert.True(root.TryGetProperty("tracks", out var tracks));
            var track0 = tracks[0];
            Assert.Equal(host, track0.GetProperty("hostname").GetString());
            Assert.True(track0.GetProperty("hasAudio").GetBoolean());
            Assert.Equal(2, track0.GetProperty("audioChannels").GetInt32());
            Assert.Equal("0:Loopback,1:Microphone", track0.GetProperty("audioChannelMapping").GetString());

            // 2. Verify extracted MP4 video maintains the 2 discrete audio channels
            Assert.NotNull(extractedVideoPath);
            Assert.True(File.Exists(extractedVideoPath));

            var extractedProbe = await _mediaProbeService.ProbeMediaFileDirectlyAsync(extractedVideoPath, host);
            Assert.True(extractedProbe.HasAudio);
            Assert.Equal(2, extractedProbe.AudioChannels);
            Assert.Equal(48000, extractedProbe.AudioSampleRate);
            Assert.Equal("aac", extractedProbe.AudioCodec);
        }

        [Fact]
        public async Task MultiDisplayLayout_PiP_PreservesDiscreteAudioFromPrimaryMonitor()
        {
            // Primary monitor (mon-0) has 2-channel audio
            string mon0File = await CreateSyntheticTwoChannelChunkAsync("pip_mon0.mp4", 2.0);
            // Secondary monitor (mon-1) is video only (e.g. secondary monitor capture)
            string mon1File = await CreateSyntheticVideoOnlyChunkAsync("pip_mon1.mp4", 2.0);

            DateTime t0 = new DateTime(2026, 11, 1, 14, 0, 0, DateTimeKind.Utc);
            DateTime tEnd = t0.AddSeconds(2);
            const string host = "WS-DUAL-DISPLAY";

            var chunk0 = new RecordingChunkMetadata
            {
                FullPath = mon0File,
                Hostname = host,
                StartUtc = t0,
                EndUtc = tEnd,
                HasAudio = true,
                DisplayId = "mon-0",
                IsPrimary = true,
                FileSizeBytes = new FileInfo(mon0File).Length,
                Width = 640,
                Height = 360,
                Fps = 30.0
            };

            var chunk1 = new RecordingChunkMetadata
            {
                FullPath = mon1File,
                Hostname = host,
                StartUtc = t0,
                EndUtc = tEnd,
                HasAudio = false,
                DisplayId = "mon-1",
                IsPrimary = false,
                FileSizeBytes = new FileInfo(mon1File).Length,
                Width = 640,
                Height = 360,
                Fps = 30.0
            };

            var plan = new SynchronizationPlan
            {
                ActiveSegments = new List<TimeInterval>
                {
                    new() { StartUtc = t0, EndUtc = tEnd }
                },
                LayoutMode = "pip"
            };

            var cutResult = await _trackCutter.CutSynchronizedTrackAsync(
                host,
                plan,
                new List<RecordingChunkMetadata> { chunk0, chunk1 },
                _testTempDir,
                isMultiStation: false,
                progress: null,
                ct: CancellationToken.None);

            Assert.False(string.IsNullOrEmpty(cutResult.OutputFilePath));
            Assert.True(File.Exists(cutResult.OutputFilePath));
            Assert.True(cutResult.HasAudio);

            // Probe the cut PiP output to verify primary audio was composited cleanly without losing channels
            var pipProbe = await _mediaProbeService.ProbeMediaFileDirectlyAsync(cutResult.OutputFilePath, host);
            Assert.True(pipProbe.HasAudio);
            Assert.Equal(2, pipProbe.AudioChannels);
            Assert.Equal(48000, pipProbe.AudioSampleRate);
            Assert.Equal("aac", pipProbe.AudioCodec);
        }
    }
}
