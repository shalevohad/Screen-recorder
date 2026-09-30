// ==========================================
// File: Features/Extractor/Services/IFfmpegBinaryResolver.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public interface IFfmpegBinaryResolver
    {
        string ResolveFfmpeg();
        string ResolveFfprobe();
        string ResolveBinary(string baseName);
    }
}