const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful');

      // Store user data in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify({
        id: data.id,
        role: data.role,
        name: data.fullname
      }));

      // Role ke hisaab se redirect
      if (data.role === 'junior') {
        window.location.href = '../mentor-platform/index.html';  // Junior ka page
      } else if (data.role === 'senior') {
        window.location.href = '../mentor-platform/index.html';  // Senior ka page
      } else {
        window.location.href = '../../mentor-platform/create-profile/create.html'; // Default page
      }
    } else {
      alert('Login failed: ' + data.message);
    }
  } catch (error) {
    console.error('Login Error:', error);
    alert('Error connecting to server. Please try again later.');
  }
});
