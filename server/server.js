const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000; // Port number for the server

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware to handle CORS issues
app.use(cors());

// Route to fetch data from the external API
app.get('/api/alerts', async (req, res) => {
    try {
        const response = await axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/data');
        const data = JSON.parse(response.data.body);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

// POST endpoint to accept latitude and longitude
app.post('/api/calculate', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const response = await axios.post('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/calculate', {
            latitude,
            longitude
        });

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error sending data:', error);
        res.status(500).send('Error sending data');
    }
});

// GET endpoint to fetch headlines
app.get('/api/headlines', async (req, res) => {
    try {
        const response = await axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/getHeadlines');
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching headlines:', error);
        res.status(500).send('Error fetching headlines');
    }
});

// GET endpoint to fetch CBC news data
app.get('/api/cbc-data', async (req, res) => {
    try {
        const response = await axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/getCBCData');
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching CBC data:', error);
        res.status(500).send('Error fetching CBC data');
    }
});

// GET endpoint to fetch alerter data
app.get('/api/alerter', async (req, res) => {
    try {
        const response = await axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/alerter');
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching alerter data:', error);
        res.status(500).send('Error fetching alerter data');
    }
});

// Additional endpoint to fetch Al Jazeera data
app.get('/api/al-jazeera', async (req, res) => {
    try {
        const response = await axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/getJazeeraData');
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching Al Jazeera data:', error);
        res.status(500).send('Error fetching Al Jazeera data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});