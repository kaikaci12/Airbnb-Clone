// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOpuIzOp_pEMPj10ZEIElz1xKs7dx1ytk",
  authDomain: "airbnb-clone-63411.firebaseapp.com",
  projectId: "airbnb-clone-63411",
  storageBucket: "airbnb-clone-63411.appspot.com",
  messagingSenderId: "318328993776",
  appId: "1:318328993776:web:590cd66d30d9e257110f35",
  measurementId: "G-3JQCS2H8WH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app); // Export the storage instance
