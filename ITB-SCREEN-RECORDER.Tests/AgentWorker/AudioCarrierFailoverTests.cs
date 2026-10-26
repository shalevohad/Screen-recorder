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
        private readonly AppConfig _config = new()
        {
            AudioCarrierHysteresisSeconds = 60
        };

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
            Assert.Equal("mon-0", manager.CurrentTopology?.AudioCarrierDisplayId);
            Assert.True(manager.CurrentTopology?.Displays.First(d => d.DisplayId == "mon-0").HasAudio);
            Assert.False(manager.CurrentTopology?.Displays.First(d => d.DisplayId == "mon-1").HasAudio);

            // Step 2: Simulate mon-0 (disp0) disconnect!
            // Windows now makes disp1 the sole display and promotes it to primary
            var disp1Promoted = CreateDisplay(0, 1, "mon-1", @"\\.\DISPLAY2", true);
            discoveredList = new List<DxgiDisplayDescriptor> { disp1Promoted };

            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Step 3: Assert Immediate Failover Handover (<800ms)
            Assert.Single(manager.ActivePipelines);
            var surviving = manager.ActivePipelines.First();
            Assert.Equal(disp1Promoted.PhysicalKey, surviving.PhysicalKey);
            Assert.True(surviving.HasAudio, "Surviving display must be immediately promoted to carry audio");
            Assert.Equal(surviving.DisplayId, manager.AudioCarrierPipeline?.DisplayId);
            Assert.Equal(surviving.DisplayId, manager.CurrentTopology?.AudioCarrierDisplayId);
            Assert.True(manager.CurrentTopology?.Displays.First(d => d.DisplayId == surviving.DisplayId).HasAudio);
            Assert.NotNull(changedNew);
        }

        [Fact]
        public async Task AudioCarrierRestoration_WhenMon0Reconnects_HoldsOffAudioOnSurvivingDisplayDuringStabilizationBuffer()
        {
            var simNow = new DateTime(2026, 10, 26, 12, 0, 0, DateTimeKind.Utc);
            var manager = new MultiDisplayPipelineManager(_config)
            {
                UtcNow = () => simNow,
                AudioCarrierHysteresis = TimeSpan.FromSeconds(60)
            };

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

            // Start in failover state: disp0 disconnected, disp1 is carrying audio
            var disp1Sole = CreateDisplay(0, 1, "mon-1", @"\\.\DISPLAY2", true);
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp1Sole };

            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);
            Assert.Single(manager.ActivePipelines);
            Assert.True(manager.ActivePipelines.First().HasAudio);
            Assert.Equal("mon-1", manager.AudioCarrierPipeline?.DisplayId);

            // Simulate disp0 reconnecting at T = 0
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp0, disp1 };
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Assert: Both displays are active, BUT mon-0 is video-only, and audio remains on mon-1 (anti-flipflop)
            Assert.Equal(2, manager.ActivePipelines.Count);
            var mon0 = manager.ActivePipelines.First(p => p.Descriptor.PhysicalKey == disp0.PhysicalKey);
            var mon1 = manager.ActivePipelines.First(p => p.Descriptor.PhysicalKey == disp1.PhysicalKey);

            Assert.False(mon0.HasAudio, "Reconnected mon-0 must NOT immediately take audio before 60s buffer");
            Assert.True(mon1.HasAudio, "Surviving mon-1 must RETAIN audio during 60s stabilization buffer");
            Assert.Equal("mon-1", manager.AudioCarrierPipeline?.DisplayId);
            Assert.Equal("mon-1", manager.CurrentTopology?.AudioCarrierDisplayId);
            Assert.NotNull(manager.PreferredPrimaryReconnectedAtUtc);

            // Advance simulated time by 30 seconds (still within the 60s buffer)
            simNow = simNow.AddSeconds(30);
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Audio must STILL be on mon-1
            Assert.False(mon0.HasAudio);
            Assert.True(mon1.HasAudio);
            Assert.Equal("mon-1", manager.AudioCarrierPipeline?.DisplayId);
            Assert.Equal("mon-1", manager.CurrentTopology?.AudioCarrierDisplayId);
        }

        [Fact]
        public async Task AudioCarrierRestoration_WhenMon0DisconnectsDuringBuffer_AbortsStabilizationWithoutFlipFlop()
        {
            var simNow = new DateTime(2026, 10, 26, 12, 0, 0, DateTimeKind.Utc);
            var manager = new MultiDisplayPipelineManager(_config)
            {
                UtcNow = () => simNow,
                AudioCarrierHysteresis = TimeSpan.FromSeconds(60)
            };

            var disp0 = CreateDisplay(0, 0, "mon-0", @"\\.\DISPLAY1", true);
            var disp1 = CreateDisplay(0, 1, "mon-1", @"\\.\DISPLAY2", false);

            int mon1CreationCount = 0;
            manager.PipelineFactory = (desc, audioChannels) =>
            {
                if (desc.PhysicalKey == disp1.PhysicalKey) mon1CreationCount++;
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

            // Start in failover state with disp1 as audio carrier
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp1 };
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);
            Assert.Equal(1, mon1CreationCount);
            Assert.True(manager.ActivePipelines.First().HasAudio);

            // disp0 reconnects at T=0
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp0, disp1 };
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);
            Assert.NotNull(manager.PreferredPrimaryReconnectedAtUtc);
            Assert.Equal(1, mon1CreationCount); // mon1 was NOT recreated!

            // Advance time to T=20s, and disp0 FLAPS (disconnects again)
            simNow = simNow.AddSeconds(20);
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp1 };
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Assert: Stabilization buffer was aborted, mon1 was NEVER recreated or interrupted
            Assert.Null(manager.PreferredPrimaryReconnectedAtUtc);
            Assert.Single(manager.ActivePipelines);
            Assert.True(manager.ActivePipelines.First().HasAudio);
            Assert.Equal(1, mon1CreationCount); // Still exactly 1 creation - zero flip-flop!
            Assert.Equal("mon-1", manager.AudioCarrierPipeline?.DisplayId);
        }

        [Fact]
        public async Task AudioCarrierRestoration_After60SecondsContinuousPresence_GracefullyRestoresMon0()
        {
            var simNow = new DateTime(2026, 10, 26, 12, 0, 0, DateTimeKind.Utc);
            var manager = new MultiDisplayPipelineManager(_config)
            {
                UtcNow = () => simNow,
                AudioCarrierHysteresis = TimeSpan.FromSeconds(60)
            };

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

            // Start in failover state with disp1
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp1 };
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Reconnect disp0 at T=0
            manager.DisplayDiscoverer = () => new List<DxgiDisplayDescriptor> { disp0, disp1 };
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            string? carrierTransitioned = null;
            manager.AudioCarrierChanged += (_, newId) => carrierTransitioned = newId;

            // Advance time past the 60-second stabilization buffer (T = 61s)
            simNow = simNow.AddSeconds(61);
            await manager.SynchronizePipelinesAsync("rtmp://localhost/live", TimeSpan.Zero, 30, "4000k", null, null, _ => { }, () => { }, CancellationToken.None);

            // Assert: Audio carrier gracefully reclaimed by mon-0
            Assert.Equal(2, manager.ActivePipelines.Count);
            var restoredMon0 = manager.ActivePipelines.First(p => p.Descriptor.PhysicalKey == disp0.PhysicalKey);
            var demotedMon1 = manager.ActivePipelines.First(p => p.Descriptor.PhysicalKey == disp1.PhysicalKey);

            Assert.True(restoredMon0.HasAudio, "Primary mon-0 must reclaim audio carrier after 60s stabilization");
            Assert.False(demotedMon1.HasAudio, "Secondary mon-1 must be demoted back to video-only");
            Assert.Equal("mon-0", manager.AudioCarrierPipeline?.DisplayId);
            Assert.Equal("mon-0", manager.CurrentTopology?.AudioCarrierDisplayId);
            Assert.True(manager.CurrentTopology?.Displays.First(d => d.DisplayId == "mon-0").HasAudio);
            Assert.False(manager.CurrentTopology?.Displays.First(d => d.DisplayId == "mon-1").HasAudio);
            Assert.Equal("mon-0", carrierTransitioned);
            Assert.Null(manager.PreferredPrimaryReconnectedAtUtc);
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
