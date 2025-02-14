document.getElementById('token-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const token = document.getElementById('token').value;
    localStorage.setItem('discordToken', token);
    getUserProfile(token).then(user => {
        document.getElementById('profile-username').textContent = user.username;
        document.getElementById('profile-picture').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        document.getElementById('profile-confirmation').classList.remove('hidden');
    }).catch(error => {
        console.error('Error fetching profile:', error);
        alert('Invalid token. Please try again.');
    });
});

function confirmProfile() {
    document.getElementById('profile-confirmation').classList.add('hidden');
    document.querySelector('.welcome-screen').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
    showPage('dashboard-page');
}

function retryLogin() {
    document.getElementById('profile-confirmation').classList.add('hidden');
    document.getElementById('token-form').classList.remove('hidden');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

document.getElementById('user-message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendUserMessage();
});

document.getElementById('channel-message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendChannelMessage();
});

document.getElementById('delete-messages-form').addEventListener('submit', function(event) {
    event.preventDefault();
    deleteMessages();
});

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
                if (count < deleteCount && message.author.id === user.id) {
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

function logAction(action) {
    const logs = document.getElementById('logs');
    logs.textContent += `${action}\n`;
}

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

window.onload = function() {
    const savedToken = localStorage.getItem('discordToken');
    if (savedToken) {
        getUserProfile(savedToken).then(user => {
            document.getElementById('profile-username').textContent = user.username;
            document.getElementById('profile-picture').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
            document.getElementById('profile-confirmation').classList.remove('hidden');
        }).catch(error => {
            console.error('Error fetching profile:', error);
            alert('Invalid token. Please log in again.');
            localStorage.removeItem('discordToken');
        });
    }
};