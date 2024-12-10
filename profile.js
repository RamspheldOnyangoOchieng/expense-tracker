// profile.js
const profileForm = document.getElementById('profile-form');
const saveBtn = document.querySelector('.save-btn');

// Fetch profile data from the backend
function fetchProfile() {
    fetch('http://localhost:5000/api/profile')
        .then(response => response.json())
        .then(data => {
            document.getElementById('full-name').value = data.name document.getElementById('email').value = data.email;
            document.getElementById('phone').value = data.phone;
            document.getElementById('address').value = data.address;
        });
}

// Save profile changes
saveBtn.addEventListener('click', () => {
    const updatedProfile = {
        name: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile)
    })
    .then(response => response.json())
    .then(data => {
        alert('Profile updated successfully!');
        fetchProfile(); // Refresh the profile data
    })
    .catch(err => {
        console.error('Error updating profile:', err);
    });
});

// Initial fetch of profile data
fetchProfile();