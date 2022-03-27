import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { KeyLists } from 'app/domain/todo/services/tasks/task.service.models';
import { TasksService } from 'app/domain/todo/services/tasks/tasks.service';
import { FirebaseService } from 'app/shared/services/firebase/firebase.service';
import { from, Observable } from 'rxjs';
import { Task } from './../../services/tasks/task.service.models';


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
  ) { }

  ngOnInit(): void {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe(user => {
      if (user.darkThemePreference) {
        document.documentElement.classList.add('dark-mode')
      }
    })

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
}
