namespace ITB_SCREEN_RECORDER.Server.Services.Security;

using System.Collections.Generic;

public static class PermissionKeys
{
    // תחנות ושידור חי
    public const string StationsView = "stations.view";
    public const string StationsControl = "stations.control";
    public const string StationsManage = "stations.manage";

    // תחקור, חילוץ ועריכה
    public const string PlaybackView = "playback.view";
    public const string PlaybackExport = "playback.export";
    public const string BookmarksManage = "bookmarks.manage";
    public const string ExtractorView = "extractor.view";
    public const string StudioView = "studio.view";

    // הגדרות מערכת ותשתיות
    public const string SettingsView = "settings.view";
    public const string SettingsAgents = "settings.agents";
    public const string SettingsStorage = "settings.storage";
    public const string SettingsMaintenance = "settings.maintenance";

    // משתמשים ואבטחה
    public const string SecurityUsersManage = "security.users.manage";
    public const string SecurityRolesManage = "security.roles.manage";

    public static readonly IReadOnlyList<string> All = new[]
    {
        StationsView,
        StationsControl,
        StationsManage,
        PlaybackView,
        PlaybackExport,
        BookmarksManage,
        ExtractorView,
        StudioView,
        SettingsView,
        SettingsAgents,
        SettingsStorage,
        SettingsMaintenance,
        SecurityUsersManage,
        SecurityRolesManage
    };
}