import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updateProfile, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { HotToastService } from '@ngneat/hot-toast';
import { KeyLists } from 'app/domain/todo/services/tasks/task.service.models';
import { Project } from 'app/shared/services/projects/projects.service.models';
import { getDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes
} from 'firebase/storage';
import { defer, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AopaUser, eFireStorageCollections, FirebaseThrowError, FirebaseToastMessage, FIREBASE_ERROR_MENSAGENS, KeysTaskData, RegisterUser, ValuesTaskData } from './firebase.service.models';


const spaceBeforeEveryUppercase = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').toLocaleLowerCase();

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private auth: Auth,
    private toast: HotToastService,
    private firestore: Firestore,
    private storage: Storage,
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
      projects: [],
    };

    return this.createUserWithEmailAndPassword(user.email, user.password).pipe(
      switchMap(() => {
        return this.addUserInfo(aopaUser);
      }), switchMap(() => {
        return this.uploadFile(user.file).pipe(switchMap((uploadTaskSnapshot) => {
          return this.updateProfile({
            displayName: user.name,
            photoURL: uploadTaskSnapshot
          })
        }))
      }),
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

  updateUserProfileImage(file: File) {
    return this.uploadFile(file).pipe(
      switchMap((uploadTaskSnapshot) => {
        return this.updateProfile({
          photoURL: uploadTaskSnapshot
        })
      }
      )
    );
  }

  async addUserInfo(user: AopaUser) {
    const userDocReference = this.getReference();
    try {
      await setDoc(userDocReference, user);
    } catch (error) {
      this.toast.error(`Error adding document: ${error}`);
    }
  }

  updateProfile(user: {
    displayName?: string | null;
    photoURL?: string | null;
  }) {
    const observable$ = defer(() => {
      if (!this.auth.currentUser)
        throw Error(FirebaseThrowError.USER_IS_NOT_LOGGED);
      return updateProfile(this.auth.currentUser, user);
    });

    return observable$;
  }

  uploadFile(file: File) {
    if (!this.auth.currentUser)
      throw Error(FirebaseThrowError.USER_IS_NOT_LOGGED);

    const urlRef = ref(
      this.storage,
      `users/${this.auth.currentUser.uid}/profile.jpg`
    );

    return this.uploadBytes(urlRef, file).pipe(
      switchMap((url) => {
        return this.getDownloadURL(url.ref);
      })
    );
  }

  uploadBytes(storage: StorageReference, file: File) {
    const observable$ = defer(() => {
      if (!this.auth.currentUser)
        throw Error(FirebaseThrowError.USER_IS_NOT_LOGGED);
      return uploadBytes(storage, file);
    });

    return observable$;
  }

  getDownloadURL(storage: StorageReference) {
    const observable$ = defer(() => {
      if (!this.auth.currentUser)
        throw Error(FirebaseThrowError.USER_IS_NOT_LOGGED);
      return getDownloadURL(storage);
    });

    return observable$;
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
    const aopaUser = {
      user: user,
      firebaseUser: this.auth.currentUser,
    };

    return aopaUser;
  }

  updateTasksFields(key: KeysTaskData | KeyLists, value: ValuesTaskData): void {
    const usersDocReference = this.getReference();
    try {
      updateDoc(usersDocReference, { [`tasks.${key}`]: value });
    } catch (error) {
      this.toast.error(`Error adding document: ${error}`);
    }
  }


  //Jão
  async updateUser(object: Partial<AopaUser>): Promise<void> {
    if (!this.auth.currentUser) return;

    const fieldNames = Object.keys(object) as Array<keyof AopaUser>;
    const hasMoreThanOneField = fieldNames.length > 1;

    if (hasMoreThanOneField) return this.updateFields(fieldNames, object);

    const fieldName = fieldNames[0];
    const fieldValue = object[fieldName];

    const usersDocReference = this.getReference();

    try {
      updateDoc(usersDocReference, { [fieldName]: fieldValue });
      this.toast.success(
        `Update ${spaceBeforeEveryUppercase(fieldName)} successful`
      );
    } catch (error) {
      this.toast.error(`Error adding document: ${error}`);
    }
  }

  async updateEmail(
    email: string,
    password: string,
    newEmail: string
  ): Promise<void> {
    if (!this.auth.currentUser) return;
    updateEmail(this.auth.currentUser, newEmail)
      .then(() => {
        this.toast.success(`Update email to ${newEmail} successful`);
      })
      .catch((error) => {
        this.toast.error(error.message);
      });
  }

  updateFields(fieldsName: string[], object: Partial<AopaUser>): void {
    fieldsName.forEach((field) => {
      if (!this.auth.currentUser) return;
      const fieldName = field as keyof AopaUser;
      const usersDocReference = this.getReference();
      try {
        updateDoc(usersDocReference, { [field]: object[fieldName] });
        if (fieldName === 'email') return;
        this.toast.success(
          `Update ${spaceBeforeEveryUppercase(fieldName)} successful`
        );
      } catch (error) {
        this.toast.error(`Error adding document: ${error}`);
      }
    });
  }

  logoff() {
    const observable$ = defer(() => {
      return this.auth.signOut();
    }).pipe(
      tap(() => {
        this.toast.success(FirebaseToastMessage.USER_LOGGED_OUT);
      })
    );

    return observable$;
  }

  createProject(project: Project[]) {
    const usersDocReference = this.getReference();
    try {
      updateDoc(usersDocReference, { [`projects`]: project });
    } catch (error) {
      this.toast.error(`Error adding document: ${error}`);
    }
  }
}

