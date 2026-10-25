// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/CertificateRenewalWorker.cs
// ==========================================
using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Security.Pki;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    /// <summary>
    /// Autonomous background service verifying continuous renewal of server and Root CA certificates,
    /// ensuring unbroken service operation without manual intervention or certificate expiration over 10+ years.
    /// </summary>
    public class CertificateRenewalWorker : BackgroundService
    {
        private readonly ILogger<CertificateRenewalWorker> _logger;
        private static readonly TimeSpan CheckInterval = TimeSpan.FromHours(24);

        public CertificateRenewalWorker(ILogger<CertificateRenewalWorker> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("[PKI-WATCHDOG] Certificate renewal background worker active. Interval: 24h.");

            // Brief initial delay allowing core web host services to stabilize before running PKI check
            await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogDebug("[PKI-WATCHDOG] Performing scheduled certificate health check...");
                    var bundle = CertificateAuthorityManager.EnsureCertificates();
                    if (bundle != null)
                    {
                        var daysLeft = (bundle.ServerCertificate.NotAfter - DateTime.UtcNow).TotalDays;
                        _logger.LogInformation("[PKI-WATCHDOG] Active certificate health: Valid until {Expiry:u} ({Days:F0} days remaining).",
                            bundle.ServerCertificate.NotAfter, daysLeft);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[PKI-WATCHDOG] Error during scheduled certificate evaluation: {Message}", ex.Message);
                }

                await Task.Delay(CheckInterval, stoppingToken);
            }
        }
    }
}
