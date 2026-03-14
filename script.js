const container = document.querySelector('.container');
const menuToggle = document.getElementById('fermer-menu');
const menuLinks = document.querySelectorAll('.lien-menu');
const animatedElements = document.querySelectorAll('[data-animation]');

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

menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

initMenuAccessibility();
initScrollAnimations();
initSkillBars();
