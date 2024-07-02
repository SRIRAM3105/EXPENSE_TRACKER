const expenses = [];
let income = 0;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Bootstrap tabs
  $('#nav-tab a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  // Add Expense
  const expenseForm = document.getElementById('expense-form');
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;

    const expense = { description, amount, date };
    expenses.push(expense);

    displayExpenses();
    updateBalance();
    expenseForm.reset();
  });

  // Remove Expense
  function removeExpense(description, date) {
    const index = expenses.findIndex(expense => expense.description === description && expense.date === date);
    if (index !== -1) {
      expenses.splice(index, 1);
      displayExpenses();
      updateBalance();
    }
  }

  // Display Recent Expenses
  function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
        ${expense.description} - ₹${expense.amount.toFixed(2)} - ${expense.date}
        <button class="btn btn-danger btn-sm" onclick="removeExpense('${expense.description}', '${expense.date}')">Remove</button>
      `;
      expenseList.appendChild(li);
    });
  }

  // Filter/Search Expenses
  const filterForm = document.getElementById('filter-form');
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filterDescription = document.getElementById('filter-description').value;
    const filterDate = document.getElementById('filter-date').value;

    const filteredExpenses = expenses.filter(expense => {
      return (filterDescription ? expense.description.toLowerCase().includes(filterDescription.toLowerCase()) : true) &&
             (filterDate ? expense.date.startsWith(filterDate) : true);
    });

    displayFilteredExpenses(filteredExpenses);
  });

  function displayFilteredExpenses(filteredExpenses) {
    const filterList = document.getElementById('filter-list');
    filterList.innerHTML = '';
    filteredExpenses.forEach(expense => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
        ${expense.description} - ₹${expense.amount.toFixed(2)} - ${expense.date}
        <button class="btn btn-danger btn-sm" onclick="removeExpense('${expense.description}', '${expense.date}')">Remove</button>
      `;
      filterList.appendChild(li);
    });
  }

  // Generate Monthly Report
  const reportForm = document.getElementById('report-form');
  reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reportMonth = document.getElementById('report-month').value;

    const monthlyExpenses = expenses.filter(expense => expense.date.startsWith(reportMonth));
    const totalExpense = monthlyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    const reportOutput = document.getElementById('report-output');
    reportOutput.innerHTML = `
      <h3>Report for ${reportMonth}</h3>
      <p>Total Expenses: ₹${totalExpense.toFixed(2)}</p>
      <ul class="list-group">
        ${monthlyExpenses.map(expense => `<li class="list-group-item">${expense.description} - ₹${expense.amount.toFixed(2)} - ${expense.date}</li>`).join('')}
      </ul>
    `;
  });

  // Manage Income
  const incomeForm = document.getElementById('income-form');
  incomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    income = parseFloat(document.getElementById('income-amount').value);
    updateBalance();
    incomeForm.reset();
  });

  // Update Balance Display
  function updateBalance() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const balance = income - totalExpenses;
    const balanceDisplay = document.getElementById('balance-display');
    balanceDisplay.textContent = `Balance: ₹${balance.toFixed(2)}`;
  }

  // Initial Display
  displayExpenses();
  updateBalance();
});

// Remove Expense
function removeExpense(description, date) {
  const index = expenses.findIndex(expense => expense.description === description && expense.date === date);
  if (index !== -1) {
    expenses.splice(index, 1);
    displayExpenses();
    updateBalance();
  }
}

// Display Recent Expenses
function displayExpenses() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';
  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      ${expense.description} - ₹${expense.amount.toFixed(2)} - ${expense.date}
      <button class="btn btn-danger btn-sm" onclick="removeExpense('${expense.description}', '${expense.date}')">Remove</button>
    `;
    expenseList.appendChild(li);
  });
}
