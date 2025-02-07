import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUzV8meSQqs4hlML0qVRrzQX45tM9LqnU",
  authDomain: "assignment-79cb9.firebaseapp.com",
  projectId: "assignment-79cb9",
  storageBucket: "assignment-79cb9.firebasestorage.app",
  messagingSenderId: "787330245408",
  appId: "1:787330245408:web:9024126e848f84f21eed45",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
