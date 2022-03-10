import { AbstractControl } from '@angular/forms';
import { eValidationErrorKeys } from '@aopa/directives';

export class CustomValidators {
  static personName(control: AbstractControl) {
    const pattern = /[Á-ÚA-Z][á-úa-z]{2,} [Á-ÚA-Z][á-úa-z]{2,}[ Á-ÚA-Zá-úa-z]*/;

    const isInvalid = !pattern.test(control.value);

    if (isInvalid)
      return {
        [eValidationErrorKeys.NAME]: true,
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
