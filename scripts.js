document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const customSelects = document.querySelectorAll('.custom-select-wrapper');
    const heroSection = document.getElementById('hero');
    const animatedElements = document.querySelectorAll('.button-link, nav a, .custom-select-trigger');

    // Handle navigation clicks
    document.querySelector('nav').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId = event.target.dataset.target;
            contents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            heroSection.classList.toggle('hidden', targetId !== 'home');
        }
    });

    // Set the initial active section
    document.getElementById('home').classList.add('active');
    heroSection.classList.remove('hidden');

    // Handle custom select elements
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

    // Handle animations for buttons and links
    animatedElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('hover-animation');
        });

        element.addEventListener('mouseleave', () => {
            element.classList.remove('hover-animation');
        });
    });
});

function togglePasswordInput() {
    const action = document.getElementById('action').value;
    const passwordContainer = document.getElementById('password-container');
    if (action === 'aes-encrypt' || action === 'aes-decrypt') {
        passwordContainer.classList.remove('hidden');
    } else {
        passwordContainer.classList.add('hidden');
    }
}

function handleEncodeDecode() {
    const action = document.getElementById('action').value;
    const text = document.getElementById('text').value.trim();
    const password = document.getElementById('password').value.trim();
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
        } else if (action === 'aes-encrypt') {
            if (!password) throw new Error('Password is required for AES encryption');
            result = aesEncrypt(text, password);
            resultLabel.textContent = 'AES Encrypted:';
        } else if (action === 'aes-decrypt') {
            if (!password) throw new Error('Password is required for AES decryption');
            result = aesDecrypt(text, password);
            resultLabel.textContent = 'AES Decrypted:';
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

function aesEncrypt(text, password) {
    const key = CryptoJS.enc.Utf8.parse(password);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    return iv.toString(CryptoJS.enc.Hex) + encrypted.toString();
}

function aesDecrypt(text, password) {
    const key = CryptoJS.enc.Utf8.parse(password);
    const iv = CryptoJS.enc.Hex.parse(text.substr(0, 32));
    const encrypted = text.substr(32);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

const rainbowText = document.getElementById('rainbow-text');
if (rainbowText) {
    setInterval(() => {
        rainbowText.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
    }, 300);
}