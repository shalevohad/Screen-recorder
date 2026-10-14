namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;

public record StationRoleDiffItem(
    string Hostname,
    string? CurrentRoleAlias,
    string? NewRoleAlias,
    bool HasChanged
);

public sealed class StationRolesService
{
    private readonly ICatalogRepository _repository;

    public StationRolesService(ICatalogRepository repository)
    {
        _repository = repository;
    }

    public async Task<Dictionary<string, string>> GetAllRolesAsync()
    {
        return await _repository.GetAllStationRoleAliasesAsync();
    }

    public async Task SetRoleAliasAsync(string hostname, string? roleAlias)
    {
        await _repository.SetStationRoleAliasAsync(hostname, roleAlias);
    }

    public async Task<IReadOnlyList<StationRoleDiffItem>> PreviewCsvMappingAsync(Stream csvStream)
    {
        var existing = await _repository.GetAllStationRoleAliasesAsync();
        var diffList = new List<StationRoleDiffItem>();

        using var reader = new StreamReader(csvStream, Encoding.UTF8);
        string? header = await reader.ReadLineAsync(); // Hostname,RoleAlias

        string? line;
        while ((line = await reader.ReadLineAsync()) != null)
        {
            if (string.IsNullOrWhiteSpace(line)) continue;
            var parts = line.Split(',');
            if (parts.Length < 1) continue;

            string hostname = parts[0].Trim();
            string? newRole = parts.Length > 1 ? parts[1].Trim() : null;
            if (string.IsNullOrEmpty(newRole)) newRole = null;

            existing.TryGetValue(hostname, out string? currentRole);
            bool hasChanged = !string.Equals(currentRole, newRole, StringComparison.OrdinalIgnoreCase);

            diffList.Add(new StationRoleDiffItem(hostname, currentRole, newRole, hasChanged));
        }

        return diffList;
    }

    public async Task ApplyMappingAsync(IEnumerable<(string Hostname, string? RoleAlias)> mappings)
    {
        await _repository.BulkUpdateStationRoleAliasesAsync(mappings);
    }

    public async Task<byte[]> ExportMappingCsvAsync()
    {
        var mappings = await _repository.GetAllStationRoleAliasesAsync();
        var sb = new StringBuilder();
        sb.AppendLine("Hostname,RoleAlias");

        foreach (var (host, role) in mappings.OrderBy(m => m.Key))
        {
            sb.AppendLine($"{host},{role ?? ""}");
        }

        return Encoding.UTF8.GetBytes(sb.ToString());
    }
}