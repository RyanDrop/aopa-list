export enum eValidationErrorMessage {
  REQUIRED = 'This field <strong>is required</strong>',
  NAME = 'This name <strong> is not valid </strong>',
  EMAIL = 'This email <strong> is not valid </strong>',
  MAT_DATEPICKER_FILTER = 'This date <strong>is not valid range date</strong>',
  TASK_DESCRIPTION = 'This task description <strong>is not valid</strong>',
}

export enum eValidationErrorKeys {
  NAME = 'name',
  EMAIL = 'email',
  MAT_DATEPICKER_FILTER = 'matDatepickerFilter',
  REQUIRED = 'required',
  TASK_DESCRIPTION = 'inputTaskDescription',
}

export const VALIDATIONS = [
  {
    errorName: eValidationErrorKeys.REQUIRED,
    messageFn: () => eValidationErrorMessage.REQUIRED,
  },
  {
    errorName: eValidationErrorKeys.NAME,
    messageFn: () => eValidationErrorMessage.NAME,
  },
  {
    errorName: eValidationErrorKeys.EMAIL,
    messageFn: () => eValidationErrorMessage.EMAIL,
  },
  {
    errorName: eValidationErrorKeys.MAT_DATEPICKER_FILTER,
    messageFn: () => eValidationErrorMessage.MAT_DATEPICKER_FILTER,
  },
  {
    errorName: eValidationErrorKeys.TASK_DESCRIPTION,
    messageFn: () => eValidationErrorMessage.TASK_DESCRIPTION,
  },
];
