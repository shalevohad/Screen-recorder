using System;

namespace ITB_SCREEN_RECORDER.Core.Plugins
{
    public interface IFeatureModule
    {
        string Id { get; }
        string Title { get; }
        string IconName { get; }
        string ScriptUrl { get; }
        int DefaultWidth { get; }
        int DefaultHeight { get; }
        int MinWidth { get; }
        int MinHeight { get; }
        bool IsEnabled { get; }

        /// <summary>
        /// Feature IDs that this module supersedes or replaces in the dashboard navigation.
        /// Defaults to an empty array (no supersession).
        /// </summary>
        string[] SupersedesIds => Array.Empty<string>();
    }
}