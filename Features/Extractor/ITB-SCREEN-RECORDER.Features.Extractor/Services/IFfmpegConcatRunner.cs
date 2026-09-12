using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public interface IFfmpegConcatRunner
    {
        Task ExecuteStreamCopyAsync(string concatManifestContent, Stream destinationStream, CancellationToken ct);
    }
}