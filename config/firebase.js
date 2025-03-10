
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDjEhyVmb_ea5onkjSxi7yqmdiRzD94tik",
  authDomain: "mind-lancer.firebaseapp.com",
  projectId: "mind-lancer",
  storageBucket: "mind-lancer.firebasestorage.app",
  messagingSenderId: "526290372484",
  appId: "1:526290372484:web:478158bc33bd18e1b27fd1",
  measurementId: "G-XFKNG38QYE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);