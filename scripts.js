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

function submitBlockmanForm() {
    const accessToken = document.getElementById('accessToken').value;
    const userId = document.getElementById('userId').value;
    
    const headers = {
        'userId': userId,
        'Access-Token': accessToken,
        'User-Agent': ''
    };

    const data = {
        'birthday': '9999-12-31',
        'details': ''
    };

    fetch('https://gw.sandboxol.com/user/api/v1/user/info', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(text => {
        document.getElementById('responseOutput').textContent = text;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseOutput').textContent = 'Error: ' + error;
    });
}