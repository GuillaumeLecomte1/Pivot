# 🎯 Pivot - Application Laravel

Application Laravel moderne déployée automatiquement sur Dokploy depuis GitHub.

## 🚀 **Déploiement Automatique**

Cette application est configurée pour le déploiement automatique :

### ✅ **Configuration Actuelle**
- **Domaine** : [pivot.guillaume-lcte.fr](https://pivot.guillaume-lcte.fr)
- **Base de données** : MySQL existante (code-db-1)
- **Auto-deploy** : Activé sur push vers `main`
- **SSL** : Let's Encrypt automatique
- **Port** : 4004

### 🔧 **Variables d'Environnement Configurées**
-

## 🚀 **Pour Déployer**

```bash
# 1. Faire vos modifications
git add .
git commit -m "feat: votre modification"

# 2. Push pour déclencher le déploiement automatique
git push origin main
```

Le déploiement se fait automatiquement via :
- ✅ GitHub Actions (CI/CD)
- ✅ Dokploy (container orchestration)
- ✅ Traefik (reverse proxy + SSL)

## 🩺 **Surveillance**

- **Health Check** : `https://pivot.guillaume-lcte.fr/health`
- **Logs Dokploy** : Interface web sur port 3000
- **Monitoring** : Traefik dashboard port 8080

## 🔧 **Développement Local**

```bash
# Installation
composer install
npm install
npm run build

# Configuration
cp .env.example .env
php artisan key:generate

# Base de données
php artisan migrate --seed

# Serveur de développement
php artisan serve
```

## 📁 **Structure Docker**

```
docker/
├── nginx.conf      # Configuration Nginx (port 4004)
├── start.sh       # Script de démarrage optimisé  
├── healthcheck.sh # Vérification de santé
└── supervisord.conf # Process management
```

## 🌐 **Architecture de Production**

```
GitHub → Actions → Dokploy → Docker → Traefik → pivot.guillaume-lcte.fr
                      ↓
                   MySQL (code-db-1)
```

---

**Status** : ✅ Production Ready - Auto-deploy configuré 