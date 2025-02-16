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

const AdvancedEncryption = {
    async encrypt(plaintext, password, contentType) {
        const encoder = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(password, salt);
        const alg = { name: 'AES-GCM', iv: iv };

        const uniqueString = this.generateUniqueString(contentType);
        let formattedContent = this.customObfuscate(uniqueString + plaintext);

        if (contentType === 'Lua') {
            formattedContent = this.createLuaScript(formattedContent, password);
        }

        const encryptedContent = await crypto.subtle.encrypt(alg, key, encoder.encode(formattedContent));

        const encryptedBytes = new Uint8Array(encryptedContent);
        const ciphertext = new Uint8Array(iv.length + salt.length + encryptedBytes.length);
        ciphertext.set(iv, 0);
        ciphertext.set(salt, iv.length);
        ciphertext.set(encryptedBytes, iv.length + salt.length);

        return this.customEncode(ciphertext);
    },

    async decrypt(ciphertext, password, contentType) {
        const data = this.customDecode(ciphertext);
        const iv = data.slice(0, 12);
        const salt = data.slice(12, 28);
        const encryptedBytes = data.slice(28);
        const key = await this.deriveKey(password, salt);
        const alg = { name: 'AES-GCM', iv: iv };

        const decryptedContent = await crypto.subtle.decrypt(alg, key, encryptedBytes);
        const decoder = new TextDecoder();
        const decryptedText = this.customDeobfuscate(decoder.decode(decryptedContent));

        const uniqueString = this.generateUniqueString(contentType);
        let formattedContent = decryptedText.replace(uniqueString, '');

        if (contentType === 'Lua') {
            formattedContent = this.extractLuaScript(formattedContent);
        }

        return formattedContent;
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
        return data.split('').map((char, i) => String.fromCharCode(char.charCodeAt(0) + 5 - i % 10)).join('');
    },

    customDeobfuscate(data) {
        return data.split('').map((char, i) => String.fromCharCode(char.charCodeAt(0) - 5 + i % 10)).join('');
    },

    createLuaScript(data, password) {
        return `local enc = "${data}"; local key = "${password}"; function dec(enc, key) local decode = function(s) local b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" s = string.gsub(s, '[^'..b64..'=]', '') return (s:gsub('.', function(x) if x == '=' then return '' end local r,f='',(b64:find(x)-1) for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and'1' or'0') end return r end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x) if #x ~= 8 then return '' end local c=0 for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end return string.char(c) end)) end; local data = decode(enc); local result = ''; for i = 1, #data do local c = string.byte(data, i); local k = string.byte(key, (i - 1) % #key + 1); result = result .. string.char(bit.bxor(c, k)); end; return result; end; return dec(enc, key);`;
    },

    extractLuaScript(data) {
        const regex = /local enc = "(.*)"; local key = "(.*)"; function dec\(.*\) return (.*) end; return dec\(.*\);/;
        const match = data.match(regex);
        if (match) {
            return match[1];
        }
        return data;
    },

    customEncode(data) {
        return Array.from(data).map(byte => String.fromCharCode(byte + 65)).join('');
    },

    customDecode(data) {
        return new Uint8Array(Array.from(data).map(char => char.charCodeAt(0) - 65));
    }
};