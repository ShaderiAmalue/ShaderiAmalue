document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const customSelects = document.querySelectorAll('.custom-select-wrapper');

    document.querySelector('nav').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId = event.target.dataset.target;
            contents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        }
    });

    document.getElementById('home').classList.add('active');

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        handleUrl();
    });

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
            const decoded = decodeURIComponent(text);
            resultText.textContent = decoded;
            resultLabel.textContent = 'Decoded URL:';
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