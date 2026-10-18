using System;
using System.Data;
using System.IO;
using ITB_SCREEN_RECORDER.Server.Data;
using Microsoft.Data.Sqlite;

namespace ITB_SCREEN_RECORDER.Tests.Server.Data;

public sealed class TestSqliteConnectionFactory : ICatalogConnectionFactory, IDisposable
{
    private readonly string _dbPath;
    private readonly string _connectionString;

    public TestSqliteConnectionFactory()
    {
        _dbPath = Path.Combine(Path.GetTempPath(), $"itb_test_catalog_{Guid.NewGuid():N}.db");
        _connectionString = $"Data Source={_dbPath};Mode=ReadWriteCreate;Cache=Shared";
    }

    public string DatabasePath => _dbPath;

    public IDbConnection CreateConnection()
    {
        var conn = new SqliteConnection(_connectionString);
        conn.Open();
        return conn;
    }

    public void Dispose()
    {
        SqliteConnection.ClearAllPools();
        if (File.Exists(_dbPath))
        {
            try { File.Delete(_dbPath); } catch { }
        }
        string wal = _dbPath + "-wal";
        string shm = _dbPath + "-shm";
        if (File.Exists(wal)) try { File.Delete(wal); } catch { }
        if (File.Exists(shm)) try { File.Delete(shm); } catch { }
    }
}
