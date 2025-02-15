document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const galleryForm = document.getElementById('gallery-form');
    const postsContainer = document.getElementById('posts');
    const nicknameInput = document.getElementById('nickname');
    const setNicknameButton = document.getElementById('set-nickname');
    const nicknameContainer = document.getElementById('nickname-container');

    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
        nicknameInput.value = savedNickname;
        nicknameInput.disabled = true;
        nicknameContainer.classList.add('hidden');
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

        const newPost = { nickname, text: postText, image: null };

        if (postImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                newPost.image = event.target.result;
                fetch('https://endregion-dc.vercel.app/api/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newPost)
                })
                .then(response => response.json())
                .then(post => {
                    const postElement = createPostElement(post.postId, post.nickname, post.text, post.image, post.postURL);
                    postsContainer.appendChild(postElement);
                });
            };
            reader.readAsDataURL(postImage);
        } else {
            fetch('https://endregion-dc.vercel.app/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            })
            .then(response => response.json())
            .then(post => {
                const postElement = createPostElement(post.postId, post.nickname, post.text, post.image, post.postURL);
                postsContainer.appendChild(postElement);
            });
        }

        galleryForm.reset();
    });

    function createPostElement(postId, nickname, text, image, postURL) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.dataset.postId = postId;

        const nicknameElement = document.createElement('p');
        nicknameElement.classList.add('nickname');
        nicknameElement.textContent = nickname;
        postElement.appendChild(nicknameElement);

        const urlElement = document.createElement('a');
        urlElement.href = postURL;
        urlElement.textContent = `Post URL: ${postURL}`;
        postElement.appendChild(urlElement);

        const textElement = document.createElement('p');
        textElement.textContent = text;
        postElement.appendChild(textElement);

        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            postElement.appendChild(imgElement);

            const deleteImageButton = document.createElement('button');
            deleteImageButton.textContent = 'X';
            deleteImageButton.classList.add('delete-image-button');
            deleteImageButton.addEventListener('click', () => deleteImage(postId));
            postElement.appendChild(deleteImageButton);
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => startEditPost(postId));
        postElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deletePost(postId));
        postElement.appendChild(deleteButton);

        return postElement;
    }

    function savePost(postId, nickname, text, image, postURL) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = { postId, nickname, text, image, postURL };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        fetch('https://endregion-dc.vercel.app/api/posts')
            .then(response => response.json())
            .then(posts => {
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    const postElement = createPostElement(post.postId, post.nickname, post.text, post.image, post.postURL);
                    postsContainer.appendChild(postElement);
                });
            });
    }

    function deletePost(postId) {
        fetch(`https://endregion-dc.vercel.app/api/posts/${postId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    loadPosts();
                }
            });
    }

    function deleteImage(postId) {
        if (confirm("Are you sure you want to remove the image?")) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const post = posts.find(post => post.postId === postId);
            if (post) {
                post.image = null;
                localStorage.setItem('posts', JSON.stringify(posts));
                loadPosts();
            }
        }
    }

    function startEditPost(postId) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = posts.find(post => post.postId === postId);
        if (post) {
            document.getElementById('post-text').value = post.text;
            if (post.image) {
                const imgPreview = document.createElement('img');
                imgPreview.src = post.image;
                imgPreview.classList.add('img-preview');
                document.querySelector('.gallery').appendChild(imgPreview);

                const removeImageButton = document.createElement('button');
                removeImageButton.textContent = 'Remove Image';
                removeImageButton.classList.add('remove-image-button');
                removeImageButton.addEventListener('click', () => deleteImage(postId));
                document.querySelector('.gallery').appendChild(removeImageButton);
            }
            deletePost(postId);
        }
    }

    loadPosts();
    document.getElementById('downloads').classList.add('active');
});