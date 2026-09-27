namespace ITB_SCREEN_RECORDER.Core.Abstractions;

using System.Data;
using Microsoft.Data.Sqlite;

public abstract class BaseSqliteConnectionFactory
{
    private readonly string _connectionString;
    public string DatabasePath { get; }

    protected BaseSqliteConnectionFactory(string dbFileName, string? customDirectory = null, int busyTimeoutSeconds = 5)
    {
        var targetDirectory = !string.IsNullOrWhiteSpace(customDirectory)
            ? customDirectory
            : Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "ITB-ScreenRecorder", "Data");

        Directory.CreateDirectory(targetDirectory);
        DatabasePath = Path.Combine(targetDirectory, dbFileName);

        var builder = new SqliteConnectionStringBuilder
        {
            DataSource = DatabasePath,
            Mode = SqliteOpenMode.ReadWriteCreate,
            Cache = SqliteCacheMode.Shared,
            DefaultTimeout = busyTimeoutSeconds
        };

        _connectionString = builder.ToString();
    }

    public IDbConnection CreateConnection()
    {
        var connection = new SqliteConnection(_connectionString);
        connection.Open();

        using var cmd = connection.CreateCommand();
        cmd.CommandText = @"
            PRAGMA journal_mode = WAL;
            PRAGMA synchronous = NORMAL;
            PRAGMA busy_timeout = 5000;
        ";
        cmd.ExecuteNonQuery();

        return connection;
    }
}