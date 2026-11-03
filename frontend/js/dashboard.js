const welcomeMessage = document.getElementById("welcomeMessage");
const message = document.getElementById("message");
const logoutButton = document.getElementById("logoutButton");
const token = sessionStorage.getItem("studentPortalToken");

function redirectToLogin() {
    sessionStorage.removeItem("studentPortalToken");
    window.location.href = "/";
}

async function loadDashboard() {
    if (!token) {
        redirectToLogin();
        return;
    }

    try {
        const response = await fetch("https://student-portal-nz45.onrender.com/api/auth/dashboard", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Dashboard access failed.");
        }

        welcomeMessage.textContent = `Welcome, ${data.user.fullName}.`;
    } catch (error) {
        message.textContent = error.message;
        message.className = "message show error";
        setTimeout(redirectToLogin, 1500);
    }
}

logoutButton.addEventListener("click", redirectToLogin);
loadDashboard();
