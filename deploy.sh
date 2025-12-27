#!/bin/bash
WORKING_DIR="/var/www/au-home-loan-calculator"
APP_NAME="loan-calculator"

cd $WORKING_DIR || exit 1

# Check for updates
echo "Checking for updates..."
git remote update

if git status -uno | grep -q 'Your branch is behind'; then
    echo "⬇️ Updates found. Pulling changes..."
    git pull
    
    echo "🏷️ Updating version info..."
    chmod +x update_version.sh
    ./update_version.sh

    # check if package.json changed
    if git diff --name-only HEAD@{1} HEAD | grep -q "package.json"; then
        echo "📦 Installing dependencies..."
        npm install
    fi

    echo "🚀 Restarting application..."
    pm2 restart $APP_NAME
else
    echo "✅ No updates found."
fi
