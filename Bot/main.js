const express = require('express');
const axios = require('axios');
const app = express();

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || 'YOUR_DISCORD_BOT_TOKEN';
const DISCORD_USER_ID = '1238870905799835718';

app.get('/api/discord-profile', async (req, res) => {
  try {
    const response = await axios.get(`https://discord.com/api/v10/users/${DISCORD_USER_ID}`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Failed to fetch Discord profile');
  }
});

app.listen(3000, () => console.log('API is running on http://localhost:3000'));