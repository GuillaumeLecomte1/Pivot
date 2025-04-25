#!/bin/sh

# Vérifier que nginx fonctionne
if ! pgrep nginx > /dev/null; then
  echo "Nginx n'est pas en cours d'exécution"
  exit 1
fi

# Vérifier que php-fpm fonctionne
if ! pgrep php-fpm > /dev/null; then
  echo "PHP-FPM n'est pas en cours d'exécution"
  exit 1
fi

# Vérifier que le fichier .env existe
if [ ! -f /var/www/html/.env ]; then
  echo "Le fichier .env n'existe pas"
  exit 1
fi

# Vérifier que la socket php-fpm existe
if [ ! -S /var/run/php-fpm.sock ]; then
  echo "Le socket PHP-FPM n'existe pas"
  exit 1
fi

# Vérifier que nginx peut accéder à la socket php-fpm
if ! ls -la /var/run/php-fpm.sock | grep "www-data" > /dev/null; then
  echo "Le socket PHP-FPM n'a pas les bonnes permissions"
  exit 1
fi

# Vérifier que l'application est accessible localement
if ! curl -s --fail http://localhost:4004 > /dev/null; then
  echo "L'application n'est pas accessible localement"
  exit 1
fi

echo "L'application est en bon état de fonctionnement"
exit 0 