namespace ITB_SCREEN_RECORDER.Core.Ipc;

/// <summary>
/// מייצג את המצב הפנימי של ה-Session בסביבת Windows/Linux
/// </summary>
public enum InternalSessionState
{
    ActiveInteractive,
    ScreenLocked,
    LoggedOff,
    DxgiAccessLost
}

/// <summary>
/// הודעת הסטטוס (Heartbeat) שה-Worker שולח ל-Service
/// </summary>
public class WorkerIpcStatusMessage
{
    public InternalSessionState SessionState { get; set; }
    public double CurrentFps { get; set; }
    public long TotalFramesRendered { get; set; }
    public bool IsStreaming { get; set; }
    public string? LastInternalError { get; set; }
}

/// <summary>
/// פקודות ניהול מה-Service ל-Worker
/// </summary>
public enum WorkerControlCommand
{
    PauseDueToLock = 1,
    ResumeAfterUnlock = 2,
    GracefulShutdown = 3
}