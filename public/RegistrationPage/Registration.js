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

  // Prepare form data for PHP
  let formData = new FormData();
  formData.append("fullname", userData.fullname);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("role", userData.role);

  // PHP endpoint (change according to your folder structure)
  fetch("/php/register.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      alert("Registration successful! Ab aap login kar sakte hain.");

      // Redirect to login page with email and password in URL
      const email = encodeURIComponent(userData.email);
      const password = encodeURIComponent(userData.password);
      window.location.href = `/public/loginPage/login.html?email=${email}&password=${password}`;
    } else {
      alert(data.message || "Kuch galat ho gaya. Kripya baad me try karein.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Kuch galat ho gaya. Kripya baad me try karein.");
  });
});
