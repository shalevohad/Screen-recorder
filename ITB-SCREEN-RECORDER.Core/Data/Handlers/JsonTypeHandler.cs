namespace ITB_SCREEN_RECORDER.Core.Data;

using System;
using System.Data;
using System.Text.Json;
using Dapper;

public class JsonTypeHandler<T> : SqlMapper.TypeHandler<T>
{
    public override void SetValue(IDbDataParameter parameter, T? value)
    {
        parameter.Value = value == null ? DBNull.Value : JsonSerializer.Serialize(value);
    }

    public override T? Parse(object value)
    {
        if (value == null || value is DBNull) return default;
        return JsonSerializer.Deserialize<T>(value.ToString()!);
    }
}