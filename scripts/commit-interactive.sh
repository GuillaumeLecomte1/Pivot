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
echo "${PURPLE}║               ${WHITE}🎯 PIVOT - COMMIT INTERACTIF${PURPLE}               ║${NC}"
echo "${PURPLE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if there are staged files
if git diff --cached --quiet; then
    echo "${RED}❌ Aucun fichier stagé trouvé !${NC}"
    echo "${YELLOW}💡 Utilisez 'git add <fichiers>' avant de lancer ce script${NC}"
    echo ""
    echo "${CYAN}📋 Fichiers modifiés disponibles :${NC}"
    git status --porcelain | head -10
    echo ""
    read -p "Voulez-vous ajouter tous les fichiers modifiés ? (y/N): " add_all
    if [[ $add_all =~ ^[Yy]$ ]]; then
        git add .
        echo "${GREEN}✅ Tous les fichiers ont été ajoutés${NC}"
    else
        echo "${YELLOW}⚠️ Ajoutez manuellement vos fichiers avec 'git add <fichier>'${NC}"
        exit 1
    fi
fi

echo ""
echo "${CYAN}📋 Fichiers à commiter :${NC}"
git diff --cached --name-only | sed 's/^/  • /'
echo ""

# Gitmoji selection
echo "${PURPLE}🎨 Sélectionnez un gitmoji :${NC}"
echo ""
echo "${WHITE}1.${GREEN} ✨ feat     ${CYAN}Nouvelle fonctionnalité${NC}"
echo "${WHITE}2.${GREEN} 🐛 fix      ${CYAN}Correction de bug${NC}"  
echo "${WHITE}3.${GREEN} 📚 docs     ${CYAN}Documentation${NC}"
echo "${WHITE}4.${GREEN} 💄 style    ${CYAN}Style/UI/UX${NC}"
echo "${WHITE}5.${GREEN} ♻️  refactor ${CYAN}Refactorisation${NC}"
echo "${WHITE}6.${GREEN} ⚡ perf     ${CYAN}Performance${NC}"
echo "${WHITE}7.${GREEN} ✅ test     ${CYAN}Tests${NC}"
echo "${WHITE}8.${GREEN} 🔧 chore    ${CYAN}Maintenance${NC}"
echo "${WHITE}9.${GREEN} 🚀 build    ${CYAN}Build/Deploy${NC}"
echo ""

while true; do
    read -p "Choisissez (1-9): " choice
    case $choice in
        1) gitmoji="✨"; type="feat"; break;;
        2) gitmoji="🐛"; type="fix"; break;;
        3) gitmoji="📚"; type="docs"; break;;
        4) gitmoji="💄"; type="style"; break;;
        5) gitmoji="♻️"; type="refactor"; break;;
        6) gitmoji="⚡"; type="perf"; break;;
        7) gitmoji="✅"; type="test"; break;;
        8) gitmoji="🔧"; type="chore"; break;;
        9) gitmoji="🚀"; type="build"; break;;
        *) echo "${RED}❌ Choix invalide. Choisissez entre 1 et 9.${NC}";;
    esac
done

echo ""
echo "${GREEN}✅ Sélectionné: ${gitmoji} ${type}${NC}"
echo ""

# Commit message
echo ""
read -p "${CYAN}💬 Description du commit: ${NC}" description

if [ -z "$description" ]; then
    echo "${RED}❌ La description ne peut pas être vide${NC}"
    exit 1
fi

# Build full commit message (gitmoji + type: description)
full_msg="${gitmoji} ${type}: ${description}"

echo ""
echo "${PURPLE}📝 Message de commit généré :${NC}"
echo "${WHITE}${full_msg}${NC}"
echo ""

read -p "Confirmer ce commit ? (Y/n): " confirm
if [[ $confirm =~ ^[Nn]$ ]]; then
    echo "${YELLOW}❌ Commit annulé${NC}"
    exit 1
fi

echo ""
echo "${CYAN}🚀 Lancement du commit...${NC}"
echo ""

# Perform the commit
if git commit -m "$full_msg"; then
    echo ""
    echo "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
    echo "${GREEN}║                 ${WHITE}✅ COMMIT RÉUSSI !${GREEN}                     ║${NC}"
    echo "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    # Ask for push
    read -p "${CYAN}🚀 Voulez-vous pusher vers le remote ? (Y/n): ${NC}" push_confirm
    if [[ ! $push_confirm =~ ^[Nn]$ ]]; then
        echo ""
        echo "${CYAN}📤 Push en cours...${NC}"
        
        # Get current branch
        current_branch=$(git branch --show-current)
        
        if git push origin "$current_branch"; then
            echo ""
            echo "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
            echo "${GREEN}║                  ${WHITE}🎉 PUSH RÉUSSI !${GREEN}                      ║${NC}"
            echo "${GREEN}║            Vos changements sont en ligne !               ║${NC}"
            echo "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
        else
            echo ""
            echo "${RED}╔══════════════════════════════════════════════════════════╗${NC}"
            echo "${RED}║                  ${WHITE}❌ PUSH ÉCHOUÉ${RED}                       ║${NC}"
            echo "${RED}║           Vérifiez votre connexion/permissions           ║${NC}"
            echo "${RED}╚══════════════════════════════════════════════════════════╝${NC}"
        fi
    else
        echo ""
        echo "${YELLOW}📝 Commit local effectué. Push manuel requis.${NC}"
    fi
else
    echo ""
    echo "${RED}╔══════════════════════════════════════════════════════════╗${NC}"
    echo "${RED}║                 ${WHITE}❌ COMMIT ÉCHOUÉ${RED}                       ║${NC}"
    echo "${RED}║          Les hooks pre-commit ont détecté des erreurs     ║${NC}"
    echo "${RED}╚══════════════════════════════════════════════════════════╝${NC}"
    exit 1
fi