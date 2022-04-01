import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from 'app/shared/services/projects/projects.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { Task } from './../../services/tasks/task.service.models';
import { EditTaskMatDialogComponent } from './edit-task-mat-dialog/edit-task-mat-dialog.component';

@Component({
  selector: 'aopa-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.scss'],
})
export class DisplayTasksComponent {
  @Input() listTasks: Task[] | null
  @Input() currentService: TasksService | ProjectsService
  @Input() subProjectId: number = 0;

  @Output() checkboxChange: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(public dialog: MatDialog) { }

  openDialog(task: Task, currentService: TasksService | ProjectsService, subProjectId: number): void {
    this.dialog.open(EditTaskMatDialogComponent, {
      width: '500px',
      data: {
        task,
        currentService,
        subProjectId
      },

    });
  }

  checkboxStatus(event: MatCheckboxChange, task: Task): void {
    task.status = event.checked;
    this.checkboxChange.emit(task);
  }
}
