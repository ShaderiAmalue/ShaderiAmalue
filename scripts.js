document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const buttons = document.querySelectorAll('.button-link');

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

    const rainbowText = document.getElementById('rainbow-text');
    if (rainbowText) {
        setInterval(() => {
            rainbowText.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
        }, 300);
    }

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    document.addEventListener('selectstart', function(event) {
        event.preventDefault();
    });

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        button.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    showNotification('Welcome to RegionG!');
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}