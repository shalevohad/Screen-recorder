using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    /// <summary>
    /// Thin wrapper around MediaMTX's runtime Control API. Used to push recording
    /// configuration (record path/format/segment duration/retention) and to force
    /// wall-clock-aligned segment cuts, without ever touching mediamtx.yml on disk.
    /// </summary>
    public class MediaMtxApiClient
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<MediaMtxApiClient> _logger;

        public MediaMtxApiClient(IHttpClientFactory httpClientFactory, ILogger<MediaMtxApiClient> logger)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        private HttpClient CreateClient(int apiPort)
        {
            var client = _httpClientFactory.CreateClient(nameof(MediaMtxApiClient));
            client.BaseAddress = new Uri($"http://127.0.0.1:{apiPort}");
            client.Timeout = TimeSpan.FromSeconds(5);
            return client;
        }

        public async Task<bool> WaitUntilReadyAsync(int apiPort, TimeSpan timeout, CancellationToken cancellationToken)
        {
            using var client = CreateClient(apiPort);
            DateTime deadline = DateTime.UtcNow + timeout;

            while (DateTime.UtcNow < deadline && !cancellationToken.IsCancellationRequested)
            {
                try
                {
                    using var response = await client.GetAsync("/v3/config/global/get", cancellationToken).ConfigureAwait(false);
                    if (response.IsSuccessStatusCode)
                    {
                        return true;
                    }
                }
                catch
                {
                    // MediaMTX API not up yet; keep polling until the deadline.
                }

                await Task.Delay(500, cancellationToken).ConfigureAwait(false);
            }

            return false;
        }

        public async Task<bool> PatchPathDefaultsAsync(int apiPort, string recordPath, string recordFormat, string recordSegmentDuration, string recordDeleteAfter, CancellationToken cancellationToken)
        {
            var payload = new Dictionary<string, object>
            {
                ["record"] = true,
                ["recordPath"] = recordPath,
                ["recordFormat"] = recordFormat,
                ["recordSegmentDuration"] = recordSegmentDuration,
                ["recordDeleteAfter"] = recordDeleteAfter,
            };

            return await PatchAsync(apiPort, "/v3/config/pathdefaults/patch", payload, cancellationToken).ConfigureAwait(false);
        }

        public async Task<IReadOnlyList<string>> GetActivePathNamesAsync(int apiPort, CancellationToken cancellationToken)
        {
            using var client = CreateClient(apiPort);
            try
            {
                using var response = await client.GetAsync("/v3/paths/list", cancellationToken).ConfigureAwait(false);
                if (!response.IsSuccessStatusCode)
                {
                    return Array.Empty<string>();
                }

                var body = await response.Content.ReadFromJsonAsync<MediaMtxPathsListResponse>(cancellationToken: cancellationToken).ConfigureAwait(false);
                return body?.Items?.Where(i => i.Ready).Select(i => i.Name).Where(n => !string.IsNullOrEmpty(n)).ToList()
                       ?? (IReadOnlyList<string>)Array.Empty<string>();
            }
            catch (Exception ex)
            {
                _logger.LogWarning("[MediaMTX API] Failed to list active paths: {Message}", ex.Message);
                return Array.Empty<string>();
            }
        }

        public async Task<bool> RotatePathRecordingAsync(int apiPort, string pathName, CancellationToken cancellationToken)
        {
            string encodedName = Uri.EscapeDataString(pathName);

            // A path that only ever matched "all_others" / pathDefaults has no explicit
            // entry yet, and MediaMTX's PATCH endpoint only edits entries that already
            // exist. Make sure one exists before trying to toggle it.
            await EnsurePathEntryExistsAsync(apiPort, encodedName, cancellationToken).ConfigureAwait(false);

            string route = $"/v3/config/paths/patch/{encodedName}";

            // Toggling record off then on forces MediaMTX to close the in-progress
            // segment and immediately open a new one, i.e. an exact-boundary cut.
            bool offOk = await PatchAsync(apiPort, route, new Dictionary<string, object> { ["record"] = false }, cancellationToken).ConfigureAwait(false);
            bool onOk = await PatchAsync(apiPort, route, new Dictionary<string, object> { ["record"] = true }, cancellationToken).ConfigureAwait(false);
            return offOk && onOk;
        }

        private async Task EnsurePathEntryExistsAsync(int apiPort, string encodedName, CancellationToken cancellationToken)
        {
            using var client = CreateClient(apiPort);
            try
            {
                using var getResponse = await client.GetAsync($"/v3/config/paths/get/{encodedName}", cancellationToken).ConfigureAwait(false);
                if (getResponse.IsSuccessStatusCode)
                {
                    return;
                }

                var addRequest = new HttpRequestMessage(HttpMethod.Post, $"/v3/config/paths/add/{encodedName}")
                {
                    Content = JsonContent.Create(new Dictionary<string, object> { ["record"] = true })
                };

                using var addResponse = await client.SendAsync(addRequest, cancellationToken).ConfigureAwait(false);
                if (!addResponse.IsSuccessStatusCode)
                {
                    string body = await addResponse.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
                    // "path already exists" just means we lost a race with another caller/tick - harmless.
                    if (!body.Contains("already exists", StringComparison.OrdinalIgnoreCase))
                    {
                        _logger.LogWarning("[MediaMTX API] POST /v3/config/paths/add/{Path} failed with {StatusCode}: {Body}", encodedName, addResponse.StatusCode, body);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("[MediaMTX API] Failed to ensure explicit path entry for '{Path}': {Message}", encodedName, ex.Message);
            }
        }

        private async Task<bool> PatchAsync(int apiPort, string route, Dictionary<string, object> payload, CancellationToken cancellationToken)
        {
            using var client = CreateClient(apiPort);
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Patch, route)
                {
                    Content = JsonContent.Create(payload)
                };

                using var response = await client.SendAsync(request, cancellationToken).ConfigureAwait(false);
                if (!response.IsSuccessStatusCode)
                {
                    string body = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
                    _logger.LogWarning("[MediaMTX API] PATCH {Route} failed with {StatusCode}: {Body}", route, response.StatusCode, body);
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogWarning("[MediaMTX API] PATCH {Route} threw: {Message}", route, ex.Message);
                return false;
            }
        }

        private class MediaMtxPathsListResponse
        {
            [JsonPropertyName("items")]
            public List<MediaMtxPathItem>? Items { get; set; }
        }

        private class MediaMtxPathItem
        {
            [JsonPropertyName("name")]
            public string Name { get; set; } = string.Empty;

            [JsonPropertyName("ready")]
            public bool Ready { get; set; }
        }
    }
}
