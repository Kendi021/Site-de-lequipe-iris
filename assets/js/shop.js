const produits = [
    // Exemple de structure pour ajouter un article avec photo:
    // {
    //     id: 1,
    //     nom: "Nom du produit",
    //     categorie: "protection",
    //     description: "Description courte du produit.",
    //     prix: 99,
    //     image: "./media/mon-produit.jpg"
    // }
];

const CART_STORAGE_KEY = "iris-shop-cart";

function loadCart() {
    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);

        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function saveCart() {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

const cart = loadCart();

if (produits.length === 0 && cart.length > 0) {
    cart.length = 0;
    saveCart();
}

const catalogueEl = document.getElementById("catalogue");
const filtreCategorieEl = document.getElementById("filtre-categorie");
const rechercheEl = document.getElementById("recherche");
const cartListEl = document.getElementById("cart-list");
const cartCountEls = document.querySelectorAll("[data-cart-count]");
const cartTotalEl = document.getElementById("cart-total");
const viderPanierEl = document.getElementById("vider-panier");
const recapCountEl = document.getElementById("recap-count");
const recapSubtotalEl = document.getElementById("recap-subtotal");
const recapShippingEl = document.getElementById("recap-shipping");
const recapTotalEl = document.getElementById("recap-total");
const checkoutButtonEl = document.getElementById("checkout-button");

function formatPrix(valeur) {
    return `${valeur} EUR`;
}

function renduCatalogue() {
    if (!catalogueEl || !filtreCategorieEl || !rechercheEl) {
        return;
    }

    const categorie = filtreCategorieEl.value;
    const recherche = rechercheEl.value.trim().toLowerCase();

    const filtres = produits.filter((produit) => {
        const matchCategorie = categorie === "tous" || produit.categorie === categorie;
        const matchTexte =
            produit.nom.toLowerCase().includes(recherche) ||
            produit.description.toLowerCase().includes(recherche);

        return matchCategorie && matchTexte;
    });

    if (filtres.length === 0) {
        catalogueEl.innerHTML = "<p class=\"cart-empty\">Aucun article disponible pour le moment. Ajoutez vos produits dans le fichier JavaScript avec une image.</p>";
        return;
    }

    catalogueEl.innerHTML = filtres
        .map(
            (produit) => {
                const imageProduit = produit.image || "./assets/images/backgroundimg.jpg";

                return `
            <article class="produit">
                <div class="produit-media">
                    <img src="${imageProduit}" alt="${produit.nom}" loading="lazy">
                </div>
                <span class="produit-tag">${produit.categorie}</span>
                <h3>${produit.nom}</h3>
                <p>${produit.description}</p>
                <div class="produit-footer">
                    <span class="produit-prix">${formatPrix(produit.prix)}</span>
                    <button type="button" data-produit-id="${produit.id}">Ajouter</button>
                </div>
            </article>
        `;
            }
        )
        .join("");
}

function renduPanier() {
    cartCountEls.forEach((element) => {
        element.textContent = String(cart.length);
    });

    if (!cartListEl || !cartTotalEl) {
        updateRecap(0);
        return;
    }

    if (cart.length === 0) {
        cartListEl.innerHTML = "<li class=\"cart-empty\">Votre panier est vide.</li>";
        cartTotalEl.textContent = "0 EUR";
        updateRecap(0);
        return;
    }

    const total = cart.reduce((somme, item) => somme + item.prix, 0);

    cartListEl.innerHTML = cart
        .map(
            (item, index) => `
            <li class="cart-item">
                <span>${item.nom} - ${formatPrix(item.prix)}</span>
                <button type="button" data-remove-index="${index}">Retirer</button>
            </li>
        `
        )
        .join("");

    cartTotalEl.textContent = formatPrix(total);
    updateRecap(total);
}

function updateRecap(sousTotal) {
    const fraisLivraison = sousTotal > 0 ? 9 : 0;
    const totalPayer = sousTotal + fraisLivraison;

    if (recapCountEl) {
        recapCountEl.textContent = String(cart.length);
    }

    if (recapSubtotalEl) {
        recapSubtotalEl.textContent = formatPrix(sousTotal);
    }

    if (recapShippingEl) {
        recapShippingEl.textContent = formatPrix(fraisLivraison);
    }

    if (recapTotalEl) {
        recapTotalEl.textContent = formatPrix(totalPayer);
    }

    if (checkoutButtonEl) {
        if (cart.length === 0) {
            checkoutButtonEl.classList.add("is-disabled");
            checkoutButtonEl.setAttribute("aria-disabled", "true");
            checkoutButtonEl.setAttribute("tabindex", "-1");
            checkoutButtonEl.setAttribute("href", "#");
            return;
        }

        checkoutButtonEl.classList.remove("is-disabled");
        checkoutButtonEl.removeAttribute("aria-disabled");
        checkoutButtonEl.removeAttribute("tabindex");
        checkoutButtonEl.setAttribute("href", "./checkout.html");
    }
}

if (catalogueEl) {
    catalogueEl.addEventListener("click", (event) => {
        const cible = event.target;

        if (!(cible instanceof HTMLElement)) {
            return;
        }

        const id = Number(cible.dataset.produitId);

        if (!id) {
            return;
        }

        const produit = produits.find((item) => item.id === id);

        if (!produit) {
            return;
        }

        cart.push(produit);
        saveCart();
        renduPanier();
    });
}

if (cartListEl) {
    cartListEl.addEventListener("click", (event) => {
        const cible = event.target;

        if (!(cible instanceof HTMLElement)) {
            return;
        }

        const index = Number(cible.dataset.removeIndex);

        if (Number.isNaN(index)) {
            return;
        }

        cart.splice(index, 1);
        saveCart();
        renduPanier();
    });
}

if (filtreCategorieEl) {
    filtreCategorieEl.addEventListener("change", renduCatalogue);
}

if (rechercheEl) {
    rechercheEl.addEventListener("input", renduCatalogue);
}

if (viderPanierEl) {
    viderPanierEl.addEventListener("click", () => {
        cart.length = 0;
        saveCart();
        renduPanier();
    });
}

renduCatalogue();
renduPanier();
