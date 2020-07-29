import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAeQYTgrDuGUbVL_VTkRkfkTJsNtJ_P7lg",
    authDomain: "tupan-center-api.firebaseapp.com",
    databaseURL: "https://tupan-center-api.firebaseio.com",
    projectId: "tupan-center-api",
    storageBucket: "tupan-center-api.appspot.com",
    messagingSenderId: "729513313750",
    appId: "1:729513313750:web:d93770dc2ff428f7e9d077",
    measurementId: "G-MLKWZ3SN1Z"
  };


  firebase.initializeApp(firebaseConfig);
  export default firebase;