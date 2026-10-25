using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.AgentWorker.Providers.Video;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using ITBRecorderAgent.Engine;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Providers.Video;

namespace ITB_SCREEN_RECORDER.AgentWorker.Engine
{
    public sealed class DisplayPipelineInstance : IDisposable
    {
        public string DisplayId { get; }
        public bool IsPrimary { get; }
        public DxgiDisplayDescriptor Descriptor { get; }
        public IScreenCaptureProvider ScreenCapture { get; }
        public FfmpegProcessManager Ffmpeg { get; }
        public VideoPipeline VideoPipe { get; }
        public CancellationTokenSource Cts { get; }
        public Task? CaptureTask { get; set; }
        public Task? WriterTask { get; set; }
        public Task? PacerTask { get; set; }
        public byte[]? LatestFrame;

        public DisplayPipelineInstance(
            string displayId,
            bool isPrimary,
            DxgiDisplayDescriptor descriptor,
            IScreenCaptureProvider screenCapture,
            FfmpegProcessManager ffmpeg,
            VideoPipeline videoPipe,
            CancellationTokenSource cts)
        {
            DisplayId = displayId;
            IsPrimary = isPrimary;
            Descriptor = descriptor;
            ScreenCapture = screenCapture;
            Ffmpeg = ffmpeg;
            VideoPipe = videoPipe;
            Cts = cts;
            byte[] initial = new byte[Math.Max(1, descriptor.Width * descriptor.Height * 4)];
            if (screenCapture.TryCaptureFrame(out var captured) && captured != null)
            {
                Buffer.BlockCopy(captured, 0, initial, 0, Math.Min(captured.Length, initial.Length));
            }
            LatestFrame = initial;
        }

        public void Dispose()
        {
            try { Cts.Cancel(); } catch { }
            try { VideoPipe.Complete(); } catch { }
            try { Ffmpeg.Dispose(); } catch { }
            try { ScreenCapture.Dispose(); } catch { }
            try { Cts.Dispose(); } catch { }
        }
    }

    public class MultiDisplayPipelineManager : IDisposable
    {
        private readonly AppConfig _config;
        private readonly ConcurrentDictionary<string, DisplayPipelineInstance> _activePipelines = new();
        private readonly object _syncLock = new();
        private StationDisplayTopologyDto? _currentTopology;

        public StationDisplayTopologyDto? CurrentTopology => _currentTopology;
        public IReadOnlyCollection<DisplayPipelineInstance> ActivePipelines => _activePipelines.Values.ToList();

        public MultiDisplayPipelineManager(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public List<DxgiDisplayDescriptor> DiscoverDisplays()
        {
#if WINDOWS
            if (OperatingSystem.IsWindows())
            {
                var dxgiDisplays = DxgiDisplayEnumerator.EnumerateAttachedDisplays();
                if (dxgiDisplays.Count > 0)
                {
                    return dxgiDisplays;
                }
            }
#endif

            if (OperatingSystem.IsLinux())
            {
                var linuxDisplays = LinuxX11DisplayEnumerator.EnumerateDisplays();
                if (linuxDisplays.Count > 0)
                {
                    return linuxDisplays;
                }
            }

            // Fallback for single display or fallback systems
            return new List<DxgiDisplayDescriptor>
            {
                new DxgiDisplayDescriptor(
                    AdapterIndex: uint.MaxValue,
                    OutputIndex: 0,
                    DisplayId: "mon-0",
                    DeviceName: OperatingSystem.IsWindows() ? @"\\.\DISPLAY1" : ":0.0",
                    AdapterName: "Default Display Adapter",
                    AdapterLuid: "0x0",
                    X: 0,
                    Y: 0,
                    Width: 1920,
                    Height: 1080,
                    IsPrimary: true)
            };
        }

        public async Task SynchronizePipelinesAsync(
            string baseDestination,
            TimeSpan serverUtcOffset,
            int baselineFps,
            string videoBitrate,
            IAudioCaptureProvider? audioCapture,
            AudioPacer? audioPacer,
            Action<int> trackMediaBytes,
            Action onBrokenPipe,
            CancellationToken sessionCt)
        {
            var discovered = DiscoverDisplays();
            var discoveredIds = new HashSet<string>(discovered.Select(d => d.DisplayId));

            // 1. Remove disconnected display pipelines
            foreach (var kvp in _activePipelines.ToList())
            {
                if (!discoveredIds.Contains(kvp.Key))
                {
                    Logger.Warn($"[MULTI-DISPLAY] Display '{kvp.Key}' disconnected. Flushing and releasing pipeline...");
                    if (_activePipelines.TryRemove(kvp.Key, out var removedPipeline))
                    {
                        removedPipeline.Dispose();
                    }
                }
            }

            // 2. Spawn newly connected displays
            foreach (var desc in discovered)
            {
                if (_activePipelines.ContainsKey(desc.DisplayId))
                {
                    continue;
                }

                Logger.Info($"[MULTI-DISPLAY] Spawning pipeline for display '{desc.DisplayId}' ({desc.Width}x{desc.Height} @ {desc.X},{desc.Y}, Primary: {desc.IsPrimary})");

                try
                {
                    var pipeline = await StartSinglePipelineAsync(
                        desc,
                        baseDestination,
                        serverUtcOffset,
                        baselineFps,
                        videoBitrate,
                        audioCapture,
                        audioPacer,
                        trackMediaBytes,
                        onBrokenPipe,
                        sessionCt).ConfigureAwait(false);

                    if (pipeline != null)
                    {
                        _activePipelines[desc.DisplayId] = pipeline;
                    }
                }
                catch (Exception ex)
                {
                    Logger.Error($"[MULTI-DISPLAY] Failed to initialize pipeline for display '{desc.DisplayId}': {ex.Message}");
                }
            }

            // 3. Update cached topology DTO
            UpdateTopologyDto();
        }

        private void UpdateTopologyDto()
        {
            var active = _activePipelines.Values.Select(p => p.Descriptor).ToList();
            if (active.Count == 0)
            {
                _currentTopology = null;
                return;
            }

            int minX = active.Min(d => d.X);
            int minY = active.Min(d => d.Y);
            int maxX = active.Max(d => d.X + d.Width);
            int maxY = active.Max(d => d.Y + d.Height);

            var displays = active.Select(d => new DisplayMetadataDto
            {
                DisplayId = d.DisplayId,
                DisplayName = d.DeviceName,
                AdapterName = d.AdapterName,
                AdapterLuid = d.AdapterLuid,
                IsPrimary = d.IsPrimary,
                X = d.X,
                Y = d.Y,
                Width = d.Width,
                Height = d.Height,
                ScaleFactor = 1.0,
                RefreshRateHz = 60,
                TargetFps = d.IsPrimary ? 30 : 20
            }).ToList();

            _currentTopology = new StationDisplayTopologyDto
            {
                Hostname = Environment.MachineName,
                Displays = displays,
                VirtualDesktopBounds = new DesktopBoundsDto
                {
                    X = minX,
                    Y = minY,
                    Width = Math.Max(1, maxX - minX),
                    Height = Math.Max(1, maxY - minY)
                },
                TimestampEpochMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
            };
        }

        private async Task<DisplayPipelineInstance?> StartSinglePipelineAsync(
            DxgiDisplayDescriptor desc,
            string baseDestination,
            TimeSpan serverUtcOffset,
            int baselineFps,
            string videoBitrate,
            IAudioCaptureProvider? audioCapture,
            AudioPacer? audioPacer,
            Action<int> trackMediaBytes,
            Action onBrokenPipe,
            CancellationToken sessionCt)
        {
            IScreenCaptureProvider screenCapture;
#if WINDOWS
            if (OperatingSystem.IsWindows() && desc.AdapterIndex != uint.MaxValue)
            {
                screenCapture = new ResilientScreenCapture(desc.AdapterIndex, desc.OutputIndex, desc.DisplayId, desc.X, desc.Y, desc.Width, desc.Height);
            }
            else
            {
                screenCapture = ScreenCaptureFactory.CreateForDisplay(desc.X, desc.Y, desc.Width, desc.Height, desc.DisplayId);
            }
#else
            if (OperatingSystem.IsLinux())
            {
                screenCapture = ScreenCaptureFactory.CreateForDisplay(desc.X, desc.Y, desc.Width, desc.Height, desc.DisplayId);
            }
            else
            {
                screenCapture = ScreenCaptureFactory.Create();
            }
#endif

            screenCapture.Initialize();

            var ffmpeg = new FfmpegProcessManager(_config);
            int targetFps = desc.IsPrimary ? baselineFps : Math.Min(20, baselineFps);
            var videoPipe = new VideoPipeline(screenCapture.Width, screenCapture.Height, targetFps);

            string destination = ResolveDisplayDestination(baseDestination, desc.DisplayId);
            DateTime calibratedUtc = DateTime.UtcNow + serverUtcOffset;

            int audioChannels = desc.IsPrimary ? 2 : 0; // Secondary displays are video-only

            bool started = await ffmpeg.StartAsync(
                destination,
                calibratedUtc,
                screenCapture.Width,
                screenCapture.Height,
                48000,
                audioChannels,
                "f32le",
                targetFps,
                videoBitrate,
                sessionCt).ConfigureAwait(false);

            if (!started)
            {
                Logger.Error($"[MULTI-DISPLAY] FFmpeg failed to start for display '{desc.DisplayId}'.");
                ffmpeg.Dispose();
                screenCapture.Dispose();
                return null;
            }

            if (desc.IsPrimary)
            {
                var handshakeTask = ffmpeg.CompleteAudioHandshakeAsync(sessionCt);

                // Write initial video frame immediately to satisfy FFmpeg stream probe on pipe:0
                // before it attempts connecting to the audio TCP loopback socket, preventing handshake deadlock timeout.
                _ = Task.Run(() =>
                {
                    byte[]? initialFrame = null;
                    try
                    {
                        if (screenCapture.TryCaptureFrame(out var captured) && captured != null)
                        {
                            initialFrame = new byte[captured.Length];
                            Buffer.BlockCopy(captured, 0, initialFrame, 0, captured.Length);
                        }
                    }
                    catch { }

                    initialFrame ??= new byte[screenCapture.Width * screenCapture.Height * 4];
                    ffmpeg.WriteVideoFrame(initialFrame);
                }, sessionCt);

                if (!await handshakeTask.ConfigureAwait(false))
                {
                    Logger.Error($"[MULTI-DISPLAY] Audio handshake timed out for primary display '{desc.DisplayId}'.");
                    ffmpeg.Dispose();
                    screenCapture.Dispose();
                    return null;
                }
            }

            var cts = CancellationTokenSource.CreateLinkedTokenSource(sessionCt);
            var instance = new DisplayPipelineInstance(desc.DisplayId, desc.IsPrimary, desc, screenCapture, ffmpeg, videoPipe, cts);

            // Writer task
            instance.WriterTask = videoPipe.StartWriterAsync(
                ffmpeg,
                () =>
                {
                    Logger.Warn($"[MULTI-DISPLAY] Broken pipe on display '{desc.DisplayId}'.");
                    onBrokenPipe();
                },
                bytes => trackMediaBytes((int)bytes),
                cts.Token);

            // Screen capture thread
            instance.CaptureTask = Task.Run(() =>
            {
                long lastTicks = Stopwatch.GetTimestamp();
                int errors = 0;

                while (!cts.Token.IsCancellationRequested)
                {
                    if (Stopwatch.GetElapsedTime(lastTicks).TotalMilliseconds >= (1000.0 / videoPipe.InternalCaptureFps))
                    {
                        try
                        {
                            if (screenCapture.TryCaptureFrame(out byte[]? frame) && frame != null)
                            {
                                Interlocked.Exchange(ref instance.LatestFrame, frame);
                                errors = 0;
                            }
                        }
                        catch (Exception ex)
                        {
                            errors++;
                            if (errors % 30 == 0)
                            {
                                Logger.Warn($"[MULTI-DISPLAY] Screen capture consecutive errors on '{desc.DisplayId}': {ex.Message}");
                            }
                        }

                        lastTicks = Stopwatch.GetTimestamp();
                    }
                    else
                    {
                        Thread.Sleep(1);
                    }
                }
            }, cts.Token);

            // Pacer loop task
            long startTicks = Stopwatch.GetTimestamp();
            instance.PacerTask = Task.Run(() =>
            {
                videoPipe.RunPacerLoop(
                    () => Volatile.Read(ref instance.LatestFrame),
                    screenCapture.Width,
                    screenCapture.Height,
                    targetFps,
                    startTicks,
                    () => !cts.Token.IsCancellationRequested,
                    cts.Token);
            }, cts.Token);

            Logger.Info($"[MULTI-DISPLAY] Pipeline successfully engaged for display '{desc.DisplayId}' -> {destination}");
            return instance;
        }

        private static string ResolveDisplayDestination(string baseDestination, string displayId)
        {
            if (string.IsNullOrWhiteSpace(baseDestination))
            {
                return baseDestination;
            }

            // If destination already specifies a display path, return as is
            if (baseDestination.EndsWith($"/{displayId}", StringComparison.OrdinalIgnoreCase))
            {
                return baseDestination;
            }

            // Append /{displayId} to RTMP/RTMPS stream URL
            if (baseDestination.StartsWith("rtmp://", StringComparison.OrdinalIgnoreCase) ||
                baseDestination.StartsWith("rtmps://", StringComparison.OrdinalIgnoreCase))
            {
                return $"{baseDestination.TrimEnd('/')}/{displayId}";
            }

            // If file path (e.g. offline recording)
            string dir = Path.GetDirectoryName(baseDestination) ?? string.Empty;
            string fname = Path.GetFileNameWithoutExtension(baseDestination);
            string ext = Path.GetExtension(baseDestination);

            return Path.Combine(dir, $"{fname}_{displayId}{ext}");
        }

        public void Dispose()
        {
            lock (_syncLock)
            {
                foreach (var kvp in _activePipelines)
                {
                    try { kvp.Value.Dispose(); } catch { }
                }
                _activePipelines.Clear();
            }
        }
    }
}
