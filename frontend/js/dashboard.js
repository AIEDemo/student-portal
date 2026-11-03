const user = JSON.parse(localStorage.getItem("studentUser"));
const welcomeMessage = document.getElementById("welcomeMessage");
if(user){
    welcomeMessage.textContent = "Welcome "+ user.fullname;
}
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("studentUser");
    window.location.href ="index.html";
}

)