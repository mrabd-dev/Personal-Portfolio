document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // SELECT NAVBAR ELEMENTS
    // ===============================

    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".links");


    // Stop if navbar is not found
    if (!menuIcon || !navLinks) {
        return;
    }


    // ===============================
    // OPEN MOBILE MENU
    // ===============================

    function openMenu() {

        navLinks.classList.add("open");

        // Change hamburger ☰ into X
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

        menuIcon.setAttribute("aria-expanded", "true");
    }


    // ===============================
    // CLOSE MOBILE MENU
    // ===============================

    function closeMenu() {

        navLinks.classList.remove("open");

        // Change X back into hamburger ☰
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

        menuIcon.setAttribute("aria-expanded", "false");
    }


    // ===============================
    // HAMBURGER CLICK
    // ===============================

    menuIcon.addEventListener("click", function () {

        if (navLinks.classList.contains("open")) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    // ===============================
    // CLOSE MENU AFTER CLICKING LINK
    // ===============================

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMenu();

        });

    });


    // ===============================
    // CLOSE MENU WHEN CLICKING OUTSIDE
    // ===============================

    document.addEventListener("click", function (event) {

        if (
            navLinks.classList.contains("open") &&
            !navLinks.contains(event.target) &&
            !menuIcon.contains(event.target)
        ) {

            closeMenu();

        }

    });


    // ===============================
    // CLOSE WITH ESC KEY
    // ===============================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    // ===============================
    // KEYBOARD ACCESSIBILITY
    // ===============================

    menuIcon.setAttribute("role", "button");
    menuIcon.setAttribute("tabindex", "0");
    menuIcon.setAttribute("aria-label", "Open navigation menu");
    menuIcon.setAttribute("aria-expanded", "false");


    menuIcon.addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            if (navLinks.classList.contains("open")) {

                closeMenu();

            } else {

                openMenu();

            }

        }

    });


    // ===============================
    // RESET MENU ON DESKTOP
    // ===============================

    window.addEventListener("resize", function () {

        if (window.innerWidth > 991) {

            closeMenu();

        }

    });

});


// ========================================
// SMOOTH PAGE TRANSITION
// ========================================

const pageLinks = document.querySelectorAll(
    '.links a, .hirebtn, .hero-btn1, .hero-btn2, .project-link'
);

pageLinks.forEach(function(link){

    link.addEventListener("click", function(event){

        const url = link.getAttribute("href");

        // Ignore empty links
        if (!url || url === "#") {
            return;
        }

        // Ignore email links
        if (url.startsWith("mailto:")) {
            return;
        }

        // Ignore external links
        if (
            link.target === "_blank" ||
            url.startsWith("http")
        ){
            return;
        }

        event.preventDefault();

        document.body.classList.add("page-leaving");

        setTimeout(function(){

            window.location.href = url;

        }, 250);

    });

});

const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("formStatus");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("/", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            statusMessage.textContent =
                "✓ Message sent successfully! I'll get back to you soon.";

            statusMessage.className = "form-status success";

            form.reset();
        } else {
            throw new Error("Submission failed");
        }

    } catch (error) {
        statusMessage.textContent =
            "Something went wrong. Please try again.";

        statusMessage.style.display = "block";
        statusMessage.style.color = "#ff6b6b";
    }
});