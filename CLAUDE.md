# 🎯 Pivot - Architecture & Excellence Technique

> **Claude AI - Senior Technical Architect**  
> *Stack moderne Laravel 12 + React 19 + TypeScript - Performance & DX optimisés*

## 📋 Architecture du projet

**Stack technique :**
- **Backend :** Laravel 12
- **Frontend :** React 19 + TypeScript + Inertia.js
- **CSS :** Tailwind CSS v4
- **Components :** Radix UI + shadcn/ui patterns
- **Build :** Vite 6
- **Quality :** Biome, Pint, Larastan, Husky

## 🛠️ Commandes essentielles

### Développement
```bash
npm run dev          # Serveur de développement Vite
php artisan serve    # Serveur Laravel
```

### Code Quality
```bash
npm run check        # Biome check + format + lint (auto-fix)
./vendor/bin/pint    # Format PHP (auto-fix)
npm run types        # Vérification TypeScript
./vendor/bin/phpstan # Analyse statique PHP
```

### Tests
```bash
php artisan test     # Tests PHP
```

## 📁 Structure des fichiers

```
app/                 # Code PHP Laravel
resources/js/        # Code React/TypeScript
├── Components/      # Composants réutilisables
├── Pages/          # Pages Inertia
├── Layouts/        # Layouts de page
└── types/          # Types TypeScript
resources/css/      # Styles CSS/Tailwind
```

## 🎨 Standards de code

### TypeScript/React
- **Indentation :** 4 espaces
- **Quotes :** Simple quotes (`'`) pour JS, double quotes (`"`) pour JSX
- **Largeur ligne :** 150 caractères
- **Conventions :** PascalCase pour composants, camelCase pour variables
- **Imports :** Organisation automatique avec Biome

### PHP
- **Standard :** Laravel Pint (PSR-12 étendu)
- **Analyse :** PHPStan level 4 (équilibré)
- **Conventions :** Laravel standards

### CSS
- **Framework :** Tailwind CSS v4
- **Classes :** Ordonnées avec `useSortedClasses`
- **Responsive :** Mobile-first

## 🔧 Configuration Git

### Hooks automatiques
- **pre-commit :** Format + lint automatique
- **commit-msg :** Validation format conventional

### Format des commits
```
type(scope): description

Types valides: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
```

## 🚀 Workflow de développement

1. **Développement :** Les hooks auto-corrigent le code
2. **Commit :** Format automatique + validation
3. **Push :** Code propre et conforme

## 🧩 Composants UI

**Base :** Radix UI + patterns shadcn/ui
**Styling :** Tailwind CSS + class-variance-authority
**Icons :** Lucide React
**Animations :** Framer Motion

## 📦 Dépendances principales

### Frontend
- React 19 + TypeScript 5.7
- Inertia.js pour SPA Laravel
- Tailwind CSS v4 + plugins
- Radix UI pour primitives accessibles

### Backend  
- Laravel 12 avec Inertia
- PHPStan + Larastan pour analyse
- Laravel Pint pour formatage

### DevTools
- Vite 6 pour build rapide
- Biome pour JS/TS tooling
- Husky pour git hooks
- lint-staged pour commits propres

## 🏪 Vision CTO - Marketplace Expert

### 🎯 **PIVOT : Marketplace B2C Ressourceries Françaises**

En tant que **Senior Marketplace Architect**, ma vision pour Pivot :

**Business Model :**
- **Click-and-Collect** spécialisé ressourceries françaises 
- **Économie circulaire** : produits vintage/seconde main
- **Tiers de confiance** : commission + curation manuelle
- **Impact social** : soutien économie locale + insertion pro

### 🚀 Architecture Marketplace

**Scalabilité cible :**
- **Multi-vendor** : 1000+ ressourceries partenaires
- **Geo-localisé** : département français (Maine-et-Loire → national)
- **High-traffic** : 100k produits, 50k utilisateurs actifs
- **Mobile-first** : 70% trafic mobile attendu

**Stack optimisée marketplace :**
- **Laravel 12** : API robuste, jobs queues, cache Redis
- **React 19** : UX fluide, concurrent rendering pour catalogue
- **TypeScript** : type-safety business logic complexe
- **Algolia** : search instantané produits/ressourceries

### ⚡ Optimisations Marketplace

**Catalogue Performance :**
```typescript
// React 19 pour catalogue 100k+ produits
import { useTransition, useDeferredValue } from 'react'
// Virtual scrolling pour listings infinis
// Image lazy loading + WebP optimization
// Search debouncing + cache local
```

**Backend E-commerce :**
```php
// Laravel Marketplace patterns
// Event-driven architecture : OrderCreated, ProductViewed
// Queue jobs : EmailNotifications, ImageProcessing  
// Cache stratégies : Redis pour catégories, Memcached sessions
// Database indexing : geo-spatial, full-text search
```

### 🎯 Patterns Marketplace Essentiels

1. **Multi-tenant Architecture** - Ressourceries isolées
2. **Event Sourcing** - Audit trail transactions
3. **CQRS** - Read/Write models séparés catalogue
4. **Circuit Breaker** - Resilience APIs externes
5. **Saga Pattern** - Transactions distribuées commandes

### 🔥 KPIs Marketplace

**Performance :**
- **Search Results** < 200ms (Algolia)
- **Product Page** < 1s (image optimization)
- **Mobile Conversion** > 3.5% (UX optimisée)
- **SEO Catalogue** : 100k pages indexées

**Business Metrics :**
- **GMV** (Gross Merchandise Value) : objectif croissance
- **Take Rate** : commission ressourceries
- **Retention** : utilisateurs actifs mensuel
- **LTV/CAC** : rentabilité acquisition

### 💎 Marketplace Standards

**Code E-commerce :**
- **Domain-Driven Design** : Product, Order, User contexts
- **API-First** : headless commerce ready
- **Security** : PCI DSS compliance, RGPD
- **Monitoring** : APM + business metrics

**Scalabilité :**
- **Database sharding** par département
- **CDN** global images produits  
- **Load balancing** multi-région
- **Cache layers** : L1 browser, L2 edge, L3 database

## 🏗️ Roadmap Technique CTO

### **Phase 1 : MVP Foundation** *(Actuel)*
- ✅ UI/UX marketplace complète
- 🔄 Models : Product, Ressourcerie, Order
- 🔄 Auth system + user profiles
- 🔄 Basic search & filtering

### **Phase 2 : Core Commerce** *(3-6 mois)*
- Payment integration (Stripe/PayPal)
- Order management + notifications
- Ressourcerie dashboard
- Advanced search (Algolia)

### **Phase 3 : Scale & Optimize** *(6-12 mois)*
- Multi-region deployment
- AI recommendations
- Mobile app (React Native)
- Analytics & BI dashboard

### **Phase 4 : Market Leader** *(12+ mois)*
- API marketplace (B2B)
- White-label solutions
- International expansion
- Blockchain provenance