
const PORT = process.env.VITE_PORT || "3000";
const HOST = process.env.VITE_HOST || "localhost";

// Initialize the map
const map = L.map('map').setView([7.8731, 80.7718], 7); // Coordinates for Sri Lanka

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a bus icon marker
const busIcon = L.icon({
    iconUrl: './Resources/Icons/BrandixBusIcon.png', // Relative path for browser compatibility
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
});


const busMarker = L.marker([7.8731, 80.7718], { icon: busIcon }).addTo(map);
// Function to update bus location
async function updateBusLocation() {
    try {
    const response = await fetch(`http://${HOST}:${PORT}/bus-location`, { mode: 'no-cors' }); // Use HOST and PORT from environment variables
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const latitude = data.location.latitude;
    const longitude = data.location.longitude;
    
    console.log('Bus Location:', data);
    // Update the marker position
    busMarker.setLatLng([latitude, longitude]);
    } catch (error) {
    console.error('Error fetching bus location:', error);
    }
}
// Update location every 1 second
setInterval(updateBusLocation, 3000);