#!/bin/sh

# Créer un fichier .env à partir des variables d'environnement
# Cela permet d'utiliser les variables définies dans Dokploy
env | grep -E '^(APP_|DB_|MAIL_|QUEUE_|SESSION_|CACHE_|REDIS_|VITE_)' > .env

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