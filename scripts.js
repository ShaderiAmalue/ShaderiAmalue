document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
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
    document.getElementById('home').classList.add('active');

    // Handle URL encoding/decoding
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        handleUrl();
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
});

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
            // Decode the URL and handle any errors
            try {
                const decoded = decodeURIComponent(text);
                resultText.textContent = decoded;
                resultLabel.textContent = 'Decoded URL:';
            } catch (error) {
                throw new Error('Invalid URL encoding');
            }
        }
        
        resultContainer.classList.remove('hidden');
        document.getElementById('copy-button').classList.remove('hidden');
    } catch (error) {
        resultLabel.textContent = 'Error:';
        resultText.textContent = error.message;
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