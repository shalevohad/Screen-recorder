# ==========================================
# File: Installers/Windows/ITB-SCREEN-RECORDER.Server.Installer/UpdateSettings.ps1
# ==========================================
param(
    [string]$InstallDir,
    [int]$HttpPort = 5090,
    [int]$RtmpPort = 19350,
    [int]$ApiPort  = 9997,
    [int]$HlsPort  = 8888,
    [string]$DataDir = "C:\ProgramData\ITB-SCREEN-RECORDER\Server",
    [string]$ServerRole = "Primary",
    [int]$ServerPriority = 1,
    [int]$DiscoveryPort = 5098,
    [string]$DiscoveryMulticast = "239.255.10.90",
    [string]$VirtualIp = "",
    [bool]$EnableVirtualIp = $false,
    [string]$PartnerServerUrl = ""
)

$log = 'C:\Windows\Temp\itb-server-setup.log'

try {
    "=== [$(Get-Date)] Configuration Started ===" | Out-File $log -Append
    "InstallDir: '$InstallDir'" | Out-File $log -Append
    "Ports: HTTP=$HttpPort, RTMP=$RtmpPort, API=$ApiPort, HLS=$HlsPort" | Out-File $log -Append
    "DataDir: '$DataDir'" | Out-File $log -Append

    # נירמול ServerRole
    $cleanRole = $ServerRole.Trim().ToLower()
    if ($cleanRole -match '^(aggregate|aggrigate|agg|super)$') {
        $ServerRole = "Aggregate"
        if ($ServerPriority -eq 1 -or $ServerPriority -eq 0) { $ServerPriority = 0 }
    } elseif ($cleanRole -match '^(secondary|standby|sec|backup)$') {
        $ServerRole = "Secondary"
        if ($ServerPriority -eq 1 -or $ServerPriority -eq 0) { $ServerPriority = 2 }
    } else {
        $ServerRole = "Primary"
        if ($ServerPriority -eq 0) { $ServerPriority = 1 }
    }

    "Role: '$ServerRole', Priority: $ServerPriority" | Out-File $log -Append

    # ניקוי backslashes מיותרים בסוף נתיב
    $cleanInstallDir = $InstallDir.TrimEnd('\', '/')
    $cleanDataDir = $DataDir.TrimEnd('\', '/')
    $dataDirEscaped = $cleanDataDir.Replace('\', '\\')

    # 1. איתור ועדכון שני קובצי ה-JSON
    $jsonFiles = @(
        (Join-Path $cleanInstallDir 'appsettings.json'),
        (Join-Path $cleanInstallDir 'appsettings.Windows.json')
    ) | Where-Object { Test-Path $_ }

    $q = [char]34

    foreach ($file in $jsonFiles) {
        "Updating: $file" | Out-File $log -Append
        $content = Get-Content $file -Raw

        # עדכון פורט Kestrel (אכיפת HTTPS)
        $content = $content -replace ('(?i)' + $q + 'Url' + $q + '\s*:\s*' + $q + 'https?://0\.0\.0\.0:\d+' + $q), ($q + 'Url' + $q + ': ' + $q + 'https://0.0.0.0:' + $HttpPort + $q)
        $content = $content -replace ('(?i)' + $q + 'Endpoints' + $q + '\s*:\s*\{\s*' + $q + 'Http' + $q), ($q + 'Endpoints' + $q + ': { ' + $q + 'Https' + $q)

        # עדכון או הוספת SystemConfig.HttpPort
        if ($content -match ('(?i)' + $q + 'HttpPort' + $q + '\s*:\s*\d+')) {
            $content = $content -replace ('(?i)' + $q + 'HttpPort' + $q + '\s*:\s*\d+'), ($q + 'HttpPort' + $q + ': ' + $HttpPort)
        } else {
            $content = $content -replace ('(?i)(' + $q + 'SystemConfig' + $q + '\s*:\s*\{)'), ("`$1`r`n    " + $q + "HttpPort" + $q + ": " + $HttpPort + ",")
        }

        # עדכון פורטי MediaMTX ב-JSON
        $content = $content -replace ('(?i)' + $q + 'RtmpPort' + $q + '\s*:\s*\d+'), ($q + 'RtmpPort' + $q + ': ' + $RtmpPort)
        $content = $content -replace ('(?i)' + $q + 'ApiPort' + $q + '\s*:\s*\d+'), ($q + 'ApiPort' + $q + ': ' + $ApiPort)
        $content = $content -replace ('(?i)' + $q + 'HlsPort' + $q + '\s*:\s*\d+'), ($q + 'HlsPort' + $q + ': ' + $HlsPort)

        # עדכון ספריות Data & Storage
        $content = $content -replace ('(?i)' + $q + 'LocalFallbackPath' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'LocalFallbackPath' + $q + ': ' + $q + $dataDirEscaped + '\\Recordings' + $q)
        $content = $content -replace ('(?i)' + $q + 'BaseDirectory' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'BaseDirectory' + $q + ': ' + $q + $dataDirEscaped + '\\Data' + $q)
        $content = $content -replace ('(?i)' + $q + 'ExportPath' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'ExportPath' + $q + ': ' + $q + $dataDirEscaped + '\\Exports' + $q)
        $content = $content -replace ('(?i)' + $q + 'ChunkEventLogPath' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'ChunkEventLogPath' + $q + ': ' + $q + $dataDirEscaped + '\\Logs\\chunk-events.log' + $q)

        # עדכון תפקיד ועדיפות Discovery
        if ($content -match ('(?i)' + $q + 'Role' + $q + '\s*:\s*' + $q + '.*?' + $q)) {
            $content = $content -replace ('(?i)' + $q + 'Role' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'Role' + $q + ': ' + $q + $ServerRole + $q)
        } else {
            $content = $content -replace ('(?i)(' + $q + 'Discovery' + $q + '\s*:\s*\{)'), ("`$1`r`n      " + $q + "Role" + $q + ": " + $q + $ServerRole + $q + ",")
        }

        if ($content -match ('(?i)' + $q + 'Priority' + $q + '\s*:\s*\d+')) {
            $content = $content -replace ('(?i)' + $q + 'Priority' + $q + '\s*:\s*\d+'), ($q + 'Priority' + $q + ': ' + $ServerPriority)
        } else {
            $content = $content -replace ('(?i)(' + $q + 'Discovery' + $q + '\s*:\s*\{)'), ("`$1`r`n      " + $q + "Priority" + $q + ": " + $ServerPriority + ",")
        }

        # עדכון פורט ומולטיקאסט Discovery
        if ($content -match ('(?i)' + $q + 'Port' + $q + '\s*:\s*\d+')) {
            $content = $content -replace ('(?i)' + $q + 'Port' + $q + '\s*:\s*\d+'), ($q + 'Port' + $q + ': ' + $DiscoveryPort)
        } else {
            $content = $content -replace ('(?i)(' + $q + 'Discovery' + $q + '\s*:\s*\{)'), ("`$1`r`n      " + $q + "Port" + $q + ": " + $DiscoveryPort + ",")
        }

        if ($content -match ('(?i)' + $q + 'MulticastAddress' + $q + '\s*:\s*' + $q + '.*?' + $q)) {
            $content = $content -replace ('(?i)' + $q + 'MulticastAddress' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'MulticastAddress' + $q + ': ' + $q + $DiscoveryMulticast + $q)
        } else {
            $content = $content -replace ('(?i)(' + $q + 'Discovery' + $q + '\s*:\s*\{)'), ("`$1`r`n      " + $q + "MulticastAddress" + $q + ": " + $q + $DiscoveryMulticast + $q + ",")
        }

        # עדכון Virtual IP
        if (-not [string]::IsNullOrWhiteSpace($VirtualIp)) { $EnableVirtualIp = $true }
        $vEnStr = if ($EnableVirtualIp) { "true" } else { "false" }
        if ($content -match ('(?i)' + $q + 'EnableVirtualIp' + $q + '\s*:\s*(true|false)')) {
            $content = $content -replace ('(?i)' + $q + 'EnableVirtualIp' + $q + '\s*:\s*(true|false)'), ($q + 'EnableVirtualIp' + $q + ': ' + $vEnStr)
        } else {
            $content = $content -replace ('(?i)(' + $q + 'Discovery' + $q + '\s*:\s*\{)'), ("`$1`r`n      " + $q + "EnableVirtualIp" + $q + ": " + $vEnStr + ",")
        }

        if ($content -match ('(?i)' + $q + 'VirtualIp' + $q + '\s*:\s*' + $q + '.*?' + $q)) {
            $content = $content -replace ('(?i)' + $q + 'VirtualIp' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'VirtualIp' + $q + ': ' + $q + $VirtualIp + $q)
        } else {
            $content = $content -replace ('(?i)(' + $q + 'Discovery' + $q + '\s*:\s*\{)'), ("`$1`r`n      " + $q + "VirtualIp" + $q + ": " + $q + $VirtualIp + $q + ",")
        }

        if (-not [string]::IsNullOrWhiteSpace($PartnerServerUrl)) {
            if ($content -match ('(?i)' + $q + 'PartnerServerUrl' + $q + '\s*:\s*' + $q + '.*?' + $q)) {
                $content = $content -replace ('(?i)' + $q + 'PartnerServerUrl' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'PartnerServerUrl' + $q + ': ' + $q + $PartnerServerUrl + $q)
            } else {
                $content = $content -replace ('(?i)(' + $q + 'Discovery' + $q + '\s*:\s*\{)'), ("`$1`r`n      " + $q + "PartnerServerUrl" + $q + ": " + $q + $PartnerServerUrl + $q + ",")
            }
        }

        $content | Set-Content $file -Encoding UTF8
        "Saved updated JSON to $file" | Out-File $log -Append
    }

    # 2. עדכון קובץ mediamtx.yml
    $yamlFiles = @(
        (Join-Path $cleanInstallDir 'MediaMTX\mediamtx.yml'),
        (Join-Path $cleanInstallDir 'mediamtx.yml')
    ) | Where-Object { Test-Path $_ }

    foreach ($yFile in $yamlFiles) {
        "Updating YAML: $yFile" | Out-File $log -Append
        $y = Get-Content $yFile -Raw
        $y = $y -replace '(?m)^\s*#?\s*api:\s*.*$', 'api: yes'
        $y = $y -replace '(?m)^\s*#?\s*apiAddress:\s*.*$', "apiAddress: :$ApiPort"
        $y = $y -replace '(?m)^\s*#?\s*rtmpAddress:\s*.*$', "rtmpAddress: :$RtmpPort"
        $y = $y -replace '(?m)^\s*#?\s*hlsAddress:\s*.*$', "hlsAddress: :$HlsPort"
        $y | Set-Content $yFile -Encoding UTF8
        "Saved updated YAML to $yFile" | Out-File $log -Append
    }

    # 3. הבטחת ספריית תעודות מאובטחת
    $certsDir = 'C:\ProgramData\ITB-SCREEN-RECORDER\Certificates'
    if (-not (Test-Path $certsDir)) {
        New-Item -ItemType Directory -Path $certsDir -Force | Out-Null
    }

    "=== Configuration Finished Successfully ===" | Out-File $log -Append
} catch {
    "CRITICAL ERROR: $($_.Exception.ToString())" | Out-File $log -Append
}

exit 0