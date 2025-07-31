# 🎯 Pivot - La marketplace des ressourceries françaises

Pivot est la première plateforme de click-and-collect dédiée aux ressourceries en France. Elle permet de mettre en lumière les produits cachés dans les ressourceries et de donner une seconde vie aux objets.

## 📋 Description du projet

Pivot connecte les ressourceries françaises avec les consommateurs souhaitant acheter des produits de seconde main. La plateforme permet :

-   **Aux ressourceries** : De digitaliser leur inventaire et d'augmenter leur visibilité
-   **Aux consommateurs** : De découvrir et réserver des produits uniques près de chez eux
-   **À l'économie circulaire** : De se développer grâce à une solution moderne et accessible

### ✨ Fonctionnalités principales

-   🛍️ Catalogue de produits des ressourceries partenaires
-   🗺️ Localisation des ressourceries
-   🔍 Recherche avancée par catégories
-   ❤️ Système de favoris
-   🌙 Mode sombre/clair
-   📱 Interface responsive

## 🛠️ Technologies utilisées

### Backend

-   **Laravel 11** - Framework PHP moderne
-   **PHP 8.3** - Langage de programmation
-   **MySQL** - Base de données relationnelle
-   **Inertia.js** - Liaison frontend/backend

### Frontend

-   **React 19** - Bibliothèque JavaScript
-   **TypeScript** - Typage statique
-   **Tailwind CSS 4** - Framework CSS utilitaire
-   **Vite 6** - Bundler moderne
-   **Radix UI** - Composants accessibles
-   **Lucide React** - Icônes

### Outils de développement

-   **Biome** - Linter et formateur ultra-rapide (remplace Prettier + ESLint)
-   **Husky** - Git hooks pour pre-commit validation
-   **Laravel Pint** - Formateur de code PHP
-   **PHPStan/Larastan** - Analyse statique PHP
-   **Commitlint** - Validation des messages de commit
-   **Docker** - Conteneurisation
-   **Composer** - Gestionnaire de dépendances PHP
-   **NPM** - Gestionnaire de dépendances JavaScript

## 🚀 Installation et lancement du projet

### Prérequis

-   PHP 8.3+
-   Composer
-   Node.js 18+
-   NPM
-   MySQL

### Installation

1. **Cloner le repository**

```bash
git clone <url-du-repo>
cd Pivot
```

2. **Installer les dépendances PHP**

```bash
composer install
```

3. **Installer les dépendances JavaScript**

```bash
npm install
```

4. **Configuration de l'environnement**

```bash
cp .env.example .env
php artisan key:generate
```

5. **Configurer la base de données**
   Modifier le fichier `.env` avec vos paramètres de base de données :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. **Créer la base de données**

```bash
# Créer la base de données
touch database/database.sqlite  # Pour SQLite (alternative)
# OU configurer MySQL

# Lancer les migrations
php artisan migrate
```

### Lancement du projet

1. **Démarrer le serveur Laravel**

```bash
php artisan serve
```

_L'application sera accessible sur http://localhost:8000_

2. **Démarrer Vite (dans un autre terminal)**

```bash
npm run dev
```

_Le serveur de développement Vite sera sur http://localhost:5173_

### Scripts disponibles

```bash
# Développement
npm run dev              # Lance Vite en mode développement
php artisan serve        # Lance le serveur Laravel

# Production
npm run build           # Build de production
npm run build:ssr       # Build avec SSR

# Code quality
npm run format          # Formate le code avec Biome
npm run lint            # Lint le code avec Biome
npm run check           # Vérifie et corrige le code
npm run types           # Vérification TypeScript

# Commits interactifs
npm run commit          # Interface de commit avec gitmoji et validation
```

## 🏗️ Architecture du projet

```
Pivot/
├── app/                    # Code Laravel (Contrôleurs, Modèles)
├── resources/
│   ├── js/                # Code React/TypeScript
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── layouts/       # Layouts de base
│   │   └── hooks/         # Hooks React personnalisés
│   └── css/               # Styles CSS
├── routes/                # Routes Laravel
├── database/              # Migrations et seeds
└── public/                # Assets publics
```

## 🚀 Workflow de développement

### Commits avec Gitmoji

Pivot utilise un système de commits interactif avec des gitmojis pour améliorer la lisibilité de l'historique Git.

```bash
npm run commit
```

**Interface interactive :**
1. **Sélection du gitmoji** : Choisissez parmi 9 types populaires (1-9)
2. **Description** : Rédigez votre message de commit
3. **Validation automatique** : Pre-commit hooks avec Biome, PHPStan, Laravel Pint
4. **Push automatique** : Option de push après validation réussie

**Gitmojis disponibles :**
- ✨ **feat** - Nouvelle fonctionnalité
- 🐛 **fix** - Correction de bug  
- 📚 **docs** - Documentation
- 💄 **style** - Style/UI/UX
- ♻️ **refactor** - Refactorisation
- ⚡ **perf** - Performance
- ✅ **test** - Tests
- 🔧 **chore** - Maintenance
- 🚀 **build** - Build/Deploy

**Exemple de commit généré :**
```
✨ feat: add user authentication system
```

### Pre-commit Hooks

Le projet utilise **Husky** pour exécuter automatiquement :
- **Biome** : Formatage et lint JavaScript/TypeScript
- **Laravel Pint** : Formatage du code PHP  
- **PHPStan** : Analyse statique PHP
- **Commitlint** : Validation des messages de commit

### Outils de qualité

- **Biome** (ultra-rapide) remplace Prettier + ESLint
- **Laravel Pint** pour le formatage PHP
- **Larastan/PHPStan** pour l'analyse statique
- **Conventional Commits** avec support gitmoji

## 🤝 Contribution

Les contributions sont les bienvenues ! Utilisez `npm run commit` pour respecter les conventions du projet.

## 📄 Licence

Ce projet est sous licence privée.
