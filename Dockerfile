FROM php:8.2-fpm-alpine

# Ajouter les labels Traefik
LABEL traefik.enable=true
LABEL traefik.http.routers.pivot-awlyhs.rule=Host(`pivot.guillaume-lcte.fr`)
LABEL traefik.http.routers.pivot-awlyhs.entrypoints=websecure
LABEL traefik.http.routers.pivot-awlyhs.tls=true
LABEL traefik.http.services.pivot-awlyhs.loadbalancer.server.port=4004
LABEL traefik.http.services.pivot-awlyhs.loadbalancer.server.scheme=http

WORKDIR /var/www/html

# Install dependencies
RUN apk add --no-cache \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    git \
    curl \
    nginx \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql bcmath zip gd

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create necessary directories
RUN mkdir -p /var/log/supervisor \
    && mkdir -p /etc/supervisor/conf.d \
    && mkdir -p /var/www/html/storage/framework/sessions \
    && mkdir -p /var/www/html/storage/framework/views \
    && mkdir -p /var/www/html/storage/framework/cache

# Copy application files
COPY . .

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Copy Nginx config
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Install Node dependencies and build assets
RUN npm install
RUN npm run build

# Copy supervisor configuration
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Make start script executable
RUN chmod +x /var/www/html/docker/start.sh

# Expose ports
EXPOSE 4004 9000

# Run start script
CMD ["/var/www/html/docker/start.sh"] 