import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const API_KEY = import.meta.env.VITE_API_KEY;
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "eon-test-5dbe5.firebaseapp.com",
  projectId: "eon-test-5dbe5",
  storageBucket: "eon-test-5dbe5.appspot.com",
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: "G-LFBPCCQH2M",
  databaseURL:
    "https://eon-test-5dbe5-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const dbRef = ref;
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const storage = getStorage(app);
