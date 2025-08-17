// Get mentor ID from URL


const params = new URLSearchParams(window.location.search);
const mentorId = params.get('id');

if (!mentorId) {
  alert("No mentor selected");
  window.location.href = "index.html"; // Optional redirect
} else {
  const mentors = JSON.parse(localStorage.getItem('mentors')) || [];
  const idNum = Number(mentorId);
  const selectedMentor = mentors.find(m => m.id === idNum);

  if (!selectedMentor) {
    alert("Mentor not found");
    window.location.href = "index.html"; // Optional redirect
  } else {
    // Set profile info
    updateText('mentorName', selectedMentor.name);
    updateText('mentorNameCard', selectedMentor.name);
    updateText('mentorTech', selectedMentor.technology);
    updateText('mentorCompany', selectedMentor.company);
    updateText('mentorEmail', selectedMentor.email || 'Not Provided');
    updateText('mentorPhone', selectedMentor.phone || 'Not Provided');

    const imageSrc = selectedMentor.image || 'https://via.placeholder.com/150';
    setImage('mentorImage', imageSrc);
    setImage('profileImage', imageSrc);
  }
}

// Utility: Set text content
function updateText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

// Utility: Set image source
function setImage(id, src) {
  const img = document.getElementById(id);
  if (img) img.src = src;
}
function fun() {
    const params = new URLSearchParams(window.location.search);
    const mentorId = params.get('id');
    window.location.href = "index.html?id=" + mentorId;
}
