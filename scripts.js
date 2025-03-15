document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('nav a');
  const contents = document.querySelectorAll('.content');

  // Navigation logic
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('data-target');
      contents.forEach(content => {
        content.classList.toggle('hidden', content.id !== targetId);
        content.classList.toggle('active', content.id === targetId);
      });
    });
  });

  // Notifications
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

  // Fetch Discord Profile
  async function fetchDiscordProfile() {
    try {
      const response = await fetch('/api/discord-profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      const discordAvatarUrl = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=256`;
      const profileCard = document.getElementById('discord-profile');
      profileCard.innerHTML = `
        <img src="${discordAvatarUrl}" alt="${data.username}'s Avatar">
        <h4>${data.username}#${data.discriminator}</h4>
        <p>ID: ${data.id}</p>
      `;
    } catch (error) {
      document.getElementById('discord-profile').innerHTML = `<p>Failed to load profile. Please try again later.</p>`;
    }
  }

  // Copy script to clipboard
  function copyRobloxScript() {
    const scriptText = document.getElementById('roblox-script').textContent;
    navigator.clipboard.writeText(scriptText)
      .then(() => showNotification('Script copied to clipboard'))
      .catch(() => showNotification('Failed to copy script'));
  }

  fetchDiscordProfile();
  showNotification('Welcome to ShadieVerse!');
});