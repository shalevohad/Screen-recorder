using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using ITB_SCREEN_RECORDER.Player.Core.Audio;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;
using ITB_SCREEN_RECORDER.Player.Core.Keystrokes;
using ITB_SCREEN_RECORDER.Player.Core.Streaming;
using ITB_SCREEN_RECORDER.Player.Core.Synchronization;
using Microsoft.Win32;

namespace ITB_SCREEN_RECORDER.Player.ViewModels;

public sealed class MainViewModel : ViewModelBase, IDisposable
{
    private ITarVirtualFileSystem? _tarFs;
    private ILoopbackHttpRangeServer? _httpServer;
    private IMasterPlaybackClock? _clock;
    private IForensicAudioMixer? _audioMixer;
    private IKeystrokeAuditIndexer? _keystrokeIndexer;
    private IGapSkipNavigator? _gapNavigator;
    private IStreamDriftTracker? _driftTracker;

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
    private bool _isPipMode;
    private bool _isAudioMixerVisible;
    private bool _isKeystrokeDrawerVisible;
    private string _keystrokeSearchQuery = string.Empty;
    private VideoTrackViewModel? _focusedTrack;

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
                    _clock.Seek(TimeSpan.FromSeconds(value));
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
        set => SetProperty(ref _isPlaying, value);
    }

    public double PlaybackRate
    {
        get => _playbackRate;
        set
        {
            if (SetProperty(ref _playbackRate, value))
            {
                if (_clock != null) _clock.PlaybackRate = value;
            }
        }
    }

    public bool IsPipMode
    {
        get => _isPipMode;
        set => SetProperty(ref _isPipMode, value);
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
    public ICommand FocusTrackCommand { get; }

    public MainViewModel()
    {
        OpenFileCommand = new RelayCommand(ExecuteOpenFile);
        PlayPauseCommand = new RelayCommand(ExecutePlayPause);
        StopCommand = new RelayCommand(ExecuteStop);
        StepForwardCommand = new RelayCommand(() => _clock?.StepFrame(1, 30.0));
        StepBackwardCommand = new RelayCommand(() => _clock?.StepFrame(-1, 30.0));
        SetRateCommand = new RelayCommand(param =>
        {
            if (param != null && double.TryParse(param.ToString(), out double rate))
            {
                PlaybackRate = rate;
            }
        });
        ToggleLayoutCommand = new RelayCommand(() => IsPipMode = !IsPipMode);
        ToggleAudioMixerCommand = new RelayCommand(() => IsAudioMixerVisible = !IsAudioMixerVisible);
        ToggleKeystrokeDrawerCommand = new RelayCommand(() => IsKeystrokeDrawerVisible = !IsKeystrokeDrawerVisible);
        SeekToKeystrokeCommand = new RelayCommand(param =>
        {
            if (param is KeystrokeItemViewModel item && _clock != null)
            {
                _clock.Seek(item.StartTime);
            }
        });
        FocusTrackCommand = new RelayCommand(param =>
        {
            if (param is VideoTrackViewModel track)
            {
                FocusedTrack = track;
            }
        });
    }

    private void ExecuteOpenFile()
    {
        var dialog = new OpenFileDialog
        {
            Title = "Open ITB Forensic Package",
            Filter = "ITB Forensic Package (*.tar;*.itbp)|*.tar;*.itbp|All Files (*.*)|*.*"
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
        _audioMixer = new ForensicAudioMixer();
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
            Keystrokes.Clear();

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

                var vm = new VideoTrackViewModel
                {
                    TrackIndex = trackIdx,
                    Hostname = track.Hostname,
                    MonitorIndex = monIdx,
                    IsPrimary = track.IsPrimary,
                    StreamUrl = streamUrl,
                    OnAudioSettingChanged = HandleTrackAudioSettingChanged
                };

                Tracks.Add(vm);
                trackIdx++;
            }

            FocusedTrack = Tracks.FirstOrDefault();
            PerformKeystrokeSearch();
            IsPackageLoaded = true;
            UpdateTimelineDisplay(TimeSpan.Zero);
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
