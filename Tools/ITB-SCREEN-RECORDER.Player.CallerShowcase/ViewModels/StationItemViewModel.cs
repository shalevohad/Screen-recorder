namespace ITB_SCREEN_RECORDER.Player.CallerShowcase.ViewModels;

public sealed class StationItemViewModel : ViewModelBase
{
    private string _hostname = string.Empty;
    private bool _isSelected = true;

    public string Hostname
    {
        get => _hostname;
        set => SetProperty(ref _hostname, value);
    }

    public bool IsSelected
    {
        get => _isSelected;
        set => SetProperty(ref _isSelected, value);
    }

    public StationItemViewModel(string hostname, bool isSelected = true)
    {
        _hostname = hostname;
        _isSelected = isSelected;
    }
}
