const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.token = token;
  next();
};

// API endpoint for fetching messages
app.get('/api/messages/:channelId', verifyToken, async (req, res) => {
  const { channelId } = req.params;
  const { token } = req;

  try {
    const response = await axios.get(`https://discord.com/api/v9/channels/${channelId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// API endpoint for fetching profile
app.get('/api/profile', verifyToken, async (req, res) => {
  const { token } = req;

  try {
    const response = await axios.get('https://discord.com/api/v9/users/@me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// React components

const React = require('react');
const { useState, useEffect } = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter as Router, Route, Switch } = require('react-router-dom');
const axiosClient = axios.create();

const Home = () => (
  <div className="container">
    <h1>Welcome to Discord Tool</h1>
    <p>This tool offers various features like sending messages, viewing profiles, and more.</p>
  </div>
);

const Login = ({ setToken }) => {
  const [token, setTokenInput] = useState('');

  const handleLogin = async () => {
    setToken(token);
  };

  return (
    <div className="container login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your Discord token"
        value={token}
        onChange={(e) => setTokenInput(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Dashboard = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [channelId, setChannelId] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await axiosClient.get(`/api/messages/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(result.data);
    };

    fetchMessages();
  }, [channelId, token]);

  const sendMessage = async () => {
    // Add your send message logic here
  };

  const deleteMessage = async (messageId) => {
    // Add your delete message logic here
  };

  return (
    <div className="container dashboard">
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Channel ID"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            {msg.content}
            <button onClick={() => deleteMessage(msg.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Profile = ({ token }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await axiosClient.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(result.data);
    };

    fetchProfile();
  }, [token]);

  return (
    <div className="container profile">
      <h2>User Profile</h2>
      <p>User ID: {profile.id}</p>
      <p>Username: {profile.username}</p>
      <p>Birthday: {profile.birthday}</p>
      {/* Add more details as needed */}
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" render={() => <Login setToken={setToken} />} />
        <Route path="/dashboard" render={() => <Dashboard token={token} />} />
        <Route path="/profile" render={() => <Profile token={token} />} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));