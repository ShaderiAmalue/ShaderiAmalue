document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const galleryForm = document.getElementById('gallery-form');
    const postsContainer = document.getElementById('posts');
    const nicknameInput = document.getElementById('nickname');
    const setNicknameButton = document.getElementById('set-nickname');
    const nicknameContainer = document.getElementById('nickname-container');

    // Check if a nickname is already saved
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
        nicknameInput.value = savedNickname;
        nicknameInput.disabled = true; // Prevent changing the nickname
        nicknameContainer.classList.add('hidden'); // Hide the nickname input
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

    setNicknameButton.addEventListener('click', function() {
        const nickname = nicknameInput.value;
        if (nickname.trim() !== "") {
            // Save the nickname to localStorage
            localStorage.setItem('nickname', nickname);
            nicknameInput.disabled = true;
            nicknameContainer.classList.add('hidden');
        }
    });

    galleryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nickname = localStorage.getItem('nickname');
        const postText = document.getElementById('post-text').value;
        const postImage = document.getElementById('post-image').files[0];

        const postElement = createPostElement(nickname, postText, postImage);

        if (postImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgElement = document.createElement('img');
                imgElement.src = event.target.result;
                postElement.appendChild(imgElement);

                // Save the post to localStorage
                savePost(nickname, postText, event.target.result);
                postsContainer.appendChild(postElement);
            };
            reader.readAsDataURL(postImage);
        } else {
            // Save the post to localStorage without an image
            savePost(nickname, postText, null);
            postsContainer.appendChild(postElement);
        }

        galleryForm.reset();
    });

    function createPostElement(nickname, text, image) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const nicknameElement = document.createElement('p');
        nicknameElement.classList.add('nickname');
        nicknameElement.textContent = nickname;
        postElement.appendChild(nicknameElement);

        const textElement = document.createElement('p');
        textElement.textContent = text;
        postElement.appendChild(textElement);

        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            postElement.appendChild(imgElement);
        }

        return postElement;
    }

    function savePost(nickname, text, image) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = { nickname, text, image };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = ''; // Clear existing posts
        posts.forEach(post => {
            const postElement = createPostElement(post.nickname, post.text, post.image);
            postsContainer.appendChild(postElement);
        });
    }

    // Load saved posts on page load
    loadPosts();

    // Show the first tab by default
    document.getElementById('downloads').classList.add('active');
});