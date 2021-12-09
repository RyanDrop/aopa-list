import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

export class FirebaseServices {
  constructor() {}
  start() {
    const firebaseConfig = {
      apiKey: "AIzaSyABrrPTVmSDisUjpVlnnjBvNiSUxd6uT1g",
      authDomain: "aopamundo-storage.firebaseapp.com",
      projectId: "aopamundo-storage",
      storageBucket: "aopamundo-storage.appspot.com",
      messagingSenderId: "177063059627",
      appId: "1:177063059627:web:b1b370d1a5559f973b97ee",
      measurementId: "G-KG4NX23DEQ",
    };
    this.app = initializeApp(firebaseConfig);
  }
}
