using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Player.Core.Ingestion
{
    /// <summary>
    /// Thread-safe zero-extract virtual file system for scanning and opening slices of uncompressed TAR/ITBP packages.
    /// Uses native direct-block parsing for exact 512-byte POSIX/PAX alignment and sub-50ms indexing.
    /// </summary>
    public sealed class TarVirtualFileSystem : ITarVirtualFileSystem
    {
        private readonly List<TarBlockEntry> _entries = new();
        private readonly Dictionary<string, TarBlockEntry> _entryLookup = new(StringComparer.OrdinalIgnoreCase);
        private readonly object _lock = new();

        private string? _archiveFilePath;
        private long _archiveSizeBytes;
        private PlayerPackageManifest? _manifest;
        private bool _isDisposed;

        public string? ArchiveFilePath => _archiveFilePath;
        public long ArchiveSizeBytes => _archiveSizeBytes;
        public IReadOnlyList<TarBlockEntry> Entries => _entries;
        public PlayerPackageManifest? Manifest => _manifest;

        public async Task OpenArchiveAsync(string archiveFilePath, CancellationToken ct = default)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(archiveFilePath);
            if (!File.Exists(archiveFilePath))
            {
                throw new FileNotFoundException($"Package archive not found: {archiveFilePath}", archiveFilePath);
            }

            lock (_lock)
            {
                _entries.Clear();
                _entryLookup.Clear();
                _manifest = null;
                _archiveFilePath = Path.GetFullPath(archiveFilePath);
                _archiveSizeBytes = new FileInfo(_archiveFilePath).Length;
            }

            await Task.Run(() =>
            {
                using var fs = new FileStream(
                    _archiveFilePath,
                    FileMode.Open,
                    FileAccess.Read,
                    FileShare.ReadWrite | FileShare.Delete,
                    bufferSize: 65536,
                    useAsync: false);

                byte[] headerBlock = new byte[512];
                string? pendingPaxPath = null;
                long? pendingPaxSize = null;

                while (fs.Position + 512 <= fs.Length && !ct.IsCancellationRequested)
                {
                    long headerOffset = fs.Position;
                    int read = fs.Read(headerBlock, 0, 512);
                    if (read < 512) break;

                    if (IsAllZeros(headerBlock))
                    {
                        // Check if following block is also zero (TAR standard 2-block EOF marker)
                        if (fs.Position + 512 <= fs.Length)
                        {
                            byte[] nextCheck = new byte[512];
                            fs.Read(nextCheck, 0, 512);
                            if (IsAllZeros(nextCheck)) break;
                            fs.Seek(-512, SeekOrigin.Current);
                        }
                        break;
                    }

                    string rawName = ReadNullTerminatedAscii(headerBlock, 0, 100);
                    string prefix = ReadNullTerminatedAscii(headerBlock, 345, 155);
                    string fullName = string.IsNullOrEmpty(prefix) ? rawName : $"{prefix}/{rawName}";

                    long octalSize = ParseOctal(headerBlock, 124, 12);
                    char typeFlag = (char)headerBlock[156];
                    if (typeFlag == '\0') typeFlag = '0';

                    long dataStart = headerOffset + 512;
                    long paddedDataLength = ((octalSize + 511) / 512) * 512;

                    // Handle PAX extended header attributes
                    if (typeFlag == 'x' || typeFlag == 'g')
                    {
                        byte[] paxData = new byte[octalSize];
                        fs.Read(paxData, 0, (int)octalSize);
                        ParsePaxAttributes(paxData, out pendingPaxPath, out pendingPaxSize);

                        long nextHdr = dataStart + paddedDataLength;
                        fs.Seek(nextHdr, SeekOrigin.Begin);
                        continue;
                    }

                    string effectiveName = pendingPaxPath ?? fullName;
                    long effectiveSize = pendingPaxSize ?? octalSize;
                    pendingPaxPath = null;
                    pendingPaxSize = null;

                    string normalizedName = effectiveName.TrimStart('.', '/', '\\').Replace('\\', '/');

                    if (typeFlag == '0' || typeFlag == '7') // Regular file
                    {
                        var blockEntry = new TarBlockEntry
                        {
                            Name = normalizedName,
                            HeaderByteOffset = headerOffset,
                            DataStartByteOffset = dataStart,
                            LengthBytes = effectiveSize,
                            IsDirectory = false
                        };

                        lock (_lock)
                        {
                            _entries.Add(blockEntry);
                            _entryLookup[normalizedName] = blockEntry;
                            string fileNameOnly = Path.GetFileName(normalizedName);
                            if (!string.IsNullOrEmpty(fileNameOnly) && !_entryLookup.ContainsKey(fileNameOnly))
                            {
                                _entryLookup[fileNameOnly] = blockEntry;
                            }
                        }

                        // Parse session.json directly
                        if (normalizedName.EndsWith("session.json", StringComparison.OrdinalIgnoreCase) && _manifest == null && effectiveSize > 0)
                        {
                            try
                            {
                                byte[] jsonBytes = new byte[effectiveSize];
                                fs.Read(jsonBytes, 0, (int)effectiveSize);
                                _manifest = JsonSerializer.Deserialize<PlayerPackageManifest>(jsonBytes, new JsonSerializerOptions
                                {
                                    PropertyNameCaseInsensitive = true
                                });
                            }
                            catch { }
                        }
                    }

                    // Seek to next header block
                    long nextHeaderOffset = dataStart + paddedDataLength;
                    if (nextHeaderOffset > fs.Length) break;
                    fs.Seek(nextHeaderOffset, SeekOrigin.Begin);
                }
            }, ct);
        }

        public bool TryGetEntry(string entryName, out TarBlockEntry entry)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(entryName);
            string normalized = entryName.TrimStart('.', '/', '\\').Replace('\\', '/');

            lock (_lock)
            {
                if (_entryLookup.TryGetValue(normalized, out entry!)) return true;
                string fileNameOnly = Path.GetFileName(normalized);
                return _entryLookup.TryGetValue(fileNameOnly, out entry!);
            }
        }

        public Stream OpenReadStream(TarBlockEntry entry)
        {
            ArgumentNullException.ThrowIfNull(entry);
            return OpenSubStream(entry.DataStartByteOffset, entry.LengthBytes);
        }

        public Stream OpenReadStream(string entryName)
        {
            if (!TryGetEntry(entryName, out var entry))
            {
                throw new FileNotFoundException($"Entry '{entryName}' not found in package archive.");
            }
            return OpenReadStream(entry);
        }

        public Stream OpenSubStream(long startOffset, long length)
        {
            if (string.IsNullOrEmpty(_archiveFilePath) || !File.Exists(_archiveFilePath))
            {
                throw new InvalidOperationException("No archive file is currently open.");
            }

            var baseStream = new FileStream(
                _archiveFilePath,
                FileMode.Open,
                FileAccess.Read,
                FileShare.ReadWrite | FileShare.Delete,
                bufferSize: 65536,
                useAsync: true);

            return new SubStream(baseStream, startOffset, length, ownsStream: true);
        }

        private static bool IsAllZeros(byte[] buffer)
        {
            for (int i = 0; i < buffer.Length; i++)
            {
                if (buffer[i] != 0) return false;
            }
            return true;
        }

        private static string ReadNullTerminatedAscii(byte[] buffer, int offset, int length)
        {
            int end = offset;
            int max = offset + length;
            while (end < max && buffer[end] != 0) end++;
            return Encoding.ASCII.GetString(buffer, offset, end - offset).Trim();
        }

        private static long ParseOctal(byte[] buffer, int offset, int length)
        {
            string str = ReadNullTerminatedAscii(buffer, offset, length);
            if (string.IsNullOrWhiteSpace(str)) return 0;
            try
            {
                return Convert.ToInt64(str, 8);
            }
            catch
            {
                return 0;
            }
        }

        private static void ParsePaxAttributes(byte[] paxBytes, out string? path, out long? size)
        {
            path = null;
            size = null;
            string text = Encoding.UTF8.GetString(paxBytes);
            var lines = text.Split('\n', StringSplitOptions.RemoveEmptyEntries);

            foreach (var line in lines)
            {
                int firstSpace = line.IndexOf(' ');
                if (firstSpace < 0) continue;
                string record = line[(firstSpace + 1)..];
                int eqIdx = record.IndexOf('=');
                if (eqIdx < 0) continue;

                string key = record[..eqIdx].Trim();
                string val = record[(eqIdx + 1)..].Trim();

                if (key.Equals("path", StringComparison.OrdinalIgnoreCase))
                {
                    path = val;
                }
                else if (key.Equals("size", StringComparison.OrdinalIgnoreCase) && long.TryParse(val, out long s))
                {
                    size = s;
                }
            }
        }

        public async Task ExtractEntryToFileAsync(string entryName, string destinationFilePath, CancellationToken ct = default)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(entryName);
            ArgumentException.ThrowIfNullOrWhiteSpace(destinationFilePath);

            var dir = Path.GetDirectoryName(destinationFilePath);
            if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            await using var inStream = OpenReadStream(entryName);
            await using var outStream = new FileStream(
                destinationFilePath,
                FileMode.Create,
                FileAccess.Write,
                FileShare.None,
                bufferSize: 65536,
                useAsync: true);

            await inStream.CopyToAsync(outStream, ct).ConfigureAwait(false);
        }

        public void Dispose()
        {
            if (!_isDisposed)
            {
                _isDisposed = true;
                lock (_lock)
                {
                    _entries.Clear();
                    _entryLookup.Clear();
                }
            }
        }
    }
}
