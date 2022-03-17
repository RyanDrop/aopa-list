import {
  AfterContentInit,
  Directive,
  HostBinding,
  Input,
  Optional,
} from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { VALIDATIONS } from './validations';

@Directive({
  selector: '[aopaShowValidationError]',
})
export class ShowValidationErrorDirective implements AfterContentInit {
  @Input('aopaShowValidationErrorControlName') controlName: string;
  @Input('aopaShowValidationErrorControl') control: AbstractControl;
  @HostBinding('innerHTML')
  innerHTML: string;
  constructor(@Optional() private container: ControlContainer) {}

  ngAfterContentInit(): void {
    if (this.controlName) return this.verifyFormGroupControls();
    return this.verifyFormControl();
  }

  private verifyFormControl() {
    const formControl = this.control;
    const validate = () => {
      const errorMessage = this.getErrorMessage(formControl);
      this.setInnerHTML(errorMessage);
    };
    const initialStatus = formControl.status;
    formControl.statusChanges
      .pipe(startWith(initialStatus))
      .subscribe(validate);
  }

  private verifyFormGroupControls() {
    const formGroup = this.container.control as FormGroup;
    const formControl = formGroup.controls[this.controlName];
    const validate = () => {
      const errorMessage = this.getErrorMessage(formControl);
      const errorMessageParent = this.getErrorMessage(formGroup);
      const error = errorMessage || errorMessageParent;
      this.setInnerHTML(error);
    };

    const initialStatus = formControl.status;
    formControl.statusChanges
      .pipe(startWith(initialStatus))
      .subscribe(validate);
    formGroup.statusChanges
      .pipe(startWith(formGroup.status))
      .subscribe(validate);
  }

  private setInnerHTML(html: string): void {
    this.innerHTML = html;
  }

  private getErrorMessage(control: AbstractControl): string {
    const message: string =
      VALIDATIONS.find((validationObject) =>
        control.hasError(validationObject.errorName)
      )?.messageFn() || '';
    return message;
  }
}
