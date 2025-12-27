# Reads config and executes remote setup
$Config = Get-Content "deploy_config.json" | ConvertFrom-Json
$User = $Config.username
$HostName = $Config.host
$Pass = $Config.password
$RemotePath = $Config.remotePath

# Prepare the command to run on the server
# It reads the content of setup_remote.sh and pipes it to bash on the server
$SetupScript = Get-Content "setup_remote.sh" -Raw

# Using plink (part of PuTTY) to execute, assuming it's in PATH or user wants to use ssh
# We will use 'echo y | plink ...' to auto-accept host key if needed, though simpler is ssh

Write-Host "🚀 connecting to $HostName..."

# Attempt to stream the script to the remote server
# Note: We need to escape single quotes if we were passing it as a string, but piping is safer.
# However, piping a local file to a remote ssh command with password auth (plink -pw) is specific.

# Method 1: Upload script first then execute (safer)
$ScriptPath = "$RemotePath/setup_remote_temp.sh"
$CreateDirCmd = "mkdir -p $RemotePath"

# We'll use a simple heredoc-like approach or scp if available.
# Since we want to use plink based on the template:

Write-Host "👉 Please install PuTTY (plink) if not installed, or ensure 'ssh' is available."
Write-Host "Executing setup... (this might take a moment)"

# We will try to copy the file content and run it.
# We'll rely on the user having 'plink' as per the template guidance, OR 'ssh'.
# The user's requested template used plink.

$Command = "
mkdir -p $RemotePath
cat > $RemotePath/setup_remote.sh << 'EOF'
$SetupScript
EOF
chmod +x $RemotePath/setup_remote.sh
$RemotePath/setup_remote.sh
rm $RemotePath/setup_remote.sh
"

# Execute
echo y | plink -ssh -t -pw $Pass "$User@$HostName" $Command
