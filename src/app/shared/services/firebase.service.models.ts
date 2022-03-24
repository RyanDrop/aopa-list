import { Task } from "app/domain/todo/services/tasks/task.service.models";

export interface RegisterUser {
    name: string;
    occupation: string;
    email: string;
    password: string;
}

export interface AopaUser {
    name: string;
    email: string;
    occupation: string;
    darkThemePreference: boolean;
    phrasePreference: boolean;
    tasks: TaskData;
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

