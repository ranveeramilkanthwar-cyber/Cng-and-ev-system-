// script.js - Updated Map & Station Logic
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const mapFunctions = {
    initMap: async () => {
        const defaultCenter = { lat: 19.0760, lng: 72.8777 }; // Mumbai default
        state.map = new google.maps.Map(document.getElementById('map'), {
            center: defaultCenter,
            zoom: 12,
            mapId: 'YOUR_MAP_ID' // Required for advanced markers
        });

        // Initialize markers from your database
        await stationFunctions.loadStationsOnMap();
    },

    // Places API integration for nearby search
    searchNearbyStations: async (location, type) => {
        const { Place } = await google.maps.importLibrary("places");
        const request = {
            includedTypes: type === 'EV' ? ['electric_vehicle_charging_station'] : ['gas_station'],
            locationRestriction: { center: location, radius: 5000 },
            maxResultCount: 10
        };

        const { places } = await Place.searchNearby(request);
        return places; // Returns list of nearby stations from Google's own database
    }
};

const stationFunctions = {
    loadStationsOnMap: async () => {
        // Clear old markers first
        state.markers.forEach(m => m.setMap(null));
        state.markers = [];

        // Fetch stations from your Firestore collection
        const querySnapshot = await getDocs(collection(db, "stations"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const marker = new google.maps.Marker({
                position: { lat: data.latitude, lng: data.longitude },
                map: state.map,
                title: data.name,
                icon: data.type === 'EV' ? 'path/to/ev-icon.png' : 'path/to/cng-icon.png'
            });

            // Click listener for booking
            marker.addListener('click', () => {
                state.selectedStation = { id: doc.id, ...data };
                bookingFunctions.openBookingModal(state.selectedStation);
            });

            state.markers.push(marker);
        });
    }
};
