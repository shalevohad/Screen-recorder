namespace ITB_SCREEN_RECORDER.Core.Contracts.Storage;

public readonly record struct ChunkFinalizedEvent(
    string StationId,
    string FilePath,
    long StartEpochMs,
    long EndEpochMs,
    long FileSizeBytes,
    bool IsFinalized
);