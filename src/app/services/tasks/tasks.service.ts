import { Injectable } from '@angular/core';
import { FirebaseService, UserDetails } from '@aopa/services';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Task } from 'app/models/task.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DateFnsService } from '../date-fns/date-fns.service';
import { KeysTaskData, ValuesTaskData } from '../firebase';
import { KeyLists } from './task.service.models';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private dateFnsService: DateFnsService,
    private firebase: FirebaseService
  ) {}

  private tasks: Task[];

  private taskData: {
    currentId: number;
    currentDay: string;
    lastSunday: string;
    todayCurrentStreak: number;
    weekCurrentStreak: number;
    today: Task[];
    week: Task[];
  };

  tasks$: Observable<Task[]>;
  tasksPercentage$$ = new BehaviorSubject<number>(0);
  currentListTask: KeyLists;
  currentStreak: number;

  setTasks(listTask: KeyLists) {
    this.currentListTask = listTask;

    this.tasks$ = this.firebase.user$.pipe(
      switchMap((details: UserDetails) => {
        const tasksStorage = details.user.tasks;
        this.taskData = tasksStorage;
        this.tasks = tasksStorage[this.currentListTask];
        return of(this.tasks);
      }),
      tap(() => {
        this.getPercentageTasks();
        this.getStreak();
      })
    );
  }

  addTask(taskDescription: string): void {
    console.log(this.tasks);
    this.tasks.push({
      id: this.taskData.currentId,
      description: taskDescription,
      status: false,
    });
    this.taskData.currentId += 1;

    this.saveData(KeysTaskData.CURRENT_ID, this.taskData.currentId);
    this.saveTasks();
  }

  removeTask(taskId: number): void {
    const findTask = this.tasks.find((task) => task.id === taskId);
    const index = this.tasks.indexOf(findTask!);
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  updateDescriptionTask(taskDescription: string, taskId: number): void {
    const findTask = this.tasks.find((task) => task.id === taskId);
    findTask!.description = taskDescription;
    this.saveTasks();
  }

  getPercentageTasks(): void {
    if (this.tasks.length === 0) return this.tasksPercentage$$.next(0);
    this.saveTasks();

    const completedTasksLength = this.tasks.filter(
      (task) => task.status
    ).length;
    const totalTasksLength = this.tasks.length;
    const tasksPercentage = Math.round(
      (completedTasksLength / totalTasksLength) * 100
    );
    this.tasksPercentage$$.next(tasksPercentage);
  }

  getStreak(): void {
    const currentListStreak =
      this.currentListTask === KeyLists.TODAY
        ? this.taskData.todayCurrentStreak
        : this.taskData.weekCurrentStreak;

    this.currentStreak = currentListStreak;

    const todayList = this.currentListTask === KeyLists.TODAY;
    const weekList = this.currentListTask === KeyLists.WEEK;

    if (todayList) return this.updateTodayListStreak();

    if (weekList) return this.updateWeekListStreak();
  }

  updateTodayListStreak(): void {
    const daysRange =
      this.dateFnsService.getDistanceBetweenDatesFromCurrentDate(
        this.taskData.currentDay,
        'day'
      );

    if (daysRange === 0) return;

    const percentageOfTasksEqualHundred = this.tasksPercentage$$.value === 100;
    const todayStreakCondition =
      percentageOfTasksEqualHundred && daysRange === 1;

    this.taskData.todayCurrentStreak = this.getCurrentStreak(
      todayStreakCondition,
      this.taskData.todayCurrentStreak
    );

    this.currentStreak = this.taskData.todayCurrentStreak;
    this.taskData.currentDay = this.dateFnsService.formattedCurrentDate;

    this.saveData(KeysTaskData.CURRENT_DAY, this.taskData.currentDay);
    this.saveData(
      KeysTaskData.TODAY_CURRENT_STREAK,
      this.taskData.todayCurrentStreak
    );
    this.clearTasks();
  }

  updateWeekListStreak(): void {
    const rangeInDaysBetweenSunday =
      this.dateFnsService.getDistanceBetweenDatesFromNextSunday(
        this.taskData.lastSunday,
        'day'
      );

    if (rangeInDaysBetweenSunday <= 6) return;
    const percentageOfTasksEqualHundred = this.tasksPercentage$$.value === 100;
    const weekStreakCondition =
      percentageOfTasksEqualHundred &&
      rangeInDaysBetweenSunday > 6 &&
      rangeInDaysBetweenSunday < 14;

    this.taskData.weekCurrentStreak = this.getCurrentStreak(
      weekStreakCondition,
      this.taskData.weekCurrentStreak
    );

    this.currentStreak = this.taskData.weekCurrentStreak;
    this.taskData.lastSunday = this.dateFnsService.formattedNextSunday;

    this.saveData(KeysTaskData.LAST_SUNDAY, this.taskData.lastSunday);
    this.saveData(
      KeysTaskData.WEEK_CURRENT_STREAK,
      this.taskData.weekCurrentStreak
    );
    this.clearTasks();
  }

  getCurrentStreak(condition: boolean, currentStreak: number): number {
    const getStreak = condition ? currentStreak + 1 : 0;
    return getStreak;
  }

  saveData(key: KeysTaskData, value: ValuesTaskData): void {
    this.firebase.updateTasksFields(key, value);
  }

  saveTasks() {
    this.firebase.updateTasksFields(this.currentListTask, this.tasks);
  }

  clearTasks(): void {
    this.tasks = [];
    this.tasks$ = of([]);
    this.taskData[this.currentListTask] = [];
    this.saveTasks();
    this.getPercentageTasks();
  }
}
