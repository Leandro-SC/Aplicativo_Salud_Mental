// routes/blog.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM chats';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching blog posts:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve blog posts' });
        }
        res.json(results);
    });
});

module.exports = router;