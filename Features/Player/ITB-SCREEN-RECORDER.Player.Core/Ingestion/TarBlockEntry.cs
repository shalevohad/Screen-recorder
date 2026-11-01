using System;

namespace ITB_SCREEN_RECORDER.Player.Core.Ingestion
{
    /// <summary>
    /// Represents a contiguous data segment of an embedded file inside an uncompressed TAR/ITBP archive.
    /// </summary>
    public sealed class TarBlockEntry
    {
        public string Name { get; set; } = string.Empty;
        public long HeaderByteOffset { get; set; }
        public long DataStartByteOffset { get; set; }
        public long LengthBytes { get; set; }
        public DateTime ModifiedUtc { get; set; } = DateTime.UtcNow;
        public bool IsDirectory { get; set; }

        public override string ToString() => $"{Name} (Offset: {DataStartByteOffset}, Length: {LengthBytes:N0} bytes)";
    }
}
