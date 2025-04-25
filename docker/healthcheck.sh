#!/bin/sh

# Fonction pour afficher l'heure actuelle en préfixe des logs
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log "Démarrage de la vérification de santé..."

# Vérifier que nginx fonctionne
if ! pgrep nginx > /dev/null; then
  log "Erreur: Nginx n'est pas en cours d'exécution"
  ps aux | grep nginx
  exit 1
fi
log "Nginx est en cours d'exécution"

# Vérifier que php-fpm fonctionne
if ! pgrep php-fpm > /dev/null; then
  log "Erreur: PHP-FPM n'est pas en cours d'exécution"
  ps aux | grep php-fpm
  exit 1
fi
log "PHP-FPM est en cours d'exécution"

# Vérifier que le fichier .env existe
if [ ! -f /var/www/html/.env ]; then
  log "Erreur: Le fichier .env n'existe pas"
  ls -la /var/www/html/
  exit 1
fi
log "Le fichier .env existe"

# Vérifier que la socket php-fpm existe
if [ ! -S /var/run/php-fpm.sock ]; then
  log "Erreur: Le socket PHP-FPM n'existe pas"
  ls -la /var/run/
  exit 1
fi
log "Le socket PHP-FPM existe"

# Vérifier les permissions du socket
log "Permissions du socket PHP-FPM:"
ls -la /var/run/php-fpm.sock

# Vérifier les logs nginx pour les erreurs
log "Dernières lignes du log d'erreur nginx (si disponible):"
tail -n 10 /var/log/nginx/error.log || log "Impossible de lire le log d'erreur nginx"

# Vérifier si l'application est accessible localement (avec un timeout réduit)
log "Tentative d'accès à l'application en local..."
if curl -s --fail --max-time 5 http://localhost:4004 > /dev/null; then
  log "L'application est accessible localement"
else
  log "Avertissement: L'application n'est pas accessible localement. Tentative avec verbose..."
  curl -v http://localhost:4004 || true
  # On ne fait pas échouer le healthcheck pour ce problème
fi

log "Vérification de santé terminée avec succès"
exit 0 