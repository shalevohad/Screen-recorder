using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;

namespace ITB_SCREEN_RECORDER.Player.Core.Streaming
{
    /// <summary>
    /// In-process HTTP 206 Partial Content server providing streaming endpoints for media players
    /// reading directly from TAR virtual file systems without prior extraction.
    /// </summary>
    public sealed class LoopbackHttpRangeServer : ILoopbackHttpRangeServer
    {
        private HttpListener? _listener;
        private ITarVirtualFileSystem? _vfs;
        private CancellationTokenSource? _serverCts;
        private Task? _listenerLoopTask;
        private int _port;
        private bool _isDisposed;

        public bool IsRunning => _listener?.IsListening ?? false;
        public int Port => _port;
        public string BaseUrl => $"http://127.0.0.1:{_port}";

        public Task StartAsync(ITarVirtualFileSystem vfs, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(vfs);
            _vfs = vfs;

            if (IsRunning) return Task.CompletedTask;

            _port = GetAvailableLoopbackPort();
            _listener = new HttpListener();
            _listener.Prefixes.Add($"http://127.0.0.1:{_port}/");
            _listener.IgnoreWriteExceptions = true;
            _listener.Start();

            _serverCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            _listenerLoopTask = Task.Run(() => RunListenerLoopAsync(_serverCts.Token));

            return Task.CompletedTask;
        }

        public async Task StopAsync()
        {
            if (_listener == null) return;

            try
            {
                _serverCts?.Cancel();
                if (_listener.IsListening)
                {
                    _listener.Stop();
                    _listener.Close();
                }

                if (_listenerLoopTask != null)
                {
                    await _listenerLoopTask.ConfigureAwait(false);
                }
            }
            catch { }
            finally
            {
                _listener = null;
                _serverCts?.Dispose();
                _serverCts = null;
            }
        }

        public string GetTrackStreamUrl(int trackIndex) => $"{BaseUrl}/stream/{trackIndex}";

        public string GetFileStreamUrl(string entryName) => $"{BaseUrl}/file/{Uri.EscapeDataString(entryName)}";

        private async Task RunListenerLoopAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested && _listener != null && _listener.IsListening)
            {
                try
                {
                    var context = await _listener.GetContextAsync().ConfigureAwait(false);
                    _ = Task.Run(() => HandleRequestAsync(context, ct));
                }
                catch (HttpListenerException) when (ct.IsCancellationRequested || _listener == null || !_listener.IsListening)
                {
                    break;
                }
                catch (ObjectDisposedException)
                {
                    break;
                }
                catch (Exception)
                {
                    if (ct.IsCancellationRequested) break;
                }
            }
        }

        private async Task HandleRequestAsync(HttpListenerContext context, CancellationToken ct)
        {
            var req = context.Request;
            var res = context.Response;

            res.Headers.Add("Access-Control-Allow-Origin", "*");
            res.Headers.Add("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
            res.Headers.Add("Access-Control-Allow-Headers", "Range, Accept");
            res.Headers.Add("Accept-Ranges", "bytes");

            if (req.HttpMethod.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
            {
                res.StatusCode = (int)HttpStatusCode.NoContent;
                res.Close();
                return;
            }

            if (!req.HttpMethod.Equals("GET", StringComparison.OrdinalIgnoreCase) &&
                !req.HttpMethod.Equals("HEAD", StringComparison.OrdinalIgnoreCase))
            {
                res.StatusCode = (int)HttpStatusCode.MethodNotAllowed;
                res.Close();
                return;
            }

            try
            {
                string path = req.Url?.AbsolutePath ?? "/";

                if (path.Equals("/manifest", StringComparison.OrdinalIgnoreCase))
                {
                    await ServeManifestAsync(res, ct);
                    return;
                }

                TarBlockEntry? targetEntry = null;

                if (path.StartsWith("/stream/", StringComparison.OrdinalIgnoreCase))
                {
                    string indexStr = path["/stream/".Length..];
                    if (int.TryParse(indexStr, out int trackIdx) && _vfs?.Manifest?.Tracks != null &&
                        trackIdx >= 0 && trackIdx < _vfs.Manifest.Tracks.Count)
                    {
                        var track = _vfs.Manifest.Tracks[trackIdx];
                        _vfs.TryGetEntry(track.VideoFileName, out targetEntry);
                    }
                }
                else if (path.StartsWith("/file/", StringComparison.OrdinalIgnoreCase))
                {
                    string rawName = Uri.UnescapeDataString(path["/file/".Length..]);
                    _vfs?.TryGetEntry(rawName, out targetEntry);
                }

                if (targetEntry == null || _vfs == null)
                {
                    res.StatusCode = (int)HttpStatusCode.NotFound;
                    res.Close();
                    return;
                }

                await ServeBlockEntryAsync(targetEntry, req, res, ct);
            }
            catch (Exception)
            {
                try { res.Close(); } catch { }
            }
        }

        private async Task ServeManifestAsync(HttpListenerResponse res, CancellationToken ct)
        {
            if (_vfs?.Manifest == null)
            {
                res.StatusCode = (int)HttpStatusCode.NotFound;
                res.Close();
                return;
            }

            byte[] jsonBytes = JsonSerializer.SerializeToUtf8Bytes(_vfs.Manifest, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            });

            res.ContentType = "application/json; charset=utf-8";
            res.ContentLength64 = jsonBytes.Length;
            res.StatusCode = (int)HttpStatusCode.OK;

            await res.OutputStream.WriteAsync(jsonBytes, ct);
            res.Close();
        }

        private async Task ServeBlockEntryAsync(
            TarBlockEntry entry,
            HttpListenerRequest req,
            HttpListenerResponse res,
            CancellationToken ct)
        {
            long totalLength = entry.LengthBytes;
            string extension = Path.GetExtension(entry.Name).ToLowerInvariant();

            res.ContentType = extension switch
            {
                ".mp4" => "video/mp4",
                ".json" => "application/json",
                ".srt" => "text/plain; charset=utf-8",
                ".ass" => "text/plain; charset=utf-8",
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                _ => "application/octet-stream"
            };

            string? rangeHeader = req.Headers["Range"];
            bool isHead = req.HttpMethod.Equals("HEAD", StringComparison.OrdinalIgnoreCase);

            if (string.IsNullOrWhiteSpace(rangeHeader) || !rangeHeader.StartsWith("bytes=", StringComparison.OrdinalIgnoreCase))
            {
                // Full content response (200 OK)
                res.StatusCode = (int)HttpStatusCode.OK;
                res.ContentLength64 = totalLength;

                if (!isHead && _vfs != null)
                {
                    await using var stream = _vfs.OpenReadStream(entry);
                    await CopyStreamRangeAsync(stream, res.OutputStream, totalLength, ct);
                }

                res.Close();
                return;
            }

            // HTTP 206 Partial Content
            string rangeSpec = rangeHeader["bytes=".Length..].Trim();
            string[] parts = rangeSpec.Split('-');

            long start = 0;
            long end = totalLength - 1;

            if (parts.Length == 2)
            {
                if (string.IsNullOrEmpty(parts[0])) // Suffix range: "-500"
                {
                    if (long.TryParse(parts[1], out long suffix) && suffix > 0)
                    {
                        start = Math.Max(0, totalLength - suffix);
                        end = totalLength - 1;
                    }
                }
                else
                {
                    if (long.TryParse(parts[0], out long s)) start = s;
                    if (!string.IsNullOrEmpty(parts[1]) && long.TryParse(parts[1], out long e)) end = e;
                }
            }

            if (start < 0 || start > end || end >= totalLength)
            {
                res.StatusCode = (int)HttpStatusCode.RequestedRangeNotSatisfiable;
                res.Headers.Add("Content-Range", $"bytes */{totalLength}");
                res.Close();
                return;
            }

            long contentLength = end - start + 1;
            res.StatusCode = (int)HttpStatusCode.PartialContent;
            res.Headers.Add("Content-Range", $"bytes {start}-{end}/{totalLength}");
            res.ContentLength64 = contentLength;

            if (!isHead && _vfs != null)
            {
                await using var subStream = _vfs.OpenSubStream(entry.DataStartByteOffset + start, contentLength);
                await CopyStreamRangeAsync(subStream, res.OutputStream, contentLength, ct);
            }

            res.Close();
        }

        private static async Task CopyStreamRangeAsync(Stream source, Stream destination, long bytesToCopy, CancellationToken ct)
        {
            byte[] buffer = new byte[65536]; // 64KB high-throughput buffer
            long remaining = bytesToCopy;

            while (remaining > 0 && !ct.IsCancellationRequested)
            {
                int toRead = (int)Math.Min(buffer.Length, remaining);
                int read = await source.ReadAsync(buffer.AsMemory(0, toRead), ct);
                if (read <= 0) break;

                try
                {
                    await destination.WriteAsync(buffer.AsMemory(0, read), ct);
                    remaining -= read;
                }
                catch (Exception)
                {
                    // Client player closed stream or scrubbed away
                    break;
                }
            }
        }

        private static int GetAvailableLoopbackPort()
        {
            using var socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            socket.Bind(new IPEndPoint(IPAddress.Loopback, 0));
            return ((IPEndPoint)socket.LocalEndPoint!).Port;
        }

        public void Dispose()
        {
            if (!_isDisposed)
            {
                _isDisposed = true;
                _ = StopAsync();
            }
        }
    }
}
