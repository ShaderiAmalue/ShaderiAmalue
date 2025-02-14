document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const loading = document.querySelector('.loading');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            contents.forEach(content => {
                content.classList.remove('active');
            });
            loading.style.display = 'block';
            setTimeout(() => {
                document.getElementById(targetId).classList.add('active');
                loading.style.display = 'none';
            }, 500); // simulate loading delay
        });
    });

    // Show the first tab by default
    document.getElementById('downloads').classList.add('active');
});