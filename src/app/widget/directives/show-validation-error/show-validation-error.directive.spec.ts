import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { eValidationErrorMessage } from '@aopa/directives';
import { CustomValidators } from '@aopa/validators';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { instance, mock, when } from 'ts-mockito';
import { ShowValidationErrorDirective } from './show-validation-error.directive';

class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (control && control.invalid) as boolean;
  }
}
const CONTROL_CONTAINER_MOCK = mock(ControlContainer);
const CONTROL_CONTAINER_INSTANCE = instance(CONTROL_CONTAINER_MOCK);

const DEFAULT_PROVIDERS = [
  { provide: ControlContainer, useValue: CONTROL_CONTAINER_INSTANCE },
  { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
];

const DEFAULT_IMPORTS = [
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
];

const DEFAULT_DECLARATIONS = [ShowValidationErrorDirective];

const getErrorMessage = () => screen.getByTestId('error-message');
const getMatError = () => screen.queryByTestId('mat-error');
const getInput = () => screen.getByTestId('form-input');

const TEST_TEMPLATE = `
  <form [formGroup]="formGroup" data-testid="form">
    <mat-form-field>
      <input
      data-testid="form-input"
      matInput
      [formControlName]="controlName"/>

      <mat-error data-testid="mat-error">
      <span  data-testid="error-message" [aopaShowValidationError]="controlName"></span>
      </mat-error>
    </mat-form-field>
  </form>
`;

const DATE_PICKER_TEST_TEMPLATE = `
      <form [formGroup]="formGroup" data-testid="form">
        <mat-form-field>
          <input
            matInput
            data-testid="form-input"
            [matDatepickerFilter]="availableDatesFn"
            [matDatepicker]="picker"
            formControlName="birthday"
          />

          <mat-datepicker
            #picker
            [startAt]="startDate"
            data-testid="picker"
          ></mat-datepicker>

          <mat-error data-testid="mat-error">
            <span  data-testid="error-message" [aopaShowValidationError]="controlName"></span>
          </mat-error>
      </mat-form-field>
      </form>
    `;

describe('ShowValidationErrorDirective', () => {
  it('should not display any errors on the screen.', async () => {
    const testForm = new FormGroup({
      required: new FormControl(null, [Validators.required]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        control: testForm.controls.required,
        controlName: 'required',
      },
    });

    const $input = getInput();
    userEvent.type($input, 'test');
    const $matError = getMatError();
    expect($matError).toBeNull();
  });

  it('should show the error message for the required field.', async () => {
    const testForm = new FormGroup({
      required: new FormControl(null, [Validators.required]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        control: testForm.controls.required,
        controlName: 'required',
      },
    });

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;

    expect(message).toBe(eValidationErrorMessage.REQUIRED);
  });

  it('should show the error message for the name field.', async () => {
    const testForm = new FormGroup({
      name: new FormControl(null, [CustomValidators.personName]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        control: testForm.controls.name,
        controlName: 'name',
      },
    });

    const $input = getInput();
    userEvent.type($input, 'a');

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;

    expect(message).toBe(eValidationErrorMessage.NAME);
  });

  it('should show the error message for the email field.', async () => {
    const testForm = new FormGroup({
      email: new FormControl(null, [Validators.email]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        control: testForm.controls.email,
        controlName: 'email',
      },
    });

    const $input = getInput();
    userEvent.type($input, 'a');

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;

    expect(message).toBe(eValidationErrorMessage.EMAIL);
  });

  it('should show the error message for the matDatepickerFilter field', async () => {
    const testForm = new FormGroup({
      birthday: new FormControl(null, [Validators.required]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    const startDate = new Date('01/01/2010');

    await render(DATE_PICKER_TEST_TEMPLATE, {
      declarations: [ShowValidationErrorDirective],
      imports: [...DEFAULT_IMPORTS, MatDatepickerModule, MatNativeDateModule],
      providers: DEFAULT_PROVIDERS,
      componentProperties: {
        formGroup: testForm,
        control: testForm.controls.birthday,
        controlName: 'birthday',
        startDate,
        availableDatesFn: (date: Date | null): boolean => {
          const minimumYear = startDate.getFullYear();
          const currentYear = date?.getFullYear() ?? 0;
          return currentYear <= minimumYear;
        },
      },
    });

    const $input = screen.getByTestId('form-input');
    userEvent.type($input, 'Fri Jan 01 2020 00:00:00 GMT-0');
    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;

    expect(message).toBe(eValidationErrorMessage.MAT_DATEPICKER_FILTER);
  });
});
