// ==========================================
// File: Tests/ExtractorAdvanced/StudioStreamConcurrencyTests.cs
// Tactical Multi-Screen Replay Studio Concurrency & Throttle Tests
// ==========================================
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.ExtractorAdvanced;

public class StudioStreamConcurrencyTests
{
    [Fact]
    public void AutoDirector_MaxConcurrentScreens_IsCappedAtSixByDefault()
    {
        var settings = new AutoDirectorSettings();
        Assert.Equal(6, settings.MaxConcurrentScreens);
        Assert.InRange(settings.MaxConcurrentScreens, 1, 6);
    }

    [Fact]
    public void AutoDirector_BufferPreloadSeconds_HasRobustDefaults()
    {
        var settings = new AutoDirectorSettings();
        Assert.Equal(2.0, settings.BufferPreloadSeconds);
        Assert.True(settings.EnableAutoDirector);
    }

    [Fact]
    public async Task SixConcurrentStreamRequests_AcquireThrottleWithout503Errors()
    {
        // Simulate 6 concurrent station video streams hitting ExtractorAdvancedController
        var mockScanner = new Mock<IStorageScannerService>();
        var mockFfmpegRunner = new Mock<IFfmpegConcatRunner>();
        var mockDummy = new Mock<IDummyVideoGenerator>();
        var mockPattern = new Mock<INoSignalPatternService>();
        var mockMetadata = new Mock<IVideoMetadataService>();
        var mockPlan = new Mock<ISynchronizationPlanBuilder>();
        var mockCutter = new Mock<ISynchronizedTrackCutter>();
        var mockProbe = new Mock<IMediaProbeService>();
        var mockJobManager = new Mock<IAdvanceJobManager>();
        var mockKeystrokeRepo = new Mock<IKeystrokeRepository>();
        var mockFfmpegResolver = new Mock<IFfmpegBinaryResolver>();

        mockFfmpegResolver.Setup(r => r.ResolveFfmpeg()).Returns("ffmpeg.exe");
        mockFfmpegResolver.Setup(r => r.GetOptimalVideoEncoderArgs(It.IsAny<bool>())).Returns("-c:v libx264 -preset ultrafast");
        mockFfmpegResolver.Setup(r => r.GetCapabilities()).Returns(new FfmpegHardwareCapabilities());

        var advService = new AdvancedExtractorService(
            mockScanner.Object,
            mockFfmpegRunner.Object,
            Options.Create(new ExtractorOptions()),
            mockDummy.Object,
            mockPattern.Object,
            mockMetadata.Object,
            mockPlan.Object,
            mockCutter.Object,
            mockProbe.Object,
            NullLogger<AdvancedExtractorService>.Instance,
            binaryResolver: mockFfmpegResolver.Object
        );

        // When chunks are empty, controller returns 204 No Content and immediately releases throttle
        mockScanner.Setup(s => s.GetChunksForStationAsync(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<DateTime>()))
            .ReturnsAsync(new List<RecordingChunkMetadata>());

        var tasks = new List<Task<int>>();
        var hostnames = new[] { "PCQ401", "PCQ402", "PCQ403", "PCQ404", "PCQ405", "PCQ410" };

        for (int i = 0; i < hostnames.Length; i++)
        {
            var host = hostnames[i];
            tasks.Add(Task.Run(async () =>
            {
                var httpContext = new DefaultHttpContext();
                var c = new ExtractorAdvancedController(
                    advService,
                    mockScanner.Object,
                    mockJobManager.Object,
                    mockKeystrokeRepo.Object,
                    NullLogger<ExtractorAdvancedController>.Instance
                )
                {
                    ControllerContext = new ControllerContext { HttpContext = httpContext }
                };

                long startEpoch = 1762600000000;
                long endEpoch = 1762603600000;

                await c.StreamContinuousStationVideo(host, startEpoch, endEpoch, startEpoch, 1.0, "mon-0", null, CancellationToken.None);
                return httpContext.Response.StatusCode;
            }));
        }

        var results = await Task.WhenAll(tasks);

        // All 6 requests must succeed without throttle timeout (none should be 503 Service Unavailable)
        Assert.All(results, code => Assert.NotEqual(503, code));
        Assert.All(results, code => Assert.Equal(204, code));
    }
}
