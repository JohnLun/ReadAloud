import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZLJvUXX2AjkUfpOHnLIpbguQTTwKj058",
  authDomain: "readaloud-363019.firebaseapp.com",
  projectId: "readaloud-363019",
  storageBucket: "readaloud-363019.appspot.com",
  messagingSenderId: "528395481952",
  appId: "1:528395481952:web:2158d970ce5e6e836d6405",
};

const apps = getApps();
export const app = apps.length === 0 ? initializeApp(firebaseConfig) : getApp();
