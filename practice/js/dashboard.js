// ================= Current User =================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "./login.html";
}

// ================= DOM =================

const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("transactionModal");
const closeModal = document.getElementById("closeModal");

const form = document.getElementById("transactionForm");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const count = document.getElementById("count");

const transactionList = document.getElementById("transactionList");
const resetBtn = document.getElementById("resetBtn");

const themeToggle = document.getElementById("themeToggle");

// ================= Username =================

userName.textContent = currentUser.username;

// ================= Logout =================

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
});

// ================= Modal =================

addBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// day 2

// ================= Transactions =================

const storageKey = `transactions_${currentUser.username}`;

let transactions = JSON.parse(localStorage.getItem(storageKey)) || [];

// ================= Save Transaction =================

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;

  if (!description || !amount || !date || !category) {
    alert("Please fill all fields.");
    return;
  }

  const transaction = {
    id: Date.now(),
    type,
    description,
    amount,
    date,
    category,
  };

  transactions.push(transaction);

  localStorage.setItem(storageKey, JSON.stringify(transactions));

  form.reset();

  modal.classList.remove("active");

  renderTransactions();
  updateSummary();

  if (typeof updateChart === "function") {
    updateChart();
  }
});

// day 3

// ================= Render Transactions =================

function renderTransactions() {
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;">
          No Transactions Found
        </td>
      </tr>
    `;
    return;
  }

  transactions.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <span class="${item.type === "Income" ? "income" : "expense"}">
          ${item.type}
        </span>
      </td>

      <td>${item.description}</td>

      <td class="${item.type === "Income" ? "income" : "expense"}">
        ${item.type === "Income" ? "+" : "-"}₹${item.amount}
      </td>

      <td>${item.date}</td>

      <td>${item.category}</td>

      <td>
        <button
          class="delete-btn"
          onclick="deleteTransaction(${item.id})"
        >
          Delete
        </button>
      </td>
    `;

    transactionList.appendChild(row);
  });
}

// ================= Summary Cards =================

function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((item) => {
    if (item.type === "Income") {
      totalIncome += item.amount;
    } else {
      totalExpense += item.amount;
    }
  });

  const totalBalance = totalIncome - totalExpense;

  balance.textContent = `₹${totalBalance.toFixed(2)}`;
  income.textContent = `₹${totalIncome.toFixed(2)}`;
  expense.textContent = `₹${totalExpense.toFixed(2)}`;
  count.textContent = transactions.length;
}

// ================= Delete Transaction =================

function deleteTransaction(id) {
  const confirmDelete = confirm("Delete this transaction?");

  if (!confirmDelete) return;

  transactions = transactions.filter((item) => item.id !== id);

  localStorage.setItem(storageKey, JSON.stringify(transactions));

  renderTransactions();
  updateSummary();

  if (typeof updateChart === "function") {
    updateChart();
  }
}
// day 4
// ================= Theme =================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark") ? "dark" : "light";

  localStorage.setItem("theme", theme);
});

// ================= Reset All Data =================

resetBtn.addEventListener("click", () => {
  const confirmReset = confirm(
    "Are you sure you want to delete all transactions?",
  );

  if (!confirmReset) return;

  transactions = [];

  localStorage.setItem(storageKey, JSON.stringify(transactions));

  renderTransactions();
  updateSummary();

  if (typeof updateChart === "function") {
    updateChart();
  }
});

// ================= Chart =================

let chart;

function updateChart() {
  const incomeTotal = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenseTotal = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const ctx = document.getElementById("chart").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "doughnut",

    data: {
      labels: ["Income", "Expense"],

      datasets: [
        {
          data: [incomeTotal, expenseTotal],

          backgroundColor: ["#22c55e", "#ef4444"],

          borderWidth: 0,
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

// ================= Initial Load =================

function init() {
  renderTransactions();
  updateSummary();
  updateChart();
}

init();

// day 5
