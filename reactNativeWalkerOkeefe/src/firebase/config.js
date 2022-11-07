import app from 'firebase/app';
import firebase from 'firebase'; 

const firebaseConfig = {
    apiKey: "AIzaSyA7iGk-KqPDuWqpPEmq5BQ1viytNhXsrSo",
    authDomain: "proyectoreactnativewalkerokeef.firebaseapp.com",
    projectId: "proyectoreactnativewalkerokeef",
    storageBucket: "proyectoreactnativewalkerokeef.appspot.com",
    messagingSenderId: "458973444650",
    appId: "1:458973444650:web:6cfdfff24ac10f570d2153"
  };

  app.initializeApp(firebaseConfig)

export const db = app.firestore()
export const storage = app.storage()
export const auth = firebase.auth()