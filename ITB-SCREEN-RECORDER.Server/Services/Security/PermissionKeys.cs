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

    public static readonly IReadOnlyList<ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto> Catalog = new[]
    {
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(StationsView, "View Stations & Telemetry", "Stations & Live Feeds", "Authorize station grid visibility, live screen feeds, and telemetry metrics."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(StationsControl, "Control Station Streaming", "Stations & Live Feeds", "Start, stop, and toggle recording streams on remote station agents."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(StationsManage, "Manage Station Metadata", "Stations & Live Feeds", "Configure station display aliases, fleet groupings, and custom roles."),

        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(PlaybackView, "View Recordings & Timeline", "Playback & Investigation", "Access historical recordings archive, scrubbing timeline, and media playback."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(PlaybackExport, "Export Video Clips", "Playback & Investigation", "Extract, render, and download video segments to local files."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(BookmarksManage, "Manage Tactical Bookmarks", "Playback & Investigation", "Create, edit, and remove operational event markers and annotations."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(ExtractorView, "Forensic Extractor Access", "Playback & Investigation", "Access smart forensic text recognition and video evidence extraction tools."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(StudioView, "Timeline Studio Editor", "Playback & Investigation", "Access multi-channel synchronized timeline review and evidence studio."),

        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(SettingsView, "View System Settings", "Settings & System", "Access centralized settings portal and inspect system configurations."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(SettingsAgents, "Configure Agent Operations", "Settings & System", "Adjust default bitrate, FPS policies, and per-station tuning overrides."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(SettingsStorage, "Configure Storage & Retention", "Settings & System", "Update network storage directories, retention periods, and storage quotas."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(SettingsMaintenance, "System Maintenance & Diagnostics", "Settings & System", "Trigger database vacuum, disk health re-indexing, and cache purges."),

        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(SecurityUsersManage, "Manage User Accounts & Overrides", "Security & Access", "Provision local user accounts, reset passwords, and set granular overrides."),
        new ITB_SCREEN_RECORDER.Server.Models.Security.PermissionItemDto(SecurityRolesManage, "Manage Roles & LDAP Mappings", "Security & Access", "Create/edit operational roles, assign permissions, and map Active Directory groups.")
    };
}