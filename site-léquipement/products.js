/* =================================================================
   products.js — Base de données produits partagée
   Chargé avant script.js sur toutes les pages qui en ont besoin.
   ================================================================= */

var MILITARY_PRODUCTS = [
  /* ──────────────── ARMURE ──────────────── */
  {
    id: "gilet-alpha-iv",
    name: "Gilet Alpha IV",
    price: 1450,
    category: "armure",
    tag: "Protection",
    rating: 4.8,
    reviewCount: 124,
    icon: "fa-shield-halved",
    shortDesc: "Niveau IV, modularite complete, adaptation vehicule et debarquement.",
    longDesc:
      "Le Gilet Alpha IV est la référence de protection individuelle pour les unités d'intervention et les forces spéciales. " +
      "Conçu selon les exigences NIJ 0101.06 Niveau IV, il arrête les munitions perforantes de 7.62x63mm AP. " +
      "Sa structure modulaire MOLLE permet d'adapter les poches, holsters et accessoires en quelques secondes. " +
      "La ventilation dorsale intégrée assure le confort prolongé lors des opérations longue durée. " +
      "Compatible avec tous les systèmes de communication et d'hydratation du marché.",
    features: [
      "Protection balistique NIJ Niveau IV",
      "Structure modulaire MOLLE complète",
      "Plaques céramique/polyéthylène composites",
      "Ventilation dorsale active",
      "Dégagement rapide en 2 secondes",
      "Compatible systèmes d'hydratation"
    ],
    specs: {
      "Niveau de protection": "NIJ 0101.06 Niveau IV",
      "Poids (taille M)": "7,2 kg",
      "Tailles disponibles": "XS / S / M / L / XL / XXL",
      "Matériau plaques": "Céramique Al2O3 / UHMWPE",
      "Surface de protection": "0,28 m²",
      "Système de fixation": "MOLLE / PALS",
      "Couleurs disponibles": "Multicam, Ranger Green, Coyote, Noir",
      "Certification": "OTAN STANAG 4569, NIJ 0101.06",
      "Garantie": "5 ans constructeur"
    },
    reviews: [
      { author: "Cdt. Moreau", rating: 5, comment: "Qualité et ergonomie irréprochables. Utilisé en conditions réelles.", date: "2026-01-15" },
      { author: "Lt. Bassot", rating: 5, comment: "Le meilleur rapport protection/confort du marché.", date: "2026-02-03" },
      { author: "Sgt. Vidal", rating: 4, comment: "Excellent produit. Légèrement lourd pour les longues marches.", date: "2026-03-20" }
    ]
  },
  {
    id: "casque-sentinel-m2",
    name: "Casque Sentinel M2",
    price: 899,
    category: "armure",
    tag: "Protection",
    rating: 4.7,
    reviewCount: 98,
    icon: "fa-hard-hat",
    shortDesc: "Structure balistique legere, rail accessoire et vision nocturne.",
    longDesc:
      "Le Casque Sentinel M2 représente l'état de l'art en matière de protection crânienne tactique. " +
      "Fabriqué en fibres UHMWPE haute résistance, il offre une protection V50 supérieure à 600 m/s. " +
      "Les rails NVG latéraux ARC et le rail frontal permettent de monter projecteurs, caméras et optiques nocturnes. " +
      "Le système de suspension APEX 3D s'ajuste en moins de 30 secondes et absorbe les chocs cinétiques. " +
      "L'ensemble pèse moins de 1,2 kg pour la taille M, réduisant la fatigue cervicale sur les longues missions.",
    features: [
      "Protection balistique V50 > 600 m/s",
      "Coque UHMWPE multi-couches",
      "Rails latéraux ARC pour accessoires NVG",
      "Rail frontal universel Picatinny",
      "Suspension APEX 3D réglable",
      "Jugulaire 4 points anti-choc",
      "Compatible tous systèmes de communication tactique"
    ],
    specs: {
      "Niveau de protection": "NIJ IIIA / STANAG 2920",
      "Poids (taille M)": "1 180 g",
      "Tailles disponibles": "S / M / L",
      "Matériau coque": "UHMWPE haute densité",
      "Système de rails": "ARC latéral + Picatinny frontal",
      "Suspension": "APEX 3D à réglage rapide",
      "Couleurs disponibles": "Multicam, Noir mat, Coyote",
      "Certification": "NIJ 0106.01, STANAG 2920",
      "Garantie": "3 ans constructeur"
    },
    reviews: [
      { author: "Adj. Lenoir", rating: 5, comment: "Léger et très bien protégé. Les rails sont parfaitement positionnés.", date: "2026-01-28" },
      { author: "Cpl. Aubert", rating: 4, comment: "Très bon casque, la suspension mérite une légère adaptation.", date: "2026-02-14" },
      { author: "Sgt. Morin", rating: 5, comment: "Porté pendant 14h sans inconfort. Exceptionnel.", date: "2026-04-02" }
    ]
  },

  /* ──────────────── COMMUNICATION ──────────────── */
  {
    id: "radio-falcon-x2",
    name: "Radio Falcon X2",
    price: 1220,
    category: "communication",
    tag: "Communication",
    rating: 4.9,
    reviewCount: 87,
    icon: "fa-walkie-talkie",
    shortDesc: "Double bande, chiffrement AES, autonomie 18h, cryptage terrain.",
    longDesc:
      "La Radio Falcon X2 est le système de communication tactique le plus avancé de notre gamme. " +
      "Opérant en double bande VHF/UHF simultanée, elle garantit une connectivité ininterrompue même en zone dégradée. " +
      "Le chiffrement AES-256 de bout en bout sécurise toutes les transmissions contre toute interception. " +
      "L'autonomie de 18 heures en mode combiné émission/réception dépasse les standards NATO. " +
      "Sa certification IP68 la rend pleinement opérationnelle jusqu'à 1,5m de profondeur pendant 30 minutes.",
    features: [
      "Double bande VHF/UHF simultanée",
      "Chiffrement AES-256 bout en bout",
      "Autonomie 18h batterie Li-Ion",
      "Certification IP68 (1,5m / 30min)",
      "Anti-choc MIL-STD-810H",
      "GPS intégré avec position partagée",
      "Recharge rapide USB-C 45W"
    ],
    specs: {
      "Bandes de fréquence": "VHF 136-174 MHz / UHF 400-512 MHz",
      "Chiffrement": "AES-256 FIPS 140-2",
      "Puissance d'émission": "5W / 1W (économie)",
      "Autonomie": "18h (émission/réception mixte)",
      "Résistance": "IP68, MIL-STD-810H",
      "GPS": "Intégré, précision <3m",
      "Poids": "310 g (avec batterie)",
      "Dimensions": "145 × 58 × 32 mm",
      "Certification": "CE, FCC, NATO SECAN",
      "Garantie": "2 ans constructeur"
    },
    reviews: [
      { author: "Lt. Col. Bernard", rating: 5, comment: "Aucune défaillance sur 3 missions. Le chiffrement rassure le commandement.", date: "2026-02-10" },
      { author: "Sgt. Chef Duval", rating: 5, comment: "Autonomie tenue comme annoncée. GPS très précis en terrain boisé.", date: "2026-03-05" },
      { author: "Adj. Petit", rating: 5, comment: "La meilleure radio tactique que j'ai utilisée en 15 ans de service.", date: "2026-04-18" }
    ]
  },
  {
    id: "commlink-secure",
    name: "Commlink Secure",
    price: 420,
    category: "communication",
    tag: "Communication",
    rating: 4.4,
    reviewCount: 63,
    icon: "fa-headset",
    shortDesc: "Oreillette active anti-bruit pour zones a forte pression acoustique.",
    longDesc:
      "Le Commlink Secure est un système d'oreillette tactique à réduction active de bruit (ANR) conçu pour les environnements à forte pression acoustique. " +
      "Il réduit les pics sonores dangereux (>85 dB) tout en amplifiant les sons de faible intensité (voix, pas, signaux), " +
      "permettant une conscience situationnelle maximale. " +
      "Le microphone à suppression de bruit ambiant garantit une transmission claire même en situation d'armes actives. " +
      "Compatible avec tous les systèmes de radio tactique via connecteur standard PTT.",
    features: [
      "Réduction active de bruit (ANR) jusqu'à 28 dB",
      "Amplification des sons faibles (<85 dB)",
      "Microphone à suppression de bruit",
      "Connecteur PTT universel",
      "Compatible casques de combat standard",
      "Autonomie 200h (piles AAA)",
      "Résistance IP54 (poussière/éclaboussures)"
    ],
    specs: {
      "Atténuation passive": "22 dB NRR",
      "Atténuation active": "28 dB supplémentaires",
      "Amplification": "< 85 dB (son ambiant)",
      "Connecteur": "PTT universel + jack 3,5mm",
      "Autonomie": "200h (2x piles AAA)",
      "Résistance": "IP54",
      "Poids": "185 g",
      "Certification": "CE EN 352-4, MIL-STD-810",
      "Garantie": "2 ans constructeur"
    },
    reviews: [
      { author: "Sgt. Garnier", rating: 4, comment: "Excellente atténuation. Compatible avec mon casque Sentinel M2.", date: "2026-01-20" },
      { author: "Cpl. Thomas", rating: 5, comment: "Indispensable en zone de tir. La différence est immédiate.", date: "2026-02-28" },
      { author: "Adj. Roux", rating: 4, comment: "Bon produit. Le connecteur PTT mériterait un verrouillage plus ferme.", date: "2026-03-15" }
    ]
  },

  /* ──────────────── OPTIQUE ──────────────── */
  {
    id: "nightsight-pro",
    name: "NightSight Pro",
    price: 1990,
    category: "optique",
    tag: "Optique",
    rating: 4.9,
    reviewCount: 156,
    icon: "fa-eye",
    shortDesc: "Optique nocturne HD, stabilisation, faible latence video numerique.",
    longDesc:
      "Le NightSight Pro représente le summum de la vision nocturne numérique à bas prix de possession. " +
      "Son capteur CMOS Gen3+ offre une sensibilité de 0,001 lux, permettant une observation parfaite par nuit sans lune. " +
      "La stabilisation électronique 5 axes annule les tremblements et vibrations de plateforme. " +
      "La sortie vidéo numérique HD (1080p / 60 fps) avec latence <15ms permet le partage en temps réel avec le commandement. " +
      "L'enregistrement intégré sur mémoire flash 64 Go conserve toutes les observations.",
    features: [
      "Capteur CMOS Gen3+ (0,001 lux)",
      "Zoom optique x6 + numérique x4",
      "Stabilisation électronique 5 axes",
      "Vidéo HD 1080p / 60 fps latence <15ms",
      "Enregistrement 64 Go flash intégré",
      "Mode Jour / Crépuscule / Nuit auto",
      "Sortie HDMI + WiFi sécurisé",
      "Résistance IP67, -40°C à +65°C"
    ],
    specs: {
      "Capteur": "CMOS Gen3+, 1/1,8\"",
      "Sensibilité minimale": "0,001 lux",
      "Zoom optique": "×6 (équiv. 50-300mm)",
      "Résolution vidéo": "1080p HD, 60 fps",
      "Latence vidéo": "<15 ms",
      "Stabilisation": "5 axes électronique",
      "Stockage": "64 Go flash intégré",
      "Autonomie": "8h (batterie Li-Ion 7,4V)",
      "Résistance": "IP67, MIL-STD-810H",
      "Poids": "820 g",
      "Certification": "CE, ITAR exempt, NATO",
      "Garantie": "3 ans constructeur"
    },
    reviews: [
      { author: "Cdt. Leclerc", rating: 5, comment: "Vision parfaite à 800m par nuit sans lune. Extraordinaire.", date: "2026-01-12" },
      { author: "Lt. Girard", rating: 5, comment: "La stabilisation change tout en véhicule. Aucune comparaison possible.", date: "2026-02-20" },
      { author: "Sgt. Lambert", rating: 5, comment: "Le partage vidéo temps réel avec le PC a amélioré nos coordinations.", date: "2026-03-30" }
    ]
  },
  {
    id: "thermo-scout-xt",
    name: "Thermo Scout XT",
    price: 1640,
    category: "optique",
    tag: "Optique",
    rating: 4.8,
    reviewCount: 112,
    icon: "fa-temperature-high",
    shortDesc: "Camera thermique 1.2 km, mode patrouille, alerte mouvement.",
    longDesc:
      "Le Thermo Scout XT est une caméra thermique longue portée dédiée à la surveillance périmétrique et à la reconnaissance. " +
      "Son détecteur non-refroidi 640×480 à pas de 12µm détecte des signatures thermiques à plus de 1,2 km. " +
      "Le mode patrouille automatise le balayage de secteur et génère des alarmes sur détection de mouvement. " +
      "L'intelligence artificielle embarquée classe automatiquement les cibles (personne / véhicule / animal) " +
      "réduisant les faux positifs de 80% par rapport aux systèmes classiques.",
    features: [
      "Détecteur thermique 640×480, pas 12µm",
      "Portée de détection 1,2 km (personne)",
      "Mode patrouille automatique par secteur",
      "Alerte mouvement avec classification IA",
      "Sortie vidéo HDMI + Ethernet sécurisé",
      "Superposition GPS et coordonnées",
      "Résistance IP66, -30°C à +55°C"
    ],
    specs: {
      "Détecteur": "Microbolométrique non-refroidi 640×480",
      "Pas du détecteur": "12 µm",
      "NETD": "< 40 mK",
      "Portée détection (homme debout)": "1 200 m",
      "Portée reconnaissance": "600 m",
      "Classification IA": "Personne / Véhicule / Animal",
      "Fréquence d'image": "25 / 50 Hz",
      "Sortie vidéo": "HDMI 1.4, Ethernet GigE",
      "Résistance": "IP66, -30°C / +55°C",
      "Poids": "1 100 g",
      "Garantie": "3 ans constructeur"
    },
    reviews: [
      { author: "Lt. Col. Mercier", rating: 5, comment: "Détection à 1km testée. L'IA réduit vraiment les fausses alertes.", date: "2026-02-05" },
      { author: "Adj. Simon", rating: 5, comment: "Mode patrouille très pratique pour les postes fixes en veille.", date: "2026-03-11" },
      { author: "Sgt. Chef Martin", rating: 4, comment: "Excellent matériel. L'interface de configuration mériterait d'être simplifiée.", date: "2026-04-25" }
    ]
  },

  /* ──────────────── LOGISTIQUE ──────────────── */
  {
    id: "sac-tactical-pro",
    name: "Sac Tactical Pro",
    price: 290,
    category: "logistique",
    tag: "Logistique",
    rating: 4.5,
    reviewCount: 201,
    icon: "fa-bag-shopping",
    shortDesc: "Sac modulaire 65L, compartiments et hydratation integree.",
    longDesc:
      "Le Sac Tactical Pro est le compagnon logistique indispensable pour les opérations de 24 à 72 heures. " +
      "Sa capacité de 65L se répartit entre le compartiment principal, le compartiment de communication et " +
      "la poche administrative avant. Le dos thermorégulé AirFlow maintient une circulation d'air " +
      "continue entre le sac et l'opérateur sur les longues marches. " +
      "La poche d'hydratation intégrée 3L est compatible tous réservoirs du marché. " +
      "Le système MOLLE externe permet d'y fixer tout équipement modulaire.",
    features: [
      "Volume 65L + poches externes extensibles",
      "Dos thermorégulé AirFlow 360°",
      "Poche hydratation 3L intégrée",
      "MOLLE externe sur 3 faces",
      "Compartiment de communication isolé",
      "Sangles de compression latérales",
      "Matériau 1000D Cordura ripstop"
    ],
    specs: {
      "Volume": "65L (+ 12L extensibles)",
      "Matériau": "Cordura 1000D ripstop",
      "Poche hydratation": "3L, compatible tous réservoirs",
      "Système MOLLE": "3 faces + fond",
      "Dos": "AirFlow thermorégulé 360°",
      "Armature": "Aluminium 7075 amovible",
      "Poids (vide)": "1 850 g",
      "Couleurs disponibles": "Multicam, Ranger Green, Coyote, Noir",
      "Certification": "ISO 9001, OTAN",
      "Garantie": "5 ans constructeur"
    },
    reviews: [
      { author: "Sgt. Leblanc", rating: 5, comment: "Robuste, bien organisé et confortable sur 40km. Parfait.", date: "2026-01-08" },
      { author: "Cpl. Fontaine", rating: 4, comment: "Excellent sac. Le compartiment communication très pratique.", date: "2026-02-22" },
      { author: "Adj. Chevalier", rating: 5, comment: "Utilisé sur 5 exercises. Aucun défaut. Je le recommande.", date: "2026-04-10" }
    ]
  },
  {
    id: "kit-survie-s500",
    name: "Kit Survie S500",
    price: 590,
    category: "logistique",
    tag: "Logistique",
    rating: 4.6,
    reviewCount: 143,
    icon: "fa-kit-medical",
    shortDesc: "Kit complet 72h avec filtration eau, energie et soins d urgence.",
    longDesc:
      "Le Kit Survie S500 est un système intégré de survie pour 72 heures en autonomie complète. " +
      "Il rassemble dans un conteneur étanche certifié IP67 les équipements essentiels de filtration d'eau, " +
      "de production d'énergie solaire, de soins d'urgence et de signalisation. " +
      "Le filtre à eau LifeStraw Military traite 100 000 litres et élimine 99,9999% des bactéries. " +
      "Le panneau solaire pliable 20W recharge les équipements électroniques et la batterie de secours 20 000 mAh.",
    features: [
      "Conteneur étanche IP67 25L",
      "Filtre eau LifeStraw Military (100 000L)",
      "Panneau solaire pliable 20W",
      "Batterie de secours 20 000 mAh USB-C",
      "Kit soins d'urgence TCCC complet",
      "Rations alimentaires 72h (3x 3 500 kcal)",
      "Signalisation : miroir, sifflet, balise PLB"
    ],
    specs: {
      "Durée d'autonomie": "72 heures / 1 opérateur",
      "Conteneur": "IP67, 25L rigide",
      "Filtration eau": "LifeStraw Military, 100 000L garanti",
      "Énergie solaire": "Panneau 20W, rendement 22%",
      "Batterie secours": "20 000 mAh, USB-C 65W",
      "Soins": "Kit TCCC (garrots, hémostase, sutures)",
      "Rations": "3 × 3 500 kcal, 5 ans de péremption",
      "Balise PLB": "406 MHz, autonomie 48h",
      "Poids total": "8,4 kg",
      "Certification": "ISO 13485 (médical), CE",
      "Garantie": "3 ans conteneur / Voir produits inclus"
    },
    reviews: [
      { author: "Lt. Perrin", rating: 5, comment: "Testé en exercice de survie 48h. Complet et fiable.", date: "2026-01-30" },
      { author: "Sgt. Renard", rating: 5, comment: "Le filtre eau et la batterie solaire m'ont sauvé la mise.", date: "2026-03-08" },
      { author: "Adj. Clement", rating: 4, comment: "Très complet. Le panneau solaire est un peu fragile.", date: "2026-04-20" }
    ]
  }
];
