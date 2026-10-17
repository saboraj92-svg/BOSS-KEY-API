const express = require('express');
const app = express();

// Keys store karne ke liye array
let activeKeys = []; 

app.use(express.json());

// 1. BOSS Random Key Generate karne ka endpoint
app.get('/api/generate', (req, res) => {
    const randomKey = 'BOSS-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    activeKeys.push(randomKey);
    res.status(200).json({
        status: 'success',
        message: 'BOSS Key generated successfully!',
        key: randomKey,
        allKeys: activeKeys
    });
});

// 2. BOSS Key Validate karne ka endpoint
app.get('/api/validate', (req, res) => {
    const userKey = req.query.key;

    if (!userKey) {
        return res.status(400).json({ status: 'error', message: 'API key is missing!' });
    }

    if (activeKeys.includes(userKey)) {
        return res.status(200).json({ status: 'success', message: 'Valid BOSS Key!', key: userKey });
    } else {
        return res.status(401).json({ status: 'error', message: 'Invalid BOSS Key!' });
    }
});

// 3. BOSS Key Delete karne ka endpoint
app.get('/api/delete', (req, res) => {
    const userKey = req.query.key;

    const index = activeKeys.indexOf(userKey);
    if (index !== -1) {
        activeKeys.splice(index, 1);
        return res.status(200).json({ status: 'success', message: `BOSS Key ${userKey} deleted successfully!` });
    } else {
        return res.status(404).json({ status: 'error', message: 'BOSS Key not found!' });
    }
});

module.exports = app;
