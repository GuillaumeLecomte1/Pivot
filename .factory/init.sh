#!/bin/bash
# Init script for Pivot Demo Mode mission
set -e

cd "$(dirname "$0")/.."

echo "Running Pivot demo mode setup..."

# Create demo SQLite database if it doesn't exist
if [ ! -f database/demo.sqlite ]; then
    echo "Creating demo SQLite database..."
    touch database/demo.sqlite
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Create .env.local from .env.example if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local..."
    cp .env.example .env.local
fi

# Generate app key if not set
php artisan key:generate --no-interaction 2>/dev/null || true

echo "Setup complete!"
echo ""
echo "To start the demo:"
echo "  1. Run migrations: php artisan migrate --database=sqlite"
echo "  2. Seed demo data: php artisan db:seed --database=sqlite --class=DemoSeeder"
echo "  3. Start server: php artisan serve --port=8000"
