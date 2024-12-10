// Initialize Expense Chart
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("expenseChart").getContext("2d");
  
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Housing", "Food", "Transportation", "Utilities", "Entertainment","Others"],
        datasets: [
          {
            label: "Expenses",
            data: [500, 300, 150, 100, 50],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Expense Breakdown",
          },
        },
      },
    });
  });
  