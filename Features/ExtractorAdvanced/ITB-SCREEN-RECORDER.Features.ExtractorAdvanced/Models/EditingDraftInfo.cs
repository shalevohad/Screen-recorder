namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

using System;

public class EditingDraftInfo
{
    public string DraftId { get; set; } = Guid.NewGuid().ToString("N");
    public string Title { get; set; } = string.Empty;
    public string StateJson { get; set; } = "{}";
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}