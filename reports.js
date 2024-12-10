// Sample data for expenses (Replace with real data in a production environment)
const expenses = [
    { date: "2024-12-01", category: "Food", amount: 50 },
    { date: "2024-12-02", category: "Transport", amount: 30 },
    { date: "2024-12-03", category: "Entertainment", amount: 70 },
    { date: "2024-12-04", category: "Food", amount: 20 },
    { date: "2024-12-05", category: "Bills", amount: 100 },
    { date: "2024-12-06", category: "Transport", amount: 25 },
    { date: "2024-12-07", category: "Food", amount: 40 }
  ];
  
  // Categories and their corresponding colors for the chart
  const categories = ["Food", "Transport", "Entertainment", "Bills"];
  const categoryColors = ["#4CAF50", "#2196F3", "#FF9800", "#FF5722"];
  
  // Calculate total expenses by category
  const categoryData = categories.map(category => {
    return expenses.filter(expense => expense.category === category).reduce((sum, expense) => sum + expense.amount, 0);
  });
  
  // Set up the total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById("totalExpenses").textContent = `$${totalExpenses.toFixed(2)}`;
  
  // Set up the remaining budget (for demonstration purposes, assume a budget of $500)
  const budget = 500;
  const remainingBudget = budget - totalExpenses;
  document.getElementById("remainingBudget").textContent = `$${remainingBudget.toFixed(2)}`;
  
  // Set up the Expense Chart
  const ctx = document.getElementById('expenseChart').getContext('2d');
  const expenseChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [{
        label: 'Expenses by Category',
        data: categoryData,
        backgroundColor: categoryColors,
        borderColor: categoryColors.map(color => color.replace(')', ', 0.8)').replace('rgb', 'rgba')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Populate the expense table with expense details
  const expenseTable = document.getElementById("expenseTable").getElementsByTagName("tbody")[0];
  expenses.forEach(expense => {
    const row = expenseTable.insertRow();
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>$${expense.amount.toFixed(2)}</td>
    `;
  });
  