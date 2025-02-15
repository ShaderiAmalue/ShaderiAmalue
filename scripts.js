document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            contents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });

    document.getElementById('downloads').classList.add('active');

    const audioPlayer = document.getElementById('audioPlayer');
    const seekBar = document.getElementById('seekBar');
    const volumeControl = document.getElementById('volumeControl');
    const playlist = document.getElementById('playlist');

    function fetchMusic() {
        fetch('https://api.example.com/music')
            .then(response => response.json())
            .then(data => {
                data.forEach(track => {
                    const trackElement = document.createElement('p');
                    trackElement.innerHTML = `<a href="#" onclick="loadTrack('${track.url}')">${track.title}</a>`;
                    playlist.appendChild(trackElement);
                });
            })
            .catch(error => console.error('Error fetching music:', error));
    }

    audioPlayer.addEventListener('timeupdate', function() {
        const value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekBar.value = value;
    });

    audioPlayer.addEventListener('ended', function() {
        const nextTrack = document.querySelector('#playlist a.active').nextElementSibling;
        if (nextTrack) {
            nextTrack.click();
        }
    });

    window.playAudio = function() {
        audioPlayer.play();
    }

    window.pauseAudio = function() {
        audioPlayer.pause();
    }

    window.stopAudio = function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }

    window.seekAudio = function() {
        const seekTo = audioPlayer.duration * (seekBar.value / 100);
        audioPlayer.currentTime = seekTo;
    }

    window.setVolume = function() {
        audioPlayer.volume = volumeControl.value / 100;
    }

    window.loadTrack = function(track) {
        audioPlayer.src = track;
        audioPlayer.play();
    }

    const playlistLinks = document.querySelectorAll('#playlist a');
    playlistLinks.forEach(link => {
        link.addEventListener('click', function() {
            playlistLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    fetchMusic();
});