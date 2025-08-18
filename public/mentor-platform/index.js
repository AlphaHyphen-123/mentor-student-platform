// Simulated logged-in user (replace with actual login logic)
if (!localStorage.getItem('loggedInUser')) {
  localStorage.setItem('loggedInUser', JSON.stringify({ id: 200, role: "senior" }));
}

// DOM Elements
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const cardContainer = document.getElementById('mentorCards');

// Event Listeners
window.onload = () => {
  fetchMentors(); // 🚀 Now load mentors from PHP backend
  searchInput.addEventListener('input', filterMentors);
  filterSelect.addEventListener('change', filterMentors);
};

// 🔹 Fetch mentors from backend (PHP)
function fetchMentors() {
  fetch("/php/mentor.php?action=getAll")
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        localStorage.setItem("mentors", JSON.stringify(data.mentors));
        displayMentors(data.mentors);
      } else {
        cardContainer.innerHTML = `<p style="color:white; font-size: 1.2rem;">${data.message}</p>`;
      }
    })
    .catch(err => {
      console.error("Error fetching mentors:", err);
      cardContainer.innerHTML = `<p style="color:white;">Server error. Try again later.</p>`;
    });
}

// 🔹 Display mentor cards
function displayMentors(mentorsList = null) {
  const mentors = mentorsList || JSON.parse(localStorage.getItem('mentors')) || [];
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  cardContainer.innerHTML = '';

  if (mentors.length === 0) {
    cardContainer.innerHTML = `<p style="color:white; font-size: 1.2rem;">No mentors found.</p>`;
    return;
  }

  mentors.forEach(mentor => {
    const card = document.createElement('div');
    card.className = 'card';

    const imageSrc = mentor.image || 'https://via.placeholder.com/300x200?text=No+Image';
    const isOwner = user && user.role === 'senior' && user.id == mentor.ownerId;

    card.innerHTML = `
      <img src="${imageSrc}" alt="${mentor.name}" class="mentor-img" />
      <h2>${mentor.name}</h2>
      <p><strong>Technology:</strong> ${mentor.technology}</p>
      <p><strong>Company:</strong> ${mentor.company}</p>
      <button onclick="viewProfile(${mentor.id})">View Profile</button>
      ${isOwner ? `
        <button onclick="editMentor(${mentor.id})" style="margin-left: 10px; background-color: orange; color: white;">Edit</button>
        <button onclick="deleteMentor(${mentor.id})" style="margin-left: 10px; background-color: red; color: white;">Delete</button>
      ` : ''}
    `;

    cardContainer.appendChild(card);
  });
}

// 🔹 Filter mentors
function filterMentors() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedTech = filterSelect.value;
  const allMentors = JSON.parse(localStorage.getItem('mentors')) || [];

  const filtered = allMentors.filter(mentor => {
    const matchesName = mentor.name.toLowerCase().includes(searchTerm);
    const matchesTech =
      selectedTech === "" ||
      (Array.isArray(mentor.technology) && mentor.technology.includes(selectedTech));
    return matchesName && matchesTech;
  });

  displayMentors(filtered);
}

// 🔹 Redirects
function viewProfile(id) {
  window.location.href = `mentor-profile/profile.html?id=${id}`;
}

function editMentor(id) {
  window.location.href = `create-profile/create.html?id=${id}`;
}

// 🔹 Delete mentor (from backend)
function deleteMentor(id) {
  if (confirm("Are you sure you want to delete this mentor?")) {
    fetch(`/php/mentor.php?action=delete&id=${id}`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        fetchMentors(); // reload mentors from DB
      })
      .catch(err => console.error("Delete error:", err));
  }
}
