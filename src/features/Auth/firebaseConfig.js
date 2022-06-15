import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxFrvImIsyjTZLdailLXDPeoRHzrBQ_v8",
  authDomain: "web-movie-4018c.firebaseapp.com",
  projectId: "web-movie-4018c",
  storageBucket: "web-movie-4018c.appspot.com",
  messagingSenderId: "529213202601",
  appId: "1:529213202601:web:3e8f3ea72ae3b9c9ee89b8",
  measurementId: "G-H78ZFPXZYP",
};

//Initialize firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);

export default auth;
