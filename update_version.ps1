$gitHash = git rev-parse --short HEAD
$gitDate = git log -1 --format=%cI

# Fallback if git fails (e.g. not a repo)
if (-not $gitHash) { $gitHash = "dev" }
if (-not $gitDate) { $gitDate = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK") }

$content = "const APP_VERSION = { hash: '$gitHash', date: '$gitDate' };"
Set-Content -Path "version.js" -Value $content
Write-Host "Generated version.js with Hash: $gitHash and Date: $gitDate"
