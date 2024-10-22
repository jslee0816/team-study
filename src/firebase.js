import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAU-oSzAAW1saapB3K_uSHFJiFnzVGAT8A",
  authDomain: "myionicapp-809d9.web.app",
  projectId: "myionicapp-809d9",
  storageBucket: "myionicapp-809d9.appspot.com",
  messagingSenderId: "285130707806",
  appId: "1:285130707806:web:9e75089f9c5cf152e575cf",
  measurementId: "G-8YYPNRRRG6",
  databaseURL: "https://myionicapp-809d9-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Firebase 초기화0
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Firebase Authentication 초기화
const auth = getAuth(app);

export { database, auth };
