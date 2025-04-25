#!/bin/sh

# Enable PHP error logging
echo "
error_reporting = E_ALL
display_errors = On
log_errors = On
error_log = /var/log/php-fpm/error.log
" > /usr/local/etc/php/conf.d/error-logging.ini

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

# Verify .env file exists and key is set
php artisan key:generate --force

# Run migrations
php artisan migrate --force

# Clear all caches first
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
php artisan optimize:clear

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