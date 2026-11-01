// ==========================================
// File: AgentWorker/Engine/WorkerIpcClient.cs
// ==========================================
using System;
using System.IO;
using System.IO.Pipes;
using System.Text.Json;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITBRecorderAgent.Engine
{
    public class WorkerIpcClient
    {
        public event Action<string, TimeSpan, int, string>? StartRequested;
        public event Action? StopRequested;
        public event Action<string, TimeSpan, int, string>? RestartRequested;
        public event Action<int>? CaptureFpsRequested;
        public event Action<TimeSpan>? ClockSyncRequested;
        public event Action? ServerDisconnected;
        public event Action? ServerConnected;
        public event Action<string, string>? EncryptionKeyConfigured;
        public event Action<bool>? RecordingStateChanged;

        private readonly Channel<string> _outgoingChannel = Channel.CreateBounded<string>(new BoundedChannelOptions(500)
        {
            FullMode = BoundedChannelFullMode.DropOldest,
            SingleReader = true,
            SingleWriter = false
        });

        public void SendKeystrokeImmediate(KeystrokeEventDto key)
        {
            if (key == null) return;
            try
            {
                string json = JsonSerializer.Serialize(key);
                _outgoingChannel.Writer.TryWrite($"Key|{json}");
            }
            catch (Exception ex)
            {
                Logger.Warn($"[WORKER:IPC] Failed to enqueue immediate keystroke: {ex.Message}");
            }
        }

        public Task RunAsync(Func<object> getTelemetryPayload, CancellationToken ct)
        {
            return Task.Run(async () =>
            {
                bool loggedConnecting = false;
                while (!ct.IsCancellationRequested)
                {
                    try
                    {
                        using var client = new NamedPipeClientStream(".", "ITB_Agent_IPC", PipeDirection.InOut, PipeOptions.Asynchronous);
                        if (!loggedConnecting)
                        {
                            Logger.Info("[WORKER:IPC] Connecting to Supervisor IPC pipe 'ITB_Agent_IPC'...");
                            loggedConnecting = true;
                        }

                        await client.ConnectAsync(3000, ct).ConfigureAwait(false);

                        using var reader = new StreamReader(client);
                        using var writer = new StreamWriter(client) { AutoFlush = true };

                        string? ipcToken = GetIpcToken();
                        Logger.Info($"[WORKER:IPC] Connected to Supervisor IPC pipe. AuthTokenPresent: {!string.IsNullOrEmpty(ipcToken)}");
                        if (!string.IsNullOrEmpty(ipcToken))
                        {
                            await writer.WriteLineAsync($"Auth|{ipcToken}").ConfigureAwait(false);
                        }

                        loggedConnecting = false;

                        using var connCts = CancellationTokenSource.CreateLinkedTokenSource(ct);

                        var listenerTask = Task.Run(async () =>
                        {
                            try
                            {
                                while (!connCts.Token.IsCancellationRequested && client.IsConnected)
                                {
                                    string? line = await reader.ReadLineAsync(connCts.Token).ConfigureAwait(false);
                                    if (!string.IsNullOrWhiteSpace(line)) ProcessCommand(line.Trim());
                                }
                            }
                            catch (Exception ex) when (!connCts.Token.IsCancellationRequested)
                            {
                                Logger.Warn($"[WORKER:IPC] Command listener stream terminated: {ex.Message}");
                            }
                            finally
                            {
                                connCts.Cancel();
                            }
                        }, connCts.Token);

                        var channelWriterTask = Task.Run(async () =>
                        {
                            try
                            {
                                while (!connCts.Token.IsCancellationRequested && client.IsConnected)
                                {
                                    if (await _outgoingChannel.Reader.WaitToReadAsync(connCts.Token).ConfigureAwait(false))
                                    {
                                        while (_outgoingChannel.Reader.TryRead(out var msg))
                                        {
                                            await writer.WriteLineAsync(msg).ConfigureAwait(false);
                                        }
                                    }
                                }
                            }
                            catch (Exception ex) when (!connCts.Token.IsCancellationRequested)
                            {
                                Logger.Warn($"[WORKER:IPC] Channel writer stream terminated: {ex.Message}");
                            }
                            finally
                            {
                                connCts.Cancel();
                            }
                        }, connCts.Token);

                        var telemetryTask = Task.Run(async () =>
                        {
                            try
                            {
                                while (!connCts.Token.IsCancellationRequested && client.IsConnected)
                                {
                                    var report = getTelemetryPayload();
                                    string telemJson = JsonSerializer.Serialize(report);
                                    _outgoingChannel.Writer.TryWrite(telemJson);
                                    await Task.Delay(1000, connCts.Token).ConfigureAwait(false);
                                }
                            }
                            catch (OperationCanceledException) { }
                            finally
                            {
                                connCts.Cancel();
                            }
                        }, connCts.Token);

                        await Task.WhenAny(listenerTask, channelWriterTask, telemetryTask).ConfigureAwait(false);
                        connCts.Cancel();
                    }
                    catch (OperationCanceledException) when (ct.IsCancellationRequested)
                    {
                        break;
                    }
                    catch (Exception ex)
                    {
                        Logger.Warn($"[WORKER:IPC] IPC pipe connection interrupted or waiting for supervisor: {ex.Message}");
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
            else if (cmd.Equals("SyncClock", StringComparison.OrdinalIgnoreCase))
            {
                // Ingest calibrated wall-clock drift offset from AgentSupervisor in real time
                if (parts.Length > 1 && long.TryParse(parts[1], out long ticks))
                {
                    ClockSyncRequested?.Invoke(TimeSpan.FromTicks(ticks));
                }
            }
            else if (cmd.Equals("SetCaptureFps", StringComparison.OrdinalIgnoreCase))
            {
                if (parts.Length > 1 && int.TryParse(parts[1], out int requestedFps))
                {
                    CaptureFpsRequested?.Invoke(requestedFps);
                }
            }
            else if (cmd.Equals("SetEncryptionKey", StringComparison.OrdinalIgnoreCase))
            {
                if (parts.Length > 2)
                {
                    EncryptionKeyConfigured?.Invoke(parts[1], parts[2]);
                }
            }
            else if (cmd.Equals("SetRecording", StringComparison.OrdinalIgnoreCase))
            {
                if (parts.Length > 1 && bool.TryParse(parts[1], out bool shouldRecord))
                {
                    RecordingStateChanged?.Invoke(shouldRecord);
                }
            }
            else if (cmd.Equals("Start", StringComparison.OrdinalIgnoreCase) || cmd.Equals("Restart", StringComparison.OrdinalIgnoreCase))
            {
                string dest = parts.Length > 1 ? parts[1] : string.Empty;
                TimeSpan offset = (parts.Length > 2 && long.TryParse(parts[2], out long ticks)) ? TimeSpan.FromTicks(ticks) : TimeSpan.Zero;
                int targetFps = (parts.Length > 3 && int.TryParse(parts[3], out int parsedFps)) ? parsedFps : 15;
                string bitrate = parts.Length > 4 ? parts[4] : "2000k";

                if (cmd.Equals("Start", StringComparison.OrdinalIgnoreCase))
                {
                    StartRequested?.Invoke(dest, offset, targetFps, bitrate);
                }
                else
                {
                    RestartRequested?.Invoke(dest, offset, targetFps, bitrate);
                }
            }
        }

        private static string? GetIpcToken()
        {
            var args = Environment.GetCommandLineArgs();
            for (int i = 0; i < args.Length - 1; i++)
            {
                if (string.Equals(args[i], "--ipc-token", StringComparison.OrdinalIgnoreCase))
                {
                    return args[i + 1];
                }
            }

            var envToken = Environment.GetEnvironmentVariable("ITB_IPC_TOKEN");
            if (!string.IsNullOrWhiteSpace(envToken)) return envToken.Trim();

            try
            {
                string tokenFilePath = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
                    "ITB-SCREEN-RECORDER",
                    ".ipc_token");

                if (File.Exists(tokenFilePath))
                {
                    string fileToken = File.ReadAllText(tokenFilePath).Trim();
                    if (!string.IsNullOrWhiteSpace(fileToken))
                    {
                        return fileToken;
                    }
                }
            }
            catch { }

            return null;
        }
    }
}