namespace ITB_SCREEN_RECORDER.Features.Extractor.Data;

using System.Data;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using Microsoft.Extensions.Configuration;

public interface IExtractorConnectionFactory
{
    IDbConnection CreateConnection();
    string DatabasePath { get; }
}

public sealed class ExtractorConnectionFactory : BaseSqliteConnectionFactory, IExtractorConnectionFactory
{
    public ExtractorConnectionFactory(IConfiguration configuration)
        : base(
            dbFileName: "extractor.db",
            customDirectory: configuration["Database:BaseDirectory"],
            busyTimeoutSeconds: configuration.GetValue<int>("Database:BusyTimeoutSeconds", 5))
    {
    }
}