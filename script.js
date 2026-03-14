const container = document.querySelector('.container');
const menuToggle = document.getElementById('fermer-menu');
const menuLinks = document.querySelectorAll('.lien-menu');
const animatedElements = document.querySelectorAll('[data-animation]');
const devisForm = document.getElementById('devis-form');
const projectRadios = document.querySelectorAll('input[name="type-projet"]');

const PROJECT_PRESETS = {
  vitrine: {
    label: 'Site vitrine',
    hosting: '10',
    stockage: 10,
    trafic: 50,
    maintenance: 2,
    nomDomaine: true,
    ssl: false,
    backup: true,
    setup: 90,
    monthly: 8,
  },
  dynamique: {
    label: 'Site dynamique',
    hosting: '35',
    stockage: 30,
    trafic: 180,
    maintenance: 6,
    nomDomaine: true,
    ssl: true,
    backup: true,
    setup: 180,
    monthly: 22,
  },
  ecommerce: {
    label: 'E-commerce',
    hosting: '80',
    stockage: 80,
    trafic: 420,
    maintenance: 12,
    nomDomaine: true,
    ssl: true,
    backup: true,
    setup: 330,
    monthly: 48,
  },
};

// Gère l'ouverture du menu latéral.
function toggleMenu() {
  container?.classList.toggle('afficher-menu');
}

// Ferme le menu après un clic sur un lien.
function closeMenu() {
  container?.classList.remove('afficher-menu');
}

// Lance les animations quand les blocs entrent dans l'écran.
function initScrollAnimations() {
  if (!animatedElements.length) {
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('anime', entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    animatedElements.forEach((element) => observer.observe(element));
    return;
  }

  animatedElements.forEach((element) => element.classList.add('anime'));
}

// Aligne les barres avec les niveaux du HTML.
function initSkillBars() {
  document.querySelectorAll('.competence[data-level]').forEach((skill) => {
    const fill = skill.querySelector('.fill');
    const level = skill.dataset.level;

    if (fill && level) {
      fill.style.width = `${level}%`;
    }
  });
}

function initMenuAccessibility() {
  if (!menuToggle) {
    return;
  }

  menuToggle.addEventListener('click', toggleMenu);
  menuToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  });
}

function formatEuro(value) {
  return `${Math.round(value)} EUR`;
}

function getSelectedProject() {
  const selected = document.querySelector('input[name="type-projet"]:checked');
  const key = selected?.value || 'vitrine';
  return PROJECT_PRESETS[key] || PROJECT_PRESETS.vitrine;
}

// Pré-remplit les champs selon le type de projet choisi.
function applyProjectPreset() {
  if (!devisForm) {
    return;
  }

  const preset = getSelectedProject();

  const hosting = document.getElementById('type-hebergement');
  const stockage = document.getElementById('stockage');
  const trafic = document.getElementById('trafic');
  const maintenance = document.getElementById('maintenance');
  const nomDomaine = document.getElementById('nom-domaine');
  const ssl = document.getElementById('ssl');
  const backup = document.getElementById('backup');

  if (hosting) hosting.value = preset.hosting;
  if (stockage) stockage.value = String(preset.stockage);
  if (trafic) trafic.value = String(preset.trafic);
  if (maintenance) maintenance.value = String(preset.maintenance);
  if (nomDomaine) nomDomaine.checked = preset.nomDomaine;
  if (ssl) ssl.checked = preset.ssl;
  if (backup) backup.checked = preset.backup;

  updateDevis();
}

// Calcule une estimation simple de deploiement.
function updateDevis() {
  if (!devisForm) {
    return;
  }

  const hosting = Number(document.getElementById('type-hebergement')?.value || 0);
  const stockage = Number(document.getElementById('stockage')?.value || 0);
  const trafic = Number(document.getElementById('trafic')?.value || 0);
  const maintenance = Number(document.getElementById('maintenance')?.value || 0);

  const nomDomaine = document.getElementById('nom-domaine')?.checked ? 12 : 0;
  const ssl = document.getElementById('ssl')?.checked ? 8 : 0;
  const backup = document.getElementById('backup')?.checked ? 15 : 0;
  const projet = getSelectedProject();

  const coutStockage = stockage * 0.2;
  const coutTrafic = trafic * 0.08;
  const coutMaintenance = maintenance * 35;

  const coutMensuel = hosting + coutStockage + coutTrafic + coutMaintenance + nomDomaine + ssl + backup + projet.monthly;
  const coutInstallation = 120 + (hosting * 0.6) + (backup ? 30 : 0) + (ssl ? 25 : 0) + projet.setup;

  const sortieMensuelle = document.getElementById('cout-mensuel');
  const sortieInstallation = document.getElementById('cout-installation');
  const sortieProjet = document.getElementById('projet-selection');

  if (sortieMensuelle) {
    sortieMensuelle.textContent = formatEuro(coutMensuel);
  }

  if (sortieInstallation) {
    sortieInstallation.textContent = formatEuro(coutInstallation);
  }

  if (sortieProjet) {
    sortieProjet.textContent = projet.label;
  }
}

function initDevisCalculator() {
  if (!devisForm) {
    return;
  }

  devisForm.addEventListener('input', updateDevis);
  devisForm.addEventListener('change', updateDevis);
  projectRadios.forEach((radio) => radio.addEventListener('change', applyProjectPreset));
  applyProjectPreset();
}

menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

initMenuAccessibility();
initScrollAnimations();
initSkillBars();
initDevisCalculator();
