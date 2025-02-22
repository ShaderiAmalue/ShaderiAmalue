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
        handleEncodeDecode();
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

    // Add fade-in animation to the body
    document.body.classList.add('fade-in');
});

function handleEncodeDecode() {
    const action = document.getElementById('action').value;
    const text = document.getElementById('text').value.trim();
    const resultLabel = document.getElementById('result-label');
    const resultText = document.getElementById('result-text');
    const resultContainer = document.getElementById('result-container');

    try {
        if (!text) throw new Error('Input text is required');

        let result;
        if (action === 'url-encode') {
            result = encodeURIComponent(text);
            resultLabel.textContent = 'Encoded URL:';
        } else if (action === 'url-decode') {
            result = decodeURIComponent(text);
            resultLabel.textContent = 'Decoded URL:';
        } else if (action === 'base64-encode') {
            result = btoa(text);
            resultLabel.textContent = 'Base64 Encoded:';
        } else if (action === 'base64-decode') {
            result = atob(text);
            resultLabel.textContent = 'Base64 Decoded:';
        }

        resultText.textContent = result;
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
    const resultText = document.getElementById('result-text');
    navigator.clipboard.writeText(resultText.textContent).then(() => {
        const copyButton = document.getElementById('copy-button');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    });
}

const rainbowText = document.getElementById('rainbow-text');
if (rainbowText) {
    setInterval(() => {
        rainbowText.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
    }, 300);
}