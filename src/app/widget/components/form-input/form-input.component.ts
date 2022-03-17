import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormInputAppearance } from './form-input.component.models';

@Component({
  selector: 'aopa-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInput {
  @Input() appearance: FormInputAppearance = 'fill';
  @Input() inputTestID: string;
  @Input() labelName: string;
  @Input() typeInput: string;
  @Input() controlName: string;
  @Input() placeholderInput: string;
  @Input() control: FormControl;
  @Input() errorStateMatcher: ErrorStateMatcher;
}
