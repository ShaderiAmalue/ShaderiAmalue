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

        const postId = new Date().getTime().toString(); // Unique post ID
        const postElement = createPostElement(postId, nickname, postText, postImage);

        if (postImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgElement = document.createElement('img');
                imgElement.src = event.target.result;
                postElement.appendChild(imgElement);

                // Save the post to localStorage
                savePost(postId, nickname, postText, event.target.result);
                postsContainer.appendChild(postElement);
            }
            reader.readAsDataURL(postImage);
        } else {
            // Save the post to localStorage without an image
            savePost(postId, nickname, postText, null);
            postsContainer.appendChild(postElement);
        }

        galleryForm.reset();
    });

    function createPostElement(postId, nickname, text, image) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.dataset.postId = postId;

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

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editPost(postId));
        postElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deletePost(postId));
        postElement.appendChild(deleteButton);

        return postElement;
    }

    function savePost(postId, nickname, text, image) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = { postId, nickname, text, image };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = ''; // Clear existing posts
        posts.forEach(post => {
            const postElement = createPostElement(post.postId, post.nickname, post.text, post.image);
            postsContainer.appendChild(postElement);
        });
    }

    function deletePost(postId) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.postId !== postId);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts(); // Reload posts to reflect the changes
    }

    function editPost(postId) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = posts.find(post => post.postId === postId);
        if (post) {
            document.getElementById('post-text').value = post.text;
            if (post.image) {
                // Display image preview if exists
                const imgPreview = document.createElement('img');
                imgPreview.src = post.image;
                imgPreview.classList.add('img-preview');
                document.querySelector('.gallery').appendChild(imgPreview);
            }
            deletePost(postId); // Remove the existing post
        }
    }

    // Load saved posts on page load
    loadPosts();

    // Show the first tab by default
    document.getElementById('downloads').classList.add('active');
});