namespace ITB_SCREEN_RECORDER.Core.Common;

public class SingleInstanceLock : IDisposable
{
    private readonly Mutex _mutex;
    private readonly bool _hasHandle;
    private bool _disposed;

    public SingleInstanceLock(string mutexName)
    {
        _mutex = new Mutex(true, mutexName, out _hasHandle);
    }

    public bool Acquire() => _hasHandle;

    public void Dispose()
    {
        if (_disposed) return;
        if (_hasHandle)
        {
            try { _mutex.ReleaseMutex(); } catch (ApplicationException) { }
        }
        _mutex.Dispose();
        _disposed = true;
        GC.SuppressFinalize(this);
    }
}