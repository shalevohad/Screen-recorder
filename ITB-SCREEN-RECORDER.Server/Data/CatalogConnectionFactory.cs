namespace ITB_SCREEN_RECORDER.Server.Data;

using System.Data;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using Microsoft.Extensions.Configuration;

public interface ICatalogConnectionFactory
{
    IDbConnection CreateConnection();
    string DatabasePath { get; }
}

public sealed class CatalogConnectionFactory(IConfiguration config)
    : BaseSqliteConnectionFactory(config, "system_catalog.db"), ICatalogConnectionFactory;