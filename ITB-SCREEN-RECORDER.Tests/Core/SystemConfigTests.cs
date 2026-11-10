using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Core;

public class SystemConfigTests
{
    private static IList<ValidationResult> ValidateModel(object model)
    {
        var validationResults = new List<ValidationResult>();
        var ctx = new ValidationContext(model, null, null);
        Validator.TryValidateObject(model, ctx, validationResults, true);
        return validationResults;
    }

    [Fact]
    public void BitrateRegex_ValidPatterns_ShouldMatch()
    {
        var validBitrates = new[] { "500k", "2500K", "4000K", "5m", "8M", "12M" };
        foreach (var bitrate in validBitrates)
        {
            Assert.Matches(ConfigValidationRules.BitrateRegex, bitrate);
        }
    }

    [Fact]
    public void BitrateRegex_InvalidPatterns_ShouldNotMatch()
    {
        var invalidBitrates = new[] { "", "0", "0k", "abc", "5000X", "500kbps", "-1000K", "K", "M" };
        foreach (var bitrate in invalidBitrates)
        {
            Assert.DoesNotMatch(ConfigValidationRules.BitrateRegex, bitrate);
        }
    }

    [Fact]
    public void SystemConfig_DefaultValues_PassValidation()
    {
        var config = new SystemConfig
        {
            HttpPort = 5090,
            RecordingRetentionDays = 30,
            MaxStorageQuotaGb = 100,
            DashboardRefreshRateMs = 2000,
            DefaultVideoBitrate = "2500K",
            DefaultTargetFps = 25,
            MediaMtx = new MediaMtxSettings
            {
                ExecutablePath = "MediaMTX\\mediamtx.exe",
                RtmpPort = 19350,
                ApiPort = 9997,
                HlsPort = 8888
            },
            Storage = new StorageSettings
            {
                NetAppUncPath = @"\\nas\recordings",
                LocalFallbackPath = @"C:\Recordings",
                ChunkIntervalMinutes = 5,
                RetentionDays = 30,
                ChunkEventLogPath = @"C:\Recordings\log.json"
            },
            Security = new SecuritySettings
            {
                AllowedAdAdminGroup = "ITB_Admins",
                JwtSecretKey = "super_secret_jwt_key_that_is_long_enough",
                TokenExpirationHours = 8
            }
        };

        var errors = ValidateModel(config);
        Assert.Empty(errors);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(366)]
    [InlineData(-5)]
    public void SystemConfig_RecordingRetentionDays_OutOfRange_FailsValidation(int days)
    {
        var config = new SystemConfig
        {
            RecordingRetentionDays = days,
            MaxStorageQuotaGb = 100,
            DashboardRefreshRateMs = 2000,
            DefaultVideoBitrate = "2500K",
            DefaultTargetFps = 25,
            MediaMtx = new MediaMtxSettings(),
            Storage = new StorageSettings { NetAppUncPath = "u", LocalFallbackPath = "l", ChunkIntervalMinutes = 5, RetentionDays = 30, ChunkEventLogPath = "p" },
            Security = new SecuritySettings { AllowedAdAdminGroup = "g" }
        };

        var errors = ValidateModel(config);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SystemConfig.RecordingRetentionDays)));
    }

    [Theory]
    [InlineData(5)]
    [InlineData(100001)]
    public void SystemConfig_MaxStorageQuotaGb_OutOfRange_FailsValidation(int quota)
    {
        var config = new SystemConfig
        {
            RecordingRetentionDays = 30,
            MaxStorageQuotaGb = quota,
            DashboardRefreshRateMs = 2000,
            DefaultVideoBitrate = "2500K",
            DefaultTargetFps = 25,
            MediaMtx = new MediaMtxSettings(),
            Storage = new StorageSettings { NetAppUncPath = "u", LocalFallbackPath = "l", ChunkIntervalMinutes = 5, RetentionDays = 30, ChunkEventLogPath = "p" },
            Security = new SecuritySettings { AllowedAdAdminGroup = "g" }
        };

        var errors = ValidateModel(config);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(SystemConfig.MaxStorageQuotaGb)));
    }

    [Fact]
    public void AutoDirector_DefaultValues_AreValid()
    {
        var settings = new AutoDirectorSettings();
        Assert.Equal(10, settings.MinDwellSeconds);
        Assert.Equal(6, settings.MaxConcurrentScreens);
        Assert.Equal(2.0, settings.BufferPreloadSeconds);
        Assert.True(settings.EnableAutoDirector);

        var errors = ValidateModel(settings);
        Assert.Empty(errors);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(121)]
    public void AutoDirector_MinDwellSeconds_OutOfRange_FailsValidation(int seconds)
    {
        var settings = new AutoDirectorSettings { MinDwellSeconds = seconds };
        var errors = ValidateModel(settings);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(AutoDirectorSettings.MinDwellSeconds)));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(7)]
    [InlineData(-1)]
    public void AutoDirector_MaxConcurrentScreens_OutOfRange_FailsValidation(int screens)
    {
        var settings = new AutoDirectorSettings { MaxConcurrentScreens = screens };
        var errors = ValidateModel(settings);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(AutoDirectorSettings.MaxConcurrentScreens)));
    }

    [Theory]
    [InlineData(0.2)]
    [InlineData(5.5)]
    public void AutoDirector_BufferPreloadSeconds_OutOfRange_FailsValidation(double seconds)
    {
        var settings = new AutoDirectorSettings { BufferPreloadSeconds = seconds };
        var errors = ValidateModel(settings);
        Assert.Contains(errors, e => e.MemberNames.Contains(nameof(AutoDirectorSettings.BufferPreloadSeconds)));
    }

    [Fact]
    public void BufferLimits_CalculationsAreConsistent()
    {
        Assert.Equal(4096L, BufferLimits.MaxBufferFileSizeMb);
        Assert.Equal(50L, BufferLimits.RequestOverheadMb);
        Assert.Equal(4096L * 1024L * 1024L, BufferLimits.MaxFileSizeBytes);
        Assert.Equal(4146L * 1024L * 1024L, BufferLimits.MaxRequestSizeBytes);
    }

    [Fact]
    public void ConfigLoader_Load_DoesNotThrowAndReturnsNonNull()
    {
        var config = ConfigLoader.Load();
        Assert.NotNull(config);
    }
}
