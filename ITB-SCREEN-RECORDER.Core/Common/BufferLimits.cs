namespace ITB_SCREEN_RECORDER.Core.Common
{
    /// <summary>
    /// Central definition of maximum buffer file and HTTP request payload limits across the solution.
    /// </summary>
    public static class BufferLimits
    {
        /// <summary>
        /// Maximum allowed video buffer file size in megabytes.
        /// Modifying this value centrally controls limits across the entire platform.
        /// </summary>
        public const long MaxBufferFileSizeMb = 4096;

        /// <summary>
        /// Additional overhead allocation in megabytes for HTTP headers, multipart boundaries, and form fields.
        /// </summary>
        public const long RequestOverheadMb = 50;

        /// <summary>
        /// Net maximum allowed size in bytes for the raw video file payload (4 GB = 4,294,967,296 bytes).
        /// </summary>
        public const long MaxFileSizeBytes = MaxBufferFileSizeMb * 1024L * 1024L;

        /// <summary>
        /// Total HTTP request body threshold in bytes configured for Kestrel server and controller boundaries (4,347,330,560 bytes).
        /// </summary>
        public const long MaxRequestSizeBytes = (MaxBufferFileSizeMb + RequestOverheadMb) * 1024L * 1024L;
    }
}