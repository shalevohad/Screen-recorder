using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public interface IExtractorService
    {
        Task<ExtractionPreviewResponseDto> GetPreviewAsync(ExtractionRequestDto request);
        Task StreamTarArchiveAsync(ExtractionRequestDto request, Stream destinationStream, CancellationToken ct);
    }
}