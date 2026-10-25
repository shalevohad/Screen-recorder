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
    /// Internal WHEP (WebRTC HTTP Egress Protocol) reverse proxy enabling browser WebRTC players
    /// to operate within the identical HTTPS origin, eliminating Mixed Content restrictions and multi-port certificate trust prompts.
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

        [HttpPost("{*streamPath}")]
        [HttpPatch("{*streamPath}")]
        [HttpDelete("{*streamPath}")]
        [HttpOptions("{*streamPath}")]
        public async Task<IActionResult> ProxyWhepRequest(string? streamPath)
        {
            try
            {
                int webrtcPort = 8889; // MediaMTX WebRTC default
                string rawPath = streamPath?.TrimStart('/') ?? "";

                // Normalize path for MediaMTX WHEP endpoint:
                // If it does not end with /whep and is not a sub-session path (e.g. patch/delete on session), append /whep
                string targetSubPath = rawPath;
                if (!targetSubPath.EndsWith("/whep", StringComparison.OrdinalIgnoreCase) &&
                    !targetSubPath.Contains("/whep/", StringComparison.OrdinalIgnoreCase))
                {
                    targetSubPath += "/whep";
                }

                string targetUrl = $"http://127.0.0.1:{webrtcPort}/{targetSubPath}";

                var client = _httpClientFactory.CreateClient("WhepProxyClient");
                client.Timeout = TimeSpan.FromSeconds(5);

                var method = new HttpMethod(Request.Method);
                using var requestMessage = new HttpRequestMessage(method, targetUrl);

                if (Request.ContentLength > 0 || (Request.ContentType != null && Request.Method != "GET" && Request.Method != "OPTIONS"))
                {
                    using var reader = new StreamReader(Request.Body, Encoding.UTF8);
                    string bodyContent = await reader.ReadToEndAsync();
                    if (!string.IsNullOrWhiteSpace(bodyContent))
                    {
                        var content = new StringContent(bodyContent, Encoding.UTF8);
                        var rawContentType = Request.ContentType?.Split(';')[0].Trim();
                        content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(
                            string.IsNullOrEmpty(rawContentType) ? "application/sdp" : rawContentType);
                        requestMessage.Content = content;
                    }
                }

                var response = await client.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead);
                string responseContent = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("[WHEP-PROXY] MediaMTX returned {Status} for path '{StreamPath}' -> Target: {TargetUrl}", response.StatusCode, streamPath, targetUrl);
                    return StatusCode((int)response.StatusCode, responseContent);
                }

                if (response.Headers.Location != null)
                {
                    var loc = response.Headers.Location.ToString();
                    if (loc.StartsWith("/"))
                    {
                        Response.Headers.Location = $"/api/v1/whep{loc}";
                    }
                    else
                    {
                        Response.Headers.Location = loc;
                    }
                }

                string contentType = response.Content.Headers.ContentType?.ToString() ?? "application/sdp";
                Response.StatusCode = (int)response.StatusCode;
                return Content(responseContent, contentType, Encoding.UTF8);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[WHEP-PROXY] Failed to proxy WHEP for '{StreamPath}': {Message}", streamPath, ex.Message);
                return StatusCode(502, $"MediaMTX WHEP Gateway Error: {ex.Message}");
            }
        }
    }
}
