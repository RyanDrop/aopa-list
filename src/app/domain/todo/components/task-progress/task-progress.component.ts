import { Component, Input } from '@angular/core';

@Component({
  selector: 'aopa-task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.scss'],
})
export class TaskProgressComponent {
  @Input() currentStreak: number;
  @Input() tasksPercentage: number;
}
