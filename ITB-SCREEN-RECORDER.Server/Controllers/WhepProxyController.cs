// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Controllers/WhepProxyController.cs
// ==========================================
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    /// <summary>
    /// פרוקסי WHEP פנימי המאפשר לנגן ה-WebRTC בדפדפן לפעול בתוך אותו Origin של ה-HTTPS
    /// ללא שגיאות Mixed Content וללא צורך באישור תעודות כפול בפורטים שונים בדפדפן.
    /// </summary>
    [ApiController]
    [Route("api/v1/whep")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class WhepProxyController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly ILogger<WhepProxyController> _logger;

        public WhepProxyController(
            IHttpClientFactory httpClientFactory,
            IOptionsMonitor<SystemConfig> configMonitor,
            ILogger<WhepProxyController> logger)
        {
            _httpClientFactory = httpClientFactory;
            _configMonitor = configMonitor;
            _logger = logger;
        }

        [HttpPost("{streamPath}/whep")]
        [Consumes("application/sdp")]
        [Produces("application/sdp")]
        public async Task<IActionResult> ProxyWhepOffer(string streamPath)
        {
            try
            {
                using var reader = new StreamReader(Request.Body, Encoding.UTF8);
                string offerSdp = await reader.ReadToEndAsync();

                if (string.IsNullOrWhiteSpace(offerSdp))
                {
                    return BadRequest("SDP Offer body is empty.");
                }

                int webrtcPort = 8889; // ברירת המחדל של MediaMTX עבור WebRTC
                string targetUrl = $"http://127.0.0.1:{webrtcPort}/{streamPath}/whep";

                var client = _httpClientFactory.CreateClient("WhepProxyClient");
                client.Timeout = TimeSpan.FromSeconds(5);

                using var requestMessage = new HttpRequestMessage(HttpMethod.Post, targetUrl)
                {
                    Content = new StringContent(offerSdp, Encoding.UTF8, "application/sdp")
                };

                var response = await client.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead);
                string answerSdp = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("[WHEP-PROXY] MediaMTX returned {Status} for path '{StreamPath}'", response.StatusCode, streamPath);
                    return StatusCode((int)response.StatusCode, answerSdp);
                }

                if (response.Headers.Location != null)
                {
                    Response.Headers.Location = response.Headers.Location.ToString();
                }

                return Content(answerSdp, "application/sdp", Encoding.UTF8);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[WHEP-PROXY] Failed to proxy WHEP offer for '{StreamPath}': {Message}", streamPath, ex.Message);
                return StatusCode(502, $"MediaMTX WHEP Gateway Error: {ex.Message}");
            }
        }
    }
}
