#!/bin/sh

# Fonction pour afficher l'heure actuelle en préfixe des logs
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log "Démarrage de la vérification de santé..."

# Vérifier si on est en train de démarrer (en regardant le temps d'activité)
UPTIME=$(cat /proc/uptime | awk '{print $1}')
UPTIME_INT=$(echo $UPTIME | cut -d. -f1)

# Si le système a démarré il y a moins de 60 secondes, on est plus tolérant
if [ $UPTIME_INT -lt 60 ]; then
  log "Système démarré récemment (uptime: $UPTIME secondes), mode tolérant activé"
  STARTUP_MODE=true
else
  STARTUP_MODE=false
fi

# Vérifier que nginx fonctionne
if ! pgrep nginx > /dev/null; then
  log "Nginx n'est pas en cours d'exécution"
  ps aux | grep nginx
  if [ "$STARTUP_MODE" = "false" ]; then
    exit 1
  else
    log "Mode démarrage: on continue malgré l'absence de nginx"
  fi
else
  log "Nginx est en cours d'exécution"
fi

# Vérifier que php-fpm fonctionne
if ! pgrep php-fpm > /dev/null; then
  log "PHP-FPM n'est pas en cours d'exécution"
  ps aux | grep php-fpm
  if [ "$STARTUP_MODE" = "false" ]; then
    exit 1
  else
    log "Mode démarrage: on continue malgré l'absence de php-fpm"
  fi
else
  log "PHP-FPM est en cours d'exécution"
fi

# Vérifier que le fichier .env existe
if [ ! -f /var/www/html/.env ]; then
  log "Le fichier .env n'existe pas"
  ls -la /var/www/html/
  exit 1
fi
log "Le fichier .env existe"

# Vérifier que la socket php-fpm existe (seulement si PHP-FPM est en cours d'exécution)
if pgrep php-fpm > /dev/null; then
  if [ ! -S /var/run/php-fpm.sock ]; then
    log "Le socket PHP-FPM n'existe pas"
    ls -la /var/run/
    if [ "$STARTUP_MODE" = "false" ]; then
      exit 1
    fi
  else
    log "Le socket PHP-FPM existe"
    # Vérifier les permissions du socket
    log "Permissions du socket PHP-FPM:"
    ls -la /var/run/php-fpm.sock
  fi
fi

# Vérifier les logs nginx pour les erreurs (seulement si nginx est en cours d'exécution)
if pgrep nginx > /dev/null && [ -f /var/log/nginx/error.log ]; then
  log "Dernières lignes du log d'erreur nginx:"
  tail -n 10 /var/log/nginx/error.log || log "Impossible de lire le log d'erreur nginx"
fi

# Vérifier si l'application est accessible localement (seulement si tout est en cours d'exécution)
if pgrep nginx > /dev/null && pgrep php-fpm > /dev/null; then
  log "Tentative d'accès à l'application en local..."
  if curl -s --fail --max-time 5 http://localhost:4004 > /dev/null; then
    log "L'application est accessible localement"
  else
    log "L'application n'est pas accessible localement. Tentative avec verbose..."
    curl -v --max-time 5 http://localhost:4004 || true
    # On ne fait pas échouer le healthcheck pour ce problème pendant le démarrage
    if [ "$STARTUP_MODE" = "false" ]; then
      log "L'application devrait être accessible maintenant, échec de la vérification de santé"
      exit 1
    fi
  fi
fi

log "Vérification de santé terminée avec succès"
exit 0 