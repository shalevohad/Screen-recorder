namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data;

using System.Data;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using Microsoft.Extensions.Configuration;

public interface IAdvancedExtractorConnectionFactory
{
    IDbConnection CreateConnection();
    string DatabasePath { get; }
}

public sealed class AdvancedExtractorConnectionFactory(IConfiguration config)
    : BaseSqliteConnectionFactory(config, "advance_extractor.db"), IAdvancedExtractorConnectionFactory;