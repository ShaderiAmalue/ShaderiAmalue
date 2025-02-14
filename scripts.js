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
    const birthday = document.getElementById('birthday').value;
    const nickname = document.getElementById('nickname').value;

    const headers = {
        'userId': userId,
        'Access-Token': accessToken,
        'User-Agent': ''
    };

    const data = {
        'birthday': birthday,
        'details': ''
    };

    // Update birthday
    fetch('https://gw.sandboxol.com/user/api/v1/user/info', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(text => {
        console.log('Birthday Update:', text);
        // Update nickname
        fetch(`https://gw.sandboxol.com/user/api/v3/user/nickName?newName=${nickname}&oldName=Shadie`, {
            method: 'PUT',
            headers: headers
        })
        .then(response => response.json())
        .then(json => {
            document.getElementById('responseOutput').textContent = JSON.stringify(json, null, 2);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseOutput').textContent = 'Error: ' + error;
    });
}