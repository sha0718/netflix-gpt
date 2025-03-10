// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPz-bsOgqk2RfzfnAgI4wfJmREfXQG6fk",
  authDomain: "netflix-gpt-fb734.firebaseapp.com",
  projectId: "netflix-gpt-fb734",
  storageBucket: "netflix-gpt-fb734.firebasestorage.app",
  messagingSenderId: "283839358963",
  appId: "1:283839358963:web:62f01c5bba63056f2b5486",
  measurementId: "G-RT82B4MV7P"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();

 