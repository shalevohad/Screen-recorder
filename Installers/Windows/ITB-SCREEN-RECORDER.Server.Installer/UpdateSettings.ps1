param(
    [Parameter(Mandatory=$true)][string]$ConfigData
)

try {
    $log = 'C:\Windows\Temp\itb-server-setup.log'
    "=== [$(Get-Date)] Configuration Started ===" | Out-File $log -Append
    
    $arr = $ConfigData.Split('|')
    $cleanDir = $arr[0].TrimEnd('\')
    $jsonPath = Join-Path $cleanDir 'appsettings.json'
    
    $httpPort = $arr[1]
    $rtmpPort = $arr[2]
    $apiPort  = $arr[3]
    $hlsPort  = $arr[4]
    $dataDir  = $arr[5]
    $dataDirJson = $dataDir.Replace('\', '\\')

    if (-not (Test-Path $jsonPath)) {
        "Target appsettings.json not found at $jsonPath" | Out-File $log -Append
        exit 0
    }

    $c = Get-Content $jsonPath -Raw
    $q = [char]34

    $c = $c -replace ('(?i)' + $q + 'Url' + $q + '\s*:\s*' + $q + 'http://0\.0\.0\.0:\d+' + $q), ($q + 'Url' + $q + ': ' + $q + 'http://0.0.0.0:' + $httpPort + $q)
    $c = $c -replace ('(?i)' + $q + 'RtmpPort' + $q + '\s*:\s*\d+'), ($q + 'RtmpPort' + $q + ': ' + $rtmpPort)
    $c = $c -replace ('(?i)' + $q + 'ApiPort' + $q + '\s*:\s*\d+'), ($q + 'ApiPort' + $q + ': ' + $apiPort)
    $c = $c -replace ('(?i)' + $q + 'HlsPort' + $q + '\s*:\s*\d+'), ($q + 'HlsPort' + $q + ': ' + $hlsPort)
    $c = $c -replace ('(?i)' + $q + 'LocalFallbackPath' + $q + '\s*:\s*' + $q + '.*?' + $q), ($q + 'LocalFallbackPath' + $q + ': ' + $q + $dataDirJson + $q)

    $c | Set-Content $jsonPath -Encoding UTF8
    "Successfully updated settings at $jsonPath" | Out-File $log -Append
} catch {
    "ERR: $($_.Exception.Message)" | Out-File $log -Append
}
exit 0