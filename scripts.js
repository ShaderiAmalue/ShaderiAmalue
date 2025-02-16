document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.url-link, .button-link, .channel-link');
    const contents = document.querySelectorAll('.content');
    const toast = document.getElementById('toast');
    const navLinks = document.querySelectorAll('nav a');
    const cursor = document.getElementById('cursor');
    let cursorTimeout;

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

    function showToast() {
        toast.className = 'toast show';
        setTimeout(function() {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }

    document.getElementById('downloads').classList.add('active');

    document.addEventListener('mousemove', function(e) {
        moveCursor(e.pageX, e.pageY);
        showCursor();
        resetCursorTimeout();
    });

    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        moveCursor(touch.pageX, touch.pageY);
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
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;

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