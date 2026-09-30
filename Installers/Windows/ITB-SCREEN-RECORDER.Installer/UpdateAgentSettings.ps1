param(
    [Parameter(Mandatory=$true)][string]$ConfigData
)

try {
    $log = 'C:\Windows\Temp\itb-agent.log'
    "=== [$(Get-Date)] Agent Configuration Started ===" | Out-File $log -Append

    $arr = $ConfigData.Split('|')
    $cleanDir = $arr[0].TrimEnd('\')
    $jsonPath = Join-Path $cleanDir 'appsettings.json'
    $serverIp = $arr[1]

    "Target File: $jsonPath | Server IP: $serverIp" | Out-File $log -Append

    if (-not (Test-Path $jsonPath)) {
        "Target appsettings.json not found at $jsonPath" | Out-File $log -Append
        exit 0
    }

    $hostOnly = if ($serverIp.Contains(':')) { $serverIp.Split(':')[0] } else { $serverIp }
    $content = Get-Content $jsonPath -Raw
    $q = [char]34

    $content = $content -replace ('(?i)' + $q + 'DashboardApiUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'DashboardApiUrl' + $q + ': ' + $q + 'http://' + $hostOnly + ':5090/api/v1/agent/telemetry' + $q)
    $content = $content -replace ('(?i)' + $q + 'RtmpServerBaseUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'RtmpServerBaseUrl' + $q + ': ' + $q + 'rtmp://' + $hostOnly + ':19350/live/' + $q)

    $content | Set-Content $jsonPath -Encoding UTF8
    "Successfully updated Agent settings at $jsonPath" | Out-File $log -Append
} catch {
    "ERR: $($_.Exception.Message)" | Out-File $log -Append
}
exit 0