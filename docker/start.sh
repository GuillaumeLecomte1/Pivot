#!/bin/sh

# Créer un fichier .env vide
touch .env

# Ajouter les variables d'environnement de base
cat > .env << EOL
APP_NAME=Pivot
APP_ENV=production
APP_DEBUG=false
APP_URL=https://pivot.guillaume-lcte.fr
ASSET_URL=https://pivot.guillaume-lcte.fr

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=pivot
DB_USERNAME=pivot
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="\${APP_NAME}"

VITE_APP_NAME="\${APP_NAME}"
VITE_APP_URL="\${APP_URL}"
VITE_PUSHER_APP_KEY="\${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="\${PUSHER_HOST}"
VITE_PUSHER_PORT="\${PUSHER_PORT}"
VITE_PUSHER_SCHEME="\${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="\${PUSHER_APP_CLUSTER}"
EOL

# Mettre à jour le fichier .env avec les variables d'environnement de Dokploy
env | grep -E '^(APP_|DB_|MAIL_|QUEUE_|SESSION_|CACHE_|REDIS_|VITE_)' | while read -r line; do
    key=$(echo "$line" | cut -d= -f1)
    value=$(echo "$line" | cut -d= -f2-)
    if [ ! -z "$value" ]; then
        sed -i "s|^$key=.*|$key=$value|g" .env
    fi
done

# Generate app key if not set
if [ -z "$(grep -E '^APP_KEY=' .env | grep -v '=$')" ]; then
    php artisan key:generate
fi

# Create supervisor log directory if it doesn't exist
mkdir -p /var/log/supervisor

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache

# Start supervisord
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf 