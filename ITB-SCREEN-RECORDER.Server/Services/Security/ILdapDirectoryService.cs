namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Models.Security;

public interface ILdapDirectoryService
{
    Task<AdBrowseResultDto> BrowseOuTreeAsync(string? baseDn = null, bool simulate = false);
    Task<AdSearchResultDto> SearchEntitiesAsync(string query, string? baseDn = null, int limit = 30, bool simulate = false);
    Task<LdapTestResultDto> TestConnectionAsync(string? server = null, int? port = null, string? baseDn = null, bool? useSsl = null, string? bindDn = null, string? bindPassword = null);
    Task<AdAutoDetectResultDto> AutoDetectSettingsAsync(string? hostOrDomain, bool? preferSsl = null);
    Task<AdDiagnosticsReportDto> RunDiagnosticsAsync(string? server = null, int? port = null, string? baseDn = null, bool? useSsl = null, string? bindDn = null, string? bindPassword = null);
}
