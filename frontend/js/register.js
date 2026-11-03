const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");
const registerButton = document.getElementById("registerButton");

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message show ${type}`;
}

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password || !confirmPassword) {
        showMessage("Complete all registration fields.", "error");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must contain at least 6 characters.", "error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "error");
        return;
    }

    try {
        registerButton.disabled = true;
        registerButton.textContent = "Registering...";

        const response = await fetch("https://student-portal-nz45.onrender.com/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed.");
        }

        showMessage("Registration successful. Redirecting to login...", "success");
        registerForm.reset();

        setTimeout(() => {
            window.location.href = "/";
        }, 1200);
    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        registerButton.disabled = false;
        registerButton.textContent = "Register";
    }
});
