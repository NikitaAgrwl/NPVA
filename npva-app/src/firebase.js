import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEVUsNlvaI9Iq_UDf5PQaIRedpzLqTUK8",
    authDomain: "npva-d6f76.firebaseapp.com",
    projectId: "npva-d6f76",
    storageBucket: "npva-d6f76.appspot.com",
    messagingSenderId: "511048308923",
    appId: "1:511048308923:web:5a232913b0b83b8f40b19e",
    measurementId: "G-21PT7VLDW0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();


export { db, auth };