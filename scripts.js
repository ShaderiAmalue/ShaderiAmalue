function closeWelcome() {
  const welcomeWindow = document.getElementById('welcome-window');
  welcomeWindow.style.opacity = '0';
  setTimeout(() => {
    welcomeWindow.style.display = 'none';
    document.getElementById('login-form').classList.add('active');
  }, 1000);
}

function showRegistrationForm() {
  document.getElementById('login-form').classList.remove('active');
  document.getElementById('registration-form').classList.add('active');
}

function generateVerificationCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

let verificationCode = '';

function sendVerificationEmail(event) {
  event.preventDefault();
  verificationCode = generateVerificationCode();
  const email = document.getElementById('email').value;
  sendEmail(email, verificationCode);
}

function sendEmail(email, code) {
  // This example uses EmailJS for sending emails
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_email: email,
    verification_code: code
  }).then(function(response) {
    console.log("Email sent successfully!", response.status, response.text);
  }, function(error) {
    console.error("Failed to send email.", error);
  });

  alert(`Verification email sent! Please check your inbox for the code.`);
  document.getElementById('registration-form').classList.remove('active');
  document.getElementById('verification-form').classList.add('active');
}

function verifyCode(event) {
  event.preventDefault();
  const code = document.getElementById('verification-code').value;
  if (code === verificationCode) {
    alert('Account verified and registered successfully!');
    document.getElementById('verification-form').classList.remove('active');
    document.getElementById('posts-page').classList.add('active');
  } else {
    alert('Invalid verification code. Please try again.');
  }
}

function showCreatePostForm() {
  document.getElementById('posts-page').classList.remove('active');
  document.getElementById('create-post-form').classList.add('active');
}

function submitPost(event) {
  event.preventDefault();
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;
  const image = document.getElementById('post-image').files[0];
  const video = document.getElementById('post-video').files[0];

  const postContainer = document.createElement('div');
  postContainer.classList.add('post');

  const postTitle = document.createElement('h3');
  postTitle.textContent = title;
  postContainer.appendChild(postTitle);

  const postContent = document.createElement('p');
  postContent.textContent = content;
  postContainer.appendChild(postContent);

  if (image) {
    const postImage = document.createElement('img');
    postImage.src = URL.createObjectURL(image);
    postContainer.appendChild(postImage);
  }

  if (video) {
    const postVideo = document.createElement('video');
    postVideo.controls = true;
    postVideo.src = URL.createObjectURL(video);
    postContainer.appendChild(postVideo);
  }

  document.getElementById('posts-list').appendChild(postContainer);
  document.getElementById('create-post-form').reset();
  document.getElementById('create-post-form').classList.remove('active');
  document.getElementById('posts-page').classList.add('active');
}

function login(event) {
  event.preventDefault();
  // Implement your login logic here
  alert('Login successful!');
  document.getElementById('login-form').classList.remove('active');
  document.getElementById('posts-page').classList.add('active');
}