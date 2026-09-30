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
    /// בודק האם עמודה קיימת בטבלה. במידה ולא - מוסיף אותה אוטומטית ללא פגיעה במידע קיים.
    /// </summary>
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