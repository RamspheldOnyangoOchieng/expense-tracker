document.getElementById('settingsForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const notifications = document.getElementById('notifications').checked;
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Simulating a successful form submission
    console.log('Form submitted successfully!');
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Notifications: ${notifications ? 'Enabled' : 'Disabled'}`);
  
    alert('Settings updated successfully!');
  });
  