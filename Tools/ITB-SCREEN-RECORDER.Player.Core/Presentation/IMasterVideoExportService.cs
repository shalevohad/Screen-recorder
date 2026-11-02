using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;

namespace ITB_SCREEN_RECORDER.Player.Core.Presentation;

public interface IMasterVideoExportService
{
    /// <summary>
    /// Renders the complete presentation (following director switching cues or active view)
    /// into a single consolidated master MP4 video file.
    /// </summary>
    Task ExportMasterVideoAsync(
        ITarVirtualFileSystem tarFs,
        PresentationDirectorPlan plan,
        string outputFilePath,
        IProgress<(double ProgressPercent, string StatusMessage)>? progress = null,
        CancellationToken ct = default);
}
