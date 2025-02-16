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
    const contentType = document.getElementById('contentType').value;
    
    const ciphertext = await AdvancedEncryption.encrypt(plaintext, password, contentType);
    document.getElementById('result').innerText = `Encrypted ${contentType}: ${ciphertext}`;
    downloadFile('encrypted.txt', ciphertext);
}

async function decrypt() {
    const ciphertext = document.getElementById('ciphertext').value;
    const password = document.getElementById('decryptPassword').value;
    const contentType = document.getElementById('contentType').value;

    const plaintext = await AdvancedEncryption.decrypt(ciphertext, password, contentType);
    document.getElementById('result').innerText = `Decrypted ${contentType}: ${plaintext}`;
    downloadFile('decrypted.txt', plaintext);
}

function downloadFile(filename, content) {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
}

// Advanced Encryption Logic
const AdvancedEncryption = {
    async encrypt(plaintext, password, contentType) {
        const encoder = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(password, salt);
        const alg = { name: 'AES-GCM', iv: iv };

        const uniqueString = this.generateUniqueString(contentType);
        const encryptedContent = await crypto.subtle.encrypt(alg, key, encoder.encode(this.customObfuscate(uniqueString + plaintext)));

        const encryptedBytes = new Uint8Array(encryptedContent);
        const ciphertext = new Uint8Array(iv.length + salt.length + encryptedBytes.length);
        ciphertext.set(iv, 0);
        ciphertext.set(salt, iv.length);
        ciphertext.set(encryptedBytes, iv.length + salt.length);

        return btoa(String.fromCharCode.apply(null, ciphertext));
    },

    async decrypt(ciphertext, password, contentType) {
        const data = new Uint8Array(atob(ciphertext).split("").map(c => c.charCodeAt(0)));
        const iv = data.slice(0, 12);
        const salt = data.slice(12, 28);
        const encryptedBytes = data.slice(28);
        const key = await this.deriveKey(password, salt);
        const alg = { name: 'AES-GCM', iv: iv };

        const decryptedContent = await crypto.subtle.decrypt(alg, key, encryptedBytes);
        const decoder = new TextDecoder();
        const decryptedText = this.customDeobfuscate(decoder.decode(decryptedContent));

        const uniqueString = this.generateUniqueString(contentType);
        return decryptedText.replace(uniqueString, '');
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

    generateUniqueString(contentType) {
        switch (contentType) {
            case 'Lua':
                return 'Lua_Encryption_Key_';
            case 'Python':
                return 'Python_Encryption_Key_';
            default:
                return 'Text_Encryption_Key_';
        }
    },

    customObfuscate(data) {
        let obfuscated = '';
        for (let i = 0; i < data.length; i++) {
            obfuscated += String.fromCharCode(data.charCodeAt(i) ^ (i % 256));
        }
        return btoa(obfuscated);
    },

    customDeobfuscate(data) {
        data = atob(data);
        let deobfuscated = '';
        for (let i = 0; i < data.length; i++) {
            deobfuscated += String.fromCharCode(data.charCodeAt(i) ^ (i % 256));
        }
        return deobfuscated;
    }
};