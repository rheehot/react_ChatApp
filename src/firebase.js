import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBcT8c53u8rcXM3KSW27kY-tXNimEaKFPs",
    authDomain: "react-chatting-app-50ef5.firebaseapp.com",
    projectId: "react-chatting-app-50ef5",
    storageBucket: "react-chatting-app-50ef5.appspot.com",
    messagingSenderId: "522515946125",
    appId: "1:522515946125:web:1b92375caa49965051a0c4",
    measurementId: "G-6Z66DG7PBB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;