import { Task } from 'app/models/task.model';
import { User } from 'firebase/auth';

export interface AopaUser {
  name: string;
  email: string;
  occupation: string;
  gender: string;
  birthday: string;
  darkThemePreference: boolean;
  phrasePreference: boolean;
  tasks: TaskData;
}
export enum eFireStorageCollections {
  USERS = 'Users',
}

export interface UserDetails {
  user: AopaUser;
  firebaseUser: User;
}

export interface RegisterUser {
  name: string;
  occupation: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  birthday: string;
  password: string;
}

export interface TaskData {
  currentDay: string;
  currentId: number;
  lastSunday: string;
  today: Array<Task>;
  todayCurrentStreak: number;
  week: Array<Task>;
  weekCurrentStreak: number;
}

export enum KeysTaskData {
  CURRENT_DAY = 'currentDay',
  CURRENT_ID = 'currentId',
  LAST_SUNDAY = 'lastSunday',
  TODAY_CURRENT_STREAK = 'todayCurrentStreak',
  WEEK_CURRENT_STREAK = 'weekCurrentStreak',
}

export type ValuesTaskData = string | number | Array<Task>;
