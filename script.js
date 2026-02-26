import { db, auth } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const api = {
    // REPLACING OLD PHP CALLS WITH FIRESTORE
    async getAllStations(type = '') {
        const stationsRef = collection(db, "stations");
        let q = stationsRef;
        
        if (type && type !== 'all') {
            q = query(stationsRef, where("type", "==", type.toUpperCase()));
        }
        
        const querySnapshot = await getDocs(q);
        return {
            success: true,
            stations: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        };
    },

    async createBooking(stationId, vehicleId, timeSlot, bookingDate) {
        try {
            const docRef = await addDoc(collection(db, "bookings"), {
                userId: auth.currentUser.uid,
                stationId: stationId,
                vehicleId: vehicleId,
                timeSlot: timeSlot,
                date: bookingDate,
                status: "confirmed",
                createdAt: new Date()
            });
            return { success: true, id: docRef.id };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }
};
