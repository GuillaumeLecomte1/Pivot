#!/bin/sh

# Generate .env file from environment variables
echo "Creating .env file from environment variables..."
env | grep -E '^(APP_|DB_|MAIL_|REDIS_|LOG_|SESSION_|CACHE_|QUEUE_|BROADCAST_|PUSHER_|MIX_|VITE_)' > /var/www/html/.env
echo "FORCE_HTTPS=${FORCE_HTTPS:-true}" >> /var/www/html/.env
echo "ASSET_URL=${ASSET_URL:-${APP_URL}}" >> /var/www/html/.env
chmod 644 /var/www/html/.env
chown www-data:www-data /var/www/html/.env
echo ".env file created with content:"
cat /var/www/html/.env

# Configure php-fpm to use a socket instead of a port to avoid conflicts
echo "[www]
listen = /var/run/php-fpm.sock
listen.owner = www-data
listen.group = www-data
listen.mode = 0660
" > /usr/local/etc/php-fpm.d/zz-docker.conf

# Update nginx to use socket instead of port 9000
sed -i 's/fastcgi_pass 0.0.0.0:9000;/fastcgi_pass unix:\/var\/run\/php-fpm.sock;/g' /etc/nginx/http.d/default.conf

# Create log directories and files with proper permissions
mkdir -p /var/log/nginx
mkdir -p /var/log/php-fpm
touch /var/log/nginx/error.log
touch /var/log/nginx/access.log
touch /var/log/php-fpm/error.log
chmod 777 /var/log/nginx/error.log
chmod 777 /var/log/nginx/access.log
chmod 777 /var/log/php-fpm/error.log

# Create supervisor log directory if it doesn't exist
mkdir -p /var/log/supervisor

# Set proper ownership for all application files
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html

# Create storage directories with proper permissions
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/framework/cache
mkdir -p /var/www/html/storage/logs
touch /var/www/html/storage/logs/laravel.log
chmod 777 /var/www/html/storage/logs/laravel.log

# Set storage permissions with correct group and permissions
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

# Clear all caches first
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
php artisan optimize:clear

# Verify key is set, using the newly created .env file
php artisan key:generate --force

# Run migrations
php artisan migrate --force

# Then cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# Output environment info for debugging
echo "Environment: $(php artisan env)"
echo "Base URL: $(php artisan --no-ansi tinker --execute="echo config('app.url');")"

# Start supervisord
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf 