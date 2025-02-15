document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a, .url-link');
    const contents = document.querySelectorAll('.content');
    const toast = document.getElementById('toast');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            if (targetId) {
                contents.forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(targetId).classList.add('active');
            }
            if (this.classList.contains('url-link')) {
                showToast();
            }
        });
    });

    function showToast() {
        toast.className = 'toast show';
        setTimeout(function() {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }

    document.getElementById('downloads').classList.add('active');
});