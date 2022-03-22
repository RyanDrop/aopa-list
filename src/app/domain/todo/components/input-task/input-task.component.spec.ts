import { EventEmitter } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '@aopa/validators';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CustomErrorStateMatcher } from './custom-error-state-matcher';
import { InputTaskComponent } from './input-task.component';

const $getInputTask = () =>
  screen.getByTestId('input-task') as HTMLInputElement;
const $getSubmitButton = () =>
  screen.getByTestId('submit-task') as HTMLButtonElement;
const inputTaskSpy = jasmine.createSpyObj('inputTask', ['submitValue']);

const setup = async () => {
  await render(InputTaskComponent, {
    imports: [FormsModule, ReactiveFormsModule],
    componentProperties: {
      taskDescription: new FormControl(null, [
        CustomValidators.taskDescription,
        Validators.required,
      ]),
      matcher: new CustomErrorStateMatcher(),
      submitTask: new EventEmitter<string>(),
      task: '',
      placeholder: '',
      maxLength: 75,
    },
  });
};
describe('InputTaskComponent', () => {
  it('must disable the button if the control is invalid', async () => {
    await setup();

    userEvent.type($getInputTask(), 'a');
    expect($getSubmitButton().disabled).toBe(true);
  });

  it('must enable the button if the control is valid', async () => {
    await setup();

    userEvent.type($getInputTask(), 'Read the documentation');
    expect($getSubmitButton().disabled).toBe(false);
  });

  it('must emit the value of the input', async () => {
    await setup();

    userEvent.type($getInputTask(), 'Read the documentation');
    userEvent.click($getSubmitButton());

    expect(inputTaskSpy.submitValue).toHaveBeenCalledWith(
      'Read the documentation'
    );
  });
});
