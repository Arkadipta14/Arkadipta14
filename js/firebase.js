// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var fireBase = fireBase || firebase;
var hasInit = false;

const firebaseConfig = {
  apiKey: "AIzaSyCu_GVMasQueEpsSFtZ4UWR_yNpv-NxEiI",
  authDomain: "serviceapp-303da.firebaseapp.com",
  projectId: "serviceapp-303da",
  storageBucket: "serviceapp-303da.appspot.com",
  messagingSenderId: "528969853948",
  appId: "1:528969853948:web:fa5552e815c13f70452079",
  measurementId: "G-KTCMLQHHQ6"
};

let app = null;

if(!hasInit){
    // Initialize Firebase
    app = firebase.initializeApp(firebaseConfig);
    hasInit = true;
}

// console.log("app => ", app)