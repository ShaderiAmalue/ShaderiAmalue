function closeWelcome() {
  const welcomeWindow = document.getElementById('welcome-window');
  welcomeWindow.style.opacity = '0';
  setTimeout(() => {
    welcomeWindow.style.display = 'none';
    document.getElementById('login-form').classList.add('active');
  }, 1000);
}

function generateVerificationCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
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
  // Use your preferred email sending API here
  console.log(`Sending email to ${email} with code ${code}`);
  alert(`Verification email sent! Your code is: ${code}`);
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

function createPost() {
  document.getElementById('posts-page').classList.remove('active');
  document.getElementById('create-post-form').classList.add('active');
}