document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const tooltips = document.querySelectorAll('.tooltip');
    const customSelects = document.querySelectorAll('.custom-select-wrapper');

    // Navigation handling
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            contents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Activate default tab
    document.getElementById('downloads').classList.add('active');

    // Tooltip functionality
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', function(event) {
            event.stopPropagation();
            const tooltipText = this.querySelector('.tooltiptext');
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
        });
    });

    document.addEventListener('click', () => {
        tooltips.forEach(tooltip => {
            const tooltipText = tooltip.querySelector('.tooltiptext');
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.opacity = '0';
        });
    });

    // Custom select components
    customSelects.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.textContent = select.options[select.selectedIndex].text;
        wrapper.appendChild(trigger);

        const optionsWrapper = document.createElement('div');
        optionsWrapper.className = 'custom-options';

        Array.from(select.options).forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.textContent = option.text;
            customOption.addEventListener('click', () => {
                select.value = option.value;
                trigger.textContent = option.text;
                wrapper.classList.remove('open');
                select.dispatchEvent(new Event('change'));
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

        // Sync custom select with original element
        select.addEventListener('change', () => {
            trigger.textContent = select.options[select.selectedIndex].text;
        });
    });

    // Load saved values and initialize
    loadSavedValues();
    setupEventListeners();
});

function setupEventListeners() {
    // URL Tools
    document.getElementById('url-text').addEventListener('input', function() {
        localStorage.setItem('urlText', this.value);
    });

    document.getElementById('url-action').addEventListener('change', function() {
        localStorage.setItem('urlAction', this.value);
    });

    // API Tools
    document.getElementById('host').addEventListener('input', function() {
        localStorage.setItem('apiHost', this.value);
    });

    document.getElementById('endpoint').addEventListener('input', function() {
        localStorage.setItem('apiEndpoint', this.value);
    });

    document.getElementById('payload').addEventListener('input', function() {
        localStorage.setItem('apiPayload', this.value);
    });

    document.getElementById('method').addEventListener('change', function() {
        localStorage.setItem('apiMethod', this.value);
    });
}

function loadSavedValues() {
    // URL Tools
    document.getElementById('url-text').value = localStorage.getItem('urlText') || '';
    document.getElementById('url-action').value = localStorage.getItem('urlAction') || 'encode';

    // API Tools
    document.getElementById('host').value = localStorage.getItem('apiHost') || '';
    document.getElementById('endpoint').value = localStorage.getItem('apiEndpoint') || '';
    document.getElementById('payload').value = localStorage.getItem('apiPayload') || '';
    document.getElementById('method').value = localStorage.getItem('apiMethod') || 'GET';

    // Update custom selects
    document.querySelectorAll('.custom-select-wrapper select').forEach(select => {
        select.dispatchEvent(new Event('change'));
    });
}

function handleUrl() {
    const action = document.getElementById('url-action').value;
    const text = document.getElementById('url-text').value.trim();
    const resultLabel = document.getElementById('url-result-label');
    const resultText = document.getElementById('url-result-text');
    const resultContainer = document.getElementById('url-result-container');

    try {
        if (!text) throw new Error('Input text is required');
        
        if (action === 'encode') {
            resultText.textContent = encodeURIComponent(text);
            resultLabel.textContent = 'Encoded URL:';
        } else {
            const decoded = decodeURIComponent(text.replace(/\+/g, '%20'));
            resultText.textContent = decoded;
            resultLabel.textContent = 'Decoded URL:';
        }
        
        resultContainer.classList.remove('hidden');
        document.getElementById('copy-button').classList.remove('hidden');
    } catch (error) {
        resultLabel.textContent = 'Error:';
        resultText.textContent = error.message.includes('URI') 
            ? 'Invalid URL encoding' 
            : error.message;
        resultContainer.classList.remove('hidden');
        document.getElementById('copy-button').classList.add('hidden');
    }
}

function copyResult() {
    const resultText = document.getElementById('url-result-text');
    navigator.clipboard.writeText(resultText.textContent).then(() => {
        const copyButton = document.getElementById('copy-button');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    });
}

function sendApiRequest() {
    const host = document.getElementById('host').value.trim();
    const endpoint = document.getElementById('endpoint').value.trim();
    const method = document.getElementById('method').value;
    const payload = document.getElementById('payload').value.trim();
    const loading = document.getElementById('loading');
    const apiResult = document.getElementById('apiResult');
    const errorContainer = document.getElementById('api-error');

    // Clear previous results
    errorContainer.textContent = '';
    apiResult.classList.add('hidden');
    loading.classList.remove('hidden');

    // Validate inputs
    if (!host || !endpoint) {
        showApiError('Host and Endpoint are required');
        return;
    }

    // Construct URL
    let url;
    try {
        url = new URL(endpoint, host).href;
    } catch (error) {
        showApiError('Invalid URL format');
        return;
    }

    // Prepare request config
    const config = { method };
    
    // Handle GET parameters
    if (method === 'GET' && payload) {
        try {
            const params = new URLSearchParams(JSON.parse(payload));
            url += `?${params}`;
        } catch (error) {
            showApiError('Invalid GET parameters format');
            return;
        }
    }
    // Handle request body
    else if (method !== 'GET' && payload) {
        try {
            config.headers = { 'Content-Type': 'application/json' };
            config.body = JSON.stringify(JSON.parse(payload));
        } catch (error) {
            showApiError('Invalid JSON payload');
            return;
        }
    }

    // Execute request
    fetch(url, config)
        .then(async response => {
            const statusCode = document.getElementById('statusCode');
            const responseHeaders = document.getElementById('responseHeaders');
            const apiResponse = document.getElementById('apiResponse');

            statusCode.textContent = response.status;
            responseHeaders.textContent = Array.from(response.headers)
                .map(([name, value]) => `${name}: ${value}`)
                .join('\n');

            const data = await response.text();
            try {
                apiResponse.textContent = JSON.stringify(JSON.parse(data), null, 2);
            } catch {
                apiResponse.textContent = data;
            }
            
            apiResult.classList.remove('hidden');
        })
        .catch(error => {
            showApiError(error.message || 'Failed to send request');
        })
        .finally(() => {
            loading.classList.add('hidden');
        });
}

function showApiError(message) {
    const errorContainer = document.getElementById('api-error');
    errorContainer.textContent = message;
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('apiResult').classList.add('hidden');
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
    localStorage.removeItem('apiHost');
    localStorage.removeItem('apiEndpoint');
    localStorage.removeItem('apiPayload');
    localStorage.removeItem('apiMethod');
}