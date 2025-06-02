# 🚀 Guide de Déploiement Pivot sur Dokploy

## 📋 Prérequis

### Serveur Dokploy
- ✅ **Dokploy installé et fonctionnel** (vérifié)
- ✅ **Traefik configuré** (ports 80, 443, 8080 ouverts)
- ✅ **Docker Swarm initialisé**
- ✅ **Réseau dokploy-network créé**
- ✅ **Base de données MySQL externe accessible**

### Environnement Local
- Node.js et npm installés
- SSH configuré pour se connecter au serveur
- Git pour la gestion du code

## 🔧 Configuration Actuelle

### Domaine
- **URL**: https://pivot.guillaume-lcte.fr
- **Port**: 4004
- **HTTPS**: Activé avec Let's Encrypt
- **Traefik**: Configuration automatique

### Base de Données
- **Type**: MySQL 8.0
- **Host**: 51.195.43.106:3306
- **Database**: pivot
- **Credentials**: pivot/pivot

### Services Dokploy Actifs
```
dokploy            replicated   1/1    dokploy/dokploy:latest
dokploy-postgres   replicated   1/1    postgres:16
dokploy-redis      replicated   1/1    redis:7
```

## 🚀 Méthodes de Déploiement

### Option 1: Script Automatisé (Recommandé)

#### Sur Windows (PowerShell)
```powershell
.\deploy.ps1
```

#### Sur Linux/Mac (Bash)
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Déploiement Manuel

#### 1. Build local
```bash
npm install
npm run build
```

#### 2. Envoi sur le serveur
```bash
# Créer le dossier temporaire
ssh ubuntu@guillaume-lcte.fr "mkdir -p /tmp/pivot-deploy"

# Copier les fichiers (exclure node_modules, .git, etc.)
scp -r . ubuntu@guillaume-lcte.fr:/tmp/pivot-deploy/
```

#### 3. Build et déploiement sur serveur
```bash
ssh ubuntu@guillaume-lcte.fr << 'EOF'
cd /tmp/pivot-deploy

# Nettoyer les anciens services
docker service rm pivot-awlyhs 2>/dev/null || true
docker service rm pivot-l5ep25 2>/dev/null || true

# Build nouvelle image
docker build -t pivot:latest .

# Créer le nouveau service
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
    --env DB_CONNECTION="mysql" \
    --env DB_HOST="51.195.43.106" \
    --env DB_PORT="3306" \
    --env DB_DATABASE="pivot" \
    --env DB_USERNAME="pivot" \
    --env DB_PASSWORD="pivot" \
    --env SESSION_SECURE_COOKIE="true" \
    --env SESSION_DOMAIN=".guillaume-lcte.fr" \
    --env MAIL_FROM_ADDRESS="noreply@guillaume-lcte.fr" \
    --env VITE_APP_URL="https://pivot.guillaume-lcte.fr" \
    pivot:latest

# Nettoyer
rm -rf /tmp/pivot-deploy
EOF
```

## 📊 Monitoring et Maintenance

### Vérifier le statut des services
```bash
ssh ubuntu@guillaume-lcte.fr "docker service ls"
```

### Voir les logs de l'application
```bash
ssh ubuntu@guillaume-lcte.fr "docker service logs pivot-production -f"
```

### Redémarrer le service
```bash
ssh ubuntu@guillaume-lcte.fr "docker service update --force pivot-production"
```

### Scaler l'application
```bash
ssh ubuntu@guillaume-lcte.fr "docker service scale pivot-production=2"
```

## 🔍 Diagnostics

### Health Check
L'application expose un endpoint de santé: `https://pivot.guillaume-lcte.fr/health`

### Vérifier la connexion à la base de données
```bash
ssh ubuntu@guillaume-lcte.fr "docker exec -it \$(docker ps -q -f name=pivot-production) php artisan migrate:status"
```

### Logs détaillés
```bash
ssh ubuntu@guillaume-lcte.fr "docker service logs pivot-production --details --timestamps"
```

## 🔐 Sécurité et Bonnes Pratiques

### Variables d'environnement sensibles
- ✅ APP_KEY configuré et sécurisé
- ✅ APP_DEBUG=false en production
- ✅ HTTPS forcé
- ✅ Sessions sécurisées

### SSL/TLS
- ✅ Certificat Let's Encrypt automatique via Traefik
- ✅ Redirection HTTP → HTTPS
- ✅ HSTS configuré

### Sauvegarde
- Base de données externe (hors Docker)
- Stockage des fichiers: répertoire `/var/www/html/storage`

## 🎯 URLs et Accès

- **Application**: https://pivot.guillaume-lcte.fr
- **Health Check**: https://pivot.guillaume-lcte.fr/health  
- **Traefik Dashboard**: http://51.195.43.106:8080
- **Dokploy Dashboard**: http://51.195.43.106:3000

## 🚨 Dépannage

### Service ne démarre pas
1. Vérifier les logs: `docker service logs pivot-production`
2. Vérifier l'image: `docker images | grep pivot`
3. Vérifier le réseau: `docker network ls | grep dokploy`

### Problème de certificat SSL
1. Vérifier Traefik: `docker service logs dokploy-traefik`
2. Forcer le renouvellement: redéployer avec `--force`

### Base de données inaccessible
1. Tester la connexion: `telnet 51.195.43.106 3306`
2. Vérifier les credentials dans les variables d'environnement

---

## 🎉 Résumé

Votre application Pivot est maintenant configurée pour être déployée sur Dokploy avec:
- ✅ Configuration Docker optimisée
- ✅ Traefik et SSL automatique
- ✅ Health checks
- ✅ Variables d'environnement sécurisées
- ✅ Scripts de déploiement automatisés

**Pour déployer maintenant, exécutez simplement**: `.\deploy.ps1` 