document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.url-link');
    const channelLinks = document.querySelectorAll('.channel-link');
    const contents = document.querySelectorAll('.content');
    const toast = document.getElementById('toast');
    const navLinks = document.querySelectorAll('nav a');
    const profiles = document.querySelectorAll('.profile');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close');

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

    profiles.forEach(profile => {
        let holdTimer;
        profile.addEventListener('mousedown', function(event) {
            holdTimer = setTimeout(() => {
                showModal(this.dataset.info);
                console.log('Hold event triggered'); // Debug log
            }, 500);
        });
        profile.addEventListener('mouseup', function(event) {
            clearTimeout(holdTimer);
        });
        profile.addEventListener('mouseleave', function(event) {
            clearTimeout(holdTimer);
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function showToast() {
        toast.className = 'toast show';
        setTimeout(function() {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }

    function showModal(info) {
        modalBody.innerHTML = getInfoContent(info);
        modal.style.display = 'block';
    }

    function getInfoContent(info) {
        switch (info) {
            case 'eternal_hacker':
                return `
                    <h2>eternal_hacker</h2>
                    <img src="https://cdn.discordapp.com/avatars/971473213144072203/0ec9e7cccbc709e8013001d38dc2f297.webp?size=2048" alt="eternal_hacker" class="avatar-large">
                    <p><a href="https://youtube.com/@eternalhackerbg?si=AU5DFntWLEtTrUTo" target="_blank" class="channel-link">YouTube Channel</a></p>
                    <p>Here you can add more detailed information about eternal_hacker.</p>
                `;
            case 'greenbmgo':
                return `
                    <h2>greenbmgo</h2>
                    <img src="https://cdn.discordapp.com/avatars/1094920973611958343/044a19ba4826f743a496c8894b14eaf8.webp?size=2048" alt="greenbmgo" class="avatar-large">
                    <p><a href="https://youtube.com/@rundexmods?si=xfVKY42L38g-OGcd" target="_blank" class="channel-link">YouTube Channel</a></p>
                    <p>Here you can add more detailed information about greenbmgo.</p>
                `;
            default:
                return `<p>No additional information available.</p>`;
        }
    }

    document.getElementById('downloads').classList.add('active');
});