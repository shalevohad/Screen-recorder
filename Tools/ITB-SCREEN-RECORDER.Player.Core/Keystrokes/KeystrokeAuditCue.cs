using System;

namespace ITB_SCREEN_RECORDER.Player.Core.Keystrokes;

/// <summary>
/// Represents a single indexed keystroke cue or subtitle event.
/// </summary>
public sealed record KeystrokeAuditCue(
    int Index,
    string StationId,
    TimeSpan StartTime,
    TimeSpan EndTime,
    string Text,
    bool IsShortcutOrControlKey
);
