// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Compatibility/LegacyCompatShims.cs
// ==========================================
// Architectural Backward-Compatibility Bridge:
// Provides type aliases and shims across legacy namespaces to guarantee zero-breakage
// across Server, AgentWorker, AgentService, Features, and Test harnesses during the Core modular restructuring.
// ==========================================

namespace ITB_SCREEN_RECORDER.Core.Contracts.Capture
{
    // Canonical namespace for capture providers
    public interface IScreenCaptureProvider : ITBRecorderAgent.Providers.Video.IScreenCaptureProvider { }
    public interface IAudioCaptureProvider : ITBRecorderAgent.Providers.Audio.IAudioCaptureProvider { }
}

namespace ITB_SCREEN_RECORDER.Core.Contracts.Data
{
    // Canonical namespace for feature database initialization contracts
    public interface IFeatureDbInitializer : ITB_SCREEN_RECORDER.Core.Abstractions.IFeatureDbInitializer { }
}

namespace ITB_SCREEN_RECORDER.Core.Contracts.Plugins
{
    // Canonical namespace for plugin abstractions
    public interface IFeatureModule : ITB_SCREEN_RECORDER.Core.Plugins.IFeatureModule { }
    public interface IRetentionShieldProvider : ITB_SCREEN_RECORDER.Core.Plugins.IRetentionShieldProvider { }
}

namespace ITB_SCREEN_RECORDER.Core.Contracts.Media
{
    // Canonical namespace for media contracts
    public interface IMediaStreamEncoder : ITB_SCREEN_RECORDER.Core.Media.Contracts.IMediaStreamEncoder { }
    public interface IMediaProbeService : ITB_SCREEN_RECORDER.Core.Media.Contracts.IMediaProbeService { }
    public interface IAudioDecoderService : ITB_SCREEN_RECORDER.Core.Media.Contracts.IAudioDecoderService { }
}

namespace ITB_SCREEN_RECORDER.Core.Data.Sqlite
{
    // Canonical namespace for Sqlite connection factories
    public abstract class BaseSqliteConnectionFactory : ITB_SCREEN_RECORDER.Core.Abstractions.BaseSqliteConnectionFactory
    {
        protected BaseSqliteConnectionFactory(Microsoft.Extensions.Configuration.IConfiguration configuration, string dbFileName)
            : base(configuration, dbFileName) { }

        protected BaseSqliteConnectionFactory(string dbFileName, string? customDirectory = null, int busyTimeoutSeconds = 5)
            : base(dbFileName, customDirectory, busyTimeoutSeconds) { }
    }
}

namespace ITB_SCREEN_RECORDER.Core.Infrastructure.Logging
{
    // Canonical namespace for structured infrastructure logging
    public static class Logger
    {
        public static void Debug(string message) => ITB_SCREEN_RECORDER.Core.Common.Logger.Debug(message);
        public static void Info(string message) => ITB_SCREEN_RECORDER.Core.Common.Logger.Info(message);
        public static void Warn(string message) => ITB_SCREEN_RECORDER.Core.Common.Logger.Warn(message);
        public static void Error(string message) => ITB_SCREEN_RECORDER.Core.Common.Logger.Error(message);
        public static void AlwaysInfo(string message) => ITB_SCREEN_RECORDER.Core.Common.Logger.AlwaysInfo(message);
    }
}

namespace ITB_SCREEN_RECORDER.Core.Infrastructure.System
{
    // Canonical namespace for system infrastructure primitives
    public static class BufferLimits
    {
        public const long MaxBufferFileSizeMb = ITB_SCREEN_RECORDER.Core.Common.BufferLimits.MaxBufferFileSizeMb;
        public const long MaxFileSizeBytes = ITB_SCREEN_RECORDER.Core.Common.BufferLimits.MaxFileSizeBytes;
        public const long MaxRequestSizeBytes = ITB_SCREEN_RECORDER.Core.Common.BufferLimits.MaxRequestSizeBytes;
    }
}
