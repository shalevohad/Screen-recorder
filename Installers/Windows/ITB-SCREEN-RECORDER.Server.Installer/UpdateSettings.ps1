# ==========================================
# File: Installers/Windows/ITB-SCREEN-RECORDER.Server.Installer/UpdateSettings.ps1
# ==========================================
param(
    [string]$InstallDir,
    [int]$HttpPort = 5090,
    [int]$RtmpPort = 19350,
    [int]$ApiPort  = 9997,
    [int]$HlsPort  = 8888,
    [string]$DataDir = "C:\ProgramData\ITB-SCREEN-RECORDER\Server"
)

$log = 'C:\Windows\Temp\itb-server-setup.log'

try {
    "=== [$(Get-Date)] Configuration Started ===" | Out-File $log -Append
    "InstallDir: '$InstallDir'" | Out-File $log -Append
    "Ports: HTTP=$HttpPort, RTMP=$RtmpPort, API=$ApiPort, HLS=$HlsPort" | Out-File $log -Append
    "DataDir: '$DataDir'" | Out-File $log -Append

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

        # עדכון פורט Kestrel
        $content = $content -replace ('(?i)' + $q + 'Url' + $q + '\s*:\s*' + $q + 'http://0\.0\.0\.0:\d+' + $q), ($q + 'Url' + $q + ': ' + $q + 'http://0.0.0.0:' + $HttpPort + $q)

        # עדכון או הוספת SystemConfig.HttpPort
        if ($content -match ('(?i)' + $q + 'HttpPort' + $q + '\s*:\s*\d+')) {
            $content = $content -replace ('(?i)' + $q + 'HttpPort' + $q + '\s*:\s*\d+'), ($q + 'HttpPort' + $q + ': ' + $HttpPort)
        } else {
            $content = $content -replace ('(?i)(' + $q + 'SystemConfig' + $q + '\s*:\s*\{)'), ("`$1`r`n    " + $q + "HttpPort" + $q + ": " + $HttpPort + ",")
        }

        # עדכון פורטי MediaMTX ב-JSON
        $content = $content -replace ('(?i)' +$q + 'RtmpPort' + $q + '\s*:\s*\d+'), ($q + 'RtmpPort' + $q + ': ' +$RtmpPort)
        $content =$content -replace ('(?i)' + $q + 'ApiPort' +$q + '\s*:\s*\d+'), ($q + 'ApiPort' +$q + ': ' + $ApiPort)$content = $content -replace ('(?i)' +$q + 'HlsPort' + $q + '\s*:\s*\d+'), ($q + 'HlsPort' + $q + ': ' +$HlsPort)

        # עדכון ספריות Data & Storage
        $content =$content -replace ('(?i)' + $q + 'LocalFallbackPath' +$q + '\s*:\s*' + $q + '.*?' +$q), ($q + 'LocalFallbackPath' +$q + ': ' + $q +$dataDirEscaped + '\\Recordings' + $q)$content = $content -replace ('(?i)' +$q + 'BaseDirectory' + $q + '\s*:\s*' +$q + '.*?' + $q), ($q + 'BaseDirectory' + $q + ': ' +$q + $dataDirEscaped + '\\Data' +$q)
        $content =$content -replace ('(?i)' + $q + 'ExportPath' +$q + '\s*:\s*' + $q + '.*?' +$q), ($q + 'ExportPath' +$q + ': ' + $q +$dataDirEscaped + '\\Exports' + $q)$content = $content -replace ('(?i)' +$q + 'ChunkEventLogPath' + $q + '\s*:\s*' +$q + '.*?' + $q), ($q + 'ChunkEventLogPath' + $q + ': ' +$q + $dataDirEscaped + '\\Logs\\chunk-events.log' +$q)

        $content \vert{} Set-Content$file -Encoding UTF8
        "Saved updated JSON to $file" \vert{} Out-File $log -Append
    }

    # 2. עדכון קובץ mediamtx.yml
    $yamlFiles = @(
        (Join-Path $cleanInstallDir 'MediaMTX\mediamtx.yml'),
        (Join-Path $cleanInstallDir 'mediamtx.yml')
    ) | Where-Object { Test-Path $_ }

    foreach ($yFile in$yamlFiles) {
        "Updating YAML: $yFile" | Out-File $log -Append$y = Get-Content $yFile -Raw$y = $y -replace '(?m)^\s*#?\s*api:\s*.*$', 'api: yes'
        $y =$y -replace '(?m)^\s*#?\s*apiAddress:\s*.*$', "apiAddress: :$ApiPort"
        $y =$y -replace '(?m)^\s*#?\s*rtmpAddress:\s*.*$', "rtmpAddress: :$RtmpPort"
        $y =$y -replace '(?m)^\s*#?\s*hlsAddress:\s*.*$', "hlsAddress: :$HlsPort"
        $y \vert{} Set-Content$yFile -Encoding UTF8
        "Saved updated YAML to $yFile" \vert{} Out-File $log -Append
    }

    "=== Configuration Finished Successfully ===" | Out-File $log -Append
} catch {
    "CRITICAL ERROR: $($_.Exception.ToString())" \vert{} Out-File $log -Append
}

exit 0