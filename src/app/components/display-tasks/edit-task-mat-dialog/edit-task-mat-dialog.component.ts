import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'app/models/task.model';
import { TasksService } from 'app/services/tasks/tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'aopa-edit-task-mat-dialog',
  templateUrl: './edit-task-mat-dialog.component.html',
  styleUrls: ['./edit-task-mat-dialog.component.scss'],
})
export class EditTaskMatDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTaskMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private tasksService: TasksService
  ) {}

  get todayListTasks$(): Observable<Task[]> {
    return this.tasksService.tasks$;
  }

  removeTaskFromTodayList(taskId: number): void {
    this.tasksService.removeTask(taskId);
    this.tasksService.getPercentageTasks();
    this.dialogRef.close();
  }

  updateDescriptionTodayTask(taskDescription: string, taskId: number): void {
    this.tasksService.updateDescriptionTask(taskDescription, taskId);
    this.dialogRef.close();
  }
}
