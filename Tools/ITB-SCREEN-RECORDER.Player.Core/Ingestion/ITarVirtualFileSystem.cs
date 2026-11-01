using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Player.Core.Ingestion
{
    /// <summary>
    /// High-performance zero-extract virtual file system for inspecting and streaming contiguous segments
    /// from uncompressed TAR/ITBP containers without extracting them to disk.
    /// </summary>
    public interface ITarVirtualFileSystem : IDisposable
    {
        string? ArchiveFilePath { get; }
        long ArchiveSizeBytes { get; }
        IReadOnlyList<TarBlockEntry> Entries { get; }
        ForensicPackageManifest? Manifest { get; }

        Task OpenArchiveAsync(string archiveFilePath, CancellationToken ct = default);
        bool TryGetEntry(string entryName, out TarBlockEntry entry);
        Stream OpenReadStream(TarBlockEntry entry);
        Stream OpenReadStream(string entryName);
        Stream OpenSubStream(long startOffset, long length);
    }
}
