document.getElementById('mentorForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const role = document.getElementById('role').value;
  const company = document.getElementById('company').value.trim();
  const imageFile = document.getElementById('imageFile').files[0];
  const techSelect = document.getElementById('technology');
  const technologies = Array.from(techSelect.selectedOptions).map(opt => opt.value);

  if (!imageFile || !name || !company || !role || technologies.length === 0) {
    alert('Please fill all fields and select at least one technology.');
    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
    alert("User not logged in.");
    return;
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('name', name);
  formData.append('role', role);
  formData.append('company', company);
  formData.append('image', imageFile);
  formData.append('technologies', JSON.stringify(technologies));
  formData.append('ownerId', loggedInUser.id);

  try {
    const response = await fetch('http://localhost/mentor-platform/backend/createMentor.php', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alert('Mentor added successfully!');
      document.getElementById('mentorForm').reset();
      document.getElementById('selectedTechs').innerHTML = '';
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again later.');
  }
});
