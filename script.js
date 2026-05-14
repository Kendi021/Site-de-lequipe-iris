/* =========================================================
   SCRIPT PRINCIPAL - SITE EQUIPE IRIS
   ========================================================= */

/* ---------- CONFIG ---------- */
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

const AUTO_ANIMATION_GROUPS = [
  { selector: '.entete-section-terminal', animation: 'haut', baseDelay: 0, stepDelay: 0 },
  { selector: '.entete-projets', animation: 'haut', baseDelay: 0, stepDelay: 0 },
  { selector: '.membres-list .membre', animation: 'haut', baseDelay: 40, stepDelay: 70 },
  { selector: '.cartes-projets .carte', animation: 'haut', baseDelay: 50, stepDelay: 90 },
  { selector: '.devis-wrapper', animation: 'haut', baseDelay: 80, stepDelay: 0 },
  { selector: '.devis-projets .projet-card', animation: 'gauche', baseDelay: 110, stepDelay: 70 },
  { selector: '.devis-form .devis-champ', animation: 'droite', baseDelay: 130, stepDelay: 65 },
  { selector: '.devis-checks label', animation: 'gauche', baseDelay: 170, stepDelay: 55 },
  { selector: '.devis-kpi', animation: 'haut', baseDelay: 210, stepDelay: 70 },
];

/* ---------- REFERENCES DOM ---------- */
const container = document.querySelector('.container');
const menuToggle = document.getElementById('fermer-menu');
const menuLinks = document.querySelectorAll('.lien-menu');
const devisForm = document.getElementById('devis-form');
const projectRadios = document.querySelectorAll('input[name="type-projet"]');
const skillsSection = document.getElementById('competences');

/* ---------- UTILITAIRES ---------- */
function formatEuro(value) {
  return `${Math.round(value)} EUR`;
}

function getSelectedProject() {
  const selected = document.querySelector('input[name="type-projet"]:checked');
  const key = selected?.value || 'vitrine';
  // Fallback sur vitrine si aucun choix n'est trouvé.
  return PROJECT_PRESETS[key] || PROJECT_PRESETS.vitrine;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ---------- MENU ---------- */
function toggleMenu() {
  const nextState = !container?.classList.contains('afficher-menu');
  container?.classList.toggle('afficher-menu');
  menuToggle?.setAttribute('aria-expanded', String(Boolean(nextState)));
}

function closeMenu() {
  container?.classList.remove('afficher-menu');
  menuToggle?.setAttribute('aria-expanded', 'false');
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

  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

/* ---------- ANIMATIONS PAGE ---------- */
function decorateElementsForAnimation() {
  AUTO_ANIMATION_GROUPS.forEach((group) => {
    const elements = document.querySelectorAll(group.selector);

    elements.forEach((element, index) => {
      if (!element.dataset.animation) {
        element.dataset.animation = group.animation;
      }

      if (!element.dataset.animationDelay) {
        element.dataset.animationDelay = String(group.baseDelay + (index * group.stepDelay));
      }
    });
  });
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animation]');

  if (!animatedElements.length) {
    return;
  }

  if (prefersReducedMotion()) {
    animatedElements.forEach((element) => element.classList.add('anime'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const delay = Number(entry.target.dataset.animationDelay || 0);
          if (delay > 0) {
            entry.target.style.transitionDelay = `${delay}ms`;
          }

          entry.target.classList.add('anime');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    animatedElements.forEach((element) => observer.observe(element));
    return;
  }

  animatedElements.forEach((element) => element.classList.add('anime'));
}

function applySkillBarsWidth() {
  document.querySelectorAll('.competence[data-level]').forEach((skill) => {
    const fill = skill.querySelector('.fill');
    const level = skill.dataset.level;

    if (fill && level) {
      fill.style.width = `${level}%`;
    }
  });
}

function initSkillBars() {
  if (!skillsSection) {
    applySkillBarsWidth();
    return;
  }

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    applySkillBarsWidth();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        applySkillBarsWidth();
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
}

/* ---------- DEVIS ---------- */
function applyProjectPreset() {
  if (!devisForm) {
    return;
  }

  // Charge des valeurs par défaut selon le type de projet choisi.
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

  // Recalcule immédiatement après mise à jour des champs.
  updateDevis();
}

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

  // Coûts variables mensuels basés sur l'usage.
  const coutStockage = stockage * 0.2;
  const coutTrafic = trafic * 0.08;
  const coutMaintenance = maintenance * 35;

  // Total mensuel = infra + options + coefficient du type de projet.
  const coutMensuel = hosting + coutStockage + coutTrafic + coutMaintenance + nomDomaine + ssl + backup + projet.monthly;
  // Coût d'installation = base + setup technique + complexité du projet.
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

  // Recalcule à chaque changement d'un champ du formulaire.
  devisForm.addEventListener('input', updateDevis);
  devisForm.addEventListener('change', updateDevis);
  // Applique le preset quand on change le type de projet.
  projectRadios.forEach((radio) => radio.addEventListener('change', applyProjectPreset));

  // Initialisation du devis au chargement.
  applyProjectPreset();
}

/* ---------- MODE PRÉSENTATION (style PowerPoint) ---------- */

const SLIDE_TITLES = ['Accueil', 'Équipe & compétences', 'Pourquoi ce projet ?', 'Projets'];

function initSlidePresentation() {
  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  const dots = document.querySelectorAll('.ppt-dot');
  const prevBtn = document.getElementById('ppt-prev');
  const nextBtn = document.getElementById('ppt-next');
  const currentEl = document.getElementById('ppt-current');
  const labelEl = document.getElementById('ppt-label');
  const progressEl = document.getElementById('ppt-progress');
  let current = 0;
  let isAnimating = false;
  const total = slides.length;

  /* Met à jour les indicateurs visuels */
  function updateUI() {
    dots.forEach((d, i) => d.classList.toggle('ppt-dot--active', i === current));
    if (currentEl) currentEl.textContent = current + 1;
    if (labelEl) labelEl.textContent = SLIDE_TITLES[current] || '';
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;
    if (progressEl) {
      progressEl.style.width = `${((current + 1) / total) * 100}%`;
    }
  }

  /* Anime les éléments [data-animation] de la diapo activée */
  function animateSlideElements(slide) {
    const elements = slide.querySelectorAll('[data-animation]');
    elements.forEach((el) => el.classList.remove('anime'));
    elements.forEach((el) => {
      const delay = Number(el.dataset.animationDelay || 0) + 80;
      setTimeout(() => el.classList.add('anime'), delay);
    });
  }

  /* Navigue vers la diapo à l’indice demandé */
  function goTo(index) {
    if (index === current || isAnimating || index < 0 || index >= total) return;
    isAnimating = true;

    const dir = index > current ? 1 : -1;
    const outSlide = slides[current];
    const inSlide = slides[index];

    /* 1. Positionner instantanément la diapo entrante hors écran */
    inSlide.style.transition = 'none';
    inSlide.style.transform = `translateX(${dir * 100}%)`;
    inSlide.style.opacity = '0';
    inSlide.style.pointerEvents = 'none';

    /* 2. Forcer un repaint */
    void inSlide.offsetWidth;

    /* 3. Animer la sortie de la diapo courante */
    const TRANS = 'transform 0.55s cubic-bezier(0.22, 0.68, 0, 1.1), opacity 0.42s ease';
    outSlide.style.transition = TRANS;
    outSlide.style.transform = `translateX(${-dir * 100}%)`;
    outSlide.style.opacity = '0';
    outSlide.style.pointerEvents = 'none';

    /* 4. Animer l'entrée de la nouvelle diapo (valeurs explicites — réinitialiser à '' réactiverait le CSS qui masque) */
    inSlide.style.transition = TRANS;
    inSlide.style.transform = 'translateX(0)';
    inSlide.style.opacity = '1';
    inSlide.style.pointerEvents = 'auto';

    current = index;
    updateUI();

    /* 5. Nettoyage après la transition */
    setTimeout(() => {
      /* Remettre la diapo sortante hors écran côté opposé */
      outSlide.style.transition = 'none';
      outSlide.style.transform = `translateX(${dir * 100}%)`;
      void outSlide.offsetWidth;
      outSlide.style.transition = '';
      outSlide.style.opacity = '';
      outSlide.style.pointerEvents = '';

      /* Remonter en haut de la nouvelle diapo */
      inSlide.scrollTop = 0;
      inSlide.style.transition = '';
      /* Laisser transform/opacity inline : le CSS par défaut masquerait la diapo si on les effaçait */

      /* Animations de contenu */
      animateSlideElements(inSlide);

      /* Barres de compétence sur la diapo équipe */
      if (inSlide.querySelector('.competence[data-level]')) {
        applySkillBarsWidth();
      }

      isAnimating = false;
    }, 620);
  }

  /* Boutons précédent / suivant */
  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  /* Points de navigation */
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  /* Clavier : flèches, Page Up/Down, Espace */
  window.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      goTo(current + 1);
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      goTo(current - 1);
    }
  });

  /* Swipe tactile */
  let touchX = 0;
  document.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  /* Navigation via boutons data-goto (ex: héros de la diapo 1) */
  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => goTo(Number(btn.dataset.goto)));
  });

  /* Exposition globale pour usages inline éventuels */
  window.goToSlide = goTo;

  /* Initialisation */
  updateUI();
}

/* ---------- LOADER ---------- */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const hide = () => loader.classList.add('loader-cache');

  if (document.readyState === 'complete') {
    // Page déjà chargée
    setTimeout(hide, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 300), { once: true });
    // Fallback : masque après 4 s maximum
    setTimeout(hide, 4000);
  }
}

/**
 * Animation des étoiles en arrière-plan (effet subtil)
 */
function animateStarsBackground() {
  const starsContainer = document.querySelector('.stars-background');
  if (!starsContainer) return;
  
  const starImg = starsContainer.querySelector('img');
  if (!starImg) return;
  
  // Animation fluide des étoiles
  let offset = parseFloat(starImg.style.backgroundPositionY || '0px');
  
  function updateStars() {
    offset -= 0.15;
    starImg.style.backgroundPositionY = `${offset}px`;
    requestAnimationFrame(updateStars);
  }
  
  // Démarre l'animation
  requestAnimationFrame(updateStars);
}

/* ---------- BOOTSTRAP ---------- */
function initSite() {
  const isPresentationMode = !!document.querySelector('.slides-wrapper');

  decorateElementsForAnimation();
  initMenuAccessibility();

  if (isPresentationMode) {
    // Mode présentation : navigation par diapos
    initSlidePresentation();
  } else {
    // Mode scroll classique
    initScrollAnimations();
    initSkillBars();
  }

  initDevisCalculator();
  
  // Anime les étoiles en arrière-plan (mode présentation)
  if (isPresentationMode) {
    animateStarsBackground();
  }
}

initLoader();
initSite();
