// expenses.js
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseModal = document.getElementById("expenseModal");
const closeModal = document.getElementById("closeModal");
const expenseForm = document.getElementById("expenseForm");
const expenseTitle = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const submitExpense = document.getElementById("submitExpense");
const expenseList = document.getElementById("expenseList");

// Fetch expenses from the backend
function fetchExpenses() {
    fetch('http://localhost:5000/api/expenses')
        .then(response => response.json())
        .then(data => {
            expenseList.innerHTML = ''; // Clear existing expenses
            data.forEach(expense => {
                const expenseItem = document.createElement("div");
                expenseItem.classList.add("expense-item");
                expenseItem.innerHTML = `
                    <span class="expense-title">${expense.title}</span>
                    <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
                    <button class="edit-btn" onclick="editExpense(this, ${expense.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
                `;
                expenseList.appendChild(expenseItem);
            });
        });
}

// Open modal for adding an expense
addExpenseBtn.addEventListener("click", () => {
    expenseModal.style.display = "flex";
    submitExpense.textContent = "Add Expense";
    expenseTitle.value = "";
    expenseAmount.value = "";
});

// Close the modal
closeModal.addEventListener("click", () => {
    expenseModal.style.display = "none";
});

// Handle form submission
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = expenseTitle.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());

    if (title && !isNaN(amount) && amount > 0) {
        const expense = { title, amount };
        fetch('http://localhost:5000/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense)
        })
        .then(() => {
            fetchExpenses(); // Refresh the expense list
            expenseModal.style.display = "none"; // Close modal
        });
    } else {
        alert("Please fill out all fields correctly.");
    }
});

// Delete expense
function deleteExpense(id) {
    fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchExpenses()); // Refresh the expense list
}

// Edit expense
function editExpense(button, id) {
    const expenseItem = button.parentElement;
    const title = expenseItem.querySelector(".expense-title").textContent;
    const amount = expenseItem.querySelector(".expense-amount").textContent.replace('$', '');

    expenseTitle.value = title;
    expenseAmount.value = amount;

    submitExpense.textContent = "Update Expense";
    expenseModal.style.display = "flex";

    expenseForm.onsubmit = (e) => {
        e.preventDefault();
        const updatedExpense = { title: expenseTitle.value, amount: parseFloat(expenseAmount.value) };
        fetch(`http://localhost:5000/api/expenses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedExpense)
        })
        .then(() => {
            fetchExpenses(); // Refresh the expense list
            expenseModal.style.display = "none"; // Close modal
        });
    };
}

// Initial fetch of expenses
fetchExpenses();