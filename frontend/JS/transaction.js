// Set the backend API URL
//const API = 'http://localhost:5000/api';
const API = 'https://finance-tracker-rcx7.onrender.com/api';

const token = localStorage.getItem('token');
if (!token) {
  alert('Please login first');
  window.location.href = 'index.html';
}

// Fetch balance
async function fetchBalance() {
  const res = await fetch(`${API}/auth/balance`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  document.getElementById('balance').innerText = 'Balance: ' + data.balance;
}

// Fetch transactions
async function fetchTransactions() {
  const res = await fetch(`${API}/transactions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  const table = document.getElementById('transactionsTable');
  table.innerHTML = '';

  data.getTransaction.forEach(t => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t._id}</td>
      <td>${t.type}</td>
      <td>${t.amount}</td>
      <td>${t.description || ''}</td>
      <td>${t.balanceAfter}</td>
      <td>${new Date(t.date).toLocaleString()}</td>
      <td>
        <button class="view-btn" data-id="${t._id}">View</button>
        <button class="edit-btn" data-id="${t._id}" data-type="${t.type}" data-amount="${t.amount}" data-description="${t.description || ''}">Update</button>
        <button class="delete-btn" data-id="${t._id}">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// Add transaction
document.getElementById('transactionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const amount = Number(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const description = document.getElementById('description').value;

  const res = await fetch(`${API}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ amount, type, description })
  });

  if (res.ok) {
    alert('Transaction added!');
    fetchBalance();
    fetchTransactions();
    document.getElementById('transactionForm').reset();
  } else {
    const data = await res.json();
    alert(data.message || 'Failed to add transaction');
  }
});

// Handle transaction table button clicks (event delegation)
document.getElementById('transactionsTable').addEventListener('click', (e) => {
  if (e.target.classList.contains('view-btn')) {
    viewTransaction(e.target.dataset.id);
  }
  if (e.target.classList.contains('edit-btn')) {
    editTransaction(
      e.target.dataset.id,
      e.target.dataset.type,
      e.target.dataset.amount,
      e.target.dataset.description
    );
  }
  if (e.target.classList.contains('delete-btn')) {
    deleteTransaction(e.target.dataset.id);
  }
});

// View single transaction
async function viewTransaction(id) {
  const res = await fetch(`${API}/transactions/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  alert(JSON.stringify(data.transaction, null, 2));
}

// Edit transaction (load into form)
function editTransaction(id, type, amount, description) {
  document.getElementById('updateForm').style.display = 'block';
  document.getElementById('updateId').value = id;
  document.getElementById('updateAmount').value = amount;
  document.getElementById('updateType').value = type;
  document.getElementById('updateDescription').value = description;
}

// Cancel update
document.getElementById('cancelUpdateBtn').addEventListener('click', () => {
  document.getElementById('updateForm').style.display = 'none';
});

// Update transaction
document.getElementById('updateForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('updateId').value;
  const amount = Number(document.getElementById('updateAmount').value);
  const type = document.getElementById('updateType').value;
  const description = document.getElementById('updateDescription').value;

  const res = await fetch(`${API}/transactions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ amount, type, description })
  });

  if (res.ok) {
    alert('Transaction updated!');
    fetchBalance();
    fetchTransactions();
    document.getElementById('updateForm').style.display = 'none';
  } else {
    const data = await res.json();
    alert(data.message || 'Failed to update transaction');
  }
});

// Delete transaction
async function deleteTransaction(id) {
  const res = await fetch(`${API}/transactions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  alert(data.message);
  fetchBalance();
  fetchTransactions();
}

// Initial load
fetchBalance();
fetchTransactions();


// Logout function
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});