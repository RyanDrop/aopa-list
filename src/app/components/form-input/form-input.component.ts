import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'aopa-form-input',
  templateUrl: './form-input.component.html',
})
export class FormInput {
  @Input() inputTestID: string;
  @Input() labelName: string;
  @Input() typeInput: string;
  @Input() controlName: string;
  @Input() placeholderInput: string;
  @Input() control: FormControl;
  @Input() errorStateMatcher: ErrorStateMatcher;
}
