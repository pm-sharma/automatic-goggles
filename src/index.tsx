import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAu59nQPNTfLY-bR9OSNDWx5_8AV7EKMQA",
  authDomain: "vumonic-e599c.firebaseapp.com",
  projectId: "vumonic-e599c",
  storageBucket: "vumonic-e599c.appspot.com",
  messagingSenderId: "70746693878",
  appId: "1:70746693878:web:b2c9cfdac5603a7bbf8cd7",
  measurementId: "G-0WRYRY3T8Z"
};

export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const db = getFirestore(app);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
