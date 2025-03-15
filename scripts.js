document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content');
  const modeToggle = document.getElementById('mode-toggle');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      sections.forEach(section => {
        if (section.id === targetId) {
          section.classList.add('active');
          section.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: 'ease-out' });
        } else {
          section.classList.remove('active');
        }
      });
    });
  });
  
  modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
  });
  
  initCarousel();
  showNotification('Welcome to ShadieVerse');
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
    .then(() => { showNotification('Script copied to clipboard.'); })
    .catch(() => { showNotification('Failed to copy script.'); });
}

function initCarousel() {
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (!carouselWrapper) return;
  let index = 0;
  const slides = carouselWrapper.querySelectorAll('img');
  const total = slides.length;
  setInterval(() => {
    index = (index + 1) % total;
    carouselWrapper.style.transform = `translateX(-${index * 100}%)`;
  }, 4000);
}