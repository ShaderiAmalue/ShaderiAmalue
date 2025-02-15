document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const galleryForm = document.getElementById('gallery-form');
    const postsContainer = document.getElementById('posts');
    const nicknameInput = document.getElementById('nickname');

    // Check if a nickname is already saved
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
        nicknameInput.value = savedNickname;
        nicknameInput.disabled = true; // Prevent changing the nickname
        nicknameInput.classList.add('hidden'); // Hide the nickname input
    }

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
        const nickname = nicknameInput.value;
        const postText = document.getElementById('post-text').value;
        const postImage = document.getElementById('post-image').files[0];

        // Save the nickname to localStorage
        localStorage.setItem('nickname', nickname);
        nicknameInput.disabled = true;
        nicknameInput.classList.add('hidden');

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

                // Save the post to localStorage
                savePost(nickname, postText, event.target.result);
            }
            reader.readAsDataURL(postImage);
        } else {
            // Save the post to localStorage without an image
            savePost(nickname, postText, null);
        }

        postsContainer.appendChild(postElement);
        galleryForm.reset();
    });

    function savePost(nickname, text, image) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = { nickname, text, image };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const nicknameElement = document.createElement('p');
            nicknameElement.classList.add('nickname');
            nicknameElement.textContent = post.nickname;
            postElement.appendChild(nicknameElement);

            const textElement = document.createElement('p');
            textElement.textContent = post.text;
            postElement.appendChild(textElement);

            if (post.image) {
                const imgElement = document.createElement('img');
                imgElement.src = post.image;
                postElement.appendChild(imgElement);
            }

            postsContainer.appendChild(postElement);
        });
    }

    // Load saved posts on page load
    loadPosts();

    // Show the first tab by default
    document.getElementById('downloads').classList.add('active');
});