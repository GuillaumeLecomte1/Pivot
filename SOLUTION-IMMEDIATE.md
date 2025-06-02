# 🚀 Solution Immédiate - Déploiement Pivot

## ⚡ Résumé du Problème
- **Bad Gateway 502** ✅ **IDENTIFIÉ**
- **Cause** : `DB_HOST=51.195.43.106` au lieu de `DB_HOST=code-db-1`
- **Solution** : Déployer via l'interface Dokploy avec la bonne config

## 🎯 Déploiement Immédiat (5 minutes)

### **1. Accédez à Dokploy**
```
http://51.195.43.106:3000
```

### **2. Créer une Nouvelle Application**
1. Cliquez sur **"Applications"** 
2. Cliquez sur **"Create Application"**
3. Remplissez :
   - **Name**: `pivot`
   - **Application Type**: `Application`

### **3. Configuration Source**
```
Source Type: Git
Repository: https://github.com/votre-username/pivot.git  
Branch: main
Build Path: .
Build Type: Dockerfile
```

### **4. VARIABLES D'ENVIRONNEMENT CRITIQUES**
```env
# CONFIGURATION CORRIGÉE POUR MYSQL
DB_HOST=code-db-1
DB_PORT=3306
DB_DATABASE=pivot
DB_USERNAME=pivot
DB_PASSWORD=pivot

# AUTRES VARIABLES
APP_NAME=Pivot
APP_ENV=production
APP_KEY=base64:gmBDzoUYk3CFz7M2ePt3hC+wUyIPvggqmyOd9EZRL94=
APP_DEBUG=false
APP_URL=https://pivot.guillaume-lcte.fr
ASSET_URL=https://pivot.guillaume-lcte.fr
FORCE_HTTPS=true
```

### **5. Configuration Domaine**
```
Host: pivot.guillaume-lcte.fr
Path: /
Port: 4004
HTTPS: ✅ Enabled
Certificate: Let's Encrypt
```

### **6. Cliquez sur "Deploy"**

---

## 🔧 Alternative : Via CLI (si préféré)

Si vous préférez créer manuellement via CLI :

```bash
# Push votre code sur GitHub d'abord
git add .
git commit -m "Configuration corrigée pour Dokploy"
git push origin main

# Puis créer le service correctement
ssh ubuntu@guillaume-lcte.fr << 'EOF'
docker service create \
    --name pivot-app \
    --network dokploy-network \
    --replicas 1 \
    --label "traefik.enable=true" \
    --label "traefik.http.routers.pivot-app.rule=Host(\`pivot.guillaume-lcte.fr\`)" \
    --label "traefik.http.routers.pivot-app.entrypoints=websecure" \
    --label "traefik.http.routers.pivot-app.tls=true" \
    --label "traefik.http.routers.pivot-app.tls.certresolver=letsencrypt" \
    --label "traefik.http.services.pivot-app.loadbalancer.server.port=4004" \
    --env DB_HOST=code-db-1 \
    --env DB_PORT=3306 \
    --env DB_DATABASE=pivot \
    --env DB_USERNAME=pivot \
    --env DB_PASSWORD=pivot \
    --env APP_URL=https://pivot.guillaume-lcte.fr \
    --env APP_ENV=production \
    --env APP_DEBUG=false \
    pivot-app:latest
EOF
```

---

## ✅ Vérification

Une fois déployé :

1. **Status**: `docker service ls`
2. **Logs**: Via l'interface Dokploy
3. **Test**: https://pivot.guillaume-lcte.fr
4. **Health**: https://pivot.guillaume-lcte.fr/health

---

## 🚀 Auto-Déploiement GitHub (Une fois que ça marche)

**Étape 1**: Dans Dokploy, activez **"Auto Deploy"**
**Étape 2**: Copiez l'URL du webhook généré
**Étape 3**: Dans GitHub → Settings → Webhooks → Ajoutez l'URL

**Result**: Chaque push sur `main` = déploiement automatique ! 🎉

---

## 📋 Récapitulatif

**Problème résolu** : `DB_HOST=code-db-1` au lieu de l'IP externe
**Next Steps** : 
1. ✅ Déployer avec la bonne config  
2. ✅ Tester que ça marche
3. ✅ Activer l'auto-deploy

**L'application sera en ligne dans 5 minutes maximum ! 🚀** 