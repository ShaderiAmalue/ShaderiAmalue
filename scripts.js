// Global notification function accessible from anywhere
function showNotification(message) {
  const notificationContainer = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 300);
  }, 3000);
}

function copyRobloxScript() {
  const scriptText = document.getElementById('roblox-script').textContent;
  navigator.clipboard.writeText(scriptText)
    .then(() => showNotification('Script copied to clipboard'))
    .catch(() => showNotification('Failed to copy script'));
}

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a');
  const contents = document.querySelectorAll('.content');

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('data-target');
      contents.forEach(content => {
        content.classList.toggle('hidden', content.id !== targetId);
        content.classList.toggle('active', content.id === targetId);
      });
    });
  });

  document.body.classList.add('fade-in');

  function fetchDiscordProfile(username) {
    const profileCard = document.getElementById('discord-profile');
    fetch(`https://discordlookup.mesalytic.moe/v1/user/${username}`)
      .then(response => response.json())
      .then(data => {
        profileCard.innerHTML = `
          <img src="${data.avatar.link}" alt="${data.tag}'s Avatar">
          <h4>${data.tag}</h4>
          <p>ID: ${data.id}</p>
        `;
      })
      .catch(error => {
        profileCard.innerHTML = `<p>Failed to load profile. Please try again later.</p>`;
        console.error('Error fetching Discord profile:', error);
      });
  }

  // Fetch your Discord profile (shadie_69 is the owner)
  fetchDiscordProfile('shadie_69');
  showNotification('Welcome to ShadieVerse!');
});