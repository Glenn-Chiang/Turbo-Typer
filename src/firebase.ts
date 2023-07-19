import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDaSVJeuo8VVcX6KYR6RDJ9JyeLDVToIfk",
  authDomain: "turbo-typer.firebaseapp.com",
  projectId: "turbo-typer",
  storageBucket: "turbo-typer.appspot.com",
  messagingSenderId: "881461379408",
  appId: "1:881461379408:web:179448aa9c33c368306c55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };