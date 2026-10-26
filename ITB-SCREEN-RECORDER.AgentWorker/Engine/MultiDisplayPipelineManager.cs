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
        public IScreenCaptureProvider? ScreenCapture { get; }
        public FfmpegProcessManager? Ffmpeg { get; }
        public VideoPipeline? VideoPipe { get; }
        public CancellationTokenSource? Cts { get; }
        public Task? CaptureTask { get; set; }
        public Task? WriterTask { get; set; }
        public Task? PacerTask { get; set; }
        public byte[]? LatestFrame;
        private readonly bool? _hasAudioExplicit;
        public bool HasAudio => _hasAudioExplicit ?? (Ffmpeg?.HasAudio ?? false);
        public string PhysicalKey => Descriptor.PhysicalKey;

        public DisplayPipelineInstance(
            string displayId,
            bool isPrimary,
            DxgiDisplayDescriptor descriptor,
            IScreenCaptureProvider? screenCapture,
            FfmpegProcessManager? ffmpeg,
            VideoPipeline? videoPipe,
            CancellationTokenSource? cts,
            bool? hasAudio = null)
        {
            DisplayId = displayId;
            IsPrimary = isPrimary;
            Descriptor = descriptor;
            ScreenCapture = screenCapture;
            Ffmpeg = ffmpeg;
            VideoPipe = videoPipe;
            Cts = cts;
            _hasAudioExplicit = hasAudio;
            byte[] initial = new byte[Math.Max(1, descriptor.Width * descriptor.Height * 4)];
            if (screenCapture != null && screenCapture.TryCaptureFrame(out var captured) && captured != null)
            {
                Buffer.BlockCopy(captured, 0, initial, 0, Math.Min(captured.Length, initial.Length));
            }
            LatestFrame = initial;
        }

        public void Dispose()
        {
            try { Cts?.Cancel(); } catch { }
            try { VideoPipe?.Complete(); } catch { }
            try { Ffmpeg?.Dispose(); } catch { }
            try { ScreenCapture?.Dispose(); } catch { }
            try { Cts?.Dispose(); } catch { }
        }
    }

    public class MultiDisplayPipelineManager : IDisposable
    {
        private sealed class SyncContext
        {
            public string BaseDestination { get; set; } = string.Empty;
            public TimeSpan ServerUtcOffset { get; set; }
            public int BaselineFps { get; set; }
            public string VideoBitrate { get; set; } = "4000k";
            public IAudioCaptureProvider? AudioCapture { get; set; }
            public AudioPacer? AudioPacer { get; set; }
            public Action<int>? TrackMediaBytes { get; set; }
            public Action? OnBrokenPipe { get; set; }
            public CancellationToken SessionCt { get; set; }
        }

        private readonly AppConfig _config;
        private readonly ConcurrentDictionary<string, DisplayPipelineInstance> _activePipelines = new();
        private readonly SemaphoreSlim _syncSemaphore = new(1, 1);
        private readonly object _syncLock = new();
        private StationDisplayTopologyDto? _currentTopology;
        private DateTime? _preferredPrimaryReconnectedAtUtc;
        private string? _stabilizingPrimaryPhysicalKey;
        private CancellationTokenSource? _stabilizationCts;
        private SyncContext? _lastSyncContext;

        public StationDisplayTopologyDto? CurrentTopology => _currentTopology;
        public IReadOnlyCollection<DisplayPipelineInstance> ActivePipelines => _activePipelines.Values.ToList();
        public TimeSpan AudioCarrierHysteresis { get; set; }
        public Func<DateTime> UtcNow { get; set; } = () => DateTime.UtcNow;
        public DateTime? PreferredPrimaryReconnectedAtUtc => _preferredPrimaryReconnectedAtUtc;

        public MultiDisplayPipelineManager(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            int seconds = _config.AudioCarrierHysteresisSeconds > 0 ? _config.AudioCarrierHysteresisSeconds : 60;
            AudioCarrierHysteresis = TimeSpan.FromSeconds(seconds);
        }

        public Func<List<DxgiDisplayDescriptor>>? DisplayDiscoverer { get; set; }
        public Func<DxgiDisplayDescriptor, int, Task<DisplayPipelineInstance?>>? PipelineFactory { get; set; }
        public event Action<string, string>? AudioCarrierChanged;

        public DisplayPipelineInstance? AudioCarrierPipeline
        {
            get
            {
                var pipelines = _activePipelines.Values.ToList();
                var withAudio = pipelines.FirstOrDefault(p => p.HasAudio && (p.Ffmpeg == null || p.Ffmpeg.IsRunning));
                if (withAudio != null) return withAudio;

                var primary = pipelines.FirstOrDefault(p => p.IsPrimary && (p.Ffmpeg == null || p.Ffmpeg.IsRunning));
                if (primary != null) return primary;

                return pipelines.FirstOrDefault(p => p.Ffmpeg == null || p.Ffmpeg.IsRunning);
            }
        }

        public List<DxgiDisplayDescriptor> DiscoverDisplays()
        {
            if (DisplayDiscoverer != null)
            {
                return DisplayDiscoverer();
            }

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
            await _syncSemaphore.WaitAsync(sessionCt).ConfigureAwait(false);
            try
            {
                var syncContext = new SyncContext
                {
                    BaseDestination = baseDestination,
                    ServerUtcOffset = serverUtcOffset,
                    BaselineFps = baselineFps,
                    VideoBitrate = videoBitrate,
                    AudioCapture = audioCapture,
                    AudioPacer = audioPacer,
                    TrackMediaBytes = trackMediaBytes,
                    OnBrokenPipe = onBrokenPipe,
                    SessionCt = sessionCt
                };
                _lastSyncContext = syncContext;

                var discovered = DiscoverDisplays();
                if (discovered == null || discovered.Count == 0)
                {
                    Logger.Warn("[MULTI-DISPLAY] No active displays discovered during synchronization.");
                    return;
                }

                var discoveredPhysicalKeys = new HashSet<string>(discovered.Select(d => d.PhysicalKey));
                string? previousCarrierId = AudioCarrierPipeline?.DisplayId;
                var currentCarrier = AudioCarrierPipeline;
                bool isCurrentCarrierStillAttached = currentCarrier != null && discoveredPhysicalKeys.Contains(currentCarrier.PhysicalKey);

                // 1. Remove disconnected display pipelines (physical monitors no longer attached)
                foreach (var kvp in _activePipelines.ToList())
                {
                    if (!discoveredPhysicalKeys.Contains(kvp.Value.Descriptor.PhysicalKey))
                    {
                        Logger.Warn($"[MULTI-DISPLAY] Physical display '{kvp.Key}' ({kvp.Value.Descriptor.DeviceName}) disconnected. Flushing and releasing pipeline...");
                        if (_activePipelines.TryRemove(kvp.Key, out var removedPipeline))
                        {
                            removedPipeline.Dispose();
                        }
                    }
                }

                // Identify preferred primary target among currently attached displays
                var preferredPrimary = discovered.FirstOrDefault(d => d.IsPrimary) ?? discovered[0];

                // Anti-flipflop stabilization check: if the stabilizing primary disconnected before buffer expired, abort timer
                if (_stabilizingPrimaryPhysicalKey != null && !discoveredPhysicalKeys.Contains(_stabilizingPrimaryPhysicalKey))
                {
                    Logger.Warn($"[MULTI-DISPLAY:ANTI-FLIPFLOP] Stabilizing primary display disconnected before buffer expired! Aborting stabilization timer.");
                    _preferredPrimaryReconnectedAtUtc = null;
                    _stabilizingPrimaryPhysicalKey = null;
                    try { _stabilizationCts?.Cancel(); } catch { }
                }

                string targetCarrierPhysicalKey;

                if (isCurrentCarrierStillAttached && currentCarrier != null)
                {
                    if (currentCarrier.PhysicalKey == preferredPrimary.PhysicalKey)
                    {
                        // Primary is ALREADY the active carrier (normal steady state)
                        _preferredPrimaryReconnectedAtUtc = null;
                        _stabilizingPrimaryPhysicalKey = null;
                        try { _stabilizationCts?.Cancel(); } catch { }
                        targetCarrierPhysicalKey = preferredPrimary.PhysicalKey;
                    }
                    else
                    {
                        // Failover was previously active on surviving display (currentCarrier), and preferred primary is present!
                        if (_preferredPrimaryReconnectedAtUtc == null)
                        {
                            _preferredPrimaryReconnectedAtUtc = UtcNow();
                            _stabilizingPrimaryPhysicalKey = preferredPrimary.PhysicalKey;
                            Logger.Info($"[MULTI-DISPLAY:ANTI-FLIPFLOP] Primary display '{preferredPrimary.DisplayId}' ({preferredPrimary.DeviceName}) detected after failover. Initiating {AudioCarrierHysteresis.TotalSeconds:F0}s stabilization buffer before audio handover.");
                            ArmStabilizationTimer(AudioCarrierHysteresis, syncContext);
                        }

                        var elapsed = UtcNow() - _preferredPrimaryReconnectedAtUtc.Value;
                        if (elapsed >= AudioCarrierHysteresis)
                        {
                            // Stably present for full hysteresis window without interruption
                            Logger.Info($"[MULTI-DISPLAY:ANTI-FLIPFLOP] Primary display '{preferredPrimary.DisplayId}' remained stable for {elapsed.TotalSeconds:F1}s (>= {AudioCarrierHysteresis.TotalSeconds:F0}s). Gracefully reclaiming audio carrier role.");
                            _preferredPrimaryReconnectedAtUtc = null;
                            _stabilizingPrimaryPhysicalKey = null;
                            try { _stabilizationCts?.Cancel(); } catch { }
                            targetCarrierPhysicalKey = preferredPrimary.PhysicalKey;
                        }
                        else
                        {
                            // Retain audio on surviving carrier while primary operates in video-only mode
                            var remaining = AudioCarrierHysteresis - elapsed;
                            Logger.Info($"[MULTI-DISPLAY:ANTI-FLIPFLOP] Stabilization buffer in progress ({elapsed.TotalSeconds:F1}s / {AudioCarrierHysteresis.TotalSeconds:F0}s). Retaining audio carrier on surviving display '{currentCarrier.DisplayId}'.");
                            targetCarrierPhysicalKey = currentCarrier.PhysicalKey;
                            ArmStabilizationTimer(remaining, syncContext);
                        }
                    }
                }
                else
                {
                    // Current carrier disconnected or initial launch: immediate failover to preferred primary
                    _preferredPrimaryReconnectedAtUtc = null;
                    _stabilizingPrimaryPhysicalKey = null;
                    try { _stabilizationCts?.Cancel(); } catch { }
                    targetCarrierPhysicalKey = preferredPrimary.PhysicalKey;
                }

                // 2. Synchronize surviving and newly attached display pipelines
                foreach (var desc in discovered)
                {
                    bool isTargetCarrier = (desc.PhysicalKey == targetCarrierPhysicalKey);
                    int desiredAudioChannels = isTargetCarrier ? 2 : 0;

                    // Look up if a pipeline already exists for this physical display
                    var existingKvp = _activePipelines.FirstOrDefault(kvp => kvp.Value.Descriptor.PhysicalKey == desc.PhysicalKey);
                    var existing = existingKvp.Value;

                    if (existing != null)
                    {
                        bool audioRequirementChanged = (isTargetCarrier != existing.HasAudio);
                        bool displayIdChanged = !string.Equals(existing.DisplayId, desc.DisplayId, StringComparison.OrdinalIgnoreCase);

                        if (!audioRequirementChanged && !displayIdChanged && (existing.Ffmpeg == null || existing.Ffmpeg.IsRunning))
                        {
                            // Existing pipeline already matches the required audio carrier role and logical ID
                            continue;
                        }

                        if (audioRequirementChanged)
                        {
                            if (isTargetCarrier)
                            {
                                Logger.Warn($"[MULTI-DISPLAY:AUDIO-FAILOVER] Promoting display '{desc.DisplayId}' ({desc.DeviceName}) to Audio Carrier.");
                            }
                            else
                            {
                                Logger.Info($"[MULTI-DISPLAY:AUDIO-FAILOVER] Demoting display '{desc.DisplayId}' ({desc.DeviceName}) back to secondary video-only.");
                            }
                        }

                        _activePipelines.TryRemove(existingKvp.Key, out _);
                        existing.Dispose();
                    }

                    Logger.Info($"[MULTI-DISPLAY] Engaging pipeline for display '{desc.DisplayId}' ({desc.Width}x{desc.Height} @ {desc.X},{desc.Y}, Primary: {desc.IsPrimary}, AudioChannels: {desiredAudioChannels})");

                    try
                    {
                        DisplayPipelineInstance? pipeline = null;
                        if (PipelineFactory != null)
                        {
                            pipeline = await PipelineFactory(desc, desiredAudioChannels).ConfigureAwait(false);
                        }
                        else
                        {
                            pipeline = await StartSinglePipelineAsync(
                                desc,
                                baseDestination,
                                serverUtcOffset,
                                baselineFps,
                                videoBitrate,
                                audioCapture,
                                audioPacer,
                                trackMediaBytes,
                                onBrokenPipe,
                                sessionCt,
                                desiredAudioChannels).ConfigureAwait(false);
                        }

                        if (pipeline != null)
                        {
                            _activePipelines[desc.DisplayId] = pipeline;
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"[MULTI-DISPLAY] Failed to engage pipeline for display '{desc.DisplayId}': {ex.Message}");
                    }
                }

                // 3. Update cached topology DTO
                UpdateTopologyDto();

                // 4. Notify if Audio Carrier changed
                string? newCarrierId = AudioCarrierPipeline?.DisplayId;
                if (previousCarrierId != newCarrierId)
                {
                    Logger.Info($"[MULTI-DISPLAY:AUDIO-FAILOVER] Audio carrier transitioned from '{previousCarrierId ?? "NONE"}' to '{newCarrierId ?? "NONE"}'.");
                    AudioCarrierChanged?.Invoke(previousCarrierId ?? string.Empty, newCarrierId ?? string.Empty);
                }
            }
            finally
            {
                _syncSemaphore.Release();
            }
        }

        private void ArmStabilizationTimer(TimeSpan delay, SyncContext context)
        {
            try { _stabilizationCts?.Cancel(); } catch { }
            try { _stabilizationCts?.Dispose(); } catch { }

            if (delay <= TimeSpan.Zero)
            {
                return;
            }

            _stabilizationCts = CancellationTokenSource.CreateLinkedTokenSource(context.SessionCt);
            var token = _stabilizationCts.Token;

            _ = Task.Run(async () =>
            {
                try
                {
                    await Task.Delay(delay, token).ConfigureAwait(false);
                    Logger.Info($"[MULTI-DISPLAY:ANTI-FLIPFLOP] Audio carrier stabilization buffer elapsed ({AudioCarrierHysteresis.TotalSeconds:F0}s). Evaluating audio handover to primary display...");
                    await SynchronizePipelinesAsync(
                        context.BaseDestination,
                        context.ServerUtcOffset,
                        context.BaselineFps,
                        context.VideoBitrate,
                        context.AudioCapture,
                        context.AudioPacer,
                        context.TrackMediaBytes ?? (_ => { }),
                        context.OnBrokenPipe ?? (() => { }),
                        context.SessionCt).ConfigureAwait(false);
                }
                catch (OperationCanceledException) { }
                catch (Exception ex)
                {
                    Logger.Warn($"[MULTI-DISPLAY:ANTI-FLIPFLOP] Stabilization handover error: {ex.Message}");
                }
            }, token);
        }

        private void UpdateTopologyDto()
        {
            var pipelines = _activePipelines.Values.ToList();
            if (pipelines.Count == 0)
            {
                _currentTopology = null;
                return;
            }

            var active = pipelines.Select(p => p.Descriptor).ToList();
            int minX = active.Min(d => d.X);
            int minY = active.Min(d => d.Y);
            int maxX = active.Max(d => d.X + d.Width);
            int maxY = active.Max(d => d.Y + d.Height);

            string carrierId = AudioCarrierPipeline?.DisplayId ?? "mon-0";

            var displays = pipelines.Select(p => new DisplayMetadataDto
            {
                DisplayId = p.Descriptor.DisplayId,
                DisplayName = p.Descriptor.DeviceName,
                AdapterName = p.Descriptor.AdapterName,
                AdapterLuid = p.Descriptor.AdapterLuid,
                IsPrimary = p.Descriptor.IsPrimary,
                HasAudio = p.HasAudio,
                X = p.Descriptor.X,
                Y = p.Descriptor.Y,
                Width = p.Descriptor.Width,
                Height = p.Descriptor.Height,
                ScaleFactor = 1.0,
                RefreshRateHz = 60,
                TargetFps = p.Descriptor.IsPrimary ? 30 : 20
            }).ToList();

            _currentTopology = new StationDisplayTopologyDto
            {
                Hostname = Environment.MachineName,
                AudioCarrierDisplayId = carrierId,
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
            CancellationToken sessionCt,
            int? audioChannelsOverride = null)
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

            int audioChannels = audioChannelsOverride ?? (desc.IsPrimary ? 2 : 0);

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

            if (audioChannels > 0)
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
                try { _stabilizationCts?.Cancel(); } catch { }
                try { _stabilizationCts?.Dispose(); } catch { }
                _stabilizationCts = null;

                foreach (var kvp in _activePipelines)
                {
                    try { kvp.Value.Dispose(); } catch { }
                }
                _activePipelines.Clear();
            }
        }
    }
}
