document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const toggleSwitch = document.querySelector('.toggle-switch');
    const body = document.body;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            contents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });

    toggleSwitch.addEventListener('change', function() {
        body.classList.toggle('dark-mode');
    });

    // Show the first tab by default
    document.getElementById('downloads').classList.add('active');
});