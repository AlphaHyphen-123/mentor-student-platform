document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const userData = {
    fullname: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    role: document.getElementById('role').value,
  };

  // Check if password and confirm password match
  if (userData.password !== userData.confirmPassword) {
    alert("Passwords don't match.");
    return;
  }

  // Remove confirmPassword before sending
  delete userData.confirmPassword;

  fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullname: userData.fullname,
      email: userData.email,
      password: userData.password,
      role: userData.role
    })
  })
  .then(response => response.json())  // Parse JSON here
  .then(data => {
    if (data.message === 'Registration successful!') {
      alert('Registration successful! Ab aap login kar sakte hain.');

      // Redirect to login page with email and password in URL
      const email = encodeURIComponent(userData.email);
      const password = encodeURIComponent(userData.password);

      window.location.href = `/loginPage/login.html?email=${email}&password=${password}`;
    } else {
      alert(data.message || 'Kuch galat ho gaya. Kripya baad me try karein.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Kuch galat ho gaya. Kripya baad me try karein.');
  });
});
