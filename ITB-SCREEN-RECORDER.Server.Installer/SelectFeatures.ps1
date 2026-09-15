param(
    [Parameter(Mandatory=$true)][string]$FeaturesDir,
    [Parameter(Mandatory=$true)][string]$OutputFile
)

$isCI = ($env:CI -eq 'true' -or $env:TF_BUILD -eq 'True' -or $env:GITHUB_ACTIONS -eq 'true')

# 1. סריקת הפיצ'רים ופענוח המניפסט
$discoveredFeatures = @()
if (Test-Path $FeaturesDir) {
    $dirs = Get-ChildItem -Path $FeaturesDir -Directory
    foreach ($d in $dirs) {
        $manifestPath = Join-Path $d.FullName "feature.json"
        
        if (-not (Test-Path $manifestPath)) {
            $found = Get-ChildItem -Path $d.FullName -Filter "feature.json" -Recurse -File | Select-Object -First 1
            if ($found) { $manifestPath = $found.FullName }
        }

        $title = $d.Name
        $description = "Modular feature plugin: $($d.Name)"
        $defaultSelected = $true

        if (Test-Path $manifestPath) {
            try {
                $raw = Get-Content -Path $manifestPath -Raw -Encoding UTF8
                $json = $raw | ConvertFrom-Json
                if ($json.title) { $title = $json.title }
                elseif ($json.name) { $title = $json.name }
                if ($json.description) { $description = $json.description }
                if ($null -ne $json.defaultSelected) { $defaultSelected = [bool]$json.defaultSelected }
            } catch {}
        }

        $discoveredFeatures += [PSCustomObject]@{
            DirName         = $d.Name
            FullPath        = $d.FullName
            CleanId         = ($d.Name -replace '[^a-zA-Z0-9_]', '_')
            Title           = $title
            Description     = $description
            IsSelected      = $defaultSelected
        }
    }
}

# 2. ממשק המשתמש (WinForms)
if (-not $isCI -and $discoveredFeatures.Count -gt 0) {
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing
    [System.Windows.Forms.Application]::EnableVisualStyles()

    $form = New-Object System.Windows.Forms.Form
    $form.Text = "ITB MSI Builder - Feature Selection"
    $form.Size = New-Object System.Drawing.Size(580, 560)
    $form.StartPosition = "CenterScreen"
    $form.FormBorderStyle = "FixedDialog"
    $form.MaximizeBox = $false
    $form.MinimizeBox = $false
    $form.TopMost = $true
    $form.BackColor = [System.Drawing.Color]::FromArgb(248, 249, 250)

    $headerPanel = New-Object System.Windows.Forms.Panel
    $headerPanel.Location = New-Object System.Drawing.Point(20, 15)
    $headerPanel.Size = New-Object System.Drawing.Size(525, 55)
    $form.Controls.Add($headerPanel)

    $lblTitle = New-Object System.Windows.Forms.Label
    $lblTitle.Location = New-Object System.Drawing.Point(0, 0)
    $lblTitle.Size = New-Object System.Drawing.Size(525, 22)
    $lblTitle.Font = New-Object System.Drawing.Font("Segoe UI", 10.5, [System.Drawing.FontStyle]::Bold)
    $lblTitle.Text = "Select features to bake into the MSI ($($discoveredFeatures.Count) discovered):"
    $headerPanel.Controls.Add($lblTitle)

    $lblSubtitle = New-Object System.Windows.Forms.Label
    $lblSubtitle.Location = New-Object System.Drawing.Point(0, 24)
    $lblSubtitle.Size = New-Object System.Drawing.Size(525, 28)
    $lblSubtitle.Font = New-Object System.Drawing.Font("Segoe UI", 8.75)
    $lblSubtitle.ForeColor = [System.Drawing.Color]::FromArgb(107, 114, 128)
    $lblSubtitle.Text = "Unchecked features will be completely purged from the MSI payload (100% Stealth Mode)."
    $headerPanel.Controls.Add($lblSubtitle)

    $scrollPanel = New-Object System.Windows.Forms.Panel
    $scrollPanel.Location = New-Object System.Drawing.Point(20, 75)
    $scrollPanel.Size = New-Object System.Drawing.Size(525, 370)
    $scrollPanel.AutoScroll = $true
    $form.Controls.Add($scrollPanel)

    $flow = New-Object System.Windows.Forms.FlowLayoutPanel
    $flow.Dock = [System.Windows.Forms.DockStyle]::Fill
    $flow.AutoScroll = $true
    $flow.FlowDirection = [System.Windows.Forms.FlowDirection]::TopDown
    $flow.WrapContents = $false
    $scrollPanel.Controls.Add($flow)

    $checkboxMap = @{}

    foreach ($feat in $discoveredFeatures) {
        $card = New-Object System.Windows.Forms.Panel
        $card.Size = New-Object System.Drawing.Size(495, 72)
        $card.BackColor = [System.Drawing.Color]::White
        $card.BorderStyle = [System.Windows.Forms.BorderStyle]::FixedSingle
        $card.Margin = New-Object System.Windows.Forms.Padding(0, 0, 0, 8)
        $card.Cursor = [System.Windows.Forms.Cursors]::Hand

        $chk = New-Object System.Windows.Forms.CheckBox
        $chk.Location = New-Object System.Drawing.Point(14, 14)
        $chk.Size = New-Object System.Drawing.Size(18, 18)
        $chk.Checked = $feat.IsSelected
        $card.Controls.Add($chk)

        $cardTitle = New-Object System.Windows.Forms.Label
        $cardTitle.Location = New-Object System.Drawing.Point(38, 12)
        $cardTitle.Size = New-Object System.Drawing.Size(445, 20)
        $cardTitle.Font = New-Object System.Drawing.Font("Segoe UI", 9.5, [System.Drawing.FontStyle]::Bold)
        $cardTitle.Text = $feat.Title
        $card.Controls.Add($cardTitle)

        $cardDesc = New-Object System.Windows.Forms.Label
        $cardDesc.Location = New-Object System.Drawing.Point(38, 34)
        $cardDesc.Size = New-Object System.Drawing.Size(445, 30)
        $cardDesc.Font = New-Object System.Drawing.Font("Segoe UI", 8.5)
        $cardDesc.ForeColor = [System.Drawing.Color]::FromArgb(107, 114, 128)
        $cardDesc.Text = $feat.Description
        $card.Controls.Add($cardDesc)

        $toggleHandler = { param($sender, $e) $chk.Checked = -not $chk.Checked }
        $card.Add_Click($toggleHandler)
        $cardTitle.Add_Click($toggleHandler)
        $cardDesc.Add_Click($toggleHandler)

        $checkboxMap[$feat.DirName] = $chk
        $flow.Controls.Add($card)
    }

    $btnSelectAll = New-Object System.Windows.Forms.Button
    $btnSelectAll.Location = New-Object System.Drawing.Point(20, 460)
    $btnSelectAll.Size = New-Object System.Drawing.Size(90, 30)
    $btnSelectAll.Text = "Select All"
    $btnSelectAll.Add_Click({ foreach ($c in $checkboxMap.Values) { $c.Checked = $true } })
    $form.Controls.Add($btnSelectAll)

    $btnClearAll = New-Object System.Windows.Forms.Button
    $btnClearAll.Location = New-Object System.Drawing.Point(118, 460)
    $btnClearAll.Size = New-Object System.Drawing.Size(90, 30)
    $btnClearAll.Text = "Clear All"
    $btnClearAll.Add_Click({ foreach ($c in $checkboxMap.Values) { $c.Checked = $false } })
    $form.Controls.Add($btnClearAll)

    $btnOk = New-Object System.Windows.Forms.Button
    $btnOk.Location = New-Object System.Drawing.Point(325, 458)
    $btnOk.Size = New-Object System.Drawing.Size(120, 34)
    $btnOk.Text = "Build MSI"
    $btnOk.Font = New-Object System.Drawing.Font("Segoe UI", 9.5, [System.Drawing.FontStyle]::Bold)
    $btnOk.DialogResult = [System.Windows.Forms.DialogResult]::OK
    $btnOk.BackColor = [System.Drawing.Color]::FromArgb(16, 185, 129) # רקע ירוק מודרני
    $btnOk.ForeColor = [System.Drawing.Color]::White                 # טקסט לבן
    $form.AcceptButton = $btnOk
    $form.Controls.Add($btnOk)

    $form.Add_Shown({ $form.Activate() })
    $dialogResult = $form.ShowDialog()

    if ($dialogResult -ne [System.Windows.Forms.DialogResult]::OK) { exit 1 }

    foreach ($feat in $discoveredFeatures) {
        $feat.IsSelected = $checkboxMap[$feat.DirName].Checked
    }
}

# 3. מחיקת רכיבים שלא סומנו
$selectedFeatures = @()
foreach ($feat in $discoveredFeatures) {
    if ($feat.IsSelected) {
        $selectedFeatures += $feat
    } else {
        Remove-Item -Path $feat.FullPath -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# 4. בניית קובץ ה-WXS (כולל עטיפת הפיצ'רים ב-FeatureGroup)
$xml = New-Object System.Text.StringBuilder
[void]$xml.AppendLine('<?xml version="1.0" encoding="utf-8"?>')
[void]$xml.AppendLine('<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">')
[void]$xml.AppendLine('  <Fragment>')

# הגדרת ה-FeatureGroup שתישאב על ידי שרת הבסיס
[void]$xml.AppendLine('    <FeatureGroup Id="DynamicModularFeatures">')
foreach ($feat in $selectedFeatures) {
    $escTitle = [System.Security.SecurityElement]::Escape($feat.Title)
    $escDesc = [System.Security.SecurityElement]::Escape($feat.Description)
    [void]$xml.AppendLine("      <Feature Id=`"Feature_$($feat.CleanId)`" Title=`"$escTitle`" Description=`"$escDesc`" Level=`"1`" Display=`"expand`" AllowAbsent=`"yes`" InstallDefault=`"local`" TypicalDefault=`"install`">")
    [void]$xml.AppendLine("        <ComponentGroupRef Id=`"FeatureGroup_$($feat.CleanId)`" />")
    [void]$xml.AppendLine("      </Feature>")
}
[void]$xml.AppendLine('    </FeatureGroup>')

# הגדרת התיקיות ורכיבי הקבצים
if ($selectedFeatures.Count -gt 0) {
    [void]$xml.AppendLine('    <DirectoryRef Id="INSTALLFOLDER">')
    [void]$xml.AppendLine('      <Directory Id="FeaturesBaseFolder" Name="Features">')
    foreach ($feat in $selectedFeatures) {
        [void]$xml.AppendLine("        <Directory Id=`"Dir_$($feat.CleanId)`" Name=`"$($feat.DirName)`" />")
    }
    [void]$xml.AppendLine('      </Directory>')
    [void]$xml.AppendLine('    </DirectoryRef>')

    foreach ($feat in $selectedFeatures) {
        [void]$xml.AppendLine("    <ComponentGroup Id=`"FeatureGroup_$($feat.CleanId)`" Directory=`"Dir_$($feat.CleanId)`">")
        [void]$xml.AppendLine("      <Files Include=`"`$(var.FeaturesDir)\$($feat.DirName)\**`" />")
        [void]$xml.AppendLine("    </ComponentGroup>")
    }
}

[void]$xml.AppendLine('  </Fragment>')
[void]$xml.AppendLine('</Wix>')

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($OutputFile, $xml.ToString(), $utf8NoBom)
exit 0