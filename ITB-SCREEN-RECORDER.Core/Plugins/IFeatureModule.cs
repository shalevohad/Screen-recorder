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

        // 💡 היכולת החדשה: כל פיצ'ר יכול להצהיר את מי הוא דורס. 
        // ברירת המחדל היא מערך ריק (לא דורס אף אחד).
        string[] SupersedesIds => Array.Empty<string>();
    }
}