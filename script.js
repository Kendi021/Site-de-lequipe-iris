/* ==========================================================================
   GESTION DU MENU MOBILE
   ========================================================================== */
// Gère l'ouverture et la fermeture du menu latéral sur mobile et tablette.
// Au clic sur le bouton croix/burger, on ajoute ou retire la classe CSS qui affiche le menu.
document.querySelectorAll("#fermer-menu").forEach(function(element) {
    element.addEventListener("click", () => {
        document.querySelector(".container").classList.toggle("afficher-menu");
    });
});

/* ==========================================================================
   FONCTION UTILITAIRE : DEBOUNCE
   ========================================================================== */
// Cette fonction sert à optimiser les performances.
// Elle empêche une fonction d'être appelée trop souvent (ex: lors du scroll).
// Elle "patiente" que l'utilisateur arrête de scroller avant de lancer l'action.
function debounce(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/* ==========================================================================
   ANIMATIONS AU DÉFILEMENT (SCROLL)
   ========================================================================== */
// Sélectionne tous les éléments HTML qui doivent s'animer (ceux avec l'attribut data-animation)
const cible = document.querySelectorAll("[data-animation]");
const classeAnimation = "anime"; // La classe CSS qui déclenche l'apparition

function animationScroll() {
    // On définit le point de déclenchement : au 3/4 de la hauteur de la fenêtre
    const hautFenetre = window.pageYOffset + ((window.innerHeight * 3) / 4);
    
    cible.forEach(function(element) {
        // Si l'élément est visible à l'écran, on ajoute la classe "anime"
        if ((hautFenetre) > element.offsetTop) {
            element.classList.add(classeAnimation);
        } else {
            // Sinon on la retire (pour pouvoir rejouer l'animation si on remonte)
            element.classList.remove(classeAnimation);
        }
    });
}

// On lance l'animation au chargement de la page et lors du scroll (avec debounce pour la fluidité)
if (cible.length) {
    animationScroll(); 
    window.addEventListener('scroll', debounce(function() {
        animationScroll();
    }, 10));
}

/* ==========================================================================
   GESTION DES FENÊTRES MODALES (POP-UPS)
   ========================================================================== */
// Ouvre une modale spécifique (ex: détail d'un projet ou CV) via son ID
function ouvrirModale(idModale) {
    const modale = document.getElementById(idModale);
    if(modale) modale.style.display = "block";
}

// Ferme la modale
function fermerModale(idModale) {
    const modale = document.getElementById(idModale);
    if(modale) modale.style.display = "none";
}

// Ferme la modale automatiquement si l'utilisateur clique sur le fond gris (en dehors du contenu)
window.onclick = function(event) {
    if (event.target.className === 'modale') {
        event.target.style.display = "none";
    }
};

/* ==========================================================================
   LOGIQUE DU TERMINAL INTERACTIF
   ========================================================================== */

// --- 1. SYSTÈME DE FICHIERS VIRTUEL ---
// Cet objet contient toutes les réponses que le terminal peut donner.
// Clé = commande tapée par l'utilisateur, Valeur = Code HTML affiché en réponse.
const fileSystem = {
    "ls": `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-top:10px;">
        <span style="color: #ffab40; font-weight:bold;">html.md</span>
        <span style="color: #40c4ff; font-weight:bold;">css.style</span>
        <span style="color: #ffd740; font-weight:bold;">script.js</span>
        <span style="color: #69f0ae; font-weight:bold;">main.py</span>
        <span style="color: #e06c75; font-weight:bold;">linux.txt</span>
        <span style="color: #29b6f6; font-weight:bold;">deploy.ps1</span>
    </div>`,

    "cat html.md": `
    <span class="output-title title-html">HTML5 & CSS3</span>
    <div class="info-grid">
        <span class="label">Niveau:</span>
        <span class="value progress-bar">[==============-------] 70%</span>
        <span class="label">Focus:</span>
        <span class="value">Structure sémantique, Responsive Design</span>
        <span class="label">Projets:</span>
        <span class="value">Sites vitrines, Intégration de maquettes</span>
    </div>`,

    "node script.js": `
    <span class="output-title title-js">JavaScript (Bases)</span>
    <div class="info-grid">
        <span class="label">Niveau:</span>
        <span class="value progress-bar">[==========----------] 45%</span>
        <span class="label">Notions:</span>
        <span class="value">Manipulation du DOM, Événements, Fonctions</span>
        <span class="label">Usage:</span>
        <span class="value">Validation de formulaires, Menus interactifs</span>
    </div>`,

    "python main.py": `
    <span class="output-title title-py">Python Scripting</span>
    <div class="info-grid">
        <span class="label">Niveau:</span>
        <span class="value progress-bar">[==========----------] 45%</span>
        <span class="label">Modules:</span>
        <span class="value">os, sys, shutil (Gestion de fichiers)</span>
        <span class="label">Usage:</span>
        <span class="value">Automatisation de tâches, Scripts de sauvegarde</span>
    </div>`,

    "cat linux.txt": `
    <span class="output-title" style="color: #e06c75; border-bottom: 1px dashed #e06c75; display:inline-block; margin-bottom:10px;">Administration Linux</span>
    <div class="info-grid">
        <span class="label">Niveau:</span>
        <span class="value progress-bar">[==============-------] 75%</span>
        <span class="label">Distros:</span>
        <span class="value">Debian, Ubuntu, CentOS, Rocky Linux</span>
        <span class="label">Compétences:</span>
        <span class="value">Bash scripting, Permissions, SSH, Systemd</span>
        <span class="label">Projets:</span>
        <span class="value">Serveur VPN automatisé, Gestion de services</span>
    </div>`,

    "active directory": `
    <span class="output-title" style="color: #29b6f6; border-bottom: 1px dashed #29b6f6; display:inline-block; margin-bottom:10px;">Active Directory & Windows Server</span>
    <div class="info-grid">
        <span class="label">Niveau:</span>
        <span class="value progress-bar">[==============-------] 60%</span>
        <span class="label">Services:</span>
        <span class="value">AD DS, DNS, DHCP, GPO</span>
        <span class="label">Outils:</span>
        <span class="value">Console RSAT, PowerShell basique</span>
        <span class="label">Tâches:</span>
        <span class="value">Gestion utilisateurs/groupes, Droits NTFS</span>
    </div>`
};

// --- 2. SÉLECTION DES ÉLÉMENTS DU DOM ---
const terminalOutput = document.getElementById("terminal-output"); // La zone où s'affiche l'historique
const hiddenInput = document.getElementById("hidden-input");       // L'input caché qui capture la frappe clavier
const visibleInput = document.getElementById("visible-input");     // La zone visible qui recopie ce qu'on tape
const terminalScreen = document.querySelector(".terminal-screen"); // L'écran global pour gérer le scroll

// Variable pour stocker le timer de l'animation d'écriture (pour pouvoir l'annuler si besoin)
let typingTimer;

// --- 3. GESTION DU FOCUS (CLAVIER) ---
function focusTerminal() {
    // IMPORTANT : On n'active le clavier QUE sur ordinateur (> 820px).
    // Sur mobile, cela évite que le clavier virtuel ne masque l'écran inutilement.
    if (window.innerWidth > 820) {
        hiddenInput.focus();
    }
}

// --- 4. SYNCHRONISATION DE LA SAISIE ---
// Recopie ce que l'utilisateur tape dans l'input caché vers l'affichage visible (style terminal)
hiddenInput.addEventListener("input", () => {
    visibleInput.textContent = hiddenInput.value;
});

// Détecte la touche "Entrée" pour valider la commande
hiddenInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const input = hiddenInput.value.trim(); // Récupère le texte sans espaces inutiles
        processCommand(input);                  // Traite la commande
        hiddenInput.value = "";                 // Vide l'input
        visibleInput.textContent = "";          // Vide l'affichage
    }
});

// --- 5. TRAITEMENT DES COMMANDES ---
function processCommand(cmd) {
    // A. Affiche la ligne de commande que l'utilisateur vient de valider
    const historyLine = document.createElement("div");
    historyLine.className = "line";
    historyLine.innerHTML = `
        <span class="prompt-arrow">➜</span> <span class="prompt-path">~</span>
        <span class="cmd">${cmd}</span>
    `;
    terminalOutput.appendChild(historyLine);

    // B. Analyse la commande (minuscules, sans espaces)
    const cleanCmd = cmd.toLowerCase().trim();
    let response = "";

    // C. Cherche la réponse correspondante
    if (cleanCmd === "help") {
        response = "Commandes: ls, cat [fichier], node [fichier], python [fichier], linux, active directory, clear";
    } else if (cleanCmd === "clear") {
        terminalOutput.innerHTML = ""; // Vide tout l'historique
        return;
    } else if (fileSystem[cleanCmd]) {
        // Commande exacte trouvée dans notre "fileSystem"
        response = fileSystem[cleanCmd];
    } else {
        // Recherche approximative (ex: si on tape juste "node" au lieu de "node script.js")
        const partialKey = Object.keys(fileSystem).find(key => key.includes(cleanCmd) || key.startsWith(cleanCmd));
        if (partialKey) {
            response = fileSystem[partialKey];
        } else {
            response = `<span style="color:#e06c75">Command not found: ${cmd}</span>`;
        }
    }

    // D. Affiche la réponse générée
    if (response) {
        const responseLine = document.createElement("div");
        responseLine.className = "line";
        responseLine.innerHTML = response;
        terminalOutput.appendChild(responseLine);
    }

    // E. Scrolle automatiquement vers le bas pour voir la dernière réponse
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

// --- 6. EXÉCUTION AUTOMATIQUE (Clic sur les boutons) ---
function runCommand(text) {
    const inputField = document.getElementById("hidden-input");
    const displayField = document.getElementById("visible-input");
    
    // Annule toute animation précédente en cours pour éviter les mélanges de texte
    if (typingTimer) clearTimeout(typingTimer);

    // --- PRÉPARATION ---
    inputField.value = "";
    displayField.textContent = "";

    // MODIFICATION ICI : 
    // On ne donne le focus (qui ouvre le clavier) QUE si on est sur ordinateur.
    // Sur mobile, on aura l'animation visuelle mais pas le clavier virtuel.
    if (window.innerWidth > 820) {
        inputField.focus(); 
    }

    let i = 0;
    const speed = 50; // Vitesse de frappe (en ms)

    // Fonction récursive qui écrit lettre par lettre
    function typeWriter() {
        if (i < text.length) {
            let char = text.charAt(i);
            inputField.value += char;
            displayField.textContent += char;
            i++;
            // On enregistre le timer pour pouvoir l'annuler si l'utilisateur clique ailleurs
            typingTimer = setTimeout(typeWriter, speed);
        } else {
            // Une fois fini d'écrire, on valide la commande après une courte pause
            typingTimer = setTimeout(() => {
                processCommand(text);
                inputField.value = "";
                displayField.textContent = "";
                // Force le scroll vers le bas après l'exécution de la commande
                terminalScreen.scrollTop = terminalScreen.scrollHeight;
            }, 300);
        }
    }

    // Lance l'animation
    typeWriter();
}

// --- 6bis. EVENT LISTENER GLOBAL POUR FORCER LE SCROLL APRÈS CHAQUE CLIC BOUTON ---
// Cela garantit que le terminal scrolle vers le bas même si runCommand() est appelée directement
document.addEventListener("click", function(e) {
    // Si le clic vient d'un bouton ou élément avec runCommand dans onclick
    if (e.target.onclick && e.target.onclick.toString().includes("runCommand")) {
        // Attend un court instant pour que le contenu s'ajoute au DOM
        setTimeout(() => {
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }, 400);
    }
}, true);