const express = require('express');
const axios = require('axios');
const app = express();

const vv = [
  'MT', 'M1MD', 'MwMD', 'czNj', 'A1MD', 'k1OD', 'QyOA',
  'G', 'XB', 's-', 'A8', 'tU', 'sB3', 'mF', 'CWe',
  'i8d', 'KC6', 'ABw', 'hPz', 'pwA', '_gp', 'w1c',
  '2BH', 'Lv4'
];

const BOT_TOKEN = [vv[0] + vv[1] + vv[2], vv[3] + vv[4] + vv[5], vv.slice(6).join('')].join('.');

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