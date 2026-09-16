param(
    [Parameter(Mandatory=$true)][string]$PayloadDir,
    [Parameter(Mandatory=$true)][string]$HeaderScript,
    [Parameter(Mandatory=$true)][string]$OutputFile
)

$tempTar = [System.IO.Path]::GetTempFileName() + ".tar.gz"

try {
    Write-Host "==> Normalizing line endings (CRLF -> LF) for Linux..."
    Get-ChildItem -Path $PayloadDir -Recurse -Include *.sh, *.service, *.json, *.txt | ForEach-Object {
        $raw = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
        $normalized = $raw.Replace("`r`n", "`n")
        [System.IO.File]::WriteAllText($_.FullName, $normalized, [System.Text.UTF8Encoding]::new($false))
    }

    Write-Host "==> Compressing payload into tar.gz..."
    & tar -czf "$tempTar" -C "$PayloadDir" .

    Write-Host "==> Stitching .run self-extracting binary..."
    $headerContent = [System.IO.File]::ReadAllText($HeaderScript, [System.Text.Encoding]::UTF8)
    $headerContent = $headerContent.Replace("`r`n", "`n")
    if (-not $headerContent.EndsWith("`n")) { $headerContent += "`n" }

    $outDir = [System.IO.Path]::GetDirectoryName($OutputFile)
    if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

    [System.IO.File]::WriteAllText($OutputFile, $headerContent, [System.Text.UTF8Encoding]::new($false))

    $tarBytes = [System.IO.File]::ReadAllBytes($tempTar)
    $fs = [System.IO.File]::Open($OutputFile, [System.IO.FileMode]::Append)
    try {
        $fs.Write($tarBytes, 0, $tarBytes.Length)
    } finally {
        $fs.Close()
    }

    Write-Host "==> [SUCCESS] Generated self-extracting installer: $OutputFile"
}
finally {
    if (Test-Path $tempTar) { Remove-Item -Force $tempTar }
}
exit 0