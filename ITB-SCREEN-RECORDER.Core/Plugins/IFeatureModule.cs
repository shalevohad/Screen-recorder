namespace ITB_SCREEN_RECORDER.Server.Core.Plugins
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
    }
}