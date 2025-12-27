#!/bin/bash
HASH=$(git rev-parse --short HEAD)
DATE=$(git log -1 --format=%cI)
# Fallback
[ -z "$HASH" ] && HASH="dev"
[ -z "$DATE" ] && DATE=$(date -Iseconds)

echo "const APP_VERSION = { hash: '$HASH', date: '$DATE' };" > version.js
