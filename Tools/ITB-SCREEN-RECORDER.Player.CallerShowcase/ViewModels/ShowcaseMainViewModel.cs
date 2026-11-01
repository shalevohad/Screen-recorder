using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Network.Discovery;
using ITB_SCREEN_RECORDER.Player.Core.Ipc;
using Microsoft.Win32;

namespace ITB_SCREEN_RECORDER.Player.CallerShowcase.ViewModels;

public sealed class ShowcaseMainViewModel : ViewModelBase, IAsyncDisposable, IDisposable
{
    private readonly HttpClient _httpClient = new() { Timeout = TimeSpan.FromSeconds(5) };
    private PlayerSecureLauncher? _launcher;
    private CancellationTokenSource? _scanCts;

    // Discovery properties
    private string _multicastAddress = ServerDiscoveryConstants.DefaultMulticastAddress;
    private int _multicastPort = ServerDiscoveryConstants.DefaultDiscoveryPort;
    private bool _isScanningServers;
    private string _selectedServerUrl = "http://127.0.0.1:5090";
    private string _discoveryStatus = "Ready to discover servers";

    // Station selection
    private string _newStationInput = string.Empty;
    private string _selectedAudioStation = "WS-ALPHA";
    private string _selectedKeystrokeMode = "BurnIn";
    private string _selectedLayoutMode = "grid";

    // Time selection
    private DateTime _startTimeUtc;
    private DateTime _endTimeUtc;
    private DateTime _seekTimeUtc;

    // Session Execution & C2 Telemetry
    private string _playerExePath = string.Empty;
    private bool _isPlayerRunning;
    private string _connectionStatus = "DISCONNECTED";
    private string _currentPlayheadDisplay = "--:--:-- UTC";
    private double _currentTimelineSeconds;
    private double _totalDurationSeconds = 1.0;
    private bool _isPlaying;
    private double _playbackRate = 1.0;
    private int _extractionProgressPercent;
    private bool _isExtracting;

    public string MulticastAddress
    {
        get => _multicastAddress;
        set => SetProperty(ref _multicastAddress, value);
    }

    public int MulticastPort
    {
        get => _multicastPort;
        set => SetProperty(ref _multicastPort, value);
    }

    public bool IsScanningServers
    {
        get => _isScanningServers;
        set => SetProperty(ref _isScanningServers, value);
    }

    public string SelectedServerUrl
    {
        get => _selectedServerUrl;
        set => SetProperty(ref _selectedServerUrl, value);
    }

    public string DiscoveryStatus
    {
        get => _discoveryStatus;
        set => SetProperty(ref _discoveryStatus, value);
    }

    public string NewStationInput
    {
        get => _newStationInput;
        set => SetProperty(ref _newStationInput, value);
    }

    public string SelectedAudioStation
    {
        get => _selectedAudioStation;
        set
        {
            if (SetProperty(ref _selectedAudioStation, value))
            {
                if (_launcher != null && IsPlayerRunning && !string.IsNullOrEmpty(value))
                {
                    _ = _launcher.SetAudioStationAsync(value);
                }
            }
        }
    }

    public string SelectedKeystrokeMode
    {
        get => _selectedKeystrokeMode;
        set => SetProperty(ref _selectedKeystrokeMode, value);
    }

    public string SelectedLayoutMode
    {
        get => _selectedLayoutMode;
        set => SetProperty(ref _selectedLayoutMode, value);
    }

    public DateTime StartTimeUtc
    {
        get => _startTimeUtc;
        set => SetProperty(ref _startTimeUtc, value);
    }

    public DateTime EndTimeUtc
    {
        get => _endTimeUtc;
        set => SetProperty(ref _endTimeUtc, value);
    }

    public DateTime SeekTimeUtc
    {
        get => _seekTimeUtc;
        set => SetProperty(ref _seekTimeUtc, value);
    }

    public string PlayerExePath
    {
        get => _playerExePath;
        set => SetProperty(ref _playerExePath, value);
    }

    public bool IsPlayerRunning
    {
        get => _isPlayerRunning;
        set => SetProperty(ref _isPlayerRunning, value);
    }

    public string ConnectionStatus
    {
        get => _connectionStatus;
        set => SetProperty(ref _connectionStatus, value);
    }

    public string CurrentPlayheadDisplay
    {
        get => _currentPlayheadDisplay;
        set => SetProperty(ref _currentPlayheadDisplay, value);
    }

    public double CurrentTimelineSeconds
    {
        get => _currentTimelineSeconds;
        set => SetProperty(ref _currentTimelineSeconds, value);
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
        set => SetProperty(ref _playbackRate, value);
    }

    public int ExtractionProgressPercent
    {
        get => _extractionProgressPercent;
        set => SetProperty(ref _extractionProgressPercent, value);
    }

    public bool IsExtracting
    {
        get => _isExtracting;
        set => SetProperty(ref _isExtracting, value);
    }

    public ObservableCollection<string> DiscoveredServers { get; } = new();
    public ObservableCollection<StationItemViewModel> AvailableStations { get; } = new();
    public ObservableCollection<string> SelectedStationNames { get; } = new();
    public ObservableCollection<string> EventLogs { get; } = new();

    public ICommand ScanServersCommand { get; }
    public ICommand FetchRecordedStationsCommand { get; }
    public ICommand AddStationCommand { get; }
    public ICommand SelectAllStationsCommand { get; }
    public ICommand ClearAllStationsCommand { get; }
    public ICommand SetPresetLast15mCommand { get; }
    public ICommand SetPresetLast30mCommand { get; }
    public ICommand SetPresetLast1hCommand { get; }
    public ICommand SetPresetLast4hCommand { get; }
    public ICommand BrowsePlayerExeCommand { get; }
    public ICommand LaunchPlayerCommand { get; }
    public ICommand PlayPauseCommand { get; }
    public ICommand SeekRelativeCommand { get; }
    public ICommand SetRateCommand { get; }
    public ICommand ClosePlayerCommand { get; }

    public ShowcaseMainViewModel()
    {
        // Default time presets (Last 20 minutes)
        var now = DateTime.UtcNow;
        _endTimeUtc = now;
        _startTimeUtc = now.AddMinutes(-20);
        _seekTimeUtc = now.AddMinutes(-8);

        // Populate default demo stations
        AvailableStations.Add(new StationItemViewModel("WS-ALPHA", true));
        AvailableStations.Add(new StationItemViewModel("WS-BRAVO", true));
        AvailableStations.Add(new StationItemViewModel("WS-CHARLIE", true));
        AvailableStations.Add(new StationItemViewModel("WS-DELTA", false));
        UpdateSelectedStationNames();

        // Locate player executable automatically
        _playerExePath = LocatePlayerExecutable();

        // Wire Commands
        ScanServersCommand = new RelayCommand(async () => await ScanServersAsync());
        FetchRecordedStationsCommand = new RelayCommand(async () => await FetchRecordedStationsAsync());
        AddStationCommand = new RelayCommand(ExecuteAddStation);
        SelectAllStationsCommand = new RelayCommand(() => SetAllStations(true));
        ClearAllStationsCommand = new RelayCommand(() => SetAllStations(false));

        SetPresetLast15mCommand = new RelayCommand(() => ApplyTimePreset(15));
        SetPresetLast30mCommand = new RelayCommand(() => ApplyTimePreset(30));
        SetPresetLast1hCommand = new RelayCommand(() => ApplyTimePreset(60));
        SetPresetLast4hCommand = new RelayCommand(() => ApplyTimePreset(240));

        BrowsePlayerExeCommand = new RelayCommand(ExecuteBrowsePlayerExe);
        LaunchPlayerCommand = new RelayCommand(async () => await LaunchPlayerAsync());
        PlayPauseCommand = new RelayCommand(async () => await TogglePlayPauseAsync());
        SeekRelativeCommand = new RelayCommand(async param => await SeekRelativeAsync(param));
        SetRateCommand = new RelayCommand(async param => await SetRateAsync(param));
        ClosePlayerCommand = new RelayCommand(async () => await ClosePlayerAsync());

        AddLog("Showcase C2 Dispatcher initialized. Ready to launch secure session.");
    }

    private void ApplyTimePreset(int minutes)
    {
        var now = DateTime.UtcNow;
        EndTimeUtc = now;
        StartTimeUtc = now.AddMinutes(-minutes);
        SeekTimeUtc = now.AddMinutes(-minutes / 2.0);
        AddLog($"Applied time preset: Last {minutes} minutes.");
    }

    private void SetAllStations(bool isSelected)
    {
        foreach (var station in AvailableStations)
        {
            station.IsSelected = isSelected;
        }
        UpdateSelectedStationNames();
    }

    private void ExecuteAddStation()
    {
        if (string.IsNullOrWhiteSpace(NewStationInput)) return;
        string name = NewStationInput.Trim().ToUpperInvariant();
        if (!AvailableStations.Any(s => s.Hostname.Equals(name, StringComparison.OrdinalIgnoreCase)))
        {
            var item = new StationItemViewModel(name, true);
            AvailableStations.Add(item);
            UpdateSelectedStationNames();
            AddLog($"Added workstation: {name}");
        }
        NewStationInput = string.Empty;
    }

    public void UpdateSelectedStationNames()
    {
        SelectedStationNames.Clear();
        foreach (var st in AvailableStations.Where(s => s.IsSelected))
        {
            SelectedStationNames.Add(st.Hostname);
        }
        if (!SelectedStationNames.Contains(SelectedAudioStation) && SelectedStationNames.Count > 0)
        {
            SelectedAudioStation = SelectedStationNames[0];
        }
    }

    private async Task ScanServersAsync()
    {
        _scanCts?.Cancel();
        _scanCts = new CancellationTokenSource(TimeSpan.FromSeconds(4));

        IsScanningServers = true;
        DiscoveryStatus = $"Scanning UDP multicast {MulticastAddress}:{MulticastPort}...";
        AddLog(DiscoveryStatus);

        try
        {
            var client = new ServerDiscoveryClient(
                discoveryPort: MulticastPort > 0 ? MulticastPort : ServerDiscoveryConstants.DefaultDiscoveryPort,
                multicastAddress: MulticastAddress);

            var servers = await client.DiscoverServersAsync(timeoutMs: 3000, ct: _scanCts.Token);
            DiscoveredServers.Clear();

            if (servers != null && servers.Count > 0)
            {
                foreach (var server in servers)
                {
                    string label = $"{server.ServerName} ({server.ApiBaseUrl}) - {server.Role}";
                    DiscoveredServers.Add(label);
                }

                SelectedServerUrl = servers[0].ApiBaseUrl.TrimEnd('/');
                DiscoveryStatus = $"Found {servers.Count} active ITB Recording Server(s).";
                AddLog($"Discovered server: {servers[0].ServerName} at {SelectedServerUrl}");
            }
            else
            {
                DiscoveryStatus = "No servers found on multicast probe. You can enter server URL manually.";
                AddLog("[WARNING] Multicast probe returned no servers.");
            }
        }
        catch (Exception ex)
        {
            DiscoveryStatus = $"Discovery error: {ex.Message}";
            AddLog($"[ERROR] Discovery probe failed: {ex.Message}");
        }
        finally
        {
            IsScanningServers = false;
        }
    }

    private async Task FetchRecordedStationsAsync()
    {
        if (string.IsNullOrWhiteSpace(SelectedServerUrl)) return;

        string targetUrl = $"{SelectedServerUrl.TrimEnd('/')}/api/v1/extractor/recorded-hosts?startUtc={StartTimeUtc:o}&endUtc={EndTimeUtc:o}";
        AddLog($"Querying server for recorded stations: {targetUrl}");

        try
        {
            var response = await _httpClient.GetAsync(targetUrl);
            if (response.IsSuccessStatusCode)
            {
                var hosts = await response.Content.ReadFromJsonAsync<string[]>();
                if (hosts != null && hosts.Length > 0)
                {
                    AvailableStations.Clear();
                    foreach (var h in hosts)
                    {
                        AvailableStations.Add(new StationItemViewModel(h, true));
                    }
                    UpdateSelectedStationNames();
                    AddLog($"Retrieved {hosts.Length} recorded stations from server: {string.Join(", ", hosts)}");
                }
                else
                {
                    AddLog("Server returned 0 recorded stations for the requested time range.");
                }
            }
            else
            {
                AddLog($"[WARNING] Server returned HTTP {(int)response.StatusCode} on recorded-hosts query.");
            }
        }
        catch (Exception ex)
        {
            AddLog($"[ERROR] Could not query server stations: {ex.Message}");
        }
    }

    private void ExecuteBrowsePlayerExe()
    {
        var dlg = new OpenFileDialog
        {
            Title = "Select ITB Player Executable",
            Filter = "ITB Player (ITB-SCREEN-RECORDER.Player.exe;*.exe)|*.exe|All Files (*.*)|*.*"
        };
        if (dlg.ShowDialog() == true)
        {
            PlayerExePath = dlg.FileName;
        }
    }

    private async Task LaunchPlayerAsync()
    {
        if (IsPlayerRunning)
        {
            AddLog("[WARNING] A session is already active. Close it before launching a new one.");
            return;
        }

        UpdateSelectedStationNames();
        if (SelectedStationNames.Count == 0)
        {
            MessageBox.Show("Please select at least one workstation to replay.", "Validation", MessageBoxButton.OK, MessageBoxImage.Warning);
            return;
        }

        if (string.IsNullOrEmpty(PlayerExePath) || !File.Exists(PlayerExePath))
        {
            MessageBox.Show($"ITB Player executable not found at:\n{PlayerExePath}\nPlease build or browse for the player executable.", "Binary Missing", MessageBoxButton.OK, MessageBoxImage.Error);
            return;
        }

        var replayParams = new ReplayLaunchParams
        {
            Stations = SelectedStationNames.ToList(),
            StartTimeUtc = StartTimeUtc,
            EndTimeUtc = EndTimeUtc,
            SeekTimeUtc = SeekTimeUtc,
            AudioStation = SelectedAudioStation,
            KeystrokeMode = SelectedKeystrokeMode,
            LayoutMode = SelectedLayoutMode,
            MulticastAddress = MulticastAddress,
            MulticastPort = MulticastPort,
            ServerApiUrl = SelectedServerUrl
        };

        AddLog("=================================================");
        AddLog($"Initiating secure replay session for {replayParams.Stations.Count} stations: {string.Join(", ", replayParams.Stations)}");
        AddLog($"Time Range: {StartTimeUtc:yyyy-MM-dd HH:mm:ss} -> {EndTimeUtc:yyyy-MM-dd HH:mm:ss} UTC (Seek: {SeekTimeUtc:HH:mm:ss})");

        ConnectionStatus = "CONNECTING...";
        IsPlayerRunning = true;

        try
        {
            _launcher = new PlayerSecureLauncher();

            _launcher.OnStateChanged += (s, state) =>
            {
                Application.Current?.Dispatcher?.Invoke(() =>
                {
                    ConnectionStatus = state.ToUpperInvariant();
                    AddLog($"[STATE] {state}");
                });
            };

            _launcher.OnEventReceived += (s, ev) =>
            {
                Application.Current?.Dispatcher?.Invoke(() =>
                {
                    if (ev.EventType == "STATE_CHANGED")
                    {
                        if (ev.State == "EXTRACTING_MEDIA" || ev.State == "DOWNLOADING_PACKAGE")
                        {
                            IsExtracting = true;
                            if (ev.ProgressPercent.HasValue) ExtractionProgressPercent = ev.ProgressPercent.Value;
                        }
                        else
                        {
                            IsExtracting = false;
                        }
                        AddLog($"[EVENT] {ev.State}: {ev.Message}");
                    }
                    else if (ev.EventType == "COMMAND_ACK")
                    {
                        AddLog($"[ACK] Command {ev.CommandId} Success={ev.Success}");
                    }
                });
            };

            _launcher.OnHeartbeatReceived += (s, hb) =>
            {
                Application.Current?.Dispatcher?.Invoke(() =>
                {
                    if (hb.CurrentPlayheadUtc.HasValue)
                    {
                        CurrentPlayheadDisplay = $"{hb.CurrentPlayheadUtc.Value:yyyy-MM-dd HH:mm:ss} UTC";
                    }
                    if (hb.IsPlaying.HasValue) IsPlaying = hb.IsPlaying.Value;
                    if (hb.PlaybackRate.HasValue) PlaybackRate = hb.PlaybackRate.Value;
                    if (hb.TimelineSeconds.HasValue) CurrentTimelineSeconds = hb.TimelineSeconds.Value;
                    if (hb.TotalDurationSeconds.HasValue) TotalDurationSeconds = hb.TotalDurationSeconds.Value > 0 ? hb.TotalDurationSeconds.Value : 1.0;
                });
            };

            _launcher.OnErrorReceived += (s, err) =>
            {
                Application.Current?.Dispatcher?.Invoke(() =>
                {
                    AddLog($"[ALERT] Code: {err.ErrorCode} | Fatal={err.IsFatal} | {err.Message}");
                });
            };

            AddLog($"[SECURITY] Ephemeral 256-bit AES-GCM Key generated. Piping via child stdin...");
            AddLog($"[SECURITY] Pipe: \\\\.\\pipe\\{_launcher.PipeName}");

            await _launcher.LaunchAsync(PlayerExePath, replayParams);
            AddLog("[CONNECTED] Encrypted Duplex IPC channel established with ITB Player!");
        }
        catch (Exception ex)
        {
            ConnectionStatus = "FAILED";
            IsPlayerRunning = false;
            AddLog($"[LAUNCH FAILED] {ex.Message}");
        }
    }

    private async Task TogglePlayPauseAsync()
    {
        if (_launcher == null || !IsPlayerRunning) return;
        if (IsPlaying)
        {
            AddLog("[COMMAND] -> PAUSE");
            await _launcher.PauseAsync();
        }
        else
        {
            AddLog("[COMMAND] -> PLAY");
            await _launcher.PlayAsync();
        }
    }

    private async Task SeekRelativeAsync(object? param)
    {
        if (_launcher == null || !IsPlayerRunning) return;
        if (param != null && double.TryParse(param.ToString(), out double deltaSeconds))
        {
            var targetUtc = DateTime.UtcNow;
            if (DateTime.TryParse(CurrentPlayheadDisplay.Replace(" UTC", ""), out var current))
            {
                targetUtc = current.AddSeconds(deltaSeconds);
            }
            AddLog($"[COMMAND] -> SEEK (delta {deltaSeconds:+0;-0;0}s to {targetUtc:HH:mm:ss} UTC)");
            await _launcher.SeekAsync(targetUtc);
        }
    }

    private async Task SetRateAsync(object? param)
    {
        if (_launcher == null || !IsPlayerRunning) return;
        if (param != null && double.TryParse(param.ToString(), out double rate))
        {
            AddLog($"[COMMAND] -> SET_RATE ({rate:0.0}x)");
            await _launcher.SetPlaybackRateAsync(rate);
        }
    }

    private async Task ClosePlayerAsync()
    {
        if (_launcher == null) return;
        AddLog("[COMMAND] -> CLOSE");
        await _launcher.CloseAsync();
        await _launcher.DisposeAsync();
        _launcher = null;
        IsPlayerRunning = false;
        ConnectionStatus = "DISCONNECTED";
        CurrentPlayheadDisplay = "--:--:-- UTC";
        AddLog("Player session closed.");
    }

    private void AddLog(string message)
    {
        string timestamp = DateTime.Now.ToString("HH:mm:ss");
        string line = $"[{timestamp}] {message}";
        EventLogs.Insert(0, line);
        if (EventLogs.Count > 200) EventLogs.RemoveAt(EventLogs.Count - 1);
    }

    private static string LocatePlayerExecutable()
    {
        string baseDir = AppContext.BaseDirectory;
        string[] candidates = new[]
        {
            // Debug build output
            Path.GetFullPath(Path.Combine(baseDir, @"..\..\..\..\ITB-SCREEN-RECORDER.Player\bin\Debug\net8.0-windows\ITB-SCREEN-RECORDER.Player.exe")),
            // Release build output
            Path.GetFullPath(Path.Combine(baseDir, @"..\..\..\..\ITB-SCREEN-RECORDER.Player\bin\Release\net8.0-windows\ITB-SCREEN-RECORDER.Player.exe")),
            // Distribution folder
            Path.GetFullPath(Path.Combine(baseDir, @"..\..\..\..\..\Publish\Player\windows\Build\ITB-SCREEN-RECORDER.Player.exe")),
            // Installed location
            @"C:\Program Files\ITB\Player\ITB-SCREEN-RECORDER.Player.exe"
        };

        foreach (var c in candidates)
        {
            if (File.Exists(c)) return c;
        }

        return candidates[0];
    }

    public async ValueTask DisposeAsync()
    {
        if (_launcher != null)
        {
            await _launcher.DisposeAsync();
            _launcher = null;
        }
        _httpClient.Dispose();
        _scanCts?.Dispose();
    }

    public void Dispose()
    {
        DisposeAsync().AsTask().GetAwaiter().GetResult();
    }
}
