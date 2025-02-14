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

    // Show the first tab by default
    document.getElementById('downloads').classList.add('active');

    // Fetch user profiles
    const userIds = ['971473213144072203', '1094920973611958343'];
    fetchProfiles(userIds);
});

function fetchProfiles(userIds) {
    const profilesContainer = document.querySelector('.profiles');
    const promises = userIds.map(id => fetch(`https://discordlookup.mesalytic.moe/v1/user/${id}`));
    Promise.all(promises).then(responses => {
        responses.forEach(response => {
            if (response.ok) {
                response.json().then(data => {
                    const profile = document.createElement('div');
                    profile.innerHTML = `<p>ID: ${data.id}</p><p>Username: ${data.tag}</p>`;
                    profilesContainer.appendChild(profile);
                });
            } else {
                const profile = document.createElement('div');
                profile.innerHTML = `<p>Error fetching profile for ID: ${id}</p>`;
                profilesContainer.appendChild(profile);
            }
        });
    });
}