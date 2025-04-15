import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the index.html file from the parent directory
// Serve the index.html file from the parent directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve static files from the resources folder
app.use('/Resources', express.static(path.join(__dirname, '../Resources')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Dummy bus location data
let toggle = true;

app.get('/bus-location', (req, res) => {
    console.log('Received request for bus location');
    const location1 = { latitude: 7.8731, longitude: 80.7718 }; // Location 1
    const location2 = { latitude: 6.0731, longitude: 80.7218 }; // Location 2

    const currentLocation = toggle ? location1 : location2;
    toggle = !toggle; // Toggle between the two locations

    console.log('Current bus location:', currentLocation);
    res.json({ success: true, location: currentLocation });
});