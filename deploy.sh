#!/bin/bash

echo "🚀 Déploiement de Pivot sur Dokploy"
echo "=================================="

# Variables
SERVER="ubuntu@guillaume-lcte.fr"
APP_NAME="pivot"
DOMAIN="pivot.guillaume-lcte.fr"

# Couleurs pour les logs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Étape 1: Vérification de l'environnement local${NC}"
if [ ! -f "Dockerfile" ]; then
    echo -e "${RED}❌ Dockerfile non trouvé${NC}"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Fichier .env non trouvé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Fichiers de configuration trouvés${NC}"

echo -e "${YELLOW}🔧 Étape 2: Build de l'application${NC}"
echo "Compilation des assets..."
npm install
npm run build

echo -e "${YELLOW}📤 Étape 3: Envoi des fichiers sur le serveur${NC}"
rsync -avz --exclude-from='.gitignore' \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='vendor' \
    --exclude='.env.local' \
    ./ $SERVER:/tmp/pivot-deploy/

echo -e "${YELLOW}🐳 Étape 4: Déploiement via Docker sur le serveur${NC}"
ssh $SERVER << 'EOF'
    cd /tmp/pivot-deploy
    
    # Arrêter les anciens services s'ils existent
    echo "Arrêt des anciens services..."
    docker service rm pivot-awlyhs 2>/dev/null || true
    docker service rm pivot-l5ep25 2>/dev/null || true
    
    # Construire la nouvelle image
    echo "Construction de la nouvelle image..."
    docker build -t pivot:latest .
    
    # Créer le service avec la configuration Traefik appropriée
    echo "Création du nouveau service..."
    docker service create \
        --name pivot-production \
        --network dokploy-network \
        --replicas 1 \
        --constraint 'node.role==manager' \
        --label "traefik.enable=true" \
        --label "traefik.http.routers.pivot.rule=Host(\`pivot.guillaume-lcte.fr\`)" \
        --label "traefik.http.routers.pivot.entrypoints=websecure" \
        --label "traefik.http.routers.pivot.tls=true" \
        --label "traefik.http.routers.pivot.tls.certresolver=letsencrypt" \
        --label "traefik.http.services.pivot.loadbalancer.server.port=4004" \
        --label "traefik.http.services.pivot.loadbalancer.server.scheme=http" \
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
        --env DB_HOST="51.195.43.106" \
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
        pivot:latest
        
    echo "✅ Service déployé avec succès !"
    
    # Vérifier le statut du service
    sleep 5
    docker service ls | grep pivot
    
    # Nettoyer
    rm -rf /tmp/pivot-deploy
EOF

echo -e "${GREEN}🎉 Déploiement terminé !${NC}"
echo -e "${GREEN}🌐 Votre application est accessible sur: https://$DOMAIN${NC}"
echo -e "${YELLOW}📊 Pour vérifier le statut: ssh $SERVER 'docker service ls'${NC}"
echo -e "${YELLOW}📋 Pour voir les logs: ssh $SERVER 'docker service logs pivot-production'${NC}" 