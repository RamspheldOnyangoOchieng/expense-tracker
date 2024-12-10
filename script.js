document.querySelector('.add-expense-btn').addEventListener('click', function() {
  const category = prompt("Enter category:");
  const amount = prompt("Enter amount:");
  
  fetch('http://localhost:5000/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, amount })
  })
  .then(response => response.json())
  .then(data => {
      alert(`Expense added: ${JSON.stringify(data)}`);
  })
  .catch(err => {
      console.error("Error:", err);
  });
});
