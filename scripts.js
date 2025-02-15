document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const galleryForm = document.getElementById('gallery-form');
    const postsContainer = document.getElementById('posts');

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

    galleryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nickname = document.getElementById('nickname').value;
        const postText = document.getElementById('post-text').value;
        const postImage = document.getElementById('post-image').files[0];

        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const nicknameElement = document.createElement('p');
        nicknameElement.classList.add('nickname');
        nicknameElement.textContent = nickname;
        postElement.appendChild(nicknameElement);

        const textElement = document.createElement('p');
        textElement.textContent = postText;
        postElement.appendChild(textElement);

        if (postImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgElement = document.createElement('img');
                imgElement.src = event.target.result;
                postElement.appendChild(imgElement);
            }
            reader.readAsDataURL(postImage);
        }

        postsContainer.appendChild(postElement);
        galleryForm.reset();
    });

    // Show the first tab by default
    document.getElementById('downloads').classList.add('active');
});