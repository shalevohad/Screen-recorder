using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using Microsoft.Win32;
using ITB_SCREEN_RECORDER.Player.Core.Audio;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;
using ITB_SCREEN_RECORDER.Player.Core.Ipc;
using ITB_SCREEN_RECORDER.Player.Core.Presentation;
using ITB_SCREEN_RECORDER.Player.Core.Streaming;
using ITB_SCREEN_RECORDER.Player.Core.Synchronization;
using ITB_SCREEN_RECORDER.Player.Core.Keystrokes;
using ITB_SCREEN_RECORDER.Player.Core.Orchestration;

namespace ITB_SCREEN_RECORDER.Player.ViewModels;

public enum PlayerViewMode
{
    Canvas,
    Split,
    Pip,
    Solo,
    AllGrid
}

public sealed class MainViewModel : ViewModelBase, IDisposable
{
    private ITarVirtualFileSystem? _tarFs;
    private ILoopbackHttpRangeServer? _httpServer;
    private IMasterPlaybackClock? _clock;
    private IPlayerAudioMixer? _audioMixer;
    private IKeystrokeAuditIndexer? _keystrokeIndexer;
    private IGapSkipNavigator? _gapNavigator;
    private IStreamDriftTracker? _driftTracker;
    private PlayerSecureIpcService? _ipcService;
    private CancellationTokenSource? _loadingCts;
    private DateTime _lastHeartbeatTime = DateTime.MinValue;

    private bool _isPackageLoaded;
    private string _packageFilePath = string.Empty;
    private string _sessionId = string.Empty;
    private DateTime _rangeStartUtc;
    private DateTime _rangeEndUtc;
    private string _currentUtcDisplay = "--:--:-- UTC";
    private string _currentTimelineDisplay = "00:00:00 / 00:00:00";
    private double _currentTimelineSeconds;
    private double _totalDurationSeconds;
    private bool _isPlaying;
    private double _playbackRate = 1.0;
    private bool _isAudioMixerVisible;
    private bool _isKeystrokeDrawerVisible;
    private string _keystrokeSearchQuery = string.Empty;
    private VideoTrackViewModel? _focusedTrack;

    private StationGroupViewModel? _selectedStation;
    private PlayerViewMode _viewMode = PlayerViewMode.Canvas;
    private VideoTrackViewModel? _activeSoloDisplay;
    private VideoTrackViewModel? _activeHeroFeed;
    private VideoTrackViewModel? _activePipFeed;
    private bool _isCanvasFullscreen;

    private bool _isDirectorMode;
    private bool _isDirectorRecording;
    private string _directorStatusMessage = "Ready";
    private PresentationCue? _lastExecutedCue;

    private bool _isExportingMasterVideo;
    private double _masterExportProgress;
    private string _masterExportStatus = string.Empty;

    private bool _isLoading;
    private bool _isLoadingIndeterminate = true;
    private string _loadingStatusMessage = "Loading...";
    private int _loadingProgressPercent = 0;

    public event Action<TimeSpan>? SeekRequested;
    public event Action<bool>? PlaybackStateChanged;
    public event Action<double>? PlaybackRateChanged;
    public event Action? StopRequested;

    public bool IsPackageLoaded
    {
        get => _isPackageLoaded;
        set => SetProperty(ref _isPackageLoaded, value);
    }

    public string PackageFilePath
    {
        get => _packageFilePath;
        set => SetProperty(ref _packageFilePath, value);
    }

    public string SessionId
    {
        get => _sessionId;
        set => SetProperty(ref _sessionId, value);
    }

    public DateTime RangeStartUtc
    {
        get => _rangeStartUtc;
        set => SetProperty(ref _rangeStartUtc, value);
    }

    public DateTime RangeEndUtc
    {
        get => _rangeEndUtc;
        set => SetProperty(ref _rangeEndUtc, value);
    }

    public string CurrentUtcDisplay
    {
        get => _currentUtcDisplay;
        set => SetProperty(ref _currentUtcDisplay, value);
    }

    public string CurrentTimelineDisplay
    {
        get => _currentTimelineDisplay;
        set => SetProperty(ref _currentTimelineDisplay, value);
    }

    public double CurrentTimelineSeconds
    {
        get => _currentTimelineSeconds;
        set
        {
            if (SetProperty(ref _currentTimelineSeconds, value))
            {
                // When dragged by user slider
                if (_clock != null && Math.Abs(_clock.CurrentTime.TotalSeconds - value) > 0.5)
                {
                    var offset = TimeSpan.FromSeconds(value);
                    _clock.Seek(offset);
                    SeekRequested?.Invoke(offset);
                }
            }
        }
    }

    public double TotalDurationSeconds
    {
        get => _totalDurationSeconds;
        set => SetProperty(ref _totalDurationSeconds, value);
    }

    public bool IsPlaying
    {
        get => _isPlaying;
        set
        {
            if (SetProperty(ref _isPlaying, value))
            {
                OnPropertyChanged(nameof(PlayPauseButtonText));
                PlaybackStateChanged?.Invoke(value);
            }
        }
    }

    public string PlayPauseButtonText => IsPlaying ? "⏸ PAUSE" : "▶ PLAY";

    public double PlaybackRate
    {
        get => _playbackRate;
        set
        {
            if (SetProperty(ref _playbackRate, value))
            {
                if (_clock != null) _clock.PlaybackRate = value;
                PlaybackRateChanged?.Invoke(value);
            }
        }
    }

    public bool IsAudioMixerVisible
    {
        get => _isAudioMixerVisible;
        set => SetProperty(ref _isAudioMixerVisible, value);
    }

    public bool IsKeystrokeDrawerVisible
    {
        get => _isKeystrokeDrawerVisible;
        set => SetProperty(ref _isKeystrokeDrawerVisible, value);
    }

    public string KeystrokeSearchQuery
    {
        get => _keystrokeSearchQuery;
        set
        {
            if (SetProperty(ref _keystrokeSearchQuery, value))
            {
                PerformKeystrokeSearch();
            }
        }
    }

    public VideoTrackViewModel? FocusedTrack
    {
        get => _focusedTrack;
        set
        {
            if (_focusedTrack != null) _focusedTrack.IsFocused = false;
            if (SetProperty(ref _focusedTrack, value))
            {
                if (_focusedTrack != null) _focusedTrack.IsFocused = true;
            }
        }
    }

    public StationGroupViewModel? SelectedStation
    {
        get => _selectedStation;
        set
        {
            if (SetProperty(ref _selectedStation, value))
            {
                foreach (var st in Stations)
                {
                    st.IsSelected = (st == _selectedStation);
                }
                OnPropertyChanged(nameof(IsAllStationsView));
            }
        }
    }

    public bool IsAllStationsView => SelectedStation == null;

    public PlayerViewMode ViewMode
    {
        get => _viewMode;
        set
        {
            if (SetProperty(ref _viewMode, value))
            {
                OnPropertyChanged(nameof(IsCanvasMode));
                OnPropertyChanged(nameof(IsSplitMode));
                OnPropertyChanged(nameof(IsPipMode));
                OnPropertyChanged(nameof(IsSoloMode));
                OnPropertyChanged(nameof(IsAllGridMode));

                if (value == PlayerViewMode.Pip)
                {
                    if (ActiveHeroFeed == null) ActiveHeroFeed = FocusedTrack ?? Tracks.FirstOrDefault();
                    if (ActivePipFeed == null) ActivePipFeed = Tracks.FirstOrDefault(t => t != ActiveHeroFeed) ?? ActiveHeroFeed;
                }
                else if (value == PlayerViewMode.Split)
                {
                    if (ActiveSplitFeeds.Count == 0)
                    {
                        ResetSplitFeeds();
                    }
                }
            }
        }
    }

    public bool IsCanvasMode => ViewMode == PlayerViewMode.Canvas;
    public bool IsSplitMode => ViewMode == PlayerViewMode.Split;
    public bool IsPipMode => ViewMode == PlayerViewMode.Pip;
    public bool IsSoloMode => ViewMode == PlayerViewMode.Solo;
    public bool IsAllGridMode => ViewMode == PlayerViewMode.AllGrid;

    public VideoTrackViewModel? ActiveSoloDisplay
    {
        get => _activeSoloDisplay;
        set => SetProperty(ref _activeSoloDisplay, value);
    }

    public VideoTrackViewModel? ActiveHeroFeed
    {
        get => _activeHeroFeed;
        set
        {
            if (SetProperty(ref _activeHeroFeed, value))
            {
                if (IsDirectorRecording && value != null)
                {
                    RecordDirectorCue("SetPipHero", value.Hostname, value.DisplayId);
                }
            }
        }
    }

    public VideoTrackViewModel? ActivePipFeed
    {
        get => _activePipFeed;
        set => SetProperty(ref _activePipFeed, value);
    }

    public ObservableCollection<VideoTrackViewModel> ActiveSplitFeeds { get; } = new();

    public int SplitRows
    {
        get
        {
            int count = ActiveSplitFeeds.Count;
            if (count <= 1) return 1;
            if (count <= 2) return 1;
            if (count <= 4) return 2;
            if (count <= 6) return 2;
            return 3;
        }
    }

    public int SplitColumns
    {
        get
        {
            int count = ActiveSplitFeeds.Count;
            if (count <= 1) return 1;
            if (count <= 2) return 2;
            if (count <= 4) return 2;
            if (count <= 6) return 3;
            return 3;
        }
    }

    public bool IsCanvasFullscreen
    {
        get => _isCanvasFullscreen;
        set => SetProperty(ref _isCanvasFullscreen, value);
    }

    public ObservableCollection<PresentationCue> DirectorCues { get; } = new();

    public bool IsDirectorMode
    {
        get => _isDirectorMode;
        set
        {
            if (SetProperty(ref _isDirectorMode, value))
            {
                DirectorStatusMessage = value ? "🎬 Auto-Director Replay ACTIVE" : "Manual Director Mode";
            }
        }
    }

    public bool IsDirectorRecording
    {
        get => _isDirectorRecording;
        set
        {
            if (SetProperty(ref _isDirectorRecording, value))
            {
                DirectorStatusMessage = value ? "⏺ Recording Director Cues..." : "Director Cue Recording STOPPED";
            }
        }
    }

    public string DirectorStatusMessage
    {
        get => _directorStatusMessage;
        set => SetProperty(ref _directorStatusMessage, value);
    }

    public bool IsExportingMasterVideo
    {
        get => _isExportingMasterVideo;
        set => SetProperty(ref _isExportingMasterVideo, value);
    }

    public double MasterExportProgress
    {
        get => _masterExportProgress;
        set => SetProperty(ref _masterExportProgress, value);
    }

    public string MasterExportStatus
    {
        get => _masterExportStatus;
        set => SetProperty(ref _masterExportStatus, value);
    }

    public ObservableCollection<StationGroupViewModel> Stations { get; } = new();
    public ObservableCollection<VideoTrackViewModel> Tracks { get; } = new();
    public ObservableCollection<KeystrokeItemViewModel> Keystrokes { get; } = new();

    public ICommand OpenFileCommand { get; }
    public ICommand PlayPauseCommand { get; }
    public ICommand StopCommand { get; }
    public ICommand StepForwardCommand { get; }
    public ICommand StepBackwardCommand { get; }
    public ICommand SetRateCommand { get; }
    public ICommand ToggleLayoutCommand { get; }
    public ICommand ToggleAudioMixerCommand { get; }
    public ICommand ToggleKeystrokeDrawerCommand { get; }
    public ICommand SeekToKeystrokeCommand { get; }
    public ICommand SelectStationCommand { get; }
    public ICommand SelectAllStationsCommand { get; }
    public ICommand SetViewModeCommand { get; }
    public ICommand SelectDisplayCommand { get; }
    public ICommand SelectMonitorByIndexCommand { get; }
    public ICommand ToggleFullscreenCanvasCommand { get; }
    public ICommand ReturnToCanvasCommand { get; }

    public ICommand SwapPipCommand { get; }
    public ICommand SetPipHeroCommand { get; }
    public ICommand ToggleSplitFeedCommand { get; }
    public ICommand ResetSplitFeedsCommand { get; }

    public ICommand ToggleDirectorModeCommand { get; }
    public ICommand ToggleDirectorRecordingCommand { get; }
    public ICommand AddDirectorCueCommand { get; }
    public ICommand ClearDirectorCuesCommand { get; }
    public ICommand SavePresentationPlanCommand { get; }
    public ICommand LoadPresentationPlanCommand { get; }
    public ICommand ExportMasterVideoCommand { get; }

    public bool IsLoading
    {
        get => _isLoading;
        set => SetProperty(ref _isLoading, value);
    }

    public bool IsLoadingIndeterminate
    {
        get => _isLoadingIndeterminate;
        set => SetProperty(ref _isLoadingIndeterminate, value);
    }

    public string LoadingStatusMessage
    {
        get => _loadingStatusMessage;
        set => SetProperty(ref _loadingStatusMessage, value);
    }

    public int LoadingProgressPercent
    {
        get => _loadingProgressPercent;
        set => SetProperty(ref _loadingProgressPercent, value);
    }

    public MainViewModel()
    {
        OpenFileCommand = new RelayCommand(_ => ExecuteOpenFile());
        PlayPauseCommand = new RelayCommand(_ => ExecutePlayPause());
        StopCommand = new RelayCommand(_ => ExecuteStop());
        StepForwardCommand = new RelayCommand(_ => _clock?.StepFrame(1));
        StepBackwardCommand = new RelayCommand(_ => _clock?.StepFrame(-1));

        SetRateCommand = new RelayCommand(param =>
        {
            if (param != null && double.TryParse(param.ToString(), out double rate))
            {
                PlaybackRate = rate;
            }
        });

        ToggleLayoutCommand = new RelayCommand(_ =>
        {
            ViewMode = ViewMode switch
            {
                PlayerViewMode.Canvas => PlayerViewMode.Split,
                PlayerViewMode.Split => PlayerViewMode.Pip,
                PlayerViewMode.Pip => PlayerViewMode.Solo,
                PlayerViewMode.Solo => PlayerViewMode.AllGrid,
                _ => PlayerViewMode.Canvas
            };
        });

        ToggleAudioMixerCommand = new RelayCommand(_ => IsAudioMixerVisible = !IsAudioMixerVisible);
        ToggleKeystrokeDrawerCommand = new RelayCommand(_ => IsKeystrokeDrawerVisible = !IsKeystrokeDrawerVisible);

        SeekToKeystrokeCommand = new RelayCommand(param =>
        {
            if (param is KeystrokeItemViewModel kItem && _clock != null)
            {
                var offset = kItem.StartTime;
                _clock.Seek(offset);
                SeekRequested?.Invoke(offset);
            }
        });

        SelectStationCommand = new RelayCommand(param =>
        {
            if (param is StationGroupViewModel st)
            {
                SelectStation(st);
            }
        });

        SelectAllStationsCommand = new RelayCommand(_ =>
        {
            SelectedStation = null;
            ViewMode = PlayerViewMode.AllGrid;
        });

        SetViewModeCommand = new RelayCommand(param =>
        {
            if (param is PlayerViewMode mode)
            {
                ViewMode = mode;
            }
            else if (param is string modeStr)
            {
                if (Enum.TryParse<PlayerViewMode>(modeStr, true, out var parsedMode))
                {
                    ViewMode = parsedMode;
                }
            }
        });

        SelectDisplayCommand = new RelayCommand(param =>
        {
            if (param is VideoTrackViewModel disp)
            {
                SelectDisplay(disp);
            }
        });

        SelectMonitorByIndexCommand = new RelayCommand(param =>
        {
            if (param != null && int.TryParse(param.ToString(), out int idx1Based))
            {
                SelectMonitorByIndex(idx1Based);
            }
        });

        ToggleFullscreenCanvasCommand = new RelayCommand(_ =>
        {
            IsCanvasFullscreen = !IsCanvasFullscreen;
        });

        ReturnToCanvasCommand = new RelayCommand(_ =>
        {
            ReturnToCanvas();
        });

        SwapPipCommand = new RelayCommand(_ => SwapPip());
        SetPipHeroCommand = new RelayCommand(p => SetPipHero(p as VideoTrackViewModel));
        ToggleSplitFeedCommand = new RelayCommand(p => ToggleSplitFeed(p as VideoTrackViewModel));
        ResetSplitFeedsCommand = new RelayCommand(_ => ResetSplitFeeds());

        ToggleDirectorModeCommand = new RelayCommand(_ => IsDirectorMode = !IsDirectorMode);
        ToggleDirectorRecordingCommand = new RelayCommand(_ => IsDirectorRecording = !IsDirectorRecording);
        AddDirectorCueCommand = new RelayCommand(_ => RecordDirectorCue("ManualCue"));
        ClearDirectorCuesCommand = new RelayCommand(_ =>
        {
            DirectorCues.Clear();
            DirectorStatusMessage = "Director cues cleared.";
        });
        SavePresentationPlanCommand = new RelayCommand(_ => SavePresentationPlan());
        LoadPresentationPlanCommand = new RelayCommand(_ => LoadPresentationPlan());
        ExportMasterVideoCommand = new RelayCommand(_ => _ = ExportMasterVideoAsync());
    }

    public void SelectStation(StationGroupViewModel? station)
    {
        SelectedStation = station;
        if (station == null)
        {
            ViewMode = PlayerViewMode.AllGrid;
            return;
        }

        if (station.HasMultipleDisplays)
        {
            ViewMode = PlayerViewMode.Canvas;
            ActiveSoloDisplay = station.PrimaryDisplay;
        }
        else
        {
            ViewMode = PlayerViewMode.Solo;
            ActiveSoloDisplay = station.PrimaryDisplay;
        }

        ResetSplitFeeds();
    }

    public void SelectDisplay(VideoTrackViewModel display)
    {
        if (display == null) return;

        var st = Stations.FirstOrDefault(s => string.Equals(s.Hostname, display.Hostname, StringComparison.OrdinalIgnoreCase));
        if (st != null && SelectedStation != st)
        {
            SelectedStation = st;
        }

        if (SelectedStation != null)
        {
            foreach (var d in SelectedStation.Displays)
            {
                d.IsSelectedInCanvas = (d == display);
            }
        }

        ActiveSoloDisplay = display;
        ViewMode = PlayerViewMode.Solo;

        if (IsDirectorRecording)
        {
            RecordDirectorCue("FocusDisplay", display.Hostname, display.DisplayId);
        }
    }

    public void SelectMonitorByIndex(int index1Based)
    {
        if (SelectedStation == null || SelectedStation.Displays.Count == 0) return;

        int zeroIdx = index1Based - 1;
        if (zeroIdx >= 0 && zeroIdx < SelectedStation.Displays.Count)
        {
            SelectDisplay(SelectedStation.Displays[zeroIdx]);
        }
    }

    public void ReturnToCanvas()
    {
        if (SelectedStation != null && SelectedStation.HasMultipleDisplays)
        {
            ViewMode = PlayerViewMode.Canvas;
        }
        else
        {
            ViewMode = PlayerViewMode.AllGrid;
        }

        if (IsDirectorRecording)
        {
            RecordDirectorCue("ReturnToCanvas");
        }
    }

    public void SwapPip()
    {
        var temp = ActiveHeroFeed;
        ActiveHeroFeed = ActivePipFeed;
        ActivePipFeed = temp;

        if (IsDirectorRecording)
        {
            RecordDirectorCue("SwapPip", ActiveHeroFeed?.Hostname ?? "", ActiveHeroFeed?.DisplayId ?? "");
        }
    }

    public void SetPipHero(VideoTrackViewModel? feed)
    {
        if (feed == null) return;
        if (ActiveHeroFeed != feed)
        {
            ActivePipFeed = ActiveHeroFeed;
            ActiveHeroFeed = feed;
        }
        ViewMode = PlayerViewMode.Pip;
    }

    public void ToggleSplitFeed(VideoTrackViewModel? feed)
    {
        if (feed == null) return;
        if (ActiveSplitFeeds.Contains(feed))
        {
            if (ActiveSplitFeeds.Count > 1) ActiveSplitFeeds.Remove(feed);
        }
        else
        {
            ActiveSplitFeeds.Add(feed);
        }
        OnPropertyChanged(nameof(SplitRows));
        OnPropertyChanged(nameof(SplitColumns));
    }

    public void ResetSplitFeeds()
    {
        ActiveSplitFeeds.Clear();
        if (SelectedStation != null && SelectedStation.Displays.Count > 0)
        {
            foreach (var d in SelectedStation.Displays) ActiveSplitFeeds.Add(d);
        }
        else
        {
            foreach (var st in Stations)
            {
                if (st.PrimaryDisplay != null) ActiveSplitFeeds.Add(st.PrimaryDisplay);
            }
        }
        OnPropertyChanged(nameof(SplitRows));
        OnPropertyChanged(nameof(SplitColumns));
    }

    public void RecordDirectorCue(string action, string hostname = "", string displayId = "")
    {
        if (!IsDirectorRecording) return;
        double currentSec = CurrentTimelineSeconds;
        int targetIdx = FocusedTrack?.TrackIndex ?? 0;
        int? secIdx = ActivePipFeed?.TrackIndex;

        var cue = new PresentationCue
        {
            OffsetSeconds = Math.Round(currentSec, 2),
            Action = action,
            LayoutMode = ViewMode.ToString(),
            TargetTrackIndex = targetIdx,
            TargetHostname = string.IsNullOrEmpty(hostname) ? (FocusedTrack?.Hostname ?? "") : hostname,
            TargetDisplayId = string.IsNullOrEmpty(displayId) ? (FocusedTrack?.DisplayId ?? "mon-0") : displayId,
            SecondaryTrackIndex = secIdx,
            Description = $"{action} to {hostname} ({displayId})"
        };

        DirectorCues.Add(cue);
        DirectorStatusMessage = $"Recorded cue @ {FormatSeconds(currentSec)} ({action})";
    }

    private void ApplyDirectorCue(PresentationCue cue)
    {
        if (!string.IsNullOrEmpty(cue.LayoutMode) && Enum.TryParse<PlayerViewMode>(cue.LayoutMode, true, out var mode))
        {
            ViewMode = mode;
        }

        if (cue.TargetTrackIndex >= 0 && cue.TargetTrackIndex < Tracks.Count)
        {
            var targetTrack = Tracks[cue.TargetTrackIndex];
            if (ViewMode == PlayerViewMode.Solo)
            {
                SelectDisplay(targetTrack);
            }
            else if (ViewMode == PlayerViewMode.Pip)
            {
                ActiveHeroFeed = targetTrack;
                if (cue.SecondaryTrackIndex.HasValue && cue.SecondaryTrackIndex.Value >= 0 && cue.SecondaryTrackIndex.Value < Tracks.Count)
                {
                    ActivePipFeed = Tracks[cue.SecondaryTrackIndex.Value];
                }
            }
        }
        else if (!string.IsNullOrEmpty(cue.TargetHostname))
        {
            var st = Stations.FirstOrDefault(s => string.Equals(s.Hostname, cue.TargetHostname, StringComparison.OrdinalIgnoreCase));
            if (st != null)
            {
                var disp = st.Displays.FirstOrDefault(d => string.Equals(d.DisplayId, cue.TargetDisplayId, StringComparison.OrdinalIgnoreCase)) ?? st.PrimaryDisplay;
                if (disp != null)
                {
                    if (ViewMode == PlayerViewMode.Solo) SelectDisplay(disp);
                    else if (ViewMode == PlayerViewMode.Pip) ActiveHeroFeed = disp;
                }
            }
        }

        DirectorStatusMessage = $"🎬 CUE @ {FormatSeconds(cue.OffsetSeconds)}: {cue.Action} ({cue.TargetHostname} {cue.TargetDisplayId})";
    }

    public void SavePresentationPlan()
    {
        var sfd = new SaveFileDialog
        {
            Title = "Save Presentation Director Plan",
            Filter = "Director Presentation Plan (*.itblayout)|*.itblayout|JSON Files (*.json)|*.json",
            FileName = $"presentation_{SessionId}_{DateTime.Now:yyyyMMdd_HHmmss}.itblayout"
        };

        if (sfd.ShowDialog() == true)
        {
            var plan = new PresentationDirectorPlan
            {
                Title = $"Director Plan - {SessionId}",
                CreatedUtc = DateTime.UtcNow,
                InitialLayoutMode = ViewMode.ToString(),
                InitialHeroTrackIndex = ActiveHeroFeed?.TrackIndex ?? 0,
                InitialPipTrackIndex = ActivePipFeed?.TrackIndex ?? 1,
                InitialSplitTrackIndices = ActiveSplitFeeds.Select(f => f.TrackIndex).ToList(),
                Cues = DirectorCues.ToList()
            };

            plan.SaveToFile(sfd.FileName);
            DirectorStatusMessage = $"Plan saved to: {Path.GetFileName(sfd.FileName)}";
        }
    }

    public void LoadPresentationPlan()
    {
        var ofd = new OpenFileDialog
        {
            Title = "Open Presentation Director Plan",
            Filter = "Director Presentation Plan (*.itblayout;*.json)|*.itblayout;*.json|All Files (*.*)|*.*"
        };

        if (ofd.ShowDialog() == true)
        {
            try
            {
                var plan = PresentationDirectorPlan.LoadFromFile(ofd.FileName);
                DirectorCues.Clear();
                foreach (var cue in plan.Cues)
                {
                    DirectorCues.Add(cue);
                }

                if (Enum.TryParse<PlayerViewMode>(plan.InitialLayoutMode, true, out var initialMode))
                {
                    ViewMode = initialMode;
                }

                if (plan.InitialHeroTrackIndex >= 0 && plan.InitialHeroTrackIndex < Tracks.Count)
                {
                    ActiveHeroFeed = Tracks[plan.InitialHeroTrackIndex];
                }

                if (plan.InitialPipTrackIndex >= 0 && plan.InitialPipTrackIndex < Tracks.Count)
                {
                    ActivePipFeed = Tracks[plan.InitialPipTrackIndex];
                }

                IsDirectorMode = true;
                DirectorStatusMessage = $"Plan loaded ({DirectorCues.Count} cues). Director Mode ACTIVE.";
            }
            catch (Exception ex)
            {
                DirectorStatusMessage = $"Failed loading plan: {ex.Message}";
            }
        }
    }

    public async Task ExportMasterVideoAsync()
    {
        if (_tarFs == null || !IsPackageLoaded)
        {
            MessageBox.Show("Please load an ITB session archive before exporting master video.", "No Session Loaded", MessageBoxButton.OK, MessageBoxImage.Warning);
            return;
        }

        var sfd = new SaveFileDialog
        {
            Title = "Export Master Presentation Video",
            Filter = "MP4 Video (*.mp4)|*.mp4",
            FileName = $"master_presentation_{SessionId}_{DateTime.Now:yyyyMMdd_HHmmss}.mp4"
        };

        if (sfd.ShowDialog() != true) return;

        IsExportingMasterVideo = true;
        MasterExportProgress = 0;
        MasterExportStatus = "Initializing Master Presentation Export...";

        try
        {
            var plan = new PresentationDirectorPlan
            {
                Title = $"Master Export - {SessionId}",
                CreatedUtc = DateTime.UtcNow,
                InitialLayoutMode = ViewMode.ToString(),
                InitialHeroTrackIndex = ActiveHeroFeed?.TrackIndex ?? (FocusedTrack?.TrackIndex ?? 0),
                InitialPipTrackIndex = ActivePipFeed?.TrackIndex ?? 1,
                InitialSplitTrackIndices = ActiveSplitFeeds.Select(f => f.TrackIndex).ToList(),
                Cues = DirectorCues.ToList()
            };

            var exporter = new MasterVideoExportService();
            var progress = new Progress<(double ProgressPercent, string StatusMessage)>(p =>
            {
                MasterExportProgress = p.ProgressPercent;
                MasterExportStatus = p.StatusMessage;
            });

            await Task.Run(() => exporter.ExportMasterVideoAsync(_tarFs, plan, sfd.FileName, progress, CancellationToken.None)).ConfigureAwait(true);

            MasterExportStatus = "Export successful!";
            MessageBox.Show($"Master presentation video successfully generated at:\n{sfd.FileName}", "Export Complete", MessageBoxButton.OK, MessageBoxImage.Information);
        }
        catch (Exception ex)
        {
            MasterExportStatus = $"Export failed: {ex.Message}";
            MessageBox.Show($"Master video export failed:\n{ex.Message}", "Export Failed", MessageBoxButton.OK, MessageBoxImage.Error);
        }
        finally
        {
            IsExportingMasterVideo = false;
        }
    }

    private static string FormatSeconds(double totalSec)
    {
        var ts = TimeSpan.FromSeconds(Math.Max(0, totalSec));
        return $"{ts:hh\\:mm\\:ss}";
    }

    private void ExecuteOpenFile()
    {
        var dialog = new OpenFileDialog
        {
            Title = "Open ITB Replay Package",
            Filter = "ITB Replay Packages (*.tar;*.itbp)|*.tar;*.itbp|All Files (*.*)|*.*"
        };

        if (dialog.ShowDialog() == true)
        {
            _ = LoadPackageAsync(dialog.FileName);
        }
    }

    public async Task LoadPackageAsync(string filePath, CancellationToken ct = default)
    {
        if (!File.Exists(filePath)) return;

        DisposeCurrentPackage();

        PackageFilePath = filePath;
        _tarFs = new TarVirtualFileSystem();
        await _tarFs.OpenArchiveAsync(filePath, ct).ConfigureAwait(false);

        var manifest = _tarFs.Manifest ?? throw new InvalidOperationException("session.json manifest not found inside package.");

        SessionId = manifest.SessionId;
        RangeStartUtc = manifest.RangeStartUtc;
        RangeEndUtc = manifest.RangeEndUtc;
        TotalDurationSeconds = manifest.ExportedDurationSeconds > 0 ? manifest.ExportedDurationSeconds : 1.0;

        _httpServer = new LoopbackHttpRangeServer();
        await _httpServer.StartAsync(_tarFs, ct).ConfigureAwait(false);

        _gapNavigator = new GapSkipNavigator(manifest);
        _clock = new MasterPlaybackClock(TimeSpan.FromSeconds(TotalDurationSeconds), _gapNavigator, RangeStartUtc);
        _audioMixer = new PlayerAudioMixer();
        _keystrokeIndexer = new KeystrokeAuditIndexer();
        _driftTracker = new StreamDriftTracker(_clock);

        _clock.TimeUpdated += OnClockTimeUpdated;
        _clock.StateChanged += OnClockStateChanged;

        // Ingest SRT captions if embedded in TAR
        foreach (var entry in _tarFs.Entries)
        {
            if (entry.Name.EndsWith(".srt", StringComparison.OrdinalIgnoreCase))
            {
                try
                {
                    using var srtStream = _tarFs.OpenReadStream(entry.Name);
                    string stationGuess = Path.GetFileNameWithoutExtension(entry.Name);
                    await _keystrokeIndexer.IngestSrtStreamAsync(stationGuess, srtStream, ct).ConfigureAwait(false);
                }
                catch
                {
                    // Ignore malformed srt
                }
            }
        }

        // Initialize UI dispatching for track view models
        Action initUiAction = () =>
        {
            Tracks.Clear();
            Stations.Clear();
            Keystrokes.Clear();
            ActiveSplitFeeds.Clear();

            int trackIdx = 0;
            foreach (var track in manifest.Tracks)
            {
                string streamUrl = _httpServer.GetTrackStreamUrl(trackIdx);
                _audioMixer.RegisterStation(track.Hostname, track.Hostname);

                int monIdx = 0;
                if (!string.IsNullOrEmpty(track.DisplayId))
                {
                    string cleaned = track.DisplayId.Replace("mon-", "", StringComparison.OrdinalIgnoreCase);
                    int.TryParse(cleaned, out monIdx);
                }

                bool isDirCut = track.IsDirectorCut || string.Equals(track.DisplayId, "director", StringComparison.OrdinalIgnoreCase);

                var vm = new VideoTrackViewModel
                {
                    TrackIndex = trackIdx,
                    Hostname = track.Hostname,
                    DisplayId = string.IsNullOrEmpty(track.DisplayId) ? $"mon-{monIdx}" : track.DisplayId,
                    MonitorIndex = monIdx,
                    IsPrimary = track.IsPrimary,
                    IsDirectorCut = isDirCut,
                    Width = track.Width > 0 ? track.Width : 1920,
                    Height = track.Height > 0 ? track.Height : 1080,
                    X = track.X,
                    Y = track.Y,
                    StreamUrl = streamUrl,
                    OnAudioSettingChanged = HandleTrackAudioSettingChanged
                };

                Tracks.Add(vm);
                trackIdx++;
            }

            // Group into Stations
            var grouped = Tracks.GroupBy(t => t.Hostname, StringComparer.OrdinalIgnoreCase);
            foreach (var g in grouped)
            {
                var stVm = new StationGroupViewModel
                {
                    Hostname = g.Key
                };
                foreach (var t in g.OrderBy(x => x.IsDirectorCut ? 1 : 0).ThenBy(x => x.MonitorIndex))
                {
                    stVm.Displays.Add(t);
                }
                stVm.RecalculateTopologyLayout();
                Stations.Add(stVm);
            }

            FocusedTrack = Tracks.FirstOrDefault();
            PerformKeystrokeSearch();
            IsPackageLoaded = true;
            UpdateTimelineDisplay(TimeSpan.Zero);

            if (Stations.Count > 0)
            {
                SelectStation(Stations[0]);
            }
            else
            {
                ViewMode = PlayerViewMode.AllGrid;
            }

            // Setup default PiP & Split feeds
            ActiveHeroFeed = FocusedTrack ?? Tracks.FirstOrDefault();
            ActivePipFeed = Tracks.FirstOrDefault(t => t != ActiveHeroFeed) ?? ActiveHeroFeed;
            ResetSplitFeeds();
        };

        if (Application.Current?.Dispatcher != null)
        {
            await Application.Current.Dispatcher.InvokeAsync(initUiAction);
        }
        else
        {
            initUiAction();
        }
    }

    private void ExecutePlayPause()
    {
        if (_clock == null) return;
        if (IsPlaying)
        {
            _clock.Pause();
        }
        else
        {
            _clock.Play();
        }
    }

    private void ExecuteStop()
    {
        _clock?.Stop();
        StopRequested?.Invoke();
    }

    private void OnClockStateChanged(PlaybackState state)
    {
        Action act = () => IsPlaying = (state == PlaybackState.Playing);
        if (Application.Current?.Dispatcher != null)
        {
            Application.Current.Dispatcher.InvokeAsync(act);
        }
        else
        {
            act();
        }
    }

    private void OnClockTimeUpdated(TimeSpan time)
    {
        Action act = () =>
        {
            _currentTimelineSeconds = time.TotalSeconds;
            OnPropertyChanged(nameof(CurrentTimelineSeconds));

            UpdateTimelineDisplay(time);

            // Auto-Director playback: evaluate presentation cues
            if (IsDirectorMode && DirectorCues.Count > 0)
            {
                double sec = time.TotalSeconds;
                var activeCue = DirectorCues.Where(c => c.OffsetSeconds <= sec)
                                            .OrderByDescending(c => c.OffsetSeconds)
                                            .FirstOrDefault();
                if (activeCue != null && _lastExecutedCue != activeCue)
                {
                    _lastExecutedCue = activeCue;
                    ApplyDirectorCue(activeCue);
                }
            }

            // Update subtitles & gap status per track
            if (_keystrokeIndexer != null)
            {
                foreach (var track in Tracks)
                {
                    var cues = _keystrokeIndexer.GetCuesAtTime(time, track.Hostname);
                    track.ActiveCaption = cues.Count > 0 ? cues[0].Text : string.Empty;

                    if (_gapNavigator != null)
                    {
                        track.IsInGap = _gapNavigator.IsStationInGap(track.Hostname, time, out _);
                    }
                }
            }

            if ((DateTime.UtcNow - _lastHeartbeatTime).TotalSeconds >= 1.0)
            {
                _lastHeartbeatTime = DateTime.UtcNow;
                EmitHeartbeatNow();
            }
        };

        if (Application.Current?.Dispatcher != null)
        {
            Application.Current.Dispatcher.InvokeAsync(act);
        }
        else
        {
            act();
        }
    }

    public PlayerSecureIpcService? IpcService
    {
        get => _ipcService;
        set => _ipcService = value;
    }

    public async Task HandleReplayRequestAsync(ReplayLaunchParams parameters, CancellationToken ct = default)
    {
        _loadingCts?.Cancel();
        _loadingCts = CancellationTokenSource.CreateLinkedTokenSource(ct);

        Action startLoadingUi = () =>
        {
            IsLoading = true;
            IsLoadingIndeterminate = true;
            LoadingStatusMessage = "Connecting to server and requesting replay stream...";
            LoadingProgressPercent = 0;
        };

        if (Application.Current?.Dispatcher != null)
        {
            await Application.Current.Dispatcher.InvokeAsync(startLoadingUi);
        }
        else
        {
            startLoadingUi();
        }

        try
        {
            var orchestrator = new ServerReplayOrchestrator(_ipcService);
            string packagePath = await orchestrator.PrepareReplayPackageAsync(parameters, _loadingCts.Token).ConfigureAwait(false);

            if (Application.Current?.Dispatcher != null)
            {
                await Application.Current.Dispatcher.InvokeAsync(() => LoadingStatusMessage = "Loading synchronized video tracks...");
            }

            await LoadPackageAsync(packagePath, _loadingCts.Token).ConfigureAwait(false);

            // Handle Seek
            if (parameters.SeekTimeUtc.HasValue && _clock != null)
            {
                var offset = parameters.SeekTimeUtc.Value - RangeStartUtc;
                if (offset < TimeSpan.Zero) offset = TimeSpan.Zero;
                if (offset > TimeSpan.FromSeconds(TotalDurationSeconds)) offset = TimeSpan.FromSeconds(TotalDurationSeconds);
                _clock.Seek(offset);
                SeekRequested?.Invoke(offset);
            }

            // Handle Audio Station
            if (!string.IsNullOrEmpty(parameters.AudioStation))
            {
                if (Application.Current?.Dispatcher != null)
                {
                    await Application.Current.Dispatcher.InvokeAsync(() => SetAudioSolo(parameters.AudioStation));
                }
                else
                {
                    SetAudioSolo(parameters.AudioStation);
                }
            }

            _clock?.Play();

            if (_ipcService != null)
            {
                DateTime currentUtc = parameters.SeekTimeUtc ?? RangeStartUtc;
                await _ipcService.PublishEventAsync(PlayerIpcEvent.StateChanged("PLAYING", "Playback started successfully."), ct).ConfigureAwait(false);
            }
        }
        catch (OperationCanceledException)
        {
            if (_ipcService != null)
            {
                await _ipcService.PublishEventAsync(PlayerIpcEvent.StateChanged("STOPPED", "Replay preparation was cancelled."), CancellationToken.None).ConfigureAwait(false);
            }
        }
        catch (Exception ex)
        {
            if (Application.Current?.Dispatcher != null)
            {
                await Application.Current.Dispatcher.InvokeAsync(() => LoadingStatusMessage = $"Error: {ex.Message}");
            }

            if (_ipcService != null)
            {
                await _ipcService.PublishEventAsync(PlayerIpcEvent.Error(
                    PlayerErrorCodes.ErrGeneralException,
                    $"Replay preparation failed: {ex.Message}",
                    isFatal: true), CancellationToken.None).ConfigureAwait(false);
            }
        }
        finally
        {
            Action stopLoadingUi = () => IsLoading = false;
            if (Application.Current?.Dispatcher != null)
            {
                await Application.Current.Dispatcher.InvokeAsync(stopLoadingUi);
            }
            else
            {
                stopLoadingUi();
            }
        }
    }

    public void SeekToUtc(DateTime? targetUtc)
    {
        if (_clock == null || !targetUtc.HasValue) return;
        var offset = targetUtc.Value - RangeStartUtc;
        if (offset < TimeSpan.Zero) offset = TimeSpan.Zero;
        if (offset > TimeSpan.FromSeconds(TotalDurationSeconds)) offset = TimeSpan.FromSeconds(TotalDurationSeconds);
        _clock.Seek(offset);
        SeekRequested?.Invoke(offset);
        EmitHeartbeatNow();
    }

    public void SetAudioSolo(string station)
    {
        if (_audioMixer == null) return;
        _audioMixer.SetSolo(station, true);
        foreach (var track in Tracks)
        {
            track.IsMuted = !string.Equals(track.Hostname, station, StringComparison.OrdinalIgnoreCase);
        }
    }

    public void EmitHeartbeatNow()
    {
        if (_ipcService == null || _clock == null) return;
        DateTime currentUtc = RangeStartUtc.Add(_clock.CurrentTime);
        string? soloStation = _audioMixer?.Stations.FirstOrDefault(s => s.IsSolo)?.Hostname;
        _ = _ipcService.PublishEventAsync(PlayerIpcEvent.Heartbeat(
            currentUtc,
            IsPlaying,
            PlaybackRate,
            soloStation,
            _clock.CurrentTime.TotalSeconds,
            TotalDurationSeconds));
    }

    private void UpdateTimelineDisplay(TimeSpan time)
    {
        var total = TimeSpan.FromSeconds(_totalDurationSeconds);
        CurrentTimelineDisplay = $"{time:hh\\:mm\\:ss} / {total:hh\\:mm\\:ss}";

        if (_gapNavigator != null)
        {
            DateTime currentUtc = _gapNavigator.TimelineOffsetToUtc(time);
            CurrentUtcDisplay = $"{currentUtc:yyyy-MM-dd HH:mm:ss} UTC";
        }
        else
        {
            DateTime currentUtc = _rangeStartUtc.Add(time);
            CurrentUtcDisplay = $"{currentUtc:yyyy-MM-dd HH:mm:ss} UTC";
        }
    }

    private void HandleTrackAudioSettingChanged(VideoTrackViewModel track)
    {
        if (_audioMixer == null) return;

        _audioMixer.SetVolume(track.Hostname, track.Volume);
        _audioMixer.SetPan(track.Hostname, track.Pan);
        _audioMixer.SetMute(track.Hostname, track.IsMuted);
        _audioMixer.SetSolo(track.Hostname, track.IsSolo);
        _audioMixer.SetChannelMode(track.Hostname, track.ChannelMode);
    }

    private void PerformKeystrokeSearch()
    {
        if (_keystrokeIndexer == null) return;

        var results = _keystrokeIndexer.Search(KeystrokeSearchQuery);
        Keystrokes.Clear();
        foreach (var c in results)
        {
            Keystrokes.Add(new KeystrokeItemViewModel(c));
        }
    }

    private void DisposeCurrentPackage()
    {
        _clock?.Dispose();
        _clock = null;

        _httpServer?.Dispose();
        _httpServer = null;

        _tarFs?.Dispose();
        _tarFs = null;

        _keystrokeIndexer?.Clear();
        _keystrokeIndexer = null;
        _gapNavigator = null;
        _driftTracker = null;

        IsPackageLoaded = false;
    }

    public void Dispose()
    {
        DisposeCurrentPackage();
    }
}
