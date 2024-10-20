// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import the auth module
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBk4J1TgApPIH0XxFtGWnB5xBdXj7mpONQ",
    authDomain: "test-aebf2.firebaseapp.com",
    projectId: "test-aebf2",
    storageBucket: "test-aebf2.appspot.com",
    messagingSenderId: "553230367499",
    appId: "1:553230367499:web:29278719683784858b800e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services
export { auth, db, storage };
