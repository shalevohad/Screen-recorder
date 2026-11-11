<#
.SYNOPSIS
    Air-Gapped Token & Telemetry Calculator for .agent-kit Autonomous Runs.
#>
param(
    [string]$SolutionRoot = (Get-Location).Path
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   DEFENSE AGENT-KIT: OFFLINE TOKEN & TELEMETRY AUDITOR   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

function Measure-FileTokens {
    param([string]$FilePath)
    if (-not (Test-Path $FilePath)) { return 0 }
    $content = Get-Content -Path $FilePath -Raw -Encoding UTF8
    if ([string]::IsNullOrEmpty($content)) { return 0 }
    $hebrewMatches = [regex]::Matches($content, "[֐-׿]").Count
    $otherChars = $content.Length - $hebrewMatches
    return [math]::Ceiling(($hebrewMatches / 1.8) + ($otherChars / 3.6))
}

$folders = @(".agent-kit/intake", ".agent-kit/tracking", ".agent-kit/deliverables")
$total = 0
foreach ($folder in $folders) {
    $full = Join-Path $SolutionRoot $folder
    if (Test-Path $full) {
        Get-ChildItem -Path $full -File -Recurse | ForEach-Object {
            $t = Measure-FileTokens -FilePath $_.FullName
            $total += $t
            [PSCustomObject]@{ Category = $folder; File = $_.Name; Tokens = $t }
        } | Format-Table -AutoSize
    }
}
Write-Host "Total Tokens Measured: $total" -ForegroundColor Green
