namespace ITB_SCREEN_RECORDER.Core.Abstractions;

using System;
using System.Data;
using System.Linq;
using Dapper;

public static class SqliteMigrationExtensions
{
    private sealed class PragmaColumn
    {
        public string Name { get; set; } = string.Empty;
    }

    /// <summary>
    /// Checks whether a column exists in the specified table. If missing, dynamically executes ALTER TABLE to add it without disrupting existing records.
    /// </summary>
    /// <param name="db">The open SQLite database connection.</param>
    /// <param name="tableName">The table to inspect.</param>
    /// <param name="columnName">The column name to check or create.</param>
    /// <param name="columnDefinition">The SQL definition and type of the column (e.g. TEXT NULL, INTEGER DEFAULT 0).</param>
    public static void EnsureColumn(this IDbConnection db, string tableName, string columnName, string columnDefinition)
    {
        if (string.IsNullOrWhiteSpace(tableName) || string.IsNullOrWhiteSpace(columnName)) return;

        var existingColumns = db.Query<PragmaColumn>($"PRAGMA table_info({tableName});")
            .Select(c => c.Name)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        if (!existingColumns.Contains(columnName))
        {
            db.Execute($"ALTER TABLE {tableName} ADD COLUMN {columnName} {columnDefinition};");
        }
    }
}