// Initialize mentors in localStorage if not already present

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
  displayMentors();
  searchInput.addEventListener('input', filterMentors);
  filterSelect.addEventListener('change', filterMentors);
};

// Display mentor cards
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

    const isOwner = user && user.role === 'senior' && user.id === mentor.ownerId;

    console.log('Mentor:', mentor.name, 'Owner ID:', mentor.ownerId, 'Logged-in ID:', user.id, 'isOwner:', isOwner);


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

// Filter mentors by name and technology
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

// Redirect to detailed profile page
function viewProfile(id) {
  window.location.href = `mentor-profile/profile.html?id=${id}`;
}

// Redirect to edit page
function editMentor(id) {
  window.location.href = `create-profile/create.html?id=${id}`;
}

// Delete mentor with undo option
let lastDeletedMentor = null;

function deleteMentor(id) {
  if (confirm("Are you sure you want to delete this mentor?")) {
    let mentors = JSON.parse(localStorage.getItem('mentors')) || [];
    lastDeletedMentor = mentors.find(m => m.id === id);
    mentors = mentors.filter(mentor => mentor.id !== id);
    localStorage.setItem('mentors', JSON.stringify(mentors));
    displayMentors();
    showUndoMessage();
  }
}

function showUndoMessage() {
  const undoDiv = document.createElement('div');
  undoDiv.style = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #333; color: white; padding: 10px 20px; border-radius: 5px; z-index: 9999;';
  undoDiv.innerHTML = `Mentor deleted. <button onclick="undoDelete()" style="color: #fff; background: transparent; border: 1px solid white; margin-left: 10px; cursor: pointer;">Undo</button>`;
  
  document.body.appendChild(undoDiv);

  setTimeout(() => {
    if (undoDiv.parentNode) {
      undoDiv.parentNode.removeChild(undoDiv);
      lastDeletedMentor = null;
    }
  }, 5000);
}

function undoDelete() {
  if (lastDeletedMentor) {
    const mentors = JSON.parse(localStorage.getItem('mentors')) || [];
    mentors.push(lastDeletedMentor);
    localStorage.setItem('mentors', JSON.stringify(mentors));
    lastDeletedMentor = null;
    displayMentors();
  }
  const undoDiv = document.querySelector('body > div[style*="position: fixed"]');
  if (undoDiv) undoDiv.remove();
}
