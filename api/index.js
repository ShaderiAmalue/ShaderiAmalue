const express = require('express');
const postsRouter = require('./posts');
const app = express();

app.use(express.json());
app.use('/api/posts', postsRouter);

module.exports = app;