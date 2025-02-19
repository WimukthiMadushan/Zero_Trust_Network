import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA1jqF3ivxTj8Vr8kDuVgUS_qjC-OIkj8E",
  authDomain: "zero-trust-network-37b38.firebaseapp.com",
  projectId: "zero-trust-network-37b38",
  storageBucket: "zero-trust-network-37b38.firebasestorage.app",
  messagingSenderId: "526761658865",
  appId: "1:526761658865:web:e8f15512b39cb886a79c50",
  measurementId: "G-0RGSZCXHBP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);