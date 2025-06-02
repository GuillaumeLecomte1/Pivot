# Script de déploiement PowerShell pour Pivot sur Dokploy

Write-Host "🚀 Déploiement de Pivot sur Dokploy" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Variables
$SERVER = "ubuntu@guillaume-lcte.fr"
$APP_NAME = "pivot"
$DOMAIN = "pivot.guillaume-lcte.fr"

Write-Host "📦 Étape 1: Vérification de l'environnement local" -ForegroundColor Yellow

if (-not (Test-Path "Dockerfile")) {
    Write-Host "❌ Dockerfile non trouvé" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".env")) {
    Write-Host "❌ Fichier .env non trouvé" -ForegroundColor Red  
    exit 1
}

Write-Host "✅ Fichiers de configuration trouvés" -ForegroundColor Green

Write-Host "🔧 Étape 2: Build de l'application" -ForegroundColor Yellow
Write-Host "Compilation des assets..."
npm install
npm run build

Write-Host "📤 Étape 3: Envoi des fichiers sur le serveur" -ForegroundColor Yellow
# Utiliser scp au lieu de rsync sur Windows
scp -r -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" . $SERVER":/tmp/pivot-deploy/"

Write-Host "🐳 Étape 4: Déploiement via Docker sur le serveur" -ForegroundColor Yellow

# Commandes à exécuter sur le serveur
$remoteCommands = @"
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
"@

ssh $SERVER $remoteCommands

Write-Host "🎉 Déploiement terminé !" -ForegroundColor Green
Write-Host "🌐 Votre application est accessible sur: https://$DOMAIN" -ForegroundColor Green
Write-Host "📊 Pour vérifier le statut: ssh $SERVER 'docker service ls'" -ForegroundColor Yellow
Write-Host "📋 Pour voir les logs: ssh $SERVER 'docker service logs pivot-production'" -ForegroundColor Yellow 