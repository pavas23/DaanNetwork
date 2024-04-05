import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCi12AjPwNQ-lSyhk02fW62iGS-1uS4g-E",
  authDomain: "daannetwork-b8fe5.firebaseapp.com",
  projectId: "daannetwork-b8fe5",
  storageBucket: "daannetwork-b8fe5.appspot.com",
  messagingSenderId: "1099405414759",
  appId: "1:1099405414759:web:55a01046d5138271531fc2",
  measurementId: "G-4C9JJ4BXX3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
