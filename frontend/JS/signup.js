// Set the backend API URL
//const API = 'http://localhost:5000/api'; // Uncomment this for local testing

const API = 'https://finance-tracker-rcx7.onrender.com/api'; // Production backend


document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const accountType = document.getElementById('accountType').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, accountType, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registration successful! Please login.');
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
});
