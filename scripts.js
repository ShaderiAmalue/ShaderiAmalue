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
    const xSign = '9f7058899e9f2ad4f1861f010b24e684'; // Provided X-Sign

    const headers = {
        'userId': userId,
        'Access-Token': accessToken,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'X-Sign': xSign
    };

    const birthdayData = {
        'birthday': birthday,
        'details': ''
    };

    // Update birthday
    fetch('https://gw.sandboxol.com/user/api/v1/user/info', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(birthdayData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update birthday');
        }
        return response.json();
    })
    .then(birthdayResponse => {
        console.log('Birthday Update:', birthdayResponse);

        const nicknameUrl = `https://gw.sandboxol.com/user/api/v3/user/nickName?newName=${encodeURIComponent(nickname)}&oldName=Shadie`;

        // Update nickname
        fetch(nicknameUrl, {
            method: 'PUT',
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update nickname');
            }
            return response.json();
        })
        .then(nicknameResponse => {
            document.getElementById('responseOutput').textContent = JSON.stringify(nicknameResponse, null, 2);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseOutput').textContent = 'Error: ' + error;
    });
}