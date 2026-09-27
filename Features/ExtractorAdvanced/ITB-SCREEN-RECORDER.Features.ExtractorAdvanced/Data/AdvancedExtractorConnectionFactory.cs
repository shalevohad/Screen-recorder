namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data;

using System.Data;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using Microsoft.Extensions.Configuration;

public interface IAdvancedExtractorConnectionFactory
{
    IDbConnection CreateConnection();
    string DatabasePath { get; }
}

public sealed class AdvancedExtractorConnectionFactory : BaseSqliteConnectionFactory, IAdvancedExtractorConnectionFactory
{
    public AdvancedExtractorConnectionFactory(IConfiguration configuration)
        : base(
            dbFileName: "advance_extractor.db",
            customDirectory: configuration["Database:BaseDirectory"],
            busyTimeoutSeconds: configuration.GetValue<int>("Database:BusyTimeoutSeconds", 5))
    {
    }
}