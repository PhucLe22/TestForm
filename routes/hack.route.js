const express = require('express');
const router = express.Router();

// Render the form
router.get('/', (req, res) => {
    try {
        res.render('form', { 
            title: 'HTTP Request Tester',
            baseUrl: process.env.BASE_URL || `${req.protocol}://${req.get('host')}`
        });
    } catch (error) {
        console.error('Error rendering form:', error);
        res.status(500).render('error', { 
            title: 'Error',
            message: 'Failed to load the form' 
        });
    }
});

// Handle form submission
router.get('/send', (req, res) => {
    try {
        const { method = 'GET', url } = req.query;
        
        if (!url) {
            return res.status(400).render('error', {
                title: 'Error',
                message: 'URL is required'
            });
        }

        // Here you would typically make the HTTP request
        // For now, we'll just render a response
        res.render('response', {
            title: 'Request Sent',
            method,
            url,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Failed to process the request',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
});

module.exports = router;
