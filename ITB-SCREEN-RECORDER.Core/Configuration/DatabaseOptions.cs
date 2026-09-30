namespace ITB_SCREEN_RECORDER.Core.Configuration;

public sealed class DatabaseOptions
{
    public const string SectionName = "Database";

    public string? BaseDirectory { get; set; }
    public int BusyTimeoutSeconds { get; set; } = 5;
}