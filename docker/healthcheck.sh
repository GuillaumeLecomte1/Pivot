#!/bin/sh

# Simple healthcheck for Laravel application
echo "Health check starting..."

# Check if nginx is running
if ! pgrep nginx > /dev/null; then
  echo "Nginx is not running"
  exit 1
fi

# Check if php-fpm is running
if ! pgrep php-fpm > /dev/null; then
  echo "PHP-FPM is not running"  
  exit 1
fi

# Check if the application responds
if curl -s --fail --max-time 10 http://localhost:4004/health > /dev/null 2>&1; then
  echo "Application is healthy"
  exit 0
else
  echo "Application is not responding on /health endpoint"
  # Try basic port check
  if curl -s --fail --max-time 5 http://localhost:4004 > /dev/null 2>&1; then
    echo "Application port is responding but /health endpoint failed"
    exit 0
  else
    echo "Application port is not responding"
    exit 1
  fi
fi 