document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.url-link, .button-link, .channel-link, nav a[data-target]');
    const contents = document.querySelectorAll('.content');
    const toast = document.getElementById('toast');
    const cursor = document.getElementById('cursor');
    let cursorTimeout;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            if (targetId) {
                contents.forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(targetId).classList.add('active');
            } else {
                showToast();
                setTimeout(() => {
                    window.open(this.href, '_blank');
                }, 1000);
            }
        });
        link.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
    });

    function showToast() {
        toast.className = 'toast show';
        setTimeout(function() {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }

    document.getElementById('downloads').classList.add('active');

    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', function(e) {
        if (Math.abs(lastX - e.pageX) > 1 || Math.abs(lastY - e.pageY) > 1) {
            moveCursor(e.pageX, e.pageY);
            lastX = e.pageX;
            lastY = e.pageY;
        }
        showCursor();
        resetCursorTimeout();
    });

    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        if (Math.abs(lastX - touch.pageX) > 1 || Math.abs(lastY - touch.pageY) > 1) {
            moveCursor(touch.pageX, touch.pageY);
            lastX = touch.pageX;
            lastY = touch.pageY;
        }
        showCursor();
        resetCursorTimeout();
    });

    document.addEventListener('mousedown', function() {
        setCursorState('big');
    });

    document.addEventListener('mouseup', function() {
        setCursorState('');
    });

    document.addEventListener('touchstart', function() {
        setCursorState('big');
    });

    document.addEventListener('touchend', function() {
        setCursorState('');
    });

    function moveCursor(x, y) {
        cursor.style.transition = 'transform 0.1s ease-out'; // Smoother transition
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        const target = document.elementFromPoint(x, y);
        if (target && (target.classList.contains('url-link') || target.classList.contains('button-link') || target.classList.contains('channel-link') || target.tagName === 'BUTTON' || target.tagName === 'A')) {
            target.classList.add('hovered');
            setCursorState('holding');
            cursor.style.opacity = 0; // Make cursor invisible when holding button
        } else {
            setCursorState('');
            cursor.style.opacity = 1; // Ensure cursor is visible if not holding button
            links.forEach(link => link.classList.remove('hovered'));
        }
    }

    function setCursorState(state) {
        cursor.className = 'cursor ' + state;
    }

    function showCursor() {
        cursor.style.opacity = 1;
    }

    function hideCursor() {
        cursor.style.opacity = 0;
    }

    function resetCursorTimeout() {
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(hideCursor, 6000);
    }

    resetCursorTimeout();
});

// Advanced AES Encode and Decode Functions
async function encrypt() {
    const plaintext = document.getElementById('plaintext').value;
    const password = document.getElementById('encryptPassword').value;

    const ciphertext = await AdvancedAES.encode(plaintext, password);
    displayResult('Encrypted Text', ciphertext);
}

async function decrypt() {
    const ciphertext = document.getElementById('ciphertext').value;
    const password = document.getElementById('decryptPassword').value;

    const plaintext = await AdvancedAES.decode(ciphertext, password);
    displayResult('Decrypted Text', plaintext);
}

function displayResult(label, text) {
    const resultContainer = document.getElementById('result-container');
    const resultLabel = document.getElementById('result-label');
    const resultText = document.getElementById('result-text');
    const resultBox = document.getElementById('result-box');

    resultLabel.textContent = label;
    resultText.textContent = text;