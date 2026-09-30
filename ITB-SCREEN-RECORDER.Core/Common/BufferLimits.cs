namespace ITB_SCREEN_RECORDER.Core.Common
{
    public static class BufferLimits
    {
        // 💡 שינוי כאן בלבד ישפיע על כלל המערכת
        public const long MaxBufferFileSizeMb = 300;

        // תוספת תקורה עבור כותרות HTTP, Multipart boundaries ושדות טופס
        public const long RequestOverheadMb = 20;

        // גודל נטו מקסימלי לקובץ הווידאו עצמו בבתים (314,572,800 Bytes)
        public const long MaxFileSizeBytes = MaxBufferFileSizeMb * 1024L * 1024L;

        // תקרת בקשת ה-HTTP הכוללת בבתים עבור Kestrel וה-Controller (335,544,320 Bytes)
        public const long MaxRequestSizeBytes = (MaxBufferFileSizeMb + RequestOverheadMb) * 1024L * 1024L;
    }
}