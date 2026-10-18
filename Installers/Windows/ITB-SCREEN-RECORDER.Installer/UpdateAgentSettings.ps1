param(
    [Parameter(Mandatory=$true)][string]$ConfigData
)

try {
    $log = 'C:\Windows\Temp\itb-agent.log'
    "=== [$(Get-Date)] Agent Configuration Started ===" | Out-File $log -Append

    $arr = $ConfigData.Split('|')
    $cleanDir = $arr[0].TrimEnd('\')
    $serverIp = if ($arr.Length -gt 1 -and -not [string]::IsNullOrWhiteSpace($arr[1])) { $arr[1].Trim() } else { "AUTO" }
    $discPort = if ($arr.Length -gt 2 -and -not [string]::IsNullOrWhiteSpace($arr[2])) { $arr[2].Trim() } else { "5098" }
    $discMcast = if ($arr.Length -gt 3 -and -not [string]::IsNullOrWhiteSpace($arr[3])) { $arr[3].Trim() } else { "239.255.10.90" }
    $discBcast = if ($arr.Length -gt 4 -and -not [string]::IsNullOrWhiteSpace($arr[4])) { $arr[4].Trim() } else { "255.255.255.255" }

    "Config: ServerIp='$serverIp', DiscoveryPort=$discPort, Multicast='$discMcast', Broadcast='$discBcast'" | Out-File $log -Append

    $targetFiles = @(
        (Join-Path $cleanDir 'appsettings.json'),
        (Join-Path $cleanDir 'appsettings.Windows.json')
    ) | Where-Object { Test-Path $_ }

    if ($targetFiles.Count -eq 0) {
        "Target config files not found in $cleanDir" | Out-File $log -Append
        exit 0
    }

    $isAuto = ($serverIp -eq "AUTO") -or [string]::IsNullOrWhiteSpace($serverIp)
    $hostOnly = if ($serverIp.Contains(':')) { $serverIp.Split(':')[0] } else { $serverIp }
    $q = [char]34

    foreach ($file in $targetFiles) {
        $content = Get-Content $file -Raw
        if ($isAuto) {
            $content = $content -replace ('(?i)' + $q + 'DashboardApiUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'DashboardApiUrl' + $q + ': ' + $q + 'AUTO' + $q)
            $content = $content -replace ('(?i)' + $q + 'RtmpServerBaseUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'RtmpServerBaseUrl' + $q + ': ' + $q + 'AUTO' + $q)
        } else {
            $content = $content -replace ('(?i)' + $q + 'DashboardApiUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'DashboardApiUrl' + $q + ': ' + $q + 'https://' + $hostOnly + ':5090/api/v1/agent/telemetry' + $q)
            $content = $content -replace ('(?i)' + $q + 'RtmpServerBaseUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'RtmpServerBaseUrl' + $q + ': ' + $q + 'rtmps://' + $hostOnly + ':19350/live/' + $q)
        }

        # Update DiscoveryPort
        if ($content -match ('(?i)' + $q + 'DiscoveryPort' + $q + '\s*:\s*\d+')) {
            $content = $content -replace ('(?i)' + $q + 'DiscoveryPort' + $q + '\s*:\s*\d+'), ($q + 'DiscoveryPort' + $q + ': ' + $discPort)
        } else {
            $content = $content -replace ('(?i)\{'), ("{`r`n  " + $q + "DiscoveryPort" + $q + ": " + $discPort + ",")
        }

        # Update DiscoveryMulticastAddress
        if ($content -match ('(?i)' + $q + 'DiscoveryMulticastAddress' + $q + '\s*:\s*' + $q + '.*?' + $q)) {
            $content = $content -replace ('(?i)' + $q + 'DiscoveryMulticastAddress' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'DiscoveryMulticastAddress' + $q + ': ' + $q + $discMcast + $q)
        } else {
            $content = $content -replace ('(?i)\{'), ("{`r`n  " + $q + "DiscoveryMulticastAddress" + $q + ": " + $q + $discMcast + $q + ",")
        }

        # Update DiscoveryBroadcastAddress
        if ($content -match ('(?i)' + $q + 'DiscoveryBroadcastAddress' + $q + '\s*:\s*' + $q + '.*?' + $q)) {
            $content = $content -replace ('(?i)' + $q + 'DiscoveryBroadcastAddress' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'DiscoveryBroadcastAddress' + $q + ': ' + $q + $discBcast + $q)
        } else {
            $content = $content -replace ('(?i)\{'), ("{`r`n  " + $q + "DiscoveryBroadcastAddress" + $q + ": " + $q + $discBcast + $q + ",")
        }

        $content | Set-Content $file -Encoding UTF8
        "Successfully updated Agent settings at $file (Mode: $(if ($isAuto) {'AUTO (Autonomous Discovery)'} else {$serverIp}))" | Out-File $log -Append
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