import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AOPA_TEST_USER } from '@aopa/mocks';
import { FirebaseService } from '@aopa/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Task } from 'app/models/task.model';
import { KeyLists } from 'app/services/tasks/task.service.models';
import { TasksService } from 'app/services/tasks/tasks.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'aopa-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  currentList: KeyLists;

  constructor(
    private firebase: FirebaseService,
    public tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.firebase.hasLogin();
    this.firebase.hasUser$
      .pipe(take(1), untilDestroyed(this))
      .subscribe((boolean) => {
        if (boolean) return;
        this.firebase.login(AOPA_TEST_USER.email, AOPA_TEST_USER.password);
      });
    this.firebase.user$
      .pipe(take(1), untilDestroyed(this))
      .subscribe((details) => {
        const darkTheme = details.user.darkThemePreference;
        this.toggleDarkTheme(darkTheme);
      });

    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => (this.currentList = params.mode));

    this.tasksService.setTasks(this.currentList);
  }

  get listTasks$(): Observable<Task[]> {
    return this.tasksService.tasks$;
  }

  addTask(taskDescription: string) {
    this.tasksService.addTask(taskDescription);
    this.tasksService.getPercentageTasks();
  }

  toggleDarkTheme(darkTheme: boolean): void {
    const $html = document.documentElement;
    if (darkTheme) {
      $html.classList.add('dark-mode');
      return;
    }
    $html.classList.remove('dark-mode');
  }
}
