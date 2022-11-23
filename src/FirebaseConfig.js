import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseconfig ={
    apiKey: "AIzaSyC4YE5Z15wISt_bGi_6I17ThvU6ykr7AjI",
    authDomain: "typopill.firebaseapp.com",
    projectId: "typopill",
    storageBucket: "typopill.appspot.com",
    messagingSenderId: "755065819409",
    appId: "1:755065819409:web:7b60dbe03f942de67d3cb0",
    measurementId: "G-3E8PE5QWGF",
}

const firebaseApp = firebase.initializeApp(firebaseconfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth,db};

