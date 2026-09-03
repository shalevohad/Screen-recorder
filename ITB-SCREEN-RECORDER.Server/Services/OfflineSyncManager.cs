using System;
using System.Collections.Concurrent;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class OfflineSyncManager
    {
        private const int MaxConcurrentUploads = 5;
        private readonly ConcurrentDictionary<string, DateTime> _activeUploads = new();

        public BufferCommand GetSyncCommand(string hostname, long debtSizeMb)
        {
            var now = DateTime.UtcNow;
            foreach (var key in _activeUploads.Keys)
            {
                if (_activeUploads.TryGetValue(key, out var startTime) && (now - startTime).TotalMinutes > 5)
                {
                    _activeUploads.TryRemove(key, out _);
                }
            }

            if (debtSizeMb == 0)
            {
                _activeUploads.TryRemove(hostname, out _);
                return BufferCommand.WAIT;
            }

            if (_activeUploads.ContainsKey(hostname))
            {
                _activeUploads[hostname] = now;
                return BufferCommand.UPLOAD_GRANTED;
            }

            if (_activeUploads.Count < MaxConcurrentUploads)
            {
                _activeUploads.TryAdd(hostname, now);
                return BufferCommand.UPLOAD_GRANTED;
            }

            return BufferCommand.WAIT;
        }

        public int GetActiveUploadsCount() => _activeUploads.Count;
    }
}