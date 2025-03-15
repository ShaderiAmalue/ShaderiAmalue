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

 
  function loadDiscordProfile(userId) {
    const profileCard = document.getElementById('discord-profile');
    const discordAvatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${userId}.png?size=256`;

    // Render the owner's static profile (ID-based)
    profileCard.innerHTML = `
      <img src="${discordAvatarUrl}" alt="Shadie's Avatar">
      <h4>Shadie</h4>
      <p>ID: ${userId}</p>
    `;
  }

  loadDiscordProfile('1238870905799835718');
  showNotification('Welcome to ShadieVerse!');
});