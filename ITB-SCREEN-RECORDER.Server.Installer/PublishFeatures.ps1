param(
    [Parameter(Mandatory=$true)][string]$FeaturesRoot,
    [Parameter(Mandatory=$true)][string]$StagingDir,
    [Parameter(Mandatory=$true)][string]$Configuration
)

if (Test-Path $FeaturesRoot) {
    $dirs = Get-ChildItem -Path $FeaturesRoot -Directory
    foreach ($d in $dirs) {
        $proj = Get-ChildItem -Path $d.FullName -Filter '*.csproj' -Recurse | Select-Object -First 1
        if ($proj) {
            $out = Join-Path $StagingDir $d.Name
            Write-Host "==> Staging Feature: $($d.Name)"
            dotnet publish $proj.FullName -c $Configuration -r win-x64 --no-self-contained -o $out
        }
    }
}
exit 0