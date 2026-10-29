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
    bool HasChanged,
    string? ConflictWith = null
);

public sealed class StationRolesService
{
    private readonly ICatalogRepository _repository;
    private readonly ITelemetryStateService? _telemetryState;

    public StationRolesService(ICatalogRepository repository, ITelemetryStateService? telemetryState = null)
    {
        _repository = repository;
        _telemetryState = telemetryState;
    }

    public async Task<Dictionary<string, string>> GetAllRolesAsync()
    {
        return await _repository.GetAllStationRoleAliasesAsync();
    }

    public async Task SetRoleAliasAsync(string hostname, string? roleAlias)
    {
        string cleanHost = hostname.Trim();
        string? cleanAlias = string.IsNullOrWhiteSpace(roleAlias) ? null : roleAlias.Trim();

        if (string.Equals(cleanAlias, "Default", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(cleanAlias, "defualt", StringComparison.OrdinalIgnoreCase))
        {
            cleanAlias = null;
        }

        if (cleanAlias != null)
        {
            var existing = await _repository.GetAllStationRoleAliasesAsync();
            var conflict = existing.FirstOrDefault(kvp =>
                !string.Equals(kvp.Key, cleanHost, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(kvp.Value, cleanAlias, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrEmpty(conflict.Key))
            {
                throw new InvalidOperationException($"The role alias '{cleanAlias}' is already assigned to station '{conflict.Key}'. Each station must have a unique role alias.");
            }
        }

        await _repository.SetStationRoleAliasAsync(cleanHost, cleanAlias);
    }

    public async Task SwapRoleAliasesAsync(string stationA, string stationB)
    {
        if (string.IsNullOrWhiteSpace(stationA) || string.IsNullOrWhiteSpace(stationB))
        {
            throw new ArgumentException("Both station hostnames are required for swapping.");
        }

        string cleanA = stationA.Trim();
        string cleanB = stationB.Trim();

        if (string.Equals(cleanA, cleanB, StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("Cannot swap aliases of the same station.");
        }

        await _repository.SwapStationRoleAliasesAsync(cleanA, cleanB);
    }

    public async Task<IReadOnlyList<StationRoleDiffItem>> PreviewCsvMappingAsync(Stream csvStream)
    {
        var existing = await _repository.GetAllStationRoleAliasesAsync();
        var diffList = new List<StationRoleDiffItem>();
        var seenAliases = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

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
            if (string.IsNullOrWhiteSpace(newRole) ||
                string.Equals(newRole, "Default", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(newRole, "defualt", StringComparison.OrdinalIgnoreCase))
            {
                newRole = null;
            }

            existing.TryGetValue(hostname, out string? currentRole);
            bool hasChanged = !string.Equals(currentRole, newRole, StringComparison.OrdinalIgnoreCase);

            string? conflictWith = null;
            if (newRole != null)
            {
                if (seenAliases.TryGetValue(newRole, out var prevHost))
                {
                    conflictWith = prevHost;
                }
                else
                {
                    var dbConflict = existing.FirstOrDefault(kvp =>
                        !string.Equals(kvp.Key, hostname, StringComparison.OrdinalIgnoreCase) &&
                        string.Equals(kvp.Value, newRole, StringComparison.OrdinalIgnoreCase));

                    if (!string.IsNullOrEmpty(dbConflict.Key))
                    {
                        conflictWith = dbConflict.Key;
                    }
                    seenAliases[newRole] = hostname;
                }
            }

            diffList.Add(new StationRoleDiffItem(hostname, currentRole, newRole, hasChanged, conflictWith));
        }

        return diffList;
    }

    public async Task ApplyMappingAsync(IEnumerable<(string Hostname, string? RoleAlias)> mappings)
    {
        var existing = await _repository.GetAllStationRoleAliasesAsync();
        var mapList = mappings.Select(m =>
        {
            string cleanHost = m.Hostname.Trim();
            string? cleanRole = m.RoleAlias?.Trim();
            if (string.IsNullOrWhiteSpace(cleanRole) ||
                string.Equals(cleanRole, "Default", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(cleanRole, "defualt", StringComparison.OrdinalIgnoreCase))
            {
                cleanRole = null;
            }
            return (Hostname: cleanHost, RoleAlias: cleanRole);
        }).ToList();

        // 1. Check for duplicates within the submitted mappings
        var aliasToHost = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        foreach (var (host, role) in mapList)
        {
            if (string.IsNullOrWhiteSpace(role)) continue;

            if (aliasToHost.TryGetValue(role, out var duplicateHost))
            {
                throw new InvalidOperationException($"Duplicate role alias '{role}' assigned to both '{duplicateHost}' and '{host}'. Role aliases must be unique.");
            }
            aliasToHost[role] = host;
        }

        // 2. Check for conflicts with existing database entries not updated in this batch
        foreach (var (cleanRole, cleanHost) in aliasToHost)
        {
            var conflict = existing.FirstOrDefault(kvp =>
                !string.Equals(kvp.Key, cleanHost, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(kvp.Value, cleanRole, StringComparison.OrdinalIgnoreCase) &&
                !mapList.Any(m => string.Equals(m.Hostname, kvp.Key, StringComparison.OrdinalIgnoreCase)));

            if (!string.IsNullOrEmpty(conflict.Key))
            {
                throw new InvalidOperationException($"The role alias '{cleanRole}' is already assigned to station '{conflict.Key}'. Each station must have a unique role alias.");
            }
        }

        await _repository.BulkUpdateStationRoleAliasesAsync(mapList);
    }

    public async Task<byte[]> ExportMappingCsvAsync()
    {
        var roleMappings = await _repository.GetAllStationRoleAliasesAsync();
        var knownHostnames = await _repository.GetAllKnownStationHostnamesAsync();

        if (_telemetryState != null)
        {
            foreach (var agent in _telemetryState.GetAllAgents())
            {
                if (!string.IsNullOrWhiteSpace(agent.Hostname))
                {
                    knownHostnames.Add(agent.Hostname.Trim());
                }
            }
        }

        foreach (var host in roleMappings.Keys)
        {
            if (!string.IsNullOrWhiteSpace(host))
            {
                knownHostnames.Add(host.Trim());
            }
        }

        var sb = new StringBuilder();
        sb.AppendLine("Hostname,RoleAlias");

        foreach (var host in knownHostnames.OrderBy(h => h, StringComparer.OrdinalIgnoreCase))
        {
            string alias = roleMappings.TryGetValue(host, out var a) && !string.IsNullOrWhiteSpace(a)
                ? a.Trim()
                : "Default";

            sb.AppendLine($"{host},{alias}");
        }

        return Encoding.UTF8.GetBytes(sb.ToString());
    }
}
