const express = require('express');
const router = express.Router();
const axios = require('axios');

// Render the form
router.get('/', (req, res) => {
    res.render('form');
});

// Handle form submission
router.get('/send', async (req, res) => {
    try {
        const { method = 'GET', url } = req.query;
        
        if (!url) {
            return res.status(400).send('URL is required');
        }

        // Make the HTTP request
        const response = await axios({
            method: method.toLowerCase(),
            url: url,
            validateStatus: () => true // Accept all status codes
        });

        // Send back the response
        res.send(`
            <h3>Response from ${method} ${url}</h3>
            <p>Status: ${response.status} ${response.statusText}</p>
            <h4>Headers:</h4>
            <pre>${JSON.stringify(response.headers, null, 2)}</pre>
            <h4>Response:</h4>
            <pre>${JSON.stringify(response.data, null, 2)}</pre>
            <p><a href="/">Back to form</a></p>
        `);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`
            <h3>Error making request</h3>
            <pre>${error.message}</pre>
            <p><a href="/">Back to form</a></p>
        `);
    }
});

module.exports = router;
