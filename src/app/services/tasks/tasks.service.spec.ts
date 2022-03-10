import { TestBed } from '@angular/core/testing';
import { provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideDatabase } from '@angular/fire/database';
import { provideFirestore } from '@angular/fire/firestore';
import { AOPA_TEST_USER } from '@aopa/mocks';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'environments/environment.prod';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { instance, mock } from 'ts-mockito';
import { FirebaseService } from '..';
import { DateFnsService } from '../date-fns/date-fns.service';
import { KeyLists } from './task.service.models';
import { TasksService } from './tasks.service';

fdescribe('TasksService', () => {
  let tasksService: TasksService;
  let firebase: FirebaseService;

  beforeEach(() => {
    const hotToastMock = mock(HotToastService);
    const hotToastService = instance(hotToastMock);
    const dateFnsService = new DateFnsService();

    TestBed.configureTestingModule({
      providers: [
        { provide: DateFnsService, useValue: dateFnsService },
        FirebaseService,
        { provide: HotToastService, useValue: hotToastService },
      ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
      ],
    });

    firebase = TestBed.inject(FirebaseService);
    firebase.hasLogin();
    firebase.hasUser$.subscribe((boolean) => {
      if (boolean) return;
      firebase.login(AOPA_TEST_USER.email, AOPA_TEST_USER.password);
    });
    tasksService = new TasksService(dateFnsService, firebase);
    tasksService.setTasks(KeyLists.TODAY);
  });

  it('should show today as current list', () => {
    const expected = tasksService.currentListTask === KeyLists.TODAY;
    expect(expected).toBeTruthy();
  });

  it('must assign a value to the property', (done) => {
    tasksService.tasks$.subscribe((tasks) => {
      expect(tasks.length).toEqual(0);
      done();
    });
  });

  it('must create and add a new task', (done) => {
    console.log(tasksService);
    const taskDescription = 'test';
    tasksService.addTask(taskDescription);
    tasksService.tasks$.subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      done();
    });
  });

  // it('should return 0 if there is no task done', (done) => {
  //   tasksService.getPercentageTasks();
  //   tasksService.tasksPercentage$$.subscribe((percentage) => {
  //     expect(percentage).toBe(0);
  //     done();
  //   });
  // });

  // it('should show the percentage of tasks done', (done) => {
  //   tasksService.tasks$.subscribe((tasks) => {
  //     for (let index = 0; index < 3; index++) {
  //       tasksService.addTask(`task ${index}`);
  //       tasks[index].status = true;
  //     }
  //   });
  //   tasksService.getPercentageTasks();
  //   tasksService.tasksPercentage$$.subscribe((percentage) => {
  //     expect(percentage).toBe(100);
  //     done();
  //   });
  // });

  // it('should update the description of a task', (done) => {
  //   const description = 'new task';
  //   tasksService.addTask(description);

  //   const newTaskDescription = 'new description';

  //   tasksService.updateDescriptionTask(newTaskDescription, 0);
  //   tasksService.tasks$.subscribe((tasks) => {
  //     expect(tasks[0].description).toBe(newTaskDescription);
  //     done();
  //   });
  // });

  // it('must remove a task', (done) => {
  //   const description = 'new task';
  //   tasksService.addTask(description);

  //   const taskId = 0;
  //   tasksService.removeTask(taskId);
  //   tasksService.tasks$.subscribe((tasks) => {
  //     expect(tasks.length).toBe(0);
  //     done();
  //   });
  // });
});
