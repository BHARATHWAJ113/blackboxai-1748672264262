import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5bshtZH6w__eiJD_G1V-HKkACELi-D-A",
  authDomain: "chatapp-6e907.firebaseapp.com",
  projectId: "chatapp-6e907",
  storageBucket: "chatapp-6e907.firebasestorage.app",
  messagingSenderId: "554775853566",
  appId: "1:554775853566:web:543b5dd98f2171db20a8af",
  measurementId: "G-46S54F7ZME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
