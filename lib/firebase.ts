import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1jqF3ivxTj8Vr8kDuVgUS_qjC-OIkj8E",
  authDomain: "zero-trust-network-37b38.firebaseapp.com",
  databaseURL: "https://zero-trust-network-37b38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zero-trust-network-37b38",
  storageBucket: "zero-trust-network-37b38.firebasestorage.app",
  messagingSenderId: "526761658865",
  appId: "1:526761658865:web:e8f15512b39cb886a79c50",
  measurementId: "G-0RGSZCXHBP"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { database, analytics, auth };
