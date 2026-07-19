#!/usr/bin/env bash
# One-time VPS bootstrap for ENCOGSYS (Ubuntu 22.04/24.04).
# Run as root after SSH: bash deploy/bootstrap.sh
set -euo pipefail

APP_DIR=/var/www/encogsys
REPO=https://github.com/bal-reddy9059/encogsys-web.git
DOMAIN=encogsys.com

echo "==> Installing Node.js 20"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git nginx

echo "==> Installing PM2 + Certbot"
npm install -g pm2
apt-get install -y certbot python3-certbot-nginx

echo "==> Cloning repo to $APP_DIR"
mkdir -p /var/www
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
else
  echo "Repo already present at $APP_DIR"
fi

cd "$APP_DIR"

if [ ! -f .env.production ]; then
  cp .env.production.example .env.production
  echo "Created .env.production — edit CONTACT_EMAIL / SITE_URL if needed."
fi

echo "==> Installing dependencies and building"
npm ci
npm run build

echo "==> Starting with PM2"
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root | tail -n 1 || true

echo "==> Configuring Nginx"
cp deploy/nginx-encogsys.conf /etc/nginx/sites-available/encogsys
ln -sf /etc/nginx/sites-available/encogsys /etc/nginx/sites-enabled/encogsys
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo ""
echo "Next steps:"
echo "  1. Point DNS A records for $DOMAIN and www → this VPS IP"
echo "  2. sudo certbot --nginx -d www.$DOMAIN -d $DOMAIN"
echo "  3. Add GitHub secrets: VPS_HOST, VPS_USER (root), VPS_SSH_KEY"
echo "Done. App should be on http://$(hostname -I | awk '{print $1}'):3000 behind Nginx :80"
