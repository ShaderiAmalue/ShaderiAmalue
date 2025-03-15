document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.nav-link');
  const contents = document.querySelectorAll('.content');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('data-target');
      links.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
      contents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
        }
      });
    });
  });

  showNotification('Welcome to ShadieVerse!');
});

function showNotification(message) {
  const container = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  container.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function copyRobloxScript() {
  const scriptText = document.getElementById('roblox-script').textContent;
  navigator.clipboard.writeText(scriptText).then(() => {
    showNotification('Script copied to clipboard');
  }).catch(() => {
    showNotification('Failed to copy script');
  });
}