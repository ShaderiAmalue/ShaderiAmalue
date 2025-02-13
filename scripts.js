document.querySelector('.enter-btn').addEventListener('click', function() {
    document.querySelector('.welcome-screen').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
});

document.getElementById('save-settings').addEventListener('click', function() {
    saveTokenAndFetchProfile(); // Save token and fetch user profile after clicking Save
});

document.getElementById('user-message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendUserMessage();
});

document.getElementById('channel-message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendChannelMessage();
});


function saveTokenAndFetchProfile() {
    const token = document.getElementById('token').value;
    if (token) {
        localStorage.setItem('discordToken', token);
        getUserProfile(token);
    }
}

function sendUserMessage() {
    const token = localStorage.getItem('discordToken');
    const userId = document.getElementById('send-user-id').value;
    const message = document.getElementById('send-user-message').value;
    if (token && userId && message) {
        const headers = {
            'Authorization': token,
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
            'Authorization': token,
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

function getUserId(token) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Authorization': token,
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

function logAction(action) {
    const logs = document.getElementById('logs');
    logs.textContent += `${action}\n`;
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

function getUserProfile(token) {
    if (token) {
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        };
        fetch('https://discord.com/api/v9/users/@me', {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').value = data.username;
            document.getElementById('display-name').value = data.global_name || data.username;
            document.getElementById('profile-picture').src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
        })
        .catch(error => console.error('Error fetching profile:', error));
    }
}

window.onload = function() {
    const savedToken = localStorage.getItem('discordToken');
    if (savedToken) {
        document.getElementById('token').value = savedToken;
        getUserProfile(savedToken);
    }
};