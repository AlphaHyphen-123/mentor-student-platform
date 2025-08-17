document.addEventListener('DOMContentLoaded', function () {
  const techSelect = document.getElementById('technology');
  const techDisplay = document.getElementById('selectedTechs');

  techSelect.addEventListener('change', () => {
    const selected = Array.from(techSelect.selectedOptions).map(opt => opt.value);
    techDisplay.innerHTML = selected.map(tech =>
      `<span style="display:inline-block;background:#4CAF50;color:white;padding:5px 10px;border-radius:5px;margin:5px 5px 0 0;">${tech}</span>`
    ).join('');
  });
});

document.getElementById('mentorForm').addEventListener('submit', function (e) {
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

  const reader = new FileReader();
  reader.onload = function (event) {
    const image = event.target.result;

    const mentors = JSON.parse(localStorage.getItem('mentors')) || [];

    const newMentor = {
      id: Date.now(),
      name,
      technology: technologies, // Array of techs
      company,
      image,
      role,
      ownerId: loggedInUser.id
    };

    mentors.push(newMentor);
    localStorage.setItem('mentors', JSON.stringify(mentors));

    alert('Mentor added successfully!');
    document.getElementById('mentorForm').reset();
    document.getElementById('selectedTechs').innerHTML = '';
  };

  reader.readAsDataURL(imageFile);
});
