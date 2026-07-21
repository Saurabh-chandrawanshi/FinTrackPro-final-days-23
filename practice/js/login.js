// Select Elements

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Login Event

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Validation
  if (username === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  // Get Users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find User
  const validUser = users.find(function (user) {
    return user.username === username && user.password === password;
  });

  // Login Success
  if (validUser) {
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    alert("Login Successful");

    window.location.href = "./dashboard.html";
  } else {
    alert("Invalid Username or Password");

    setTimeout(() => {
      window.location.href = "./register.html";
    }, 1000);
  }
});
