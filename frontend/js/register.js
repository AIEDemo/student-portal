const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event){
    event.preventDefault();
     const fullname = document.getElementById("fullname").value;
     const email = document.getElementById("regEmail").value;
     const password = document.getElementById("regPassword").value;

     const user ={
      fullname: fullname,
      email: email,
      password: password
     };
     localStorage.setItem(
      "studentUser",
      JSON.stringify(user)
     );
     alert("Registration Successful")

     window.location.href ="index.html";
});