#!/usr/bin/env bash
# Deploy the latest main branch on the VPS. Run on the server as the `tam` user:
#   sudo -iu tam /opt/tam/app/scripts/deploy-vps.sh
# Or from a workstation with the `tam-spaceship` SSH alias:
#   ssh tam-spaceship 'sudo -iu tam /opt/tam/app/scripts/deploy-vps.sh'
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/tam/app}"
cd "$APP_DIR"

git fetch --quiet origin main
git reset --hard origin/main

npm ci --no-audit --no-fund
npx prisma migrate deploy
# 4 GB box: give the build room, the swap file covers peaks.
NODE_OPTIONS=--max-old-space-size=3072 npm run build

pm2 reload tam --update-env || pm2 start npm --name tam -- start
pm2 save
echo "Deployed $(git rev-parse --short HEAD)"
