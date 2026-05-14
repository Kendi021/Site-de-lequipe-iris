/* =================================================================
   script.js — Logique partagée : menu, panier, filtres, formulaires
   Ce fichier est chargé sur toutes les pages du site.
   ================================================================= */

/* ─── Base de données produits (utilisée par fiche-produit.html) ── */
var PRODUCTS_DB = {
  "gilet-alpha-iv": {
    id: "gilet-alpha-iv",
    name: "Gilet Alpha IV",
    price: 1450,
    category: "armure",
    tag: "Protection",
    rating: 4.8,
    reviews: 127,
    stock: 200,
    image: "imag/Gilet Alpha IV.jpg",
    icon: "fas fa-vest-patches",
    highlights: [
      "Niveau de protection NIJ IV contre les projectiles perforants",
      "Système de fixation MOLLE pour accessoires modulaires",
      "Poids optimisé : 4,2 kg avec plaques balistiques incluses",
      "Compatible véhicule blindé et débarquement rapide",
      "Gilet ventilé pour les opérations en milieu chaud"
    ],
    description: "Le Gilet Alpha IV représente l'état de l'art en matière de protection individuelle pour les forces spéciales et les unités d'intervention. Conçu pour absorber les chocs balistiques de niveau NIJ IV, il intègre des plaques en polyéthylène ultra-haute densité (UHMWPE) recouvertes d'une enveloppe Dyneema. Sa conception modulaire permet d'attacher des poches, holsters et kits médicaux via le système MOLLE standardisé. La structure ventilée réduit la fatigue thermique lors des opérations prolongées. Certifié pour les environnements maritimes et désertiques.",
    specs: [
      { label: "Norme de protection", value: "NIJ 0101.06 Niveau IV" },
      { label: "Poids total", value: "4,2 kg (plaques incluses)" },
      { label: "Matière", value: "UHMWPE + Dyneema + Kevlar" },
      { label: "Système d'attache", value: "MOLLE / PALS" },
      { label: "Tailles disponibles", value: "S / M / L / XL / XXL" },
      { label: "Couleur", value: "Multicam, Olive, Noir RAL 9005" },
      { label: "Certification", value: "STANAG 4569 — OTAN" },
      { label: "Garantie", value: "5 ans fabricant" }
    ],
    related: ["casque-sentinel-m2", "sac-tactical-pro", "kit-survie-s500"]
  },
  "casque-sentinel-m2": {
    id: "casque-sentinel-m2",
    name: "Casque Sentinel M2",
    price: 899,
    category: "armure",
    tag: "Protection",
    rating: 4.7,
    reviews: 94,
    stock: 22,
    image: "imag/Casque Sentinel M2.jpg",
    icon: "fas fa-hard-hat",
    highlights: [
      "Structure balistique légère en Aramide haute densité",
      "Rail Picatinny latéral pour accessoires (lampe, caméra)",
      "Compatible systèmes de vision nocturne NVG (montage J-arm)",
      "Rembourrage Ops-Core Energy Absorb intégré",
      "Couvre-nuque balistique amovible inclus"
    ],
    description: "Le Casque Sentinel M2 est la référence des casques tactiques haute protection pour les unités professionnelles. Sa coque en Aramide multi-couches offre une protection balistique V50 ≥ 610 m/s tout en maintenant un poids remarquablement bas de 1,35 kg. Le système de rails Picatinny permet de fixer des lampes, caméras de combat ou tiges NVG (vision nocturne). Le harnais de suspension HiiArc garantit un ajustement précis et une stabilité maximale lors des sauts HAHO/HALO. Le couvre-nuque balistique amovible complète la protection latérale.",
    specs: [
      { label: "Protection balistique", value: "V50 ≥ 610 m/s (STANAG 2920)" },
      { label: "Poids", value: "1,35 kg" },
      { label: "Matière coque", value: "Aramide haute densité" },
      { label: "Compatibilité NVG", value: "J-arm ANVIS / GPNVG-18" },
      { label: "Rails", value: "Picatinny latéraux 3/6/9 heures" },
      { label: "Tailles", value: "M / L / XL" },
      { label: "Couleur", value: "Coyote, Noir, FG" },
      { label: "Garantie", value: "3 ans fabricant" }
    ],
    related: ["gilet-alpha-iv", "nightsight-pro", "radio-falcon-x2"]
  },
  "radio-falcon-x2": {
    id: "radio-falcon-x2",
    name: "Radio Falcon X2",
    price: 1220,
    category: "communication",
    tag: "Communication",
    rating: 4.9,
    reviews: 213,
    stock: 8,
    image: "imag/Radio falcon.jpg",
    icon: "fas fa-walkie-talkie",
    highlights: [
      "Double bande VHF/UHF avec sauts de fréquences AES-256",
      "Autonomie jusqu'à 18h en mode émission/réception alternée",
      "Cryptage terrain temps réel — certifié OTAN SECRET",
      "Étanche IP68 et résistante aux chocs MIL-STD-810H",
      "Compatible oreillettes PELTOR et Invisio"
    ],
    description: "La Radio Falcon X2 est une radio tactique de dernière génération destinée aux opérations spéciales et aux unités de combat de haute intensité. Opérant simultanément sur les bandes VHF (136-174 MHz) et UHF (400-512 MHz), elle intègre un système de chiffrement AES-256 bits avec gestion des clés par saut de fréquences automatique. Son boîtier en alliage de magnésium est certifié IP68 (immersion 2m/4h) et MIL-STD-810H (chocs, vibrations, température extrême -40°C à +70°C). La connectivité multiprotocole permet l'intégration dans les réseaux JTRS et Link 16.",
    specs: [
      { label: "Bandes de fréquence", value: "VHF 136–174 MHz / UHF 400–512 MHz" },
      { label: "Chiffrement", value: "AES-256 + sauts de fréquence" },
      { label: "Autonomie", value: "18h (5:5:90 TX:RX:veille)" },
      { label: "Puissance émission", value: "1W / 5W sélectionnable" },
      { label: "Étanchéité", value: "IP68 — 2m pendant 4h" },
      { label: "Résistance chocs", value: "MIL-STD-810H" },
      { label: "Connectique", value: "U-174/U (Nexus TP120)" },
      { label: "Garantie", value: "2 ans fabricant + support terrain" }
    ],
    related: ["commlink-secure", "casque-sentinel-m2", "gilet-alpha-iv"]
  },
  "commlink-secure": {
    id: "commlink-secure",
    name: "Commlink Secure",
    price: 420,
    category: "communication",
    tag: "Communication",
    rating: 4.4,
    reviews: 76,
    stock: 31,
    image: "imag/Commlink Secure.jpg",
    icon: "fas fa-headset",
    highlights: [
      "Réduction active du bruit 26 dB — protection auditive en combat",
      "Amplification des sons ambiants x4 en dessous de 85 dB",
      "Connexion radio universelle : Nexus TP120 / Kenwood / Motorola",
      "Micro boom directionnel anti-vent intégré",
      "Bandeau souple compatible casque balistique"
    ],
    description: "Le Commlink Secure est un système d'oreillette active de protection auditive conçu pour les zones à forte pression acoustique (tirs, explosions, rotors). Il combine une réduction active du bruit (ANR) de 26 dB pour les impulsions dangereuses avec une amplification intelligente des sons ambiants jusqu'à 4x en dessous de 85 dB, permettant à l'opérateur d'entendre les ordres et l'environnement sans retirer sa protection. Le micro boom directif rejette le vent et les bruits parasites. Compatible avec la quasi-totalité des radios tactiques via adaptateurs universels inclus.",
    specs: [
      { label: "Réduction bruit impulsionnel", value: "26 dB (NRR)" },
      { label: "Amplification ambiante", value: "×4 en dessous 85 dB" },
      { label: "Connecteurs inclus", value: "Nexus TP120, Kenwood, Motorola" },
      { label: "Autonomie batterie", value: "400h (2× AA)" },
      { label: "Résistance", value: "IP54 — projections et poussière" },
      { label: "Poids", value: "185 g" },
      { label: "Compatibilité casque", value: "Bandeau souple universel" },
      { label: "Garantie", value: "2 ans" }
    ],
    related: ["radio-falcon-x2", "casque-sentinel-m2", "nightsight-pro"]
  },
  "nightsight-pro": {
    id: "nightsight-pro",
    name: "NightSight Pro",
    price: 1990,
    category: "optique",
    tag: "Optique",
    rating: 4.9,
    reviews: 189,
    stock: 5,
    image: "imag/NightSight Pro.jpg",
    icon: "fas fa-eye",
    highlights: [
      "Capteur image intensifier Gen III+ — portée utile 400m",
      "Résolution HD 1920×1080 avec sortie vidéo HDMI tactique",
      "Latence vidéo numérique < 3ms — sans effet de saccade",
      "Stabilisation électronique 3 axes intégrée",
      "Alimentation 72h sur 2 piles CR123A standard OTAN"
    ],
    description: "Le NightSight Pro est le système de vision nocturne binoculaire le plus avancé du catalogue MILITARY PRO. Son capteur à amplification de lumière Gen III+ (photocathode en Gallium Arsenide) offre une sensibilité de 350 µA/lm et une résolution de 64 lp/mm, permettant une identification de cibles à 400m sans éclairage actif. La sortie vidéo numérique HDMI tactique permet une liaison en temps réel avec les systèmes C2 embarqués. La stabilisation 3 axes compense les mouvements lors des missions aéroportées ou en véhicule. Le boîtier en titane Grade 5 résiste aux conditions STANAG 4569.",
    specs: [
      { label: "Génération capteur", value: "Gen III+ (GaAs)" },
      { label: "Résolution", value: "64 lp/mm — 1920×1080 sortie numérique" },
      { label: "Portée utile", value: "400 m (étoile 1/4 de lune)" },
      { label: "Latence vidéo", value: "< 3 ms" },
      { label: "Stabilisation", value: "3 axes électronique" },
      { label: "Autonomie", value: "72h (2× CR123A)" },
      { label: "Poids", value: "680 g avec batteries" },
      { label: "Garantie", value: "5 ans — étalonnage annuel inclus" }
    ],
    related: ["thermo-scout-xt", "casque-sentinel-m2", "radio-falcon-x2"]
  },
  "thermo-scout-xt": {
    id: "thermo-scout-xt",
    name: "Thermo Scout XT",
    price: 1640,
    category: "optique",
    tag: "Optique",
    rating: 4.8,
    reviews: 142,
    stock: 9,
    image: "imag/Thermo Scout XT.webp",
    icon: "fas fa-binoculars",
    highlights: [
      "Caméra thermique longue portée : détection à 1 200m",
      "Résolution thermique 640×512 pixels — 30 Hz",
      "Détection automatique de mouvement avec alerte vibratoire",
      "Mode patrouille : enregistrement SD continu 16h",
      "Intégration laser télémètre classe 1M (1 500m)"
    ],
    description: "Le Thermo Scout XT est un système de surveillance thermique longue portée destiné aux postes d'observation fixes et aux patrouilles mobiles. Son capteur non refroidi VOx 640×512 px détecte les signatures thermiques à 1 200m et identifie un humain debout à 600m. Le mode patrouille active l'enregistrement continu sur carte SD (jusqu'à 256 Go) couplé à la détection de mouvement automatique avec alerte vibratoire discrète. Le laser télémètre classe 1M mesure les distances jusqu'à 1 500m avec une précision de ±1m. Interface USB-C pour retransmission vers systèmes C2.",
    specs: [
      { label: "Type capteur", value: "Microbolometer non refroidi VOx" },
      { label: "Résolution thermique", value: "640×512 px à 30 Hz" },
      { label: "Portée détection", value: "1 200 m (cible 2,3×0,5m)" },
      { label: "Portée identification", value: "600 m (humain debout)" },
      { label: "Télémètre laser", value: "Classe 1M — portée 1 500m ±1m" },
      { label: "Stockage", value: "Micro SD jusqu'à 256 Go" },
      { label: "Autonomie", value: "8h (batterie Li-Ion 14,4V incluse)" },
      { label: "Garantie", value: "3 ans avec calibration" }
    ],
    related: ["nightsight-pro", "radio-falcon-x2", "gilet-alpha-iv"]
  },
  "sac-tactical-pro": {
    id: "sac-tactical-pro",
    name: "Sac Tactical Pro",
    price: 290,
    category: "logistique",
    tag: "Logistique",
    rating: 4.5,
    reviews: 308,
    stock: 47,
    image: "imag/Sac Tactical Pro.webp",
    icon: "fas fa-bag-shopping",
    highlights: [
      "Volume 65L avec extension latérale +15L intégrée",
      "Structure MOLLE externe 360° — compatible gilets tactiques",
      "Poche d'hydratation 3L avec tube d'accès rapide",
      "Bretelles ergonomiques Load Lifter avec lombaire rigide",
      "Matière 500D Cordura — résistance déchirure renforcée"
    ],
    description: "Le Sac Tactical Pro est le sac à dos opérationnel conçu pour les missions d'infiltration longue durée. Son volume de 65L (extensible à 80L) est organisé en 4 compartiments étanches : compartiment principal avec cadre interne, poche dorsale rapide d'accès, poche frontale à organisation, et poche d'hydratation 3L déportée. Toute la surface externe est recouverte de fixations MOLLE en 500D Cordura pour accrocher poches, fusil, kit médical ou matériel de bivouac. Le système Load Lifter répartit la charge sur les hanches pour les trajets de plus de 20 km.",
    specs: [
      { label: "Volume", value: "65L (+15L extension)" },
      { label: "Matière", value: "500D Cordura Nylon" },
      { label: "Système MOLLE", value: "360° — compatible STANAG" },
      { label: "Hydratation", value: "Poche 3L incluse" },
      { label: "Poids à vide", value: "2,1 kg" },
      { label: "Dimensions", value: "75 × 35 × 25 cm" },
      { label: "Couleur", value: "Multicam, Coyote, Noir" },
      { label: "Garantie", value: "Vie produit — coutures et fermetures" }
    ],
    related: ["kit-survie-s500", "gilet-alpha-iv", "thermo-scout-xt"]
  },
  "kit-survie-s500": {
    id: "kit-survie-s500",
    name: "Kit Survie S500",
    price: 590,
    category: "logistique",
    tag: "Logistique",
    rating: 4.6,
    reviews: 251,
    stock: 18,
    image: "imag/Kit Survie S500.jpg",
    icon: "fas fa-briefcase-medical",
    highlights: [
      "Autonomie complète 72h pour 2 opérateurs",
      "Système de filtration eau LifeStraw Pro (2 000L garanti)",
      "Panneau solaire pliable 20W + batterie externe 20 000mAh",
      "Kit médical tactique TCCC niveau 2 inclus",
      "Mallette rigide IP67 — flottante en milieu aquatique"
    ],
    description: "Le Kit Survie S500 est la solution de survie tactique la plus complète du catalogue, conçue pour maintenir 2 opérateurs en autonomie totale pendant 72 heures dans tout environnement. La mallette rigide IP67 (flottante) contient : système de filtration eau LifeStraw Pro (2 000L garanti), panneau solaire 20W avec batterie externe 20 000mAh, rations de combat freeze-dried 72h, kit médical TCCC niveau 2 (garrot CAT, pansement hémostatique QuikClot, décompresseur thoracique), kit de signalisation (miroir, sifflet, bâton lumineux IR), et outil multifonction Leatherman Signal. Chaque composant est remplaçable individuellement.",
    specs: [
      { label: "Autonomie", value: "72h pour 2 opérateurs" },
      { label: "Filtration eau", value: "LifeStraw Pro — 2 000L garanti" },
      { label: "Énergie", value: "Panneau 20W + batterie 20 000mAh" },
      { label: "Kit médical", value: "TCCC Niveau 2 — certifié" },
      { label: "Mallette", value: "Rigide IP67 — flottante" },
      { label: "Poids total", value: "8,4 kg" },
      { label: "Dimensions", value: "55 × 40 × 22 cm" },
      { label: "Garantie", value: "2 ans (consommables exclus)" }
    ],
    related: ["sac-tactical-pro", "gilet-alpha-iv", "commlink-secure"]
  }
};

(function () {
  /* Clé de persistance du panier dans le localStorage */
  var CART_KEY = "military_pro_cart_v2";

  /* ─── Menu mobile ────────────────────────────────────────────── */

  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ─── Lecture / Sauvegarde du panier (localStorage) ──────────── */

  function readCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_err) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  /* ─── Formatage des prix & calcul des totaux ──────────────────── */

  function formatPrice(value) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR"
    }).format(value);
  }

  function cartTotals(cart) {
    return cart.reduce(
      function (acc, item) {
        acc.items += item.quantity;
        acc.price += item.quantity * item.price;
        return acc;
      },
      { items: 0, price: 0 }
    );
  }

  /* ─── Badge panier (compteur dans l'en-tête) ──────────────────── */

  function updateCartBadges() {
    var totals = cartTotals(readCart());
    document.querySelectorAll(".js-cart-count").forEach(function (el) {
      el.textContent = String(totals.items);
    });
  }

  /* ─── Tiroir panier — références DOM ──────────────────────────── */

  var drawer = document.getElementById("cart-drawer");
  var backdrop = document.getElementById("cart-backdrop");
  var cartList = document.getElementById("cart-list");
  var cartItemsTotal = document.getElementById("cart-items-total");
  var cartPriceTotal = document.getElementById("cart-price-total");

  /* ─── Rendu du contenu du tiroir ──────────────────────────────── */

  function renderDrawerCart() {
    if (!drawer || !cartList || !cartItemsTotal || !cartPriceTotal) {
      updateCartBadges();
      return;
    }

    var cart = readCart();
    var totals = cartTotals(cart);

    cartItemsTotal.textContent = String(totals.items);
    cartPriceTotal.textContent = formatPrice(totals.price);
    updateCartBadges();

    if (cart.length === 0) {
      cartList.innerHTML =
        '<li class="cart-item"><div><strong>Panier vide</strong><br><small>Ajoutez des produits depuis les pages Accueil, Categorie ou Produit.</small></div></li>';
      return;
    }

    cartList.innerHTML = cart
      .map(function (item) {
        return (
          '<li class="cart-item">' +
          "<div>" +
          "<strong>" +
          item.name +
          "</strong><br>" +
          "<small>" +
          item.quantity +
          " x " +
          formatPrice(item.price) +
          "</small>" +
          "</div>" +
          '<div class="cart-item-actions">' +
          "<strong>" +
          formatPrice(item.quantity * item.price) +
          "</strong>" +
          '<button type="button" data-action="dec" data-id="' +
          item.id +
          '">-</button>' +
          '<button type="button" data-action="inc" data-id="' +
          item.id +
          '">+</button>' +
          '<button type="button" data-action="remove" data-id="' +
          item.id +
          '">x</button>' +
          "</div>" +
          "</li>"
        );
      })
      .join("");
  }

  /* ─── Ouverture / Fermeture du tiroir ─────────────────────────── */

  function openDrawer() {
    if (drawer) {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
    }
    if (backdrop) {
      backdrop.classList.add("is-open");
    }
    renderDrawerCart();
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    }
    if (backdrop) {
      backdrop.classList.remove("is-open");
    }
  }

  /* ─── Événements : boutons ouvrir / fermer le panier ──────────── */

  document.querySelectorAll(".js-open-cart").forEach(function (btn) {
    btn.addEventListener("click", openDrawer);
  });

  document.querySelectorAll(".js-close-cart").forEach(function (btn) {
    btn.addEventListener("click", closeDrawer);
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeDrawer);
  }

  /* ─── Actions sur les articles ( + / − / supprimer ) ──────────── */

  if (cartList) {
    cartList.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      var action = target.dataset.action;
      var id = target.dataset.id;
      if (!action || !id) {
        return;
      }

      var cart = readCart();
      var item = cart.find(function (it) {
        return it.id === id;
      });

      if (!item) {
        return;
      }

      if (action === "inc") {
        item.quantity += 1;
      } else if (action === "dec") {
        item.quantity -= 1;
      } else if (action === "remove") {
        item.quantity = 0;
      }

      cart = cart.filter(function (it) {
        return it.quantity > 0;
      });
      saveCart(cart);
      renderDrawerCart();
    });
  }

  /* ─── Vider & valider le panier ───────────────────────────────── */

  var clearCartBtn = document.getElementById("clear-cart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function () {
      saveCart([]);
      renderDrawerCart();
      showToast("Panier vide.");
    });
  }

  var checkoutBtn = document.getElementById("checkout-cart");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      var cart = readCart();
      if (cart.length === 0) {
        showToast("Votre panier est vide.");
        return;
      }
      saveCart([]);
      renderDrawerCart();
      showToast("Demande envoyee. Nous vous recontactons rapidement.");
    });
  }

  /* ─── Ajout au panier (lit data-id / data-name / data-price) ───── */

  function addToCartFromDataset(el) {
    var id = el.dataset.id;
    var name = el.dataset.name;
    var price = Number(el.dataset.price || "0");

    if (!id || !name || !price) {
      return;
    }

    var cart = readCart();
    var existing = cart.find(function (it) {
      return it.id === id;
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: id, name: name, price: price, quantity: 1 });
    }

    saveCart(cart);
    updateCartBadges();
    renderDrawerCart();
    showToast(name + " ajoute au panier.");
  }

  /* Branchement des boutons « Ajouter au panier » de la page */
  document.querySelectorAll(".js-add-cart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      addToCartFromDataset(btn);
    });
  });

  /* ─── Filtres produits (recherche, tri, catégorie) ─────────────── */

  var productSearch = document.getElementById("search-products");
  var sortSelect = document.getElementById("sort-products");
  var filterButtons = document.querySelectorAll(".js-filter-btn");
  var productCards = document.querySelectorAll(".product");
  var currentFilter = "all";

  /* Masque/affiche les cartes selon catégorie, texte et tri */
  function applyProductFilters() {
    if (productCards.length === 0) {
      return;
    }

    var search = productSearch ? productSearch.value.trim().toLowerCase() : "";

    productCards.forEach(function (card) {
      var category = (card.dataset.category || "").toLowerCase();
      var name = (card.dataset.name || "").toLowerCase();
      var visibleByFilter = currentFilter === "all" || currentFilter === category;
      var visibleBySearch = !search || name.indexOf(search) !== -1;
      card.style.display = visibleByFilter && visibleBySearch ? "" : "none";
    });

    if (sortSelect) {
      var grid = document.getElementById("product-grid");
      if (grid) {
        var cards = Array.from(productCards);
        cards.sort(function (a, b) {
          var aPrice = Number(a.dataset.price || "0");
          var bPrice = Number(b.dataset.price || "0");
          var aRate = Number(a.dataset.rating || "0");
          var bRate = Number(b.dataset.rating || "0");
          var mode = sortSelect.value;

          if (mode === "price-low") {
            return aPrice - bPrice;
          }
          if (mode === "price-high") {
            return bPrice - aPrice;
          }
          if (mode === "rating") {
            return bRate - aRate;
          }
          return 0;
        });

        cards.forEach(function (card) {
          grid.appendChild(card);
        });
      }
    }
  }

  /* Clic sur les boutons de filtre catégorie */
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      currentFilter = btn.dataset.filter || "all";
      applyProductFilters();
    });
  });

  if (productSearch) {
    productSearch.addEventListener("input", applyProductFilters);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", applyProductFilters);
  }

  /* ─── Navigation rapide par catégorie (page catégories) ───────── */

  var categoryQuick = document.querySelectorAll(".js-category-pick");
  categoryQuick.forEach(function (link) {
    link.addEventListener("click", function () {
      var picked = link.dataset.filter;
      if (!picked) {
        return;
      }
      localStorage.setItem("military_pro_pref_filter", picked);
    });
  });

  /* Restaure le filtre sélectionné depuis la page catégories */
  var prefFilter = localStorage.getItem("military_pro_pref_filter");
  if (prefFilter && filterButtons.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.filter === prefFilter);
    });
    currentFilter = prefFilter;
    localStorage.removeItem("military_pro_pref_filter");
  }
  applyProductFilters();

  /* ─── Formulaires de contact ──────────────────────────────────── */

  var forms = document.querySelectorAll(".contact-form, .newsletter-form");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.reset();
      showToast("Message envoye avec succes.");
    });
  });

  /* ─── Toast / Notification (bas de page, disparaît en 1,9 s) ───── */

  function showToast(message) {
    var toast = document.getElementById("toast");
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.add("is-show");
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(function () {
      toast.classList.remove("is-show");
    }, 1900);
  }

  /* ─── Initialisation au chargement de la page ──────────────────── */

  updateCartBadges();
  renderDrawerCart();

  /* ─── Page fiche-produit : chargement dynamique ─────────────────── */

  var pdSection = document.getElementById("product-detail");
  var pdNotFound = document.getElementById("product-not-found");

  if (pdSection && pdNotFound) {
    /* Lecture du paramètre ?id= dans l'URL */
    var params = new URLSearchParams(window.location.search);
    var productId = params.get("id");
    var product = productId ? PRODUCTS_DB[productId] : null;

    if (!product) {
      pdNotFound.style.display = "";
    } else {
      pdSection.style.display = "";

      /* Mise à jour du titre de la page */
      var pageTitle = document.getElementById("page-title");
      if (pageTitle) {
        pageTitle.textContent = "MILITARY PRO | " + product.name;
      }
      document.title = "MILITARY PRO | " + product.name;

      /* Fil d'Ariane */
      var bcCat = document.getElementById("bc-category");
      var bcProd = document.getElementById("bc-product");
      if (bcCat) {
        bcCat.textContent = product.tag;
      }
      if (bcProd) {
        bcProd.textContent = product.name;
      }

      /* Image / icône produit */
      var pdImgMain = document.getElementById("pd-img-main");
      if (pdImgMain) {
        if (product.image) {
          pdImgMain.innerHTML =
            '<img src="' + product.image + '" alt="' + product.name + '" class="pd-img-real">';
        } else {
          var pdIcon = document.getElementById("pd-icon");
          if (pdIcon) {
            pdIcon.className = product.icon;
          }
        }
      }

      /* Tag catégorie */
      var pdTag = document.getElementById("pd-tag");
      if (pdTag) {
        pdTag.textContent = product.tag;
      }

      /* Titre */
      var pdTitle = document.getElementById("pd-title");
      if (pdTitle) {
        pdTitle.textContent = product.name;
      }

      /* Étoiles */
      var pdStars = document.getElementById("pd-stars");
      if (pdStars) {
        var fullStars = Math.floor(product.rating);
        var halfStar = product.rating - fullStars >= 0.5;
        var starsHtml = "";
        for (var s = 0; s < fullStars; s++) {
          starsHtml += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
          starsHtml += '<i class="fas fa-star-half-stroke"></i>';
        }
        pdStars.innerHTML = starsHtml;
        pdStars.setAttribute("aria-label", "Note " + product.rating + " sur 5");
      }

      var pdRatingVal = document.getElementById("pd-rating-val");
      if (pdRatingVal) {
        pdRatingVal.textContent = product.rating.toFixed(1);
      }
      var pdReviews = document.getElementById("pd-reviews");
      if (pdReviews) {
        pdReviews.textContent = "(" + product.reviews + " avis)";
      }

      /* Prix */
      var pdPrice = document.getElementById("pd-price");
      if (pdPrice) {
        pdPrice.textContent = formatPrice(product.price);
      }

      /* Points forts */
      var pdHighlights = document.getElementById("pd-highlights");
      if (pdHighlights) {
        pdHighlights.innerHTML = product.highlights
          .map(function (h) {
            return '<li><i class="fas fa-check"></i> ' + h + "</li>";
          })
          .join("");
      }

      /* Stock */
      var pdStockLabel = document.getElementById("pd-stock-label");
      var pdStockEl = document.getElementById("pd-stock");
      if (pdStockLabel && pdStockEl) {
        if (product.stock <= 5) {
          pdStockLabel.textContent = "Plus que " + product.stock + " en stock";
          pdStockEl.querySelector("i").style.color = "var(--warning)";
          pdStockEl.querySelector("i").className = "fas fa-circle-exclamation";
        } else {
          pdStockLabel.textContent = "En stock (" + product.stock + " disponibles)";
        }
      }

      /* Description */
      var pdDesc = document.getElementById("pd-description");
      if (pdDesc) {
        pdDesc.textContent = product.description;
      }

      /* Spécifications */
      var pdSpecsBody = document.getElementById("pd-specs-body");
      if (pdSpecsBody) {
        pdSpecsBody.innerHTML = product.specs
          .map(function (spec) {
            return (
              "<tr><td><strong>" +
              spec.label +
              "</strong></td><td>" +
              spec.value +
              "</td></tr>"
            );
          })
          .join("");
      }

      /* Produits similaires */
      var pdRelatedGrid = document.getElementById("pd-related-grid");
      if (pdRelatedGrid && product.related) {
        pdRelatedGrid.innerHTML = product.related
          .map(function (relId) {
            var rel = PRODUCTS_DB[relId];
            if (!rel) {
              return "";
            }
            return (
              '<article class="card product">' +
              '<span class="tag">' + rel.tag + "</span>" +
              "<h3>" + rel.name + "</h3>" +
              '<span class="product-price">' + formatPrice(rel.price) + "</span>" +
              '<div class="hero-actions" style="margin-top:0.5rem; gap: 0.4rem;">' +
              '<a href="fiche-produit.html?id=' + rel.id + '" class="btn btn-outline">Voir</a>' +
              '<button class="btn btn-primary js-add-cart" type="button"' +
              ' data-id="' + rel.id + '" data-name="' + rel.name + '" data-price="' + rel.price + '">' +
              "Panier</button>" +
              "</div>" +
              "</article>"
            );
          })
          .join("");

        /* Brancher les boutons panier des produits similaires */
        pdRelatedGrid.querySelectorAll(".js-add-cart").forEach(function (btn) {
          btn.addEventListener("click", function () {
            addToCartFromDataset(btn);
          });
        });
      }

      /* Sélecteur quantité */
      var qtyInput = document.getElementById("pd-qty");
      var qtyDec = document.getElementById("pd-qty-dec");
      var qtyInc = document.getElementById("pd-qty-inc");

      if (qtyInput && qtyDec && qtyInc) {
        qtyDec.addEventListener("click", function () {
          var val = parseInt(qtyInput.value, 10) || 1;
          if (val > 1) {
            qtyInput.value = String(val - 1);
          }
        });
        qtyInc.addEventListener("click", function () {
          var val = parseInt(qtyInput.value, 10) || 1;
          if (val < 99) {
            qtyInput.value = String(val + 1);
          }
        });
      }

      /* Bouton Ajouter au panier (avec quantité) */
      var pdAddCart = document.getElementById("pd-add-cart");
      if (pdAddCart) {
        pdAddCart.addEventListener("click", function () {
          var qty = parseInt(qtyInput ? qtyInput.value : "1", 10) || 1;
          var cart = readCart();
          var existing = cart.find(function (it) {
            return it.id === product.id;
          });
          if (existing) {
            existing.quantity += qty;
          } else {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: qty });
          }
          saveCart(cart);
          updateCartBadges();
          renderDrawerCart();
          showToast(qty + " × " + product.name + " ajouté" + (qty > 1 ? "s" : "") + " au panier.");
        });
      }
    }
  }

  /* ─── Onglets fiche-produit ──────────────────────────────────────── */

  var tabBtns = document.querySelectorAll(".pd-tab-btn");
  var tabContents = document.querySelectorAll(".pd-tab-content");

  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.dataset.tab;

      tabBtns.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      tabContents.forEach(function (panel) {
        panel.style.display = panel.id === "tab-" + target ? "" : "none";
      });
    });
  });

})();
