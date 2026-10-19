namespace ITB_SCREEN_RECORDER.Core.Common
{
    public static class BufferLimits
    {
        // 💡 שינוי כאן בלבד ישפיע על כלל המערכת
        public const long MaxBufferFileSizeMb = 4096;

        // תוספת תקורה עבור כותרות HTTP, Multipart boundaries ושדות טופס
        public const long RequestOverheadMb = 50;

        // גודל נטו מקסימלי לקובץ הווידאו עצמו בבתים (4,294,967,296 Bytes = 4GB)
        public const long MaxFileSizeBytes = MaxBufferFileSizeMb * 1024L * 1024L;

        // תקרת בקשת ה-HTTP הכוללת בבתים עבור Kestrel וה-Controller (4,347,330,560 Bytes)
        public const long MaxRequestSizeBytes = (MaxBufferFileSizeMb + RequestOverheadMb) * 1024L * 1024L;
    }
}