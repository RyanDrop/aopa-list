import { FirebaseApp, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, Timestamp, updateDoc, doc } from "firebase/firestore";
import { Observable } from "../classes/observable.js";

interface User {
  personal_information: {
    name: string;
    occupation: string;
    gender: null | string;
    birthday: null | Date;
  };
  preferences: {
    dark_mode: boolean;
    phrases_API: boolean;
  };
}
export class FirebaseServices {
  constructor() {}
  app: FirebaseApp;
  start(): void {
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

  register(email: string, password: string, name: string, occupation: string): void {
    const auth = getAuth();
    const user: User = {
      personal_information: {
        name: name,
        occupation: occupation,
        gender: null,
        birthday: null,
      },
      preferences: {
        dark_mode: false,
        phrases_API: true,
      },
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.registerDices(user);
      })
      .catch(() => {
        console.log("error.message");
      });
  }

  async registerDices(user: object): Promise<void> {
    const auth = getAuth();
    const db = getFirestore();
    const userCollectionReference = collection(db, "User_ID");
    const userDocReference = doc(userCollectionReference, auth.currentUser.uid);
    const userDices = collection(userDocReference, "profile");

    try {
      await addDoc(userDices, user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
