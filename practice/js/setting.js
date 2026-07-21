// Day 1

const userName = document.getElementById("userName");
const fullName = document.getElementById("fullName");
const currency = document.getElementById("currency");
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const addBtn = document.getElementById("addBtn");

// Day 2

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "index.html";
}

userName.textContent = currentUser.fullName;

if (currentUser.fullName) {
  fullName.value = currentUser.fullName;
}

if (currentUser.currency) {
  currency.value = currentUser.currency;
}

// Save Profile

saveBtn.addEventListener("click", () => {
  const updatedName = fullName.value.trim();

  const updatedCurrency = currency.value;

  // agar name empty hai to error dikhao
  if (updatedName === "") {
    alert("Please enter your full name.");
    fullName.focus();
    return;
  }

  // current user ka data update karo
  currentUser.fullName = updatedName;
  currentUser.currency = updatedCurrency;

  // users array localStorage se nikalo
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // current user ko users array me update karo
  users = users.map((user) => {
    // email same hai to updated user return karo
    if (user.email === currentUser.email) {
      return currentUser;
    }

    // warna purana user return karo
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  userName.textContent = updatedName;

  // success message
  alert("Profile updated successfully.");
});

// save button ka click event laga raha hai

// input se naya naam le raha hai

// dropdown se currency le raha hai

// name empty hai to save nahi hone de raha

// current user object update kar raha hai

// users array me wahi user update kar raha hai

// localStorage me users save kar raha hai

// currentUser bhi update kar raha hai

// navbar me updated naam dikha raha hai

// success message dikha raha hai

// Day 4
// Buttons Event

// logout button par click hone par
logoutBtn.addEventListener("click", () => {
  // current user ko remove karo
  localStorage.removeItem("currentUser");

  // login page par bhejo
  window.location.href = "index.html";
});

// add transaction button par click hone par
addBtn.addEventListener("click", () => {
  // dashboard page open karo
  window.location.href = "dashboard.html";
});

// logout button ka click event laga raha hai

// current login user ko localStorage se remove kar raha hai

// user ko login page par redirect kar raha hai

// add transaction button par dashboard page open kar raha hai

// Day 5
// Extra Features

// enter key dabane par profile save karo
fullName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveBtn.click();
  }
});

fullName.addEventListener("input", () => {
  const value = fullName.value.trim();

  // agar name 3 character se chota hai
  if (value.length > 0 && value.length < 3) {
    // red border dikhao
    fullName.style.borderColor = "red";

    return;
  }

  // normal border dikhao
  fullName.style.borderColor = "";
});

// page load hone par original data save karo
const originalData = {
  fullName: fullName.value,
  currency: currency.value,
};

// page close ya refresh hone se pehle check karo
window.addEventListener("beforeunload", (event) => {
  // agar data change hua hai
  if (
    fullName.value !== originalData.fullName ||
    currency.value !== originalData.currency
  ) {
    // browser warning dikhayega
    event.preventDefault();
    event.returnValue = "";
  }
});

// enter press karne par profile save kar raha hai

// name ki minimum length check kar raha hai

// galat input par red border dikha raha hai

// page load ke time original values save kar raha hai

// agar save kiye bina page band karoge to browser warning dega

// chalo ye bhi khatam hogya baki kal add karunga
