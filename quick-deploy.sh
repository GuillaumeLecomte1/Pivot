#!/bin/bash

echo "🚀 Déploiement rapide avec configuration MySQL corrigée"

SERVER="ubuntu@guillaume-lcte.fr"

# Supprimer l'ancien service qui bug
ssh $SERVER "docker service rm personnel-pivot-pj6hbu 2>/dev/null || true"

echo "📤 Envoi des fichiers..."
rsync -avz --exclude='.git' --exclude='node_modules' --exclude='vendor' \
    ./ $SERVER:/tmp/pivot-quick/

echo "🐳 Déploiement avec configuration MySQL correcte..."
ssh $SERVER << 'EOF'
cd /tmp/pivot-quick

# Build l'image
docker build -t pivot-fixed:latest .

# Créer le service avec la BONNE configuration DB
docker service create \
    --name pivot-fixed \
    --network dokploy-network \
    --replicas 1 \
    --constraint 'node.role==manager' \
    --label "traefik.enable=true" \
    --label "traefik.http.routers.pivot-fixed.rule=Host(\`pivot.guillaume-lcte.fr\`)" \
    --label "traefik.http.routers.pivot-fixed.entrypoints=websecure" \
    --label "traefik.http.routers.pivot-fixed.tls=true" \
    --label "traefik.http.routers.pivot-fixed.tls.certresolver=letsencrypt" \
    --label "traefik.http.services.pivot-fixed.loadbalancer.server.port=4004" \
    --label "traefik.http.services.pivot-fixed.loadbalancer.server.scheme=http" \
    --label "traefik.docker.network=dokploy-network" \
    --env APP_NAME="Pivot" \
    --env APP_ENV="production" \
    --env APP_KEY="base64:gmBDzoUYk3CFz7M2ePt3hC+wUyIPvggqmyOd9EZRL94=" \
    --env APP_DEBUG="false" \
    --env APP_URL="https://pivot.guillaume-lcte.fr" \
    --env ASSET_URL="https://pivot.guillaume-lcte.fr" \
    --env FORCE_HTTPS="true" \
    --env LOG_CHANNEL="stack" \
    --env LOG_LEVEL="error" \
    --env DB_CONNECTION="mysql" \
    --env DB_HOST="code-db-1" \
    --env DB_PORT="3306" \
    --env DB_DATABASE="pivot" \
    --env DB_USERNAME="pivot" \
    --env DB_PASSWORD="pivot" \
    --env CACHE_DRIVER="file" \
    --env SESSION_DRIVER="file" \
    --env SESSION_LIFETIME="120" \
    --env SESSION_SECURE_COOKIE="true" \
    --env SESSION_SAME_SITE="lax" \
    --env SESSION_DOMAIN=".guillaume-lcte.fr" \
    --env QUEUE_CONNECTION="sync" \
    --env MAIL_MAILER="smtp" \
    --env MAIL_HOST="51.195.43.106" \
    --env MAIL_PORT="1025" \
    --env MAIL_FROM_ADDRESS="noreply@guillaume-lcte.fr" \
    --env MAIL_FROM_NAME="Pivot" \
    --env VITE_APP_NAME="Pivot" \
    --env VITE_APP_URL="https://pivot.guillaume-lcte.fr" \
    pivot-fixed:latest

echo "✅ Service déployé !"
sleep 10

# Vérifier le statut
docker service ls | grep pivot
echo ""
echo "🌐 Application accessible sur: https://pivot.guillaume-lcte.fr"
echo "🔍 Health check: https://pivot.guillaume-lcte.fr/health"

# Nettoyer
rm -rf /tmp/pivot-quick
EOF

echo "🎉 Déploiement terminé !" 