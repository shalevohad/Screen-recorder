// ==========================================
// File: ITB-SCREEN-RECORDER.Tests/Server/Services/ServerRestartServiceTests.cs
// ==========================================
using System;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Server.Controllers;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Services
{
    public class ServerRestartServiceTests
    {
        [Fact]
        public void ServerRestartService_ScheduleRestart_DoesNotThrow()
        {
            var mockLifetime = new Mock<IHostApplicationLifetime>();
            var mockLogger = new Mock<ILogger<ServerRestartService>>();

            var restartService = new ServerRestartService(mockLifetime.Object, mockLogger.Object);

            // Verify idempotency and non-blocking invocation
            restartService.ScheduleRestart(5000);
            restartService.ScheduleRestart(5000); // Second call ignored safely
        }

        [Fact]
        public async Task SettingsController_Save_WhenPortChanges_SchedulesRestartAndReturnsRequiresRestart()
        {
            // Arrange
            var initialConfig = new SystemConfig
            {
                HttpPort = 5090,
                Storage = new StorageSettings(),
                MediaMtx = new MediaMtxSettings()
            };

            var mockSyncService = new Mock<ISystemConfigDbSyncService>();
            mockSyncService.Setup(s => s.UpdateSystemConfigAsync(It.IsAny<Action<SystemConfig>>()))
                .Callback<Action<SystemConfig>>(action => action(initialConfig))
                .Returns(Task.CompletedTask);

            var mockConfigMonitor = new Mock<IOptionsMonitor<SystemConfig>>();
            mockConfigMonitor.Setup(m => m.CurrentValue).Returns(initialConfig);

            var mockCatalogRepo = new Mock<ICatalogRepository>();
            var mockLdap = new Mock<ILdapDirectoryService>();
            var mockStorageTelemetry = new Mock<IStorageTelemetryService>();
            var mockLogger = new Mock<ILogger<SettingsController>>();
            var mockRestartService = new Mock<IServerRestartService>();

            var controller = new SettingsController(
                mockSyncService.Object,
                mockConfigMonitor.Object,
                mockCatalogRepo.Object,
                mockLdap.Object,
                null!, // RecordingChunkScheduler
                null!, // ServerTelemetryHostService
                null!, // TelemetryBroadcastService
                mockStorageTelemetry.Object,
                mockLogger.Object,
                mockRestartService.Object
            );

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            var updatePayload = new SystemConfig
            {
                HttpPort = 8080,
                Storage = new StorageSettings(),
                MediaMtx = new MediaMtxSettings()
            };

            // Act
            var result = await controller.Save(updatePayload);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            dynamic data = okResult.Value;
            Assert.True((bool)data.requiresRestart);
            Assert.Equal(8080, (int)data.newPort);

            mockRestartService.Verify(r => r.ScheduleRestart(It.IsAny<int>()), Times.Once);
        }

        [Fact]
        public async Task SettingsController_Save_WhenPortUnchanged_DoesNotScheduleRestart()
        {
            // Arrange
            var initialConfig = new SystemConfig
            {
                HttpPort = 5090,
                Storage = new StorageSettings(),
                MediaMtx = new MediaMtxSettings()
            };

            var mockSyncService = new Mock<ISystemConfigDbSyncService>();
            mockSyncService.Setup(s => s.UpdateSystemConfigAsync(It.IsAny<Action<SystemConfig>>()))
                .Callback<Action<SystemConfig>>(action => action(initialConfig))
                .Returns(Task.CompletedTask);

            var mockConfigMonitor = new Mock<IOptionsMonitor<SystemConfig>>();
            mockConfigMonitor.Setup(m => m.CurrentValue).Returns(initialConfig);

            var mockCatalogRepo = new Mock<ICatalogRepository>();
            var mockLdap = new Mock<ILdapDirectoryService>();
            var mockStorageTelemetry = new Mock<IStorageTelemetryService>();
            var mockLogger = new Mock<ILogger<SettingsController>>();
            var mockRestartService = new Mock<IServerRestartService>();

            var controller = new SettingsController(
                mockSyncService.Object,
                mockConfigMonitor.Object,
                mockCatalogRepo.Object,
                mockLdap.Object,
                null!, // RecordingChunkScheduler
                null!, // ServerTelemetryHostService
                null!, // TelemetryBroadcastService
                mockStorageTelemetry.Object,
                mockLogger.Object,
                mockRestartService.Object
            );

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            var updatePayload = new SystemConfig
            {
                HttpPort = 5090,
                Storage = new StorageSettings(),
                MediaMtx = new MediaMtxSettings()
            };

            // Act
            var result = await controller.Save(updatePayload);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            dynamic data = okResult.Value;
            Assert.False((bool)data.requiresRestart);

            mockRestartService.Verify(r => r.ScheduleRestart(It.IsAny<int>()), Times.Never);
        }

        [Fact]
        public void SettingsController_RestartServer_SchedulesRestart()
        {
            var mockLogger = new Mock<ILogger<SettingsController>>();
            var mockRestartService = new Mock<IServerRestartService>();

            var controller = new SettingsController(
                null!, null!, null!, null!, null!, null!, null!, null!,
                mockLogger.Object,
                mockRestartService.Object
            );

            var result = controller.RestartServer();

            var okResult = Assert.IsType<OkObjectResult>(result);
            mockRestartService.Verify(r => r.ScheduleRestart(1000), Times.Once);
        }
    }
}
