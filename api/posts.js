const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const sanitizeHtml = require('sanitize-html');

let posts = [];

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Too many requests from this IP, please try again after a minute"
});

const sanitizeInput = (input) => sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
});

const validateInput = (req, res, next) => {
    const { nickname, text, image } = req.body;
    if (!nickname || !text) {
        return res.status(400).json({ error: 'Nickname and text are required' });
    }
    req.body.nickname = sanitizeInput(nickname);
    req.body.text = sanitizeInput(text);
    req.body.image = image ? sanitizeInput(image) : null;
    next();
};

router.get('/', (req, res) => {
    res.json(posts);
});

router.post('/', limiter, validateInput, (req, res) => {
    const { nickname, text, image } = req.body;
    const postId = new Date().getTime().toString();
    const postURL = `${req.protocol}://${req.get('host')}/post/${postId}`;
    const newPost = { postId, nickname, text, image, postURL };
    posts.push(newPost);
    res.status(201).json(newPost);
});

router.get('/:postId', (req, res) => {
    const post = posts.find(p => p.postId === req.params.postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

module.exports = router;