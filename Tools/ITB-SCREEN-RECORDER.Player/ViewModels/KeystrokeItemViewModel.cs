using System;
using ITB_SCREEN_RECORDER.Player.Core.Keystrokes;

namespace ITB_SCREEN_RECORDER.Player.ViewModels;

public sealed class KeystrokeItemViewModel : ViewModelBase
{
    public int Index { get; set; }
    public string StationId { get; set; } = string.Empty;
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsShortcutOrControlKey { get; set; }

    public string TimeFormatted => $"{StartTime:hh\\:mm\\:ss\\.fff}";

    public KeystrokeItemViewModel(KeystrokeAuditCue cue)
    {
        Index = cue.Index;
        StationId = cue.StationId;
        StartTime = cue.StartTime;
        EndTime = cue.EndTime;
        Text = cue.Text;
        IsShortcutOrControlKey = cue.IsShortcutOrControlKey;
    }
}
