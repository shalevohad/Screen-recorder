namespace ITB_SCREEN_RECORDER.Core.Abstractions;

public interface IFeatureDbInitializer
{
    string FeatureName { get; }
    int ExecutionOrder { get; }
    void Initialize();
}