import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { eValidationErrorKeys } from './../widget/directives/show-validation-error';

export class CustomValidators {
  static personName(control: AbstractControl) {
    const pattern = /[Á-ÚA-Z][á-úa-z]{2,}?[Á-ÚA-Zá-úa-z]*/;

    const isInvalid = !pattern.test(control.value);

    if (isInvalid)
      return {
        [eValidationErrorKeys.NAME]: true,
      };

    return null;
  }

  static password(control: AbstractControl) {
    const pattern = /^[0-9a-zA-Z$*&@#%]{6,}$/;

    const isInvalid = !pattern.test(control.value);

    if (isInvalid)
      return {
        [eValidationErrorKeys.PASSWORD]: true,
      };

    return null;
  }

  public static matchPassword(
    matchTo: string
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent as FormGroup;
      const parentValue = formGroup?.controls[matchTo].value;
      const controlValueMatchParentValue = control.value === parentValue;

      if (!controlValueMatchParentValue)
        return {
          [eValidationErrorKeys.CONFIRMPASSWORD]: true,
        };

      return null;
    };
  }

  static occupation(control: AbstractControl) {
    const pattern = /[Á-ÚA-Zá-úa-z]{3,}$/;

    const isInvalid = !pattern.test(control.value);

    if (isInvalid)
      return {
        [eValidationErrorKeys.OCCUPATION]: true,
      };

    return null;
  }

  static taskDescription(control: AbstractControl) {
    const pattern = /^[Á-ÚA-Z-á-úa-z0-9\s]{3,50}?/;

    const isInvalid = !pattern.test(control.value);

    if (isInvalid) return { [eValidationErrorKeys.TASK_DESCRIPTION]: true };

    return null;
  }
}
