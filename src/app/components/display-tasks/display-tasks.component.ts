import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'app/models/task.model';
import { EditTaskMatDialogComponent } from './edit-task-mat-dialog/edit-task-mat-dialog.component';

@Component({
  selector: 'aopa-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.scss'],
})
export class DisplayTasksComponent {
  @Input() listTasks: any;
  @Output() checkboxChange: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(public dialog: MatDialog) {}

  openDialog(task: Task): void {
    this.dialog.open(EditTaskMatDialogComponent, {
      width: '500px',
      data: task,
    });
  }

  checkboxStatus(event: MatCheckboxChange, task: Task): void {
    task.status = event.checked;
    this.checkboxChange.emit(task);
  }
}
