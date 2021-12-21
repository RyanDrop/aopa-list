import { FirebaseApp, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Observable } from "../classes/observable";

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
  public user$ = new Observable<User>();

  public hasLogin$ = new Observable<boolean>();
  app: FirebaseApp;
  constructor() {
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
    this.hasLogin();
  }

  getUser() {
    const auth = getAuth();
    const db = getFirestore();
    const userDocReference = doc(db, "user_id", auth.currentUser.uid);
    getDoc(userDocReference)
      .then((doc) => {
        const user = doc.data();
        this.user$.publish(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  private hasLogin(): void {
    const auth = getAuth();
    this.hasLogin$.publish(false);
    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        this.getUser();
        this.hasLogin$.publish(true);
      }
    });
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
    const userDocReference = doc(db, "user_id", auth.currentUser.uid);

    try {
      await setDoc(userDocReference, user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  login(email: string, password: string): void {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  logout(): void {
    const auth = getAuth();
    signOut(auth);
  }
}
