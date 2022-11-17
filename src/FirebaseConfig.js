import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseconfig ={
    apiKey : process.env.REACT_APP_API_KEY,
    authDomain : process.env.REACT_APP_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_PROJECT_ID,
    storageBucket : process.env.REACT_APP_STORAGE_BUCKET,
    messegingSenderId : process.env.REACT_APP_MEASSEGEING_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId : process.env.REACT_APP_MEASURMENT_ID,
}

const firebaseApp = firebase.initializeApp(firebaseconfig);
const auth = firebase.auth();

export {auth};