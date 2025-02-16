document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');

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

    document.getElementById('downloads').classList.add('active');
});

function sendApiRequest() {
    const host = document.getElementById('host').value;
    const endpoint = document.getElementById('endpoint').value;
    const method = document.getElementById('method').value;
    const payload = document.getElementById('payload').value;

    const url = `${host}${endpoint}`;
    const loadingIndicator = document.getElementById('loading');
    const apiResult = document.getElementById('apiResult');
    const apiResponse = document.getElementById('apiResponse');
    const statusCode = document.getElementById('statusCode');
    const responseHeaders = document.getElementById('responseHeaders');

    loadingIndicator.classList.remove('hidden');
    apiResult.classList.add('hidden');

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: method !== 'GET' ? payload : null
    })
    .then(response => {
        loadingIndicator.classList.add('hidden');
        statusCode.textContent = response.status;

        let headers = '';
        response.headers.forEach((value, name) => {
            headers += `${name}: ${value}\n`;
        });
        responseHeaders.textContent = headers;

        return response.json().then(data => {
            apiResponse.textContent = JSON.stringify(data, null, 2);
            apiResult.classList.remove('hidden');
        });
    })
    .catch(error => {
        loadingIndicator.classList.add('hidden');
        console.error('Error:', error);
        apiResponse.textContent = 'Error: ' + error;
        statusCode.textContent = 'N/A';
        responseHeaders.textContent = '';
        apiResult.classList.remove('hidden');
    });
}

function clearApiForm() {
    document.getElementById('host').value = '';
    document.getElementById('endpoint').value = '';
    document.getElementById('method').value = 'GET';
    document.getElementById('payload').value = '';
    document.getElementById('apiResponse').textContent = '';
    document.getElementById('statusCode').textContent = '';
    document.getElementById('responseHeaders').textContent = '';
    document.getElementById('apiResult').classList.add('hidden');
}