import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'app/validators/custom-validators';
import { CustomErrorStateMatcher } from './custom-error-state-matcher';

@Component({
  selector: 'aopa-input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.scss'],
})
export class InputTaskComponent {
  taskDescription = new FormControl(null, [
    CustomValidators.taskDescription,
    Validators.required,
  ]);
  matcher = new CustomErrorStateMatcher();

  @Output() submitTask: EventEmitter<string> = new EventEmitter<string>();
  @Input() task?: string;
  @Input() placeholder: string;
  @Input() labelName: string;
  maxLength = 75;

  submitValue(value: string) {
    this.submitTask.emit(value);
    this.taskDescription.reset(null);
  }
}
