const registerForm = document.getElementById("registerForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find(function (user) {
    return user.username === username;
  });

  if (userExists) {
    alert("Username already exists");
    return;
  }

  const newUser = {
    username: username,
    password: password,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration Successful");

  registerForm.reset();

  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1000);
});
