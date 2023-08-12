import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3DeBeB0uV_m9AC4A8rRpiIGQxcuPlw-g",
  authDomain: "awesomeproject-b8655.firebaseapp.com",
  projectId: "awesomeproject-b8655",
  storageBucket: "awesomeproject-b8655.appspot.com",
  messagingSenderId: "214328931328",
  appId: "1:214328931328:web:4c0d40961537f8af4e14e5",
  measurementId: "G-SZRZPR5TQ2"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


