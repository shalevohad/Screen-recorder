using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public interface IDummyVideoGenerator
    {
        Task<string> GetOrGenerateDummyVideoAsync(string sampleFilePath);
    }
}