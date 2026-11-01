using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;

namespace ITB_SCREEN_RECORDER.Player.Core.Streaming
{
    /// <summary>
    /// Ephemeral loopback HTTP 206 server providing random-access byte-range streaming
    /// directly from uncompressed TAR archives to media players without prior disk extraction.
    /// </summary>
    public interface ILoopbackHttpRangeServer : IDisposable
    {
        bool IsRunning { get; }
        int Port { get; }
        string BaseUrl { get; }

        Task StartAsync(ITarVirtualFileSystem vfs, CancellationToken ct = default);
        Task StopAsync();
        string GetTrackStreamUrl(int trackIndex);
        string GetFileStreamUrl(string entryName);
    }
}
