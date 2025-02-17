document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const tooltips = document.querySelectorAll('.tooltip');
    const customSelects = document.querySelectorAll('.custom-select-wrapper');

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

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', function(event) {
            event.stopPropagation();
            const tooltipText = this.querySelector('.tooltiptext');
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
        });
    });

    document.addEventListener('click', function() {
        tooltips.forEach(tooltip => {
            const tooltipText = tooltip.querySelector('.tooltiptext');
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.opacity = '0';
        });
    });

    loadSavedValues();

    document.getElementById('url-text').addEventListener('input', function() {
        localStorage.setItem('urlText', this.value);
    });

    document.getElementById('host').addEventListener('input', function() {
        localStorage.setItem('apiHost', this.value);
    });

    document.getElementById('endpoint').addEventListener('input', function() {
        localStorage.setItem('apiEndpoint', this.value);
    });

    document.getElementById('payload').addEventListener('input', function() {
        localStorage.setItem('apiPayload', this.value);
    });

    document.getElementById('url-action').addEventListener('change', function() {
        localStorage.setItem('urlAction', this.value);
    });

    document.getElementById('method').addEventListener('change', function() {
        localStorage.setItem('apiMethod', this.value);
    });

    customSelects.forEach(wrapper => {
        const select = wrapper.querySelector('.custom-select');
        const trigger = document.createElement('div');
        trigger.classList.add('custom-select-trigger');
        trigger.textContent = select.options[select.selectedIndex].text;
        wrapper.appendChild(trigger);

        const optionsWrapper = document.createElement('div');
        optionsWrapper.classList.add('custom-options');

        Array.from(select.options).forEach(option => {
            const customOption = document.createElement('div');
            customOption.classList.add('custom-option');
            customOption.textContent = option.text;
            customOption.addEventListener('click', () => {
                select.value = option.value;
                trigger.textContent = option.text;
                wrapper.classList.remove('open');
                const event = new Event('change');
                select.dispatchEvent(event);
            });
            optionsWrapper.appendChild(customOption);
        });

        wrapper.appendChild(optionsWrapper);

        trigger.addEventListener('click', () => {
            wrapper.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (!wrapper.contains(event.target)) {
                wrapper.classList.remove('open');
            }
        });
    });
});

function loadSavedValues() {
    const savedUrlText = localStorage.getItem('urlText');
    const savedApiHost = localStorage.getItem('apiHost');
    const savedApiEndpoint = localStorage.getItem('apiEndpoint');
    const savedApiPayload = localStorage.getItem('apiPayload');
    const savedUrlAction = localStorage.getItem('urlAction');
    const savedApiMethod = localStorage.getItem('apiMethod');

    if (savedUrlText) {
        document.getElementById('url-text').value = savedUrlText;
    }

    if (savedApiHost) {
        document.getElementById('host').value = savedApiHost;
    }

    if (savedApiEndpoint) {
        document.getElementById('endpoint').value = savedApiEndpoint;
    }

    if (savedApiPayload) {
        document.getElementById('payload').value = savedApiPayload;
    }

    if (savedUrlAction) {
        document.getElementById('url-action').value = savedUrlAction;
    }

    if (savedApiMethod) {
        document.getElementById('method').value = savedApiMethod;
    }
}

function handleUrl() {
    const action = document.getElementById('url-action').value;
    const text = document.getElementById('url-text').value;
    const resultLabel = document.getElementById('url-result-label');
    const resultText = document.getElementById('url-result-text');
    const resultContainer = document.getElementById('url-result-container');
    const copyButton = document.getElementById('copy-button');

    try {
        if (action === 'encode') {
            const encodedText = encodeURIComponent(text);
            resultLabel.textContent = 'Encoded URL:';
            resultText.textContent = encodedText;
        } else if (action === 'decode') {
            const decodedText = decodeURIComponent(text.replace(/\+/g, ' '));
            resultLabel.textContent = 'Decoded URL:';
            resultText.textContent = decodedText;
        }

        resultContainer.classList.remove('hidden');
        copyButton.classList.toggle('hidden', !resultText.textContent);
    } catch (error) {
        resultLabel.textContent = 'Error:';
        resultText.textContent = 'Invalid input for encoding/decoding.';
        resultContainer.classList.remove('hidden');
        copyButton.classList.add('hidden');
    }
}

function copyResult() {
    const resultText = document.getElementById('url-result-text').innerText;
    navigator.clipboard.writeText(resultText).then(() => {
        console.log('Copied to clipboard');
    });
}

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