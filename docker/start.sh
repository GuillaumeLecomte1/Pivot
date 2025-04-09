#!/bin/sh

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

# Create storage directories with proper permissions
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/framework/cache
mkdir -p /var/www/html/storage/logs
touch /var/www/html/storage/logs/laravel.log
chmod -R 777 /var/www/html/storage
chmod -R 777 /var/www/html/bootstrap/cache

# Run migrations
php artisan migrate --force

# Clear and cache configuration
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start supervisord
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf 