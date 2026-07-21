const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "./login.html";
}

// Show Username ke liye
const userName = document.getElementById("userName");

userName.textContent = currentUser.username;

// logout system ke liye
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
  // Current login user ko remove karo
  localStorage.removeItem("currentUser");

  // Login page par bhejo
  window.location.href = "./login.html";
});

// add transition par click karne par ye modele chalega
const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("transactionModal");
const closeModal = document.getElementById("closeModal");

addBtn.addEventListener("click", function () {
  modal.classList.add("active");
});

closeModal.addEventListener("click", function () {
  modal.classList.remove("active");
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
