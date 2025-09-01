// Set the backend API URL
//const API = 'http://localhost:5000/api'; // Uncomment this for local testing

const API = 'https://finance-tracker-rcx7.onrender.com/api'; // Production backend

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      window.location.href = 'transaction.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
});
