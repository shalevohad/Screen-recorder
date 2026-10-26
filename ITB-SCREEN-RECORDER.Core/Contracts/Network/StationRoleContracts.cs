namespace ITB_SCREEN_RECORDER.Core.Contracts.Network;

using System.Collections.Generic;
using System.Threading.Tasks;

/// <summary>
/// Operational station role and alias provider accessible across server and feature plugins.
/// </summary>
public interface IStationRoleProvider
{
    /// <summary>
    /// Retrieves all configured station role aliases (keyed by physical hostname, case-insensitive).
    /// </summary>
    Task<Dictionary<string, string>> GetAllStationRoleAliasesAsync();
}
