import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDhIAGi9QZiGbJB8AwFLAcA4CREiGf7uoc",
    authDomain: "crwn-db-681e4.firebaseapp.com",
    databaseURL: "https://crwn-db-681e4.firebaseio.com",
    projectId: "crwn-db-681e4",
    storageBucket: "crwn-db-681e4.appspot.com",
    messagingSenderId: "12238388786",
    appId: "1:12238388786:web:1c0278c06782a6c8fac62b",
    measurementId: "G-VXGLGCQGHS"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;