import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksService } from 'app/domain/todo/services/tasks/tasks.service';
import { ProjectsService } from 'app/shared/services/projects/projects.service';
import { Task } from './../../../services/tasks/task.service.models';

@Component({
  selector: 'aopa-edit-task-mat-dialog',
  templateUrl: './edit-task-mat-dialog.component.html',
  styleUrls: ['./edit-task-mat-dialog.component.scss'],
})
export class EditTaskMatDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTaskMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task; currentService: TasksService | ProjectsService, subProjectId: number },
  ) { }

  removeTask(taskId: number): void {
    console.log(this.data.task)
    this.data.currentService.removeTask(taskId, this.data.subProjectId);
    this.data.currentService.getPercentageTasks();
    this.dialogRef.close();
  }

  updateTaskDescription(taskDescription: string, taskId: number): void {
    this.data.currentService.updateDescriptionTask(taskDescription, taskId, this.data.subProjectId);
    this.dialogRef.close();
  }
}
