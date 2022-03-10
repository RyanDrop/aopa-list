import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'aopa-view-input',
  templateUrl: './view-input.component.html',
})
export class ViewInputComponent {
  @Input() labelName: string;
  @Input() control: FormControl;
  @Input() inputTestID: string;
}
