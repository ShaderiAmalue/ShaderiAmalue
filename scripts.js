document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.url-link');
    const channelLinks = document.querySelectorAll('.channel-link');
    const contents = document.querySelectorAll('.content');
    const toast = document.getElementById('toast');
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(navLink => {
        navLink.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            contents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });

    function handleLinkClick(event) {
        showToast();
        setTimeout(() => {
            window.open(this.href, '_blank');
        }, 1000);
    }

    function preventContextMenu(event) {
        event.preventDefault();
    }

    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
        link.addEventListener('contextmenu', preventContextMenu);
    });

    channelLinks.forEach(channelLink => {
        channelLink.addEventListener('click', handleLinkClick);
        channelLink.addEventListener('contextmenu', preventContextMenu);
    });

    function showToast() {
        toast.className = 'toast show';
        setTimeout(function() {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }

    document.getElementById('downloads').classList.add('active');
});

// Advanced Hybrid Encryption and Decryption Functions
async function encrypt() {
    const plaintext = document.getElementById('plaintext').value;
    const password = document.getElementById('encryptPassword').value;

    const ciphertext = await AdvancedEncryption.encrypt(plaintext, password);
    displayResult('Encrypted Text', ciphertext);
}

async function decrypt() {
    const ciphertext = document.getElementById('ciphertext').value;
    const password = document.getElementById('decryptPassword').value;

    const plaintext = await AdvancedEncryption.decrypt(ciphertext, password);
    displayResult('Decrypted Text', plaintext);
}

function displayResult(label, text) {
    const resultContainer = document.getElementById('result-container');
    const resultBox = document.getElementById('result-box');
    const resultLabel = document.getElementById('result-label');
    const resultText = document.getElementById('result-text');
    const eyeIcon = document.getElementById('eye-icon');

    resultLabel.textContent = label;
    resultText.textContent = text;
    resultBox.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    eyeIcon.addEventListener('click', function() {
        if (resultBox.classList.contains('hidden')) {
            resultBox.classList.remove('hidden');
            resultBox.classList.add('visible');
            eyeIcon.src = 'eye-closed.png'; // Change to closed eye icon
        } else {
            resultBox.classList.remove('visible');
            resultBox.classList.add('hidden');
            eyeIcon.src = 'eye-open.png'; // Change to open eye icon
        }
    });
}

function downloadFile(filename, content) {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
}

const AdvancedEncryption = {
    async encrypt(plaintext, password) {
        const encoder = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(password, salt);
        const alg = { name: 'AES-GCM', iv: iv };

        const encryptedContent = await crypto.subtle.encrypt(alg, key, encoder.encode(plaintext));

        const encryptedBytes = new Uint8Array(encryptedContent);
        const ciphertext = new Uint8Array(iv.length + salt.length + encryptedBytes.length);
        ciphertext.set(iv, 0);
        ciphertext.set(salt, iv.length);
        ciphertext.set(encryptedBytes, iv.length + salt.length);

        return this.customEncode(ciphertext);
    },

    async decrypt(ciphertext, password) {
        const data = this.customDecode(ciphertext);
        const iv = data.slice(0, 12);
        const salt = data.slice(12, 28);
        const encryptedBytes = data.slice(28);
        const key = await this.deriveKey(password, salt);
        const alg = { name: 'AES-GCM', iv: iv };

        const decryptedContent = await crypto.subtle.decrypt(alg, key, encryptedBytes);
        const decoder = new TextDecoder();

        return decoder.decode(decryptedContent);
    },

    async deriveKey(password, salt) {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 200000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    },

    customEncode(data) {
        return btoa(String.fromCharCode.apply(null, data));
    },

    customDecode(data) {
        return new Uint8Array(atob(data).split('').map(c => c.charCodeAt(0)));
    }
};