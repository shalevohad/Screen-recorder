namespace ITB_SCREEN_RECORDER.Server.Data;

using System.Data;
using ITB_SCREEN_RECORDER.Core.Abstractions;
using Microsoft.Extensions.Configuration;

public interface ICatalogConnectionFactory
{
    IDbConnection CreateConnection();
    string DatabasePath { get; }
}

public sealed class CatalogConnectionFactory : BaseSqliteConnectionFactory, ICatalogConnectionFactory
{
    public CatalogConnectionFactory(IConfiguration configuration)
        : base(
            dbFileName: "system_catalog.db",
            customDirectory: configuration["Database:BaseDirectory"],
            busyTimeoutSeconds: configuration.GetValue<int>("Database:BusyTimeoutSeconds", 5))
    {
    }
}