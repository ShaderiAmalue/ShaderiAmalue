// Function to show the login screen
function showLogin() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
}

// Handle login form submission
document.getElementById('token-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const token = document.getElementById('token').value;
    localStorage.setItem('discordToken', token);
    getUserProfile(token).then(user => {
        document.getElementById('profile-username').textContent = user.username;
        document.getElementById('profile-picture').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        document.getElementById('profile-confirmation').classList.remove('hidden');
        document.getElementById('login-screen').classList.add('hidden');
    }).catch(error => {
        console.error('Error fetching profile:', error);
        alert('Invalid token. Please try again.');
    });
});

// Function to confirm user profile
function confirmProfile() {
    document.getElementById('profile-confirmation').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
    showPage('dashboard-page');
}

// Function to retry login
function retryLogin() {
    document.getElementById('profile-confirmation').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
}

// Function to toggle token visibility
function toggleTokenVisibility() {
    const tokenInput = document.getElementById('token');
    const type = tokenInput.getAttribute('type') === 'password' ? 'text' : 'password';
    tokenInput.setAttribute('type', type);
}

// Function to show specified page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

// Handle user message form submission
document.getElementById('user-message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendUserMessage();
});

// Handle channel message form submission
document.getElementById('channel-message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendChannelMessage();
});

// Handle delete messages form submission
document.getElementById('delete-messages-form').addEventListener('submit', function(event) {
    event.preventDefault();
    deleteMessages();
});

// Function to send a user message
function sendUserMessage() {
    const token = localStorage.getItem('discordToken');
    const userId = document.getElementById('send-user-id').value;
    const message = document.getElementById('send-user-message').value;
    if (token && userId && message) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        fetch(`https://discord.com/api/v9/users/@me/messages`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ recipient_id: userId, content: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.retry_after) {
                setTimeout(() => sendUserMessage(), data.retry_after * 1000);
            } else if (data.id) {
                logAction(`Message sent to user ID ${userId}: ${message}`);
            }
        })
        .catch(error => console.error('Error sending message:', error));
    }
}

// Function to send a channel message
function sendChannelMessage() {
    const token = localStorage.getItem('discordToken');
    const channelId = document.getElementById('send-channel-id').value;
    const message = document.getElementById('send-channel-message').value;
    if (token && channelId && message) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ content: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.retry_after) {
                setTimeout(() => sendChannelMessage(), data.retry_after * 1000);
            } else if (data.id) {
                logAction(`Message sent to channel ID ${channelId}: ${message}`);
            }
        })
        .catch(error => console.error('Error sending message:', error));
    }
}

// Function to delete messages
function deleteMessages() {
    const token = localStorage.getItem('discordToken');
    const channelId = document.getElementById('delete-channel-id').value;
    const deleteCount = parseInt(document.getElementById('delete-count').value, 10);
    if (token && channelId && deleteCount) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        fetch(`https://discord.com/api/v9/channels/${channelId}/messages?limit=100`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(messages => {
            let deletePromises = [];
            let count = 0;

            messages.forEach(message => {
                if (count < deleteCount && message.author.id === getUserId(token)) {
                    deletePromises.push(fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${message.id}`, {
                        method: 'DELETE',
                        headers: headers
                    }).then(() => logAction(`Deleted message ID ${message.id} from channel ID ${channelId}`))
                    .catch(error => console.error('Error deleting message:', error)));
                    count++;
                }
            });

            return Promise.all(deletePromises);
        })
        .catch(error => console.error('Error fetching messages:', error));
    }
}

// Function to get user ID from token
function getUserId(token) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        fetch('https://discord.com/api/v9/users/@me', {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => resolve(data.id))
        .catch(error => reject(error));
    });
}

// Function to log actions
function logAction(action) {
    const logs = document.getElementById('logs');
    logs.textContent += `${action}\n`;
}

// Function to get user profile from token
function getUserProfile(token) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        fetch('https://discord.com/api/v9/users/@me', {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}

// Load saved token on page load
window.onload = function() {
    const savedToken = localStorage.getItem('discordToken');
    if (savedToken) {
        getUserProfile(savedToken).then(user => {
            document.getElementById('profile-username').textContent = user.username;
            document.getElementById('profile-picture').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
            document.getElementById('profile-confirmation').classList.remove('hidden');
            document.getElementById('login-screen').classList.add('hidden');
        }).catch(error => {
            console.error('Error fetching profile:', error);
            alert('Invalid token. Please log in again.');
            localStorage.removeItem('discordToken');
        });
    }
};