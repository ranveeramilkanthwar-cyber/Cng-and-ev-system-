// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbD5v0nVuv9xUSzzpfwcxLVvl5Nom2lZc",
  authDomain: "cng-and-ev-system.firebaseapp.com",
  projectId: "cng-and-ev-system",
  storageBucket: "cng-and-ev-system.firebasestorage.app",
  messagingSenderId: "565192353848",
  appId: "1:565192353848:web:f121ce7a6d81f9ecaa5ecd",
  measurementId: "G-2P7VBHQV86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services to use in auth.js, owner.js, etc.
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
