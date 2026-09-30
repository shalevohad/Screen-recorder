param(
    [Parameter(Mandatory=$true)][string]$FeaturesRoot,
    [Parameter(Mandatory=$true)][string]$StagingDir,
    [Parameter(Mandatory=$true)][string]$Configuration,
    [string]$Runtime = 'win-x64',
    [string[]]$SelectedFeatures = @()
)

$ErrorActionPreference = 'Stop'

Write-Host "===================================================="
Write-Host "Publishing Modular Features (Generic Manifest Scan)"
Write-Host "  Features Root    : $FeaturesRoot"
Write-Host "  Staging Dir      : $StagingDir"
Write-Host "  Configuration    : $Configuration"
Write-Host "  Runtime          : $Runtime"
Write-Host "  Selected Features: $(if($SelectedFeatures.Length -eq 0) { 'All (Dynamic)' } else { $SelectedFeatures -join ', ' })"
Write-Host "===================================================="

if (-not (Test-Path $FeaturesRoot)) {
    Write-Warning "Features root path '$FeaturesRoot' does not exist. Skipping features staging."
    exit 0
}

if (-not (Test-Path $StagingDir)) {
    New-Item -ItemType Directory -Path $StagingDir -Force | Out-Null
}

$repoRoot = (Resolve-Path "$FeaturesRoot\..").Path
$featureDirs = Get-ChildItem -Path $FeaturesRoot -Directory

foreach ($dir in $featureDirs) {
    $featureName = $dir.Name

    # סינון דינמי לפי בחירת המשתמש ב-Build (אם הוגדרה)
    if ($SelectedFeatures.Length -gt 0 -and $SelectedFeatures -notcontains $featureName) {
        Write-Host "==> Skipping feature '$featureName' (Filtered out by configuration)."
        continue
    }

    $proj = Get-ChildItem -Path $dir.FullName -Filter '*.csproj' -Recurse | Select-Object -First 1
    
    if ($proj) {
        $targetOutDir = Join-Path $StagingDir $featureName

        Write-Host "==> Publishing Feature: $featureName [$Runtime]"

        # פרסום הפיצ'ר דינמית
        dotnet publish $proj.FullName `
            -c $Configuration `
            -r $Runtime `
            --no-self-contained `
            -o $targetOutDir

        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to publish feature '$featureName' for runtime '$Runtime'."
            exit $LASTEXITCODE
        }

        # === עיבוד דינמי של תלויות מתוך מערך requireTools ב-feature.json ===
        $manifestPath = Join-Path $dir.FullName "feature.json"

        if (Test-Path $manifestPath) {
            try {
                $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
                
                if ($manifest.PSObject.Properties['requireTools'] -and $manifest.requireTools) {
                    foreach ($tool in $manifest.requireTools) {
                        $toolName = $tool.name
                        $destSubDir = if ($tool.destination) { $tool.destination } else { "." }
                        $finalDestDir = Join-Path $targetOutDir $destSubDir

                        if (-not (Test-Path $finalDestDir)) {
                            New-Item -ItemType Directory -Path $finalDestDir -Force | Out-Null
                        }

                        # התאמת שמות קבצים בהתאם למערכת ההפעלה (הוספת .exe בווינדוס במידת הצורך)
                        if ($Runtime -eq "linux-x64") {
                            $toolSrc = Join-Path $repoRoot "Tools\Linux\$toolName"
                        } else {
                            $fileName = if ($toolName -match '\.exe$') { $toolName } else { "$toolName.exe" }
                            $toolSrc = Join-Path $repoRoot "Tools\Win\$fileName"
                        }

                        if (Test-Path $toolSrc) {
                            Write-Host "  -> Injecting required tool '$toolName' into feature '$featureName'..."
                            Copy-Item $toolSrc -Destination $finalDestDir -Force
                        } else {
                            Write-Warning "  -> Required tool '$toolName' not found at source path: $toolSrc!"
                        }
                    }
                }
            } catch {
                Write-Warning "  -> Failed to parse feature.json or inject tools for '$featureName': $_"
            }
        }
    }
}

Write-Host "All features published successfully using generic manifest tooling."
exit 0