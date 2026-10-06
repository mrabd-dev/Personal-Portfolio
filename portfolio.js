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
// CONTACT FORM
// ========================================

const form = document.getElementById("contactform");
const statusMessage = document.getElementById("formStatus");

const submitBtn = form
    ? form.querySelector('button[type="submit"]')
    : null;


if (form && statusMessage && submitBtn) {

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        submitBtn.disabled = true;

        submitBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(form);

        try {

            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                statusMessage.textContent =
                    "✓ Message sent successfully! I'll get back to you soon.";

                statusMessage.style.display = "block";
                statusMessage.style.color = "#25d366";

                form.reset();

            } else {

                throw new Error("Submission failed");

            }

        } catch (error) {

            statusMessage.textContent =
                "Something went wrong. Please try again.";

            statusMessage.style.display = "block";
            statusMessage.style.color = "#ff6b6b";

        } finally {

            submitBtn.disabled = false;

            submitBtn.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Send Message';
        }

    });

}




