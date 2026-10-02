const loginForm = document.getElementById("admin-login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document
            .getElementById("admin-email")
            .value.trim();

        const password = document
            .getElementById("admin-password")
            .value;

        // DEMO LOGIN ONLY
        if (
            email === "admin@restaurant.com" &&
            password === "admin123"
        ) {
            localStorage.setItem("adminLoggedIn", "true");

            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password.");
        }
    });
}