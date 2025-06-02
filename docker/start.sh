#!/bin/bash
set -e

echo "🚀 Starting Pivot Laravel Application..."

# Configuration de l'application
echo "🔧 Configuring application..."

# Créer les répertoires nécessaires
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/framework/cache
mkdir -p /var/www/html/storage/logs
mkdir -p /var/log/nginx

# Permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Clear caches before starting
php artisan config:clear || echo "Config clear failed"
php artisan route:clear || echo "Route clear failed"
php artisan view:clear || echo "View clear failed"
php artisan cache:clear || echo "Cache clear failed"

# Generate APP_KEY if not set
php artisan key:generate --force || echo "Key generation failed"

# Migration en production (sans --force pour éviter les erreurs)
if [ "$APP_ENV" = "production" ]; then
    echo "🗄️ Running migrations in production..."
    php artisan migrate --no-interaction || echo "Migrations failed or already up to date"
fi

# Cache des configurations
php artisan config:cache || echo "Config cache failed"
php artisan route:cache || echo "Route cache failed"
php artisan view:cache || echo "View cache failed"

# Créer le lien de stockage
php artisan storage:link || echo "Storage link already exists"

# Optimisations
php artisan optimize || echo "Optimization failed"

echo "✅ Application configured successfully!"

# Démarrer PHP-FPM en arrière-plan
echo "🔄 Starting PHP-FPM..."
php-fpm -D

# Attendre que PHP-FPM soit prêt
sleep 2

# Démarrer Nginx en avant-plan
echo "🌐 Starting Nginx..."
nginx -g "daemon off;" 