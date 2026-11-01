using System;
using System.Formats.Tar;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;
using ITB_SCREEN_RECORDER.Player.Core.Streaming;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player
{
    public class LoopbackHttpRangeServerTests : IDisposable
    {
        private readonly string _testTempDir;
        private readonly HttpClient _httpClient;

        public LoopbackHttpRangeServerTests()
        {
            _testTempDir = Path.Combine(Path.GetTempPath(), $"itb_range_server_test_{Guid.NewGuid():N}");
            Directory.CreateDirectory(_testTempDir);
            _httpClient = new HttpClient();
        }

        public void Dispose()
        {
            _httpClient.Dispose();
            if (Directory.Exists(_testTempDir))
            {
                try { Directory.Delete(_testTempDir, true); } catch { }
            }
        }

        private async Task<string> CreateTestTarPackageAsync(string filename, byte[] cam1Data)
        {
            string tarPath = Path.Combine(_testTempDir, filename);

            var manifest = new
            {
                sessionId = "SESSION-RANGE-TEST",
                rangeStartUtc = DateTime.UtcNow,
                rangeEndUtc = DateTime.UtcNow.AddMinutes(5),
                tracks = new[]
                {
                    new
                    {
                        hostname = "WS-RANGE-01",
                        videoFileName = "recordings/cam1.mp4",
                        hasAudio = true,
                        audioChannels = 2
                    }
                }
            };

            byte[] jsonBytes = JsonSerializer.SerializeToUtf8Bytes(manifest);

            await using (var fs = new FileStream(tarPath, FileMode.Create, FileAccess.Write, FileShare.None))
            await using (var tarWriter = new TarWriter(fs, TarEntryFormat.Pax, leaveOpen: false))
            {
                await using (var ms = new MemoryStream(jsonBytes))
                {
                    var entry = new PaxTarEntry(TarEntryType.RegularFile, "session.json") { DataStream = ms };
                    await tarWriter.WriteEntryAsync(entry);
                }

                await using (var ms = new MemoryStream(cam1Data))
                {
                    var entry = new PaxTarEntry(TarEntryType.RegularFile, "recordings/cam1.mp4") { DataStream = ms };
                    await tarWriter.WriteEntryAsync(entry);
                }
            }

            return tarPath;
        }

        [Fact]
        public async Task StartAsync_StartsServerAndServesManifestJson()
        {
            byte[] cam1 = new byte[100];
            string tarPath = await CreateTestTarPackageAsync("manifest_test.tar", cam1);

            using var vfs = new TarVirtualFileSystem();
            await vfs.OpenArchiveAsync(tarPath);

            using var server = new LoopbackHttpRangeServer();
            await server.StartAsync(vfs);

            Assert.True(server.IsRunning);
            Assert.True(server.Port > 0);

            var response = await _httpClient.GetAsync($"{server.BaseUrl}/manifest");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            string jsonStr = await response.Content.ReadAsStringAsync();
            Assert.Contains("SESSION-RANGE-TEST", jsonStr);

            await server.StopAsync();
            Assert.False(server.IsRunning);
        }

        [Fact]
        public async Task GetTrackStreamUrl_ServesFullAndPartialContent_WithAccurateRanges()
        {
            byte[] cam1Data = new byte[500];
            for (int i = 0; i < cam1Data.Length; i++) cam1Data[i] = (byte)(i % 256);

            string tarPath = await CreateTestTarPackageAsync("stream_test.tar", cam1Data);

            using var vfs = new TarVirtualFileSystem();
            await vfs.OpenArchiveAsync(tarPath);

            using var server = new LoopbackHttpRangeServer();
            await server.StartAsync(vfs);

            string trackUrl = server.GetTrackStreamUrl(0);

            // 1. Full Content (200 OK)
            var fullResponse = await _httpClient.GetAsync(trackUrl);
            Assert.Equal(HttpStatusCode.OK, fullResponse.StatusCode);
            Assert.Equal("video/mp4", fullResponse.Content.Headers.ContentType?.MediaType);
            Assert.Equal(500, fullResponse.Content.Headers.ContentLength);
            byte[] fullBytes = await fullResponse.Content.ReadAsByteArrayAsync();
            Assert.Equal(cam1Data, fullBytes);

            // 2. Partial Content (206 Partial Content) with Range: bytes=100-199
            using var rangeReq = new HttpRequestMessage(HttpMethod.Get, trackUrl);
            rangeReq.Headers.Range = new RangeHeaderValue(100, 199);

            var partialResponse = await _httpClient.SendAsync(rangeReq);
            Assert.Equal(HttpStatusCode.PartialContent, partialResponse.StatusCode);
            Assert.Equal(100, partialResponse.Content.Headers.ContentLength);
            Assert.Equal("bytes 100-199/500", partialResponse.Content.Headers.ContentRange?.ToString());

            byte[] partialBytes = await partialResponse.Content.ReadAsByteArrayAsync();
            Assert.Equal(100, partialBytes.Length);
            for (int k = 0; k < 100; k++)
            {
                Assert.Equal(cam1Data[100 + k], partialBytes[k]);
            }

            // 3. Open-ended range: bytes=400-
            using var openRangeReq = new HttpRequestMessage(HttpMethod.Get, trackUrl);
            openRangeReq.Headers.Range = new RangeHeaderValue(400, null);

            var openResponse = await _httpClient.SendAsync(openRangeReq);
            Assert.Equal(HttpStatusCode.PartialContent, openResponse.StatusCode);
            Assert.Equal(100, openResponse.Content.Headers.ContentLength);
            Assert.Equal("bytes 400-499/500", openResponse.Content.Headers.ContentRange?.ToString());

            await server.StopAsync();
        }

        [Fact]
        public async Task RangeRequest_OutOfRange_Returns416RequestedRangeNotSatisfiable()
        {
            byte[] cam1Data = new byte[200];
            string tarPath = await CreateTestTarPackageAsync("range_error.tar", cam1Data);

            using var vfs = new TarVirtualFileSystem();
            await vfs.OpenArchiveAsync(tarPath);

            using var server = new LoopbackHttpRangeServer();
            await server.StartAsync(vfs);

            string trackUrl = server.GetTrackStreamUrl(0);

            using var invalidReq = new HttpRequestMessage(HttpMethod.Get, trackUrl);
            invalidReq.Headers.Range = new RangeHeaderValue(500, 600); // Exceeds 200 bytes

            var response = await _httpClient.SendAsync(invalidReq);
            Assert.Equal(HttpStatusCode.RequestedRangeNotSatisfiable, response.StatusCode);

            await server.StopAsync();
        }

        [Fact]
        public async Task ConcurrentRangeRequests_MultipleReadsExecuteCleanly()
        {
            byte[] cam1Data = new byte[1000];
            for (int i = 0; i < cam1Data.Length; i++) cam1Data[i] = (byte)(i % 128);

            string tarPath = await CreateTestTarPackageAsync("concurrent_test.tar", cam1Data);

            using var vfs = new TarVirtualFileSystem();
            await vfs.OpenArchiveAsync(tarPath);

            using var server = new LoopbackHttpRangeServer();
            await server.StartAsync(vfs);

            string trackUrl = server.GetTrackStreamUrl(0);

            // Execute 10 parallel range reads across random segments
            var tasks = new Task[10];
            for (int t = 0; t < 10; t++)
            {
                int seg = t;
                tasks[t] = Task.Run(async () =>
                {
                    long start = seg * 90;
                    long end = start + 80;
                    using var req = new HttpRequestMessage(HttpMethod.Get, trackUrl);
                    req.Headers.Range = new RangeHeaderValue(start, end);

                    var res = await _httpClient.SendAsync(req);
                    Assert.Equal(HttpStatusCode.PartialContent, res.StatusCode);
                    byte[] data = await res.Content.ReadAsByteArrayAsync();
                    Assert.Equal(81, data.Length);
                    Assert.Equal(cam1Data[start], data[0]);
                });
            }

            await Task.WhenAll(tasks);
            await server.StopAsync();
        }
    }
}
