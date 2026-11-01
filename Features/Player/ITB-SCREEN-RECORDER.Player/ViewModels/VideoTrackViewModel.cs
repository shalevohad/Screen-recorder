using System;
using ITB_SCREEN_RECORDER.Player.Core.Audio;

namespace ITB_SCREEN_RECORDER.Player.ViewModels;

public sealed class VideoTrackViewModel : ViewModelBase
{
    private bool _isFocused;
    private string _activeCaption = string.Empty;
    private bool _isInGap;
    private double _volume = 1.0;
    private double _pan = 0.0;
    private bool _isMuted;
    private bool _isSolo;
    private AudioChannelMode _channelMode = AudioChannelMode.Both;
    private bool _isDucked;
    private float _vuPeak;

    public int TrackIndex { get; set; }
    public string Hostname { get; set; } = string.Empty;
    public int MonitorIndex { get; set; }
    public bool IsPrimary { get; set; }
    public string StreamUrl { get; set; } = string.Empty;

    public string DisplayName => $"{Hostname} (Mon {MonitorIndex}){(IsPrimary ? " [Primary]" : "")}";

    public bool IsFocused
    {
        get => _isFocused;
        set => SetProperty(ref _isFocused, value);
    }

    public string ActiveCaption
    {
        get => _activeCaption;
        set => SetProperty(ref _activeCaption, value);
    }

    public bool IsInGap
    {
        get => _isInGap;
        set => SetProperty(ref _isInGap, value);
    }

    public double Volume
    {
        get => _volume;
        set
        {
            if (SetProperty(ref _volume, value))
            {
                OnAudioSettingChanged?.Invoke(this);
            }
        }
    }

    public double Pan
    {
        get => _pan;
        set
        {
            if (SetProperty(ref _pan, value))
            {
                OnAudioSettingChanged?.Invoke(this);
            }
        }
    }

    public bool IsMuted
    {
        get => _isMuted;
        set
        {
            if (SetProperty(ref _isMuted, value))
            {
                OnAudioSettingChanged?.Invoke(this);
            }
        }
    }

    public bool IsSolo
    {
        get => _isSolo;
        set
        {
            if (SetProperty(ref _isSolo, value))
            {
                OnAudioSettingChanged?.Invoke(this);
            }
        }
    }

    public AudioChannelMode ChannelMode
    {
        get => _channelMode;
        set
        {
            if (SetProperty(ref _channelMode, value))
            {
                OnAudioSettingChanged?.Invoke(this);
            }
        }
    }

    public bool IsDucked
    {
        get => _isDucked;
        set => SetProperty(ref _isDucked, value);
    }

    public float VuPeak
    {
        get => _vuPeak;
        set => SetProperty(ref _vuPeak, value);
    }

    public Action<VideoTrackViewModel>? OnAudioSettingChanged { get; set; }
}
