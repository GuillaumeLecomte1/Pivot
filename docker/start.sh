#!/bin/bash
set -e

echo "🚀 Starting Pivot Laravel Application..."

# Attendre que la base de données soit disponible
echo "⏳ Waiting for database connection..."
until php artisan db:monitor --max-tries=1 >/dev/null 2>&1; do
    echo "Database not ready - waiting 2 seconds..."
    sleep 2
done
echo "✅ Database connection established!"

# Configuration de l'application
echo "🔧 Configuring application..."

# Optimiser les configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migration et seeders si nécessaire (en production uniquement si nouvelle installation)
if [ "$APP_ENV" = "production" ]; then
    echo "🗄️ Running migrations (if needed)..."
    php artisan migrate --force --no-interaction || echo "Migrations already up to date or failed"
else
    echo "🗄️ Running migrations and seeds..."
    php artisan migrate:fresh --seed --no-interaction
fi

# Créer les liens symboliques pour le stockage
php artisan storage:link || echo "Storage link already exists"

# Nettoyer le cache si nécessaire
php artisan cache:clear

# Permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

echo "✅ Application configured successfully!"

# Démarrer PHP-FPM en arrière-plan
echo "🔄 Starting PHP-FPM..."
php-fpm -D

# Démarrer Nginx en avant-plan
echo "🌐 Starting Nginx..."
nginx -g "daemon off;" 