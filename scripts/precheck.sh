#!/bin/bash

# Detect terminal capabilities
if [ -t 1 ] && command -v tput > /dev/null 2>&1 && tput colors > /dev/null 2>&1; then
    # Colors for better visual output
    RED=$(tput setaf 1)
    GREEN=$(tput setaf 2)
    YELLOW=$(tput setaf 3)
    BLUE=$(tput setaf 4)
    PURPLE=$(tput setaf 5)
    CYAN=$(tput setaf 6)
    WHITE=$(tput setaf 7; tput bold)
    NC=$(tput sgr0) # No Color
else
    # No colors for basic terminals
    RED=''
    GREEN=''
    YELLOW=''
    BLUE=''
    PURPLE=''
    CYAN=''
    WHITE=''
    NC=''
fi

# Clear screen and show header
clear
echo "${PURPLE}╔══════════════════════════════════════════════════════════╗${NC}"
echo "${PURPLE}║                  ${WHITE}🔍 PIVOT PRECHECK${PURPLE}                     ║${NC}"
echo "${PURPLE}║          Vérification SANS modification Git              ║${NC}"
echo "${PURPLE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check for staged files first
if ! git diff --cached --quiet; then
    echo "${BLUE}📋 Fichiers stagés détectés :${NC}"
    git diff --cached --name-only | sed 's/^/  • /'
    echo ""
    echo "${CYAN}🔍 Vérification des fichiers stagés...${NC}"
    check_mode="staged"
elif ! git diff --quiet; then
    echo "${YELLOW}⚠️  Aucun fichier stagé, mais des modifications détectées${NC}"
    echo ""
    echo "${BLUE}📋 Fichiers modifiés (non stagés) :${NC}"
    git diff --name-only | sed 's/^/  • /'
    echo ""
    echo "${CYAN}💡 Pour un test complet, stagez vos fichiers avec: ${WHITE}git add .${NC}"
    echo "${CYAN}🔍 Vérification des fichiers modifiés (mode simulation)...${NC}"
    check_mode="modified"
else
    echo "${GREEN}✅ Aucun changement détecté${NC}"
    echo "${YELLOW}💡 Workspace propre, rien à vérifier${NC}"
    exit 0
fi

echo ""

# ==============================================================================
# STEP 1: PRE-COMMIT CHECKS (lint-staged simulation)
# ==============================================================================
echo "${PURPLE}🚀 ÉTAPE 1/2: Vérifications pre-commit${NC}"
echo "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Manual checks simulation (without modifying files)
echo "${CYAN}🔍 Simulation des vérifications (lecture seule)...${NC}"
echo ""

precommit_success=true

# Check JavaScript/TypeScript files
if [ "$check_mode" = "staged" ]; then
    js_files=$(git diff --cached --name-only | grep -E '\.(js|jsx|ts|tsx)$' || true)
else
    js_files=$(git diff --name-only | grep -E '\.(js|jsx|ts|tsx)$' || true)
fi

if [ -n "$js_files" ]; then
    echo "${CYAN}🔧 Vérification JavaScript/TypeScript avec Biome...${NC}"
    if echo "$js_files" | xargs npx biome check --no-errors-on-unmatched; then
        echo "${GREEN}✅ Biome: OK${NC}"
    else
        echo "${RED}❌ Biome: Erreurs détectées${NC}"
        echo "${YELLOW}💡 Corrigez avec: ${WHITE}npx biome check --write .${NC}"
        precommit_success=false
    fi
    echo ""
fi

# Check PHP files
if [ "$check_mode" = "staged" ]; then
    php_files=$(git diff --cached --name-only | grep -E '\.php$' || true)
else
    php_files=$(git diff --name-only | grep -E '\.php$' || true)
fi

if [ -n "$php_files" ]; then
    echo "${CYAN}🎨 Vérification PHP avec Laravel Pint...${NC}"
    if echo "$php_files" | xargs ./vendor/bin/pint --test --quiet; then
        echo "${GREEN}✅ Laravel Pint: OK${NC}"
    else
        echo "${RED}❌ Laravel Pint: Erreurs de formatage${NC}"
        echo "${YELLOW}💡 Corrigez avec: ${WHITE}./vendor/bin/pint${NC}"
        precommit_success=false
    fi
    
    echo "${CYAN}🔍 Analyse statique PHP avec PHPStan...${NC}"
    if echo "$php_files" | xargs ./vendor/bin/phpstan analyse --no-progress --quiet --memory-limit=512M; then
        echo "${GREEN}✅ PHPStan: OK${NC}"
    else
        echo "${RED}❌ PHPStan: Erreurs détectées${NC}"
        echo "${YELLOW}💡 Vérifiez les erreurs PHPStan ci-dessus${NC}"
        precommit_success=false
    fi
    echo ""
fi

# Check package.json
if [ "$check_mode" = "staged" ]; then
    package_changed=$(git diff --cached --name-only | grep -E 'package\.json$' || true)
else
    package_changed=$(git diff --name-only | grep -E 'package\.json$' || true)
fi

if [ -n "$package_changed" ]; then
    echo "${CYAN}📦 Vérification package.json...${NC}"
    if npx biome format package.json > /dev/null 2>&1; then
        echo "${GREEN}✅ Package.json: OK${NC}"
    else
        echo "${RED}❌ Package.json: Erreurs de formatage${NC}"
        precommit_success=false
    fi
    echo ""
fi

if [ "$precommit_success" = true ]; then
    echo "${GREEN}✅ Pre-commit: SUCCÈS !${NC}"
    echo "${GREEN}   Toutes les vérifications ont réussi${NC}"
else
    echo "${RED}❌ Pre-commit: ÉCHEC !${NC}"
    echo "${RED}   Des erreurs ont été détectées${NC}"
fi

echo ""

# ==============================================================================
# STEP 2: COMMIT MESSAGE FORMAT INFO
# ==============================================================================
echo "${PURPLE}🚀 ÉTAPE 2/2: Format de message de commit${NC}"
echo "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo ""

echo "${CYAN}📝 Format attendu pour les messages de commit :${NC}"
echo ""
echo "${WHITE}🎯 Structure :${NC} ${YELLOW}gitmoji type: description${NC}"
echo ""
echo "${WHITE}📋 Types valides :${NC}"
echo "  ${GREEN}feat${NC}     - Nouvelle fonctionnalité"
echo "  ${GREEN}fix${NC}      - Correction de bug"
echo "  ${GREEN}docs${NC}     - Documentation"
echo "  ${GREEN}style${NC}    - Style/UI/UX"
echo "  ${GREEN}refactor${NC} - Refactorisation"
echo "  ${GREEN}perf${NC}     - Performance"
echo "  ${GREEN}test${NC}     - Tests"
echo "  ${GREEN}chore${NC}    - Maintenance"
echo "  ${GREEN}build${NC}    - Build/Deploy"
echo ""
echo "${CYAN}💡 Exemples valides :${NC}"
echo "  ${WHITE}✨ feat: add shopping cart functionality${NC}"
echo "  ${WHITE}🐛 fix: resolve CSRF token issue${NC}"
echo "  ${WHITE}📚 docs: update installation guide${NC}"
echo ""

# ==============================================================================
# FINAL RESULTS
# ==============================================================================
echo "${PURPLE}╔══════════════════════════════════════════════════════════╗${NC}"
echo "${PURPLE}║                  ${WHITE}📊 RÉSULTATS FINAUX${PURPLE}                   ║${NC}"
echo "${PURPLE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

if [ "$precommit_success" = true ]; then
    echo "${GREEN}✅ Pre-commit hooks:    SUCCÈS${NC}"
    echo "${GREEN}✅ Commit-msg format:   RAPPEL AFFICHÉ${NC}"
    echo ""
    echo "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
    echo "${GREEN}║                    ${WHITE}🎉 SUCCÈS TOTAL !${GREEN}                    ║${NC}"
    echo "${GREEN}║           Votre commit devrait passer sans problème        ║${NC}"
    echo "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "${CYAN}💡 Vous pouvez maintenant lancer: ${WHITE}npm run commit${NC}"
    exit 0
else
    echo "${RED}❌ Pre-commit hooks:    ÉCHEC${NC}"
    echo "${YELLOW}⚠️  Commit-msg format:  RAPPEL AFFICHÉ${NC}"
    echo ""
    echo "${RED}╔══════════════════════════════════════════════════════════╗${NC}"
    echo "${RED}║                   ${WHITE}❌ ÉCHEC DÉTECTÉ !${RED}                     ║${NC}"
    echo "${RED}║           Corrigez les erreurs avant de commiter          ║${NC}"
    echo "${RED}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "${YELLOW}💡 Relancez le precheck après correction${NC}"
    exit 1
fi