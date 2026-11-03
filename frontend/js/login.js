const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const loginButton = document.getElementById("loginButton");

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message show ${type}`;
}

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Enter your email address and password.", "error");
        return;
    }

    try {
        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";

        const response = await fetch("https://student-portal-nz45.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed.");
        }

        sessionStorage.setItem("studentPortalToken", data.token);
        showMessage("Login successful. Opening dashboard...", "success");

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 800);
    } catch (error) {
        sessionStorage.removeItem("studentPortalToken");
        showMessage(error.message, "error");
    } finally {
        loginButton.disabled = false;
        loginButton.textContent = "Log In";
    }
});
