using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.AgentWorker.Engine;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITBRecorderAgent.Providers.Video;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.AgentWorker
{
    public class AudioCarrierFailoverTests
    {
        private readonly AppConfig _config = new();

        private static DxgiDisplayDescriptor CreateDisplay(uint adapter, uint output, string displayId, string deviceName, bool isPrimary)
        {
            return new DxgiDisplayDescriptor(
                AdapterIndex: adapter,
                OutputIndex: output,
                DisplayId: displayId,
                DeviceName: deviceName,
                AdapterName: "Test GPU",
                AdapterLuid: "0x1000",
                X: isPrimary ? 0 : 1920,
                Y: 0,
                Width: 1920,
                Height: 1080,
                IsPrimary: isPrimary
            );
        }

        [Fact]
        public async Task AudioCarrierFailover_WhenMon0Disconnects_PromotesSurvivingDisplayToAudioCarrier()
        {
            var manager = new MultiDisplayPipelineManager(_config);

            var disp0 = CreateDisplay(0, 0, "mon-0", @"\\.\DISPLAY1", true);
            var disp1 = CreateDisplay(0, 1, "mon-1", @"\\.\DISPLAY2", false);

            var discoveredList = new List<DxgiDisplayDescriptor> { disp0, disp1 };
            manager.DisplayDiscoverer = () => discoveredList;

            // PipelineFactory creates test pipelines with explicit audio flag
            manager.PipelineFactory = (desc, audioChannels) =>
            {
                var instance = new DisplayPipelineInstance(
                    desc.DisplayId,
                    desc.IsPrimary,
                    desc,
                    null,
                    null,
                    null,
                    null,
                    hasAudio: audioChannels > 0
                );
                return Task.FromResult<DisplayPipelineInstance?>(instance);
            };

            string? changedOld = null;
            string? changedNew = null;
            manager.AudioCarrierChanged += (oldId, newId) =>
            {
                changedOld = oldId;
                changedNew = newId;
            };

            // Step 1: Initial synchronization with 2 displays
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            Assert.Equal(2, manager.ActivePipelines.Count);
            var mon0 = manager.ActivePipelines.First(p => p.DisplayId == "mon-0");
            var mon1 = manager.ActivePipelines.First(p => p.DisplayId == "mon-1");

            Assert.True(mon0.HasAudio, "Primary mon-0 must have audio");
            Assert.False(mon1.HasAudio, "Secondary mon-1 must NOT have audio");
            Assert.Equal("mon-0", manager.AudioCarrierPipeline?.DisplayId);

            // Step 2: Simulate mon-0 (disp0) disconnect!
            // Windows now makes disp1 the sole display and promotes it to primary
            var disp1Promoted = CreateDisplay(0, 1, "mon-0", @"\\.\DISPLAY2", true);
            discoveredList = new List<DxgiDisplayDescriptor> { disp1Promoted };

            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Step 3: Assert Failover Handover
            Assert.Single(manager.ActivePipelines);
            var surviving = manager.ActivePipelines.First();
            Assert.Equal(disp1Promoted.PhysicalKey, surviving.PhysicalKey);
            Assert.True(surviving.HasAudio, "Surviving display must be promoted to carry audio");
            Assert.Equal(surviving.DisplayId, manager.AudioCarrierPipeline?.DisplayId);
            Assert.NotNull(changedNew);
        }

        [Fact]
        public async Task AudioCarrierRestoration_WhenMon0Reconnects_RestoresMon0AndDemotesSecondary()
        {
            var manager = new MultiDisplayPipelineManager(_config);

            var disp0 = CreateDisplay(0, 0, "mon-0", @"\\.\DISPLAY1", true);
            var disp1 = CreateDisplay(0, 1, "mon-1", @"\\.\DISPLAY2", false);

            manager.PipelineFactory = (desc, audioChannels) =>
            {
                var instance = new DisplayPipelineInstance(
                    desc.DisplayId,
                    desc.IsPrimary,
                    desc,
                    null,
                    null,
                    null,
                    null,
                    hasAudio: audioChannels > 0
                );
                return Task.FromResult<DisplayPipelineInstance?>(instance);
            };

            // Start in failover state (disp0 disconnected, disp1 is the sole primary carrier)
            var disp1Sole = CreateDisplay(0, 1, "mon-1", @"\\.\DISPLAY2", true);
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp1Sole };

            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);
            Assert.Single(manager.ActivePipelines);
            Assert.True(manager.ActivePipelines.First().HasAudio);

            // Simulate disp0 reconnecting! (Now both disp0 and disp1 are attached)
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp0, disp1 };

            string? restoredCarrier = null;
            manager.AudioCarrierChanged += (_, newId) => restoredCarrier = newId;

            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Assert Restoration
            Assert.Equal(2, manager.ActivePipelines.Count);
            var restoredMon0 = manager.ActivePipelines.First(p => p.Descriptor.PhysicalKey == disp0.PhysicalKey);
            var demotedMon1 = manager.ActivePipelines.First(p => p.Descriptor.PhysicalKey == disp1.PhysicalKey);

            Assert.True(restoredMon0.HasAudio, "Reconnected mon-0 must regain audio carrier status");
            Assert.False(demotedMon1.HasAudio, "Secondary mon-1 must be demoted to video-only");
            Assert.Equal("mon-0", manager.AudioCarrierPipeline?.DisplayId);
            Assert.Equal("mon-0", restoredCarrier);

            // Verify exactly one audio carrier across all displays
            Assert.Single(manager.ActivePipelines.Where(p => p.HasAudio));
        }

        [Fact]
        public async Task AudioCarrier_WhenSecondaryDisplayDisconnects_AudioCarrierRemainsUntouched()
        {
            var manager = new MultiDisplayPipelineManager(_config);

            var disp0 = CreateDisplay(0, 0, "mon-0", @"\\.\DISPLAY1", true);
            var disp1 = CreateDisplay(0, 1, "mon-1", @"\\.\DISPLAY2", false);

            int factoryCallCount = 0;
            manager.PipelineFactory = (desc, audioChannels) =>
            {
                factoryCallCount++;
                var instance = new DisplayPipelineInstance(
                    desc.DisplayId,
                    desc.IsPrimary,
                    desc,
                    null,
                    null,
                    null,
                    null,
                    hasAudio: audioChannels > 0
                );
                return Task.FromResult<DisplayPipelineInstance?>(instance);
            };

            // Start with both displays
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp0, disp1 };
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);
            Assert.Equal(2, factoryCallCount);

            // Secondary display (disp1) disconnects
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp0 };
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Assert: Factory was NOT called again for disp0 (zero unnecessary restarts on primary)
            Assert.Equal(2, factoryCallCount);
            Assert.Single(manager.ActivePipelines);
            Assert.True(manager.ActivePipelines.First().HasAudio);
            Assert.Equal("mon-0", manager.AudioCarrierPipeline?.DisplayId);
        }
    }
}
