using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Threading;

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public class SystemMetricsProfiler : IDisposable
    {
        private readonly Timer _sampleTimer;
        private readonly Process _currentProcess;
        private readonly int _processorCount;

        private DateTime _lastCpuSampleTime;
        private TimeSpan _lastTotalProcessorTime;

        // Atomic counter references avoiding boxing/unboxing overhead
        private long _mediaBytesIngress;
        private long _telemetryBytesIngress;

        /// <summary>
        /// Event fired once per second delivering real-time telemetry metrics decoupled from disk I/O.
        /// </summary>
        public event Action<MetricsSnapshot>? OnMetricsSampled;

        public SystemMetricsProfiler()
        {
            _currentProcess = Process.GetCurrentProcess();
            _processorCount = Environment.ProcessorCount;
            _lastCpuSampleTime = DateTime.UtcNow;
            _lastTotalProcessorTime = _currentProcess.TotalProcessorTime;

            // Monotonic high-resolution sampling timer running on thread-pool
            _sampleTimer = new Timer(CollectMetrics, null, 1000, 1000);
        }

        public void TrackMediaBytes(long bytes) => Interlocked.Add(ref _mediaBytesIngress, bytes);
        public void TrackTelemetryBytes(long bytes) => Interlocked.Add(ref _telemetryBytesIngress, bytes);

        private void CollectMetrics(object? state)
        {
            DateTime now = DateTime.UtcNow;
            double elapsedSeconds = (now - _lastCpuSampleTime).TotalSeconds;
            if (elapsedSeconds <= 0) return;

            // Atomic read and reset of ingress byte accumulators
            long mediaBytes = Interlocked.Exchange(ref _mediaBytesIngress, 0);
            long telemBytes = Interlocked.Exchange(ref _telemetryBytesIngress, 0);

            // Compute bandwidth rates in Mbps and Kbps
            double mediaMbps = (mediaBytes * 8.0) / (elapsedSeconds * 1_000_000.0);
            double telemKbps = (telemBytes * 8.0) / (elapsedSeconds * 1_000.0);

            // Passive process CPU utilization calculation
            TimeSpan currentTotalCpu = _currentProcess.TotalProcessorTime;
            double cpuUsedMs = (currentTotalCpu - _lastTotalProcessorTime).TotalMilliseconds;
            double totalPassedMs = elapsedSeconds * 1000.0 * _processorCount;
            double processCpuPct = Math.Round((cpuUsedMs / totalPassedMs) * 100.0, 2);

            _lastCpuSampleTime = now;
            _lastTotalProcessorTime = currentTotalCpu;

            _currentProcess.Refresh();
            double workingSetMb = Math.Round(_currentProcess.WorkingSet64 / (1024.0 * 1024.0), 2);

            var snapshot = new MetricsSnapshot
            {
                Timestamp = now,
                MediaMbps = Math.Round(mediaMbps, 2),
                TelemetryKbps = Math.Round(telemKbps, 2),
                ProcessCpuPct = processCpuPct,
                ProcessRamMb = workingSetMb
            };

            OnMetricsSampled?.Invoke(snapshot);
        }

        public void Dispose()
        {
            _sampleTimer.Dispose();
            _currentProcess.Dispose();
        }
    }

    public struct MetricsSnapshot
    {
        public DateTime Timestamp { get; set; }
        public double MediaMbps { get; set; }
        public double TelemetryKbps { get; set; }
        public double ProcessCpuPct { get; set; }
        public double ProcessRamMb { get; set; }
    }
}