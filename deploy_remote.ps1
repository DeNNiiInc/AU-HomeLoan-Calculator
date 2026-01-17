# Reads config and executes remote setup
$Config = Get-Content "deploy_config.json" | ConvertFrom-Json
$User = $Config.username
$HostName = $Config.host
$Pass = $Config.password
$RemotePath = $Config.remotePath

# Prepare the command to run on the server
$SetupScript = Get-Content "setup_remote.sh" -Raw

# Base64 Encode the script to avoid ANY line-ending or quoting issues during storage
$ScriptBytes = [System.Text.Encoding]::UTF8.GetBytes($SetupScript)
$ScriptB64 = [Convert]::ToBase64String($ScriptBytes)

# Create the runner logic
$RunnerCmd = "
echo '🚀 Preparing remote setup...'
mkdir -p $RemotePath
echo '$ScriptB64' | base64 -d > $RemotePath/setup_remote.sh
# Ensure unix line endings
sed -i 's/\r$//' $RemotePath/setup_remote.sh
chmod +x $RemotePath/setup_remote.sh
echo '🏃 Executing setup...'
$RemotePath/setup_remote.sh
rm $RemotePath/setup_remote.sh
"

# Base64 Encode the runner command itself so we can pipe it cleanly to bash
$RunnerBytes = [System.Text.Encoding]::UTF8.GetBytes($RunnerCmd)
$RunnerB64 = [Convert]::ToBase64String($RunnerBytes)

$FinalCmd = "echo $RunnerB64 | base64 -d | tr -d '\r' | bash"

Write-Host "🚀 connecting to $HostName..."
Write-Host "👉 Please install PuTTY (plink) if not installed, or ensure 'ssh' is available."

# Execute
echo y | plink -ssh -t -pw $Pass "$User@$HostName" $FinalCmd
