document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const userData = {
    fullname: document.getElementById('fullname').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    role: document.getElementById('role').value,
  };

  if (userData.password !== userData.confirmPassword) {
    alert("Passwords don't match.");
    return;
  }

  let formData = new FormData();
  formData.append("fullname", userData.fullname);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("role", userData.role);

  fetch("../php/register.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      alert("Registration successful! Ab aap login kar sakte hain.");

      // ✅ Store only email (not password) securely
      localStorage.setItem("email", userData.email);
      window.location.href = "/public/loginPage/login.html";
    } else {
      alert(data.message || "Kuch galat ho gaya. Kripya baad me try karein.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Kuch galat ho gaya. Kripya baad me try karein.");
  });
});
