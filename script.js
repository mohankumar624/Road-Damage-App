document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map if the map container exists
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        // Center the map (using a default location, e.g., Madurai)
        const map = L.map('map').setView([9.9252, 78.1198], 12);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add Severe Damage Marker (Red)
        const severeMarker = L.circleMarker([9.9352, 78.1298], {
            radius: 10,
            fillColor: "#ef4444",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        severeMarker.bindPopup("<b>Severe Damage</b><br>Location: Anna Nagar, Madurai<br><button onclick='window.location.href=\"report.html\"' style='padding: 5px 10px; margin-top: 5px; font-size: 12px;'>View Details</button>");

        // Add Fixed Round Marker (Green)
        const fixedMarker = L.circleMarker([9.9152, 78.1098], {
            radius: 10,
            fillColor: "#10b981",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        fixedMarker.bindPopup("<b>Fixed Road</b><br>Location: Periyar, Madurai");
        
        // Add Marker on Click (for future reporting functionality)
        map.on('click', (e) => {
            console.log("Map clicked at: ", e.latlng);
            // In a real app, this would open the report form with coordinates
        });
    }

    // Initialize Admin Map for Live Location Tracking
    const adminMapElement = document.getElementById('admin-map');
    if (adminMapElement) {
        const adminMap = L.map('admin-map').setView([0, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(adminMap);

        let adminMarker;
        let firstLocation = true;

        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition((position) => {
                const { latitude, longitude } = position.coords;
                const latlng = [latitude, longitude];

                if (!adminMarker) {
                    // Create Admin Marker (Blue Circle)
                    adminMarker = L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: "#3b82f6",
                        color: "#fff",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.9
                    }).addTo(adminMap);
                    adminMarker.bindPopup("<b>Admin (You)</b><br>Live Location Tracking").openPopup();
                } else {
                    adminMarker.setLatLng(latlng);
                }

                if (firstLocation) {
                    adminMap.setView(latlng, 15);
                    firstLocation = false;
                }
            }, (error) => {
                console.error("Error tracking location: ", error);
                alert("Please enable location access for the Admin Dashboard to track your position.");
            }, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }
});
