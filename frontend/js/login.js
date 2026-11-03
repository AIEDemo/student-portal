const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit",function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const storedUser =
    JSON.parse(localStorage.getItem("studentUser"));
    if(!storedUser){
        alert("No registered user found");
        return;
    }
    if(email=== storedUser.email && 
        password=== storedUser.password
    ){
        alert("Login Successful");
        window.location.href = "dashboard.html";
    } else{
        alert("Invalid Email or Password");
    }

    
});