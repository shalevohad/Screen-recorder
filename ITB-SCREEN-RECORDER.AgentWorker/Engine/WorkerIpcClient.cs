using System;
using System.IO;
using System.IO.Pipes;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace ITBRecorderAgent.Engine
{
    public class WorkerIpcClient
    {
        public event Action<string, TimeSpan, int, string>? StartRequested;
        public event Action? StopRequested;
        // תיקון קריטי: העברת הפרמטרים המעודכנים באירוע ה-Restart
        public event Action<string, TimeSpan, int, string>? RestartRequested;
        public event Action<int>? CaptureFpsRequested;
        public event Action? ServerDisconnected;
        public event Action? ServerConnected;

        public Task RunAsync(Func<object> getTelemetryPayload, CancellationToken ct)
        {
            return Task.Run(async () =>
            {
                while (!ct.IsCancellationRequested)
                {
                    try
                    {
                        using var client = new NamedPipeClientStream(".", "ITB_Agent_IPC", PipeDirection.InOut, PipeOptions.Asynchronous);
                        await client.ConnectAsync(3000, ct).ConfigureAwait(false);

                        using var reader = new StreamReader(client);
                        using var writer = new StreamWriter(client) { AutoFlush = true };

                        var listenerTask = Task.Run(async () =>
                        {
                            while (!ct.IsCancellationRequested && client.IsConnected)
                            {
                                string? line = await reader.ReadLineAsync(ct).ConfigureAwait(false);
                                if (!string.IsNullOrWhiteSpace(line)) ProcessCommand(line.Trim());
                            }
                        }, ct);

                        while (!ct.IsCancellationRequested && client.IsConnected)
                        {
                            var report = getTelemetryPayload();
                            await writer.WriteLineAsync(JsonSerializer.Serialize(report)).ConfigureAwait(false);
                            await Task.Delay(1000, ct).ConfigureAwait(false);
                        }
                    }
                    catch
                    {
                        if (!ct.IsCancellationRequested) await Task.Delay(2000, ct).ConfigureAwait(false);
                    }
                }
            }, ct);
        }

        private void ProcessCommand(string raw)
        {
            string[] parts = raw.Split('|');
            string cmd = parts[0];

            if (cmd.Equals("Stop", StringComparison.OrdinalIgnoreCase))
            {
                StopRequested?.Invoke();
            }
            else if (cmd.Equals("ServerDisconnected", StringComparison.OrdinalIgnoreCase))
            {
                ServerDisconnected?.Invoke();
            }
            else if (cmd.Equals("ServerConnected", StringComparison.OrdinalIgnoreCase))
            {
                ServerConnected?.Invoke();
            }
            else if (cmd.Equals("SetCaptureFps", StringComparison.OrdinalIgnoreCase))
            {
                if (parts.Length > 1 && int.TryParse(parts[1], out int requestedFps))
                {
                    CaptureFpsRequested?.Invoke(requestedFps);
                }
            }
            else if (cmd.Equals("Start", StringComparison.OrdinalIgnoreCase) || cmd.Equals("Restart", StringComparison.OrdinalIgnoreCase))
            {
                string dest = parts.Length > 1 ? parts[1] : string.Empty;
                TimeSpan offset = (parts.Length > 2 && long.TryParse(parts[2], out long ticks)) ? TimeSpan.FromTicks(ticks) : TimeSpan.Zero;
                int targetFps = (parts.Length > 3 && int.TryParse(parts[3], out int parsedFps)) ? parsedFps : 30;
                string bitrate = parts.Length > 4 ? parts[4] : "5000k";

                if (cmd.Equals("Start", StringComparison.OrdinalIgnoreCase))
                {
                    StartRequested?.Invoke(dest, offset, targetFps, bitrate);
                }
                else
                {
                    // תיקון: העברת הפרמטרים החדשים כדי שיתעדכנו בצינור ה-FFmpeg
                    RestartRequested?.Invoke(dest, offset, targetFps, bitrate);
                }
            }
        }
    }
}