document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      sections.forEach(section => {
        if (section.id === targetId) {
          section.classList.add('active');
          // Animate section appearance using Web Animations API
          section.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 600,
            easing: 'ease-out'
          });
        } else {
          section.classList.remove('active');
        }
      });
    });
  });
  showNotification('Welcome to ShadieVerse! Enjoy the ultimate experience.');
});

function showNotification(message) {
  const container = document.getElementById('notification-container');
  const note = document.createElement('div');
  note.classList.add('notification');
  note.textContent = message;
  container.appendChild(note);
  setTimeout(() => {
    note.style.opacity = 0;
    setTimeout(() => note.remove(), 500);
  }, 3000);
}

function copyRobloxScript() {
  const scriptContent = document.getElementById('roblox-script').textContent;
  navigator.clipboard.writeText(scriptContent)
    .then(() => {
      showNotification('Script copied to clipboard.');
    })
    .catch(() => {
      showNotification('Failed to copy script.');
    });
}