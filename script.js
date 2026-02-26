// Inside your script.js
import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// OLD PHP LOGIN (Remove this)
// const response = await api.login(email, password);

// NEW FIREBASE LOGIN (Add this)
async function handleLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        state.currentUser = userCredential.user;
        utils.showToast("Logged in successfully!");
        // Proceed to update UI
    } catch (error) {
        utils.showError('loginError', error.message);
    }
}
