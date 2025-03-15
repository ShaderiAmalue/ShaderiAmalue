document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const buttons = document.querySelectorAll('.button-link');
    const notificationContainer = document.getElementById('notification-container');

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
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            rainbowText.style.backgroundPosition = `${x}% ${y}%`;
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

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notificationContainer.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notificationContainer.removeChild(notification), 300);
        }, 3000);
    }

    showNotification('Welcome to Shadie!');
});