import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { KeyLists } from 'app/domain/todo/services/tasks/task.service.models';
import { getDoc } from 'firebase/firestore';
import { defer, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AopaUser, eFireStorageCollections, FirebaseToastMessage, FIREBASE_ERROR_MENSAGENS, KeysTaskData, RegisterUser, ValuesTaskData } from './firebase.service.models';


const spaceBeforeEveryUppercase = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').toLocaleLowerCase();

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private auth: Auth,
    private toast: HotToastService,
    private firestore: Firestore,
  ) { }

  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    const observable$ = defer(() => {
      return createUserWithEmailAndPassword(this.auth, email, password);
    }).pipe(
      tap(() => {
        this.toast.success('Register successful');
      }),
    );

    return observable$;
  }

  registerUser(user: RegisterUser) {
    const aopaUser: AopaUser = {
      name: user.name,
      email: user.email,
      occupation: user.occupation,
      darkThemePreference: false,
      phrasePreference: true,
      tasks: {
        currentDay: '0',
        currentId: 0,
        lastSunday: '0',
        today: [],
        todayCurrentStreak: 0,
        week: [],
        weekCurrentStreak: 0,
      },
    };

    return this.createUserWithEmailAndPassword(user.email, user.password).pipe(
      switchMap(() => {
        return this.addUserInfo(aopaUser);
      })
    );
  }

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    const observable$ = defer(() => {
      return signInWithEmailAndPassword(this.auth, email, password);
    }).pipe(
      tap(() => {
        this.toast.success(FirebaseToastMessage.USER_LOGGED_IN);
      }),
      catchError((error: FirebaseError) => {
        this.toast.error(FIREBASE_ERROR_MENSAGENS[error.code] || error.code);
        throw error.code;
      })
    );

    return observable$;
  }

  async addUserInfo(user: AopaUser) {
    const userDocReference = this.getReference();
    try {
      await setDoc(userDocReference, user);
    } catch (error) {
      this.toast.error(`Error adding document: ${error}`);
    }
  }

  getReference() {
    return doc(
      this.firestore,
      eFireStorageCollections.USERS,
      this.auth.currentUser!.uid
    );
  }

  async getUser() {
    const doc = await getDoc(this.getReference());
    const user = doc.data() as AopaUser;
    return user;
  }

  updateTasksFields(key: KeysTaskData | KeyLists, value: ValuesTaskData): void {
    const usersDocReference = this.getReference();
    try {
      updateDoc(usersDocReference, { [`tasks.${key}`]: value });
    } catch (error) {
      this.toast.error(`Error adding document: ${error}`);
    }
  }


}
