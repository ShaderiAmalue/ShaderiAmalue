document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const loading = document.querySelector('.loading');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            contents.forEach(content => {
                content.classList.remove('active');
            });
            loading.style.display = 'block';
            setTimeout(() => {
                document.getElementById(targetId).classList.add('active');
                loading.style.display = 'none';
            }, 500); // simulate loading delay
        });
    });

    // Fetch and display the latest videos
    fetchLatestVideos('greenbmgo', 'greenbmgo-videos');
    fetchLatestVideos('eternal_hacker', 'eternalhacker-videos');

    function fetchLatestVideos(username, containerId) {
        const query = `${username} latest videos site:youtube.com`;
        fetch(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`, {
            headers: {
                'Ocp-Apim-Subscription-Key': 'YOUR_BING_SEARCH_API_KEY'
            }
        })
        .then(response => response.json())
        .then(data => {
            const results = data.webPages.value;
            const container = document.getElementById(containerId);
            results.forEach(result => {
                const videoElement = document.createElement('div');
                videoElement.classList.add('video');
                videoElement.innerHTML = `
                    <p>Title: ${result.name}</p>
                    <a href="${result.url}" target="_blank">Watch on YouTube</a>
                `;
                container.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
    }

    // Show the first tab by default
    document.getElementById('downloads').classList.add('active');
});