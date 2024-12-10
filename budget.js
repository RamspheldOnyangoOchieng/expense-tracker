// budget.js
const setBudgetBtn = document.getElementById("setBudgetBtn");
const budgetModal = document.getElementById("budgetModal");
const closeModal = document.getElementById("closeModal");
const budgetForm = document.getElementById("budgetForm");
const budgetAmount = document.getElementById("budgetAmount");
const currentBudget = document.getElementById("currentBudget");
const progress = document.getElementById("progress");
const progressPercentage = document.getElementById("progressPercentage");
const currentBudgetLabel = document.getElementById("currentBudgetLabel");

// Fetch current budget from the backend
fetch('http://localhost:5000/api/budget')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const latestBudget = data[data.length - 1]; // Get the latest budget
            currentBudget.textContent = `$${latestBudget.amount.toFixed(2)}`;
            currentBudgetLabel.textContent = "Your Budget: ";
        }
    });

// Open modal for setting budget
setBudgetBtn.addEventListener("click", () => {
    budgetModal.style.display = "flex";
});

// Close the modal
closeModal.addEventListener("click", () => {
    budgetModal.style.display = "none";
});

// Handle form submission
budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat(budgetAmount.value.trim());

    if (amount && amount > 0) {
        // Set the current budget
        currentBudget.textContent = `$${amount.toFixed(2)}`;
        currentBudgetLabel.textContent = "Your Budget: ";

        // Show progress bar with initial value
        progress.style.width = "0%";
        progressPercentage.textContent = "0%";
        budgetModal.style.display = "none"; // Close modal

        // Store the budget value in the backend
        fetch('http://localhost:5000/api/budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
        });
    } else {
        alert("Please enter a valid amount .");
    }
});

// Function to update progress bar based on expenses
function updateProgress(expenseAmount) {
    const budget = parseFloat(currentBudget.textContent.replace('$', ''));
    if (budget && expenseAmount >= 0) {
        const percentage = (expenseAmount / budget) * 100;
        progress.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage.toFixed(2)}%`;
    }
}

// Example: Updating the progress with a specific expense value
// Uncomment the next line to simulate expense update
// updateProgress(300);