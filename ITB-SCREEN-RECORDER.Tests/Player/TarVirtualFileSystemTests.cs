using System;
using System.Formats.Tar;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player
{
    public class TarVirtualFileSystemTests : IDisposable
    {
        private readonly string _testTempDir;

        public TarVirtualFileSystemTests()
        {
            _testTempDir = Path.Combine(Path.GetTempPath(), $"itb_tar_vfs_test_{Guid.NewGuid():N}");
            Directory.CreateDirectory(_testTempDir);
        }

        public void Dispose()
        {
            if (Directory.Exists(_testTempDir))
            {
                try { Directory.Delete(_testTempDir, true); } catch { }
            }
        }

        private async Task<string> CreateSampleTarPackageAsync(string filename, byte[] cam1Data, byte[] cam2Data)
        {
            string tarPath = Path.Combine(_testTempDir, filename);

            var sampleManifest = new
            {
                sessionId = "SESSION-TEST-2026",
                rangeStartUtc = DateTime.UtcNow.AddMinutes(-10),
                rangeEndUtc = DateTime.UtcNow,
                keystrokeMode = "BurnIn",
                originalDurationSeconds = 600.0,
                exportedDurationSeconds = 540.0,
                audioConfiguration = new
                {
                    channels = 2,
                    sampleRate = 48000,
                    discreteMapping = new System.Collections.Generic.Dictionary<string, string>
                    {
                        ["0"] = "Loopback",
                        ["1"] = "Microphone"
                    },
                    description = "Channel 0: System loopback. Channel 1: Microphone."
                },
                tracks = new[]
                {
                    new
                    {
                        hostname = "WS-01",
                        videoFileName = "recordings/cam1.mp4",
                        startOffsetMs = 0.0,
                        durationMs = 540000.0,
                        hasAudio = true,
                        audioChannels = 2,
                        audioChannelMapping = "0:Loopback,1:Microphone"
                    },
                    new
                    {
                        hostname = "WS-02",
                        videoFileName = "recordings/cam2.mp4",
                        startOffsetMs = 0.0,
                        durationMs = 540000.0,
                        hasAudio = true,
                        audioChannels = 2,
                        audioChannelMapping = "0:Loopback,1:Microphone"
                    }
                }
            };

            byte[] jsonBytes = JsonSerializer.SerializeToUtf8Bytes(sampleManifest);

            await using (var fs = new FileStream(tarPath, FileMode.Create, FileAccess.Write, FileShare.None))
            await using (var tarWriter = new TarWriter(fs, TarEntryFormat.Pax, leaveOpen: false))
            {
                // 1. session.json
                await using (var ms = new MemoryStream(jsonBytes))
                {
                    var entry = new PaxTarEntry(TarEntryType.RegularFile, "session.json") { DataStream = ms };
                    await tarWriter.WriteEntryAsync(entry);
                }

                // 2. recordings/cam1.mp4
                await using (var ms = new MemoryStream(cam1Data))
                {
                    var entry = new PaxTarEntry(TarEntryType.RegularFile, "recordings/cam1.mp4") { DataStream = ms };
                    await tarWriter.WriteEntryAsync(entry);
                }

                // 3. recordings/cam2.mp4
                await using (var ms = new MemoryStream(cam2Data))
                {
                    var entry = new PaxTarEntry(TarEntryType.RegularFile, "recordings/cam2.mp4") { DataStream = ms };
                    await tarWriter.WriteEntryAsync(entry);
                }
            }

            return tarPath;
        }

        [Fact]
        public async Task OpenArchiveAsync_WithValidTarPackage_ScansEntriesAndParsesManifestCorrectly()
        {
            byte[] cam1 = Encoding.UTF8.GetBytes("VIDEO-STREAM-CAM-1-RAW-PAYLOAD");
            byte[] cam2 = Encoding.UTF8.GetBytes("VIDEO-STREAM-CAM-2-RAW-PAYLOAD-WITH-DIFFERENT-LENGTH");

            string tarPath = await CreateSampleTarPackageAsync("session_package.tar", cam1, cam2);

            using var vfs = new TarVirtualFileSystem();
            await vfs.OpenArchiveAsync(tarPath);

            Assert.Equal(3, vfs.Entries.Count);
            Assert.True(vfs.TryGetEntry("session.json", out var sessionEntry));
            Assert.True(vfs.TryGetEntry("recordings/cam1.mp4", out var cam1Entry));
            Assert.True(vfs.TryGetEntry("recordings/cam2.mp4", out var cam2Entry));

            Assert.Equal(cam1.Length, cam1Entry.LengthBytes);
            Assert.Equal(cam2.Length, cam2Entry.LengthBytes);

            // Manifest parsed automatically
            Assert.NotNull(vfs.Manifest);
            Assert.Equal("SESSION-TEST-2026", vfs.Manifest.SessionId);
            Assert.Equal(2, vfs.Manifest.AudioConfiguration.Channels);
            Assert.Equal("Loopback", vfs.Manifest.AudioConfiguration.DiscreteMapping["0"]);
            Assert.Equal("Microphone", vfs.Manifest.AudioConfiguration.DiscreteMapping["1"]);
            Assert.Equal(2, vfs.Manifest.Tracks.Count);
        }

        [Fact]
        public async Task OpenReadStream_ReadsExactDataBytes_WithoutExtraction()
        {
            byte[] cam1 = Encoding.UTF8.GetBytes("CAM-1-TEST-BYTES-DATA-CHUNK");
            byte[] cam2 = Encoding.UTF8.GetBytes("CAM-2-ANOTHER-CHUNK");

            string tarPath = await CreateSampleTarPackageAsync("test_stream.tar", cam1, cam2);

            using var vfs = new TarVirtualFileSystem();
            await vfs.OpenArchiveAsync(tarPath);

            using var stream1 = vfs.OpenReadStream("recordings/cam1.mp4");
            using var ms1 = new MemoryStream();
            await stream1.CopyToAsync(ms1);

            Assert.Equal(cam1, ms1.ToArray());

            using var stream2 = vfs.OpenReadStream("recordings/cam2.mp4");
            using var ms2 = new MemoryStream();
            await stream2.CopyToAsync(ms2);

            Assert.Equal(cam2, ms2.ToArray());
        }

        [Fact]
        public async Task SubStream_SupportsRandomSeeking_AndThreadSafety()
        {
            byte[] sampleData = new byte[1000];
            for (int i = 0; i < sampleData.Length; i++) sampleData[i] = (byte)(i % 256);

            string tarPath = await CreateSampleTarPackageAsync("seek_test.tar", sampleData, new byte[10]);

            using var vfs = new TarVirtualFileSystem();
            await vfs.OpenArchiveAsync(tarPath);

            using var stream = vfs.OpenReadStream("recordings/cam1.mp4");

            // Seek to offset 250
            stream.Seek(250, SeekOrigin.Begin);
            Assert.Equal(250, stream.Position);

            byte[] buffer = new byte[10];
            int read = stream.Read(buffer, 0, buffer.Length);
            Assert.Equal(10, read);
            Assert.Equal((byte)(250 % 256), buffer[0]);
            Assert.Equal((byte)(259 % 256), buffer[9]);

            // Seek relative from current
            stream.Seek(100, SeekOrigin.Current);
            Assert.Equal(360, stream.Position);
            read = stream.Read(buffer, 0, 1);
            Assert.Equal(1, read);
            Assert.Equal((byte)(360 % 256), buffer[0]);
        }
    }
}
