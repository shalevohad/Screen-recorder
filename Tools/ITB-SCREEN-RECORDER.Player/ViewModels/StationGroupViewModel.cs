using System;
using System.Collections.ObjectModel;
using System.Linq;

namespace ITB_SCREEN_RECORDER.Player.ViewModels;

public sealed class StationGroupViewModel : ViewModelBase
{
    private string _hostname = string.Empty;
    private double _boundingWidth = 1920;
    private double _boundingHeight = 1080;
    private double _minX = 0;
    private double _minY = 0;
    private bool _isSelected;

    public string Hostname
    {
        get => _hostname;
        set => SetProperty(ref _hostname, value);
    }

    public ObservableCollection<VideoTrackViewModel> Displays { get; } = new();

    public bool HasMultipleDisplays => Displays.Count > 1;

    public int DisplayCount => Displays.Count;

    public string DisplayName => Displays.Count > 1 
        ? $"{Hostname} ({Displays.Count} Screens)" 
        : Hostname;

    public VideoTrackViewModel? PrimaryDisplay => Displays.FirstOrDefault(d => d.IsPrimary) ?? Displays.FirstOrDefault();

    public double BoundingWidth
    {
        get => _boundingWidth;
        set => SetProperty(ref _boundingWidth, value);
    }

    public double BoundingHeight
    {
        get => _boundingHeight;
        set => SetProperty(ref _boundingHeight, value);
    }

    public double MinX
    {
        get => _minX;
        set => SetProperty(ref _minX, value);
    }

    public double MinY
    {
        get => _minY;
        set => SetProperty(ref _minY, value);
    }

    public bool IsSelected
    {
        get => _isSelected;
        set => SetProperty(ref _isSelected, value);
    }

    public void RecalculateTopologyLayout()
    {
        if (Displays.Count == 0)
        {
            BoundingWidth = 1920;
            BoundingHeight = 1080;
            MinX = 0;
            MinY = 0;
            return;
        }

        double minX = Displays.Min(d => d.X);
        double minY = Displays.Min(d => d.Y);
        double maxX = Displays.Max(d => d.X + (d.Width > 0 ? d.Width : 1920));
        double maxY = Displays.Max(d => d.Y + (d.Height > 0 ? d.Height : 1080));

        MinX = minX;
        MinY = minY;
        BoundingWidth = Math.Max(640, maxX - minX);
        BoundingHeight = Math.Max(360, maxY - minY);

        foreach (var disp in Displays)
        {
            disp.CanvasLeft = disp.X - minX;
            disp.CanvasTop = disp.Y - minY;
            disp.CanvasWidth = disp.Width > 0 ? disp.Width : 1920;
            disp.CanvasHeight = disp.Height > 0 ? disp.Height : 1080;
        }

        OnPropertyChanged(nameof(DisplayName));
        OnPropertyChanged(nameof(HasMultipleDisplays));
        OnPropertyChanged(nameof(DisplayCount));
    }
}
