# 🎯 Pivot - Application Laravel

Application Laravel moderne déployée automatiquement sur Dokploy.

## 🚀 **Déploiement Automatique Simplifié**

**Workflow ultra-rapide :**
```
Cursor → GitHub → Dokploy → Production
```

### ✅ **Configuration Actuelle**
- **Domaine** : [pivot.guillaume-lcte.fr](https://pivot.guillaume-lcte.fr)
- **Status** : ✅ **FONCTIONNEL**
- **Auto-deploy** : Direct depuis GitHub (sans CI/CD)
- **SSL** : Let's Encrypt automatique
- **Port** : 4004

### 🚀 **Pour Déployer (Ultra-rapide)**

```bash
# 1. Modifier le code dans Cursor
# 2. Commit et push
git add .
git commit -m "feat: votre modification"
git push origin main

# 3. Dokploy détecte automatiquement et redéploie
# ⏱️ Déploiement en ~30 secondes (sans CI/CD)
```

### 🩺 **Surveillance**

- **Health Check** : `https://pivot.guillaume-lcte.fr/health`
- **Application** : `https://pivot.guillaume-lcte.fr/`
- **Dokploy Interface** : `http://guillaume-lcte.fr:3000`

### 🔧 **Variables d'Environnement**

Configurées dans Dokploy :
- `DB_HOST=code-db-1` (MySQL container)
- `DB_DATABASE=mysql`
- `DB_USERNAME=phpmyadmin`
- Base de données connectée ✅

### 🎯 **Architecture Simplifiée**

```
GitHub → Webhook → Dokploy → Docker Build → Traefik → HTTPS
                                    ↓
                              MySQL (code-db-1)
```

**Performance** : Déploiement direct sans étapes intermédiaires

---

**Status** : ✅ **PRODUCTION READY** - Déploiement simplifié configuré 