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
});