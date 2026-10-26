namespace ITB_SCREEN_RECORDER.Core.Common;

public class SingleInstanceLock : IDisposable
{
    private readonly Mutex? _mutex;
    private readonly bool _hasHandle;
    private bool _disposed;

    public SingleInstanceLock(string mutexName)
    {
        try
        {
            _mutex = new Mutex(true, mutexName, out bool createdNew);
            if (createdNew)
            {
                _hasHandle = true;
            }
            else
            {
                // The mutex already exists. Probe with a short timeout to check if it was abandoned or free.
                try
                {
                    _hasHandle = _mutex.WaitOne(TimeSpan.FromMilliseconds(250), false);
                }
                catch (AbandonedMutexException)
                {
                    // The previous owning process was terminated (e.g. watchdog kill or crash).
                    // The OS has now transferred ownership to this instance.
                    _hasHandle = true;
                }
            }
        }
        catch
        {
            _hasHandle = false;
        }
    }

    public bool Acquire() => _hasHandle;

    public void Dispose()
    {
        if (_disposed) return;
        if (_hasHandle && _mutex != null)
        {
            try { _mutex.ReleaseMutex(); } catch (ApplicationException) { }
        }
        _mutex?.Dispose();
        _disposed = true;
        GC.SuppressFinalize(this);
    }
}