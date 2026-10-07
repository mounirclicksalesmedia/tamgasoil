#!/usr/bin/env bash
# Copy the production database from Neon into the VPS PostgreSQL (database `tam`).
# Run on the server as root:  bash /opt/tam/app/scripts/migrate-from-neon.sh
# It prompts for the Neon connection string (input is hidden, nothing is stored),
# replaces the local `tam` database with Neon's contents and prints row counts
# for both sides so you can confirm they match. Re-run it right before switching
# DNS to pick up any inquiries received in the meantime.
set -euo pipefail

[ "$(id -u)" = 0 ] || { echo "Run as root." >&2; exit 1; }

read -r -s -p "Neon connection string (postgresql://...): " NEON_URL; echo
[[ "$NEON_URL" == postgres* ]] || { echo "That does not look like a PostgreSQL URL." >&2; exit 1; }
export PGCONNECT_TIMEOUT=15

TABLES='"User" "Page" "PageTranslation" "Block" "BlockTranslation" "Category" "CategoryTranslation" "Post" "PostTranslation" "Solution" "SolutionTranslation" "Inquiry" "Setting" "Media" "_prisma_migrations"'
counts() {
  for t in $TABLES; do
    printf '%-22s %s\n' "$t" "$(psql "$1" -tAc "select count(*) from $t" 2>/dev/null || echo '-')"
  done
}

echo "Neon server: $(psql "$NEON_URL" -tAc 'show server_version')"
DUMP=$(mktemp /root/neon-XXXX.dump)
trap 'rm -f "$DUMP"' EXIT

echo "Dumping Neon..."
pg_dump -Fc --no-owner --no-privileges -f "$DUMP" "$NEON_URL"

echo "Replacing the local database..."
sudo -iu tam pm2 stop tam >/dev/null || true
sudo -u postgres dropdb --if-exists tam
sudo -u postgres createdb -O tam tam
sudo -u postgres pg_restore --no-owner --no-privileges --role=tam -d tam "$DUMP"
sudo -iu tam pm2 start tam >/dev/null

LOCAL_URL=$(grep '^DATABASE_URL=' /opt/tam/app/.env | cut -d= -f2- | tr -d '"' | sed 's/?schema=public//')
echo; echo "== Neon"; counts "$NEON_URL"
echo; echo "== VPS";  counts "$LOCAL_URL"
echo; echo "Done. The two columns above should match."
