using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Core.Plugins;

public interface IRetentionShieldProvider
{
    string ProviderName { get; }
    Task<bool> IsRangeShieldedAsync(string stationId, long startEpochMs, long endEpochMs);
}