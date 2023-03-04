import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAWhqmVoedl0kTfb4zNwHo08CnFg8e-YQ",
    authDomain: "activity-tracker-app-28afa.firebaseapp.com",
    projectId: "activity-tracker-app-28afa",
    storageBucket: "activity-tracker-app-28afa.appspot.com",
    messagingSenderId: "815384065833",
    appId: "1:815384065833:web:5ed564e9faea6d8be6a938",
    measurementId: "G-J9X5MX14C6"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export const db = getFirestore(app);