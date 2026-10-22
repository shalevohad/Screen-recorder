namespace ITBRecorderAgent.Providers.Video
{
    public record DxgiDisplayDescriptor(
        uint AdapterIndex,
        uint OutputIndex,
        string DisplayId,
        string DeviceName,
        string AdapterName,
        string AdapterLuid,
        int X,
        int Y,
        int Width,
        int Height,
        bool IsPrimary
    );
}
