namespace ITB_SCREEN_RECORDER.Core.Ipc;

/// <summary>
/// Represents internal user session state across Windows (Session 0/1+) and Linux environments.
/// </summary>
public enum InternalSessionState
{
    ActiveInteractive,
    ScreenLocked,
    LoggedOff,
    DxgiAccessLost
}

/// <summary>
/// Inter-process communication heartbeat and status message emitted from AgentWorker to AgentService.
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
/// Operational lifecycle control commands dispatched from AgentService to AgentWorker via IPC pipe.
/// </summary>
public enum WorkerControlCommand
{
    PauseDueToLock = 1,
    ResumeAfterUnlock = 2,
    GracefulShutdown = 3
}