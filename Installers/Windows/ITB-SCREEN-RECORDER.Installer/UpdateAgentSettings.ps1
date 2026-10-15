param(
    [Parameter(Mandatory=$true)][string]$ConfigData
)

try {
    $log = 'C:\Windows\Temp\itb-agent.log'
    "=== [$(Get-Date)] Agent Configuration Started ===" | Out-File $log -Append

    $arr = $ConfigData.Split('|')
    $cleanDir = $arr[0].TrimEnd('\')
    $targetFiles = @(
        (Join-Path $cleanDir 'appsettings.json'),
        (Join-Path $cleanDir 'appsettings.Windows.json')
    ) | Where-Object { Test-Path $_ }

    if ($targetFiles.Count -eq 0) {
        "Target config files not found in $cleanDir" | Out-File $log -Append
        exit 0
    }

    $hostOnly = if ($serverIp.Contains(':')) { $serverIp.Split(':')[0] } else { $serverIp }
    $q = [char]34

    foreach ($file in $targetFiles) {
        $content = Get-Content $file -Raw
        $content = $content -replace ('(?i)' + $q + 'DashboardApiUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'DashboardApiUrl' + $q + ': ' + $q + 'https://' + $hostOnly + ':5090/api/v1/agent/telemetry' + $q)
        $content = $content -replace ('(?i)' + $q + 'RtmpServerBaseUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'RtmpServerBaseUrl' + $q + ': ' + $q + 'rtmps://' + $hostOnly + ':19350/live/' + $q)
        $content | Set-Content $file -Encoding UTF8
        "Successfully updated encrypted Agent settings at $file" | Out-File $log -Append
    }

    # Ensure Agent certificates store directory exists with full machine access
    $certsDir = 'C:\ProgramData\ITB-SCREEN-RECORDER\Certificates'
    if (-not (Test-Path $certsDir)) {
        New-Item -ItemType Directory -Path $certsDir -Force | Out-Null
    }
} catch {
    "ERR: $($_.Exception.Message)" | Out-File $log -Append
}
exit 0