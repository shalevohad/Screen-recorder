namespace ITB_SCREEN_RECORDER.Features.Extractor.Data;

using System.Data;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using Microsoft.Extensions.Configuration;

public interface IExtractorConnectionFactory
{
    IDbConnection CreateConnection();
    string DatabasePath { get; }
}

public sealed class ExtractorConnectionFactory(IConfiguration config)
    : BaseSqliteConnectionFactory(config, "extractor.db"), IExtractorConnectionFactory;