using System;
using System.IO;
using System.Threading;

namespace ITBRecorderAgent.Core
{
    public class SingleInstanceLock : IDisposable
    {
        private Mutex? _windowsMutex;
        private FileStream? _linuxLockStream;
        public bool IsAcquired { get; private set; }

        public SingleInstanceLock(string appName)
        {
            if (OperatingSystem.IsWindows())
            {
                string mutexName = $@"Global\{appName}";
                _windowsMutex = new Mutex(true, mutexName, out bool createdNew);
                IsAcquired = createdNew;
            }
            else
            {
                try
                {
                    string lockPath = Path.Combine(Path.GetTempPath(), $"{appName}.lock");
                    _linuxLockStream = new FileStream(lockPath, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None);
                    IsAcquired = true;
                }
                catch
                {
                    IsAcquired = false;
                }
            }
        }

        public void Dispose()
        {
            if (OperatingSystem.IsWindows() && _windowsMutex != null)
            {
                if (IsAcquired)
                {
                    try { _windowsMutex.ReleaseMutex(); } catch { }
                }
                _windowsMutex.Dispose();
            }
            else if (_linuxLockStream != null)
            {
                _linuxLockStream.Dispose();
            }
        }
    }
}