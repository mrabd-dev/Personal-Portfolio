/* =========================================================
   SIGNATURE RESTAURANT
   Customer Side JavaScript
   File: js/app.js
   ========================================================= */


/* =========================
   1. GET CART
   ========================= */

function getCart() {
    const savedCart = localStorage.getItem("signatureCart");

    if (savedCart) {
        return JSON.parse(savedCart);
    }

    return [];
}


/* =========================
   2. SAVE CART
   ========================= */

function saveCart(cart) {
    localStorage.setItem(
        "signatureCart",
        JSON.stringify(cart)
    );
}


/* =========================
   3. UPDATE CART COUNT
   ========================= */

function updateCartCount() {

    const cart = getCart();

    const cartCount =
        cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

    const countElements =
        document.querySelectorAll("#cart-count");

    countElements.forEach(element => {
        element.textContent = cartCount;
    });
}


/* =========================
   4. ADD ITEM TO CART
   ========================= */

function addToCart(id, name, price) {

    const cart = getCart();

    const existingItem =
        cart.find(item => item.id === id);


    /* Item already exists */

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: id,
            name: name,
            price: Number(price),
            quantity: 1
        });

    }


    saveCart(cart);

    updateCartCount();

    showNotification(
        `${name} added to cart`
    );
}


/* =========================
   5. ADD TO CART BUTTONS
   ========================= */

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const id =
            button.dataset.id;

        const name =
            button.dataset.name;

        const price =
            button.dataset.price;


        addToCart(
            id,
            name,
            price
        );

    });

});


/* =========================
   6. NOTIFICATION
   ========================= */

function showNotification(message) {

    /* Remove old notification */

    const oldNotification =
        document.querySelector(".cart-notification");

    if (oldNotification) {
        oldNotification.remove();
    }


    /* Create notification */

    const notification =
        document.createElement("div");

    notification.className =
        "cart-notification";

    notification.innerHTML = `
        <i class="fa-solid fa-check"></i>
        <span>${message}</span>
    `;


    /* Notification styling */

    Object.assign(
        notification.style,
        {
            position: "fixed",
            right: "25px",
            bottom: "25px",
            background: "#211f1c",
            color: "#ffffff",
            padding: "14px 20px",
            borderRadius: "12px",
            boxShadow:
                "0 12px 35px rgba(0,0,0,0.20)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: "9999",
            fontSize: "14px",
            fontWeight: "600",
            opacity: "0",
            transform:
                "translateY(20px)",
            transition:
                "0.3s ease"
        }
    );


    document.body.appendChild(
        notification
    );


    /* Animate in */

    setTimeout(() => {

        notification.style.opacity = "1";

        notification.style.transform =
            "translateY(0)";

    }, 20);


    /* Remove notification */

    setTimeout(() => {

        notification.style.opacity = "0";

        notification.style.transform =
            "translateY(20px)";


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2500);

}


/* =========================
   7. SMOOTH CATEGORY LINKS
   ========================= */

const categoryLinks =
    document.querySelectorAll(
        '.category-links a[href^="#"]'
    );


categoryLinks.forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

            const section =
                document.querySelector(
                    this.getAttribute("href")
                );


            if (section) {

                event.preventDefault();

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================
   8. CURRENT YEAR
   ========================= */

const yearElements =
    document.querySelectorAll(
        "[data-current-year]"
    );


yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});


/* =========================
   9. INITIALIZE WEBSITE
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

    }
);




/* =========================================================
   CUSTOMER MOBILE MENU
   ========================================================= */

const mobileMenuButton =
    document.querySelector(
        ".mobile-menu-toggle"
    );


const customerNav =
    document.querySelector(
        ".site-header nav"
    );


function closeMobileMenu() {

    if (
        !mobileMenuButton ||
        !customerNav
    ) {
        return;
    }


    customerNav.classList.remove(
        "mobile-menu-open"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    const icon =
        mobileMenuButton.querySelector(
            "i"
        );


    if (icon) {

        icon.className =
            "fa-solid fa-bars";

    }

}



if (
    mobileMenuButton &&
    customerNav
) {


    /* Open / close menu */

    mobileMenuButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const menuIsOpen =
                customerNav.classList.toggle(
                    "mobile-menu-open"
                );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                menuIsOpen
                    ? "true"
                    : "false"
            );


            const icon =
                mobileMenuButton.querySelector(
                    "i"
                );


            if (icon) {

                icon.className =
                    menuIsOpen
                        ? "fa-solid fa-xmark"
                        : "fa-solid fa-bars";

            }

        }
    );



    /* Close after clicking a navigation link */

    customerNav
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            }
        );



    /* Close if user clicks outside menu */

    document.addEventListener(
        "click",
        event => {

            if (
                !customerNav.contains(
                    event.target
                )
                &&
                !mobileMenuButton.contains(
                    event.target
                )
            ) {

                closeMobileMenu();

            }

        }
    );



    /* Reset when returning to desktop */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                800
            ) {

                closeMobileMenu();

            }

        }
    );

}

/* =========================================================
   MENU SEARCH
   ========================================================= */

const menuSearchInput =
    document.getElementById(
        "menu-search-input"
    );


const clearMenuSearch =
    document.getElementById(
        "clear-menu-search"
    );


if (menuSearchInput) {

    const menuCards =
        document.querySelectorAll(
            ".menu-card"
        );


    const menuSections =
        document.querySelectorAll(
            ".menu-section"
        );


    function filterMenu() {

        const searchTerm =
            menuSearchInput.value
                .trim()
                .toLowerCase();


        if (clearMenuSearch) {

            clearMenuSearch.classList.toggle(
                "show",
                searchTerm.length > 0
            );

        }


        menuCards.forEach(card => {

            const cardText =
                card.textContent
                    .toLowerCase();


            const match =
                cardText.includes(
                    searchTerm
                );


            card.style.display =
                match
                    ? ""
                    : "none";

        });



        menuSections.forEach(section => {

            const cards =
                section.querySelectorAll(
                    ".menu-card"
                );


            const hasVisibleCard =
                [...cards].some(
                    card =>
                        card.style.display !==
                        "none"
                );


            section.style.display =
                hasVisibleCard
                    ? ""
                    : "none";

        });

    }



    menuSearchInput.addEventListener(
        "input",
        filterMenu
    );



    if (clearMenuSearch) {

        clearMenuSearch.addEventListener(
            "click",
            () => {

                menuSearchInput.value =
                    "";

                filterMenu();

                menuSearchInput.focus();

            }
        );

    }

}