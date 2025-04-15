import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config(); 

const PORT = process.env.PORT; // Default to 3000 if PORT is not set
const HOST = process.env.HOST; // Default to 'localhost' if HOST is not set
const app = express();


// Enable CORS for all routes
app.use(cors());

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the index.html file from the parent directory
// Serve the index.html file from the parent directory
app.get('/', (req, res) => {
    console.log('Received request for index.html');
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Serve static files from the Frontend folder
app.use(express.static(path.join(__dirname, '../Frontend')));

app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});

// Dummy bus location data
let toggle = true;

app.get('/bus-location', (req, res) => {
    console.log('Received request for bus location');
    const location1 = { latitude: 7.8731, longitude: 80.7718 }; // Location 1
    const location2 = { latitude: 6.0731, longitude: 80.7218 }; // Location 2

    const currentLocation = toggle ? location1 : location2;
    toggle = !toggle; // Toggle between the two locations

    res.setHeader('Access-Control-Allow-Origin', '*');  // CORS for external access
    console.log('Current bus location:', currentLocation);
    res.json({ success: true, location: currentLocation });
});