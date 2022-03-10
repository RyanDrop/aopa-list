import { FormControl } from '@angular/forms';
import { eValidationErrorKeys } from '@aopa/directives';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  it('should return null if name is valid', () => {
    const control = new FormControl('John Doe', [CustomValidators.personName]);
    const expectedError = null;
    const errors = control.errors;

    expect(errors).toEqual(expectedError);
  });

  it('should return an object containing an error message', () => {
    const control = new FormControl('M', [CustomValidators.personName]);
    const result = CustomValidators.personName(control);
    const expected = { [eValidationErrorKeys.NAME]: true };

    expect(result).toEqual(expected);
  });
});
