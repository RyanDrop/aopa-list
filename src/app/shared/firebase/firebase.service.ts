import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { KeysTaskData, ValuesTaskData } from '.';
import { KeyLists } from '../../domain/todo/services/tasks/task.service.models';
import {
  AopaUser,
  eFireStorageCollections,
  RegisterUser,
  UserDetails,
} from './firebase.service.models';

const spaceBeforeEveryUppercase = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').toLocaleLowerCase();

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private wrongUser: boolean;
  logout$ = new Subject();
  hasUser$: Subject<Boolean> = new Subject();
  user$: Subject<UserDetails> = new Subject();
  constructor(
    private fireStore: Firestore,
    private auth: Auth,
    private toast: HotToastService
  ) {}

  register(user: RegisterUser): void {
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

    createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(() => {
        this.toast.success('Register successful');
        this.addUserInfo(aopaUser);
      })
      .catch((error) => {
        this.toast.error(error.message);
      });
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.getUser();
        this.toast.success('Login successful');
        this.wrongUser = false;
      })
      .catch((error) => {
        this.wrongUser = true;
        this.toast.error(error.message);
      });
  }

  logout(): void {
    signOut(this.auth)
      .then(() => {
        this.logout$.next();
        this.toast.warning('Logout successful');
      })
      .catch((error) => {
        this.toast.error(error.message);
      });
  }

  async getUser() {
    if (!this.auth.currentUser) return;
    const userDocReference = doc(
      this.fireStore,
      eFireStorageCollections.USERS,
      this.auth.currentUser.uid
    );
    try {
      const request = await getDoc(userDocReference);
      const user = request.data() as AopaUser;
      const userDetails = {
        user: user,
        firebaseUser: this.auth.currentUser,
      };
      this.user$.next(userDetails);
    } catch (error) {
      this.toast.error('error');
    }
  }

  hasLogin(): void {
    onAuthStateChanged(this.auth, () => {
      if (this.auth.currentUser) {
        this.getUser();
        this.hasUser$.next(true);
        return;
      }
      this.hasUser$.next(false);
    });
  }

  async addUserInfo(user: AopaUser): Promise<void> {
    if (!this.auth.currentUser) return;
    const userDocReference = doc(
      this.fireStore,
      eFireStorageCollections.USERS,
      this.auth.currentUser.uid
    );

    try {
      await setDoc(userDocReference, user);
    } catch (error) {
      this.toast.error(`Error adding document: ${error}`);
    }
  }

  async updateUser(object: Partial<AopaUser>): Promise<void> {
    if (!this.auth.currentUser) return;

    const fieldNames = Object.keys(object) as Array<keyof AopaUser>;
    const hasMoreThanOneField = fieldNames.length > 1;

    if (hasMoreThanOneField) return this.updateFields(fieldNames, object);

    const fieldName = fieldNames[0];
    const fieldValue = object[fieldName];

    const usersDocReference = doc(
      this.fireStore,
      eFireStorageCollections.USERS,
      this.auth.currentUser.uid
    );
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

    await this.login(email, password);

    if (this.wrongUser) return Promise.reject('Wrong user');

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
      const usersDocReference = doc(
        this.fireStore,
        eFireStorageCollections.USERS,
        this.auth.currentUser.uid
      );
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

  updateTasksFields(key: KeysTaskData | KeyLists, value: ValuesTaskData): void {
    if (!this.auth.currentUser) return;
    const usersDocReference = doc(
      this.fireStore,
      eFireStorageCollections.USERS,
      this.auth.currentUser.uid
    );

    try {
      updateDoc(usersDocReference, { [`tasks.${key}`]: value });
    } catch (error) {
      this.toast.error(`Error adding document: ${error}`);
    }
  }
}
